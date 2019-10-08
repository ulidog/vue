/**
 * @UserCenterRouterModule
 * 用户中心模块
 * 拆分多个子模块
 */
// 关于账户
import UserCenterAccountRouteModule from './account'
// 我的消息
import UserCenterMessageRouteModule from './message'
// 签名档
import UserCenterSignatureFileRouteModule from './signaturefile'
// 我的房源
import UserCenterListingRouteModule from './listing'
// 我的合同
import UserCenterContractRouteModule from './contract'
// 我的需求
import UserCenterRequestRouteModule from './request'
// 我的收藏
import UserCenterCollectionRouteModule from './collection'
// 我的浏览历史记录
import UserCenterHistoryRouteModule from './history'
// 我的服务商
import UserCenterServiceRouteModule from './service'
const UserCenterRouterModule = [
  // 个人中心
  {
    'path': '/userCenter',
    'component': resolve => require(['@/pages/userCenter/userCenter.vue'], resolve),
    'children': [
      // 个人中心默认路由
      {
        'path': '/',
        'redirect': 'account'
      },
      // 关于账户
      ...UserCenterAccountRouteModule,
      // 我的消息
      ...UserCenterMessageRouteModule,
      // 签名档
      ...UserCenterSignatureFileRouteModule,
      // 我的房源
      ...UserCenterListingRouteModule,
      // 我的合同
      ...UserCenterContractRouteModule,
      // 我的需求
      ...UserCenterRequestRouteModule,
      // 我的收藏
      ...UserCenterCollectionRouteModule,
      // 我的浏览历史记录
      ...UserCenterHistoryRouteModule,
      // 我的服务商
      ...UserCenterServiceRouteModule
    ]
  }
]

export default UserCenterRouterModule
