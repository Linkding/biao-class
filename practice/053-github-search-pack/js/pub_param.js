var keyword = 'yo'
    ,history_list
    , localstore = require('./localstore')

function get_history_list(){
    return history_list;
}
function set_history_list(data){
    return history_list = data;
}

function reload_history_list(){
    history_list = localstore.get_history_list_store() || [];
}

function get_keyword() {
    return keyword;
}

function set_keyword(kwd){
    return keyword = kwd;
}

module.exports = {
    get_keyword:get_keyword,
    set_keyword:set_keyword,
    get_history_list:get_history_list,
    set_history_list:set_history_list,
}