/**
 * @rentingHouseRouteModule
 * 租房
 */
const rentingHouseRouteModule = [{
  'path': '/rentingHouse',
  'name': 'rentingHouse',
  'meta': {'title': ''},
  'component': resolve => require(['@/pages/rentingHouse/index.vue'], resolve)
}]
export default rentingHouseRouteModule
