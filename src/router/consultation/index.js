/**
 * @ConsultationRouteModule
 * 咨询管理模块
 */
const ConsultationRouteModule = [
  // 咨询管理
  {
    'path': '/information',
    'component': resolve => require(['@/pages/consultation'], resolve),
    'children': [
      // 咨询默认
      {
        'path': '/',
        'redirect': 'index'
      },
      // 咨询首页
      {
        'path': 'index',
        'name': 'consultation-home-page',
        'meta': {'title': '', 'requireAuth': false},
        'component': resolve => require(['@/pages/consultation/home'], resolve)
      },
      // 咨询详情
      {
        'path': 'details/:id',
        'name': 'consultation-details',
        'meta': {'title': '', 'requireAuth': false},
        'component': resolve => require(['@/pages/consultation/details'], resolve)
      }
    ]
  }
]

export default ConsultationRouteModule
