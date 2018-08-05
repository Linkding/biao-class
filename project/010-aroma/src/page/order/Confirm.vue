<template>
    <div>
       <Nav :pushDown="true"/>
       <div class="container">
            <div class="order" >
                <div class="header">
                    <div class="col-lg-4 title">
                        商品信息
                    </div>
                    <div class="col-lg-2">
                        单价
                    </div>
                    <div class="col-lg-2">
                        数量
                    </div>
                    <div class="col-lg-2">
                        小计
                    </div>
                    <div class="col-lg-2">
                        实付
                    </div>
                </div>
                <div class="wrap" v-if="current._referer == 'cart_buy'" v-for="(item,index) in product" :key="index">
                    <div class="col-lg-4">
                        <div class="col-lg-4">
                            <img :src="item.$product.preview[0].url" alt="">
                       </div>
                        <div class="col-lg-8 name">{{item.$product.name}}</div>
                    </div>
                    <div class="col-lg-2 info">
                        <div class="currency">{{item.$product.price}}</div>
                    </div>
                    <div class="col-lg-2">
                        <div>{{item.count}}</div>
                    </div>
                    <div class="col-lg-2">
                        <div class="currency">{{item.$product.price*item.count}}</div>
                    </div>
                     <div class="col-lg-2">
                        <div class="currency">{{item.$product.price*item.count}}</div>
                    </div>
                </div>
                <div class="wrap" v-if="current._referer == 'item_buy'">
                   <div class="col-lg-4">
                        <div class="col-lg-4">
                            <img :src="product.preview[0].url" alt="">
                       </div>
                        <div class="col-lg-8 name">{{product.name}}</div>
                    </div>
                    <div class="col-lg-2 info">
                        <div class="currency">{{product.price}}</div>
                    </div>
                    <div class="col-lg-2">
                        <div>{{current.count}}</div>
                    </div>
                    <div class="col-lg-2">
                        <div class="currency">{{product.price*current.count}}</div>
                    </div>
                     <div class="col-lg-2">
                        <div class="currency">{{product.price*current.count}}</div>
                    </div>
                </div>
                <div class="wrap-pay">
                    支付方式：
                    <div class="pay-item col-lg-4">
                        <div class="col-lg-2">
                            <img src="../../assets/wechat.png" alt="">
                        </div>
                        <div class="col-lg-6">
                            <input type="radio" v-model="current.pay_by" value="wechat">
                            <label>
                            微信支付
                            </label>
                        </div>
                    </div>
                    <div class="pay-item col-lg-4">
                        <div class="col-lg-2">
                            <img src="../../assets/zhifubao.png" alt="">
                        </div>
                        <div class="col-lg-6">
                            <input type="radio" v-model="current.pay_by" value="alipay">
                            <label>
                            支付宝
                            </label>
                        </div>
                    </div>
                </div>
                <div class="wrap-3">
                    <div class="col-lg-12 line1 right">
                        <div>
                            商品合计：
                            <span class="item currency">{{total}}</span>
                        </div>
                        <div>
                            活动优惠：
                            <span class="item currency">{{total}}</span>
                        </div>
                        <div>
                            运费：
                            <span class="item currency">{{total}}</span>
                        </div>
                        <div>
                            优惠券：
                            <span class="item currency">{{total}}</span>
                            
                        </div>
                    </div>
                    <div class="right">
                        <div class="total">共计：
                            <span class="currency">{{total}}</span>
                        </div>
                        <button class="btn" @click.prevent="submit">提交订单</button>
                    </div>
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
                with:[
                    {model:'product',relation:'has_one'},
                ]
            }
        },
        computed:{
            total(){
                if(this.current._referer == 'item_buy')
                    return this.total_item();
                let sum = 0
                let product = this.product;
                for(let key in product){
                    let val = product[key];
                    sum += val.$product.price * val.count
                }
                return sum;
            },
        },
        mounted() {
            let c =  this.current = Object.assign({},this.current,this.$route.query)
            if(c._referer == 'item_buy')
                this.find('product',this.current.id)
            if(c._referer == 'cart_buy')
                this.find('cart',this.current.id);
        },
        methods:{
            total_item(){
                return this.product.price * this.current.count
            },
            submit(){
                let c = this.current
                c.oid = generate_oid(parseInt(Math.random()*10));
                c.sum = this.total;
                
                c.user_id = this.uinfo.id;
                delete c.id
                api('order/create',c)
                    .then(r=>{
                        this.$router.push('/pay/'+ r.data.oid)
                    })
            },
            find(model,id){
                api(`${model}/find`,{
                    id,
                    with:this.with,
                }).then(r=>{
                        this.product = r.data;
                        console.log('this.product',this.product);
                        
                    })
            },
        }
    }
</script>
<style scoped>
.order{
    border: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 20px;
} 
.order .header,
.order .wrap {
    padding: 20px;
    text-align: center;
}
.order .header,
.order .wrap-pay {
    background: #f8f8f6;
}
.order .header .title{
    text-align: left;
}
.order .wrap{
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .09);
}
.order .wrap >* {
    vertical-align: top;
    text-align: center;
}
.order .wrap img{
    width: 100px;
    height: 100px;
}

.order .wrap-pay,
.order .wrap-3
{
    padding: 20px 40px;
}
.order .wrap-pay{
    border-bottom: 1px solid rgba(0, 0, 0, .06);
}
.order .wrap-pay .pay-item{
    display: inline-block;
    padding: 0 40px;
}
.order .wrap-pay .pay-item>*{
    vertical-align: middle;
}
.order .wrap-pay .pay-item img{
    padding-right: 12px;
}
.order .wrap-3 .line1{
    border-bottom: 1px dashed rgba(0, 0, 0, .06);
}
.order .wrap-3 .item{
    padding-left: 80px;
    padding-bottom: 20px;
    
}
.order .wrap-3 .btn {
    padding: 10px 60px;
    border-radius: 5px;
    background: #F9726C;
    color: #fff;
    cursor: pointer;
}
.order .wrap-3 .total {
    padding: 20px 60px 10px 0;
    font-size: 1.3rem;
}
</style>
