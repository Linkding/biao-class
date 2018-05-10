var element = require('./element')
    , pub_param = require('./pub_param')
    , search = require('./search')
    , user_list = document.getElementById('user-list')
    ;


var pagination_container = document.querySelector('.pagination-container')
    , pagination = document.querySelector('.pagination')

    , limit = 5
    , max_btn_length = 5
    , current_page = 1
    , page_amount
    ;

// 渲染pagination
function render_pagination(amount) {
    element = require('./element')
    show_pagination(pagination_container);
    clear_pagination(pagination);
    get_page_amount(amount);
    console.log('page_amount: ' + page_amount + '  max_btn: ' + max_btn_length)


    var start
        , end
        , middle = Math.ceil(max_btn_length / 2)
        , reaching_left = current_page <= middle
        , reaching_right = current_page >= page_amount - middle

    //三分法，区分三个情况下，max_btn_length数内，第一和最后一个按钮数字
    if (reaching_left) {
        start = 1
        end = max_btn_length
        console.log('reach_left')
    } else if (reaching_right) {
        start = page_amount - max_btn_length
        end = page_amount
        console.log('reaching_right')
    } else {
        start = current_page - (middle - 1)
        end = current_page + (middle - 1)
        console.log('reahing_middle')
    }

    /*如果出于任何诡异的原因导致开始按钮小于1就将其复位为1*/
    if (start < 1)
        start = 1;

    console.log('current_page: ' + current_page + '   start: ' + start + '   end:' + end + '  middle:' + middle)


    for (var i = start; i <= end; i++) {
        var num = i;

        var btn = document.createElement('button');
        btn.innerText = num;
        btn.dataset.page = num;

        //为当前页码着色
        if (current_page == num)
            btn.style.background = 'pink'

        //追加到指定页码位置
        pagination.appendChild(btn);
        // 给每个页码按钮添加点击事件
        btn.addEventListener('click', function () {
            current_page = parseInt(this.dataset.page);
            console.log('点击current_page按钮第' + current_page)
            console.log('max_btn_length' + max_btn_length)

            render_pagination(amount);

            var config = {
                page: this.dataset.page,
                limit: limit,
            }
            search.user(config, function (data) {
                element.render_user_list(data);
            })
        });


    };
}

function click_first_page(kwd) {
    current_page = 1;
    var config = {
        page: 1,
        limit: limit,
        keyword:kwd
    }
    search.user(config, function (data) {
        element.render_user_list(data);
        amount = data.total_count;
        render_pagination(amount);
    })
}

function click_last_page(kwd) {
    var config = {
        page: page_amount,
        limit: limit,
        keyword:kwd
    }
    search.user(config, function (data) {
        element.render_user_list(data);
        amount = data.total_count;
        get_page_amount(amount);
        current_page = page_amount;
        console.log('最后一页：' + page_amount)
        render_pagination(amount);
    })
}
function show_pagination(ele) {
    ele.hidden = false;
}

function clear_pagination(ele) {
    ele.innerHTML = '';
}

function get_page_amount(amount) {
    if (amount < limit) {
        page_amount = 1;
        max_btn_length = 1;
        // console.log('到达1')
    } else {
        page_amount = Math.ceil(amount / limit);
        max_btn_length = 5;
        // console.log('到达2')

    }
}

module.exports = {
    render_pagination: render_pagination,
    click_first_page: click_first_page,
    click_last_page: click_last_page,
}