/**
 * @ReleaseRouteModule
 * 发布模块
 */
const ReleaseRouteModule = [
  {
    'path': '/release',
    'component': resolve => require(['@/pages/release/release.vue'], resolve),
    'children': [
      // 发布默认路由
      {
        'path': '/',
        'redirect': 'sale'
      },
      // 发布出售信息
      {
        'path': 'sale/:type?/:houseId?',
        'name': 'release for sale',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/release/sale/sale.vue'], resolve)
      },
      // 发布出租信息
      {
        'path': 'rentOut/:type?/:houseId?',
        'name': 'release for rent out',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/release/rentOut/rentOut.vue'], resolve)
      },
      // 发布求购信息
      {
        'path': 'buy',
        'name': 'release for buy',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/release/buy/buy.vue'], resolve)
      },
      // 发布求租信息
      {
        'path': 'rentIn',
        'name': 'release for rent in',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/release/rentIn/rentIn.vue'], resolve)
      }
    ]
  }
]

export default ReleaseRouteModule
