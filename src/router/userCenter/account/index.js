/**
 * @UserCenterAccountRouteModule
 * 个人中心
 * 关于账户模块
 */
const UserCenterAccountRouteModule = [
  // 关于账户
  {
    'path': 'account',
    'component': resolve => require(['@/pages/userCenter/account/account.vue'], resolve),
    'meta': { 'name': 'account' },
    'children': [
      // 关于账户默认路由
      {
        'path': '/',
        'redirect': 'userInfo'
      },
      // 个人信息
      {
        'path': 'userInfo',
        'name': 'user information',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/account/userInfo/userInfo.vue'], resolve)
      },
      // 账户安全
      {
        'path': 'security',
        'name': 'account security',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/account/security/security.vue'], resolve)
      }
    ]
  }
]

export default UserCenterAccountRouteModule
