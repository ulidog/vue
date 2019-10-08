import { Notification } from 'element-ui'
// let SessionStorageUserInfoMessageList = window.sessionStorage.getItem('EBUYHOUSE-userInfoMessageList') ? JSON.parse(window.sessionStorage.getItem('EBUYHOUSE-userInfoMessageList')) : []
export default {
  state: {
    userInfo: {},
    userInfoMessageList: [],
    userGuidInfo: {},
    // 设置默认 选择的类型
    currentType: {
      id: 0,
      icon: 'iconfont icon-message_contact',
      type: 0,
      filter: 'filterMessageUserList',
      current: 'currentMessageInfo'
    },
    // 当前聊天对象
    currentMessageInfo: {},
    // 当前客服对象
    currentServiceInfo: {},
    // 查看当前用户详情
    currentUserInfo: {},
    // 当前聊天对象的消息集合
    messageList: [],
    // 当前客服聊天对象消息集合
    messageServiceList: [],
    // 当前聊天列表
    userMessageList: [],
    // 当前好友列表
    userFriendList: [],
    // 当前客服列表
    userServiceList: [],
    // 当前添加好友未同意列表
    userUnprocessedList: [],
    // 当前添加好友已同意或者已拒绝列表
    userProcessedList: []
  },
  getters: {
    userInfo: state => state.userInfo,
    userInfoMessageList: state => state.userInfoMessageList,
    userGuidInfo: state => state.userGuidInfo,
    currentType: state => state.currentType,
    currentMessageInfo: state => state.currentMessageInfo,
    currentServiceInfo: state => state.currentServiceInfo,
    currentUserInfo: state => state.currentUserInfo,
    messageList: state => state.messageList,
    messageServiceList: state => state.messageServiceList,
    userMessageList: state => state.userMessageList,
    userFriendList: state => state.userFriendList,
    userServiceList: state => state.userServiceList,
    userUnprocessedList: state => state.userUnprocessedList,
    userProcessedList: state => state.userProcessedList
  },
  mutations: {
    UPDATE_MESSAGE_USER_INFO: (state, status) => {
      if (status) {
        state.userInfo = status
        // SessionStorageUserInfoMessageList = window.sessionStorage.getItem(`${(state.userInfo.fromName.toUpperCase() + '-' + state.userInfo.toName.toUpperCase()) || 'EBUYHOUSE'}-userInfoMessageList`) ? JSON.parse(window.sessionStorage.getItem(`${(state.userInfo.fromName.toUpperCase() + '-' + state.userInfo.toName.toUpperCase()) || 'EBUYHOUSE'}-userInfoMessageList`)) : []
        // state.userInfoMessageList = SessionStorageUserInfoMessageList
      } else {
        state.userInfoMessageList = []
      }
    },
    UPDATE_USER_INFO_MESSAGE_LIST: (state, status) => {
      // 是否是接受的 发送的数据
      if (status.isMe) {
        // 更新
        state.userInfoMessageList.push(status)
        // 存储
        window.sessionStorage.setItem(`${state.userInfo.fromName.toUpperCase()}-${state.userInfo.toName.toUpperCase()}-userInfoMessageList`, JSON.stringify(state.userInfoMessageList))
      } else {
        if (state.userInfo.fromName.toUpperCase() === status.from.toUpperCase()) {
          // 更新
          state.userInfoMessageList.push(status)
          // 存储
          window.sessionStorage.setItem(`${state.userInfo.fromName.toUpperCase()}-${state.userInfo.toName.toUpperCase()}-userInfoMessageList`, JSON.stringify(state.userInfoMessageList))
        } else {
          let otherMessageList = window.sessionStorage.getItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-userInfoMessageList`) ? JSON.parse(window.sessionStorage.getItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-userInfoMessageList`)) : []
          // 更新
          otherMessageList.push(status)
          // 存储 其他
          window.sessionStorage.setItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-userInfoMessageList`, JSON.stringify(otherMessageList))
        }
      }
    },
    UPDATE_USER_GUID_INFO: (state, info) => {
      state.userGuidInfo = info
    },
    // 更新当前用户聊天消息列表-存储
    UPDATE_CURRENT_USER_MESSAGE_LIST (state, status) {
      // console.log(status)
      // console.log(this.getters.GlobalUserInfo.hxusername)
      if (Array.isArray(status)) {
        if (state.currentMessageInfo && this.getters.GlobalUserInfo.hxusername === state.currentMessageInfo.from) {
          state.messageList = status
          window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.id}-${state.currentMessageInfo.from.toUpperCase()}-${state.currentMessageInfo.to.toUpperCase()}-messageList`, JSON.stringify(state.messageList))
        } else {
          if (status.length !== 0) {
            window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.id}-${status[0].from.toUpperCase()}-${status[0].to.toUpperCase()}-messageList`, JSON.stringify(status))
          }
        }
      } else {
      // 第一次区分当前用户聊天还是其他人聊天消息
        console.log(status, state.currentMessageInfo)
        if (state.currentMessageInfo && (status.from === state.currentMessageInfo.from || status.to === state.currentMessageInfo.from)) {
          // if () {}
          // 再区分我方发送还是接收消息
          // 我方发送的消息体
          if (state.currentMessageInfo.to === status.from) {
            console.log('存储当前聊天对象-我方发送的消息')
            state.messageList.push(Object.assign({}, status, {time: new Date().getTime()}))
            window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.id}-${status.to.toUpperCase()}-${status.from.toUpperCase()}-messageList`, JSON.stringify(state.messageList))
          } else {
            // 对方发送过来的消息
            console.log('存储当前聊天对象-对方发送（我方接收）的消息')
            state.messageList.push(Object.assign({}, status, {time: new Date().getTime()}))
            window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.id}-${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageList`, JSON.stringify(state.messageList))
          }
        } else {
          console.log('存储和其他人聊天对象-对方发送（我方接收）的消息')
          let otherMessageList = window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.id}-${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageList`) ? JSON.parse(window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.id}-${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageList`)) : []
          // 获取当前聊天列表中是否存在当前消息用户
          const isOnceList = state.userMessageList.some(item => {
            return item.from === status.from
          })
          // 如果不存在则插入消息列表
          if (!isOnceList) {
            // 设置未读徽记
            this.commit('UPDATE_USER_MESSAGE_LIST', Object.assign({}, status, {signet: true}))
          } else {
            // 设置未读徽记
            const newMessageList = state.userMessageList.map(item => {
              if (item.from === status.from) {
                item['signet'] = true
              }
              return item
            })
            // state.userMessageList = newMessageList
            this.commit('UPDATE_USER_MESSAGE_LIST', newMessageList)
          }
          // 插入聊天列表
          otherMessageList.push(Object.assign({}, status, {time: new Date().getTime()}))
          window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.id}-${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageList`, JSON.stringify(otherMessageList))
        }
      }
    },
    // 更新当前聊天对象-切换 从对方开始-我方结束
    UPDATE_CURRENT_MESSAGE_INFO (state, info) {
      if (info && info.from) {
        // 取消聊天未读徽记
        state.currentMessageInfo = Object.assign({}, info, {signet: false})
        // console.log('清除徽记 =>>>')
        // console.log(state.currentMessageInfo)
        const newMessageList = state.userMessageList.map(item => {
          if (item.from === info.from) {
            item['signet'] = false
          }
          return item
        })
        // state.userMessageList = newMessageList
        this.commit('UPDATE_USER_MESSAGE_LIST', newMessageList)

        state.messageList = window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.id}-${info.from.toUpperCase()}-${info.to.toUpperCase()}-messageList`) ? JSON.parse(window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.id}-${info.from.toUpperCase()}-${info.to.toUpperCase()}-messageList`)) : []
      } else {
        state.currentMessageInfo = {}
        state.messageList = []
      }
    },
    // 更新当前客服聊天消息列表-存储
    UPDATE_CURRENT_USER_SERVICE_LIST (state, status) {
      // console.log(status)
      // console.log(this.getters.GlobalUserInfo.hxusername)
      if (Array.isArray(status)) {
        if (state.currentServiceInfo && this.getters.GlobalUserInfo.hxusername === state.currentServiceInfo.from) {
          state.messageServiceList = status
          window.sessionStorage.setItem(`${state.currentServiceInfo.from.toUpperCase()}-${state.currentServiceInfo.to.toUpperCase()}-messageServiceList`, JSON.stringify(state.messageServiceList))
        } else {
          if (status.length !== 0) {
            window.sessionStorage.setItem(`${status[0].from.toUpperCase()}-${status[0].to.toUpperCase()}-messageServiceList`, JSON.stringify(status))
          }
        }
      } else {
      // 第一次区分当前用户聊天还是其他人聊天消息
        console.log(status, state.currentServiceInfo)
        if (state.currentServiceInfo && (status.from === state.currentServiceInfo.from || status.to === state.currentServiceInfo.from)) {
          // if () {}
          // 再区分我方发送还是接收消息
          // 我方发送的消息体
          if (state.currentServiceInfo.to === status.from) {
            console.log('客服-存储当前聊天对象-我方发送的消息')
            state.messageServiceList.push(Object.assign({}, status, {time: new Date().getTime()}))
            window.sessionStorage.setItem(`${status.to.toUpperCase()}-${status.from.toUpperCase()}-messageServiceList`, JSON.stringify(state.messageServiceList))
          } else {
            // 对方发送过来的消息
            console.log('客服-存储当前聊天对象-对方发送（我方接收）的消息')
            state.messageServiceList.push(Object.assign({}, status, {time: new Date().getTime()}))
            window.sessionStorage.setItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageServiceList`, JSON.stringify(state.messageServiceList))
          }
        } else {
          console.log('客服-存储和其他人聊天对象-对方发送（我方接收）的消息')
          let otherMessageList = window.sessionStorage.getItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageServiceList`) ? JSON.parse(window.sessionStorage.getItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageServiceList`)) : []
          // 获取当前聊天列表中是否存在当前消息用户
          // const isOnceList = state.userMessageList.some(item => {
          //   return item.from === status.from
          // })
          // 如果不存在则插入消息列表
          // if (!isOnceList) {
          //   this.commit('UPDATE_USER_MESSAGE_LIST', status)
          // }
          // 设置未读徽记
          const newMessageList = state.messageServiceList.map(item => {
            if (item.from === status.from) {
              item['signet'] = true
            }
            return item
          })
          this.commit('UPDATE_USER_SERVICE_LIST', newMessageList)
          // 插入聊天列表
          otherMessageList.push(Object.assign({}, status, {time: new Date().getTime()}))
          window.sessionStorage.setItem(`${status.from.toUpperCase()}-${status.to.toUpperCase()}-messageServiceList`, JSON.stringify(otherMessageList))
        }
      }
    },
    // 更新当前客服对象-切换 从对方开始-我方结束
    UPDATE_CURRENT_SERVICE_INFO (state, info) {
      console.log(info)
      if (info && info.from) {
        // 取消聊天未读徽记
        state.currentServiceInfo = Object.assign({}, info, {signet: false})
        const newMessageList = state.messageServiceList.map(item => {
          if (item.from === info.from) {
            item['signet'] = false
          }
          return item
        })
        // state.messageServiceList = newMessageList
        this.commit('UPDATE_SERVICE_MESSAGE_LIST', newMessageList)
        state.messageServiceList = window.sessionStorage.getItem(`${info.from.toUpperCase()}-${info.to.toUpperCase()}-messageServiceList`) ? JSON.parse(window.sessionStorage.getItem(`${info.from.toUpperCase()}-${info.to.toUpperCase()}-messageServiceList`)) : []
      } else {
        state.currentServiceInfo = {}
        state.messageServiceList = []
      }
    },
    // 更新当前用户详情对象
    UPDATE_CURRENT_USER_INFO: (state, info) => {
      state.currentUserInfo = info
    },
    // 更新当前选择的类型
    UPDATE_CURRENT_TYPE (state, info) {
      state.currentType = info
      // console.log(this)
      // if () {}
      switch (info.id) {
        case 0:
          this.commit('UPDATE_CURRENT_MESSAGE_INFO', state.currentMessageInfo)
          state.userMessageList = window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-messageList`) ? JSON.parse(window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-messageList`)) : []
          break
        case 1:
          this.commit('UPDATE_CURRENT_SERVICE_INFO', state.currentServiceInfo)
          break
        case 2:
          state.userProcessedList = window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-userProcessedList`) ? JSON.parse(window.sessionStorage.getItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-userProcessedList`)) : []
          break
      }
    },
    // 更新未处理好友列表
    UPDATE_USER_UN_PROCESSED_LIST: (state, info) => {
      if (Array.isArray(info)) {
        state.userUnprocessedList = info
      } else {
        state.userUnprocessedList.push(info)
      }
    },
    // 更新已处理好友列表
    UPDATE_USER_PROCESSED_LIST: (state, info) => {
      if (Array.isArray(info)) {
        state.userProcessedList = info
      } else {
        state.userUnprocessedList = state.userUnprocessedList.filter(item => {
          return info.from !== item.from
        })
        state.userProcessedList.push(info)
      }
      window.sessionStorage.setItem(`${info.to.toUpperCase()}-userProcessedList`, JSON.stringify(state.userProcessedList))
    },
    // 更新聊天消息列表
    UPDATE_USER_MESSAGE_LIST (state, info) {
      if (Array.isArray(info)) {
        state.userMessageList = info
      } else {
        state.userMessageList.push(info)
      }
      window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-messageList`, JSON.stringify(state.userMessageList))
    },
    // 更新客服聊天消息列表
    UPDATE_SERVICE_MESSAGE_LIST (state, info) {
      if (Array.isArray(info)) {
        state.messageServiceList = info
      } else {
        state.messageServiceList.push(info)
      }
      window.sessionStorage.setItem(`${this.getters.GlobalUserInfo.hxusername.toUpperCase()}-messageList`, JSON.stringify(state.messageServiceList))
    },
    // 更新用户列表
    UPDATE_USER_FRIEND_LIST: (state, info) => {
      if (Array.isArray(info)) {
        state.userFriendList = info
      } else {
        state.userFriendList.push(info)
      }
      console.log('更新好友列表成功')
      console.log(state.userFriendList)
    },
    // 更新客服列表
    UPDATE_USER_SERVICE_LIST: (state, info) => {
      state.userServiceList = info
    }
  },
  actions: {
    // 异步更新消息列表
    AsyncUpdateUserMessageList ({state, commit}, info) {
      commit('UPDATE_USER_MESSAGE_LIST', info)
    },
    // 异步更新好友列表
    AsyncUpdateUserFriendList ({state, commit}, info) {
      commit('UPDATE_USER_FRIEND_LIST', info)
    },
    // 异步更新聊天数据 在此区分好友与客服
    AsyncUpdateCurrentUserMessageList ({state, commit}, info) {
      // 遍历查找客服列表中是否存在当前客服 如存在则走客服数据存储 如不存在则走好友数据处理
      const isService = state.userServiceList.some(item => {
        return item.from === info.from
      })
      if (isService) {
        commit('UPDATE_CURRENT_USER_SERVICE_LIST', info)
      } else {
        commit('UPDATE_CURRENT_USER_MESSAGE_LIST', info)
      }
      this.dispatch('AsyncNotifyMessage', info)
    },
    // 异步弹窗提示用户
    AsyncNotifyMessage ({state, commit}, info) {
      // console.log(state)
      if (!this.getters.windowMessageStatus) {
        Notification({
          title: 'You have a new chat message, please pay attention to view',
          dangerouslyUseHTMLString: true,
          message: unescape(info.data.replace(/\\/g, '%')).replace(/%/g, '\\').replace(/\\/g, ''),
          duration: 4500,
          offset: 60,
          onClick: function () {
            commit('openMessage', true)
            // 即时通讯
            // router.push({
            //   name: 'message-offer-buy'
            // })
          }
        })
      }
    },
    // 异步管理好友添加
    AsyncUpateUserUnProcessedList ({state, commit}, info) {
      commit('UPDATE_USER_UN_PROCESSED_LIST', info)
      // console.log(info)
      // from
      // this.$axios.get(`${this.XT_PROD_PATH}customer/select/hx/user/head`, {params: {hxId: _hxids}})
      //   .then(res => {
      //     this.userInfoList = res.data.data
      //     console.log(this.userInfoList)
      //   })
      this._vm.$axios.get(`${this._vm.XT_PROD_PATH}customer/select/hx/user/head`, {params: {hxId: info.from}})
        .then(res => {
          if (res.data.success) {
            Notification({
              title: `${res.data.data[0].nickname} application to add you as a friend`,
              dangerouslyUseHTMLString: true,
              // message: info.status,
              duration: 4500,
              offset: 60,
              onClick: function () {
                commit('openMessage', true)
                // 即时通讯
                // router.push({
                //   name: 'message-offer-buy'
                // })
              }
            })
          }
        })
    }
  }
}
