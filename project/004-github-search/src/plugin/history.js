var helper = require('../util/helper')
    , store = require('../util/store')
    ;

var list = ['aaa','sss','xxx']
    , el
    , on_click
    , on_delete
    ;

// 供外部使用接口
var output = {
    init:init,
    remove:remove,
    add:add,
}

// 初始化，从外部传入参数，变量，函数
function init(config) {
    el = document.querySelector(config.el)
    on_click = config.on_click
    on_delete = config.on_delete

    sync_to_store(); //将初始记录传入localstore
    render();
}

// =========render start======
// 渲染历史记录
function render() {
    // 根元素清空
    el.innerHTML = '';
    // 给每个历史记录渲染
    list.forEach(function (keyword) {
        // 创建一个新元素
        var el_keyword = document.createElement('div');
        // 新元素添加内容
        el_keyword.innerHTML = `
        <div class="text">${keyword}</div>
            <div class="tool">
                <span class="delete">删除</span>
            </div>
        `
        ;
        // 新元素添加类
        el_keyword.classList.add('history')
        // 添加序列数据
        el_keyword.dataset.history = keyword;
        // 追加到根元素
        el.appendChild(el_keyword);
        // 新元素添加点击事件
        el_keyword.addEventListener('click',function(e){
            if(on_click)
                on_click(keyword,e);
        });
        // 新元素子元素添加点击事件
        el_keyword.querySelector('.delete').addEventListener('click',function(e){
            e.stopPropagation() // 停止冒泡
            if(on_delete)
                on_delete(keyword,e)

            remove(keyword)
        })

        
    })
}
// =========render end========

// ==========data start=========
// 增加历史记录
function add(kwd) {
    helper.find_and_delete(list, kwd);
    list.unshift(kwd)
    sync_to_store()
    render()

}
// 删除历史记录
function remove(kwd) {
    helper.find_and_delete(list, kwd);
    console.log(list)
    sync_to_store()
    render()
}

// 同步最新历史数据到localstore
function sync_to_store() {
    store.set('history_list',list)
}
// 同步localstore到炒瓢
function sync_to_ladle() {
    list = store.get('history_list') || []
}
// ========data end=============

module.exports = output;