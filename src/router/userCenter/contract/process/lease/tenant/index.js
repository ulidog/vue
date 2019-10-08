/**
 * @TenantRouteModule
 * 租客交易流程模块
 */
const TenantRouteModule = [
  // 租客租赁
  {
    'path': 'tenant',
    'meta': {'title': '', 'requireAuth': true},
    'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant'], resolve),
    'children': [
      // 租客提醒房东查看offer
      {
        'path': 'steps-01',
        'name': 'steps-01',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step01.vue'], resolve)
      },
      // 租客签字
      {
        'path': 'steps-02',
        'name': 'steps-02',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step02.vue'], resolve)
      },
      // 租客等待房东签字 租客确认签字
      {
        'path': 'steps-03',
        'name': 'steps-03',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step03.vue'], resolve)
      },
      // 租客拒绝
      {
        'path': 'steps-03-refuse',
        'name': 'steps-03-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step03_refuse.vue'], resolve)
      },
      // 租客确认 上传付款凭证
      {
        'path': 'steps-04',
        'name': 'steps-04',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step04.vue'], resolve)
      },
      // 租客查看被拒绝的原因
      {
        'path': 'steps-04-view-reason',
        'name': 'steps-04-view-reason',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step04_viewReason.vue'], resolve)
      },
      // 租客点击申请退款的等待页面
      {
        'path': 'steps-05',
        'name': 'steps-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step05.vue'], resolve)
      },
      // 租客查看退款凭证
      {
        'path': 'steps-06',
        'name': 'steps-06',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step06.vue'], resolve)
      },
      // 租客查看移交表
      {
        'path': 'steps-07',
        'name': 'steps-07',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step07.vue'], resolve)
      },
      // 租客拒绝移交表 填写原因
      {
        'path': 'steps-07-refuse',
        'name': 'steps-07-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step07_refuse.vue'], resolve)
      },
      // 租客完成租赁步凑
      {
        'path': 'steps-08',
        'name': 'steps-08',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step08.vue'], resolve)
      },
      // 租客拒绝移交表后 等待页面
      {
        'path': 'steps-09',
        'name': 'steps-09',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step09.vue'], resolve)
      },
      // 提前退房 原因填写
      {
        'path': 'steps-10-checkout',
        'name': 'steps-10-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step10_checkout.vue'], resolve)
      },
      // 提交退房原因后等待页面
      {
        'path': 'steps-11-checkout',
        'name': 'steps-11-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step11_checkout.vue'], resolve)
      },
      // 等待房东选择房屋完整度
      {
        'path': 'steps-11-checkout-base',
        'name': 'steps-11-checkout-base',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step11_checkout_base.vue'], resolve)
      },
      // 租客查看扣款项
      {
        'path': 'steps-12-checkout',
        'name': 'steps-12-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step12_checkout.vue'], resolve)
      },
      // 租客选择拒绝后 填写拒绝原因
      {
        'path': 'steps-13-checkout',
        'name': 'steps-13-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step13_checkout.vue'], resolve)
      },
      // 拒绝后等待页面
      {
        'path': 'steps-14-checkout',
        'name': 'steps-14-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step14_checkout.vue'], resolve)
      },
      // 租客上传扣款凭证
      {
        'path': 'steps-15-checkout',
        'name': 'steps-15-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step15_checkout.vue'], resolve)
      },
      // 租客查看被拒绝原因
      {
        'path': 'steps-16-view-reason',
        'name': 'steps-16-view-reason',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step16_viewReason.vue'], resolve)
      },
      // 租客收到退房通知
      {
        'path': 'steps-17-checkout',
        'name': 'steps-17-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step17_checkout.vue'], resolve)
      },
      // 租客评价
      {
        'path': 'steps-18-checkout-success',
        'name': 'steps-18-checkout-success',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step18_checkout_success.vue'], resolve)
      },
      // 租客确认提前收房
      {
        'path': 'steps-19-checkout',
        'name': 'steps-19-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step19_checkout.vue'], resolve)
      },
      // 租客确认收房 拒绝后提交原因
      {
        'path': 'steps-20-checkout',
        'name': 'steps-20-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step20_viewReason.vue'], resolve)
      },
      // 租客确认收房 拒绝后等待页面
      {
        'path': 'steps-21-checkout',
        'name': 'steps-21-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step21_checkout.vue'], resolve)
      },
      // 租客确认收房 同意后等待页面
      {
        'path': 'steps-22-checkout',
        'name': 'steps-22-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step22_checkout.vue'], resolve)
      },
      // 租客确认收房 确认收款凭证页面
      {
        'path': 'steps-23-checkout',
        'name': 'steps-23-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step23_checkout.vue'], resolve)
      },
      // 租客确认收房 确认收款凭证页面点击拒绝页面 并填写拒绝原因
      {
        'path': 'steps-24-checkout-refuse',
        'name': 'steps-24-checkout-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step24_refuse.vue'], resolve)
      },
      // 租客确认收房 确认收款凭证页面点击拒绝页面填写拒绝原因 等待页面
      {
        'path': 'steps-25-checkout',
        'name': 'steps-25-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step25_checkout.vue'], resolve)
      },
      // 租客查看催租
      {
        'path': 'steps-26-checkout',
        'name': 'steps-26-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step26_checkout.vue'], resolve)
      },
      // 租客上传租金
      {
        'path': 'steps-27-checkout',
        'name': 'steps-27-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step27_checkout.vue'], resolve)
      },
      // 租客查看原因
      {
        'path': 'steps-27-checkout-base',
        'name': 'steps-27-checkout-base',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step27_checkout_base.vue'], resolve)
      },
      // 提前一个月
      {
        'path': 'steps-28-checkout-base',
        'name': 'steps-28-checkout-base',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step28_checkout_base.vue'], resolve)
      },
      // 租客收到驱逐通知和确认 63 64
      {
        'path': 'steps-28-checkout',
        'name': 'steps-28-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step28_checkout.vue'], resolve)
      },
      // 租客确认退押金凭证 69
      {
        'path': 'steps-29-checkout',
        'name': 'steps-29-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step29_checkout.vue'], resolve)
      },
      // 租客收到押金点击拒绝 70
      {
        'path': 'steps-30-checkout',
        'name': 'steps-30-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step30_refuse.vue'], resolve)
      },
      // 租客确认有损退房扣款详情 74
      {
        'path': 'steps-31-checkout',
        'name': 'steps-31-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step31_checkout.vue'], resolve)
      },
      // 租客拒绝后填写原因 75
      {
        'path': 'steps-32-checkout',
        'name': 'steps-32-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step32_checkout.vue'], resolve)
      },
      // 租客查看扣款原因后拒绝 76
      {
        'path': 'steps-33-checkout',
        'name': 'steps-33-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step33_checkout.vue'], resolve)
      },
      // 租客租金不够 上传扣款凭证 78 79
      {
        'path': 'steps-34-checkout',
        'name': 'steps-34-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step34_checkout.vue'], resolve)
      },
      // 租客确认房东退款余额 86
      {
        'path': 'steps-35-checkout',
        'name': 'steps-35-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step35_checkout.vue'], resolve)
      },
      // 租客确认房东退款余额点击拒绝 87
      {
        'path': 'steps-36-checkout-refuse',
        'name': 'steps-36-checkout-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step36_refuse.vue'], resolve)
      },
      // 租客确认扣款为正数 等待房东退余额
      {
        'path': 'steps-37-checkout',
        'name': 'steps-37-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step37_checkout.vue'], resolve)
      },
      // 租客确认扣款为正数 等待房东退余额
      {
        'path': 'steps-38-checkout',
        'name': 'steps-38-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/tenant/step38_checkout.vue'], resolve)
      }
    ]
  }
  // 租赁结束
]

export default TenantRouteModule
