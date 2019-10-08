/**
 * @OtherRouteModule
 * 其它模块
 */
const OtherRouteModule = [
  {
    'path': '/check-email',
    'name': 'check-email',
    'meta': {'title': ''},
    'component': resolve => require(['@/pages/other/checkEmail.vue'], resolve)
  },
  {
    'path': '/author-info',
    'name': 'economic-man',
    'meta': {'title': ''},
    'component': resolve => require(['@/pages/economicMan/index.vue'], resolve)
  },
  {
    'path': '/guide',
    'meta': {'title': ''},
    'component': resolve => require(['@/pages/guide/index.vue'], resolve),
    'children': [
      {
        'path': '/',
        'redirect': 'list'
      },
      {
        'path': 'list',
        'name': 'guideList',
        'component': resolve => require(['@/pages/guide/guideList'], resolve)
      },
      {
        'path': 'search',
        'name': 'guideSearch',
        'component': resolve => require(['@/pages/guide/guideSearch'], resolve)
      },
      {
        'path': 'detail',
        'name': 'guideDetail',
        'component': resolve => require(['@/pages/guide/guideDetail'], resolve)
      }
    ]
  }
]

export default OtherRouteModule
