<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" :class="['container' , 'nav' , is_poa?'poa':'']">
        <div class="col logo">
            <router-link to="/">
                <img src="../assets/img/logo02.png" alt="">
            </router-link>
        </div>
        <div class="col-lg-6 item">
        </div>
        <div class="col-lg-4 right">
            <div v-if="uinfo">
                <div class="user-panel">
                    <div @click="show_user_drop =!show_user_drop" >
                        <div class="nav-item username" >{{uinfo.username}}</div>
                    </div>
                    <div class="user-drop" v-if="show_user_drop" :style="{top:dropTop,right:dropUserRight}">
                        <div>
                            <router-link to="/me/order">
                                <i class="fa fa-bars" aria-hidden="true"></i> 
                                我的订单
                            </router-link>
                        </div>
                        <div>
                            <router-link to="/me/setting">
                                <i class="fa fa-cog" aria-hidden="true"></i>
                                设置
                            </router-link>
                        </div>
                        <div>
                            <div @click="logout">
                                <i class="fas fa-sign-out-alt"></i>
                                退出
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-panel">
                    <div class="nav-item cart" @click="show_cart_drop =!show_cart_drop">
                        <i class="fas fa-cart-arrow-down"></i>    
                    </div>
                    <div class="cart-drop" v-if="show_cart_drop" :style="{top:dropTop,right:dropCartRight}">
                        <div class="cart-drop-header">
                            <input type="checkbox" id="allselect">
                            <label for="allselect">全选</label>
                        </div>
                        <div  class="cart-list" v-for="(item,index) in cart" :key="index">
                            <div class="col-lg-2">
                                <img :src="item.$product.preview[0].url" alt="">
                            </div>
                            <div class="col-lg-7 info">
                                <div class="name">{{item.$product.name}}</div>
                                <div>价格:
                                    <span class="currency">{{item.$product.price}}</span>
                                </div>
                                <div>数量: {{item.count}}</div>
                            </div>
                            <div class="col-lg-3">
                                <div class="count-bar">
                                    <button>-</button>
                                    <span class="count"> 1 </span>
                                    <button>+</button>
                                </div>
                                <div class="remove">
                                    <button class="btn">移除</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="col-lg-6">
                                <div class="total">共计：100</div>
                            </div>
                            <div>
                                <button style="width:100%" class="sub-btn">提交订单</button>
                            </div>
                        </div>
                        <div v-if="!cart">
                            空空如也
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <router-link  class="nav-item" to="/login">登录</router-link>
                <router-link class="nav-item" to="/signup">注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import session from '../lib/session';
    import api from '../lib/api';
    export default {
        props:{
            is_poa:{
                default:false,
            },
            pushDown: {
                default: false
            },
            dropTop:'',
            dropUserRight:'',
            dropCartRight:''
        },
        data(){
            return{
                uinfo:session.uinfo(),
                show_user_drop:false,
                show_cart_drop:true,
                cart:{},
                with:[
                        {model:'product',relation:'has_one'}
                    ],
            }
        },
        mounted() {
            this.read();
        },
        methods:{
            logout(){
                session.logout();
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
.poa{
    z-index: 10;
    position: absolute;
}
.nav{
    background: #F1EDEE;
    top:5%;
    left: 10%;
    right: 10%;
    width: 100%;
    border-radius: 5px;
    padding: 3px 0;
    opacity: .8;
}
.nav >*{
    /* font-size: 0.8rem; */
    vertical-align: middle;
}

.nav .logo {
    padding-left: 30px;
}
.nav .item {
    text-align: center;
}
.nav a {
    color: rgba(0, 0, 0, .8);
    font-size: 1rem;
}
.nav-item {
  display: inline-block;
  padding: 1.5rem;
  color: #555;
  text-decoration: none;
}
.user-panel,
.cart-panel {
 display: inline-block;
}
.user-panel .username,
.user-panel .cart{
    position: relative;
}
.user-drop,
.cart-drop {
    position: absolute;
    background: rgba(0, 0, 0, .09);
    top:9.5%;
    border: 1px solid rgba(0, 0, 0, .2)

}
.user-drop{
    width: 100px;
    right: 16.6%;
}
.cart-drop {
    /* opacity: 0; */
    width: 400px;
    right: 10%;
    padding: 5px;
    text-align: left;
}
.cart-drop-header{
    background: #F9726C;
    min-height: 40px;
}
.cart-drop .cart-list {
    padding: 7px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    margin-bottom: 7px;
}
.cart-drop .cart-list > *{
    font-size: 0.8rem;
}
.cart-drop .cart-list .info >*{
    padding: 4px 0;
}
.cart-drop .cart-list img{
    padding-left: 10px;
    width: 40px;
    height: 40px;
}
.cart-drop .cart-list .count{
    border: 1px solid rgba(0, 0, 0, .08);
    padding: 5px 10px;
}
.cart-drop .cart-list .count-bar,
.cart-drop .cart-list .remove {
    text-align: center;
}
.cart-drop .cart-list .remove {
    margin-top: 10px;
}
.cart-drop  .sub-btn{
    background: #F9726C;
    border-radius: 3px;
}
.cart-drop  .total {
    padding: 5px;
}
.user-drop > *{
    font-size: 1rem;
    padding: 8px 5px;
    text-align: left;
}
.fa-bars,
.fa-cog{
    margin-right: 5px;
}
</style>
