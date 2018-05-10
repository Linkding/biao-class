var el = require('./element')
    , search = require('./search')
    , localstore = require('./localstore')
    , pub_param = require('./pub_param')
    , pagination = require('./pagination')
    , first_page = document.getElementById('first-page')
    , last_page = document.getElementById('last-page')
    , page = 1
    , limit = 4
    , user_list = document.getElementById('user-list')
    , input = document.getElementById('search-input')
    ;

function detect_submit(){
    el.form.addEventListener('submit',function(e){
        e.preventDefault();
        keyword = pub_param.set_keyword(el.input.value);
        if(!keyword)
            return;

        // 按关键字搜索用户
        search.user('',function(data){
            console.log(data);
            el.render_user_list(data);
            el.hide_load_more();

            // 渲染页码
            amount = data.total_count;
            pagination.render_pagination(amount);
            // pagination.click_first_page(amount);
            // pagination.click_last_page(amount);
        });
        // 记录关键字
        localstore.append_history(keyword);

    });
}

function detect_first_page(){
    first_page.addEventListener('click',function(e){
        console.log('此时的关键字' + input.value)
        keyword = input.value
        pagination.click_first_page(keyword)

    })
}

function detect_last_page(){
    last_page.addEventListener('click',function(){
        console.log('此时的关键字' + input.value)
        keyword = input.value
        pagination.click_last_page(keyword)
    })
}
function detect_load_more(){
    el.load_more.addEventListener('click',function(){
        // console.log('click load more')
        // console.log('发射之前page='+ page)
        var config = {
            page : ++page,
            limit: limit,
        }
        // console.log('准备发射page=' + page)
        search.user(config,function(data){
            el.render_user_list(data, user_list.innerHTML);
            // 渲染页码
            amount = data.total_count;
            pagination.render_pagination(amount);
        })
    })
}

function detect_click_input(){
    el.input.addEventListener('click',function(e){
        el.render_history_list();
        el.show_history_list();
    })
}

function detect_click_document(){
    document.documentElement.addEventListener('click',function(e){
        // console.log('点击了主页面')
        
        var target = e.target
        
        // console.log(target)
        var in_search_input = target.closest('#search-input')
            , in_history_list = target.closest('.history-list')

        if(in_history_list || in_search_input)
            return;

        el.hide_history_list();
    })
}

function add_event(){
    detect_submit();
    detect_load_more();
    detect_click_input();
    detect_click_document();
    detect_first_page();
    detect_last_page();

}

module.exports = {
    add_event:add_event,
}