<template>
  <div>
    <!-- 头部组件 -->
    <vue-header
      @toggleRegisterLayer='toggleRegisterLayer'
      @toggleSignInLayer="toggleSignInLayer"
      :bg_opacity_none="bgOpacityNone"
      v-if="showHeaderComponent"
    ></vue-header>
    <!-- 路由控制 -->
    <!-- keep-alive -->
    <!-- <keep-alive v-if="$route.meta.isKeepAlive">
      <router-view @childToParentComponent="childToParentComponentChange" :key="$route.fullPath"></router-view>
    </keep-alive> -->
    <router-view @childToParentComponent="childToParentComponentChange" :key="$route.fullPath"></router-view>
    <!-- 底部组件 -->
    <vue-footer v-if="showFooterComponent" @handleMaxRefOffsetHeight="_handleMaxRefOffsetHeight"></vue-footer>
    <!-- 全局注册组件 -->
    <vue-register
      v-if="showRegisterLayer"
      @toggleRegisterLayer='toggleRegisterLayer'
      @toggleSignInLayer="toggleSignInLayer"
    ></vue-register>
    <!-- 全局登录组件 -->
    <vue-sign-in
      v-if="showSignInLayer"
      @toggleRegisterLayer='toggleRegisterLayer'
      @toggleSignInLayer="toggleSignInLayer"
      @toggleForgetPwdLayer="toggleForgetPwdLayer"
    ></vue-sign-in>
    <!-- 全局忘记密码 -->
    <!-- <vue-forget-pwd
      v-if="showForgetPwdLayer"
      @toggleSignInLayer="toggleSignInLayer"
      @toggleForgetPwdLayer="toggleForgetPwdLayer"
    ></vue-forget-pwd> -->
    <vue-forget-password v-if="windowForgotStatus"></vue-forget-password>
    <!-- 即时通信窗口组件 -->
    <!-- <vue-message
      v-if="showMessageLayer">
    </vue-message> -->
    <!-- 新版本 -->
    <vue-hx-message v-if="showMessageLayer"></vue-hx-message>
    <!-- 全局公共组件 -->
    <vue-completion-info
      v-if="updateCompletionInfoState">
    </vue-completion-info>
    <!-- 条款 -->
    <!-- <vue-clause-info
      v-if="isShowClause">
    </vue-clause-info> -->
    <vue-check-email-dialog
      v-if="checkEmailDialogStatus">
    </vue-check-email-dialog>
    <!-- serviceProviderStatus -->
    <vue-service-provider-component v-if="serviceProviderStatus"></vue-service-provider-component>
    <vue-left-tools-component
      :isShowDirection="isShowDirection"
      @handlerDirection="_handlerDirection">
    </vue-left-tools-component>
    <vue-study-guide-component
      v-show="!isShowDirection"
      :labelList="labelList"
      :selectList="selectList"
      :minRefOffsetTop="minRefOffsetTop"
      :maxRefOffsetHeight="maxRefOffsetHeight"
      @handleSelectChange="_handleSelect"
      @handlerCloseStudyChange="_handlerDirection">
    </vue-study-guide-component>
    <!-- 测试组件 -->
    <!-- <vue-dialog></vue-dialog> -->
  </div>
</template>

<script>
import VueHeader from '@/components/common/header.vue'
import VueFooter from '@/components/common/footer.vue'
import VueRegister from '@/components/common/register.vue'
import VueSignIn from '@/components/common/signIn.vue'
// 屏蔽之前的修改密码 2019-6-3
// import VueForgetPwd from '@/components/common/forgetPwd.vue'
import VueForgetPassword from '@/components/common/forgetPwd.vue'
import VueMessage from '@/components/common/message.vue'
import VueHXMessage from '@/components/common/hxmessage.vue'
import VueCompletionInfo from '@/components/common/completionInfo.vue'
import VueCheckEmailDialog from '@/components/common/checkMail.vue'
import VueLeftToolsComponent from '@/components/index/LeftTools.vue'
import VueStudyGuideComponent from '@/components/common/studyGuide.vue'
import VueServiceProviderComponent from '@/components/common/serviceProvider.vue'
import { mapGetters, mapMutations } from 'vuex'
// import '@/utils/googleAnalytics/googleAnalytics.js'
import mokerBuySFT from '@/utils/moker/buySFT'
import mokerBuyTraditional from '@/utils/moker/buyTraditional'
import mokerPostBuy from '@/utils/moker/postBuy'
import mokerPostRent from '@/utils/moker/postRent'
import mokerPostRentOut from '@/utils/moker/postRentOut'
import mokerPostSale from '@/utils/moker/postSale'
import mokerRenter from '@/utils/moker/renter'

// 测试组件
import VueDialog from '@/components/common/dialog'

// import VueClause from '@/components/clause/clause.vue'

export default {
  data () {
    return {
      'initSelectList': [
        'How to buy homes with SFT Transaction Method?', // 如何用sft交易法买房
        'How to buy homes with Traditional Transaction Method?', // 如何用普通交易法买房
        'How to Post a Purchase Request?', // 如何发布求购
        'How to Post a Rental Request?', // 如何发布求租
        'How to List a Rental?', // 如何发布出租房源
        'How to List a home for sale?', // 如何发布出售房源
        'How to rent a house?' // 如何租房
      ],
      'selectList': [],
      'maxRefOffsetHeight': 5000,
      'minRefOffsetTop': null,
      'isShowDirection': true,
      'showSignInLayer': false,
      'showRegisterLayer': false,
      'showForgetPwdLayer': false,
      'showFooterComponent': true,
      'bgOpacityNone': false,
      'showHeaderComponent': false,
      'showMessageLayer': false,
      // 全局监听的一个定时器
      'timers': null,
      'oldMessageObject': {},
      'Msg': 0,
      'oldMsg': 0,
      'ERROR_4007': 0,
      // WebSocket长连接
      'websock': null,
      'socketInput': null,
      'labelList': mokerBuySFT,
      'socketObject': {}
    }
  },
  'components': {
    'vue-header': VueHeader,
    'vue-footer': VueFooter,
    'vue-register': VueRegister,
    'vue-sign-in': VueSignIn,
    // 'vue-forget-pwd': VueForgetPwd,
    'vue-forget-password': VueForgetPassword,
    'vue-message': VueMessage,
    'vue-completion-info': VueCompletionInfo,
    'vue-check-email-dialog': VueCheckEmailDialog,
    'vue-study-guide-component': VueStudyGuideComponent,
    'vue-left-tools-component': VueLeftToolsComponent,
    'vue-hx-message': VueHXMessage,
    'vue-service-provider-component': VueServiceProviderComponent,
    'vue-dialog': VueDialog
    // 'vue-clause-info': VueClause
  },
  'methods': {
    ...mapMutations({
      openMessages: 'openMessage',
      UPDATA_GLOBAL_USER_INFO: 'UPDATA_GLOBAL_USER_INFO',
      UPDATA_SERCH_FROM: 'UPDATA_SERCH_FROM',
      UPDATA_MAP_CONFIG: 'UPDATA_MAP_CONFIG',
      UPDATA_GUID: 'UPDATA_GUID',
      UPDATE_USER_GUID_INFO: 'UPDATE_USER_GUID_INFO',
      UPDATA_NOTIFY_SOCKET: 'UPDATA_NOTIFY_SOCKET',
      UPDATA_NOTIFY_MESSAGE_ARRAY: 'UPDATA_NOTIFY_MESSAGE_ARRAY',
      UPDATA_SEARCH_HISTORY: 'UPDATA_SEARCH_HISTORY'
    }),
    _handleWatchRouter () {
      var path = this.$route.fullPath
      switch (path) {
        case '/buyHouse':
          this.selectList = [this.initSelectList[0]]
          break
        case '/commonHouse':
          this.selectList = [this.initSelectList[1]]
          break
        case '/rentingHouse':
          this.selectList = [this.initSelectList[6]]
          break
        case '/requestList/buyRequestSft':
          this.selectList = [this.initSelectList[5]]
          break
        case '/requestList/buyRequest':
          this.selectList = [this.initSelectList[2]]
          break
        case '/requestList/rentRequest':
          this.selectList = [this.initSelectList[4]]
          break
        default:
          this.selectList = this.initSelectList
      }
    },
    _handleSelect (_str) {
      // console.log(_str)
      switch (_str) {
        case 'How to buy homes with SFT Transaction Method?':
          this.labelList = mokerBuySFT
          // console.log(this.labelList, '如何用sft交易法买房')
          break
        case 'How to buy homes with Traditional Transaction Method?':
          this.labelList = mokerBuyTraditional
          // console.log(this.labelList, '如何用普通交易法买房')
          break
        case 'How to Post a Purchase Request?':
          this.labelList = mokerPostBuy
          // console.log(this.labelList, '如何发布求购')
          break
        case 'How to Post a Rental Request?':
          this.labelList = mokerPostRent
          // console.log(this.labelList, '如何发布求租')
          break
        case 'How to List a Rental?':
          this.labelList = mokerPostRentOut
          // console.log(this.labelList, '如何发布出租房源')
          break
        case 'How to List a home for sale?':
          this.labelList = mokerPostSale
          // console.log(this.labelList, '如何发布出售房源')
          break
        case 'How to rent a house?':
          this.labelList = mokerRenter
          // console.log(this.labelList, '如何租房')
          break
      }
    },
    _handleMaxRefOffsetHeight (val) {
      this.maxRefOffsetHeight = val
    },
    _handlerDirection (_info) {
      this.isShowDirection = _info
    },
    toggleSignInLayer (_bool) {
      this.showSignInLayer = _bool
    },
    toggleRegisterLayer (_bool) {
      this.showRegisterLayer = _bool
    },
    toggleForgetPwdLayer (_bool) {
      this.showForgetPwdLayer = _bool
    },
    // toggleMessageLayer (_bool) {
    //   this.showMessageLayer = _bool
    // },
    childToParentComponentChange (params) {
      this.showFooterComponent = !params.showFooter
      this.bgOpacityNone = params.bgOpacityNone
      this.showHeaderComponent = !params.showHeader
    },
    guid () {
      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    // 获取游客的环信ID
    fetchTouristInfo (_guid) {
      this.$axios.post(`${this.XT_PROD_PATH}customer/tourist/save`, {id: _guid})
        .then(res => {
          this.UPDATE_USER_GUID_INFO(res.data.data)
        })
    },
    initIndexDB () {
      // 初始化本地电脑有使用过的部分数据 用于用户短时间登录 关闭网页操作等 将会恢复用户操作记录
      this.$indexDB.init({}, () => {
        // this.$indexDB.createIndex(this.$ebuyhouseDB.db, 'userInfo', {serchname: 'guid', keyword: 'guid', unique: false})
        // 更新GUID标识
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'userInfo', 'guid', (e) => {
          if (!e) {
            // Guid
            const guid = this.guid()
            // 缓存到数据库
            this.$indexDB.addData(this.$ebuyhouseDB.db, 'userInfo', {id: 'guid', data: guid})
            // 缓存到Vuex
            this.UPDATA_GUID(guid)
          } else {
            // 更新到Vuex
            this.UPDATA_GUID(e.data)
          }
          // 获取游客的环信ID
          // this.fetchTouristInfo(this.stringGuid)
        })
        // 更新登录后用户信息数据
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo', (e) => {
          if (e) {
            this.UPDATA_GLOBAL_USER_INFO(e.data)
          }
        })
        // 更新地图搜索参数
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapSerchParams', (e) => {
          if (e) {
            console.log('获取到缓存数据--地图搜索参数')
            console.log(e)
            this.UPDATA_SERCH_FROM(e.data)
          }
        })
        // 头部历史消息
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'notify', 'notifyMessageArray' + this.GlobalUserInfo.id, (e) => {
          if (e) {
            console.log('获取到缓存数据--头部历史消息')
            // console.log(e)
            this.UPDATA_NOTIFY_MESSAGE_ARRAY(e.data)
            // this.UPDATA_MAP_CONFIG(e.data)
          }
        })
        // 更新地图配置参数
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapGMapConfig', (e) => {
          if (e) {
            console.log('获取到缓存数据--地图搜索参数')
            // console.log(e)
            this.UPDATA_MAP_CONFIG(e.data)
          }
        })
        // 更新历史记录
        this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'history', 'SearchHistory', (e) => {
          if (e) {
            console.log('获取到缓存数据--搜索历史记录')
            // console.log(e)
            this.UPDATA_SEARCH_HISTORY(e.data)
          }
        })
        // 暂时清除浏览器描边缓存 将于一月后关闭 2019-2-20
        this.$indexDB.clearData(this.$ebuyhouseDB.db, 'googleMap')
      })
    },
    // 自动清除缓存机制
    clearAll () {
      // this.SH_MAP_PROD_PATH
      this.$axios.get(`${this.SH_MAP_PROD_PATH}PC/code`)
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            if (localStorage.getItem('isUpdateVersion') !== res.data.data) {
              window.localStorage.clear()
              window.sessionStorage.clear()
              this.$indexDB.deletedb(this.$ebuyhouseDB.name)
              /* global hello: true */
              /* eslint no-undef: "error" */
              hello('facebook').logout()
              hello('twitter').logout()
              hello('google').logout()
              window.localStorage.setItem('isUpdateVersion', res.data.data)
              location.reload()
            }
          }
        })
    }
  },
  // created () {
  //   // this.initWebSocket()
  //   // console.log(this.$WebSocket)
  //   // this.$notifySocket = this.$WebSocket.initWebSocket({uid: this.GlobalUserInfo.id})
  // },
  created () {
    const _this = this
    this.clearAll()
    try {
      this.initIndexDB()
    } catch (error) {
      setTimeout(() => {
        _this.initIndexDB()
      }, 100)
    }
    // const socketArray = 261
    // let socketNum = 0
    // let timerSocket = setInterval(() => {
    //   if (socketNum === socketArray) {
    //     clearInterval(timerSocket)
    //   } else {
    //     _this.onlineWebSocket(parseInt(Math.random() * 10000000000000))
    //     socketNum++
    //   }
    // }, 500)
    // this.$axios({
    //   url: 'https://maps.googleapis.com/maps/api/geocode/json',
    //   method: 'GET',
    //   params: {
    //     address: '20th',
    //     key: 'AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs'
    //   }
    // })
  },
  computed: {
    ...mapGetters({
      windowMessageStatus: 'windowMessageStatus',
      updateCompletionInfoState: 'updateCompletionInfoState',
      checkEmailDialogStatus: 'checkEmailDialogStatus',
      stringGuid: 'Guid',
      token: 'token',
      GlobalUserInfo: 'GlobalUserInfo',
      notifySocket: 'notifySocket',
      windowForgotStatus: 'windowForgotStatus',
      serviceProviderStatus: 'serviceProviderStatus'
      // isShowClause: 'isShowClause'
    }),
    studyMaxHeight () {
      var _height = window.innerHeight - 500
      return _height
    }
  },
  watch: {
    /**
     * @auth houli
     * @time 2018-10-30
     * 监听路由状态信息
     * 由于部分页面不需要公共的模块
     * 故而通过
     * 构造函数的加载时间顺序进行来控制
    **/
    '$route': function (to) {
      this._handleWatchRouter()
      this.showFooterComponent = true
      this.bgOpacityNone = false
      this.showHeaderComponent = true
      if (to.path === '/index') {
        this.minRefOffsetTop = 700
      } else {
        this.minRefOffsetTop = 60
      }
    },
    'windowMessageStatus': {
      handler (_new, _old) {
        this.showMessageLayer = _new
      },
      deep: true,
      immediate: true
    },
    'GlobalUserInfo': {
      handler (_new, _old) {
        console.log(_new)
        if (Object.keys(_new).includes('id') && this.token) {
          // 开启WebSocket通讯
          console.log('开启WebSocket通讯')
          this.$WebSocket.initWebSocket({uid: _new.id, uri: this.SOCKET_URI})
          console.log('开启环信即时聊天通讯')
          // 更新环信用户
          this.$WebImOptions.user = _new.hxusername
          // 登录操作
          this.$imConn.open(this.$WebImOptions)
          // 提示后台开启系统推送
          // this.$WebSocket.websocketsend({signal: 0, type: 0})
        } else {
          if (this.$WebSocket.websock) {
            console.log('关闭平台通讯')
            this.$WebSocket.websocketclose()
            console.log('关闭环信即时聊天通讯')
            this.$imConn.close()
          }
          console.log(this.$imConn)
        }
      },
      deep: true,
      immediate: true
    }
  },
  destroyed () {
    // this.websocketclose()
    if (this.$WebSocket) {
      this.$WebSocket.websocketclose()
    }
  }
}
</script>
<style lang="sass">
  @import url('//at.alicdn.com/t/font_1105666_mdo50gkfc2q.css')
  .el-badge__content.is-fixed
    top: -4px !important
    right: 4px !important
</style>
