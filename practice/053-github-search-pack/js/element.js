var form = document.getElementById('form-search')
    , input = document.getElementById('search-input')
    , user_list = document.getElementById('user-list')
    , load_more = document.getElementById('load-more')
    ;

function render_user_list(data) {
    var html = user_list.innerHTML

    data.items.forEach(function (user) {
        html = html + `
                <div class="user">
                <div class="logo">
                    <img src="${user.avatar_url}">
                </div>
                <div class="info">
                    <div class="name">${user.login}</div>
                    <a href="${user.html_url}" class="link">${user.html_url}</a>
                </div>
                </div>
                `
    });
    // 将模板导入页面渲染位置
    user_list.innerHTML = html;

    //渲染搜索结果
    document.querySelector('#count').innerHTML = `共有${data.total_count}条结果`

}


function show_load_more() {
    load_more.hidden = false;
}
function hide_load_more() {
    load_more.hidden = true;
}
module.exports = {
    form: form,
    input: input,
    load_more: load_more,
    render_user_list: render_user_list,
    show_load_more: show_load_more,
    hide_load_more: hide_load_more,
}