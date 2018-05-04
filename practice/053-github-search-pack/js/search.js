var kwd = require('./pub_param');

function user(keyword,on_succeed,config) {
    var def = {
        page : 1,
        limit : 2,
        keyword : kwd.get_keyword(),
    };

    config = Object.assign({},def,config);
    console.log('发射出去的page=' + config.page+  '  limit='+config.limit)
    var http = new XMLHttpRequest();
    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);
    http.send();

    http.addEventListener('load', function (data) {
        var data = JSON.parse(this.responseText);
        on_succeed(data);
    });
}

module.exports = {
    user:user,
}
