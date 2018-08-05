<template>
    <div>
       <Nav :pushDown="true"/>
       <div  class="container">
            <div class="order">
                <div class="wrap">
                    <div class="col-lg-1">
                        <img :src="product.preview[0].url" alt="">
                    </div>
                    <div class="col-lg-5 info">
                        <div class="name">{{product.name}}</div>
                        <div>单价: <span class="currency">{{product.price}}</span></div>
                        <div>数量: <span>{{current.count}}</span></div>
                    </div>
                    <div class="col-lg-4 pay">
                        支付方式：
                        <div>
                            <label>
                            <input type="radio" v-model="current.pay_by" value="wechat">
                            微信支付
                            </label>
                        </div>
                        <div>
                            <label>
                            <input type="radio" v-model="current.pay_by" value="alipay">
                            支付宝
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-2 right">
                        <div>
                            共计： <span>{{total}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <button class="btn" @click.prevent="submit">提交订单</button>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    import Nav from '../../components/Nav';
    import api from '../../lib/api';
    import {generate_oid} from '../../lib/order';
    import session from '../../lib/session';
    export default{
        components:{Nav},
        data(){
            return{
                product:{},
                current:{
                    pay_by:'wechat',
                },
                payment_url:null,
                uinfo:session.uinfo(),
            }
        },
        computed:{
            total(){
                return this.current.count * this.product.price;
            }
        },
        mounted() {
            // console.log('this.$route.query',this.$route.query);
            let c =  this.current = Object.assign({},this.current,this.$route.query)
            if(c._referer= 'item_buy')
                this.find('product',this.current.id)
            this.find_cart('cart',this.current.id);
        },
        methods:{
            submit(){
                this.current.oid = generate_oid(this.product.id);
                this.current.sum = this.total;
                
                this.current.user_id = this.uinfo.id;

                api('order/create',this.current)
                    .then(r=>{
                        // this.current.id = r.data.id;//用oid还是id？
                        
                        // this.pay(this.current.id,c.pay_by,this.total)
                        this.$router.push('/pay/'+ r.data.oid)
                    })
            },
            find(model,id){
                api(`${model}/find`,{id})
                    .then(r=>{
                        this.product = r.data;
                    })
            },
           
        }
    }
</script>
<style scoped>
.order{
    border: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 20px;
    padding: 10px;
} 
.order>*{
    padding-right: 20px;
}
.order .wrap{
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
}
.order .right{
    padding: 10px  0;
}
.info {
padding-left: 10%;    
}
.order .pay >*,
.order .info >*{
    padding: 4px 0;
}

</style>
