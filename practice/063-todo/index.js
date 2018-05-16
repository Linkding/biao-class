function Todo(name) {
    this.name = name;
    this.yo = function () {
        console.log(`yo  我是${this.name}`)
    }
}

var todo1 = new Todo('whh');
var todo2 = new Todo('lbb');
