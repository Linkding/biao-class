<template>
    <div :style="{marginBottom: this.pushDown ? '20px': 0,}" class="nav-global">
       <div class="row container">
            <router-link to="/" class="col-lg-1"><a href="#"><img src="../assets/logo/logo01.png" alt="#"></a></router-link>
           <div class="col-lg-3 left">
               <router-link to="/" class="nav-item">首页</router-link>
               <router-link to="/search" href="#" class="nav-item">买车</router-link>
               <a href="#" class="nav-item">卖车</a>
           </div>
           <div class="col-lg-4">
              <SearchBar/> 
           </div>
           <div class="col-lg-4 right">
             <span v-if="!uinfo">
               <router-link to="/login" class="nav-item">登录</router-link>
               <router-link to="/signup" href="#" class="nav-item">注册</router-link>
             </span>
             <span v-else>
               <span class="nav-item">{{uinfo.username ||uinfo.phone}}</span>
               <span class="nav-item" @click="logout">退出</span>
             </span>
               <a href="#" class="nav-item tel">400-666-6666</a>
           </div>
       </div>
    </div>
</template>
<script>
import SearchBar from "./SearchBar";
import session from '../lib/session';

export default {
  components:{SearchBar},
  data(){
    return {
      uinfo:session.uinfo(),
    }
  },
  methods:{
    logout(){
      session.logout();
    }
  },
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
