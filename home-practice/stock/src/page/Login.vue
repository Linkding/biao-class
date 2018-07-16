<template>
    <div v-if="show_login" class="mask">
        <div class="login-wrap">
            <div class="banner">
                <div class="close" @click="toggle_login"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
            <div class="main">
                <div v-if="show_login_form" class="header">
                    <span @click="is_active_login=true ; is_active_2=false" :class="{'col-lg-2':true, 'login':true,'active':is_active_login}">账号登录</span>
                    <span @click="is_active_login=false ; is_active_2=true"  :class="{'col-lg-2':true, 'login':true,'active':is_active_2}">账号验证</span>
                    <span class="col-lg-8 signup right" @click="toggle_auth">注册</span>
                </div>
                <div v-if="show_sign_form" class="header">
                    <span @click="is_active_login=true ; is_active_2=false" :class="{'col-lg-2':true, 'login':true,'active':is_active_login}">注册</span>
                    <span @click="is_active_login=false ; is_active_2=true"  :class="{'col-lg-2':true, 'login':true,'active':is_active_2}">账号验证</span>
                    <span class="col-lg-8 signup right" @click="toggle_auth">登录</span>
                </div>
                <form v-if="show_login_form" @submit="submit($event)">
                    <div class="input-control">
                        <input id="username"
                             type="text" placeholder="用户名"
                             v-model="current.name">
                        <div class="error-list">
                            <div id="username_error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" 
                             placeholder="密码">
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">登录</button>
                    </div>
                </form>
                <form v-if="show_sign_form" @submit="submit($event)">
                    <div class="input-control">
                        <input id="username"
                            v-validator="'required|max_length:10|username'"
                            error-el="#username_error"
                            error-lang="zh"
                             type="text" placeholder="用户名"
                             v-model="current.name">
                        <div class="error-list">
                            <div id="username_error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" 
                            v-validator="'required|min_length:2|max_length:24'"
                            error-el="#password-error"
                             placeholder="密码"
                             >

                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">注册</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>
<script>
import validator from "../directive/validator";
import http from "../util/http";
import helper from "../util/helper";
export default {
  directives: { validator },
  data() {
    return {
      is_active_login: true,
      is_active_2: false,
      current: {},
      user_id:'',
      show_login: false,
      show_sign_form:false,
      show_login_form:true,
    };
  },
  methods: {
    toggle_auth(){
        this.show_sign_form = !this.show_sign_form;
        this.show_login_form = !this.show_login_form;
    },
    toggle_login() {
      this.show_login = !this.show_login;
    },
    submit(e) {
      e.preventDefault();
      http
        .post("user/search", {
          where: {
            and: { name: this.current.name }
          }
        })
        .then(r => {
            if(r.data)
                this.user_id = r.data[0].id;
                helper.set('user_id',this.user_id);
                this.show_login = false;
        });
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
.header .login,
.header .signup {
  padding: 8px 0;
}
.header .login {
  font-size: 1.2rem;
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
