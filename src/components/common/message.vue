<template>
  <section class="message-container" v-el-drag-dialog>
    <section :class="['main-container', 'el-dialogs', isShowHistoryList ? 'history-active' : '', isFullScreen ? 'fullScreen' : '']">
      <!-- 左侧栏列表区 -->
      <section class="contact-left-list left">
        <!-- 顶部客服 -->
        <header class="line-customer-service-box">
          <el-popover
            v-model="customerListStatus"
            :visible-arrow="false"
            popper-class="customer-dom-box"
            placement="bottom"
            width="205"
            trigger="click">
            <template>
              <ul class="service-box">
                <li :class="['customer-service-item', item.loginType === 1 ? 'Online' : 'Offline']" v-for="(item, index) in customerList" :key="item.hxusername" @click="addUserMessageNode(item)">
                  <!-- <img src="/static/img/message/Customer service.png" alt> -->
                  <i class="iconfont icon-service"></i>
                  <span>Customer service {{index + 1}}</span>
                </li>
                <!-- <li class="customer-service-item"></li> -->
              </ul>
            </template>
            <el-button slot="reference" class="customer-button">
              <i class="iconfont icon-service"></i>
              <span>Customer service</span>
              <i class="el-iconfont el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
          <!-- <ul class="service-box">
            <li class="customer-service-item" v-for="(item, index) in customerList" :key="item.hxusername" @click="addUserMessageNode(item)">
              <img src="/static/img/message/Customer service.png" alt>
              <span>Customer service {{index + 1}}</span>
            </li>
            <li class="customer-service-item"></li>
          </ul> -->
        </header>
        <!-- 搜索+用户列表 -->
        <section class="current-user-list">
          <header class="search-info">
            <section class="search-box">
              <el-input class="search-user-input" v-model="searchUserKeyWord" :placeholder="searchUserPlaceholder" @click.enter="fetchFriendsList">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="fetchFriendsList"></i>
              </el-input>
            </section>
          </header>
          <section class="user-list-box">
            <ul class="user-list">
              <!-- <li class="user-item"></li> -->
              <li :class="['user-item', CurrentUser.fromName === item.fromName ? 'active' : '', item.loginType === 1 ? 'Online' : 'Offline']" v-for="(item, index) in OnlineUserList" :key="index" v-if="OnlineUserList.length !== 0" @click="currentUserChange(item)">
                <section class="user-item-author-info">
                  <img class="user-item-author-img" :src="item.fromHead || '/static/img/common/header/avatar.png'">
                  <span class="user-item-author-name">
                    <el-badge :value="item.badge || item.messageNum" :hidden="item.badge === 0 && item.messageNum === 0" class="item-name" type="primary" style="display: inline">
                      {{item.fromNickName}}
                    </el-badge>
                  </span>
                </section>
                <i class="el-icon-close" @click.stop="deleteFriend(item)"></i>
              </li>
              <li class="user-item" v-else>
                <span>no data</span>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <!-- 右侧内容区 -->
      <section class="contack-right-content right">
        <!-- 顶部tools工具栏 -->
        <header class="contack-user-name-tools-bar top el-dialog__header">
          <h3 class="to-user-name">{{CurrentUser.fromNickName}} <i :class="['iconfont', CurrentUser.loginType === 1 ? 'icon-online online' : 'icon-lixian offline']"></i></h3>
          <section class="tools-bar">
            <span class="tools-item">
              <i :class="['iconfont', isFullScreen ? 'icon-suofang' : 'icon-icon--']" @click="zoomMessage"></i>
            </span>
            <span class="tools-item">
              <i class="iconfont icon-guanbi" @click="closeMessage"></i>
            </span>
          </section>
        </header>
        <!-- 内容区 -->
        <section class="contack-content">
          <!-- 消息内容 -->
          <section class="contack-message-container">
            <!-- 聊天记录模块 -->
            <section class="contack-message-content">
              <!-- 提示语 -->
              <section class="contack-message-content-fixed-power" v-if="TipConfig.isShow">
                <img class="contack-message-content-fixed-power-left" src="/static/img/message/04.png">
                <span class="contack-message-content-fixed-power-title">{{TipConfig.content}}</span>
                <i class="contack-message-content-fixed-power-close el-icon-close" @click="TipConfig.isShow = !TipConfig.isShow"></i>
              </section>
              <!-- 聊天内容盒子 -->
              <section class="contack-message-content-list-box" ref="messageBox">
                <ul class="current-user-message-list-box">
                  <li :class="['current-user-message-item', !message.isMe ? 'message-left' : 'message-right']" v-for="(message, index) in messages" :key="index">
                    <section class="user-author-img">
                      <img class="author-img" :src="message.isMe ? MyHeaderImg : CurrentUser.fromHead">
                    </section>
                    <section class="message-card-item-house-info">
                      <section class="message-content-style">
                        <article class="message-html-content" v-html="message.data"></article>
                        <section class="card-list-item" v-if="$options.filters.isShowCardItem(message)" @click="openHouseInfo(message.ext)">
                          <header class="header-img">
                            <img :src="message.ext.imgUrl">
                          </header>
                          <footer class="footer-intro">
                            <h4><span class="mini">$ </span>{{ message.ext.price }}</h4>
                            <section class="intro">
                              <section class="icons-items">
                                <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                                <span>{{ message.ext.bedroom !== 'studio' ? message.ext.bedroom + ' bds' : message.ext.bedroom }}</span>
                              </section>
                              <section class="icons-items">
                                <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                                <span class="padding-5">●</span>
                                <span>{{ message.ext.bathroom }} ba</span>
                              </section>
                              <section class="icons-items">
                                <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                                <span class="padding-5">●</span>
                                <span>{{ message.ext.lotSqft }} Sqft</span>
                              </section>
                            </section>
                            <footer class="art-itro">
                              <article>{{ message.ext.street }}</article>
                            </footer>
                          </footer>
                        </section>
                      </section>
                      <span>{{message.createTime}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </section>
            <hr>
            <!-- 底部输入模块 -->
            <section class="contack-message-insert">
              <!-- 工具栏 -->
              <header class="contack-message-insert-tools-bar">
                <!-- 左侧工具栏 -->
                <section class="tools-bar-box">
                  <el-tooltip placement="top-start" effect="light" popper-class="Emoji">
                    <template slot="content">
                      <section class="emojiType">
                        <el-tabs type="border-card" tab-position="bottom" class="tab-customer-emoji">
                          <el-tab-pane class="tab-emoji">
                            <span slot="label" class="label-sty">
                              <!-- <i class="el-icon-date"></i> -->
                              <img src="/static/images/faces/ee_1.png" alt="imgEmoji">
                            </span>
                            <ul class="emoji-box">
                              <li class="emoji-item" v-for="item in EmojiList" :key="item.id" v-show="item.type === 'img'" @click="addEmoji(item)">
                                <img :src="item.img" :data-emoji-id="item.emoji">
                                <!-- <span v-if="item.type === 'emoji'">{{ item.img }}</span> -->
                              </li>
                            </ul>
                          </el-tab-pane>
                          <el-tab-pane class="tab-emoji">
                            <span slot="label" class="label-sty">
                              <!-- <i class="el-icon-date"></i> -->
                              😃
                            </span>
                            <ul class="emoji-box">
                              <li class="emoji-item" v-for="item in EmojiList" :key="item.id" v-show="item.type === 'emoji'" @click="addEmoji(item)">
                                <!-- <img v-if="item.type === 'img'" :src="item.img" :data-emoji-id="item.emoji"> -->
                                <span>{{ item.img }}</span>
                              </li>
                            </ul>
                          </el-tab-pane>
                        </el-tabs>
                      </section>
                      <!-- <ul class="emoji-box">
                        <li class="emoji-item" v-for="item in EmojiList" :key="item.id" @click="addEmoji(item)">
                          <img v-if="item.type === 'img'" :src="item.img" :data-emoji-id="item.emoji">
                          <span v-if="item.type === 'emoji'">{{ item.img }}</span>
                        </li>
                      </ul> -->
                    </template>
                    <span class="tools-item">
                      <img src="/static/img/message/02.png" alt>
                    </span>
                  </el-tooltip>
                </section>
                <!-- 右侧历史记录 -->
                <section class="contack-message-insert-history">
                  <section class="tools-btn-history" @click="switchOpenHistoryWindow">
                    <i class="el-icon-date"></i>
                    <span>Message History</span>
                  </section>
                </section>
              </header>
              <!-- 弹窗层 -->
              <el-popover
                popper-class="showHouseInfoClassOffsetHeight"
                ref="houseInfo"
                v-model="isShowHouseInfoBox"
                placement="top-start"
                :visible-arrow="false"
                offset="50"
                :disabled="isShowHouseInfo || !CurrentUser.fromName"
                trigger="click">
                <section class="card-list-item" @click="sendHouseMessage(houseInfoInformation)">
                  <header class="header-img">
                    <img :src="houseInfoInformation.imgUrl">
                  </header>
                  <footer class="footer-intro">
                    <h4><span class="mini">$ </span>{{ houseInfoInformation.price|priceFormat }}</h4>
                    <section class="intro">
                      <section class="icons-items">
                        <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                        <span>{{ houseInfoInformation.bedroom !== 'studio' ? houseInfoInformation.bedroom + ' bds' : houseInfoInformation.bedroom }}</span>
                      </section>
                      <section class="icons-items">
                        <span class="padding-5">●</span>
                        <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                        <span>{{ houseInfoInformation.bathroom }} ba</span>
                      </section>
                      <section class="icons-items">
                        <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                        <span class="padding-5">●</span>
                        <span>{{ houseInfoInformation.livingSqft|priceFormat }} sqft</span>
                      </section>
                    </section>
                    <footer class="art-itro">
                      <article>{{ houseInfoInformation.street }}</article>
                    </footer>
                  </footer>
                </section>
              </el-popover>
              <!-- 输入框 @keydown.enter="sendMessage" -->
              <cite
                ref="execInput"
                :disabled="!CurrentUser.fromName"
                v-popover:houseInfo
                placeholder="place input content"
                @input="input"
                @keydown="shiftAndEnterSend"
                contenteditable>
              </cite>
              <!-- 底部按钮组 发送消息等 -->
              <section class="contack-message-buttom-btn">
                <section class="contack-message-buttom-btn-close" @click="closeMessage">Close</section>
                <section class="contack-message-buttom-btn-send" @click="sendMessage">Send</section>
              </section>
            </section>
          </section>
          <!-- 历史记录 -->
          <section class="contack-message-history" v-show="isShowHistoryList">
            <header class="contack-message-history-header">
              <span>Message History<i class="el-icon-close" @click="switchCloseHistoryWindow"></i></span>
            </header>
            <section class="contack-message-history-content">
              <ul class="history-scroll-box">
                <li :class="['history-item', item.type ? 'left' : 'right']" v-for="(item, index) in historyList" :key="index">
                  <header class="history-item-user-info">
                    <span class="history-item-user-info-username">{{item.username}}</span>
                    <span class="history-item-user-time">{{item.createTime}}</span>
                  </header>
                  <section class="history-item-body">
                    <article class="history-item-body-content" v-html="item.data"></article>
                    <section class="card-list-item" v-if="$options.filters.isShowCardItem(item)" @click="openHouseInfo(item.ext)">
                      <header class="header-img">
                        <img :src="item.ext.imgUrl || '/static/img/common/header/avatar.png'">
                      </header>
                      <footer class="footer-intro">
                        <h4><span class="mini">$ </span>{{ item.ext.price }}</h4>
                        <section class="intro">
                          <section class="icons-items">
                            <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                            <span>{{ item.ext.bedroom !== 'studio' ? item.ext.bedroom + ' bds' : item.ext.bedroom }}</span>
                          </section>
                          <section class="icons-items">
                            <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                            <span class="padding-5">●</span>
                            <span>{{ item.ext.bathroom }} ba</span>
                          </section>
                          <section class="icons-items">
                            <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                            <span class="padding-5">●</span>
                            <span>{{ item.ext.lotSqft }} Sqft</span>
                          </section>
                        </section>
                        <footer class="art-itro">
                          <article>{{ item.ext.street }}</article>
                        </footer>
                      </footer>
                    </section>
                  </section>
                </li>
              </ul>
            </section>
            <footer class="contack-message-history-pageconfig">
              <section class="pageconfig-tools-bar">
                <span class="page-tools-bar-item" @click="jumpHistoryPageContent(0)"><i class="el-icon-d-arrow-left"></i></span>
                <span class="page-tools-bar-item" @click="jumpHistoryPageContent(1)"><i class="el-icon-arrow-left"></i></span>
                <span class="page-tools-bar-item" @click="jumpHistoryPageContent(2)"><i class="el-icon-arrow-right"></i></span>
                <span class="page-tools-bar-item" @click="jumpHistoryPageContent(3)"><i class="el-icon-d-arrow-right"></i></span>
              </section>
            </footer>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      // 客服列表
      customerList: [],
      // 客服列表显示状态
      customerListStatus: false,
      // 左侧搜索框内容
      searchUserKeyWord: null,
      // 左侧搜索框placeholder
      searchUserPlaceholder: 'Contacts',
      // 用户输入的数据
      customerInputMessage: null,
      // 是否显示
      showMessage: false,
      // 当前输入框的消息
      msgBold: null,
      // 创建即时通讯对象
      conn: null,
      // 登录对象
      userAccount: {
        userName: 'Ebuyhouse',
        password: '123456'
      },
      // 在线用户列表
      OnlineUserList: [],
      // 聊天对象
      CurrentUser: {
        fromName: null
      },
      // 当前用户聊天数据
      messages: [],
      // 提示
      TipConfig: {
        isShow: true,
        content: `You can ask for the evidence of funds to know his purchasing power.`
      },
      isShowHouseInfoBox: false,
      // 是否显示推荐发送消息  // 为true时不可会显示 false时可显示
      isShowHouseInfo: true,
      // 可发送的房源信息
      houseInfoInformation: {
        price: 0
      },
      MyHeaderImg: window.localStorage.getItem('a') || '/static/img/common/header/avatar.png',
      // emoji集合
      EmojiList: [],
      // 是否显示历史记录列表
      isShowHistoryList: false,
      // 历史记录渲染列表
      historyList: [],
      // 历史记录分页配置
      historyPageConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      // 是否存在用户聊天时
      isNoUser: false,
      // 是否全屏显示
      isFullScreen: false,
      // 存储WEBIM配置
      WebIMConfig: null
    }
  },
  computed: {
    ...mapGetters({
      signInState: 'signInState',
      userInfo: 'userInfo',
      userInfoMessageList: 'userInfoMessageList',
      GlobalUserInfo: 'GlobalUserInfo',
      userGuidInfo: 'userGuidInfo',
      token: 'token',
      guid: 'Guid'
    })
  },
  filters: {
    isShowCardItem (_info) {
      if (_info.ext) {
        if (_info.ext.houseId) {
          console.log(true)
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    timeFormat (_info) {
      if (_info) return _info
      // const time = new Date()
      // return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getMonth() + 1}/${time.getDate()}`
      // return this.formatTime()
    }
  },
  watch: {
    // 是否登录 登录后做连接上线处理
    signInState: {
      handler (_new) {
        console.log(false)
        console.log(`%c ${_new}`, 'background-color: red color: #fff')
        if (_new) {
          this.userAccount = {
            userName: this.GlobalUserInfo.hxusername || this.userGuidInfo.hxUserName,
            password: '123456'
          }
          if (this.conn !== null) {
            this.loginHX(this.userAccount)
          }
        } else {
          this.userAccount = {
            userName: this.userGuidInfo.hxUserName,
            password: '123456'
          }
          // 清空处理
          this.OnlineUserList = []
          this.updateMessageUserInfo(null)
        }
      },
      immediate: true,
      deep: true
    },
    // 监听用户是否有切换
    userInfo: {
      handler (_new, _old) {
        this.CurrentUser = _new
      },
      deep: true,
      immediate: true
    },
    // 监听当前聊天数据
    userInfoMessageList: {
      handler (_new, _old) {
        console.log('------------------->')
        console.log(_new, _old)
        this.messages = _new
      },
      deep: true,
      immediate: true
    },
    // 监听当前router是否在当前房源
    '$route': {
      handler (to, from) {
        if (to.name === 'listing-details') {
          console.log(to)
          if (to.params) {
            this.isShowHouseInfo = false
            const houseInfos = to.params
            this.fetchHouseInfo(houseInfos.houseId)
          } else {
            this.isShowHouseInfo = true
          }
        } else {
          this.isShowHouseInfo = true
        }
      },
      immediate: true
    },
    // 搜索用户
    searchUserKeyWord (_new, _old) {
      this.fetchFriendsList()
    }
  },
  created () {
    const _this = this
    // 创建对象
    /* eslint new-cap: ["error", { "newIsCap": false }] */
    this.conn = new WebIM.connection({
      isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
      url: WebIM.config.xmppURL,
      heartBeatWait: WebIM.config.heartBeatWait,
      autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      autoReconnectInterval: WebIM.config.autoReconnectInterval,
      apiUrl: WebIM.config.apiURL,
      isAutoLogin: true
    })
    this.conn.listen({
      onOpened: function () {
        // console.log('OK')
        this.getRoster({
          success: (roster) => {
            // console.log(roster)
          }
        })
        console.log('%c开始获取用户列表数据', 'color: red')
        _this.lineServiceChange()
        _this.fetchFriendsList()
        _this.initEmoji(WebIM)
        _this.WebIMConfig = WebIM
        console.log('%c获取列表数据结束', 'color: red')
      },
      onClosed: function () {},
      onTextMessage: function (message) {
        console.log(message)
        const cloneMessage = _this.formatMessage(message, false)
        console.log(cloneMessage)
        console.log('拉取环信消息')
        _this.updateUserInfoMessageList(cloneMessage)
        _this.scrollBottom()
        _this.addBadgeChange(cloneMessage)
        _this.userIsUserList(cloneMessage)
      },
      // onEmojiMessage: function ( message ) {console.log("当前关闭")},   //收到表情消息
      // onPictureMessage: function ( message ) {console.log("当前关闭")}, //收到图片消息
      // 收到命令消息
      onCmdMessage: function (message) {
        console.log(message)
        const cloneMessage = _this.formatMessage(message, true)
        _this.updateUserInfoMessageList(cloneMessage)
        _this.scrollBottom()
        _this.addBadgeChange(cloneMessage)
        _this.userIsUserList(cloneMessage)
      }
      // onAudioMessage: function ( message ) {console.log("当前关闭")},   //收到音频消息
      // onLocationMessage: function ( message ) {console.log("当前关闭")},//收到位置消息
      // onFileMessage: function ( message ) {console.log("当前关闭")},    //收到文件消息
      // onVideoMessage: function ( message ) {console.log("当前关闭")},   //收到视频消息
      // onPresence: function ( message ) {console.log("当前关闭")},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
      // onRoster: function ( message ) {console.log("当前关闭")},         //处理好友申请
      // onInviteMessage: function ( message ) {console.log("当前关闭")},  //处理群组邀请
      // onOnline: function () {console.log("当前关闭")},                  //本机网络连接成功
      // onOffline: function () {console.log("当前关闭")},                 //本机网络掉线
      // onError: function (err) {console.log("错误")}
    })
    // 获取当前页面信息
    const route = this.$route
    if (route.name === 'listing-details') {
      if (route.params) {
        this.isShowHouseInfo = false
        const houseInfos = route.params
        this.fetchHouseInfo(houseInfos.houseId)
      } else {
        this.isShowHouseInfo = true
      }
    } else {
      this.isShowHouseInfo = true
    }
  },
  methods: {
    ...mapMutations({
      openMessages: 'openMessage',
      updateMessageUserInfo: 'UPDATE_MESSAGE_USER_INFO',
      updateUserInfoMessageList: 'UPDATE_USER_INFO_MESSAGE_LIST'
    }),
    input () {
      const v = this.$refs['execInput'].innerHTML
      this.msgBold = v
    },
    // 粘贴消息到输入框
    paste (e) {
      e.preventDefault()
      const html = e.clipboardData.getData('text/html')
      document.execCommand('insertHTML', false, html)
      this.input()
    },
    // 清除消息输入框
    clearMsg () {
      this.$refs['execInput'].innerHTML = null
    },
    // 初始化Emoji表情
    initEmoji (_WebIM) {
      console.log(_WebIM.Emoji)
      const baseUrl = _WebIM.Emoji.path
      Object.keys(_WebIM.Emoji.map).map((item, index) => {
        this.EmojiList.push({
          id: '1-' + index,
          type: 'img',
          img: baseUrl + _WebIM.Emoji.map[item],
          name: _WebIM.Emoji.map[item],
          emoji: item
        })
      })
      _WebIM.NewEmoji.map.map((item, index) => {
        this.EmojiList.push({
          id: '2-' + index,
          type: 'emoji',
          img: item,
          name: item,
          emoji: item
        })
      })
      console.log(_WebIM.NewEmoji)
    },
    // 格式化发送的数据
    formatToSendMessage (_string) {
      const _this = this
      return _string.replace(/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g, function (params, info) {
        // console.log(params, info)
        return _this.encodeUnicode(params)
      }).replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, params) {
        console.log(params)
        let handlerString = params
        params.replace(/[^/]+(?=$)/g, function (_params) {
          // console.log(_params)
          _this.EmojiList.map(item => {
            if (item.name === _params) {
              handlerString = item.emoji
            }
          })
        })
        return handlerString
      })
      // return this.encodeUnicode(_string)
    },
    // 格式化本地图片表情转换
    formatLocalImgEmojiToEmoji (_string) {
      const _this = this
      return _string.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, params) {
        console.log(params)
        let handlerString = params
        params.replace(/[^/]+(?=$)/g, function (_params) {
          // console.log(_params)
          _this.EmojiList.map(item => {
            if (item.name === _params) {
              handlerString = item.emoji
            }
          })
        })
        return handlerString
      })
    },
    // unicode转码
    encodeUnicode (str) {
      var res = []
      for (var i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
      }
      return '\\u' + res.join('\\u')
    },
    // 格式化返回消息对象参数
    formatMessage (_info, _type) {
      const _this = this
      _info['createTime'] = this.formatTime()
      // console.log(this.EmojiList)
      // console.log(this.WebIMConfig.Emoji.map)
      // console.log(_info['data'])
      // console.log(_info)
      if (!_type) {
        _info['data'] = _this.formatMessageTxt(_info['data'])
      }
      return _info
    },
    formatMessageTxt (_string) {
      const _this = this
      return _string.replace(/\[.*?\]/g, function (params) {
        const baseUrl = _this.WebIMConfig.Emoji.path
        if (Object.keys(_this.WebIMConfig.Emoji.map).includes(params)) {
          return `<img src="${baseUrl + _this.WebIMConfig.Emoji.map[params]}"/>`
        } else {
          return params
        }
        // console.log(_this.EmojiList.includes(params))
        // console.log(params)
        // console.log(_this.EmojiList.includes(params))
      })
    },
    // 缩放弹窗
    zoomMessage () {
      this.isFullScreen = !this.isFullScreen
      this.customerListStatus = false
      if (this.isFullScreen) {
        window.document.body.style.overflowY = 'hidden'
      } else {
        window.document.body.style.overflowY = 'auto'
      }
    },
    // 关闭弹窗
    closeMessage (e) {
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }
      this.conn.close('下线处理')
      window.document.body.style.overflowY = 'auto'
      this.openMessages(false)
    },
    loginHX (_info) {
      let options = {
        apiUrl: WebIM.config.apiURL,
        user: _info.userName || this.userAccount.userName,
        pwd: _info.password || this.userAccount.password,
        appKey: WebIM.config.appkey
      }
      console.log(options)
      this.conn.open(options)
    },
    // 获取好友列表 后台
    fetchFriendsList (_sx = false) {
      let Url = ['list/select', 'list/tourist/select']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.get(`${this.XT_PROD_PATH + Url}`, {params: {jId: this.token ? null : this.guid, toName: this.searchUserKeyWord}})
        .then(res => {
          if (res.data.success) {
            this.OnlineUserList = res.data.data.map(item => {
              item['badge'] = 0
              return item
            })
            if (!_sx) {
              // 设置默认
              if (this.OnlineUserList.length !== 0) {
                this.currentUserChange(this.OnlineUserList[0])
                this.isNoUser = true
              } else {
                this.updateMessageUserInfo(null)
                this.CurrentUser = {}
                this.messages = []
                this.isNoUser = false
              }
            }
          }
        })
    },
    // 删除聊天
    deleteFriend (_info) {
      this.switchCloseHistoryWindow()
      this.$axios.get(`${this.XT_PROD_PATH}list/delete`, {params: {jId: this.token ? null : this.guid, fromUserId: _info.fromUserId, toUserId: _info.toUserId}})
        .then(res => {
          if (res.data.success) {
            this.fetchFriendsList()
          }
        })
    },
    // 格式化时间方法
    formatTime (_timers) {
      // return
      if (_timers) {
        const time = new Date(_timers * 1000)
        return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()} ${time.getMonth() + 1}/${time.getDate()}`
      } else {
        const time = new Date()
        return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()} ${time.getMonth() + 1}/${time.getDate()}`
      }
    },
    // 获取未读历史信息
    fetchHistoryListList (_info) {
      if (_info.messageNum === 0) return
      let Url = ['message/select/list', 'message/select/tourist/list']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.get(`${this.XT_PROD_PATH + Url}`, {params: {toUserId: _info.fromUserId, jId: this.token ? null : this.guid}})
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data.rows)
            res.data.data.rows.map(item => {
              // item['from'] = item.fromName 2019-5-30修改
              item['from'] = this.CurrentUser.fromName
              item['to'] = item.toName
              item['createTime'] = this.formatTime(item.createTime)
              if (item.type === 'text') {
                item['data'] = this.formatMessageTxt(this.unicodeToUtf8(item.payload))
              } else if (item.type === 'json') {
                item['ext'] = JSON.parse(item.payload)
              }
              return item
            }).map(item => {
              this.updateUserInfoMessageList(item)
              console.log('------------------->历史记录')
              console.log(item)
            })
            this.scrollBottom()
            this.reply(_info.fromUserId)
          }
        })
    },
    // unicodeToUtf8
    unicodeToUtf8 (unicode) {
      unicode = unicode.replace(/\\/g, '%')
      unicode = unescape(unicode)
      unicode = unicode.replace(/%/g, '\\')
      unicode = unicode.replace(/\\/g, '')
      return unicode
    },
    // 标记已读
    reply (_id) {
      let Url = ['message/update/state', 'message/update/tourist/state']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      console.log(this.guid)
      this.$axios.get(`${this.XT_PROD_PATH + Url}`, {params: {id: _id, jId: this.token ? null : this.guid}})
        .then(res => {
          // this.fetchFriendsList(true)
          this.clearBadgeChange()
        })
    },
    // 如果用户不存在则重新拉取用户列表
    userIsUserList (_msg) {
      let includesStatus = false
      this.OnlineUserList.map(item => {
        // console.log(JSON.stringify(item))
        // console.log(item.fromName)
        // console.log(_msg.from, _msg.to)
        if (item.fromName === _msg.from) {
          includesStatus = true
        }
      })
      if (!includesStatus) {
        this.fetchFriendsList()
      }
    },
    // 如果没有处于当前对话消息中 显示提醒红点
    addBadgeChange (_msg) {
      // console.log(this.CurrentUser.fromName, _msg.from)
      if (this.CurrentUser.fromName.toUpperCase() !== _msg.from.toUpperCase()) {
        this.OnlineUserList = this.OnlineUserList.map(item => {
          if (item.fromName.toUpperCase() === _msg.from.toUpperCase()) {
            item['badge']++
          }
          return item
        })
        console.log(this.OnlineUserList)
      } else {
        this.reply(this.CurrentUser.fromUserId)
      }
    },
    // 清除当前红点
    clearBadgeChange () {
      this.OnlineUserList = this.OnlineUserList.map(item => {
        if (item.fromName.toUpperCase() === this.CurrentUser.fromName.toUpperCase()) {
          item['badge'] = 0
          item['messageNum'] = 0
        }
        return item
      })
    },
    // 新增通讯消息 后台
    addMessageNode (_info) {
      let Url = ['message/save', 'message/save/tourist']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, Object.assign({}, _info, {jId: this.token ? null : this.guid}))
      // this.$axios.post('http://192.168.0.135:9005/console/' + Url, Object.assign({}, _info, {jId: this.token ? null : this.guid}))
        .then(res => {
          // console.log('插入成功')
          if (!res.data.success) {
            this.fetchFriendsList()
          }
        })
    },
    // 按住shift+enter发送消息
    shiftAndEnterSend (event) {
      if (event.keyCode === 13 && !event.shiftKey && this.isNoUser) {
        this.sendMessage()
        event.preventDefault()
        event.stopPropagation()
      }
    },
    // 发送文本消息
    sendMessage () {
      // console.log(!this.isNoUser)
      if (!this.msgBold) {
        this.$message.info('The content sent cannot be empty')
        return
      }
      if (!this.isNoUser) {
        this.$message.info('Please select a chat object')
        return
      }
      var _this = this
      var messageContext = this.msgBold
      var id = this.conn.getUniqueId() // 生成本地消息id
      var msg = new WebIM.message('txt', id) // 创建文本消息
      msg.set({
        msg: _this.formatHTML(_this.formatLocalImgEmojiToEmoji(messageContext)),
        to: _this.CurrentUser.fromName,
        type: 'chat',
        // 消息发送成功回调
        success: function (_id, serverMsgId) {
          // messageContext = _this.formatToSendMessage(messageContext)
          const newMessage = {from: _this.userAccount.userName, to: _this.CurrentUser.fromName, data: messageContext, isMe: true, createTime: _this.formatTime()}
          _this.updateUserInfoMessageList(newMessage)
          _this.scrollBottom()
          // console.log(messageContext)
          // console.log(_this.formatToSendMessage(messageContext))
          // 提交到后台
          _this.addMessageNode({
            hxMsgId: id,
            payload: _this.formatHTML(_this.formatToSendMessage(messageContext)),
            toName: _this.CurrentUser.fromName,
            toUserId: _this.CurrentUser.fromUserId,
            type: 'text'
          })
        }
      })
      this.conn.send(msg.body)
      this.msgBold = null
      this.clearMsg()
    },
    // 发送房源信息
    sendHouseMessage (_info) {
      var _this = this
      var messageContext = this.msgBold
      var id = this.conn.getUniqueId()
      /* global WebIM: true */
      /* eslint no-undef: "error" */
      var msg = new WebIM.message('cmd', id)
      msg.set({
        msg: messageContext,
        to: _this.CurrentUser.fromName,
        action: 'houseInfo',
        ext: Object.assign({}, _info),
        success: function (_id, serverMsgId) {
          const newMessage = {from: _this.userAccount.userName, to: _this.CurrentUser.fromName, data: messageContext, isMe: true, ext: Object.assign({}, _info)}
          _this.updateUserInfoMessageList(newMessage)
          _this.scrollBottom()
          _this.isShowHouseInfoBox = false
          // 提交到后台
          _this.addMessageNode({
            hxMsgId: id,
            payload: JSON.stringify(_info),
            toName: _this.CurrentUser.fromName,
            toUserId: _this.CurrentUser.fromUserId,
            type: 'json'
          })
        }
      })
      this.conn.send(msg.body)
    },
    currentUserChange (_info) {
      // 选择用户
      // this.isNoUser = true
      // console.log(_info.fromUserId)
      this.updateMessageUserInfo(_info)
      this.scrollBottom()
      // this.fetchHistoryListList(_info)
      this.reply(_info.fromUserId)
      this.switchCloseHistoryWindow()
    },
    scrollBottom () {
      const _this = this
      setTimeout(() => {
        _this.$refs.messageBox.scrollTop = _this.$refs.messageBox.scrollHeight
      }, 100)
    },
    fetchHouseInfo (_id) {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/item`, {params: {houseId: _id}})
        .then(res => {
          if (res.data.success) {
            _this.houseInfoInformation = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openHouseInfo (_info) {
      this.$router.push({
        path: '/listing/details/' + _info.houseId
      })
      // 关闭当前聊天
      this.closeMessage()
    },
    addEmoji (_emoji) {
      console.log(_emoji)
      if (_emoji.type === 'img') {
        document.execCommand('insertImage', false, _emoji.img)
      } else if (_emoji.type === 'emoji') {
        // debugger
        // this.$refs['execInput'].execCommand('insertText', false, _emoji.emoji)
        // document.execCommand('insertHorizontalRule', false, _emoji.emoji)
        this.$refs['execInput'].innerHTML += _emoji.emoji
        this.msgBold = this.$refs['execInput'].innerHTML
        // document.execCommand('justifyRight')
      }
    },
    lineServiceChange () {
      this.$axios.get(`${this.ZJC_ADMIN_PROD_PATH}random/customer`)
        .then(res => {
          // console.log('插入成功')
          // console.log(res)
          // this.addUserMessageNode(res.data.data)
          this.customerList = res.data.data
        })
    },
    // 建立陌生人关系 后台
    addUserMessageNode (_info) {
      this.customerListStatus = false
      let Url = ['list/savese', 'list/tourist/savese']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.headUrl || '',
        'toName': _info.hxusername,
        'toNickName': _info.accountName,
        'toUserId': _info.id,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.addMessageListNode(_info)
        })
    },
    // 添加到列表 后台
    addMessageListNode (_info) {
      let Url = ['list/save', 'list/tourist/save']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.headUrl || '',
        'toName': _info.hxusername,
        'toNickName': _info.accountName,
        'toUserId': _info.id,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.fetchFriendsList(false)
        })
    },
    // 关闭历史记录操作并清空分页数据
    switchCloseHistoryWindow () {
      this.isShowHistoryList = false
      this.historyPageConfig.pageNum = 1
      this.historyPageConfig.pageSize = 12
    },
    // 打开历史纪录操作
    switchOpenHistoryWindow () {
      if (!this.isShowHistoryList && this.isNoUser) {
        this.fetchHistoryList()
        this.isShowHistoryList = true
      }
    },
    // 获取历史纪录接口
    fetchHistoryList () {
      // select/tourist/all/list
      // CurrentUser
      this.$axios.get(`${this.XT_PROD_PATH}message/select/tourist/all/list`, {params: {
        jId: this.CurrentUser.fromUserId,
        toUserId: this.CurrentUser.toUserId,
        type: this.token ? 1 : 0,
        pageNum: this.historyPageConfig.pageNum,
        pageSize: this.historyPageConfig.pageSize
        // jId: this.guid
      }})
        .then(res => {
          // console.log(res)
          this.historyList = res.data.data.rows.reverse().map(item => {
            // console.log(Boolean(item.bl))
            item['username'] = item.name
            item['createTime'] = this.formatTime(item.createTime)
            if (item.type === 'text') {
              item['data'] = this.formatMessageTxt(this.unicodeToUtf8(item.payload))
            } else if (item.type === 'json') {
              item['ext'] = JSON.parse(item.payload)
            }
            item['type'] = item.bl === 'true'
            return item
          })
          this.historyPageConfig.pageTotal = res.data.data.total
        })
    },
    // 跳转指定页面
    jumpHistoryPageContent (_type) {
      const maxPageNum = Math.ceil(this.historyPageConfig.pageTotal / this.historyPageConfig.pageSize)
      switch (_type) {
        case 0:
          if (this.historyPageConfig.pageNum !== 1) {
            this.historyPageConfig.pageNum = 1
            this.fetchHistoryList()
          }
          break
        case 1:
          if (this.historyPageConfig.pageNum > 1) {
            this.historyPageConfig.pageNum--
            this.fetchHistoryList()
          }
          break
        case 2:
          if (this.historyPageConfig.pageNum < maxPageNum) {
            this.historyPageConfig.pageNum++
            this.fetchHistoryList()
          }
          break
        default:
          if (this.historyPageConfig.pageNum !== maxPageNum) {
            this.historyPageConfig.pageNum = maxPageNum
            this.fetchHistoryList()
          }
          break
      }
    },
    // 去除HTML tag
    formatHTML (_string) {
      _string = _string.replace(/<\/?.+?>/g, '')
      _string = _string.replace(/(\n)/g, '')
      _string = _string.replace(/(\t)/g, '')
      _string = _string.replace(/(\r)/g, '')
      _string = _string.replace(/<\/?[^>]*>/g, '')
      _string = _string.replace(/\s/g, ' ')
      _string = _string.replace(/&nbsp;/g, ' ')
      _string = _string.replace(/&rsquo;/g, '’')
      _string = _string.replace(/&lsquo;/g, '‘')
      _string = _string.replace(/&hellip;/g, '…')
      _string = _string.replace(/&ndash;/g, '–')
      _string = _string.replace(/&mdash;/g, '—')
      _string = _string.replace(/&sbquo;/g, '‚')
      _string = _string.replace(/&ldquo;/g, '“')
      _string = _string.replace(/&rdquo;/g, '”')
      _string = _string.replace(/&bdquo;/g, '„')
      _string = _string.replace(/&dagger;/g, '†')
      _string = _string.replace(/&Dagger;/g, '‡')
      _string = _string.replace(/&bull;/g, '•')
      _string = _string.replace(/&permil;/g, '‰')
      _string = _string.replace(/&prime;/g, '′')
      _string = _string.replace(/&Prime;/g, '″')
      _string = _string.replace(/&lsaquo;/g, '‹')
      _string = _string.replace(/&rsaquo;/g, '›')
      _string = _string.replace(/&oline;/g, '‾')
      _string = _string.replace(/&frasl;/g, '⁄')
      console.log(_string)
      return _string
    }
  },
  mounted () {
    // 登录
    this.loginHX({})
    // this.$refs['execInput'].contentEditable = true
  }
}
</script>
<style lang="sass" scoped>
.message-container
  position: fixed
  z-index: 99
  width: 100%
  height: 0
  top: 0
  left: 0
  // display: flex
  // justify-content: center
  // align-items: center
  // 主容器
  .main-container
    width: 1040px
    height: 700px
    display: flex
    margin: 2cm auto
    border-radius: 5px
    box-shadow: 1px 1px 10px -1px #999
    position: relative
    overflow: hidden
    z-index: 99
    // transition: width .5s ease
    &.history-active
      width: 1500px
      // transition: width .5s ease
    &.fullScreen
      width: 100vw !important
      height: 100vh !important
      top: 0 !important
      left: 0 !important
      margin: 0 !important
    // 左侧控制面板
    .contact-left-list
      width: 210px
      flex: 0 0 210px
      height: 100%
      background-color: #1281FC
      display: flex
      flex-direction: column
      // 顶部客服列表
      .line-customer-service-box
        width: 100%
        height: auto
        padding: 15px
        max-height: 200px
        .customer-button
          width: 100%
          padding: 0
          background-color: transparent
          color: #fff
          border: none
          /deep/ span
            display: flex
            justify-content: space-between
            span
              display: flex
              justify-content: space-between
              align-items: center
            i.iconfont
              font-size: 24px
              display: flex
              align-items: center
            i.el-iconfont
              font-size: 18px
              display: flex
              align-items: center
        // overflow-y: scroll
        // &::-webkit-scrollbar
        //   width: 0px
        //   height: 0px
        // &::-webkit-scrollbar-thumb
        //   border-radius: 0px
        //   -webkit-box-shadow: 0
        //   background: #1281FC
        // &::-webkit-scrollbar-track
        //   // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
        //   border-radius: 0
        //   background: transparent
        .service-box
          display: flex
          flex-direction: column
          .customer-service-item
            height: 45px
            width: 100%
            background-color: #fff
            border-radius: 5px
            overflow: hidden
            display: flex
            align-items: center
            margin: 5px 0
            cursor: pointer
            // justify-content: center
            >img
              width: 20px
              height: 20px
              margin: 10px
            >span
              color: #333
              font-size: 14px
      // 左侧搜索+用户列表
      .current-user-list
        display: flex
        flex-direction: column
        flex: 1
        .search-info
          height: 30px
          margin-bottom: 10px
          .search-box
            background-color: #1A60AD
            height: 100%
            margin: 0 3px
            border-radius: 5px
            .search-user-input
              height: 100%
              display: flex
              align-items: center
              /deep/ input
                height: 100%
                color: #444
                font-size: 14px
                outline: none
              /deep/ .el-input__suffix
                display: flex
                align-items: center
                cursor: pointer
                span.el-input__suffix-inner
                  display: flex
                  align-items: center
                  >i
                    width: 12px
                    height: 12px
                    font-size: 12px
                    color: #444
                    display: flex
                    align-items: center
        .user-list-box
          flex: 1
          padding: 0 3px
          overflow-y: scroll
          overflow-x: hidden
          &::-webkit-scrollbar
            width: 0px
            height: 0px
          &::-webkit-scrollbar-thumb
            border-radius: 0px
            -webkit-box-shadow: 0
            background: #1281FC
          &::-webkit-scrollbar-track
            // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
            border-radius: 0
            background: transparent
          .user-list
            height: 100%
            .user-item
              height: 48px
              display: flex
              justify-content: space-between
              padding: 0 5px
              align-items: center
              cursor: pointer
              margin-bottom: 5px
              &.Offline
                filter: grayscale(100%)
              >i
                display: none
              &:hover,&.active
                border-radius: 5px
                background-color: #8AC2FF
              &:hover
                >i
                  display: inline-block
                  color: #444
              .user-item-author-info
                display: flex
                .user-item-author-img
                  width: 30px
                  height: 30px
                  overflow: hidden
                  border-radius: 50%
                  margin: 0 10px
                .user-item-author-name
                  color: #fff
                  font-size: 14px
                  display: flex
                  align-items: center
    // 右侧内容区
    .contack-right-content
      flex: 1
      display: flex
      flex-direction: column
      .contack-user-name-tools-bar
        height: 80px
        padding: 0 20px
        background-color: #F4F4F4
        display: flex
        width: 100%
        justify-content: space-between
        align-items: center
        .to-user-name
          font-size: 30px
          color: #333
          cursor: pointer
          i
            display: none
          i.online
            color: #1281FC
            margin-left: 10px
            display: inline-block
          i.offline
            color: #444444
            margin-left: 10px
            display: inline-block
        .tools-bar
          .tools-item
            i
              font-size: 30px
              color: #333
              cursor: pointer
    .contack-content
      display: flex
      flex: 1
      background-color: #fff
      width: 100%
      max-height: calc(-80px + 100%)
      .contack-message-container
        flex: 1
        display: flex
        flex-direction: column
        .contack-message-content
          display: flex
          flex: 1
          flex-direction: column
          max-height: calc(-215px + 100%)
          .contack-message-content-fixed-power
            height: 40px
            margin: 10px
            background-color: #F4F4F4
            display: flex
            justify-content: space-between
            padding: 0 5px
            align-items: center
            flex: 0 0 40px
            .contack-message-content-fixed-power-left
              width: 16px
              height: 16px
              margin: 0 5px
            .contack-message-content-fixed-power-title,
            .contack-message-content-fixed-power-close
              color: #333333
              font-size: 16px
              cursor: pointer
          .contack-message-content-list-box
            flex: 1
            padding: 0 10px
            overflow-y: scroll
            overflow-x: hidden
            &::-webkit-scrollbar
              width: 0px
              height: 0px
            &::-webkit-scrollbar-thumb
              border-radius: 0px
              -webkit-box-shadow: 0
              background: #1281FC
            &::-webkit-scrollbar-track
              // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
              border-radius: 0
              background: transparent
            .current-user-message-list-box
              height: 100%
              .current-user-message-item
                display: flex
                margin: 15px 0
                .user-author-img
                  width: 30px
                  height: 30px
                  margin: 5px
                  display: flex
                  align-items: center
                  .author-img
                    border-radius: 50%
                    max-width: 100%
                    height: 100%
                .message-card-item-house-info
                  display: flex
                  flex-direction: column
                  max-width: 80%
                  .message-content-style
                    padding: 10px 25px
                    border-radius: 5px
                  >span
                    color: #999999
                    font-size: 14px
                    margin: 10px 0
                &.message-left
                  justify-content: flex-start
                  .message-card-item-house-info
                    margin-left: 35px
                    .message-content-style
                      background-color: #f0f0f0
                      position: relative
                      &::before
                        width: 0
                        height: 0
                        border-top: 1px solid transparent
                        border-right: 10px solid #f0f0f0
                        border-bottom: 5px solid transparent
                        content: ''
                        position: absolute
                        left: -10px
                        top: 50%
                        transform: translateY(-5px)
                      .message-html-content
                        word-break: break-word
                        display: flex
                        flex-wrap: wrap
                        align-items: center
                        /deep/ img,video,audio
                          max-width: 200px
                    >span
                      text-align: left
                &.message-right
                  justify-content: flex-start
                  flex-direction: row-reverse
                  .message-card-item-house-info
                    margin-right: 35px
                    .message-content-style
                      background-color: #1281fc
                      position: relative
                      &::before
                        width: 0
                        height: 0
                        border-top: 1px solid transparent
                        border-left: 10px solid #1281fc
                        border-bottom: 5px solid transparent
                        content: ''
                        position: absolute
                        right: -10px
                        top: 50%
                        transform: translateY(-5px)
                      .message-html-content
                        color: #fff
                        word-break: break-word
                        display: flex
                        flex-wrap: wrap
                        align-items: center
                        /deep/ img,video,audio
                          max-width: 200px
                    >span
                      text-align: right
        .contack-message-insert
          height: 215px
          flex: 0 0 215px
          display: flex
          flex-direction: column
          .contack-message-insert-tools-bar
            height: 40px
            display: flex
            justify-content: space-between
            .tools-bar-box,
            .contack-message-insert-history
              display: flex
              align-items: center
              margin: 0 10px
              .tools-item
                font-size: 0
              .tools-btn-history
                cursor: pointer
                font-size: 14px
                color: #444
                padding: 5px
                &:hover,&.active
                  background-color: #E0E0E0
                >i
                  marign-right: 5px
          >cite
            flex: 1
            padding: 10px 20px
            font-style: normal
            word-break: break-word
            overflow-y: scroll
            overflow-x: hidden
            // display: flex
            // flex-wrap: wrap
            // align-items: center
            &::-webkit-scrollbar
              width: 0px
              height: 0px
            &::-webkit-scrollbar-thumb
              border-radius: 0px
              -webkit-box-shadow: 0
              background: #1281FC
            &::-webkit-scrollbar-track
              // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
              border-radius: 0
              background: transparent
            /deep/ img,video,audio
              max-width: 200px
          .contack-message-buttom-btn
            height: 65px
            display: flex
            align-items: center
            justify-content: flex-end
            .contack-message-buttom-btn-close,
            .contack-message-buttom-btn-send
              padding: 10px 25px
              color: #fff
              background-color: #1281FC
              margin-right: 10px
              font-size: 14px
              cursor: pointer
      .contack-message-history
        display: flex
        flex-direction: column
        flex: 0 0 460px
        transition: all .5s ease
        border-left: 1px solid #E0E0E0
        .contack-message-history-header
          height: 50px
          border-bottom: 1px solid #E0E0E0
          display: flex
          align-items: center
          padding-left: 20px
          >span
            font-size: 14px
            color: #444
            >i
              margin-left: 30px
              cursor: pointer
        .contack-message-history-content
          flex: 1
          overflow-y: scroll
          overflow-x: hidden
          &::-webkit-scrollbar
            width: 0px
            height: 0px
          &::-webkit-scrollbar-thumb
            border-radius: 0px
            -webkit-box-shadow: 0
            background: #1281FC
          &::-webkit-scrollbar-track
            // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
            border-radius: 0
            background: transparent
          .history-scroll-box
            height: 100%
            display: flex
            flex-direction: column
            .history-item
              margin: 10px 0
              padding: 10px 20px
              cursor: pointer
              &:hover
                background-color: #F4F4F4
              &.left
                .history-item-user-info
                  .history-item-user-info-username,
                  .history-item-user-time
                    color: #1281FC
              &.right
                .history-item-user-info
                  .history-item-user-info-username,
                  .history-item-user-time
                    color: #44AD1A
              .history-item-user-info
                display: flex
                .history-item-user-info-username
                  font-size: 16px
                .history-item-user-time
                  font-size: 14px
                  margin-left: 20px
              .history-item-body
                max-width: 100%
                overflow: hidden
                padding: 10px
                word-break: break-word
                .history-item-body-content
                  color: #444
                  font-size: #333
                  text-indent: 2em
        .contack-message-history-pageconfig
          height: 50px
          display: flex
          justify-content: center
          align-items: center
          font-size: 14px
          .pageconfig-tools-bar
            display: flex
            justify-content: center
            align-items: center
            font-size: 14px
            .page-tools-bar-item
              margin: 0 10px
              cursor: pointer
              padding: 5px
              &:hover
                background-color: #F4F4F4

</style>
<style lang="sass" scoped>
.message-card-item-house-info,
.history-item
  // .sendMsgClass
  //   max-width: 600px
  //   display: inline-block
  //   /deep/ img,audio,video
  //     max-width: 100%
  .message-content-style,
  .history-item-body
    .card-list-item
      width: 16.25em
      height: 19.375em
      background-color: #fff
      border-radius: 5px
      overflow: hidden
      border: 1px solid #E9E9E9
      .header-img
        height: 12.1875em
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        img
          // min-width: 100%
      .footer-intro
        height: 7.1875em
        padding: 0.375em
        display: flex
        flex-direction: column
        h4
          font-size: 1.25em
          font-weight: bold
          color: #444
          height: 1.5em
          line-height: 1.5em
          .mini
            font-size: .875em
        .intro
          display: flex
          justify-content: flex-start
          align-items: center
          height: 1.5em
          font-size: 1em
          width: 100%
          color: #666
          margin-bottom: .5em
          position: relative
          &:before
            position: absolute
            content: ''
            width: calc( 100% + 0.375em * 2 )
            height: 1px
            background: #E9E9E9
            bottom: -0.25em
            left: -0.375em
          .padding-5
            padding: 0 5px
          .icons-items
            display: flex
            // flex: 0 0 calc( 100% / 3 )
            justify-content: flex-start
            align-items: center
            img
              margin-right: 5px
              width: 1em
              height: 1em
        .art-itro
          article
            font-size: 14px
            color: #999
</style>
<style lang="sass" scoped>
/* 推荐房源消息的样式集合 */
.showHouseInfoClassOffsetHeight
  margin-bottom: 50px !important
  padding: 0 !important
  background-color: transparent
  border: none
  .card-list-item
    width: 16.25em
    height: 19.375em
    background-color: #fff
    border-radius: 5px
    overflow: hidden
    border: 1px solid #E9E9E9
    transition: all .3s ease
    &:hover
      box-shadow: 1px 1px 10px -2px #666
      transition: all .3s ease
    .header-img
      height: 12.1875em
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      overflow: hidden
      img
        // min-width: 100%
    .footer-intro
      height: 7.1875em
      padding: 0.375em
      display: flex
      flex-direction: column
      h4
        font-size: 1.25em
        font-weight: bold
        color: #444
        height: 1.5em
        .mini
          font-size: .875em
      .intro
        display: flex
        justify-content: flex-start
        align-items: center
        height: 1.5em
        font-size: 1em
        width: 100%
        color: #666
        margin-bottom: .5em
        position: relative
        &:before
          position: absolute
          content: ''
          width: calc( 100% + 0.375em * 2 )
          height: 1px
          background: #E9E9E9
          bottom: -0.25em
          left: -0.375em
        .padding-5
          padding: 0 5px
        .icons-items
          display: flex
          // flex: 0 0 calc( 100% / 3 )
          justify-content: flex-start
          align-items: center
          img
            margin-right: 5px
            width: 1em
            height: 1em
      .art-itro
        article
          font-size: 14px
          color: #999
</style>
<style lang="sass">
  // Emoji
  .Emoji
    width: 280px
    border: none !important
    padding: 0
    border-color: none !important
    .popper__arrow
      display: none !important
    .emojiType
      .tab-customer-emoji
        .el-tabs__content
          padding: 10px
        .el-tabs__nav
          display: flex
          .el-tabs__item
            display: flex
            align-items: center
          .label-sty
            display: flex
            align-items: center
            font-size: 24px
            img
              width: 32px
              height: 32px
        .tab-emoji
          max-height: 200px
          overflow-y: scroll
          height: 200px
          &::-webkit-scrollbar
            width: 0px
            height: 0px
          &::-webkit-scrollbar-thumb
            border-radius: 0px
            -webkit-box-shadow: 0
            background: #1281FC
          &::-webkit-scrollbar-track
            // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
            border-radius: 0
            background: transparent
          .emoji-box
            display: flex
            flex-wrap: wrap
            .emoji-item
              cursor: pointer
              height: 32px
              width: 32px
              display: flex
              align-items: center
              justify-content: center
              &:hover
                background-color: gainsboro
              span
                font-size: 24px
</style>
<style lang="sass">
.showHouseInfoClassOffsetHeight
  padding: 0
  border: none
.customer-dom-box
  padding: 12px
  overflow-y: scroll
  max-height: 500px
  &::-webkit-scrollbar
    width: 4px
    height: 0px
  &::-webkit-scrollbar-thumb
    border-radius: 0px
    -webkit-box-shadow: 0
    background: #1281FC
  &::-webkit-scrollbar-track
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
    border-radius: 0
    background: transparent
  .service-box
    display: flex
    flex-direction: column
    .customer-service-item
      height: 45px
      width: 100%
      background-color: #fff
      border-radius: 5px
      overflow: hidden
      display: flex
      align-items: center
      margin: 5px 0
      cursor: pointer
      border: 1px solid #1281FC
      // justify-content: center
      &.Offline
        border: 1px solid #B1B1B1
        filter: grayscale(100%)
        >i
          color: #B1B1B1
        >span
          color: #B1B1B1
          font-size: 14px
      &.Online:hover
        background-color: #E0EFFF
      >i
        font-size: 24px
        color: #1281FC
        margin: 0 8px
      >span
        color: #1281FC
        font-size: 14px
</style>
