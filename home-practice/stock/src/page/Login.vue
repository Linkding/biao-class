<template>
    <div v-if="show_login" class="mask">
        <div :class="'login-wrap ' + (auth_by == 'signup'?'signup':'')">
            <div class="banner">
                <div class="close" @click="toggle_login"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
            <div class="main">
                <div class="header">
                    <span @click="auth_by='login'" :class="'col-lg-6 ' + (auth_by == 'login'? 'active':'')">登录</span>
                    <span @click="auth_by='signup'" :class="'col-lg-6 ' + (auth_by == 'signup'? 'active':'')">注册</span>
                </div>
                <form v-if="auth_by == 'login'" :key="'login'" @submit="submit($event)">
                    <div class="input-control">
                        <input
                            type="text" placeholder="用户名"
                            v-model="current.name"
                            v-validatorLogin="'required'"
                            error-el="#username_error"
                            autocomplete="off"
                        >
                        <div class="error-list">
                            <div id="username_error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" 
                            placeholder="密码"
                            v-validatorLogin="'required|min_length:2|max_length:6'"
                            error-el="#password-error" 
                            v-model="current.password"                           
                        >
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">
                            <span >登录</span>
                        </button>
                    </div>
                </form>
                <form v-if="auth_by == 'signup'" :key="'signup'" @submit="submit($event)">
                    <div class="input-control">
                        <input
                            type="text" placeholder="用户名"
                            v-model="current.name"
                            v-validatorSignup="'required|not_exist:user,name'"
                            error-el="#username_error"
                            autocomplete="off"
                        >
                        <div class="error-list">
                            <div id="username_error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" 
                            placeholder="密码"
                            v-validatorSignup="'required|min_length:2|max_length:6'"
                            error-el="#password-error" 
                            v-model="current.password"                           
                        >
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div  class="input-control">
                        <input id="repassword" type="password" 
                            placeholder="重复密码"
                            v-validatorSignup="'required|shadow:#password'"
                            error-el="#repassword-error"
                            v-model="current.repassword"
                        >
                        <div class="error-list">
                            <div id="repassword-error"></div>
                        </div>
                    </div>
                     <div class="input-control">
                        <input id="mail" type="text" 
                            placeholder="邮箱"
                            v-validatorSignup="'required|mail'"
                            error-el="#mail-error" 
                            v-model="current.mail"   
                        >
                        <div class="error-list">
                            <div id="mail-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">
                            <span >注册</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import validatorLogin from "../directive/validator";
import validatorSignup from "../directive/validator";

import http from "../util/http";
import helper from "../util/helper";
export default {
    directives: { validatorLogin,validatorSignup },
    data() {
        return {
            auth_by:'login',
            current: {},
            user_id:'',
            show_login: false,
        };
    },
    methods: {
        toggle_login() {
        this.show_login = !this.show_login;
        this.current = {};
        },
        submit(e) {
            e.preventDefault();
            if(this.auth_by=='login'){
                http.post("user/search", {
                    where: {
                        and: { name: this.current.name }
                    }
                    }).then(r => {
                        let row = r.data
                        if(row)
                            delete row[0].password
                            helper.set('uinfo',row);
                            this.show_login = false;
                            // 向父组件传递参数
                            this.$emit('afterLogin',row)
                    });
            }else if(this.auth_by == 'signup'){
                http.post('user/create',this.current)
                    .then(r=>{
                        console.log('r.data',r);
                        console.log('r.success',r.success)
                        let row = r;
                        // this.toggle_login();
                        this.show_login = false;
                        this.$router.push('/');
                        // 向父组件传递参数
                        this.$emit('afterLogin',row)
                    })
            }
        }
    }
};
</script>
<style scoped>
.close {
  text-align: right;
  padding: 10px;
}
.fa {
  font-size: 1.5rem;
  font-weight: 300;
  color: #fff;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.mask .login-wrap {
  font-size: 1rem;
  position: absolute;
  width: 40%;
  height: 50%;
  top: 120px;
  left: 30%;
  background: #fff;
}
.mask .login-wrap.signup {
    height: 70%
}
.banner {
  width: 100%;
  height: 60px;
  background: #cba58c;
}
.main {
  margin: 20px 50px;
  /* background: #fff; */
}
.header {
  padding: 5px;
  color: #a7aeb8;
}

.header >*
 {
  padding: 8px 0;
  font-size: 1.2rem;
  text-align: center;
}

.header .active {
  border-bottom: 4px solid #cba58c;
  color: #111;
}
.main .input-control {
  display: block;
}
.main input,
.main button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
.main button {
  background: #cba58c;
}
.error-list {
  color: red;
}
</style>
