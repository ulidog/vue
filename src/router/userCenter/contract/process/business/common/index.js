/**
 * @CommonRouteModule
 * 普通交易流程和SFT交易流程公共路由
 */
const CommonRouteModule = [
  // 公共
  {
    'path': 'common',
    'meta': {'title': '', 'requireAuth': true},
    'component': resolve => require(['@/pages/userCenter/contract/process/business/common'], resolve),
    'children': [
      {
        'path': 'common-01',
        'name': 'common-steps-01',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_01.vue'], resolve)
      },
      {
        'path': 'common-02',
        'name': 'common-steps-02',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_02.vue'], resolve)
      },
      {
        'path': 'common-03',
        'name': 'common-steps-03',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_03.vue'], resolve)
      },
      {
        'path': 'common-04',
        'name': 'common-steps-04',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_04.vue'], resolve)
      },
      {
        'path': 'common-05',
        'name': 'common-steps-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_05.vue'], resolve)
      },
      {
        'path': 'common-06',
        'name': 'common-steps-06',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_06.vue'], resolve)
      },
      {
        'path': 'common-07',
        'name': 'common-steps-07',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_07.vue'], resolve)
      },
      {
        'path': 'common-08',
        'name': 'common-steps-08',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/common/comon_08.vue'], resolve)
      }
    ]
  }
]

export default CommonRouteModule
