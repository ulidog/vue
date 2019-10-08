/**
 * @UserCenterAccountRouteModule
 * 我的服务商
 */
const UserCenterServiceRouteModule = [
  {
    path: 'service/:type',
    component: resolve => require(['@/pages/userCenter/service'], resolve),
    meta: {name: 'service', requireAuth: true}
  }
]
export default UserCenterServiceRouteModule
