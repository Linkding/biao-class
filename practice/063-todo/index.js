<<<<<<< HEAD
function Todo(name,age){
    this.max_id = 1;
    this.todo_list = [
        {
            id : 1,
            name: name,
            age: age
        }
    ];

    this.prototype.add = add;
    this.prototype.remove = remove;
}


// ==========增========
function add(row){
    var id = max_id + 1;
    row.id = id;
    Todo.todo_list.push(row);
}

// =========删=========
function remove(id){
    var index = find_index_by_id(todo_list,id);
    todo_list.splice(index,1)
}

// =========改=======
function update(id,new_row){
    var index = find_index_by_id(todo_list,id);
    if(index < 0)
        return
    var old_row = todo_list[index];
    todo_list[index] = Object.assign({},old_row,new_row)
=======
function Todo(name) {
    this.name = name;
    this.yo = function () {
        console.log(`yo  我是${this.name}`)
    }
>>>>>>> 31ef39437e940ffa5bfcfb8c942295ee3f062c0e
}

var todo1 = new Todo('whh');
var todo2 = new Todo('lbb');
