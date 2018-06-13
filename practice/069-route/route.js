// import parse from "./templater";
/*

                       ┌─────────────────┐
                       │init(constructor)│
                       └─────────────────┘
                                │
         ┌──────────────────────┼────────────────────┐
         │                      │                    │
┌────────▼────  ───┐ ┌────────────▼    ───────┐ ┌──────────▼─────────┐
│初始化this.current │ │ 拷设置，初始化this.state  │ │       监听地址变化 
                                                  detect_hash_change()
└─────────────  ───┘ └─────────────    ───────┘ └────────────────────┘
                                                     │
                                                     │
                    ┌────────────────────────────────┤
                    │                                │
           ┌────────▼────────────┐      ┌────────────▼────────┐
           │      记录当前hash      │       判断当前页归哪个路由管
                                              go()     
           └─────────────────────┘      └─────────────────────┘

*/
// 监听事件-->获取到hash--->渲染新之前保存目前的页面为历史记录-->
class Route {
    constructor(config) {
        this.current = {};
        this.state = Object.assign({}, config);
        this.root = document.querySelector('#root');
        this.load_config();
        this.init_page();
        this.detect_hash_change();
    }
    load_config(){
        let routes = this.state.route;

        for(let name in routes){
            let item = routes[name];
            item.render = ()=> {
                this.render(item,this.on_render_finish.bind(this));
            };
        };
    }
    init_page() {
        let route_name = location.hash;
        if (!route_name)
            route_name = this.state.default;
        this.go(route_name)
    }
    // 监听hashchange事件
    detect_hash_change() {
        window.addEventListener('hashchange', () => {
            this.current.hash = location.hash;
            let route_name = this.parse_current_hash_path();
            let route_param = this.parse_current_hash_query();

            this.go(route_name,route_param);
        })
    }
    // 切换路由
    go(route_name,param) {
        console.log('param',param);
        
        let route = this.state.route[route_name];
        if (!route)
            return;

        // 如果此route_name存在前置回调钩子，则执行
        // 如果钩子返回false就停止执行（也就是不切换页面）
        if (route.hook && route.hook.before && route.hook.before(route) === false)
            return;

        //保存为历史hash记录；
        this.previous = this.current;
        //保存当前路由,渲染时候需要调用
        this.current = route;
        this.current.$param = param;
        
        

        // 删除旧页面；
        this.remove_previous_tpl();

        //hook before_render
        route.hook && route.hook.before_render && route.hook.before_render(route,param);
        //渲染新路由
        // this.render_current(() => {
        //     // 如果当前路由有后置钩子，那么在切换本路由后就应该叫一下这个钩子
        //     route.hook && route.hook.after && route.hook.after();
        //   });
        this.render_current(this.on_render_finish.bind(this));

    };
    //传入路由钩子，后置函数；
    on_render_finish() {
        let route = this.current
        if (!route)
            return;
        if (route.hook && route.hook.after)
            return route.hook.after(route);
    }
    //删除前一页
    remove_previous_tpl() {
        this.root.innerHTML = '';

    }
    //渲染最新当前页
    render_current(on_render_finish) {
        this.render(this.current, on_render_finish)

    }
    //渲染工厂函数
    render(route, on_render_finish) {
        // 因为路由对象中配置了模板地址，所以可以根据地址取到真实的模板代码（HTML代码）
        this.get_template(route.template, (tpl) => {
            route.$template = tpl;
            this.compile(route, on_render_finish);
        });
    } 
    
    //通过url获取模板（html）元素
    get_template(url, on_succeed) {
        const http = new XMLHttpRequest();
        http.open('get', url);

        http.send();

        http.addEventListener('load', () => {
            on_succeed(http.responseText);  //从模板中获取到的html内容，返回responseText中，插入到对应的html模板位置；
        })
    }

    //将route里面的data更新到视图
    compile(route, on_render_finish) {
        // let el = document.querySelector(route.el)
        this.root.innerHTML = parse(route.$template, route.data);
        
        // el.innerHTML = parse(route.$template, route.data);

        on_render_finish(route);
    }
    
    parse_current_hash_path() {
        // var re = /\?+/;
        // if (re.test(this.current.hash)) {
        //     return this.parse_article_hash(this.current.hash);
        // } else {
            // }
        return this.parse_hash_path(this.current.hash);
    }

    parse_current_hash_query(){
        return this.parse_hash_query(this.current.hash);
    }
    
    parse_hash_query(hash){
        let param  = {};
        let is_split = hash.split('?').length < 2;
        //如果hash没有传参(即没有？后面的内容)，则返回；
        if(is_split)
            return;
        // 原始传参以问好分割，eg:'#/article?a=1&b=2&c=3'
        // 左边: '#/article'
        // 右边: 'a=1&b=2&c=3'
        // 即split分割: ['#/article','a=1&b=2&c=3']
        hash = hash.split('?')[1];

        //如果问好后没有内容，也将空param返回；
        if(!hash)
            return param;
        let arr = hash.split('&');

        param = change_param(arr,"=");
        return param;
    }
    

    parse_hash_path(hash) {
        hash = hash.split('?')[0];
        hash = trim(hash, '#/');
        
        let re = new RegExp('^#?\/?' + hash + '\/?$'); //定义好一个 判断的标准格式
        
        for (let key in this.state.route) {  // key,route的键名
            let item = this.state.route[key]; // 其中一个对象，例如：home{}；
            if (re.test(item.path))
                return key;
        }
    }

    set_data(route_name, key, value) {
        let layer = key.split('.');
        let layer_length = layer.length;

        // 1.更改对应key的值；
        let data = this.state.route[route_name].data;
        if (!data)
            this.state.route.data = {};

        for (var i = 0; i < layer_length; i++) {
            let key = layer[i];
            let is_last = i + 1 == layer_length; //判断是不是最后一个键，boolen；
            let nest = data;


            if (is_last) {    //如果是键名中最后一个，则直接将value赋值进去
                nest[key] = value;
            } else {          //如果键名不是最后一个，
                if (!nest[key])  //而此键又不存在，则创建新的一个空对象
                    nest[key] = {}
                nest = nest[key]; //此键存在，则将nest定位到深一层，直到最后一层；
            }
        }
        // 2.修改视图
        this.compile(this.state.route[route_name]);
    }
}

function trim(str, cap_base) {
    let arr = cap_base.split(''); // ['#','/']
    arr.forEach(function (item) {
        if (str.startsWith(item)) {
            str = str.substring(1);
            str = trim(str, item);
        }

        if (str.endsWith(item)) {
            str = str.substring(0, str.length - 1);
            str = trim(str, item)

        }
    });
    return str;
}


//  ["a=1", "b=2", "c=3"] => {a:1,b:2}
function change_param(cap_list,cap_type){
    let arr = {};
    for(var i = 0; i<cap_list.length;i++){
        var item = cap_list[i];
        var layer = item.split(cap_type);
        arr[layer[0]] = layer[1];
    }
    return arr;
}