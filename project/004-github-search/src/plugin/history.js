var help = require('../util/help')
    , store = require('../util/store')
    ;

var list = ['you','bbb','lxx']
    , el
    , on_click
    , on_delete
    ;


// 提供外部使用接口
var output = {
    init:init,
    add:add,
    remove:remove,
}

function init(config){
    el = document.querySelector(config.el);
    on_click = config.on_click;
    on_delete = config.on_delete;

    sync_to_store();
    sync_to_ladle();
    render();
    
}

// =======render start===========
function render(){
    el.innerHTML = '';

    list.forEach(function(keyword){
        console.log(keyword)
        // 创建元素
        var el_keyword = document.createElement('div');
        // 插入内容
        el_keyword.innerHTML = `
        <div class="text">${keyword}</div>
        <div class="tool">
            <span class="delete">删除</span>
        </div>
        `
        // 添加类
        el_keyword.classList.add('history');
        // 追加到根元素后面
        el.appendChild(el_keyword);

        // 为history类添加事件
        el_keyword.addEventListener('click',function(e){
            if(on_click)
                on_click(keyword,e)
        })
        el_delete = el_keyword.querySelector('.delete');
        el_delete.addEventListener('click',function(e){
            e.stopPropagation();
            if(on_delete)
                on_delete(keyword,e);
            
            remove(keyword);
                
        })

    })
}
// ========data start==========
function add(kwd){
    help.find_and_delete(list,kwd) //检查是否有重复
    list.unshift(kwd) // 更新到炒瓢中
    sync_to_store() // 更新到冰箱
}

function remove(kwd){
    help.find_and_delete(list,kwd);
    console.log(help.find_and_delete(list,kwd))
    sync_to_store();
    render();

}

function sync_to_store(){
    store.set('history_list',list)
}

function sync_to_ladle(){
    list = store.get('history_list') || [];
}
module.exports = output;