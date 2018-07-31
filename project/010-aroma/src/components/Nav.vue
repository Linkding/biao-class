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
                    <router-link to="/me" class="nav-item">{{uinfo.username}}</router-link>
                    <span class="nav-item" @click="logout">退出</span>
                    <div class="user-drop">
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

    export default {
        props:{
            is_poa:{
                default:false,
            },
            pushDown: {
                default: false
            }
        },
        data(){
            return{
                uinfo:session.uinfo(),
            }
        },
        methods:{
            logout(){
                session.logout();
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
.user-panel{
    position: relative;
}
.user-panel:hover .user-drop{
    opacity: 1;
}
.user-drop{
    z-index: 1;
    opacity: 0;
    width: 100px;
    position: absolute;
    top:105%;
    left: 58%;
    background: #F1EDEE;
    border: 1px solid rgba(0, 0, 0, .08)    
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
