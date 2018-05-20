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
Ui.prototype.detect_click_list = detect_click_list;
Ui.prototype.clear_form = clear_form;

function init() {
    this.render();
    this.detect_add();
    this.detect_click_list();
}

function detect_add() {
    var me = this;
    this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var row = get_form_data(me.form);
        console.log(row);

        if(!row.title)
            return;

        if(row.id){
            me._api.update(row.id,row)
        } else {
            me._api.add(row);
            // console.log(me._api.read())
        };
        me.render();
        me.clear_form();
        // me.input.value = '';
    });
}

function clear_form(){
   this.form.reset();
   document.querySelector('')
}

function detect_click_list() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target
            , todo_item = target.closest('.todo-item')
            // , id = parseInt(todo_item.dataset.id)
            , id = todo_item.dataset.id
            , is_update_btn = target.classList.contains('update')
            , is_remove_btn = target.classList.contains('remove')
            ;

        if (is_update_btn) {
            var row = me._api.read(id);
            me.set_form_data(me.form,row);
        } else if (is_remove_btn) {
            console.log('点击删除')
            me._api.remove(id);
            me.render();
        }
    })
}

function render() {
    var todo_list = this._api.read();
    var me = this;

    this.list.innerHTML = '';
    todo_list.forEach(function (item) {
        var el = document.createElement('div');
        el.classList.add('row', 'todo-item')
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
            ;
        me.list.appendChild(el);
    })
}
function get_form_data(form) {
    var data = {};
    var list = form.querySelectorAll('[name]');

    list.forEach(function (input) {
        switch (input.nodeName) {
            case 'INPUT':
                switch (input.type) {
                    case 'text':
                    case 'search':
                    case 'number':
                    case 'password':
                    case 'hidden':
                        data[input.name] = input.value;
                        break;
                    case 'radio':
                    case 'checkbox':
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

function set_form_data(form, data) {
    for (var key in data) { //data类型为对象时，遍历的key为键
        var value = data[key];

        var input = form.querySelector(`[name=${key}]`);
        // 如果不存在指定这个元素name，跳过继续下一个
        if (!input)
            continue;

        var data_type = typeof value; //获取值的类型
        switch (data_type) {
            // 如果是字符串或者数字，就默认为input[type=text|password|...]
            case 'string':
            case 'number':
                input.value = value;
                break;
            // 如果是布尔值，默认input[type=radio|checkbox|...]
            case 'boolean':
                input.checked = value;
                break;

        }
    }

}

