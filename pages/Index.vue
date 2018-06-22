<template>
    <div>
        <div class="page-login">
            <div class="page-login-content">
                <div class="login-input-container">
                    <label>账号：</label>
                    <input class="login-input" placeholder="请输入账号" v-model="form.user_phone"/>
                </div>
                <div class="login-input-container">
                    <label>密码：</label>
                    <input class="login-input" type="password" placeholder="请输入密码" v-model="form.user_password"/>
                </div>
                <button class="login-button" @click="handleRefresh">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import { API } from "@/services/index.js";
function setState(store) {}

export default {
    name: 'login',
    data() {
      return {
        form: {
          user_phone: "",
          user_password: ""
        }
      };
    },
    methods: {
        handleRefresh() {
            /* 用户名格式检验 */
            if (this.form.user_phone == "") {
                this.$toast.fail('请输入正确的用户名');
                return false;
            }
            /* 用户密码格式校验 */
            if (this.form.user_password == "") {
                this.$toast.fail('请输入正确的用户密码');
                return false;
            }
            API.common
                .login({
                username: this.form.user_phone,
                password: this.form.user_password
                })
                .then(res => {
                this.$store.dispatch("SetUserInfo", res);
                localStorage.setItem("sendData", {});
                localStorage.setItem("userInfo", JSON.stringify(res));
                setTimeout(() => {
                    this.$router.push("/select");
                }, 100);
                })
                .catch(err => {});
        }
    },
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    }
};
</script>
<style lang="stylus" scoped>

.page-login
    background: #fff;
    display: flex;
    align-items: center;
    width: 1024px;
    height: 768px;
    background: url('../static/img/icon-cover-login.png') no-repeat;
    background-size: 1024px 768px;
    .page-login-content
        position: relative;
        left: 550px;
    .login-input-container
        border-bottom: 1px solid #fff;
        color: #fff;
    .login-input
        width: 228px;
        height: 45px;
        display: inline-block;
        border: none;
        padding-left: 20px;
        font-size: 16px;
        color: #fff;
        background: transparent;
    .login-input-container + .login-input-container 
        margin-top: 45px;
    .login-button
        margin-top: 45px;
        height: 45px;
        background-color: #38adff;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        color: #fff;
        display: inline-block;
        width: 300px;
        border: none;
    input::-webkit-input-placeholder
        color: #fff;
</style>
