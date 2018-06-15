let app = new Vue({
    el: '#root',
    data:{
        current:null,
        memo_list:[],
    },
    methods:{
        init_current(){
            this.current = {};
            // this.memo_list.push(this.current);
        },
        //保存到后端
        add(){
            let is_update = !!this.current.id; //两个否（！），是转换为布尔值
            let api = is_update ? 'update':'create';
            
            http
                .post(`memo/${api}`,this.current)
                .then((res)=>{
                    let new_row = res.data.data;
                    this.current = new_row;

                    if(!is_update) //如果不是更新，就插入到本地数据
                        this.memo_list.push(new_row);
                })
        },
        remove(id,e){
            http  
                .post('memo/delete',{id:id})
                .then((res)=>{
                    this.sync_from();
                });
                e.stopPropagation();
        },
        sync_from(){
            http
                .post('memo/read')
                .then((res)=>{
                    console.log(res)
                    this.memo_list = res.data.data;
                })
        },
        create(){
            this.sync_from();
        }
    }
})