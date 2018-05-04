var el = require('./element')
    , search = require('./search')
    , keyword
    , page = 1
    , limit = 4
    ;

function detect_submit(){
    el.form.addEventListener('submit',function(e){
        e.preventDefault();
        keyword = el.input.value;
        search.user(keyword,function(data){
            console.log(data);
            el.render_user_list(data);
            el.show_load_more();
            console.log('show more')
        });

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

}

module.exports = {
    add_event:add_event,
}