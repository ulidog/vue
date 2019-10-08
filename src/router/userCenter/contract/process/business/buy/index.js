const BuyRouteModule = [
  // 买家
  {
    'path': 'buy',
    'meta': {'title': '', 'requireAuth': true},
    'component': resolve => require(['@/pages/userCenter/contract/process/business/buy'], resolve),
    'children': [
      // 买家提醒卖家查看offer
      {
        'path': 'steps-01',
        'name': 'buy-steps-01',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step01.vue'], resolve)
      },
      // 买家签字
      {
        'path': 'steps-02',
        'name': 'buy-steps-02',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step02.vue'], resolve)
      },
      // 买家等待房东签字 买家确认签字
      {
        'path': 'steps-03',
        'name': 'buy-steps-03',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step03.vue'], resolve)
      },
      // 买家拒绝
      {
        'path': 'steps-03-refuse',
        'name': 'buy-steps-03-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step03_refuse.vue'], resolve)
      },
      // 买家确认 上传付款凭证
      {
        'path': 'steps-04',
        'name': 'buy-steps-04',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step04.vue'], resolve)
      },
      // 买家查看被拒绝的原因
      {
        'path': 'steps-04-view-reason',
        'name': 'buy-steps-04-view-reason',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step04_viewReason.vue'], resolve)
      },
      // 买家点击申请退款的等待页面
      {
        'path': 'steps-05',
        'name': 'buy-steps-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step05.vue'], resolve)
      },
      // step05_viewReason
      // 买家点击申请退款的等待页面
      {
        'path': 'steps-05-view-reason',
        'name': 'buy-steps-05-view-reason',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step05_viewReason.vue'], resolve)
      },
      // 买家查看退款凭证
      {
        'path': 'steps-06',
        'name': 'buy-steps-06',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step06.vue'], resolve)
      },
      // step07_viewWait.vue
      // 等待卖家提交移交表
      {
        'path': 'steps-07-wait',
        'name': 'buy-steps-07-wait',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step07_viewWait.vue'], resolve)
      },
      // 买家查看移交表
      {
        'path': 'steps-07',
        'name': 'buy-steps-07',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step07.vue'], resolve)
      },
      // 买家拒绝移交表 填写原因
      {
        'path': 'steps-07-refuse',
        'name': 'buy-steps-07-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step07_refuse.vue'], resolve)
      },
      // 买家完成试住阶段
      {
        'path': 'steps-08',
        'name': 'buy-steps-08',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step08.vue'], resolve)
      },
      // 买家拒绝移交表后 等待页面
      {
        'path': 'steps-09',
        'name': 'buy-steps-09',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step09.vue'], resolve)
      },
      // 买家结束试住 27 31
      {
        'path': 'steps-10',
        'name': 'buy-steps-10',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step10_tryit.vue'], resolve)
      },
      // 买家结束试住 27.1 提交原因
      {
        'path': 'steps-11',
        'name': 'buy-steps-11',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step11_tryit.vue'], resolve)
      },
      // 买家结束试住 27.1 提交原因
      {
        'path': 'steps-12',
        'name': 'buy-steps-12',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step12_tryit.vue'], resolve)
      },
      // 买家查看退款凭证 30
      {
        'path': 'steps-13',
        'name': 'buy-steps-13',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step13_tryit.vue'], resolve)
      },
      // 买家结束试住 27.1 提交原因
      {
        'path': 'steps-14',
        'name': 'buy-steps-14',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step14_tryit.vue'], resolve)
      },
      // 买家拒绝后 填写原因
      {
        'path': 'steps-15',
        'name': 'buy-steps-15',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step15_refuse.vue'], resolve)
      },
      // 买家查看扣款原因 38
      {
        'path': 'steps-16',
        'name': 'buy-steps-16',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step16_tryit.vue'], resolve)
      },
      // 买家拒绝后填写原因 39
      {
        'path': 'steps-17',
        'name': 'buy-steps-17',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step17_tryit.vue'], resolve)
      },
      // 买家拒绝后后等待 40
      {
        'path': 'steps-18',
        'name': 'buy-steps-18',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step18_tryit.vue'], resolve)
      },
      // 买家确认扣款金额等待页面 45
      {
        'path': 'steps-19',
        'name': 'buy-steps-19',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step19_tryit.vue'], resolve)
      },
      // 买家查看退款凭证 47
      {
        'path': 'steps-20',
        'name': 'buy-steps-20',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step20_tryit.vue'], resolve)
      },
      // 买家选择房屋检查 48
      {
        'path': 'steps-21',
        'name': 'buy-steps-21',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step21_houseInspection.vue'], resolve)
      },
      // 买家选择Email上传 48
      {
        'path': 'steps-22',
        'name': 'buy-steps-22',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step22_houseInspection.vue'], resolve)
      },
      // 买家选择本地上传 49 50
      {
        'path': 'steps-23',
        'name': 'buy-steps-23',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step23_houseInspection.vue'], resolve)
      },
      // 买家上传成功 51
      {
        'path': 'steps-24',
        'name': 'buy-steps-24',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step24_houseInspection.vue'], resolve)
      },
      // 买家查看 51.1
      {
        'path': 'steps-25',
        'name': 'buy-steps-25',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step25_houseInspection.vue'], resolve)
      },
      // 买家收到卖家确认通知书
      {
        'path': 'steps-26',
        'name': 'buy-steps-26',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step26_houseInspection.vue'], resolve)
      },
      // 买家申请减价申请 55
      {
        'path': 'steps-27',
        'name': 'buy-steps-27',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step27_houseInspection.vue'], resolve)
      },
      // 买家查看被拒原因 57.2
      {
        'path': 'steps-28',
        'name': 'buy-steps-28',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step28_houseInspection.vue'], resolve)
      },
      // 买家查看被拒原因 57.3
      {
        'path': 'steps-29-base',
        'name': 'buy-steps-29-base',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step29_houseInspection_base.vue'], resolve)
      },
      // 买家上传支付尾款凭证 59 59.1
      {
        'path': 'steps-29',
        'name': 'buy-steps-29',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step29_houseInspection.vue'], resolve)
      },
      // 买家查看拒绝原因 62
      {
        'path': 'steps-30',
        'name': 'buy-steps-30',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step30_houseInspection.vue'], resolve)
      },
      // 买家重新上传凭证 63 63.1
      {
        'path': 'steps-31',
        'name': 'buy-steps-31',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/business/buy/step31_houseInspection.vue'], resolve)
      }
    ]
  }
]

export default BuyRouteModule
