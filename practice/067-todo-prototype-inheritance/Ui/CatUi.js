window.CatUi = CatUi;

function CatUi() {
    this.list = document.querySelector('#cat-list');
    this.add_cat = document.querySelector('#add-cat');
    this.cat_form = document.querySelector('#cat-form');
    this._api = new CatApi();
    this.updating_cat_item = null;//默认为空，用于保存点击更新的那个list，独立保存一份，方便取消时候，恢复回去
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;
CatUi.prototype.test = test;
CatUi.prototype.detect_click_add = detect_click_add;
CatUi.prototype.detect_submit_form = detect_submit_form;
CatUi.prototype.detect_cancel_form = detect_cancel_form;
CatUi.prototype.detcet_click_list = detcet_click_list;
CatUi.prototype.show_cat_input = show_cat_input;
CatUi.prototype.hide_cat_input = hide_cat_input;
CatUi.prototype.get_form_data = helper.get_form_data;
CatUi.prototype.set_form_data = helper.set_form_data;
CatUi.prototype.clear_form = helper.clear_form;
CatUi.prototype.show_updating_cat_item = show_updating_cat_item;
CatUi.prototype.reset_cat_form_location = reset_cat_form_location;

function init() {
    this.render();
    this.detect_click_add();
    this.detect_submit_form();
    this.detect_cancel_form();
    this.detcet_click_list();
}


function test() {
    console.log(1)
}

function render() {
    var cat_list = this._api.read();
    var me = this;

    this.list.innerHTML = '';
    cat_list.forEach(function (item) {
        var el = document.createElement('div');
        el.classList.add('cat-item', 'row');
        el.dataset.id = item.id;

        el.innerHTML = `
        <div class="input">
        <input class="item" type="text" value="${item.title}" disabled>
        </div>
        <div class="tool-set">
        ${
            item.id == 1 ?
            '' :
            '<span class="update">更新</span><span class="delete">删除</span>'
        }
        </div>
        `
            ;

        me.list.appendChild(el);
    })

}

function detect_submit_form() {
    var me = this;

    this.cat_form.addEventListener('submit', function (e) {
        e.preventDefault();
        var row = me.get_form_data(me.cat_form)
            , id = row.id
            ;
        if (row.id) {
            me._api.update(row.id, row)
            me.hide_cat_input();
        } else {
            me._api.add(row);
        }

        me.clear_form(me.cat_form);
        me.render();

    })
}

function detect_cancel_form() {
    var me = this;
    this.cat_form.addEventListener('click', function (e) {
        var is_cancel_btn = e.target.dataset.action == 'cancel';
        if (is_cancel_btn){
            me.hide_cat_input();
            me.show_updating_cat_item();
            me.reset_cat_form_location();
        }
    })
}

// 用于在取消编辑更新cat_list的时候，恢复cat form回到原来的位置
function reset_cat_form_location(){
    this.list.insertAdjacentElement('afterend',this.cat_form);
    this.clear_form(this.cat_form);
}
function detect_click_add() {
    var me = this;
    this.add_cat.addEventListener('click', function (e) {
        me.show_cat_input();
    })
}

function detcet_click_list() {
    var me = this;
    this.list.addEventListener('click', function (e) {
        var target = e.target
            , is_update_btn = target.classList.contains('update')
            , is_delete_btn = target.classList.contains('delete')
            , is_item = target.classList.contains('item')
            , cat_item = target.closest('.cat-item')
            // , id = cat_item.dataset.id
            ;
        //判断点击的元素是否是insert移动过来的
        if(cat_item){
            var id = cat_item.dataset.id
                , title = me._api.find(id).title
                ;
        }
        // 如果是默认的id1，就返回，不删除，永远保留
        if (id == 1) 
            return;

        if (is_delete_btn) {
            me._api.remove(id);
            me.render();
        } else if (is_update_btn) {
            if (me.updating_cat_item)
            me.updating_cat_item.hidden = false;

            var row = me._api.find(id)
            me.set_form_data(me.cat_form, row);//将点击的对应数据写入输入框
            me.show_cat_input();//显示输入框
            cat_item.hidden = true;//隐藏锁点击的对应数据元素
            cat_item.insertAdjacentElement('afterend',me.cat_form)//将输入框移动到点击元素位置

            me.updating_cat_item = cat_item; //将目前编辑这个list存入预设的一个，用于恢复时候的变量
        } else if(is_item){
            
        }
    })
}

function show_cat_input() {
    this.cat_form.hidden = false;
}

function hide_cat_input() {
    this.cat_form.hidden = true;
}

function show_updating_cat_item(){
    if(this.updating_cat_item)
        this.updating_cat_item.hidden = false;
}

function toggle_group(){

}