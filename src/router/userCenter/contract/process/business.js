/**
 * @BusinessRouteModule
 * 买房卖房的路由模块
 */
import SellRouteModule from './business/sell'
import BuyRouteModule from './business/buy'
import CommonRouteModule from './business/common'
const BusinessRouteModule = [
  ...SellRouteModule,
  ...BuyRouteModule,
  ...CommonRouteModule
]

export default BusinessRouteModule
