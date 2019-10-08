import Vue from 'vue'
import Vuex from 'vuex'
// 导入buying模块
import buying from './modules/buying'
// 导入contract模块集
import contract from './modules/contract'
// 导入message模块
import message from './modules/message'
// 导入userInfo模块
import userInfo from './modules/userInfo'
// import hello from 'hellojs/dist/hello.all'
import guide from './modules/guide'
// 导入step模块
import step from './modules/step'
// 消息通知模块
import notify from './modules/notify'
// 历史记录
import history from './modules/history'
Vue.use(Vuex)
let windowGlobalInfo = !window.sessionStorage.getItem('windowGlobalInfo') ? {} : window.sessionStorage.getItem('windowGlobalInfo')
let token = window.localStorage.getItem('t') ? window.localStorage.getItem('t') : null
export default new Vuex.Store({
  // Boolean(!window.sessionStorage.getItem('windowMessageStatus') ? false : window.sessionStorage.getItem('windowMessageStatus'))
  state: {
    'token': token,
    'signInState': !!token,
    'triggerSignInEvent': false,
    'windowMessageStatus': false,
    'updateCompletionInfoState': false,
    'checkEmailDialogStatus': false,
    'windowGlobalInfo': windowGlobalInfo,
    'windowForgotStatus': false,
    'serviceProviderStatus': false,
    'showHouseLayer': {
      status: false,
      data: {}
    } // 地图中房源重叠时显示弹窗列表
  },
  getters: {
    token: state => state.token,
    signInState: state => state.signInState,
    triggerSignInEvent: state => state.triggerSignInEvent,
    windowMessageStatus: state => state.windowMessageStatus,
    updateCompletionInfoState: state => state.updateCompletionInfoState,
    windowGlobalInfo: state => state.windowGlobalInfo,
    checkEmailDialogStatus: state => state.checkEmailDialogStatus,
    windowForgotStatus: state => state.windowForgotStatus,
    serviceProviderStatus: state => state.serviceProviderStatus,
    showHouseLayer: state => state.showHouseLayer
  },
  actions: {},
  mutations: {
    signIn (_state, _data = {}) {
      for (let key in _data) {
        if (key === 't') {
          this.commit('UPDATA_TOKEN', _data[key])
        }
        window.localStorage.setItem(key, _data[key])
      }
      Vue.set(_state, 'signInState', true)
    },
    signOut (_state, triggerSignInEvent) {
      const _this = this._vm
      Vue.set(_state, 'signInState', false)
      // Vue.set(_state, 'GlobalUserInfo', {})
      if (triggerSignInEvent) {
        Vue.set(_state, 'triggerSignInEvent', !_state.triggerSignInEvent)
      }
      /* global hello: true */
      /* eslint no-undef: "error" */
      if (_this.$ebuyhouseDB.db) {
        _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo', (e) => {
          if (e) {
            _this.$indexDB.deleteData(_this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo')
            this.commit('UPDATA_GLOBAL_USER_INFO', {})
          }
        })
      }
      _state.token = null
      _state.windowGlobalInfo = {}
      // console.log(_state)
      _state.userInfo.GlobalUserInfo = {}
      _state.message.userFriendList = []
      let version = localStorage.getItem('isUpdateVersion')
      // 跳过定位数据
      window.localStorage.clear()
      window.localStorage.setItem('isUpdateVersion', version)
      hello('facebook').logout()
      hello('twitter').logout()
      hello('google').logout()
    },
    openMessage: (state, status = false) => {
      state.windowMessageStatus = status
      window.sessionStorage.setItem('windowMessageStatus', status)
    },
    updateCompletionState: (state, status = false) => {
      state.updateCompletionInfoState = status
    },
    checkEmailDialogState: (state, status = false) => {
      state.checkEmailDialogStatus = status
    },
    UPDATE_WINDOW_GLOBAL_INFO: (state, info = {}) => {
      state.windowGlobalInfo = info
      window.sessionStorage.setItem('windowGlobalInfo', JSON.stringify(info))
    },
    UPDATA_TOKEN (state, token) {
      state.token = token
    },
    UPDATA_WINDOW_FORGOT_STATUS (state, status) {
      state.windowForgotStatus = status
    },
    UPDATA_SERVICE_PROVIDER_FN (state, status) {
      state.serviceProviderStatus = status
    },
    // 地图房源列表弹窗
    SHOW_HOUSE_LAYER (state, _info) {
      state.showHouseLayer = _info
    }
  },
  modules: {
    buying,
    contract,
    message,
    userInfo,
    guide,
    step,
    notify,
    history
  }
})
