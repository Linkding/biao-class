<template>
    <div>
        <Nav/>
        <div class="header">
            <div class="container">
                <form class="main-form">
                    <h1>登录</h1>
                    <div class="input-control">
                        <input id="username" type="text" placeholder="用户名">
                    </div>
                    <div class="input-control">
                        <input id="password" type="password" placeholder="密码">
                    </div>
                    <div class="input-control"> 
                        <button type="submit">登录</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    import Nav from '../components/Nav';

    export default {
        components:{Nav}
    }
</script>
<style>
    h1 {
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
    }
    .header {
        height: 400px;
        background-image: url('../assets/login/1300x400.png');
        background-repeat: no-repeat;
        background-size: contain;
        
    }
    .main-form {
        width: 300px;
        background: #fff;
        position: absolute;
        top:120px;
        right: 80px;
        padding: 10px;
    }
    .main-form > * {
        padding: 5px 0;
    }
    .main-form input,
    .main-form button {
        width: 100%;
        font-size: 1rem;
        padding: 8px;;
    }
    .main-form button {
        background: #fd521d;
    }

</style>
