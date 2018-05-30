window.BaseApi = BaseApi;

// {这是一个对数据增删改查的基础api}
function BaseApi(list, max_id) {
  this.default_list = [];
  this.default_max_id = 0;
  this.reverse_direction = false;//是否按正序插入
  this.on_sync = null;
}

BaseApi.prototype.$add = add;
BaseApi.prototype.$remove = remove;
BaseApi.prototype.$update = update;
BaseApi.prototype.$read = read;
BaseApi.prototype.$find = find;
BaseApi.prototype.sync_to = sync_to;
BaseApi.prototype.load_data = load_data;
BaseApi.prototype.sync_from = sync_from;

function load_data(){
  sync_from();
}
function add(row) {
  this.max_id = this.max_id + 1; //@ 注意这里写法，每次add后，都要更新max_id；
  row.id = this.max_id;
  if (this.reverse_direction)
    this.todo_list.push(row);
  else
    this.todo_list.unshift(row);

  this.sync_to();
}

function remove(id) {
  var index_num = find_index_by_id(this.todo_list, id);
  if (index_num < 0)
    return;

  this.todo_list.splice(index_num, 1);
  this.sync_to();
}

function update(id, new_row) {
  var index_num = find_index_by_id(this.todo_list, id);
  if (index_num < 0)
    return;
  delete new_row.id;
  var old_row = this.todo_list[index_num];
  this.todo_list[index_num] = Object.assign({}, old_row, new_row);
  this.sync_to();
}

function read() {
  return this.todo_list
}
// 查找其中一条数据 
function find(id) {
  return find_by_id(this.todo_list, id)
}

// =========功能函数=========
function find_index_by_id(arr, id) {
  return arr.findIndex(function (item) {
    return item.id == id;
  });
}

function find_by_id(arr, id) {
  var index = find_index_by_id(arr, id);
  return arr[index];
}

function sync_to() {
  store.set(this._model_name + '-list', this.list || this.default_list);
  store.set(this._model_name + '-max_id', this.max_id || this.default_max_id)
  if(on_sync)
    on_sync(this.list);
}
// 从localstore获取数据
function sync_from(){
  var old_list = store.get(this._model_name + '-list')

  if(!old_list || !old_list.length){
    console.log(this.default_list)
    this.list = this.default_list;
    console.log('等于默认 default_list')
  } else {
    this.list = old_list;
    console.log('不等于默认 default_list')
  }
  
  this.max_id = store.get(this._model_name + '-max_id') || this.default_max_id;
}