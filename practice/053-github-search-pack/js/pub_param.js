var keyword
, localstore = require('./localstore')
, amount
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
   keyword = kwd;
   return keyword;
}

function set_amount(kwd){
  return amount = kwd;  
}
module.exports = {
    get_keyword:get_keyword,
    set_keyword:set_keyword,
    set_amount:set_amount,
    test:test
}