<template>
  <div class="success">
    <Header></Header>
    <div class="success-content">
        <h4 class="success-title">问卷提交成功</h4>
        <Button type="primary" class="success-button"  @click="backFirst">返回首页</Button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
  },
  methods: {
    backFirst () {
      this.$router.push("/select");
    }
  }
}
</script>

<style lang="stylus" scoped>
.success
  .success-title
    text-align: center;
    font-size: 36px;
    color: #333;
    padding-top: 172px;
  .success-button
    width: 150px !important;
    height: 60px !important;
    text-align: center;
    line-height: 60px;
    border-radius: 4px;
    font-size: 16px !important;
    color: #333;
    position: relative !important;
    background: #fff;
    border: 1px solid #1ca5f2;
    top: 90px;
</style>
