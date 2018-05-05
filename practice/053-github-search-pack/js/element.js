var localstore = require('./localstore')
    , pub_param = require('./pub_param')
    , search = require('./search')

var form = document.getElementById('form-search')
    , input = document.getElementById('search-input')
    , user_list = document.getElementById('user-list')
    , load_more = document.getElementById('load-more')
    , history_list = document.querySelector('.history-list')
    , history_list_store = localstore.get_history_list() //@1
    ;


function render_user_list(data,html) {
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
    localstore.get_history_list().forEach(function(history){
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
            pub_param.set_keyword(this.dataset.history)
            // set_keyword(this.dataset.history);
            //搜索
            search.user(pub_param.get_keyword(),function(data){
                render_user_list(data);
                show_load_more();
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

function render_pagination() {
    show_pagination();
    clear_pagination();
    get_page_amount();

    var start
        , end
        , middle = Math.ceil(max_btn_length / 2)
        , reaching_left = current_page <= middle
        , reaching_right = current_page >= page_amount - middle

    //三分法，区分三个情况下，max_btn_length数内，第一和最后一个按钮数字
    if (reaching_left) {
        start = 1
        end = max_btn_length
    } else if (reaching_right) {
        start = page_amount - max_btn_length
        end = page_amount
    } else {
        start = current_page - (middle - 1)
        end = current_page + (middle - 1)
    }

    console.log('test1')
    for (var i = start; i <= end; i++) {
        var num = i;

        var btn = document.createElement('button');
        btn.innerText = num;
        btn.dataset.page = num;

        //为当前页码着色
        if (current_page == num)
            btn.style.background = 'pink'

        //追加到指定页码位置
        el_pagination.appendChild(btn);
        // console.log('test2')
        btn.addEventListener('click', make_funcation_on_page_change(num))
    };
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