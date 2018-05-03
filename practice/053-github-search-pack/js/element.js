var form = document.querySelector('#form-search')
    , input = document.querySelector('#search-input')
    , user_list = document.querySelector('#user-list')


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

module.exports = {
    form: form,
    input: input,
    render_user:render_user
}