export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    update_process ({state, commit}, params) {
      const _this = this
      return new Promise(function (resolve, reject) {
        _this._vm.$axios.post(params.url, params.data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
