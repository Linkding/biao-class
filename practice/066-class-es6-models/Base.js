class Base {
    constructor(list,max_id){
       this.max_id = max_id || 1;
       this.list = list; 
    }

    $add(){
        console.log('base add')
    }
    $remove(){
        console.log('base remove')
        
    }
    $update(){
        console.log('base update')
        
    }
    $read(){
        console.log('base read')
        
    }
}