window.Ui = Ui;

function Ui(form_selector, list_selector, input_selector) {
    this.form = document.querySelector(form_selector);
    this.list = document.querySelector(list_selector);
    this.input = document.querySelector(input_selector);
    this._api = new Api();
    this.init = init;
}

Ui.prototype.get_form_data = get_form_data;
Ui.prototype.set_form_data = set_form_data;
Ui.prototype.render = render;
Ui.prototype.detect_add = detect_add;
Ui.prototype.detect_click = detect_click;
Ui.prototype.remove = remove;

function init() {
    this.render();
    this.detect_add();
    this.detect_click();
}

function render() {
    var me = this;
    //从api获取数据
    var todo_list = this._api.read();//获取的是一个数组

    //清空历史数据
    me.list.innerHTML = '';
    todo_list.forEach(function (item) {
        var el = document.createElement('div');
        el.classList.add('row', 'todo-item');
        el.dataset.id = item.id;
        el.innerHTML = `
        <div class="col checkbox">
        <input type="checkbox">
        </div>
        <div class="col detail">
            <div class="title">${item.title}</div>
        </div>
        <div class="col tool-set">
            <button class="update">更新</button>
            <button class="remove">删除</button>
        </div>
        `
        me.list.appendChild(el);
    });
}

function detect_add() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var row = me.get_form_data(me.form);

        if (row.id) {
            me._api.update(row.id, row)
        } else {
            me._api.add(row)
        }
        // 重新渲染
        me.render();
        // 清空输入框
        me.input.value = ''
    });

}

function detect_click() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target
            , todo_item = target.closest('.todo-item')
            , id = todo_item.dataset.id
            , is_update_btn = target.classList.contains('update')
            , is_remove_btn = target.classList.contains('remove')
            ;

        if (is_update_btn) {
            var row = me._api.read(id);
            me.set_form_data(me.form, row);
        } else if (is_remove_btn) {
            console.log('id:' + id)
            me.remove(id);
        }
    })
}

function remove(id) {
    this._api.remove(id);
    this.render();
}
function get_form_data(form) {
    var data = {};
    // 获取表单内所有拥有name的元素
    var list = form.querySelectorAll('[name]');
    // 遍历name元素
    list.forEach(function (input) {
        // 按name元素中的节点名分类筛选
        switch (input.nodeName) {
            case 'INPUT':
                switch (input.type) {
                    case 'text':
                    case 'search':
                    case 'password':
                    case 'hidden':
                    case 'number':
                        //如果是用户输入类型，请直接用用户输入的值
                        data[input.name] = input.value;
                        break;
                    case 'radio':
                    case 'checkbox':
                        // 如果是打钩类数据，使用打钩状态
                        data[input.name] = input.checked;
                        break;
                }
                break;
            case 'TEXTAREA':
                data[input.name] = input.value;
                break;
        }
    })
    return data;
}

// * @param element form 元素
// * @param Object data 类{}
function set_form_data(form, data) {
    // 遍历对象
    for (var key in data) {
        var value = data[key];
        //找到当前属性在表单中的位置
        var input = document.querySelector(`[name=${key}]`)
        //如果不存在，则继续下一个
        if (!input)
            continue;
        var input_type = typeof value;
        switch (input_type) {
            /*如果是字符串或者数字，就默认其为input[type=number|text|url|...]*/
            case 'string':
            case 'number':
                input.value = value;
                break;
            /*如果是布尔值，就默认其为input[type=radio|checkbox]*/
            case 'boolean':
                input.checked = value;
                break;
        }
    }
}