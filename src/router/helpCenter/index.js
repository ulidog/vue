/**
 * @HelpCenterRouteModule
 * 帮助中心
 */
const HelpCenterRouteModule = [
  {
    'path': '/help-center',
    'meta': {'title': 'Help Center'},
    'component': resolve => require(['@/pages/helpCenter/index.vue'], resolve),
    'children': [
      // 帮助中心默认路由
      {
        'path': '/',
        'redirect': 'index'
      },
      // 首页
      {
        'path': 'index/:type?',
        'name': 'helpCenterIndex',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/helpCenter/index/index.vue'], resolve)
      },
      // 帮助中心详情页
      {
        'path': 'help-home',
        'component': resolve => require(['@/pages/helpCenter/helpHome/helpGuide.vue'], resolve),
        'children': [
          {
            'path': 'appeal',
            'meta': {
              'titlemode': 'Customer Support',
              'leftList': [{
                'title': 'Account Support',
                'name': 'account-support'
              },
              {
                'title': 'Property Support',
                'name': 'property-support'
              }]
            },
            'component': resolve => require(['@/pages/helpCenter/helpHome/Appeal/index.vue'], resolve),
            'children': [
              {
                'path': '/',
                'redirect': 'account-support'
              },
              {
                'path': 'account-after',
                'name': 'account-after',
                'meta': {'title': 'Customer Support', 'subtitle': 'Account Support', 'subpath': 'account-support'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Appeal/content/accountAfter.vue'], resolve)
              },
              {
                'path': 'account-support',
                'name': 'account-support',
                'meta': {'title': 'Customer Support', 'subtitle': 'Account Support', 'subpath': 'account-support'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Appeal/content/accountComplaint.vue'], resolve)
              },
              {
                'path': 'property-support',
                'name': 'property-support',
                'meta': {'title': 'Customer Support', 'subtitle': 'Property Support', 'subpath': 'property-support'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Appeal/content/houseComplaint.vue'], resolve)
              },
              {
                'path': 'house-after',
                'name': 'house-after',
                'meta': {'title': 'Customer Support', 'subtitle': 'Property Support', 'subpath': 'property-support'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Appeal/content/houseAfter.vue'], resolve)
              }
            ]
          },
          {
            'path': 'calculator',
            'meta': {
              'titlemode': 'Calculators',
              'leftList': [{
                'title': 'Mortgage Calculator',
                'name': 'mortgage-calculator'
              }]
            },
            'component': resolve => require(['@/pages/helpCenter/helpHome/Calculator/index.vue'], resolve),
            'children': [
              {
                'path': '/',
                'redirect': 'mortgage-calculator'
              },
              {
                'path': 'mortgage-calculator',
                'meta': {'title': 'Calculators', 'subtitle': 'Mortgage Calculator', 'subpath': 'mortgage-calculator'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Calculator/content/mortgageCalculator.vue'], resolve)
              }
            ]
          },
          {
            'path': 'search',
            'meta': {
              'titlemode': 'Searches',
              'leftList': [{
                'title': 'Search Result',
                'name': 'search-result'
              }]
            },
            'component': resolve => require(['@/pages/helpCenter/helpHome/Search/index.vue'], resolve),
            'children': [
              {
                'path': '/',
                'redirect': 'search-result'
              },
              {
                'path': 'search-result',
                'meta': {'title': 'Searches', 'subtitle': 'Search Result', 'subpath': 'search-result'},
                'component': resolve => require(['@/pages/helpCenter/helpHome/Search/content/searchResult.vue'], resolve)
              }
            ]
          }
        ]
      }
    ]
  }
]

export default HelpCenterRouteModule
