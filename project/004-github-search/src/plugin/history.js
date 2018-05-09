var store = require('../util/store')
    , helper = require('../util/helper')
    ;

var list = ['lxb', 'xxx', 'bbb']
    , el
    , on_click
    , on_delete
    ;

var output = {
    init: init,
    remove: remove,
    add: add,

}
function init(config) {
    el = document.querySelector(config.el);
    on_click = config.on_click;
    on_delete = config.on_delete;

    sync_to_store(list);

    render();
}

// =========render start=======
function render() {
    // 清空根元素
    el.innerHTML = '';
    // 将历史记录逐个渲染
    list.forEach(function (keyword) {
        // 添加新元素
        var el_keyword = document.createElement('div');
        // 为新元素添加内容
        el_keyword.innerHTML = `
        <div class="text">${keyword}</div>
            <div class="tool">
                <span class="delete">删除</span>
            </div>
        `
        // 添加类
        el_keyword.classList.add('history')
        // 根元素追加新内容
        el.appendChild(el_keyword);
        // 新元素添加监听事件
        el_keyword.addEventListener('click', function (e) {
            on_click(keyword, e)
        })
        // 子元素添加监听事件
        var el_delete = el_keyword.querySelector('.delete')
        el_delete.addEventListener('click', function (e) {
            e.stopPropagation() //避免冒泡
            on_delete(keyword, e)

            remove(keyword)
        })
    })
}

// ===========data start=========
// 添加一条记录
function add(kwd) {
    helper.find_and_delete(list, kwd);
    list.unshift(kwd)
    sync_to_store(list)
    render();
}
// 删除记录
function remove(kwd) {
    helper.find_and_delete(list, kwd);
    sync_to_store(list);
    render();
}
// 同步炒瓢数据到localstore
function sync_to_store(kwd) {
    store.set('history_list', kwd)
}
// 更新炒瓢
function sync_to_ladle() {
    list = store.get('history_list') || []
}
// ============data end=========
module.exports = output