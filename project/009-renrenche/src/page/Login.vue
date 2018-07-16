<template>
    <div>
        <Nav/>
        <div class="header">
            <div class="container">
                <form class="main-form" @submit="submit">
                    <h1>登录</h1>
                    <div v-if="login_failed" class="error-list">
                        <div class="error">用户名或密码有误</div>
                    </div>
                    <div class="input-control">
                        <input v-validator="'username|required|min_length:4|max_length:24'" 
                        id="username" 
                        type="text" 
                        placeholder="用户名"
                        v-model="current.$unique">
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" placeholder="密码"
                        v-model="current.password">
                    </div>
                    <div class="input-control"> 
                        <button type="submit">登录</button>
                    </div>
                    <div class="input-control small muted">没有账号？<a href="#/signup">注册</a></div>
                </form>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
import Nav from "../components/Nav";
import validator from "../directive/validator";
import api from '../lib/api';

export default {
  directives:{validator},
  components: { Nav },
  data(){
      return {
          current:{},
          login_failed:false, //是否登录失败
      }
  },
  methods:{
      submit(e){
            e.preventDefault();
            let unique = this.current.$unique
                ,password = this.current.password
                ;  
            let query = [
                ['username','=',unique],
                ['phone','=',unique],
                ['mail','=',unique],
                ]
            api('user/read',{
                where:{or:query}
                })
                .then(r=>{
                    //检查返回结果，如果data长度为0，说明没有找到该用户
                    let row = r.data[0];
                    
                    if(!row || this.current.password !== row.password){
                        this.login_failed = true;
                        return;
                    }
                    this.login_failed = false;
                    delete row.password;
                    localStorage.setItem('uinfo',JSON.stringify(row))
                    console.log(3);
                    this.$router.push('/')
                })
      },
  }
};
</script>
<style scoped>
.header {
  background-image: url("../assets/login/1300x400.png");
}

.main-form {
  top: 130px;
  right: 80px;
  padding: 10px 15px;
}
h1 {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}

.header {
  height: 400px;
  background-repeat: no-repeat;
  background-size: contain;
}

.main-form {
  width: 300px;
  background: #fff;
  position: absolute;
}


.main-form input,
.main-form button {
  width: 100%;
  font-size: 1rem;
  padding: 8px;
}

.main-form button {
  background: #e08109;
  color: #fff;
}

</style>
