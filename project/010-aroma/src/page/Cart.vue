<template>
    <div>
       <Nav :pushDown="true"/>
       <div  class="container">
            <div class="cart">
                <div class="cart-item" v-for="(product,index) in cart" :key="index">
                    <div class="col-lg-1">
                        <img :src="product.$product.preview[0].url" alt="">
                    </div>
                    <div class="col-lg-5 info">
                        <div class="name">{{product.$product.name}}</div>
                        <div>单价: <span class="currency">{{product.$product.price}}</span></div>
                        <div>数量: <span>{{product.count}}</span></div>
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
                            小计： <span>{{product.$product.price * product.count}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div>
                    共计：{{sumAll}}
                    </div>
                    <button class="btn" @click.prevent="submit">提交订单</button>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import api from '../lib/api';
    import {generate_oid} from '../lib/order';
    import session from '../lib/session';
    export default{
        components:{Nav},
        data(){
            return{
                current:{
                    pay_by:'wechat',
                },
                payment_url:null,
                uinfo:session.uinfo(),
                with:[
                    {model:'product',relation:'has_one'}
                ],
                cart:{},
            }
        },
        computed:{
            sumAll(){
                return this.cart.reduce((acc,product)=>{
                    return acc + (product.$product.price * product.count)
                },0)
            }
        },
        mounted() {
            this.read();
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
            read(){
                api('cart/read',{
                    where:{
                        user_id:this.uinfo.id,
                    },
                    with:this.with
                }).then(r=>{
                        this.cart = r.data;
                    })
            },
        }
    }
</script>
<style scoped>
.cart{
    border: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 20px;
    padding: 10px;
} 
.cart>*{
    padding-right: 20px;
}
.cart .cart-item{
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
}
.cart .right{
    padding: 10px  0;
}
.cart .right >* {
    margin:  5px 0;
}
.cart-item img{
    width: 100px;
}
.info {
padding-left: 10%;    
}
.cart .pay >*,
.cart .info >*{
    padding: 4px 0;
}

</style>
