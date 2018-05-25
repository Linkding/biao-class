window.TaskUi = TaskUi;
test_list = [
    { // 0
      id        : 100,
      title     : '买菜',
      completed : false,
      cat_id  : 2,
    },
    { // 1
      id        : 101,
      title     : '洗菜',
      completed : false,
      cat_id  : 2,
    },
    {
      id        : 102,
      title     : '背单词',
      completed : false,
      cat_id  : 3,
    },
  ]

function TaskUi(config) {
    var default_config = {
        form_selector :'#todo-form',
        list_selector: '#todo-list',
        input_selector:'#todo-input',
        cat_title_selector:'#cat-title',
    }
    var c = this.config = Object.assign({},default_config,config);

    this.form = document.querySelector(c.form_selector);
    this.list = document.querySelector(c.list_selector);
    this.input = document.querySelector(c.input_selector);
    this.cat_title = document.querySelector(c.cat_title_selector);
    this._api = new TaskApi(test_list);
}

TaskUi.prototype.init = init;
TaskUi.prototype.get_form_data = helper.get_form_data;
TaskUi.prototype.set_form_data = helper.set_form_data;
TaskUi.prototype.render = render;
TaskUi.prototype.detect_add = detect_add;
TaskUi.prototype.detect_click = detect_click;
TaskUi.prototype.remove = remove;
TaskUi.prototype.test = test;

function init() {
    this.render();
    this.detect_add();
    this.detect_click();
    // this.test();
}

function test(){
    console.log('TaskUi test')
}

function render(cat_id,cat_title) {
    var me = this;
    //从api获取数据
    var todo_list = cat_id ?
                    this._api.read_by_cat(cat_id):
                    this._api.read();

    
    if(todo_list.length){
        //清空历史数据
        this.list.innerHTML = '';
        // 插入选中的cat的title
        this.cat_title.innerHTML= `<div class="cat-title" data-cat-id=${cat_id}>${cat_title}</div>`;
    } 
    else{
        this.cat_title.innerHTML= '';
        this.list.innerHTML = `<div class="empty-holder">暂无内容</div>`;
    }
    // 初始渲染时候，cat title默认是空
    if(!cat_title){
        this.cat_title.innerHTML= '';
    } 

    // 更改form中cat id的值
    me.set_form_data(me.form,{cat_id:cat_id})
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
            var row = me._api.find(id);
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

// function get_form_data(form) {
//     var data = {};
//     // 获取表单内所有拥有name的元素
//     var list = form.querySelectorAll('[name]');
//     // 遍历name元素
//     list.forEach(function (input) {
//         // 按name元素中的节点名分类筛选
//         switch (input.nodeName) {
//             case 'INPUT':
//                 switch (input.type) {
//                     case 'text':
//                     case 'search':
//                     case 'password':
//                     case 'hidden':
//                     case 'number':
//                         //如果是用户输入类型，请直接用用户输入的值
//                         data[input.name] = input.value;
//                         break;
//                     case 'radio':
//                     case 'checkbox':
//                         // 如果是打钩类数据，使用打钩状态
//                         data[input.name] = input.checked;
//                         break;
//                 }
//                 break;
//             case 'TEXTAREA':
//                 data[input.name] = input.value;
//                 break;
//         }
//     })
//     return data;
// }

// // * @param element form 元素
// // * @param Object data 类{}
// function set_form_data(form, data) {
//     // 遍历对象
//     for (var key in data) {
//         var value = data[key];
//         //找到当前属性在表单中的位置
//         var input = document.querySelector(`[name=${key}]`)
//         //如果不存在，则继续下一个
//         console.log(input)
//         if (!input)
//             continue;
//             // console.log(input)
//         var input_type = typeof value;
//         switch (input_type) {
//             /*如果是字符串或者数字，就默认其为input[type=number|text|url|...]*/
//             case 'string':
//             case 'number':
//                 input.value = value;
//                 break;
//             /*如果是布尔值，就默认其为input[type=radio|checkbox]*/
//             case 'boolean':
//                 input.checked = value;
//                 break;
//         }
//     }
// }