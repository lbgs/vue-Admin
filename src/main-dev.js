import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message, Steps } from 'element-ui'
import { Tooltip } from 'element-ui'
Vue.use(ElementUI)
Vue.use(Tooltip)
Vue.use(Steps)

Vue.prototype.$message = Message

import './assets/css/global.css'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
axios.defaults.baseURL = 'http://server.sineava.top/api/private/v1'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
