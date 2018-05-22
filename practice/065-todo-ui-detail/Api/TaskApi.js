window.TaskApi = TaskApi;

function TaskApi(list,max_id){
  this.max_id = max_id || 3;
  this.list = [
    {
      id:1,
      title: '买菜',
      completed: false,
      group_id: 1,
    },
    {
      id:2,
      title: '洗菜',
      completed: false,
      group_id: 1,
    },
    {
      id:1,
      title: '背单词',
      completed: false,
      group_id: 2,
    },
  ];
  this.base_api = new BaseApi(this.list);
}

TaskApi.prototype.add = add;
TaskApi.prototype.remove = remove;
TaskApi.prototype.update = update;
TaskApi.prototype.read = read;

function add(row) {
  if(row.title)
    return;

  return this.base_api.add(row);
}

function remove(id) {
  // 默认为1，不删
  if(id ==1)
    return;
  
  return this.base_api.remove(id);
}

function update(id, new_row) {
    return this.base_api.update(id,new_row);
}

function read(id) {
  return this.base_api.read(id);
}
