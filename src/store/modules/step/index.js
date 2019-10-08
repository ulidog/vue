export default {
  state: {
    isShowStep: false
  },
  getters: {
    isShowStep: state => {
      var el = document.getElementsByTagName('body')[0]
      state.isShowStep ? el.className = 'overHide' : el.className = ''
      return state.isShowStep
    }
  },
  mutations: {
    openStep: state => {
      state.isShowStep = true
    },
    closeStep: state => {
      state.isShowStep = false
    }
  },
  actions: {}
}
