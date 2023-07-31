//导入JQuery库，因为Ajax用起来非常方便，支持同步和异步的Ajax请求
import $ from 'jquery'
// import { createApp } from 'vue'
// import App from '../App.vue'

//导入ElementUI的消息通知组件，下面封装全局Ajax的时候处理异常的时候需要弹出通知
import { ElMessage } from 'element-plus'
import router from '@/router'
// const app = createApp(App)
//后端项目的URL根路径
let baseUrl = 'http://localhost:9002'

//封装全局Ajax公共函数
const request =  (
  url: string,
  method: string,
  data: any,
  async: boolean,
  fun: Function
)=> {
  $.ajax({
    url: baseUrl + url,
    type: method,
    dataType: 'json',
    contentType: 'application/json',
    //上传的数据被序列化（允许Ajax上传数组）
    traditional: true,
    // xhrFields: {
    //   //允许Ajax请求跨域
    //   withCredentials: true
    // },
    headers: {
      token: localStorage.getItem('token')
    },
    async: async,
    data: JSON.stringify(data),
    success: function (resp: any) {
      if (resp.code == 200) {
        fun(resp)
      } else {
        ElMessage.error({
          message: resp.message,
          duration: 1200
        })
      }
    },
    error: function (e: any) {
      //ajax有语法错误的时候
      if (e.status == undefined) {
        ElMessage.error({
          message: '前端页面错误',
          duration: 1200
        })
      } else {
        let status = e.status
        //没有登陆体检系统
        if (status == 401) {
          if (url.startsWith('/front/')) {
            router.push({
              name: 'frontIndex'
            })
          } else {
            router.push({
              name: 'MisLogin'
            })
          }
        } else {
          //后端没有运行，提交的数据有误，或者没有连接上后端项目
          if (!e.hasOwnProperty('responseText')) {
            ElMessage.error({
              message: '后端项目没有启动，或者HTTP请求类型以及参数错误',
              duration: 1200
            })
          } else {
            ElMessage.error({
              message: e.responseText,
              duration: 1200
            })
          }
        }
      }
    }
  })
}
export default request
