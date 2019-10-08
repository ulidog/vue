/**
 * @rentingHouseRouteModule
 * 租房
 */
const RegularHouseRouteModule = [{
  'path': '/commonHouse',
  'name': 'commonHouse',
  'meta': {'title': ''},
  'component': resolve => require(['@/pages/commonHouse/index.vue'], resolve)
}]
export default RegularHouseRouteModule
