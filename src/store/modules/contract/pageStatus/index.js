export default {
  state: {
    AcountIndex: null
  },
  getters: {
    AcountIndex: state => state.AcountIndex
  },
  mutations: {
    UPDATE_AcountIndex: (state, status) => {
      state.ACOUNTINDEX = status
    }
  },
  actions: {}
}
