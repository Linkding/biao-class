<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" class="nav-global">
       <div class="row container">
            <router-link to="/" class="col-lg-1"><a href="#"></a></router-link>
           <div class="col-lg-3 left">
               <router-link to="/" class="nav-item">首页</router-link>
               <!-- <router-link to="/search" href="#" class="nav-item">买车</router-link> -->
           </div>
           <div class="col-lg-4">
              <!-- <SearchBar/>  -->
           </div>
           <div class="col-lg-4 right">
               <router-link to="/login" class="nav-item">登录</router-link>
               <router-link to="/signup" href="#" class="nav-item">注册</router-link>
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
.container > * {
  vertical-align: middle;
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
  background: #0b5a81;
}

.nav-item {
  display: inline-block;
  padding: 1.5rem;
  color: #555;
  text-decoration: none;
}

.tel {
  color: #0b5a81;
  font-weight: bold;
}
</style>
