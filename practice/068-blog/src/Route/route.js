import helper from '../Util/heler'

let instance;

class Route{
    constructor (config){
        this.param = {};

        this.load_config(config);
        this.detect_click();
    }
    //加载所有配置
    load_config(config){

    }
    //监听hash事件
    detect_hash_change(){
        window.addEventListener('hashchange',()=>{
            // 如果url路由发生改变就去对应页面
            this.go(window.location.hash);
        });
    }
    //监听点击事件
    detect_click(){
        document.addEventListener('click',e =>{
            var target = e.target;

            switch (target.nodeName){
                //如果是<a>元素
                case 'A':
                    //如果存在外链
                    if (target.host)
                        return;
                    this.go(target.hash);
                    break;
            }
        });
    }
    // 更改路由
    // * @param {string} hash 原始hash路径，如：#/about
    // * @param {object} opt 配置项，如：{force:false}
    go(hash,opt = null){

        this.hide('#not-found');

        // 钩子
        // 如果存在外部函数（hook）,执行
        if(this.config.hook.before)
            //将hook函数执行，并对执行结果进行判断
            if(!this.config.hook.before()) 
                return;

        hash = hash || 'home';

        //通过原始hash解析真正的页面名称 #/home => home
        
        let old_state = this.current;//当前hash状态

        let new_state = this.parse_hash(hash); //需要跳转到的页面状态

        this.previous = old_state;

        if(!new_state){
            
        }
    }

    // 从数据仓库中获取到对应的hash对应的渲染数据
    parse_hash(hash){
        hash = helper.trim(hash,'#/'); 
        let hash_arr = hash.split('/'); 
        let routes = this.config.routes; //{}

        for (var name in routes){ // name => home,about,article,article_list
            let route = routes[name];
            let $segment =route.$segment;
            let matched = true;
        }
        
        

    }

    hide(el){
        var el = document.querySelector(el);
        if(!el);
            return;
        el.hidden = true;
    }
}

function init(config){
    if(!instance)
        instance = new Route(config);
}


export default {init}