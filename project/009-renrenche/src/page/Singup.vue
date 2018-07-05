<template>
    <div>
        <Nav/>
        <div class="header">
            <div class="container">
                <form class="main-form">
                    <h1>注册</h1>
                    <div class="error-list">
                        <div class="error">用户名已存在</div>
                    </div>
                    <div class="input-control">
                        <input id="username" type="text" 
                            v-validator="'required|username|min_length:4|max_length:6|not_exist:user,username'"
                            error-el="#username-error"
                            error-lang="zh"
                        placeholder="whh" autocomplete="off">
                        <div class="error-list">
                            <div id="username-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input v-validator="'required|min_length:6|max_length:64'"
                        error-el="#password-error"
                        id="password"
                        type="password"
                        placeholder="密码">
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                     <div class="input-control">
                        <input id="repassword" type="password" placeholder="重复密码">
                    </div>
                    <div class="input-control"> 
                        <button type="submit">注册</button>
                    </div>
                    <!-- <div class="input-control small muted">没有账号？<a href="">注册</a></div> -->
                </form>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import Nav from '../components/Nav';
    import validator from '../directive/validator';

    import '../css/auth.css';
    export default {
        directives:{validator},
        components:{Nav}
    }
</script>
<style scoped>
    .header {
        background-image: url('../assets/login/1300x400.png');
    }
    
    .main-form {
        top:130px;
        right: 80px;
        padding: 10px 15px;
    }
   

   
</style>
