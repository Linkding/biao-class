var config
    , el
    , page_amount //通过amount/limit计算所得
    , el_pagination_list
    , el_pagination_fieldset
    , default_config = {
        amount: null,
        limit: null, // @?
        range: 5,
        current: 1
    }
    , output = {
        init: init,
        set_amount_limit:set_amount_limit,
        show:show,
        hide:hide,
        enabled:enabled,
        disabled:disabled,
    }

function init(user_config) {
    el = document.querySelector(user_config.el);

    if (!el)
        throw "Invalid root element"
    // 合并默认配置和用户配置
    config = Object.assign({}, default_config, user_config)
    console.log(config)
    // 渲染插件基础HTML结构
    render_init();

    //amount和limit为必填参数
    if (!user_config.amount || !user_config.limit)
        return;
    // 计算总页数
    cal_page_amount();

    change_page(config.current, true);
    // 通已知的页面总数渲染所有的数字按钮
    render_list();
}

function render_init() {
    el.classList.add('pagination')

    el.innerHTML = `
    <fieldset class="pagination-fieldset">
    <div class="pagination-pre">
      <button class="pagination-first">First</button>
      <button class="pagination-prev">Prev</button>
    </div>
    <div class="pagination-list"></div>
    <div class="pagination-post">
      <button class="pagination-next">Next</button>
      <button class="pagination-last">Last</button>
    </div>
  </fieldset>
    `;

    el_pagination_list = el.querySelector('.pagination-list');
    el_pagination_fieldset = el.querySelector('.pagination-fieldset');

    el.addEventListener('click', function (e) {
        var target = e.target //哪个在冒泡
            , is_numeric_btn = target.classList.contains('pagination-item') //contains方法返回布尔值
            , first = target.classList.contains('pagination-first')
            , last = target.classList.contains('pagination-last')
            , prev = target.classList.contains('pagination-prev')
            , next = target.classList.contains('pagination-next')
            ;
        if (is_numeric_btn) { //如果是数字按钮
            var page = parseInt(target.dataset.page);
            console.log('点击了：' + page)
            change_page(page);//切换当前页码为点击页码
        } else if (first) {
            change_page(1);
        } else if (last) {
            change_page(page_amount);
        } else if (prev) {
            change_page(config.current - 1);
        } else if (next) {
            change_page(config.current + 1);
        } else {

        }

        render_list();
    })
}

//通过已知的页面总数渲染所有的数字按钮
function render_list() {
    el_pagination_list.innerHTML = '';
    //确定按钮范围
    var between = calc_start_and_end()
        , start = between.start
        , end = between.end
        ;
    // 生成翻页按钮
    for (var i = start; i <= end; i++) {
        var btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('pagination-item');
        btn.dataset.page = i;
        el_pagination_list.appendChild(btn);

        if (i == config.current)
            btn.classList.add('active');
    }

}

// 计算数字按钮开始和结束
function calc_start_and_end() {
    var start
        , end
        , middle = Math.ceil(config.range / 2)
        , reaching_left = config.current <= middle
        , reaching_right = config.current >= page_amount - middle
        ;

    if (reaching_left) {
        start = 1;
        if(config.range > page_amount){
            end = page_amount;
        }else {
            end = config.range;
        }
    } else if (reaching_right) {
        start = page_amount - (config.range - 1);
        end = page_amount;
    } else {
        start = config.current - (middle - 1);
        end = config.current + (middle - 1);
    };

    return {
        start: start,
        end: end
    }
}

// 验证并更改当前页
// 更改后通知回调函数
function change_page(page, force) {
    // 保存下更改前的页码数
    var old = config.current;
    // 切换页码
    config.current = page;
    // 如果大于最大的页码数
    if (page > page_amount) {
        config.current = page_amount;
    }
    
    //如果小于最小页码数
    if (page < 1){
        config.current = 1;
    }
    
    // 通知使用者
    if (config.on_page_change)
        config.on_page_change(config.current);

    if (!force && old == config.current)
        return;
}

// 计算总页码数
function cal_page_amount() {
    page_amount = Math.ceil(config.amount / config.limit)
}

// 设置列表总数和每页数量
function set_amount_limit(amount,limit){
    config.amount = amount;
    config.limit = limit;
    
    cal_page_amount();

    render_list();
}

function disabled(){
    el_pagination_fieldset.disabled = true;
}

function enabled(){
    el_pagination_fieldset.disabled = false;
}

function hide(){
    el.hidden = true;
}

function show(){
    el.hidden = false;
}

function is_vissble(){
    return !el.hidden;
}

module.exports = output