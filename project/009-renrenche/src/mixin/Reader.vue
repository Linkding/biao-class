<script>
    import api from '../lib/api';

    export default {
        methods:{
            read(model,limit){
                api(`${model}/read`,{limit:limit,key_by:'name'})
                    .then(r=>{
                        this.$set(this.list,model,r.data);
                    })
            }
        }
    }
</script>