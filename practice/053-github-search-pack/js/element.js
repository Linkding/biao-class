var form = document.querySelector('#form-search')
    , input = document.querySelector('#search-input')
    , user_list = document.querySelector('#user-list')
    , load_more = document.querySelector('#load-more')


function render_user(data) {
    var html = ``
    console.log(data)
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
    // document.querySelector('#count').innerHTML = `共有${res.total_count}条结果`
}

function render_load_more() {

}

function hide_load_more() {
    load_more.hidden = true;
}
function show_load_more() {
    load_more.hidden = false;
}

module.exports = {
    form: form,
    input: input,
    load_more: load_more,
    render_user: render_user,
    hide_load_more: hide_load_more,
    show_load_more: show_load_more
}