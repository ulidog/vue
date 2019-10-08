/**
 * @UserCenterCollectionRouteModule
 * 个人中心
 * 我的收藏
 */
const UserCenterCollectionRouteModule = [
  // 我的收藏
  {
    'path': 'collection',
    'component': resolve => require(['@/pages/userCenter/collection/collection.vue'], resolve),
    'children': [
      // 我的收藏默认路由
      {
        'path': '/',
        'redirect': 'sale'
      },
      // 收藏的出售信息
      {
        'path': 'sale',
        'meta': {'title': '', 'name': 'collection', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/collection/sale/sale.vue'], resolve)
      },
      // 收藏的出租信息
      {
        'path': 'rentOut',
        'meta': {'title': '', 'name': 'collection', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/collection/rentOut/rentOut.vue'], resolve)
      },
      // 收藏的求购信息
      {
        'path': 'buy',
        'meta': {'title': '', 'name': 'collection', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/collection/buy/buy.vue'], resolve)
      },
      // 收藏的求租信息
      {
        'path': 'rentIn',
        'meta': {'title': '', 'name': 'collection', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/collection/rentIn/rentIn.vue'], resolve)
      }
    ]
  }
]

export default UserCenterCollectionRouteModule
