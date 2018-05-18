Window.Ui = Ui;

function Ui(form_selector, list_selector) {
    this.form = document.querySelector(form_selector);
    this.list = document.querySelector(list_selector);
    this._api = new Api();
}

Ui.prototype.get_form_data = get_form_data;
Ui.prototype.set_form_data = set_form_data;
Ui.prototype.render = render;

function render() {
    var list = this._api.read();
    var me = this;
    list.forEach(function (item) {
        var el = document.createElement('div');

        el.innerHTML = `
        <div class="row todo-item">
      <div class="col checkbox">
        <input type="checkbox">
      </div>
      <div class="col detail">
        <div class="title">${item.title}</div>
      </div>
      <div class="col tool-set">
        <button>更新</button>
        <button>删除</button>
      </div>
    </div>
        `
        me.list.appendChild(el);
    })
}
function get_form_data(form_selector) {
    var data = {};
    var form = document.querySelector(form_selector);
    var list = form.querySelectorAll('[name]');

    list.forEach(function (input) {
        var value = input.value
            , name = input.name

        switch (input.nodeName) {
            case 'INPUT':
                switch (input.type) {
                    case 'text':
                        break;
                    case 'search':
                        break;
                    case 'number':
                        value = parseFloat(value)
                    case 'password':
                    case 'input':
                    case 'hidden':
                        data[input.name] = value;
                        break;
                    case 'radio':
                    case 'checkbox':
                        data[input.name] = input.checked;
                        break;
                }
                break;
            case 'TEXTAREA':
                data[input.name] = value;
                break;
        }
    })
    return data;
}

function set_form_data(form_selector, data) {
    var form = document.querySelector(form_selector);

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

var ui = new Ui('#todo-form', '#todo-list');
console.log(ui);
