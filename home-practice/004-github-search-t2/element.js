var pub_param = require('./pub_param')
    ;


var output = {
    render:render,
    reset_user_list: reset_user_list,
    user_list: document.querySelector('#user-list'),
    count: document.querySelector('#count'),
    form : document.querySelector('#form-search'),
    input : document.querySelector('#search-input'),
    loading: document.querySelector('.loading'),
    show_loading:show_loading,
    hide_loading:hide_loading,

}

function reset_user_list() {
    output.user_list.innerHTML = '';
}

function render() {
    var html = '';

    var list = pub_param.get_user_list();

    list.forEach(function (user) {
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

    output.user_list.innerHTML = html;
    output.count.innerHTML = `共有${pub_param.get_amount()}条结果`;
}

function show_loading(){
    output.loading.hidden = false;
}

function hide_loading(){
    output.loading.hidden = true;
}


module.exports = output;