window.CatUi = CatUi;

function CatUi() {
    this.list = document.querySelector('#cat-list');
    this.add_cat = document.querySelector('#add-cat');
    this.cat_form = document.querySelector('#cat-form');
    this._api = new CatApi();
    // this.init = init;
}

CatUi.prototype.init = init;
CatUi.prototype.render = render;
CatUi.prototype.test = test;
CatUi.prototype.detect_click_add = detect_click_add;
CatUi.prototype.detect_submit_form = detect_submit_form;
CatUi.prototype.detect_cancel_form = detect_cancel_form;
CatUi.prototype.detcet_click_update = detcet_click_update;
CatUi.prototype.detcet_click_delete = detcet_click_delete;
CatUi.prototype.show_cat_input = show_cat_input;
CatUi.prototype.hide_cat_input = hide_cat_input;
CatUi.prototype.get_form_data = helper.get_form_data;
CatUi.prototype.set_form_data = helper.set_form_data;
CatUi.prototype.clear_form = helper.clear_form;

function init() {
    this.render();
    this.detect_click_add();
    this.detect_submit_form();
    this.detect_cancel_form();
    this.detcet_click_update();
    this.detcet_click_delete();
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
        <input type="text" value="${item.title}" disabled>
        </div>
        <div class="tool-set">
        <span class="update">更新</span>
        <span class="delete">删除</span>
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
        // console.log(row);
        if(id){
            me._api.update(id,row)
        } else{
            me._api.add(row);
        }

        me.render();
        me.clear_form(me.cat_form);

    })
}

function detect_cancel_form() {
    var me = this;
    this.cat_form.addEventListener('click', function (e) {
        var is_cancel_btn= e.target.dataset.action ;

        if (is_cancel_btn == 'cancel')
            me.hide_cat_input();
    })
}

function detect_click_add() {
    var me = this;
    this.add_cat.addEventListener('click', function (e) {
        me.show_cat_input();
    })
}

function detcet_click_update() {
    var me = this;
    this.list.addEventListener('click',function(e){
        var target = e.target
            , is_update_btn = target.classList.contains('update')
            , cat_item = target.closest('.cat-item')
            , id = cat_item.dataset.id
            , row = me._api.read(id)
            ;
        if(is_update_btn){
            me.set_form_data(me.cat_form,row);
            me.show_cat_input();
            // me.set_form_data()
        }

    })
}

function detcet_click_delete(){
    var me = this;
    this.list.addEventListener('click',function(e){
        var target = e.target
        , is_delete_btn = target.classList.contains('delete')
        , cat_item = target.closest('.cat-item')
        , id = cat_item.dataset.id
        , row = me._api.read(id)
        ;

        if(id == 1)
            return;
            
        if(is_delete_btn){
            // console.log(11)
            me._api.remove(id);
        }
        me.render();
    })
}

function show_cat_input() {
    this.cat_form.hidden = false;
}

function hide_cat_input() {
    this.cat_form.hidden = true;
}