/**
 * @UserCenterMessageRouteModule
 * 个人中心
 * 信息
 */
const UserCenterMessageRouteModule = [
  // 我的消息
  {
    'path': 'message',
    'component': resolve => require(['@/pages/userCenter/message/message.vue'], resolve),
    'children': [
      // 我的消息默认路由
      {
        'path': '/',
        'redirect': 'notification'
      },
      // 系统消息
      {
        'path': 'notification',
        'component': resolve => require(['@/pages/userCenter/message/notification/notification.vue'], resolve),
        'children': [
          // 系统消息默认路由
          {
            'path': '/',
            'redirect': 'list'
          },
          // 系统消息列表
          {
            'path': 'list',
            'name': 'notification-list',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/notification/list/list.vue'], resolve)
          },
          // 系统消息详情
          {
            'path': 'detail',
            'name': 'notification-detail',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/notification/detail/detail.vue'], resolve)
          }
        ]
      },
      // 聊天消息
      {
        'path': 'msg',
        'name': 'msg',
        'meta': {'title': '', 'name': 'message', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/message/msg/msg.vue'], resolve)
      },
      // 意向函
      {
        'path': 'offer',
        'component': resolve => require(['@/pages/userCenter/message/offer/offer.vue'], resolve),
        'children': [
          // 意向函默认路由
          {
            'path': '/',
            'redirect': 'sale'
          },
          // 出售
          {
            'path': 'sale',
            'name': 'message-offer-sale',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/offer/sale/sale.vue'], resolve)
          },
          // 出租
          {
            'path': 'rental',
            'name': 'message-offer-rent',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/offer/rental/rental.vue'], resolve)
          }
        ]
      },
      // 推荐
      {
        'path': 'recommend',
        'component': resolve => require(['@/pages/userCenter/message/recommend/recommend.vue'], resolve),
        'children': [
          // 推荐默认路由
          {
            'path': '/',
            'redirect': 'buy'
          },
          {
            'path': 'buy',
            'name': 'message-offer-buy',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/recommend/buy/buy.vue'], resolve)
          },
          {
            'path': 'rent',
            'meta': {'title': '', 'name': 'message', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/message/recommend/rent/rent.vue'], resolve)
          }
        ]
      }
    ]
  }
]

export default UserCenterMessageRouteModule
