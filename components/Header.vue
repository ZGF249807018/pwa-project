<template>
  <div class="header">
    <h3 class="header-title">认识医生诊前问卷调查</h3>
    <span class="popover-name" @click="showPopup">{{name}}</span>
    <div class="popover-content" v-if="show">
      <span @click="onHide">退出登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      show: false
    }
  },
  components: {
  },
  methods: {
    onHide () {
      this.show = false
      this.$store.dispatch("SignOut");
      localStorage.setItem("sendData", {});
      this.$router.push({
        path: "/login",
      });
    },
    showPopup () {
      this.show = !this.show
    }
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.name = userInfo.data.realname;
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.header 
    position: relative;
    background: #369bff;
    .header-title 
        text-align: center;
        font-size: 17px;
        color: #fff;
        line-height: 40px;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
    .popover-name
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 15px;
        color: #fff;
        padding-right: 20px;
    .popover-name::after 
        content: '';
        background: url('../static/img/imgs/icon-header-povper.png') no-repeat;
        width: 10px;
        height: 7px;
        position: absolute;
        top: 7px;
        right: 0;
    .popover-content 
      position: absolute;
      top: 30px;
      right: 20px;
      color: #fff;
      background-color: #35495e;
</style>
