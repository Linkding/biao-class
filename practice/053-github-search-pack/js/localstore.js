// 设关键字变量
var history_list_store

// 获取关键字列表
function get_history_list_store(){
    return history_list_store
}

// 更改关键字列表
function set_history_list_store(val){
    // 可以对数据进行逻辑判断

    return history_list_store = val;
}

// 增加历史记录
function append_history(){
    // 先不管是否存在，删除后在存入；
    find_and_delete(history_list_store,kwd);
    // 更新炒瓢，插入到前面
    history_list_store.unshift(kwd);
    // 重新更新到“冰箱中”
    over_write_history(history_list_store);
}

// 判断关键字是否已存在，返回布尔值
function find_and_delete(arr,ele){
    var shit_index = arr.indexOf(ele);

    if(shit_index == -1)
        return false;
    
    arr.splice(shit_index,1);
    return true;

}

// 重写历史记录 
function over_write_history(data){
    set_store(history_list_store,data)
}

// 插入localstore数据
function set_store(key,val){
    var json = JSON.stringify(val);
    localStorage.setItem(key,json);
}

// 获取localstore数据
function get_store(key){
    var data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
}

module.exports = {
    set_store:set_store,
    get_store:get_store,
    set_history_list_store:set_history_list_store,
    get_history_list_store:get_history_list_store,
    append_history:append_history,
    find_and_delete:find_and_delete,
    over_write_history:over_write_history,
}