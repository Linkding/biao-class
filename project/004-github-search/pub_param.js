var user_list = []
    , keyword
    , amount
    , current = 1
    , limit = 5
    ;


function get_user_list() {
    return user_list
}

function set_user_lisr(list){
    user_list = list;
    return user_list;
}
function get_keyword() {
    return keyword;
}

function set_keyword(kwd) {
    keyword = kwd;
    return keyword;
}

function set_amount(kwd) {
    return amount = kwd;
}

function get_amount(){
    return amount;
}

function get_current_page(){
    return current;
}

function set_current_page(kwd){
    current = kwd;
    return current;
}

function get_limit(){
    return limit;
}

function set_limit(kwd){
    limit = kwd;
    return limit;
}

module.exports = {
    get_keyword: get_keyword,
    set_keyword: set_keyword,
    set_amount: set_amount,
    get_amount:get_amount,
    get_user_list:get_user_list,
    set_user_lisr:set_user_lisr,
    get_current_page:get_current_page,
    set_current_page:set_current_page,
    get_limit:get_limit,
    set_limit:set_limit,
}