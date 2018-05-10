// 设关键字列表
var pub_param = require('./pub_param')
    , keyword = pub_param.get_keyword()
    , history_list
    ,  a = ['lll','aaa'] //测试
    ;

function reload_history_list() {
    history_list = get_store('history_list') || [];
}

function get_history_list(){
    if(!history_list)
        reload_history_list();
        console.log('获取历史记录'+ history_list)
    return history_list;
    // return a;
}

// 增加历史记录
function append_history(kwd) {
    // 先不管是否存在，删除后在存入；
    find_and_delete(history_list, kwd);
    // 更新炒瓢，插入到前面
    history_list.unshift(kwd);
    // 重新更新到“冰箱中”
    over_write_history(history_list);
}

// 判断关键字是否已存在，返回布尔值
function find_and_delete(arr, ele) {
    var shit_index = arr.indexOf(ele);

    if (shit_index == -1)
        return false;

    arr.splice(shit_index, 1);
    return true;

}

// 重写历史记录 
function over_write_history(data) {
    set_store('history_list', data)
}

// 插入localstore数据
function set_store(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
}

// 获取localstore数据
function get_store(key) {
    var data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
}

module.exports = {
    set_store: set_store,
    get_store: get_store,
    append_history: append_history,
    find_and_delete: find_and_delete,
    over_write_history: over_write_history,
    reload_history_list:reload_history_list,
    get_history_list:get_history_list,
}