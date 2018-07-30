<template>
    <div>
        <Nav />
        <div class="container">
            <div class="product">
                <div class="col-lg-6 pic">
                    <img :src="detail.preview && detail.preview[0] && detail.preview[0].url ? detail.preview[0].url : ''">
                </div>
                <div class="col-lg-6 main">
                    <h1 class="title">{{detail.name}}</h1>
                    <div class="info-item">
                        <span class="key">产地：</span>
                        <span class="val">{{detail.location}}</span>
                    </div>
                    <div class="info-item">
                        <span class="key">年份：</span>
                        <span class="val">{{detail.year}}</span>
                    </div>
                    <div class="info-item">
                        <span class="key">酿造：</span>
                        <span class="val">橡木桶</span>
                    </div>
                    <div class="info-item">
                        <span class="key">价格：</span>
                        <span class="val currency">{{detail.price}}</span>
                    </div>
                    <div class="info-item">
                        <span class="key">数量</span>
                        <span class="val">
                            <button  type="button" @click="reduce" class="btn btn-primary">-</button>
                            <span class="count">{{count}} </span>
                            <button type="button" @click="add" class="btn btn-primary">+</button>
                        </span>
                    </div>
                    <div class="info-item">
                        <button type="submit">加入购物车</button>
                        <router-link :to="to()"><button>立即购买</button></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav'
    import api from '../lib/api';
    export default{
        components:{Nav},
        data(){
            return{
                detail:{},
                with:[
                    {model:'location',type:'has_one'},
                ],
                count:0,
            }
        },
        mounted() {
            let id = this.get_id();
            this.find(id);
            
        },
        methods:{
            to(){
                return {path:'/neworder/', query:{id:this.detail.id,count:this.count}}
            },
            reduce(){
                if(this.count <= 0)
                    return this.count = 0;
                return this.count--;
            },
            add(){
                if(this.count >= this.detail.store){
                    return this.count = this.detail.store;
                }
                return this.count++;
            },
            get_id(){
               return this.$route.params.id;
            },
            find(id){
                api('product/find',{
                    id:id,
                    with:this.with
                    }).then(r=>{
                        this.detail = r.data;
                        console.log('this.detail',this.detail);
                        
                    })
            }
        }
    }
</script>
<style scoped>
.product {
    padding: 20px 0;
    background: rgba(0, 0, 0, .08);
}
.main{
    padding-left: 10%;
    width: 330px;
    height: 440px;
}
.main .info-item{
    padding: 10px 0;
    vertical-align: middle;
}
.product .pic {
    padding-left: 10%;
}
.key {
    margin-right:  12px;
}
.count{
    border: 1px solid rgba(0, 0, 0, .05);
    padding: 5px 30px;
    
}
</style>
