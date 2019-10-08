// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// 配置全局webIm
// require('easemob-websdk')
import './assets/sass/element-variables.sass'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import * as filters from './filter'
// 全局变量注册URL-CONFIG
import './utils/config/index.js'
// 插件
import axiosPlugin from './utils/server'
import md5 from './utils/plugin/md5'
import base64 from './utils/plugin/base64'
// 引入indexedDB数据库
import indexedDB from './utils/indexedDB'
import websocket from './utils/plugin/websocket'
import IM from './utils/plugin/webim'
// 兼容
// import 'babel-polyfill'
// 签名档
import VueSignature from 'vue-signature-pad'
// 分享插件
import SocialSharing from 'vue-social-sharing'
// import './utils/plugin/cavars'
// 指令注册
import '@/directive/clickoutside'
import '@/directive/el-dragdialog'
import '@/directive/dragDropTwoPoints'
import Pagination from '@/utils/plugin/pagination'
// bug监控
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'
// 引入这个懒加载插件
import VueLazyload from 'vue-lazyload'
fundebug.apikey = 'e3681323216ceac5046b3f00ab6d7a458946eb85b5ce7b01fb7065b21038631b'

// 使用Element UI
Vue.use(ElementUI, { locale })
// 注册HTTP插件
Vue.use(axiosPlugin)
// md5
Vue.use(md5)
// base64
Vue.use(base64)
// 分享
Vue.use(SocialSharing)
// 签名档
Vue.use(VueSignature)
// indexedDB数据库
Vue.use(indexedDB)
// websocket长连接
Vue.use(websocket)
// 注册bug管理
fundebugVue(fundebug, Vue)

// 添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/default/default_09.png',
  loading: '/static/img/default/default_08.gif',
  attempt: 3,
  observer: true
})

Vue.use(Pagination)
// 即时通讯
Vue.use(IM)
// 注册过滤器
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
// console.log(session)
// 关闭生产Tip
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
