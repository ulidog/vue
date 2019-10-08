<template>
  <div class="message-container" v-el-drag-dialog>
    <div id="main" class="el-dialogs">
      <div class="left">
        <div class="Customer-service" @click="lineServiceChange">
          <img src="/static/img/message/Customer service.png" alt>
          <span>Customer Support</span>
        </div>
        <ul class="user-list">
          <li :class="CurrentUser.fromName === item.fromName ? 'active' : ''" v-for="(item, index) in OnlineUserList" :key="index" v-if="OnlineUserList.length !== 0" @click="currentUserChange(item)">
            <img v-lazy="item.fromHead">
            <span>
              <el-badge :value="item.badge || item.messageNum" :hidden="item.badge === 0 && item.messageNum === 0" class="item" type="primary" style="display: inline;">
                {{item.fromNickName}}
              </el-badge>
            </span>
          </li>
          <li v-else>
            <span>no data</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="top el-dialog__header">
          <div class="user-name">
            <span>{{CurrentUser.fromNickName}}</span>
          </div>
          <div class="right-icon">
            <!-- <i class="full-screen">
              <img src="/static/img/message/05.png" alt>
            </i>
            <i class="minimize">
              <img src="/static/img/message/12.png" alt>
            </i> -->
            <i class="close">
              <img src="/static/img/message/03.png" @click="closeMessage" alt>
            </i>
          </div>
        </div>
        <div class="center" ref="messageBox">
          <div class="power" v-if="TipConfig.isShow">
            <img src="/static/img/message/04.png" alt class="power-left">
            <span class="text">{{TipConfig.content}}</span>
            <img src="/static/img/message/03.png" alt class="close" @click="TipConfig.isShow = !TipConfig.isShow">
          </div>
          <ul :class="[!message.isMe ? 'center-left' : 'center-right']" v-for="(message, index) in messages" :key="index">
            <li>
              <img v-lazy="CurrentUser.fromHead" alt v-if="!message.isMe" class="left-head-portrait">
              <div :class="[!message.isMe ? 'left-text' : 'right-text', 'messageCardItemHouseInfo']">
                <span class="sendMsgClass" v-html="message.data"></span>
                <div v-if="$options.filters.isShowCardItem(message)" class="cardListItem" @click="openHouseInfo(message.ext)">
                  <header class="header-img">
                    <img v-lazy="message.ext.imgUrl">
                  </header>
                  <footer class="footer-intro">
                    <h4><span class="mini">$ </span>{{ message.ext.price }}</h4>
                    <section class="intro">
                      <section class="icons-items">
                        <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                        <span>{{ message.ext.bathroom }} bds</span>
                      </section>
                      <section class="icons-items">
                        <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                        <span class="padding-5">●</span>
                        <span>{{ message.ext.bedroom }} ba</span>
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
                </div>
                <div :class="[!message.isMe ? 'arrow-left' : 'arrow-right']"></div>
              </div>
              <img v-lazy="MyHeaderImg" alt v-if="message.isMe" class="right-head-portrait">
            </li>
          </ul>
        </div>
        <div class="bottom">
          <ul class="bottom-list">
            <li>
              <el-tooltip placement="top-start" effect="light" popper-class="Emoji">
                <template slot="content">
                  <ul class="emoji-box">
                    <li class="emoji-item" v-for="item in EmojiList" :key="item.id" @click="addEmoji(item)">
                      <img v-lazy="item.img" data-emoji-id="item.emoji">
                    </li>
                  </ul>
                </template>
                <img src="/static/img/message/02.png" alt>
              </el-tooltip>
            </li>
            <!-- <li>
              <img src="/static/img/message/01.png" alt>
            </li>
            <li>
              <img src="/static/img/message/09.png" alt>
            </li> -->
          </ul>
          <el-popover
            popper-class="showHouseInfoClassOffsetHeight"
            ref="houseInfo"
            v-model="isShowHouseInfoBox"
            placement="top-start"
            :visible-arrow="false"
            offset="50"
            :disabled="isShowHouseInfo || !CurrentUser.fromName"
            trigger="click">
            <div class="cardListItem" @click="sendHouseMessage(houseInfoInformation)">
              <header class="header-img">
                <img v-lazy="houseInfoInformation.imgUrl">
              </header>
              <footer class="footer-intro">
                <h4><span class="mini">$ </span>{{ houseInfoInformation.price|priceFormat }}</h4>
                <section class="intro">
                  <section class="icons-items">
                    <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                    <span>{{ houseInfoInformation.bathroom }} bds</span>
                  </section>
                  <section class="icons-items">
                    <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                    <span class="padding-5">●</span>
                    <span>{{ houseInfoInformation.bedroom }} ba</span>
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
            </div>
          </el-popover>
          <cite
            ref="execInput"
            :disabled="!CurrentUser.fromName"
            v-popover:houseInfo
            placeholder="place input content"
            @input="input"
            contenteditable>
          </cite>
          <div class="message-handling">
            <div class="close" @click="closeMessage">Close</div>
            <div class="send" @click="sendMessage">Send</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'message',
  data () {
    return {
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
      EmojiList: []
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
    }
  },
  watch: {
    // 是否登录 登录后做连接上线处理
    signInState: {
      handler (_new) {
        console.log(false)
        console.log(`%c ${_new}`, 'background-color: red; color: #fff')
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
        this.messages = _new
      },
      deep: true,
      immediate: true
    },
    // 监听当前router是否在当前房源
    '$route': function (to, from) {
      if (to.name === 'listing-details') {
        if (to.query.ebuyhouse) {
          this.isShowHouseInfo = false
          const houseInfos = JSON.parse(this.$base64.decode(to.query.ebuyhouse))
          this.fetchHouseInfo(houseInfos.houseId)
        } else {
          this.isShowHouseInfo = true
        }
      } else {
        this.isShowHouseInfo = true
      }
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
        // console.log('%c开始获取用户列表数据', 'color: red')
        _this.fetchFriendsList()
        _this.initEmoji(WebIM)
        // console.log('%c获取列表数据结束', 'color: red')
      },
      onClosed: function () {},
      onTextMessage: function (message) {
        _this.updateUserInfoMessageList(message)
        _this.scrollBottom()
        _this.addBadgeChange(message)
      },
      // onEmojiMessage: function ( message ) {console.log("当前关闭");},   //收到表情消息
      // onPictureMessage: function ( message ) {console.log("当前关闭");}, //收到图片消息
      // 收到命令消息
      onCmdMessage: function (message) {
        _this.updateUserInfoMessageList(message)
        _this.scrollBottom()
        _this.addBadgeChange(message)
      }
      // onAudioMessage: function ( message ) {console.log("当前关闭");},   //收到音频消息
      // onLocationMessage: function ( message ) {console.log("当前关闭");},//收到位置消息
      // onFileMessage: function ( message ) {console.log("当前关闭");},    //收到文件消息
      // onVideoMessage: function ( message ) {console.log("当前关闭");},   //收到视频消息
      // onPresence: function ( message ) {console.log("当前关闭");},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
      // onRoster: function ( message ) {console.log("当前关闭");},         //处理好友申请
      // onInviteMessage: function ( message ) {console.log("当前关闭");},  //处理群组邀请
      // onOnline: function () {console.log("当前关闭");},                  //本机网络连接成功
      // onOffline: function () {console.log("当前关闭");},                 //本机网络掉线
      // onError: function (err) {console.log("错误");}
    })
    // 获取当前页面信息
    const route = this.$route
    if (route.name === 'listing-details') {
      if (route.query.ebuyhouse) {
        this.isShowHouseInfo = false
        const houseInfos = JSON.parse(this.$base64.decode(route.query.ebuyhouse))
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
    paste (e) {
      e.preventDefault()
      const html = e.clipboardData.getData('text/html')
      document.execCommand('insertHTML', false, html)
      this.input()
    },
    clearMsg () {
      this.$refs['execInput'].innerHTML = null
    },
    initEmoji (_WebIM) {
      console.log(_WebIM.Emoji)
      const baseUrl = _WebIM.Emoji.path
      Object.keys(_WebIM.Emoji.map).map((item, index) => {
        this.EmojiList.push({
          id: index,
          img: baseUrl + _WebIM.Emoji.map[item],
          emoji: item
        })
      })
    },
    closeMessage (e) {
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }
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
      this.$axios.get(`${this.XT_PROD_PATH + Url}`, {params: {jId: this.token ? null : this.guid}})
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
              } else {
                this.lineServiceChange()
              }
            }
          }
        })
    },
    // 获取历史信息
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
            res.data.data.rows.map(item => {
              item['from'] = item.fromName
              item['to'] = item.toName
              if (item.type === 'text') {
                item['data'] = item.payload
              } else if (item.type === 'json') {
                item['ext'] = JSON.parse(item.payload)
              }
              return item
            }).map(item => {
              this.updateUserInfoMessageList(item)
              this.scrollBottom()
              this.reply(_info.fromUserId)
            })
          }
        })
    },
    // 已读
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
          this.fetchFriendsList(true)
        })
    },
    // 如果没有处于当前对话消息中 显示提醒红点
    addBadgeChange (_msg) {
      if (this.CurrentUser.fromName.toUpperCase() !== _msg.from.toUpperCase()) {
        this.OnlineUserList = this.OnlineUserList.map(item => {
          if (item.fromName.toUpperCase() === _msg.from.toUpperCase()) {
            item['badge']++
          }
          return item
        })
        console.log(this.OnlineUserList)
      }
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
        .then(res => {
          console.log('插入成功')
        })
    },
    // 发送文本消息
    sendMessage () {
      if (!this.msgBold) return
      var _this = this
      var messageContext = this.msgBold
      var id = this.conn.getUniqueId() // 生成本地消息id
      var msg = new WebIM.message('txt', id) // 创建文本消息
      msg.set({
        msg: messageContext,
        to: _this.CurrentUser.fromName,
        type: 'chat',
        // 消息发送成功回调
        success: function (_id, serverMsgId) {
          const newMessage = {from: _this.userAccount.userName, to: _this.CurrentUser.fromName, data: messageContext, isMe: true}
          _this.updateUserInfoMessageList(newMessage)
          _this.scrollBottom()
          // 提交到后台
          _this.addMessageNode({
            hxMsgId: id,
            payload: messageContext,
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
      this.updateMessageUserInfo(_info)
      this.scrollBottom()
      this.fetchHistoryListList(_info)
      this.reply(_info.fromUserId)
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
      document.execCommand('insertimage', false, _emoji.img)
    },
    lineServiceChange () {
      this.$axios.get(`${this.ZJC_ADMIN_PROD_PATH}random/customer`)
        .then(res => {
          // console.log('插入成功')
          console.log(res)
          this.addUserMessageNode(res.data.data)
        })
    },
    // 建立陌生人关系 后台
    addUserMessageNode (_info) {
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
    }
  },
  mounted () {
    // 登录
    this.loginHX({})
    // this.$refs['execInput'].contentEditable = true
  }
}
</script>

<style lang="scss" scoped>
.message-container {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 0;
  top: 0;
  left: 0;
}
/*浏览器滚动条样式*/

/* width */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  border-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(201, 201, 202);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(162, 162, 163);
}

li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}
input {
  border: none;
  outline: none;
}
#main {
  width: 1040px;
  height: 700px;
  border: 1px solid #cccccc;
  margin: 2cm auto;
  display: flex;
  background-color: #fff;
  position: relative;
}
.user-list {
  overflow-y: scroll;
  flex: 1;
}
/* 左边用户列表样式 */
.left {
  width: 210px;
  height: 700px;
  background-color: #86aee9;
  display: flex;
  flex-direction: column;
}
.left .Customer-service {
  height: 60px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.left .Customer-service img {
  display: inline-block;
  vertical-align: middle;
  border: none;
}

.left .Customer-service span {
  color: #fff;
  font-size: 14px;
  vertical-align: middle;
}
.left .user-list li {
  box-sizing: border-box;
  height: 40px;
  // background-color: #96c4ff;
  width: 100%;
  padding-left: 27px;
  line-height: 40px;
}
.left .user-list li.active {
  background-color: #96c4ff;
}
.left .user-list li img {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.left .user-list li span {
  color: #fff;
  font-size: 14px;
  margin-left: 5px;
}
/* 右边聊天窗口样式 */
.right {
  flex: 1;
  height: 100%;
}
.right .top {
  height: 80px;
  background-color: #d8e2f7;
  display: flex;
  justify-content: center;
  position: relative;
}
.right .top .user-name span {
  text-align: center;
  line-height: 80px;
  font-size: 24px;
  color: #444444;
}
.right .top .right-icon {
  position: absolute;
  right: 25px;
  line-height: 80px;
  width: 85px;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.right .top .right-icon i img {
  cursor: pointer;
}
.right .center {
  height: 404px;
  background: rgba(252, 252, 252, 1);
  padding: 5px;
  overflow-y: scroll;
}
.right .center .power {
  width: 800px;
  height: 40px;
  margin: 11px auto;
  background-color: #f4f4f4;
  line-height: 40px;
  cursor: pointer;
  transition: all .5s ease;
  &:hover {
    box-shadow: 5px 10px 10px -6px #ddd;
    transition: all .5s ease;
  }
}
.right .center .power .power-left {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 18px;
  margin-right: 11px;
}
.right .center .power .text {
  color: #666666;
  font-size: 16px;
}
.right .center .power .close {
  margin-left: 180px;
  width: 10px;
  height: 10px;
  display: inline-block;
}
.center>.center-left,
.center>.center-right {
  overflow: hidden;
}
.center>.center-left>li {
  float: left;
  display: flex;
  margin: 15px 18px;
}
.center>.center-left>li>.left-head-portrait {
  margin-right: 22px;
}
.center>.center-left>li>.left-text,
.center>.center-right>li>.right-text {
  opacity: 1;
  border-radius: 10px;
  line-height: 22px;
  padding: 0 21px;
  word-break: break-word;
}
.center>.center-left>li>img {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.center>.center-left>li>.left-text {
  position: relative;
  background: #ccc;
  border-radius: 5px; /* 圆角 */
  color: #000;
  padding: 10px;
}
.center>.center-right>li>.right-text {
  position: relative;
  background: #0183fd;
  border-radius: 5px; /* 圆角 */
  color: #fff;
  padding: 10px;
}
li>.left-text>.arrow-left {
  position: absolute;
  top: 8px;
  left: -16px;
  width: 0;
  height: 0;
  font-size: 0;
  border: solid 8px;
  border-color: #fff #ccc #fff #fff;
}
li>.right-text>.arrow-right {
  position: absolute;
  top: 5px;
  right: -16px; /* 圆角的位置需要细心调试哦 */
  width: 0;
  height: 0;
  font-size: 0;
  border: solid 8px;
  border-color: #fff #fff #fff #0183fd;
}
.center>.center-right>li {
  float: right;
  display: flex;
  margin: 15px 18px;
}
.center>.center-right>li>img {
  display: inline-block;
  width: 31px;
  height: 31px;
}
.center>.center-right>li>.right-head-portrait {
  margin-left: 32px;
}
.right>.bottom {
  height: 215px;
  border-top: 1px solid #ccc;
  opacity: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.right>.bottom>.bottom-list {
  display: flex;
  margin-left: 14px;
  margin-top: 9px;
}
.right>.bottom>cite{
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
  max-width: 100%;
  /deep/ img,audio,video {
    max-width: 80%
  }
}
.right>.bottom>.bottom-list>li {
  margin-right: 18px;
}
.right>.bottom>.Enter-chat {
  margin-left: 19px;
  margin-top: 29px;
  font-size: 16px;
  color: #444;
}
.right>.bottom>.message-handling {
  // position: absolute;
  display: flex;
  // right: 18px;
  bottom: 18px;
  padding: 18px;
  justify-content: flex-end;
}
.message-handling .close,
.message-handling .send {
  text-align: center;
  line-height: 30px;
  width: 90px;
  height: 30px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all .3s ease;
}
.message-handling .close {
  &:hover {
    background-color: burlywood;
    color: chocolate;
  }
}
.message-handling .send {
  margin-left: 11px;
  &:hover {
    background-color: #d8e2f7;
  }
}
/deep/ .bottom .el-textarea__inner {
  border: none;
  resize: none;
  color: #757575;
}
</style>
<style lang="sass" scoped>
.messageCardItemHouseInfo
  .sendMsgClass
    max-width: 600px
    display: inline-block
    /deep/ img,audio,video
      max-width: 100%
  .cardListItem
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
  .cardListItem
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
    .emoji-box
      display: flex
      flex-wrap: wrap
      .emoji-item
        cursor: pointer
        &:hover
          background-color: gainsboro
</style>
