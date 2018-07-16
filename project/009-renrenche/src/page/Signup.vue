<template>
    <div>
        <Nav/>
        <div class="wrap">
            <div class="container">
                <form class="main-form" @submit="submit($event)">
                    <h1>注册</h1>
                    <div class="tab-title">
                        <div @click="signup_by = 'phone'" :class="'col-lg-6 ' + (signup_by == 'phone'? 'active':'')">手机注册</div>
                        <div @click="signup_by = 'mail'" :class="'col-lg-6 ' + (signup_by == 'mail'? 'active':'')">邮箱注册</div>
                    </div>
                    <div class="input-control">
                        <input id="username" type="text" 
                            v-validator="'required|username|min_length:4|max_length:24|not_exist:user,username'"
                            error-el="#username-error"
                            error-lang="zh"
                            placeholder="whh" 
                            autocomplete="off"
                            v-model="current.username">
                        <div class="error-list">
                            <div id="username-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input v-validator="'required|min_length:6|max_length:64'"
                        error-el="#password-error"
                        id="password"
                        type="password"
                        placeholder="密码"
                        v-model="current.password">
                        <div class="error-list">
                            <div id="password-error"></div>
                        </div>
                    </div>
                     <!-- <div class="input-control">
                        <input id="repassword" type="password" placeholder="重复密码">
                    </div> -->
                    <div v-if="signup_by == 'phone'" class="input-control">
                        <input  class="col-lg-7" type="text" placeholder="手机号"
                            error-el="#phone-error"
                            v-model="current.phone"
                        >
                        <div class="error-list">
                            <div id="phone-error"></div>
                        </div>
                    </div>
                    <div v-if="signup_by == 'mail'" class="input-control">
                        <input  class="col-lg-7" type="text" placeholder="邮箱"
                            error-el="#mail-error"
                            v-model="current.mail"
                        >
                        <div class="error-list">
                            <div id="mail-error"></div>
                        </div>
                    </div>
                    <div class="input-control">
                        <input style="width:70%" type="number" placeholder="验证码"
                            v-model="current.vcode"
                            >
                        <button style="width:30%" type="button"  :disabled="captcha.countdown != 0" @click="send_code">
                            <span v-if="captcha.countdown">{{captcha.countdown}}</span>
                            <span v-else>获取验证码</span>
                        </button>
                        <div class="error-list">
                        <div v-if="invalid_code" id="vcode-error">验证码有误</div>
                        </div>
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
import api from "../lib/api";

export default {
  directives: { validator },
  components: { Nav },
  data() {
    return {
      captcha: {
        countdown: 0,
        timer: null
      },
      signup_by: "phone",
      current: {},
      code: "",
      invalid_code: false
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();

      this.invalid_code = this.current.vcode !== this.code; //默认是false，只有输入的验证码不匹配时候为true，并触发显示 验证码错误 在网页

      if (this.invalid_code) return;

      if (this.signup_by == "mail") delete this.current.phone;
      else delete this.current.mail;

      // 如果没有用户名，就默认用已填的邮箱或手机号作为用户名
      !this.current.username &&
        (this.current.username = this.current[this.signup_by]);
      api("user/create", this.current).then(r => {
        alert("登录成功");
        this.$router.push("/");
      });
    },
    send_code() {
      if (this.captcha.countdown) return;

      let action = "sms",
        by_mail;

      if ((by_mail = this.signup_by == "mail")) action = "mail";

      if ((by_mail && !this.current.mail) || (!by_mail && !this.current.phone))
        return;

      this.captcha.countdown = 60;

      this.captcha.timer = setInterval(() => {
        if (this.captcha.countdown == 0) clearInterval(this.captcha.timer);
        else this.$set(this.captcha, "countdown", --this.captcha.countdown);
      }, 1000);

      api(`captcha/${action}`, {
        phone: this.current.phone,
        mail: this.current.mail
      }).then(r => {
        this.code = atob(r.data.result);
      });
    }
  }
};
</script>
<style scoped>
.wrap {
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

.wrap {
  height: 400px;
  background-repeat: no-repeat;
  background-size: contain;
}

.main-form {
  width: 350px;
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
.main-form .tab-title > * {
  padding: 5px;
  padding-bottom: 10px;
  text-align: center;
}
.main-form .tab-title .active {
  border-bottom: 2px solid #e08109;
}
.phone-valid button {
  width: 40%;
}
.phone-valid input {
  width: 60%;
}
</style>
