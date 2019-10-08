/**
 * @UserCenterContractRouteModule
 * 个人中心
 * 我的合同
 */
import LeaseRouteModule from './process/lease'
import BusinessRouteModule from './process/business'
const UserCenterContractRouteModule = [
  // 我的合同
  {
    'path': 'contract',
    'component': resolve => require(['@/pages/userCenter/contract'], resolve),
    'meta': { 'name': 'contract' },
    'children': [
      // 合同默认路由
      {
        'path': '/',
        'redirect': 'list'
      },
      // 合同列表页
      {
        'path': 'list',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/list/list.vue'], resolve),
        'children': [
          // 列表页默认路由
          {
            'path': '/',
            'redirect': 'sale'
          },
          // 出售
          {
            'path': 'sale',
            'meta': {'title': '', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/contract/list/sale/sale.vue'], resolve),
            'children': [
              // 出售默认路由
              {
                'path': '/',
                'redirect': 'tranditional'
              },
              // 传统交易法
              {
                'path': 'tranditional',
                'meta': {'title': '', 'requireAuth': true},
                'component': resolve => require(['@/pages/userCenter/contract/list/sale/tranditional/tranditional.vue'], resolve)
              },
              // SFT交易法
              {
                'path': 'sft',
                'meta': {'title': '', 'requireAuth': true},
                'component': resolve => require(['@/pages/userCenter/contract/list/sale/sft/sft.vue'], resolve)
              }
            ]
          },
          // 出租
          {
            'path': 'rentOut',
            'meta': {'title': '', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/contract/list/rentOut/rentOut.vue'], resolve)
          },
          // 求购
          {
            'path': 'buy',
            'meta': {'title': '', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/contract/list/buy/buy.vue'], resolve),
            'children': [
              // 出售默认路由
              {
                'path': '/',
                'redirect': 'tranditional'
              },
              // 传统交易法
              {
                'path': 'tranditional',
                'meta': {'title': '', 'requireAuth': true},
                'component': resolve => require(['@/pages/userCenter/contract/list/buy/tranditional/tranditional.vue'], resolve)
              },
              // SFT交易法
              {
                'path': 'sft',
                'meta': {'title': '', 'requireAuth': true},
                'component': resolve => require(['@/pages/userCenter/contract/list/buy/sft/sft.vue'], resolve)
              }
            ]
          },
          // 求租
          {
            'path': 'rentIn',
            'meta': {'title': '', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/contract/list/rentIn/rentIn.vue'], resolve)
          }
        ]
      },
      // 流程开始
      {
        'path': 'process',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process'], resolve),
        'children': [
          // 流程默认路由 默认重定向到空白页（暂时）
          {
            'path': '/',
            'redirect': 'index'
          },
          // 流程首页
          {
            'path': 'index',
            'name': 'process-null',
            'meta': {'title': '', 'requireAuth': true},
            'component': resolve => require(['@/pages/userCenter/contract/process/null'], resolve)
          },
          // 租赁模块
          ...LeaseRouteModule,
          // 买房卖房模块
          ...BusinessRouteModule
        ]
      }
    ]
  }
]

export default UserCenterContractRouteModule
