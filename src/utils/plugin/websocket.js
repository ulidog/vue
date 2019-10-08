import store from '@/store'
// const WebSocket = new WebSocket()
const WebSocketConfig = {
  uri: 'ws://192.168.0.105:9111/socket/',
  maxErrorAmount: 60,
  uid: 123456789
}
// let WebSockets = function (options) {
//   this.initWebSocket(options)
// }
let WebSockets = {
  websock: null,
  config: WebSocketConfig,
  errorAmount: 0,
  initWebSocket (options = {}) {
    Object.assign(this.config, options)
    this.openWebSocket()
  },
  openWebSocket () {
    this.websock = new WebSocket(`${this.config.uri}${this.config.uid}`)
    // header('Content-Security-Policy: img-src *;')
    this.websock.onmessage = this.websocketonmessage
    this.websock.onopen = this.websocketonopen
    this.websock.onerror = this.websocketonerror
    this.websock.onclose = this.websocketclose
  },
  websocketonopen (e, callback) { // 连接建立之后执行send方法发送数据
    // this.websocketsend(JSON.stringify({type: 1, msgContent: this.socketInput}))
    console.log('连接成功!')
    if (callback instanceof Function) {
      callback(e)
    }
  },
  websocketonerror (e) { // 连接建立失败重连
    console.log('建立连接失败')
    if (WebSockets.errorAmount < WebSockets.config.maxErrorAmount) {
      // this.openWebSocket()
      console.log('建立连接失败, 延迟1000ms重连中...')
      setTimeout(() => {
        WebSockets.errorAmount++
        WebSockets.openWebSocket()
      }, 1000)
    } else {
      console.log('超出最大重连数量，即将关闭WebSocket连接')
      WebSockets.websocketclose()
      WebSockets.websock = null
    }
  },
  websocketonmessage (e) { // 数据接收
    const redata = JSON.parse(e.data)
    console.log('接收数据并转化JSON', redata)
    // 异步推送到Store Actions 进行处理
    store.dispatch('NOTIFY_ONMESSAGE_CHANGE', redata)
    // return redata
  },
  websocketsend (Data) { // 数据发送
    const _this = this
    if (_this.websock && _this.websock.readyState === _this.websock.OPEN) {
      _this.websock.send(JSON.stringify(Object.assign(Data, {uid: _this.config.uid})))
      console.log('发送数据', Object.assign(Data, {uid: _this.config.uid}))
    } else if (_this.websock && _this.websock.readyState === _this.websock.CONNECTING) {
      // 若是 正在开启状态，则等待1s后重新调用
      console.log('即将延迟1000ms进行重新操作')
      setTimeout(function () {
        _this.websocketsend(Data)
      }, 1000)
    } else {
      // 若未开启 ，则等待1s后重新调用
      console.log('即将延迟1000ms进行重新操作')
      setTimeout(function () {
        _this.websocketsend(Data)
      }, 1000)
    }
  },
  websocketclose (e) { // 关闭
    console.log('断开连接', e)
    this.websock = null
  }
}
// 导出插槽钩子
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$WebSocket', { value: WebSockets })
  }
}
