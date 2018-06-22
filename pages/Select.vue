<template>
  <div class="select">
    <Header></Header>
    <div class="select-content">
        <div class="select-content-left">
            <h4 class="select-left-title">患者信息</h4>
            <van-cell-group>
              <van-field v-model="sendData.userName" label="姓名"  placeholder="请输入姓名" required/>
              <van-field v-model="sendData.mobile" label="手机号码" type="number"  placeholder="请输入手机号码" required/>
              <van-field v-model="sendData.idNumber" label="身份证号"  placeholder="请输入身份证号" required/>
              <div class="select-container">
                <label class="select-lable">就诊时间</label>
                <select class="select-input" v-model="sendData.visitStatus">
                  <option class="select-option" value ="1">上午</option>
                  <option class="select-option" value ="2">下午</option>
                </select>
              </div>
              <van-field v-model="sendData.visitNumber" label="就诊号码"  placeholder="请输入就诊号码" required/>
            </van-cell-group>
        </div>
        <div class="select-content-right">
            <h4 class="select-right-title">选择问卷</h4>
            <van-radio-group v-model="selectValue">
              <van-radio :name="item.key" v-for="(item,index) in selectList" :key="index">{{item.value}}</van-radio>
            </van-radio-group>
            <Button type="primary" @click="nextStep" class="select-button">开始</Button>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { API } from "@/services/index.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      /* 最终发送请求时所需要的数据 */
      sendData: {
			  adminId: "", //医生Id
        idNumber: "", //身份证号码
        userName: "", //姓名
        mobile: "", //手机号码
        questionnaireName: "", //问卷名称
        visitStatus: "", //就诊时间（1：上午，2：下午）
        visitNumber: "" //就诊号码
      },
      timeList: [
        {
          key: 1,
          text: "上午"
        },
        {
          key: 2,
          text: "下午"
        }
      ],
      name: "",
      passWord: "",
      idCard: "",
      /* 问卷列表 */
      selectList: [],
      selectValue: ""
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(["getUserInfoUserId"])
  },
  methods: {
    /**
     * @function 获取问卷列表
     * @return {type} {description}
     */
    getList() {
      API.common
        .questionnaireList({
          status: 1, //1-启用  0-禁用  -1-全部
          page: 1, //当前页
          pageSize: 99 //每页条数
        })
        .then(res => {
          let result = [];
          for (let item of res.data) {
            result.push({
              key: item.id,
              value: item.title
            });
          }
          this.selectList = result;
        });
    },
    /**
     * @function 跳到下一步
     * @return {type} {description}
     */
    async nextStep() {
      if (!this.sendData.userName) {
        this.$toast.fail('请输入姓名');
        return false;
      }
      if (!this.sendData.mobile) {
        this.$toast.fail('请输入手机号码');
        return false;
      }
      if (!this.sendData.idNumber) {
        this.$toast.fail('请输入身份证号');
        return false;
      }
      if (!this.sendData.visitStatus) {
        this.$toast.fail('请输入就诊时间');
        return false;
      }
      if (this.sendData.visitNumber.length > 5 ) {
        this.$toast.fail('就诊号码最多五位数字');
        return false;
      }
      if (!this.selectValue) {
        this.$toast.fail('请选择问卷');
        return false;
      }
      /* 确定选择的问卷 */
      for (let item of this.selectList) {
        if (item.key == this.selectValue) {
          this.sendData.questionnaireName = item.value;
          break;
        }
      }
      this.sendData.adminId = this.getUserInfoUserId;
      /* 验证数据 */
      API.common.check(this.sendData).then(res => {
        localStorage.setItem("sendData", JSON.stringify(this.sendData));
        /* 保存已有信息 */
        this.$router.push({
          path: "/examine",
          query: {
            id: this.selectValue
          }
        });
      });
    }
  },
  mounted() {
    this.sendData.adminId=this.getUserInfoUserId;
    try {
      let sendData = JSON.parse(localStorage.getItem("sendData"));
      if (sendData) {
        this.sendData = sendData;
      }
    } catch (error) {}
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.select
  .select-right-list
    height: 50%;
    overflow-y: auto;
  .select-content
    overflow: hidden;
    height: 728px;
  .select-content-left
    float: left;
    width: 360px;
    background: #e5eaf0;
    height: 100%;
  .van-cell
    background: #e5eaf0;
  .van-field__control
    background: #e5eaf0;
    height: 100%;
  .van-cell__title
    color: #666;
    font-size: 15px;
    display: inline-block;
    text-align: left;
  .select-content-right
    float: left;
    width: 664px;
    height: 100%;
  .select-left-title
    text-align: center;
    font-size: 28px;
    margin: 28px 0 90px;
  .select-container
    background: #e5eaf0;
    text-align: left;
    padding: 10px 15px;
  .select-lable
    display: inline-block;
    width: 80px;
  .select-lable:before
    content: "*";
    position: absolute;
    left: 8px;
    font-size: 12px;
    color: #f44;
  .select-input
    border: none;
    background: #e5eaf0;
    width: 220px;
    height: 24px;
  .select-right-title
    text-align: center;
    font-size: 28px;
    margin: 20px 0 45px;
  .van-radio
    width: 600px;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #369bff;
    border-radius: 4px;
    font-size: 24px;
    position: relative;
  .van-radio__input
    position: absolute;
    right: 20px;
    top: 12px;
  .van-radio__label
    line-height: 45px;
    width: 560px;
    margin-left: 0;
    padding-right 40px;
  .van-radio + .van-radio
    margin-top: 30px;
  .van-radio-group
    height: 50%;
    overflow-y: auto;
  .select-button
    margin-top: 50px;
    height: 45px;
    background-color: #38adff;
    text-align: center;
    line-height: 45px;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    width: 208px !important;
    border none;
</style>