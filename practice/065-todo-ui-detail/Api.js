function api(max_id){
  this.max_id = max_id || 101;
  this.todo_list = [
    {

    }
  ]
  
};

api.prototype.add = add;
api.prototype.remove = remove;
api.prototype.update = update;
api.prototype.read = read;

function add(row,id){
  var id = this.max_id + 1;
  row.id = id;
  this.todo_list.push(row);
}

function remove(id){
  
}

function update(){

}

function read(){

}

function find_index_by_id(arr,id){
  arr.forEach(function(item){
    if(item.id == id){
      return  arr.findIndex(item.id);
    }
  })
}