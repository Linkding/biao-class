class Task extends Base {
    constructor(list,max_id){
       super(list,max_id);
    }

    add(){
        console.log('my add')
        this.$add()
    }
    remove(){
        console.log('my remove')
        this.$remove()
    }
    update(){
        console.log('my update')
        this.$update()
    }
    read(){
        console.log('my read')
        this.$read()
    }

}