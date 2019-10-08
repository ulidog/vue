/**
 * @LandlordRouteModule
 * 房东交易流程模块
 */
const LandlordRouteModule = [
  // 租赁流程开始
  // 房东租赁
  {
    'path': 'landlord',
    'meta': {'title': '', 'requireAuth': true},
    'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord'], resolve),
    'children': [
      // 房东查看offer
      {
        'path': 'step-01',
        'name': 'step-01',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step01.vue'], resolve)
      },
      // 房东签字
      {
        'path': 'step-02',
        'name': 'step-02',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step02.vue'], resolve)
      },
      // 房东确认后等待页面
      {
        'path': 'step-03',
        'name': 'step-03',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step03.vue'], resolve)
      },
      // 房东拒绝 填写原因
      {
        'path': 'step-03-refuse',
        'name': 'step-03-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step03_refuse.vue'], resolve)
      },
      // 房东查看付款凭证
      {
        'path': 'step-04',
        'name': 'step-04',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step04.vue'], resolve)
      },
      // 房东拒绝后
      {
        'path': 'step-04-refuse',
        'name': 'step-04-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step04_refuse.vue'], resolve)
      },
      // 房东上传退款凭证
      {
        'path': 'step-05',
        'name': 'step-05',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step05.vue'], resolve)
      },
      // 房东填写移交表
      {
        'path': 'step-06',
        'name': 'step-06',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step06.vue'], resolve)
      },
      // 提交移交表等待页面
      {
        'path': 'step-07',
        'name': 'step-07',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step07.vue'], resolve)
      },
      // 房东查看退房原因
      {
        'path': 'step-08-checkout',
        'name': 'step-08-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step08_checkout.vue'], resolve)
      },
      // 房东选择有损退房 并填写扣款项
      {
        'path': 'step-09-checkout',
        'name': 'step-09-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step09_checkout.vue'], resolve)
      },
      // 填写完成后的等待页
      {
        'path': 'step-10-checkout',
        'name': 'step-10-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step10_checkout.vue'], resolve)
      },
      // 租客确认您的扣款项 等待租客上传付款凭证页面的等待页
      {
        'path': 'step-10-checkout-base',
        'name': 'step-10-checkout-base',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step10_checkout_base.vue'], resolve)
      },
      // 房东查看拒绝后的原因
      {
        'path': 'step-11-checkout',
        'name': 'step-11-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step11_checkout.vue'], resolve)
      },
      // 房东确认扣款凭证
      {
        'path': 'step-12-checkout',
        'name': 'step-12-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step12_checkout.vue'], resolve)
      },
      // 房东填写拒绝原因
      {
        'path': 'step-13-checkout',
        'name': 'step-13-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step13_refuse.vue'], resolve)
      },
      // 房东确认退房 并对租客评分
      {
        'path': 'step-14-checkout-success',
        'name': 'step-14-checkout-success',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step14_checkout_success.vue'], resolve)
      },
      // 房东主页面 催租 提前收房 42 43
      {
        'path': 'step-15-checkout',
        'name': 'step-15-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step15_checkout.vue'], resolve)
      },
      // 房东点击提前收房 填写原因页面 50
      {
        'path': 'step-16-checkout',
        'name': 'step-16-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step16_checkout.vue'], resolve)
      },
      // 房东点击提前收房 填写原因页面 50 base
      {
        'path': 'step-16-base-checkout',
        'name': 'step-16-base-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step16_base_checkout.vue'], resolve)
      },
      // 房东点击提前收房填写原因页面提交后 等待页面 50
      {
        'path': 'step-17-checkout',
        'name': 'step-17-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step17_checkout.vue'], resolve)
      },
      // 房东查看用户提前收房被拒绝的原因 54
      {
        'path': 'step-18-checkout',
        'name': 'step-18-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step18_viewReason.vue'], resolve)
      },
      // 房东提前收房 确认退款上传凭证页面 56 57
      {
        'path': 'step-19-checkout',
        'name': 'step-19-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step19_checkout.vue'], resolve)
      },
      // 房东查看拒绝原因
      {
        'path': 'step-19-checkout-reason',
        'name': 'step-19-checkout-reason',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step19_viewReason.vue'], resolve)
      },
      // 房东查看催租缴费凭证 47
      {
        'path': 'step-20-checkout',
        'name': 'step-20-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step20_checkout.vue'], resolve)
      },
      // 房东催租流程完成后显示的页面 49
      {
        'path': 'step-21-checkout',
        'name': 'step-21-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step21_checkout.vue'], resolve)
      },
      // 房东催租 查看缴费的凭证拒绝时填写拒绝内容的页面 48
      {
        'path': 'step-22-checkout-refuse',
        'name': 'step-22-checkout-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step22_refuse.vue'], resolve)
      },
      // 房东合同到期前一个月主页面 62
      {
        'path': 'step-23-checkout',
        'name': 'step-23-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step23_checkout.vue'], resolve)
      },
      // 房东收到到期收房通知 65
      {
        'path': 'step-24-checkout',
        'name': 'step-24-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step24_checkout.vue'], resolve)
      },
      // 房东合同到期页面 66
      {
        'path': 'step-25-checkout',
        'name': 'step-25-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step25_checkout.vue'], resolve)
      },
      // 房东合同 无损上传凭证 67 68
      {
        'path': 'step-26-checkout',
        'name': 'step-26-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step26_checkout.vue'], resolve)
      },
      // 房东选择到期退房 上传凭证后 查看被拒原因 71
      {
        'path': 'step-27-checkout',
        'name': 'step-27-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step27_checkout.vue'], resolve)
      },
      // 房东合同 有损退还押金 72
      {
        'path': 'step-28-checkout',
        'name': 'step-28-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step28_checkout.vue'], resolve)
      },
      // 房东合同 有损退还押金提交后等待页面 73
      {
        'path': 'step-29-checkout',
        'name': 'step-29-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step29_checkout.vue'], resolve)
      },
      // 房东查看拒绝的原因 77
      {
        'path': 'step-30-checkout',
        'name': 'step-30-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step30_checkout.vue'], resolve)
      },
      // 房东查看付款凭证 80
      {
        'path': 'step-31-checkout',
        'name': 'step-31-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step31_checkout.vue'], resolve)
      },
      // 房东查看凭证拒绝 81
      {
        'path': 'step-32-checkout-refuse',
        'name': 'step-32-checkout-refuse',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step32_refuse.vue'], resolve)
      },
      // 房东上传退款凭证  84 85
      {
        'path': 'step-33-checkout',
        'name': 'step-33-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step33_checkout.vue'], resolve)
      },
      // 房东查看拒绝原因 88
      {
        'path': 'step-34-checkout',
        'name': 'step-34-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step34_checkout.vue'], resolve)
      },
      // 房东合同到期前一个月 新版
      {
        'path': 'step-35-checkout',
        'name': 'step-35-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step35_checkout.vue'], resolve)
      },
      {
        'path': 'step-36-checkout',
        'name': 'step-36-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step36_checkout.vue'], resolve)
      },
      {
        'path': 'step-37-checkout',
        'name': 'step-37-checkout',
        'meta': {'title': '', 'requireAuth': true},
        'component': resolve => require(['@/pages/userCenter/contract/process/lease/landlord/step37_checkout.vue'], resolve)
      }
    ]
  }
]

export default LandlordRouteModule
