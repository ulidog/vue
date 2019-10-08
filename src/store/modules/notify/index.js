/**
 * @description 消息全局处理
 * @time [2019-4-23]
 * @param {Object} guidePublic
*/
import { Notification } from 'element-ui'
import router from '@/router'
export default {
  state: {
    notifyMessageArray: [],
    notifySocket: null,
    notifyMenuObject: {},
    notifyMessageObject: {},
    notifyContractObject: {}
  },
  getters: {
    notifyMessageArray: state => state.notifyMessageArray,
    notifyMenuObject: state => state.notifyMenuObject,
    notifyMessageObject: state => state.notifyMessageObject,
    notifyContractObject: state => state.notifyContractObject,
    notifySocket: state => state.notifySocket
  },
  mutations: {
    UPDATA_NOTIFY_MENU_OBJECT (state, _info) {
      state.notifyMenuObject = _info
    },
    UPDATA_NOTIFY_MESSAGE_OBJECT (state, _info) {
      state.notifyMessageObject = _info
    },
    UPDATA_NOTIFY_CONTRACT_OBJECT (state, _info) {
      state.notifyContractObject = _info
    },
    UPDATA_NOTIFY_SOCKET (state, _info) {
      state.notifySocket = _info
    },
    UPDATA_NOTIFY_MESSAGE_ARRAY (state, _info) {
      if (_info.isAppend) {
        state.notifyMessageArray.push(_info)
      } else {
        state.notifyMessageArray = _info
      }
    }
  },
  actions: {
    // 异步处理数据
    NOTIFY_ONMESSAGE_CHANGE ({ commit, state }, _info) {
      if (Object.keys(_info).includes('type')) {
        switch (_info.type) {
          case 1:
            this.dispatch('SHOW_NOTIFY_CHANGE', _info)
            break
          case 2:
            let notifyAllMeassage = 0
            let notifyAllContract = _info.unReadAgreements
            Object.keys(_info).map(item => {
              if (item !== 'type') {
                notifyAllMeassage += _info[item]
              }
            })
            commit('UPDATA_NOTIFY_MESSAGE_OBJECT', Object.assign({}, state.notifyMessageObject, _info))
            commit('UPDATA_NOTIFY_MENU_OBJECT', Object.assign({}, state.notifyMenuObject, {notifyAllMeassage: notifyAllMeassage, notifyAllContract: notifyAllContract}))
            break
          case 3:
            commit('UPDATA_NOTIFY_CONTRACT_OBJECT', _info)
            break
          case 4:
            // let notifyAllMessage = state.notifyMenuObject.notifyAllMeassage + _info.hxCount
            // alert(state.notifyMessageObject.notifyAllMeassage || 0, _info.hxCount)
            commit('UPDATA_NOTIFY_MESSAGE_OBJECT', Object.assign({}, state.notifyMessageObject, {unReadMessages: _info.hxCount}))
            commit('UPDATA_NOTIFY_MENU_OBJECT', Object.assign({}, state.notifyMenuObject, {notifyAllMeassage: state.notifyMenuObject.notifyAllMeassage + _info.hxCount, notifyAllContract: state.notifyMenuObject.notifyAllContract}))
            // Number(notifyAllMeassage || 0) + Number(state.notifyMessageObject.unReadMessages || 0)
            break
          default:
            break
        }
      }
    },
    // 消息推送提示 暂时3类系统消息
    SHOW_NOTIFY_CHANGE ({commit, state}, _info = {}) {
      // 获取消息总数
      // 获取推送消息
      // 获取聊天消息总数
      this._vm.$WebSocket.websocketsend({signal: 1, type: 2})
      this._vm.$WebSocket.websocketsend({signal: 1, type: 3})
      // this._vm.$WebSocket.websocketsend({signal: 1, type: 4})
      const _this = this._vm
      // 储存消息体
      if (_this.$ebuyhouseDB.db) {
        // console.log(this.getters.GlobalUserInfo)
        _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'notify', 'notifyMessageArray' + this.getters.GlobalUserInfo.id, (e) => {
          // console.log(e)
          if (!e) {
            _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'notify', {id: 'notifyMessageArray' + this.getters.GlobalUserInfo.id, data: [_info]})
            commit('UPDATA_NOTIFY_MESSAGE_ARRAY', [_info])
          } else {
            _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'notify', {id: 'notifyMessageArray' + this.getters.GlobalUserInfo.id, data: [...e.data, _info]})
            commit('UPDATA_NOTIFY_MESSAGE_ARRAY', [...(e.data || [])])
          }
        })
      }
      // 弹窗右侧
      switch (_info.msgType) {
        // 系统消息列表
        case 1:
          Notification({
            title: _info.notify.title,
            dangerouslyUseHTMLString: true,
            message: _info.notify.content,
            duration: 4500,
            offset: 60,
            onClick: function () {
              // 系统消息列表
              router.push({
                name: 'notification-list'
              })
            }
          })
          break
        // offer列表
        case 2:
          Notification({
            title: _info.agreement.title,
            message: _info.agreement.content,
            duration: 4500,
            offset: 60,
            onClick: function () {
              // offer列表
              router.push({
                name: 'message-offer-sale'
              })
            }
          })
          break
        // 购买列表
        case 3:
          Notification({
            title: _info.recomment.houseAddress,
            message: `$${_info.recomment.price}`,
            duration: 4500,
            offset: 60,
            onClick: function () {
              // 购买列表
              router.push({
                name: 'message-offer-buy'
              })
            }
          })
          break
        // 即时通讯
        case 4:
          // return false
          try {
            const houseInfo = JSON.parse(_info.msg)
            Notification({
              title: _info.formName,
              dangerouslyUseHTMLString: true,
              message: `<span>street: ${houseInfo.street}</span><br><img style="max-width: 200px; max-height: 200px;" src="${houseInfo.imgUrl}"/><span>price: $ ${houseInfo.price}</span>`,
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
          } catch (error) {
            Notification({
              title: _info.formName,
              dangerouslyUseHTMLString: true,
              message: unescape(_info.msg.replace(/\\/g, '%')).replace(/%/g, '\\').replace(/\\/g, ''),
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
          break
        default:
          break
      }
    }
  },
  modules: {}
}
