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
import Nav from "../components/Nav";
import validator from "../directive/validator";

export default {
  directives: { validator },
  components: { Nav }
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
  background: #111;
}

.main-form {
  width: 300px;
  background: #fff;
  position: absolute;
}

.main-form > * {
  padding: 5px 0;
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
