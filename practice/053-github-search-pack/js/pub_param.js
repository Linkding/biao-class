var keyword = 'yo'
, localstore = require('./localstore')

// function get_history_list(){
//     return history_list;
// }
// function set_history_list(data){
//     return history_list = data;
// }

function test(){
    var a = localstore.get_store('history_list')
    console.log(a)
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
    // get_history_list:get_history_list,
    // set_history_list:set_history_list,
    test:test
}