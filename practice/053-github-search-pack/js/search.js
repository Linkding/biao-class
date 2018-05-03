// 搜索模块
// user: 获取github用户数据（具体这个数据使用场景，不在乎，调用者决定）

// 搜用户
// * @param String keyword 用户名关键词
// * @param Function on_success 成功搜索到数据后（回调函数）
// * @param Object config 配置项
function user(keyword, on_success, config) {
    // 默认配置
    var def = {
        page: 1,
        limit: 10,
        keyword: 'yo',
    };

    // 合并用户配置，使用对象合并功能
    config = Object.assign({}, def, config);

    var http = new XMLHttpRequest();
    http.open('get', 'https://api.github.com/search/users?q=' + keyword + '&page=' + config.page + '&per_page=' + config.limit);
    http.send();

    http.addEventListener('load', function (e) {
        var data = JSON.parse(this.responseText);
        on_success(data)
    })
}

module.exports = {
    user: user
}