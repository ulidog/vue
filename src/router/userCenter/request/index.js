/**
 * @UserCenterRequestRouteModule
 * 个人中心
 * 我的需求模块
 */
const UserCenterRequestRouteModule = [
  // 我的需求
  {
    'path': 'request',
    'component': resolve => require(['@/pages/userCenter/request/request.vue'], resolve),
    'children': [
      // 我的需求默认路由
      {
        'path': '/',
        'redirect': 'buy'
      },
      // 我的求购需求
      {
        'path': 'buy',
        'component': resolve => require(['@/pages/userCenter/request/buy/buy.vue'], resolve),
        'children': [
          // 我的求购需求默认路由
          {
            'path': '/',
            'redirect': 'available'
          },
          // 有效的
          {
            'path': 'available',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/buy/available/available.vue'], resolve)
          },
          // 审核中
          {
            'path': 'inAudit',
            'name': 'buyInAudit',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/buy/inAudit/inAudit.vue'], resolve)
          },
          // 售完的
          {
            'path': 'soldOut',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/buy/soldOut/soldOut.vue'], resolve)
          },
          // 审核被拒的
          {
            'path': 'refused',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/buy/refused/refused.vue'], resolve)
          }
        ]
      },
      // 我的求租需求
      {
        'path': 'rentIn',
        'component': resolve => require(['@/pages/userCenter/request/rentIn/rentIn.vue'], resolve),
        'children': [
          // 我的求租需求默认路由
          {
            'path': '/',
            'redirect': 'available'
          },
          // 有效的
          {
            'path': 'available',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/rentIn/available/available.vue'], resolve)
          },
          // 审核中
          {
            'path': 'inAudit',
            'name': 'rentInAudit',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/rentIn/inAudit/inAudit.vue'], resolve)
          },
          // 售完的
          {
            'path': 'soldOut',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/rentIn/soldOut/soldOut.vue'], resolve)
          },
          // 审核被拒的
          {
            'path': 'refused',
            'meta': {'title': '', 'name': 'request', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/request/rentIn/refused/refused.vue'], resolve)
          }
        ]
      }
    ]
  }
]

export default UserCenterRequestRouteModule
