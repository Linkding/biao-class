let app = new Vue({
    el: '#root',
    data:{
        current:null,
        memo_list:[],
    },
    methods:{
        init_current(){
            this.current = {}
        },
        add(){
            let is_update = !!this.current.id;
            let api = is_update ? 'update':'create';
            http
                .post(`memo/${api}`,this.current)
                .then((res)=>{
                    let new_row = res.data.data;
                    this.current = new_row;

                    if(!is_update)//如果是新增，就增加到本地
                        this.memo_list.push(new_row);
                })
        },
        remove(id,e){
            console.log(id);
            http
                .post('memo/delete',{id:id})
                .then((res)=>{
                    console.log(res);
                    this.sync_from();
                })
            e.stopPropagation();
        },
        sync_from(){
            http
                .post('memo/read',{
                    limit:5,
                    where:{
                        or:[['id','>',0],]
                    },
                })
                .then((res)=>{
                    this.memo_list = res.data.data;
                })
        },
    }
})