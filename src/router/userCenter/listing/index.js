/**
 * @UserCenterListingRouteModule
 * 个人中心
 * 房源详情
 */
const UserCenterListingRouteModule = [
  // 我的房源
  {
    'path': 'listing',
    'component': resolve => require(['@/pages/userCenter/listing/listing.vue'], resolve),
    'children': [
      // 我的房源默认路由
      {
        'path': '/',
        'redirect': 'sell'
      },
      // 出售
      {
        'path': 'sell',
        'component': resolve => require(['@/pages/userCenter/listing/sell/sell.vue'], resolve),
        'children': [
          // 出售默认路由
          {
            'path': '/',
            'redirect': 'available'
          },
          // 在线的
          {
            'path': 'available',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/sell/available/available.vue'], resolve)
          },
          // 审核中
          {
            'path': 'inAudit',
            'name': 'listing-sellInAudit',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/sell/inAudit/inAudit.vue'], resolve)
          },
          // 交易中
          // {
          //   'path': 'trading',
          //   'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
          //   'component': resolve => require(['@/pages/userCenter/listing/sell/trading/trading.vue'], resolve)
          // },
          // // 交易完成
          // {
          //   'path': 'traded',
          //   'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
          //   'component': resolve => require(['@/pages/userCenter/listing/sell/traded/traded.vue'], resolve)
          // },
          // 下架
          {
            'path': 'soldOut',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/sell/soldOut/soldOut.vue'], resolve)
          },
          // 审核不通过
          {
            'path': 'refused',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/sell/refused/refused.vue'], resolve)
          }
        ]
      },
      // 出租
      {
        'path': 'rent',
        'component': resolve => require(['@/pages/userCenter/listing/rent/rent.vue'], resolve),
        'children': [
          // 出租默认路由
          {
            'path': '/',
            'redirect': 'available'
          },
          // 在线的
          {
            'path': 'available',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/rent/available/available.vue'], resolve)
          },
          // 审核中
          {
            'path': 'inAudit',
            'name': 'listing-rentInAudit',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/rent/inAudit/inAudit.vue'], resolve)
          },
          // 交易中
          // {
          //   'path': 'trading',
          //   'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
          //   'component': resolve => require(['@/pages/userCenter/listing/rent/trading/trading.vue'], resolve)
          // },
          // // 交易完成
          // {
          //   'path': 'traded',
          //   'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
          //   'component': resolve => require(['@/pages/userCenter/listing/rent/traded/traded.vue'], resolve)
          // },
          // 下架
          {
            'path': 'soldOut',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/rent/soldOut/soldOut.vue'], resolve)
          },
          // 审核不通过
          {
            'path': 'refused',
            'meta': {'title': '', 'name': 'listing', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/listing/rent/refused/refused.vue'], resolve)
          }
        ]
      }
    ]
  }
]

export default UserCenterListingRouteModule
