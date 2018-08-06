<template>
    <div>
        <Nav/>
           <div class="container pay_by" >
                <div v-if="current.pay_by=='wechat'" class="w-pay">
                    <p>请扫描支付</p>
                    <img :src="qrcode" alt="">
                </div>
                <div v-else>
                    跳转中，别着急...
                    <!-- <a :href="qrcode">点击前往支付宝支付</a> -->
                </div>
                <div>
                    <button @click="verify">支付完成</button>
                </div>
         </div>
    </div>
</template>
<script>
    import Nav from '../components/Nav';
    import api from '../lib/api';
    import {url} from '../lib/url';

    export default {
        components:{Nav},
        data(){
            return{
                current:{},
                qrcode:'',
            }
        },
        mounted() {
            this.find(this.$route.params);
        },
        methods:{
            find(id){
                api('order/first',{id})
                    .then(r=>{
                        let row = this.current = r.data;
                        console.log('this.current',this.current);
                        
                        if(!row){
                            alert('订单有误！')
                            this.go_me_order();
                        }

                        if(row._paid){
                            alert('此订单已支付')
                            this.go_me_order();
                        }

                        this.pay(row.id,row.pay_by,row.sum)
                    })
            },
            go_me_order(){
                this.$router.push('/me/order')
            },
            pay(id,pay_by,fee){
                if(fee > .2)
                    fee = .2;
                return api('order/payment/url',{
                    id:id,
                    pay_by:pay_by,
                    fee:fee,
                    return_url:url('/#/'),
                }).then(r=>{
                    if(r.data.url){
                        location.href = r.data.url; //如果返回是url，即支付宝支付，跳转到支付url
                    }else{
                        this.qrcode = r.data.qrcode //如果返回是二维码，则是微信支付，则弹出二维码
                    }
                })
            },
            verify(){
                api('order/find',{id:this.current.id})
                    .then(r=>{
                        if(r.data._paid){
                            alert('支付成功');
                            this.$router.push('/search');
                        }
                        else
                            alert('支付失败');
                    });
            }
        },
    }
</script>
<style scoped>
.pay_by >*{
    text-align: center;
}
.pay_by img{
    display: inline-block;
}
</style>
