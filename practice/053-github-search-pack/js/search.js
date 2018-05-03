// 搜索模块
// user: 获取github用户数据（具体这个数据使用场景，不在乎，调用者决定）
function user(keyword,on_success) {
    var http = new XMLHttpRequest();
    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&per_page=5');
    http.send();

    http.addEventListener('load', function (e) {
        var data = JSON.parse(this.responseText);
        on_success(data)
    })
}

module.exports = {
    user: user
}