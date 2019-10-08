
/**
 * @ArticleRouteModule
 * 文章管理模块
 */
const ArticleRouteModule = [
  // 文章管理
  {
    'path': '/article',
    'component': resolve => require(['@/pages/article'], resolve),
    'children': [
      // 文章默认
      {
        'path': '/',
        'redirect': 'advertorial'
      },
      {
        'path': 'advertorial',
        'name': 'advertorial',
        'meta': {'title': '', 'requireAuth': false},
        'component': resolve => require(['@/pages/article/advertorial'], resolve)
      },
      {
        'path': 'buy-and-sell',
        'name': 'BuyAndSell',
        'meta': {'title': '', 'requireAuth': false},
        'component': resolve => require(['@/pages/article/buyAndSell'], resolve)
      },
      {
        'path': 'new-buy-sell',
        'name': 'NewBuySell',
        'meta': {'title': '', 'requireAuth': false},
        'component': resolve => require(['@/pages/article/newBuySell'], resolve)
      }
    ]
  }
]

export default ArticleRouteModule
