window.BaseApi = BaseApi;

function BaseApi(list, max_id) {
    this.max_id = max_id || 1;
    this.todo_list = list;
  }

BaseApi.prototype.$add = add;
BaseApi.prototype.$remove = remove;
BaseApi.prototype.$update = update;
BaseApi.prototype.$read = read;

function add(row) {
  var id = this.max_id + 1;
  row.id = id;
  this.todo_list.push(row);
}

function remove(id) {
  var index_num = find_index_by_id(this.todo_list, id);
  if(index_num<0)
    return;

  this.todo_list.splice(index_num, 1);
}

function update(id, new_row) {
  var index_num = find_index_by_id(this.todo_list, id);
  if (index_num < 0)
      return;
  delete new_row.id;
  var old_row = this.todo_list[index_num];
  this.todo_list[index_num] = Object.assign({}, old_row, new_row);
}

function read(id) {
  if (id)
      return find_by_id(this.todo_list,id);
  return this.todo_list
}
// 功能函数
function find_index_by_id(arr, id) {
  return arr.findIndex(function (item) {
      return item.id == id;
  });
}

function find_by_id(arr,id) {
  var index = find_index_by_id(arr, id);
  return arr[index];
}