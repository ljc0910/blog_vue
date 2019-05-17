// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(mavonEditor)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.baseURL = 'http://119.3.235.132:4002/api'
  config.timeout = 4000   //请求超时等待时长
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.status==200){
    return response;
  }else{
    Message({
      message: '请求失败',
      type: 'error'
    });
  }
}, function (error) {
  // 对响应错误做点什么
  Message({
    message: '网络错误',
    type: 'error'
  });
  return Promise.reject(error);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
