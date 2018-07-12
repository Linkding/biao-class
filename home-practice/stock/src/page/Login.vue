<template>
    <div class="mask">
        <div class="login-wrap">
            <div class="banner">
                <div class="close"><i class="fa fa-times" aria-hidden="true"></i></div>
            </div>
            <div class="main">
                <div class="header">
                    <span @click="is_active_login=true ; is_active_2=false" :class="{'col-lg-2':true, 'login':true,'active':is_active_login}">账号登录</span>
                    <span @click="is_active_login=false ; is_active_2=true"  :class="{'col-lg-2':true, 'login':true,'active':is_active_2}">账号验证</span>
                    <span class="col-lg-8 signup right">注册</span>
                </div>
                <form @submit="submit">
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
                            v-validator="'required|min_length:6|max_length:24'"
                            error-el="#password-error"
                             placeholder="密码"
                             v-model="current.password">

                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <button type="submit">登录</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>
<script>
    import validator from "../directive/validator";
    export default {
        directives:{validator},
        data(){
            return{
                is_active_login:true,
                is_active_2:false,
                current:{},
            }
        },
        methods:{
            sumbit(){
                http.post('user/create',this.current)
            }
        }
    }
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
    left:30%;
    background: #fff;
}
.banner {
    width: 100%;
    height: 60px;
    background: #CBA58C;
}
.main {
    margin: 20px 50px;
    /* background: #fff; */
}
.header {
    padding: 5px;
    color: #A7AEB8;
}
.header .login,
.header .signup{
    padding: 8px 0;
}
.header .login {
    font-size: 1.2rem;
}
.header  .active {
    border-bottom: 4px solid #CBA58C;
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
    background: #CBA58C;
}
.error-list {
    color: red;
}
</style>
