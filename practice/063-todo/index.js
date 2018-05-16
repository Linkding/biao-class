var max_id = 2;
var to_do = [
    {
        id: 1,
        name: 'lxb',
        age: 12
    },
    {
        id: 2,
        name : 'bys',
        age: 122
    }
];

//==========增========
function add(row){
    var id = ++max_id;
    row.id = id;
    to_do.push(row);
}

add({
    name: 'bbb',
    age:112
})

// console.log(to_do);

//==========删========
function remove(id){
    var index = find_index_by_id(to_do,id);
    if(index < 0 ){
        return;
    }

    to_do.splice(index,1);
}

// remove(3);
// console.log(to_do)

// console.log(to_do)

//==========改=======
function update(id,new_row){
    //找到需要修改的元素的index
    var index = find_index_by_id(to_do,id);

    if(index < 0)
        return;
    var old_row = to_do[index];
    to_do[index] = Object.assign({},old_row,new_row)
}

//========查=========
function read(id){
    if(id)
        return find_by_id(to_do,id);
        // console.log(find_by_id(to_do,1) )
    return to_do;

}   


// console.log(read(3));
// console.log('findbyid' + find_by_id(to_do,1))

// =======测试区======
console.log(to_do)
update(1,{name:'lxx',age:110})
console.log(to_do);

// ==========功能函数========
// 通过id找元素
function find_by_id(arr,id){
     return arr.find(function(item){
        return item.id  === id ;
    });
}

// 通过id找元素索引
function find_index_by_id(arr,id){
    return arr.findIndex(function(row){
        // console.log(row.id)
        // console.log(id)
        return row.id == id;
    })
}

// console.log(find_index_by_id(to_do,3)) 