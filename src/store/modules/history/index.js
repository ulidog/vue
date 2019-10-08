/**
 * @description 历史记录管理模块
 * @time [2019-6-14]
 * @param {Object} historyModel
*/
export default {
  state: {
    SearchHistory: []
  },
  getters: {
    SearchHistory: state => state.SearchHistory
  },
  mutations: {
    UPDATA_SEARCH_HISTORY (state, info) {
      if (Array.isArray(info)) {
        state.SearchHistory = info
      } else {
        state.SearchHistory.push(info)
      }
      this.dispatch('asyncUpdataSearchHistory', state.SearchHistory)
    }
  },
  actions: {
    asyncUpdataSearchHistory ({state, commit}, info) {
      const _this = this._vm
      _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'history', 'SearchHistory', (e) => {
        if (!e) {
          _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'history', {id: 'SearchHistory', data: info})
        } else {
          _this.$indexDB.putData(_this.$ebuyhouseDB.db, 'history', {id: 'SearchHistory', data: info})
        }
      })
    }
  },
  modules: {}
}
