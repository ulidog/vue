/**
 * @SellRouteModule
 * 卖家路由模块
 */
const SellRouteModule = [
  // SFT和普通交易 卖家
  {
    'path': 'sell',
    'meta': {'title': '', 'requireAuth': true},
    'component': resolve => require(['@/pages/userCenter/contract/process/business/sell'], resolve),
    'children': [
      // 卖家查看offer
      {
        'path': 'step-01',
        'name': 'sell-step-01',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step01.vue'], resolve)
      },
      // 卖家签字
      {
        'path': 'step-02',
        'name': 'sell-step-02',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step02.vue'], resolve)
      },
      // 卖家确认后等待页面
      {
        'path': 'step-03',
        'name': 'sell-step-03',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step03.vue'], resolve)
      },
      // 卖家拒绝 填写原因
      {
        'path': 'step-03-refuse',
        'name': 'sell-step-03-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step03_refuse.vue'], resolve)
      },
      // 卖家查看付款凭证
      {
        'path': 'step-04',
        'name': 'sell-step-04',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step04.vue'], resolve)
      },
      // 卖家拒绝后
      {
        'path': 'step-04-refuse',
        'name': 'sell-step-04-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step04_refuse.vue'], resolve)
      },
      // 卖家上传退款凭证
      {
        'path': 'step-05',
        'name': 'sell-step-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step05.vue'], resolve)
      },
      // 卖家上传退款凭证 查看原因
      {
        'path': 'step-05-base',
        'name': 'sell-step-base-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step05_base.vue'], resolve)
      },
      // 卖家填写移交表
      {
        'path': 'step-06',
        'name': 'sell-step-06',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step06.vue'], resolve)
      },
      // 提交移交表等待页面
      {
        'path': 'step-07',
        'name': 'sell-step-07',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step07.vue'], resolve)
      },
      // 提交移交表等待页面
      {
        'path': 'step-08',
        'name': 'sell-step-08',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step08_tryit.vue'], resolve)
      },
      // 卖家上传退款凭证29 29.1
      {
        'path': 'step-09',
        'name': 'sell-step-09',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step09_tryit.vue'], resolve)
      },
      // 卖家查看原因 32
      {
        'path': 'step-10',
        'name': 'sell-step-10',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step10_tryit.vue'], resolve)
      },
      // 卖家上传退款凭证33 33.1
      {
        'path': 'step-11',
        'name': 'sell-step-11',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step11_tryit.vue'], resolve)
      },
      // 卖家查看拒绝原因 36
      {
        'path': 'step-12',
        'name': 'sell-step-12',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step12_tryit.vue'], resolve)
      },
      // 卖家房屋有损 计算方式37
      {
        'path': 'step-13',
        'name': 'sell-step-13',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step13_tryit.vue'], resolve)
      },
      // 卖家房屋有损填写拒绝原因后等待 37.1
      {
        'path': 'step-14',
        'name': 'sell-step-14',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step14_tryit.vue'], resolve)
      },
      // 卖家查看拒绝扣款原因
      {
        'path': 'step-15',
        'name': 'sell-step-15',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step15_tryit.vue'], resolve)
      },
      // 卖家填写拒绝原因
      {
        'path': 'step-16',
        'name': 'sell-step-16-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step16_refuse.vue'], resolve)
      },
      // 卖家查看凭证
      {
        'path': 'step-16',
        'name': 'sell-step-16',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step16_tryit.vue'], resolve)
      },
      // 卖家上传凭证
      {
        'path': 'step-17',
        'name': 'sell-step-17',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step17_tryit.vue'], resolve)
      },
      // 等待
      {
        'path': 'step-base-18',
        'name': 'sell-step-base-18',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step18_houseInspection_base.vue'], resolve)
      },
      // 卖家查看检查报告 52 52.1 53
      {
        'path': 'step-18',
        'name': 'sell-step-18',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step18_houseInspection.vue'], resolve)
      },
      // 卖家查看图片详情 52.2
      {
        'path': 'step-19',
        'name': 'sell-step-19',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step19_houseInspection.vue'], resolve)
      },
      // 卖家查看减价申请 56 58
      {
        'path': 'step-20',
        'name': 'sell-step-20',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step20_houseInspection.vue'], resolve)
      },
      // 卖家拒绝 填写原因 57
      {
        'path': 'step-21',
        'name': 'sell-step-21',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step21_houseInspection.vue'], resolve)
      },
      // 卖家拒绝 等待 57.1
      {
        'path': 'step-22',
        'name': 'sell-step-22',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step22_houseInspection.vue'], resolve)
      },
      // 卖家查看付款凭证 60
      {
        'path': 'step-23',
        'name': 'sell-step-23',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step23_houseInspection.vue'], resolve)
      },
      // 卖家拒绝付款 填写原因 61
      {
        'path': 'step-24',
        'name': 'sell-step-24',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step24_houseInspection.vue'], resolve)
      },
      // 卖家拒绝后等待页面 61.1
      {
        'path': 'step-25',
        'name': 'sell-step-25',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step25_houseInspection.vue'], resolve)
      },
      // 卖家评价 64
      {
        'path': 'step-26',
        'name': 'sell-step-26',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step26_houseInspection.vue'], resolve)
      },
      // 公共等待页面
      {
        'path': 'step-27',
        'name': 'sell-step-27',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/sell/step27_common.vue'], resolve)
      }
    ]
  }
]

export default SellRouteModule
