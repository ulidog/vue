/**
 * @LeaseRouteModule
 * 租赁的路由
 */
import LandlordRouteModule from './lease/landlord'
import TenantRouteModule from './lease/tenant'
const LeaseRouteModule = [
  ...LandlordRouteModule,
  ...TenantRouteModule
]

export default LeaseRouteModule
