import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Base64 } from 'js-base64'
import { Message } from 'element-ui'
// 路由过多采用模块导入方式进行管理
// 地图模块
import MapRouteModule from './map'
// 发布模块
import ReleaseRouteModule from './release'
// 错误模块
import ErrorRouteModule from './error'
// 房源详情模块
import ListingRouteModule from './listing'
// 个人中心
import UserCenterRouterModule from './userCenter'
// 咨询模块
import ConsultationRouteModule from './consultation'
// 问答模块
import QACommunityRouteModule from './QACommunity'
// 帮助中心模块
import HelpCenterRouteModule from './helpCenter'
// 易买屋介绍
import SftRouteModule from './sft'
// 服务模块
import ServiceRouteModule from './service'
// 文章管理
import ArticleRouteModule from './article'
// 其它模块
import OtherRouteModule from './other'
// SEF买房模块
import buyHouseRouteModule from './buyHouse'
// 普通买房
import RegularHouseRouteModule from './RegularHouse'
// 租房模块
import rentingHouseRouteModule from './rentingHouse'
// 求租求购
import RequestListRouteModule from './requestList'
// 求租求购详情
import RequestDetailRouteModule from './requestDetail'
// 上传服务商
import UploadServiceRouteModule from './userService'
import { getToken } from '@/utils/session'
Vue.use(Router)

const router = new Router({
  'mode': 'history',
  'routes': [
    // 网站默认路由
    {
      'path': '/',
      'redirect': '/index'
    },
    // 首页
    {
      'path': '/index',
      'name': 'index',
      'meta': {'title': ''},
      'component': resolve => require(['@/pages/index/index.vue'], resolve)
    },
    // 求租信息列表
    {
      'path': '/rentInRequestList',
      'name': 'rentInRequestList',
      'meta': {'title': 'list of rent in request'},
      'component': resolve => require(['@/pages/rentInRequestList/rentInRequestList.vue'], resolve)
    },
    // 求租信息详情
    {
      'path': '/rentInRequestDetail',
      'name': 'rentInRequestDetail',
      'meta': {'title': ''},
      'component': resolve => require(['@/pages/rentInRequestDetail/rentInRequestDetail.vue'], resolve)
    },
    // 求购信息列表
    {
      'path': '/buyRequestList',
      'name': 'buyRequestList',
      'meta': {'title': 'list of buy request'},
      'component': resolve => require(['@/pages/buyRequestList/buyRequestList.vue'], resolve)
    },
    // 求购信息详情
    {
      'path': '/buyRequestDetail',
      'name': 'buyRequestDetail',
      'meta': {'title': 'buy request detail'},
      'component': resolve => require(['@/pages/buyRequestDetail/buyRequestDetail.vue'], resolve)
    },
    // buy 地图选房
    {
      'path': '/buy',
      'name': 'map&buying',
      'meta': {'title': ''},
      'component': resolve => require(['@/pages/map'], resolve)
    },
    // 查看合同
    {
      'path': '/view-offer',
      'name': 'view-offer',
      'meta': {'title': '', 'requireAuth': true},
      'component': resolve => require(['@/pages/myOffer'], resolve)
    },
    // 模块地图
    ...MapRouteModule,
    // 发布模块
    ...ReleaseRouteModule,
    // 房源详情模块
    ...ListingRouteModule,
    // 个人中心
    ...UserCenterRouterModule,
    // 咨询管理
    ...ConsultationRouteModule,
    // 问答社区
    ...QACommunityRouteModule,
    // helpCenter
    ...HelpCenterRouteModule,
    // 错误模块
    ...ErrorRouteModule,
    // 易买屋介绍模块
    ...SftRouteModule,
    // 服务模块
    ...ServiceRouteModule,
    // 文章模块
    ...ArticleRouteModule,
    // 其它模块
    ...OtherRouteModule,
    // SEF买房模块
    ...buyHouseRouteModule,
    // 租房模块
    ...rentingHouseRouteModule,
    // 普通买房
    ...RegularHouseRouteModule,
    // 求租求购
    ...RequestListRouteModule,
    // 求租求购详情
    ...RequestDetailRouteModule,
    // 上传服务商
    ...UploadServiceRouteModule
  ]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || 'EBuyHouse'
  // console.log(to, from)
  if (to.name !== 'process-null') {
    if (getToken()) {
      store.commit('signIn')
    } else {
      if (to.meta.requireAuth) {
        store.commit('signOut', true)
        next({'path': '/index'})
        return
      }
      store.commit('signOut', false)
    }
    next()
  } else {
    // console.log(to, from)
    try {
      const undecode = JSON.parse(Base64.decode(to.query.ebuyhouse))
      console.log(undecode)
      if (undecode.isAdmin) {
        store.commit(
          'signIn',
          {
            't': undecode.token, // token
            'et': Date.now() + 1000 * 60 * 60, // expire time
            'as': undecode.userInfo.status, // account status
            'es': undecode.userInfo.emailStatus, // email status
            'nn': undecode.userInfo.nickname, // nickname
            'a': undecode.userInfo.headUrl || '/static/img/common/header/avatar.png', // avatar
            'n': `${undecode.userInfo.firstname || ''} ${undecode.userInfo.middlename || ''} ${undecode.userInfo.lastname || ''}`, // name
            'fn': undecode.userInfo.firstname,
            'ln': undecode.userInfo.lastname,
            'e': undecode.userInfo.email, // email
            'uid': undecode.userInfo.id,
            'img': undecode.userInfo.headUrl, // headUrl
            'hxid': undecode.userInfo.hxusername
          }
        )
        store.commit('UPDATA_GLOBAL_USER_INFO', undecode.userInfo)
      }
    } catch (error) {
      console.log(error)
      Message.info('Warning: The parameters are incorrect when querying the order. Please try again after correcting! I will be taken to the homepage later.')
    } finally {
      next()
    }
  }
  if (to.name !== 'map' && from.name !== 'listing-details') {
    store.commit('SHOW_HOUSE_LAYER', false)
  }
})

// 路由后置守卫
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  // let redirectUrl = `${to.path}`
  // Object.keys(to.query).map((item, index, ags) => {
  //   if (index === 1) {
  //     redirectUrl += '?'
  //   }
  //   redirectUrl += `${item}=${to.query[item]}`
  //   if (index !== ags.length) {
  //     redirectUrl += '&'
  //   }
  // })
  // console.log(redirectUrl)
  // console.log(window.location)
  // window.location.href = `${window.location.protocol}${redirectUrl}`
})

export default router
