let app = new Vue({
    el: '#root',
    data:{
        current:{},
        max_id: 3,
        memo_list:[
            {
                id:1,
                title:'yo',
                content:'1111',
            },
            {
                id:2,
                title:'yoyo',
                content:'1111',
            },
            {
                id:3,
                title:'yoyoyo',
                content:'1111',
            }
        ]
    },
    methods:{
        add(){
            this.current = {};
            this.current.id = this.max_id = this.max_id + 1;
            this.memo_list.push(this.current);
            console.log(this.memo_list)
        },
        memo_click(row){
            this.current = row;
        },
        on_delete(index){
            this.memo_list.splice(index,1)
            // let arr = this.memo_list;
            // for(let i =0;i < arr.length;i++){
            //     if (arr[i].id == row.id)
            //         arr.splice(i,1);
            //         console.log(arr)
            // }
        }
    }
})