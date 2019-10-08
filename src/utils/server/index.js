import axios from 'axios'
// import qs from 'qs'
import { Message } from 'element-ui'
// import router from '@/router'
import store from '@/store'
import { getToken } from '../session'

const Axios = axios.create({
  baseURL: '/',
  timeout: 600000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'SIGN': 1
    // 'Cache-Control': 's-maxage=86400'
  }
})

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    const T = getToken()
    // console.log(config.headers)
    // const T = '5e30f218d3905ba1b577563c5c2dfb4d822474a5ef52720fc756a1d118a055788e4daf2533db8ebc'
    const isNeedToken = config.data || {}
    if (isNeedToken['needToken'] === undefined) {
      Object.assign(isNeedToken, { needToken: true })
      // console.log(isNeedToken)
    }
    if (T) {
      // console.log(isNeedToken.needToken || true)
      if (isNeedToken.needToken) {
        config.headers['token'] = T
        config.headers['Content-Type'] = 'application/json'
      }
    } else {
      if (isNeedToken.needToken) {
        config.headers['Content-Type'] = 'application/json'
      }
    }
    // console.log(config.headers)
    return config
  },
  error => {
    // error 的回调信息,看贵公司的定义
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error && error.data.msg,
      type: 'error'
    })
    return Promise.reject(error.data.msg)
  }
)
/**
 * 其他异常 "0"
 * 其他异常 "4000"
 * 新增异常 "4001"
 * 修改异常 "4002"
 * 查询异常 "4003"
 * 删除异常 "4004"
 * token 失效 "4005"
 * 请求参数有误 "4006"
 * 邮箱未认证 "4007"
 * 用户账号禁用 "4008"
 * 用户账号黑名单 "4009"
 */
// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // console.log(res)
    // 对响应数据做些事
    if (!res.data.success && res.data.status !== 'OK') {
      if (res.data.status === 'ZERO_RESULTS') {
        return Promise.reject(res.data.msg)
      }
      if (Number(res.data.code) === 4006) {
        return Promise.reject(res.data.msg)
      }
      if (Number(res.data.code) === 4000 ||
        Number(res.data.code) === 4001 ||
        Number(res.data.code) === 4002 ||
        Number(res.data.code) === 4003 ||
        Number(res.data.code) === 4004 ||
        Number(res.data.code) === 4008 ||
        Number(res.data.code) === 4009) {
        Message({
          showClose: true,
          message: res.data.msg,
          type: 'error'
        })
        return Promise.reject(res.data.msg)
      } else if (Number(res.data.code) === 5000) {
        Message({
          showClose: true,
          message: 'Server exception',
          type: 'error'
        })
        return Promise.reject(res.data.msg)
      } else if (Number(res.data.code) === 4007) {
        // if (window.sessionStorage.getItem('isApprove') === undefined || window.sessionStorage.getItem('isApprove') === null) {
        Message({
          showClose: true,
          message: res.data.msg,
          type: 'info'
        })
        return Promise.reject(res.data.msg)
        // window.sessionStorage.setItem('isApprove', true)
        // }
      } else if (getToken() || Number(res.data.code) === 4005) {
        store.commit('signOut', true)
      }
      return Promise.reject(res.data.msg)
    }
    return res
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem('loginUserBaseInfo')) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      // router.push({
      //   path: '/login'
      // })
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
    }
    // 返回 response 里的错误信息
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$axios', { value: Axios })
  }
}
