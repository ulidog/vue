/**
 * @description 用户指南搜索部分
 * @time [2019-3-24]
 * @param {Object} guidePublic
*/
export default {
  state: {
    guidePublic: {}
  },
  getters: {
    guidePublic: state => state.guidePublic
  },
  mutations: {
    UPDATA_GUIDE_PUBLIC: (state, info) => {
      state.guidePublic = info
    }
  },
  actions: {},
  modules: {}
}
