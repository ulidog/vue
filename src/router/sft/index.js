/**
 * @SftRouteModule
 * 易买屋介绍
 */
const SftRouteModule = [
  {
    path: '/sft',
    component: resolve => require(['@/pages/sft/index.vue'], resolve),
    children: [
      {
        path: '/',
        redirect: 'Innovation'
      },
      {
        path: 'Innovation',
        name: 'Innovation',
        component: resolve => require(['@/pages/sft/Innovation.vue'], resolve)
      },
      {
        path: 'SaveThousands',
        name: 'SaveThousands',
        component: resolve => require(['@/pages/sft/SaveThousands.vue'], resolve)
      },
      {
        path: 'SFTIntroduction',
        name: 'SFTIntroduction',
        component: resolve => require(['@/pages/sft/SFTIntroduction.vue'], resolve)
      },
      {
        path: 'TryBeforeYouBuy',
        name: 'TryBeforeYouBuy',
        component: resolve => require(['@/pages/sft/TryBeforeYouBuy.vue'], resolve)
      },
      {
        path: 'contactus',
        name: 'contactus',
        component: resolve => require(['@/pages/sft/contact.vue'], resolve)
      }
    ]
  },
  {
    'path': '/privacypolicy',
    'name': 'privacypolicy',
    'component': resolve => require(['@/pages/sft/IacceptEbuyhouses.vue'], resolve)
  },
  {
    'path': '/termsofuse',
    'name': 'termsofuse',
    'component': resolve => require(['@/pages/sft/Agreementoftheuser.vue'], resolve)
  }
]
export default SftRouteModule
