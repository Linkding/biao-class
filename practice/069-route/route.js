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
        this.root  = document.querySelector('#root');
        this.init_page();
        this.detect_hash_change();
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
            // console.log('hashchange')
            this.current.hash = location.hash;
            // console.log(this.current)
            let route_name = this.parse_current_hash();
            this.go(route_name);
        })
    }
    // 切换路由
    go(route_name) {
        let route = this.state.route[route_name];
        if(!route)
            return;
        // 如果此route_name存在前置回调钩子，则执行
        // 如果钩子返回false就停止执行（也就是不切换页面）
        if(route.hook && route.hook.before && route.hook.before() === false)
            return;

        //保存为历史hash记录；
        this.previous = this.current;
        //保存当前路由,渲染时候需要调用
        this.current = route;
        console.log(this.current)

        // 删除旧页面；
        this.remove_previous_tpl();
        
        //渲染新路由
        this.render_current(this.on_render_finish.bind(this));

    };
    //传入路由钩子，后置函数；
    on_render_finish(){
        let route = this.current
        if(!route)
            return;

        if(route.hook && route.hook.after&& route.hook.after())
            return;
        return route.hook.after ;
    }
    //删除前一页
    remove_previous_tpl() {
        this.root.innerHTML = '';

    }
    //渲染最新当前页
    render_current(on_render_finish) {
        console.log('this.current', this.current);
        this.render(this.current,on_render_finish)

    }
    //渲染工厂函数
    render(route,on_render_finish) {
        // 因为路由对象中配置了模板地址，所以可以根据地址取到真实的模板代码（HTML代码）
        this.get_template(route.template, (tpl) => {
            route.$template = tpl;
            this.compile(route,on_render_finish);
        });
    }
    //将route里面的data更新到视图
    compile(route,on_render_finish) {
        // let el = document.querySelector(route.el)
        this.root.innerHTML = parse(route.$template, route.data);
        // el.innerHTML = parse(route.$template, route.data);
        on_render_finish();
    }
    //通过url获取模板（html）元素
    get_template(url, on_succeed) {
        const http = new XMLHttpRequest();
        http.open('get', url);
        console.log('url',url);
        
        http.send();

        http.addEventListener('load', ()=>{
            on_succeed(http.responseText);  //从模板中获取到的html内容，返回responseText中，插入到对应的html模板位置；
        })
    }

    parse_current_hash() {
        return this.parse_hash(this.current.hash);
    }

    parse_hash(hash) {
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
                if(!nest[key])  //而此键又不存在，则创建新的一个空对象
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

