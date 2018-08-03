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
                    <div class="nav-item cart" @click="onShowCart">
                        <i class="fas fa-cart-arrow-down"></i>    
                    </div>
                    
                    <div  class="cart-drop" v-if="show_cart_drop" :style="{top:dropTop,right:dropCartRight}">
                        <div class="cart-drop-header">
                            <div v-if="cart">
                                <input type="checkbox" id="allselect" @click="toggle_check" v-model="check_all">
                                <label for="allselect">全选</label>
                            </div>
                            <div v-else class="empty">
                                空空如也~
                            </div>
                        </div>
                        <div class="cart-warp">
                            <div  class="cart-list" v-for="(item,index) in cart" :key="index">
                                <div class="col-lg-1">
                                    <input type="checkbox" v-model="item._checked">
                                </div>
                                <div class="col-lg-2">
                                    <img :src="item.$product.preview[0].url" alt="">
                                </div>
                                <div class="col-lg-6 info">
                                    <div class="name">{{item.$product.name}}</div>
                                    <div>价格:
                                        <span class="currency">{{item.$product.price}}</span>
                                    </div>
                                    <div>数量: {{item.count}}</div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="count-bar">
                                        <button class="count-btn" @click="item.count--">-</button>
                                        <span class="count"> {{item.count}} </span>
                                        <button class="count-btn" @click="item.count++">+</button>
                                    </div>
                                    <div class="remove">
                                        <button class="btn" @click="remove(item.id)">移除</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sub-bar" v-if="cart">
                            <div class="sub-first">
                                <div class="col-lg-6">已选：{{selected}}</div>
                                <div class="col-lg-6 right currency">{{total}}</div>
                            </div>
                            <div>
                                <router-link :to="to()" style="width:100%" >
                                    <button style="width:100%" class="sub-btn">
                                        提交订单
                                    </button>
                                </router-link>
                            </div>
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
                show_user_drop:false, //用户下拉面板
                show_cart_drop:false, //购物车下拉面板
                cart:{},
                check_all:false, //全选状态
                with:[
                        {model:'product',relation:'has_one'}
                    ],
            }
        },
        computed:{
            total(){
                let sum = 0
                let cart = this.cart;
                for(let key in cart){
                    let val = cart[key];
                    if(!val._checked)
                        continue;
                    sum += val.$product.price * val.count
                }
                return sum;
            },
            selected(){
                let sum = 0;
                let cart = this.cart;
                for(let key in cart){
                    let val = cart[key];
                    if(val._checked)
                        sum += 1
                }
                return sum;
            }
        },
        mounted() {
            this.read();
        },
        methods:{
            onShowCart(){
                this.show_cart_drop =!this.show_cart_drop;
                this.read();
            },
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
            toggle_check(){
                let cart = this.cart;
                for(let key in cart){
                    let val = cart[key];
                    this.$set(val,'_checked',!this.check_all)
                }
            },
            remove(id){
                if(confirm('确定移除此产品吗？'))
                    api('cart/delete',{id})
                        .then(r=>{
                            this.read();
                        })
            },
            to(){
                let check = [];
                let cart = this.cart;
                for(let key in cart){
                    let val = cart[key];
                    if(val._checked)
                        check.push(val.id)
                }
                console.log('check',check);
                return {path:'/cartorder/', query:{cart_id:check}}
                // return {path:'/neworder/',query:{id:4,count:4}}
            }
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
}
.nav >*{
    /* font-size: 0.8rem; */
    vertical-align: middle;
}
.count-btn {
    background: rgba(0, 0, 0, .09);
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
    background: #F1EDEE;
    top:9.5%;
    border: 1px solid rgba(0, 0, 0, .2);

}
.cart-drop .cart-warp {
    height: 400px;
    overflow: scroll;
}
.user-drop{
    width: 100px;
    right: 16.6%;
}
.cart-drop {
    width: 400px;
    right: 10%;
    padding: 5px;
    text-align: left;
    opacity: 1;
}
.cart-drop .empty{
    padding: 10px;
    text-align: center;
}
.cart-drop-header{
    /* background: #F9726C; */
    min-height: 25px;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
}
.cart-drop-header label {
    padding: 10px;
}
.cart-drop .cart-list {
    padding: 7px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    margin-bottom: 7px;
    background: #fff;
}
.cart-drop .cart-list > *{
    font-size: 0.8rem;
}
.cart-drop .cart-list .info {
    padding: 0 10px;
}
.cart-drop .cart-list .info >*{
    padding: 6px;
}
.cart-drop .cart-list img{
    padding-left: 10px;
    width: 80px;
    height: 60px;
}
.cart-drop .cart-list .count{
    border: 1px solid rgba(0, 0, 0, .08);
    padding: 5px 10px;
}
.cart-drop .cart-list .count-bar,
.cart-drop .cart-list .remove {
    text-align: center;
}
.cart-drop .cart-list .remove >* {
    color: #999;
}
.cart-drop .cart-list .remove {
    margin-top: 10px;
}
.cart-drop  .sub-bar {
    padding: 0 8px;
}
.cart-drop  .sub-btn{
    background: #F9726C;
    border-radius: 3px;
    padding: 8px 0;
    color: #fff;
}
.cart-drop  .sub-first {
    padding: 8px;
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
