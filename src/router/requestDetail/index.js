/**
 * @RequestDetailRouteModule
 * 重构
 * 需求详情模块
 */
const RequestDetailRouteModule = [{
  'path': '/requestDetail',
  'name': 'requestDetail',
  'meta': {
    'title': ''
  },
  'component': resolve => require(['@/pages/requestDetail/index.vue'], resolve)
}]

export default RequestDetailRouteModule
