window.CatUi = CatUi;

function CatUi() {
    this.list = document.querySelector('#cat-list');
    this.add_cat = document.querySelector('#add-cat')
    this.cat_form = document.querySelector('#cat-form');
    this._api = new CatApi();
    // this.test = test();
}

CatUi.prototype.render = render;
CatUi.prototype.test = test;
CatUi.prototype.init = init;
CatUi.prototype.detect_click_add = detect_click_add;
CatUi.prototype.show_cat_input = show_cat_input;
CatUi.prototype.hide_cat_input = hide_cat_input;


function init() {
    this.render();
    this.test();
}

function test(){
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


function detect_click_add() {
    var me = this;
    this.add_cat.addEventListener('click', function (e) {
        me.show_cat_input();
    })
}

function show_cat_input() {
    this.cat_form.hidden = false;
}
function hide_cat_input() {
    this.cat_form.hidden = true;
}