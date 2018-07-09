<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" class="nav-global">
       <div class="row container">
            <router-link to="/" class="col-lg-1"><a href="#"><img src="../assets/logo/logo01.png" alt="#"></a></router-link>
           <div class="col-lg-6 left">
               <a href="#" class="nav-item">首页</a>
               <router-link to="/searchresult" href="#" class="nav-item">买车</router-link>
               <a href="#" class="nav-item">卖车</a>
               <a href="#" class="nav-item">item</a>
           </div>
           <div class="col-lg-5 right">
               <router-link to="/login" class="nav-item">登录</router-link>
               <router-link to="/signup" href="#" class="nav-item">注册</router-link>
               <a href="#" class="nav-item tel">400-666-6666</a>
           </div>
       </div>
    </div>
</template>
<script>
export default {
  props: {
    pushDown: {
      default: false
    }
  }
};
</script>
    
<style scoped>
.container >*{
    vertical-align: middle
}

a {
    display: inline-block;
}
.nav-global {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

img {
  width: 80px;
  height: 70px;
  display: inline-block;
  background: #0B5A81;
}

.nav-item {
  display: inline-block;
  padding: 1.5rem;
  color: #555;
  text-decoration: none;
}

.tel {
  color: #0B5A81;
  font-weight: bold;
}
</style>
