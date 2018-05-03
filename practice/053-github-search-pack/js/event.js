var el = require('./element')
    , search = require('./search')
    , keyword
    , page = 1
    , limit = 5
    ;

function detect_submit() {
    el.form.addEventListener('submit', function (e) {
        e.preventDefault();
        keyword = el.input.value;

        search.user(keyword, function (data) {
            el.render_user(data);
        });
    });
};

function detect_load_more(){
    el.load_more.addEventListener('click',function(e){
        // 准备配置
        var config = {
            page: page++,
            limit: limit,
        };

        // 开始搜索
        search.user(keyword,function(data){
            el.render_user(data);
        },config);
    });
}

function add_events() {
    detect_submit();
    detect_load_more();
}

module.exports = {
    add_events: add_events,
    detect_load_more: detect_load_more,
    detect_submit: detect_submit,
}
