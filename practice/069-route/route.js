// 监听事件-->获取到hash--->渲染新之前保存目前的页面为历史记录-->
class route {
    constructor(config) {
        this.current = {};
        this.state = Object.assign({}, config)
        this.init_page();
        this.detect_hash_change();
    }
    init_page() {
        let route_name = location.hash;
        if(!route_name)
            route_name = this.state.default;
            console.log(this.state.default)
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
    go(route_name){
        let route = this.state.route[route_name];
        //保存为历史hash记录；
        this.previous = this.current;
        console.log(this.previous)
        //保存当前路由,渲染时候需要调用
        this.current = route;
        console.log(this.current)

        // 删除旧页面；
        this.remove_previous_tpl();

        //渲染新路由
        this.render_current();

    }
    //删除前一页
    remove_previous_tpl(){
       //拿到前一页的模板床；
       let el = document.querySelector(this.previous.el);
       if(!el)
            return;
        //清空模板床
        el.innerHTML = '';
        console.log('删除旧页面')
        
    }
    //渲染最新当前页
    render_current(){
        console.log('渲染当前页')
        this.render(this.current)
    }
    //渲染工厂函数
    render(route){
        console.log(route)
        let el = document.querySelector(route.el),cache;
        console.log(cache)
        if(cache = route.$template) {
            el.innerHTML  = cache;
            return
        }

        // 因为路由对象中配置了模板地址，所以可以根据地址取到真实的模板代码（HTML代码）
        this.get_template(route.template,function(tpl){
            route.$template = el.innerHTML = tpl;
        })
    }
    //通过url获取模板（html）元素
    get_template(url,on_succeed){
        console.log(url)
        const http = new XMLHttpRequest();
        http.open('get',url);
        http.send();

        http.addEventListener('load',function(){
            on_succeed(http.responseText);  //从模板中获取到的html内容，返回responseText中，插入到对应的html模板位置；
        })
    }
    
    parse_current_hash() {
        return this.parse_hash(this.current.hash);
    }

    parse_hash(hash) {
        hash = trim(hash, '#/');
        let re = new RegExp('^#?\/?'+ hash + '\/?$'); //定义好一个 判断的标准格式

        for(let key in this.state.route){  // key,route的键名
            let item = this.state.route[key]; // 其中一个对象，例如：home{}；
            if( re.test(item.path))
                return key;
        }
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
            str = trim(str,item)

        }
    });
    return str;
}

let o = {
    default: 'home',
    route : {
        home: {
            path:'#/home',
            el: "#home",
            template:'./tpl/home.html',
        },
        about: {
            path:'#/about',
            el: "#about",
            template:'./tpl/about.html',
        }
    }
}
new route(o);