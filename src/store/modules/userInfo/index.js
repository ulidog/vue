let UP_GLOBALUSERINFO_TIMER = null
export default {
  state: {
    GlobalUserInfo: {},
    Guid: null
  },
  getters: {
    GlobalUserInfo: state => state.GlobalUserInfo,
    Guid: state => state.Guid
  },
  mutations: {
    UPDATA_GLOBAL_USER_INFO (state, info) {
      const _self = this
      const _this = this._vm
      state.GlobalUserInfo = info
      console.log('准备更新数据流')
      console.log(info)
      if (_this.$ebuyhouseDB.db) {
        if (Object.keys(info).length === 0) {
          // 二次清除 避免登录失效多重问题 缓存
          _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo', (e) => {
            if (e) {
              _this.$indexDB.deleteData(_this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo')
              this.dispatch('CLEAR_LOCAL_STOREGE')
            }
          })
        } else {
          _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'userInfo', 'meUserInfo', (e) => {
            if (!e) {
              _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'userInfo', {id: 'meUserInfo', data: info})
            } else {
              _this.$indexDB.putData(_this.$ebuyhouseDB.db, 'userInfo', {id: 'meUserInfo', data: info})
            }
          })
          this.commit('UPDATA_GLOBAL_LOCALSTOREGE_USER_INFO', info)
        }
      } else {
        clearTimeout(UP_GLOBALUSERINFO_TIMER)
        UP_GLOBALUSERINFO_TIMER = setTimeout(() => {
          UP_GLOBALUSERINFO_TIMER = _self.commit('UPDATA_GLOBAL_USER_INFO', info)
        }, 500)
      }
    },
    UPDATA_GLOBAL_LOCALSTOREGE_USER_INFO: (state, info) => {
      const LX_INFO = {
        'es': info.emailStatus, // email status
        'nn': info.nickname, // nickname
        'a': info.headUrl || '/static/img/common/header/avatar.png', // avatar
        'n': `${info.firstname || ''} ${info.middlename || ''} ${info.lastname || ''}`, // name
        'fn': info.firstname,
        'ln': info.lastname,
        'e': info.email, // email
        'uid': info.id,
        'img': info.headUrl, // headUrl
        'hxid': info.hxusername
      }
      Object.keys(LX_INFO).map(item => {
        window.localStorage.setItem(item, LX_INFO[item])
      })
    },
    UPDATA_GUID (state, guid) {
      state.Guid = guid
    }
  },
  actions: {
    CLEAR_LOCAL_STOREGE: () => {
      console.log('成功调用actions清除缓存')
      window.localStorage.clear()
    }
  }
}
