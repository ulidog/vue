/**
 * @RequestRouteModule
 * 重构
 * 需求列表模块
 */
const RequestListRouteModule = [{
  'path': '/requestList',
  'component': resolve => require(['@/pages/requestList/content.vue'], resolve),
  'children': [
    // 默认重定向
    {
      'path': '/',
      'redirect': 'buyRequest'
    },
    // 求购
    {
      'path': 'buyRequest',
      'name': 'buyRequest',
      'meta': {
        'title': ''
      },
      'component': resolve => require(['@/pages/requestList/content/buyRequest.vue'], resolve)
    },
    // 求购SFT
    {
      'path': 'buyRequestSft',
      'name': 'buyRequestSft',
      'meta': {
        'title': ''
      },
      'component': resolve => require(['@/pages/requestList/content/buyRequestSft.vue'], resolve)
    },
    // 求租
    {
      'path': 'rentRequest',
      'name': 'rentRequest',
      'meta': {
        'title': ''
      },
      'component': resolve => require(['@/pages/requestList/content/rentRequest.vue'], resolve)
    }
  ]
}]

export default RequestListRouteModule
