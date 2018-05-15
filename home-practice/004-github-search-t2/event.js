var search = require('./search')
    , pub_param = require('./pub_param')
    , el = require('./element')
    , pagination = require('./src/plugin/pagination/pagination')
    , history = require('./src/plugin/history/history')
    ;

function add_event() {
    detect_input_click();
    detect_submit();
}

function plugins_init() {
    history.init({
        el: '.history-container'
    });

    pagination.init({
        el: '.pagination',
        amount: pub_param.get_amount(),
        limit: pub_param.get_limit(),

        on_page_change: function (e) {

        }
    })
}
// 绑定表单提交事件
function detect_submit() {
    el.form.addEventListener('click', function (e) {
        e.preventDefault();
        // 已有资源：pagination和history组件，渲染userlist的功能，

        // 保存关键字到公共变量
        var keyword = pub_param.set_keyword(el.input.value);
        if(!keyword){
            return;
        }
        // 增加到历史记录中
        history.add(keyword);
        // 开始搜索
        search.search(search_on_succeed);

    });
}

function search_on_succeed(){
    
}

function detect_input_click() {

}

module.exports = {
    add_event: add_event,
}