<template>
  <div class="examine">
    <Header></Header>
    <div class="examine-content">
        <h4 class="content-title" v-if="(currentIndex+1) &&  questionList[currentIndex]">{{currentIndex+1}}.{{questionList[currentIndex].question}}</h4>
        <p class="content-step">{{currentIndex+1}}/{{questionList.length}}</p>
        <van-radio-group v-if='currentQuestionList && questionList[currentIndex]' v-model="questionList[currentIndex].selectVaule">
          <van-radio :name="item.id" v-for="(item,index) in currentQuestionList" :key="index">{{item.value}}</van-radio>
        </van-radio-group>
        <img class="left-icon" src="../static/img/imgs/icon-left-active.png" v-if="currentIndex!=0" @click="jump(currentIndex-1)">
        <img class="left-icon" src="../static/img/imgs/icon-left-disabled.png" v-else>
        <img class="right-icon" src="../static/img/imgs/icon-right-active.png" v-if="currentIndex!=(questionList.length-1)" @click="jump(currentIndex+1)">
        <img class="right-icon" src="../static/img/imgs/icon-right-disabled.png" v-else>
        <Button type="primary" class="login-button button-back" @click="resetData">重新填写</Button>
        <Button type="primary" class="login-button button-confirm" @click="confirm">提交问卷</Button>       
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
      id: "",
      /* 当前被点击的选项 */
      currentIndex: 0,
      selectVaule: "",
      showConfirm: false,
      isFirst: "",
      isLast: "",
      questionList: [],
      currentQuestionList: []
    };
  },
  components: {
    Header
  },
  mounted() {
    this.id = this.$route.query.id;
     this.getList(this.id);
  },
   computed: {
    ...mapGetters(['getUserInfoUserId'])
  },
  methods: {
    /**
     * @function 查看上一题下一题
     * @param  {type} type {description}
     * @return {type} {description}
     */
    jump(index) {
      if (index < 0 || index >= this.questionList.length) {
        return false;
      }
      this.currentIndex = index;
    },
    /**
     * @function 获取问题列表
     * @param  {type} id {description}
     * @return {type} {description}
     */
    getList(id) {
      API.common
        .questionList({
          id: id
        })
        .then(res => {
          for (let item of res.data.questionList) {
            item.selectVaule = "";
            for (let ite of item.optionList) {
              ite.value = ite.questionOption;
              ite.key = ite.id;
            }
          }
          this.questionList = res.data.questionList;
          this.currentQuestionList = this.questionList[this.currentIndex].optionList
          console.log(this.questionList)
        });
    },
    /**
     * @function 提交前确认
     * @return {type} {description}
     */
    confirm() {
      /* 未完成的题目集合 */
      let unComplete = [];
      for (let index = 0; index < this.questionList.length; index++) {
        if (!this.questionList[index].selectVaule) {
          unComplete.push(index + 1);
        }
      }
      if (unComplete.length > 0) {
        this.$dialog.alert({
          title: "问卷尚未填写完整",
          message: `请填写完 ${unComplete.join("、")} 题后再确认提交`,
          confirmButtonText: "继续填写"
        });
      } else {
        this.$dialog.confirm({
          title: "问卷已填写完整，您是否确定提交？",
          confirmButtonText: "确认提交"
        }).then(() => {
          this.postData()
        });
      }
    },
    /**
     * @function 发送数据
     * @return {type} {description}
     */
    postData() {
		let questions=[],answers=[];
		for (const item of this.questionList) {
			questions.push(item.question);
			for (let ite of item.optionList) {
				if(ite.key==item.selectVaule){
					answers.push(ite.value);
					break;
				}
			}
		}
		API.common.addQuestionnaire({
			...JSON.parse(localStorage.getItem("sendData")),
			questions:questions.join(","),
			answers:answers.join(","),
		}).then(res=>{
      this.$router.push({
        path: "/success",
      });
		});
	},
    /**
     * @function 重新填写
     * @return {type} {description}
     */
    resetData() {
      this.$router.push({
        path: "/select"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.examine
  width: 1024px;
  .examine-content
    position: relative;
    height: 725px;
  .left-icon
    width: 80px;
    height: 160px;
    position: absolute;
    top: 300px;
    left: 0;
  .content-title
    text-align: center;
    padding: 80px 0 30px;
    font-size: 28px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  .content-step
    text-align: center;
    padding-bottom: 100px;
  .right-icon
    width: 80px;
    height: 160px;
    position: absolute;
    top: 300px;
    right: 0;
  .login-button
    width: 208px !important;
    height: 45px !important;
    text-align: center;
    line-height: 45px;
    border-radius: 4px;
    font-size: 16px !important;
    color: #fff;
    position: fixed !important;
    border: none;
    background-color: #1aad19;
  .button-back
    left: 80px;
    bottom: 40px;
  .button-confirm
    right: 80px;
    bottom: 40px;
  .van-radio
    width: 140px!important;
    text-align: center;
    border: 1px solid #369bff;
    border-radius: 4px;
    font-size: 18px;
    float: left;
    margin: 20px;
    position: relative;
    text-align: left;
    padding: 15px;
  .van-radio__input 
    position: absolute;
    top: 15px;
    right 10px;
  .van-radio__label 
    width: 110px;
    text-align: center;
    margin-left: 0;
  .van-radio-group 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    flex-wrap: wrap;
    margin: 0 auto;
.van-dialog 
  width: 30%;
.van-dialog__message 
  text-align: center;
</style>
