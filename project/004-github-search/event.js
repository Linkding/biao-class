var el = require('./element')
    , search = require('./search')
    , pub_param = require('./pub_param')
    , history = require('./src/plugin/history/history')
    , pagination = require('./src/plugin/pagination/pagination')
    ;

function plugins_init(){
    pagination.init({
        el:'.pagination-container',
        amount: pub_param.get_amount(),
        limit: pub_param.get_limit(),
        // 对于需要跨组件调用情况，不建议将代码写入组件，而通过回调函数方式注入。
        on_page_change: function(page){
            if(page == pub_param.get_current_page()){
                return;
            };
            pub_param.set_current_page(page);
            search.search(on_search_succeed);
        }
    });

    history.init({
        el: '.history-list',
        on_click: function(keyword,e){
            pub_param.set_keyword(keyword);
            search.search(on_search_succeed);
        }
    })
}
function detect_submit() {
    el.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var keyword = pub_param.set_keyword(el.input.value);
        // console.log(keyword)
        if(!keyword){
            console.log('空即是空')
            return;
        }

        history.add(keyword);

        // 隐藏只有得到结果的组件
        // el.placeholer.hidden = true;

        // 发起搜索用户
        search.search(on_search_succeed);
    })
}

function on_search_succeed(data) {
    //拿到数据后，开始存一存
    pub_param.set_user_list(data.items);
    pub_param.set_amount(data.total_count);

    // pagination组件
    console.log('amount: '+pub_param.get_amount(),'limit: '+pub_param.get_limit())
    pagination.set_amount_limit(pub_param.get_amount(),pub_param.get_limit())
    pagination.show();

    el.reset_user_list();//这里待测试

    //有数据了，渲染用户
    el.render();
}

function detect_input_click() {
    el.input.addEventListener('click', function () {
        history.show_history();
    })
}

function detect_document_click() {
    document.documentElement.addEventListener('click', function (e) {
        var target = e.target
            , in_search = target.closest('#search-input')
            , in_form = target.closest('#form-search')

        if (!in_form || !in_search)
            history.hide_history();
    })
}

function detect_top_click(){
    el.top.addEventListener('click',function(){
        window.scrollTo(0,0);
    })
}

function add_event() {
    detect_input_click();
    detect_document_click();
    detect_submit();
    plugins_init();
    detect_top_click();
}

module.exports = {
    add_event
}