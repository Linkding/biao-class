var localstore = require('./localstore')
    , pub_param = require('./pub_param')
    , search = require('./search')
    , page = require('./pagination') //@1

var form = document.getElementById('form-search')
    , input = document.getElementById('search-input')
    , user_list = document.getElementById('user-list')
    , load_more = document.getElementById('load-more')
    , history_list = document.querySelector('.history-list')
    // , pagination_container = document.querySelector('.pagination-container')
    // , pagination = document.querySelector('.pagination')
    // , first_page = document.getElementById('first-page')
    // , last_page = document.getElementById('last-page')
    , history_list_store = localstore.get_history_list()
    ;


function render_user_list(data, html) {
    var html = html || '';

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

function render_history_list() {
    history_list.innerHTML = '';

    console.log(localstore.get_history_list())
    // 为什么不能将localstore.get_history_list() 赋值给本地变量？@1
    localstore.get_history_list().forEach(function (history) {
        var el_delete
            , el_history = document.createElement('div')

        el_history.classList.add('history')
        el_history.dataset.history = history
        el_history.innerHTML = `
        <div class="text">${history}</div>
        <div class="tool">
            <span class="delete">删除</span>
        </div>
        `
        history_list.appendChild(el_history)
        el_delete = el_history.querySelector('.delete')

        // 渲染后，对历史记录列表添加监听事件
        //当点击历史记录时
        el_history.addEventListener('click', function (e) {
            //如果点击的区域是删除按钮，则关键字不搜索，也不上屏，直接返回
            if (e.target.classList.contains('delete'))
                return;

            //上屏
            input.value = this.dataset.history;
            // 在公共变量变更最新关键字
            pub_param.set_keyword(this.dataset.history)

            // set_keyword(this.dataset.history);
            //搜索
            search.user(pub_param.get_keyword(), function (data) {
                render_user_list(data);

                // show_load_more();
                amount = data.total_count;//@1
                page.render_pagination(amount); //@1
            });
        })

        //当点击删除历史记录时
        el_delete.addEventListener('click', function (e) {
            //先找到history的元素，获取存放的关键词
            var el_history = this.closest('.history')
                , kwd = el_history.dataset.history


            //如果删除失败，即不存在这个关键字在列表，则返回
            if (!localstore.find_and_delete(localstore.get_history_list(), kwd))
                return;

            //否则用（删减过）新数据覆盖关键字列表
            // console.log('history_list:' + history_list_store)
            localstore.over_write_history(history_list)
            //重新渲染历史记录
            setTimeout(function () {
                render_history_list();
            }, 0);

            //如果历史记录没有，或者删除光了，就隐藏历史列表
            if (!localstore.get_history_list().length)
                history_list.hidden = true;
        })
    })
}

function show_history_list() {
    history_list.hidden = false;
}

function hide_history_list() {
    history_list.hidden = true;
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
    render_history_list: render_history_list,
    show_history_list: show_history_list,
    hide_history_list: hide_history_list,
    show_load_more: show_load_more,
    hide_load_more: hide_load_more,
}