window.TaskApi = TaskApi;

function TaskApi(list, max_id) {
    list = list || [];
    max_id = max_id || 1;
    /*继承显性属性（也就是原型prototype）*/
    BaseApi.call(this, list, max_id);
}

/*继承隐性属性（也就是原型prototype）*/
TaskApi.prototype = Object.create(BaseApi.prototype);
TaskApi.prototype.constructor = TaskApi;

TaskApi.prototype.add = add;
TaskApi.prototype.remove = remove;
TaskApi.prototype.update = update;
TaskApi.prototype.read = read;
TaskApi.prototype.read_by_cat = read_by_cat;


function add(row) {
    if (!row.title)
        return;
    if(!row.cat_id)
        row.cat_id = 1;
    return this.$add(row)
}

function remove(id) {
    return this.$remove(id)
}

function update(id, new_row) {
    return this.$update(id, new_row)
}

function read() {
    return this.$read();
}

function read_by_cat(cat_id){
    return this.read().filter(function(item){
        return item.cat_id == cat_id;
    })
}