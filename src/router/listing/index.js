/**
 * @ListingRouteModule
 * 房源详情
 * 房源详情
 */
const ListingRouteModule = [
  {
    'path': '/listing',
    'component': resolve => require(['@/pages/listing'], resolve),
    'children': [
      // 房源详情默认路由
      {
        'path': '/',
        'redirect': 'details'
      },
      // 公共
      {
        'path': 'details/:houseId',
        'name': 'listing-details',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/listing/details'], resolve)
      },
      //
      // offer
      {
        'path': 'offer/',
        'name': 'rentAndsellOffer',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/listing/offer'], resolve)
      }
    ]
  }
]

export default ListingRouteModule
