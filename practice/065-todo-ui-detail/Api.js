window.Api = Todo;

function Todo(list, max_id) {
    this.max_id = max_id || 1;
    // this.list = list || [];
    this.todo_list = [
        { // 0
            id: 100,
            title: '买菜',
            remind_at: '2020...',
            completed: false,
        },
        { // 1
            id: 101,
            title: '洗菜',
            remind_at: '2020-10-01 20:20:02',
            completed: false,
        },
    ];
}

Todo.prototype.add = add;
Todo.prototype.remove = remove;
Todo.prototype.update = update;
Todo.prototype.read = read;



// ==========增========
function add(row) {
    var id = this.max_id + 1;
    row.id = id;
    this.todo_list.push(row)
}

// =========删=========
function remove(id) {
    var index = find_index_by_id(this.todo_list, id);
    this.todo_list.splice(index, 1)
}

// =========改=======
function update(id, new_row) {
    var index = find_index_by_id(this.todo_list, id);
    if (index < 0)
        return
    var old_row = this.todo_list[index];
    this.todo_list[index] = Object.assign({}, old_row, new_row)
}

//========查========
function read(id) {
    if(id)
        return find_by_id(this.todo_list,id)
    
    return this.todo_list;
}

// =======功能方法====
// 通过id找到元素索引
function find_index_by_id(arr, id) {
    return arr.findIndex(function (item) {
        return item.id === id;
    })
}
// 通过id找到元素
function find_by_id(arr, id) {
    return arr.find(function (item) {
        return item.id === id;
    })
}

// =====测试代码======
// add({name:'test',age:11})
// console.log(find_index_by_id(this.todo_list,1))
// remove(1);
// console.log(todo_list)
// console.log(find_by_id(todo_list,1));
// update(1,{name:'baby',age:11})
// read(1)
// console.log(find_index_by_id(todo_list,1))
// console.log(todo_list[find_index_by_id(todo_list,1)])
// console.log(read(1))
var user = new Todo('lxb', 29);
user.add({ name: 'hbb', age: 29 });
console.log(user.todo_list)
// user.remove(1);
