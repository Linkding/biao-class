<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" :class="['container' , 'nav' , is_poa?'poa':'']">
        <div class="col logo">
            <img src="../assets/img/logo02.png" alt="">
        </div>
        <div class="col-lg-6 item">
            <a href="#">item</a>
            <a href="#">item</a>
            <a href="#">item</a>
            <a href="#">item</a>
        </div>
        <div class="col-lg-4 right">
            <a href="#">登录</a>
            <a href="#">注册</a>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            is_poa:{
                default:false,
            },
            pushDown: {
                default: false
            }
        }
    }
</script>
<style scoped>
.poa{
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
    opacity: .6;
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
    padding-right: 1.3rem; 
}
</style>
