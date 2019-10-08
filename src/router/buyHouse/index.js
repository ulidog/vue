/**
 * @buyHouseRouteModule
 * 买房
 */
const buyHouseRouteModule = [{
  'path': '/buyHouse',
  'name': 'buyHouse',
  'meta': {'title': ''},
  'component': resolve => require(['@/pages/buyHouse/index.vue'], resolve)
}]
export default buyHouseRouteModule
