var pub_param = require('./pub_param')
    , amount
    ;

function user(config,on_succeed) {
    var def = {
        page: 1,
        limit: 5,
        keyword: pub_param.get_keyword(),
    };

    config = Object.assign({}, def, config);
    console.log('发射出去的page=' + config.page + '  limit=' + config.limit)
    var http = new XMLHttpRequest();
    http.open('get', 'https://api.github.com/search/users?q=' + config.keyword + '&page=' + config.page + '&per_page=' + config.limit);
    http.setRequestHeader('Authorization', 'Basic ' + btoa('linkding:0e2af1765ccb10d1021de3dec9cb5c1f3d3ffe78'));
    http.send();

    http.addEventListener('load', function (data) {
        var data = JSON.parse(this.responseText);
        on_succeed(data);
    });
}

function search_amount(){
    user('',function(data){
        return amount = data.total_count;
        console.log(amount)
    })
}
module.exports = {
    user: user,
    search_amount:search_amount,
}
