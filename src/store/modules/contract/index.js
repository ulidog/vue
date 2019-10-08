/**
 * @param processType {
 * 0,1,2
 * }
 * 1：普通
 * 2：SFT
 * 0：租赁
 */
import pageStatus from './pageStatus'
import process from './process'
export default {
  state: {
    MajorStatus: 0,
    processType: sessionStorage.getItem('processType') || 0
  },
  getters: {
    MajorStatus: state => state.MajorStatus,
    processType: state => state.processType
  },
  mutations: {
    UPDATE_MAJORSTATUS: (state, status) => {
      state.MajorStatus = status
    },
    UPDATE_PROCESSTYPE: (state, status) => {
      state.processType = status
      sessionStorage.setItem('processType', status)
      console.log('状态改变: ' + status)
    }
  },
  actions: {},
  modules: {
    pageStatus,
    process
  }
}
