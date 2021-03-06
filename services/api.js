/**
 * 2017.11.23
 * wzh
 * sevices管理器
 */

'use strict'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

/* HTTP相关,使用Axios作为http库 */
Vue.prototype.$http = axios
/* 默认最长响应时间 */
axios.defaults.timeout = 5000
/* 默认的接口地址 */
/* axios.defaults.baseURL = 'http://192.168.3.24:8088/' */
axios.defaults.baseURL = '/api' 

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  // 在发送请求之前做些什么
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
/**
 * @function 请求状态码检测
 * @param  {type} response {description}
 * @return {type} {description}
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  // Vue.$vux.toast.show({
  //   text: `请求错误 ${response.status}: ${response.url},${errortext}`,
  //   type: 'cancel'
  // })
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}
/* 返回一个Promise(发送post请求) */
const fetch = (type, url, params) => {
  return new Promise((resolve, reject) => {
    let data = type === 'get' ? { params: params } : params
    axios[type](url, data)
      .then(checkStatus)
      .then(response => {
        let code = JSON.parse(response.data).code
        if (code === 2 || code === 21) {
          Vue.$router.push('/login')
        } else if (code === 0) {
          resolve(JSON.parse(response.data))
        } else {
          // Vue.$vux.toast.show({
          //   text: JSON.parse(response.data).message,
          //   type: 'cancel'
          // })
        }
      })
  })
}

/* 使用 axios来做为http请求库 */
export const common = {
  /**
   * @function 医生登录接口
   * @param  {type} data {description}
   * @return {type} {description}
   */
  login (data) {
    return fetch('post', '/wechat/login/check', data)
  },
  /**
   * @function 获取所有问卷列表接口
   * @param  {type} data {description}
   * @return {type} {description}
   */
  questionnaireList (data) {
    return fetch('get', '/visit/questionnaire/list', data)
  },
  /**
   * @function 获取问卷相关问题列表接口
   * @param  {type} data {description}
   * @return {type} {description}
   */
  questionList (data) {
    return fetch('get', '/visit/questionnaire/questionList', data)
  },
  /**
   * @function 提交问卷接口
   * @param  {type} data {description}
   * @return {type} {description}
   */
  addQuestionnaire (data) {
    return fetch('post', '/visit/questionnaire/addQuestionnaire', data)
  },
  /**
   * @function 数据验证
   * @param  {type} data {description}
   * @return {type} {description}
   */
  check (data) {
    return fetch('post', '/visit/questionnaire/check', data)
  }
}
