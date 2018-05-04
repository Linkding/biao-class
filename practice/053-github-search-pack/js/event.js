var el = require('./element')
    , search = require('./search')
    , localstore = require('./localstore')
    , pub_param = require('./pub_param')
    , page = 1
    , limit = 4
    ;

function detect_submit(){
    el.form.addEventListener('submit',function(e){
        e.preventDefault();
        keyword = pub_param.set_keyword(el.input.value);
        if(!keyword)
            return;

        // 按关键字搜索用户
        search.user(keyword,function(data){
            console.log(data);
            el.render_user_list(data);
            el.show_load_more();
            console.log('show more')
        });
        // 记录关键字
        localstore.append_history(keyword);

    });
}

function detect_load_more(){
    el.load_more.addEventListener('click',function(){
        console.log('click load more')
        console.log('发射之前page='+ page)
        var config = {
            page : ++page,
            limit: limit,
        }
        console.log('准备发射page=' + page)
        search.user(keyword,function(data){
            el.render_user_list(data);
        },config)
    })
}

function detect_click_input(){
    el.input.addEventListener('click',function(e){
        el.render_history_list();
        el.show_history_list();
    })
}

function add_event(){
    detect_submit();
    detect_load_more();
    detect_click_input();

}

module.exports = {
    add_event:add_event,
}