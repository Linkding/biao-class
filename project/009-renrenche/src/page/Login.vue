<template>
    <div>
        <Nav/>
        <div class="header">
            <div class="container">
                <form class="main-form">
                    <h1>登录</h1>
                    <div class="error-list">
                        <div class="error">用户名或密码有误</div>
                    </div>
                    <div class="input-control">
                        <input id="username" type="text" placeholder="用户名">
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" placeholder="密码">
                    </div>
                    <div class="input-control"> 
                        <button type="submit">登录</button>
                    </div>
                    <div class="input-control small muted">没有账号？<a href="">注册</a></div>
                </form>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import Nav from '../components/Nav';
    import '../css/auth.css';
    export default {
        components:{Nav}
    }
</script>
<style scoped>
    .header {
        background-image: url('../assets/login/1300x400.png');
    }

    .main-form {
        top:160px;
        right: 80px;
        padding: 10px 15px;
    }
   

   
</style>
