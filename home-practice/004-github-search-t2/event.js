var history = require('./src/plugin/history/history')
    , pagination = require('./src/plugin/pagination/pagination')
    , search = require('./search')
    , el = require('./element')
    , pub_param = require('./pub_param')
    ;

function add_event(){
    detect_submit();
}

function plugins_init(){
    history.init({
        el:'.history-list',
        on_click:function(kwd,e){
            pub_param.set_keyword(kwd);
            search.search(search_on_succeed);
        }
    });

    pagination.init({
        el:'.pagination-container',
        amount: pub_param.get_amount(),
        limit: pub_param.get_limit(),
        on_page_change: function(page,e){
            // 如果点击的是当前页，无需操作，直接返回
            if(pub_param.get_current_page() == page){
                return;
            }
            // 保存点击的当前页码到公共变量
            pub_param.set_current_page(page);
            // 重新搜索对应的页码的用户信息
            search.search(search_on_succeed);
        }
    })
}
function detect_submit(){
    el.form.addEventListener('click',function(e){
        e.preventDefault();
        var keyword = pub_param.set_keyword(el.input.value);

        if(!keyword){
            return;
        }
        // 添加到历史记录并
        history.add(keyword);
        // 开始搜索
        search.search(search_on_succeed);
    });
}

function search_on_succeed(data){
    // 主要功能：当完成获取用户数据后，需要渲染用户列表，也需要显示页码组件。

    // 从获取回来的数据中，保存下来用户数据list，和用户总数
    pub_param.set_user_lisr(data.items);
    pub_param.set_amount(data.total_count);

    // 传入组件需要的数据，重新渲染（init时候已经渲染，只是没有显示），并显示
    pagination.set_amount_limit(pub_param.get_amount(),pub_param.get_limit())
    pagination.show();

    // 有数据了，开始渲染吧
    el.render();
}


module.exports = {
    add_event:add_event,
}