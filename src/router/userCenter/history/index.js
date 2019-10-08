/**
 * @UserCenterHistoryRouteModule
 * 个人中心
 * 历史记录
 */
const UserCenterHistoryRouteModule = [
  // 我的浏览历史记录
  {
    'path': 'history',
    'component': resolve => require(['@/pages/userCenter/history/history.vue'], resolve),
    'children': [
      // 历史纪录默认路由
      {
        'path': '/',
        'redirect': 'sale'
      },
      // 出售
      {
        'path': 'sale',
        'meta': {'title': '', 'name': 'history', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/history/sale/sale.vue'], resolve)
      },
      // 出租
      {
        'path': 'rentOut',
        'meta': {'title': '', 'name': 'history', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/history/rentOut/rentOut.vue'], resolve)
      },
      // 求购
      {
        'path': 'buy',
        'meta': {'title': '', 'name': 'history', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/history/buy/buy.vue'], resolve)
      },
      // 求租
      {
        'path': 'rentIn',
        'meta': {'title': '', 'name': 'history', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/history/rentIn/rentIn.vue'], resolve)
      }
    ]
  }
]

export default UserCenterHistoryRouteModule
