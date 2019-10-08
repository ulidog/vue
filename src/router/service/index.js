/**
 * @ServiceRouteModule
 * 服务模块
 */
const ServiceRouteModule = [{
  'path': '/service',
  'component': resolve => require(['@/pages/service/index.vue'], resolve),
  'children': [
    // 默认列表页
    {
      'path': '/',
      'redirect': 'list'
    },
    // 列表页
    {
      'path': 'list',
      'name': 'sericeList',
      'meta': {
        'title': ''
      },
      'component': resolve => require(['@/pages/service/content/list.vue'], resolve)
    },
    // 详情页
    {
      'path': 'detail/:id',
      'name': 'serviceDetail',
      'meta': {
        'title': ''
      },
      'component': resolve => require(['@/pages/service/content/detail.vue'], resolve)
    }
  ]
}]

export default ServiceRouteModule
