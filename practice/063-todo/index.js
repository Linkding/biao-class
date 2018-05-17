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
}

//========查========
function read(id){
    var index = find_index_by_id(todo_list,id)
    return todo_list[index];
}

// =======功能方法====
// 通过id找到元素索引
function find_index_by_id(arr,id){
    return arr.findIndex(function(item){
        return item.id === id;
    })
}
// 通过id找到元素
function find_by_id(arr,id){
    return arr.find(function(item){
        return item.id === id;
    })
}
// =====测试代码======
// add({name:'test',age:11})
// console.log(find_index_by_id(todo_list,1))
// remove(1);
// console.log(todo_list)
// console.log(find_by_id(todo_list,1));
// update(1,{name:'baby',age:11})
// read(1)
// console.log(find_index_by_id(todo_list,1))
// console.log(todo_list[find_index_by_id(todo_list,1)])
console.log(read(1))
