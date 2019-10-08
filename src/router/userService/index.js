/**
 * @UploadServiceRouteModule
 * 上传服务商
 */
const UploadServiceRouteModule = [
  {
    path: '/upload-user-service',
    name: 'upload-user-service',
    component: resolve => require(['@/pages/userService'], resolve),
    meta: {name: 'userUploadService', 'requireAuth': true}
  }
]
export default UploadServiceRouteModule
