/**
 * @UserCenterSignatureFileRouteModule
 * 个人中心
 * 签名档模块
 */
const UserCenterSignatureFileRouteModule = [
  // 签名档模块
  {
    'path': 'signature-file',
    'name': 'signature-file',
    'component': resolve => require(['@/pages/userCenter/signaturefile/index.vue'], resolve),
    'meta': { 'name': 'signature-file' }
  }
]

export default UserCenterSignatureFileRouteModule
