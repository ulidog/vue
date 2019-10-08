/***
 * @ErrorRouteModule
 * 错误模块
 * 路由404
 */
const ErrorRouteModule = [
  {
    'path': '*',
    'redirect': '/index',
    'matched': 'full'
  }
]

export default ErrorRouteModule
