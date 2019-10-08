/**
 * @MapRouteModule
 * 地图找房模块
 * 地图找房
 */
const MapRouteModule = [
  {
    'path': '/map/:type/:keyWord?/:stateId?/:cityId?/:cityName?/:latitude?/:longitude?',
    'name': 'map',
    'component': resolve => require(['@/pages/map'], resolve),
    'meta': {isKeepAlive: true}
  }
]

export default MapRouteModule
