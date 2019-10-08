/**
 * @QACommunityRouteModule
 * 问答模块
 */
const QACommunityRouteModule = [
  // 问答模块
  {
    'path': '/QACommunity',
    'meta': {'title': 'Home of Q&As'},
    'component': resolve => require(['@/pages/QACommunity/QACommunity.vue'], resolve),
    'children': [
      // 问答社区默认路由
      {
        'path': '/',
        'meta': {'title': 'Home of Q&As'},
        'redirect': 'QAIndex'
      },
      // 问答社区首页
      {
        'path': 'QAIndex',
        'name': 'QAIndex',
        'meta': {'title': 'Home of Q&As'},
        'component': resolve => require(['@/pages/QACommunity/QAIndex/QAIndex.vue'], resolve)
      },
      // 问答社区热点
      {
        'path': 'QADetails',
        'name': 'QADetails',
        'meta': {'title': 'Hot topics'},
        'component': resolve => require(['@/pages/QACommunity/details/index.vue'], resolve)
      },
      // 问答社区分类
      {
        'path': 'QADTypeTails',
        'name': 'QADTypeTails',
        'meta': {'title': 'Questions category'},
        'component': resolve => require(['@/pages/QACommunity/typeDetails/index.vue'], resolve)
      },
      // 问答详情
      {
        'path': 'QAInfo',
        'name': 'QAInfo',
        'meta': {'title': 'Details of the question'},
        'component': resolve => require(['@/pages/QACommunity/QAInfo/index.vue'], resolve)
      },
      // 问答社区发布问题
      {
        'path': 'askQuestions',
        'name': 'askQuestions',
        'meta': {'title': 'Ask questions'},
        'component': resolve => require(['@/pages/QACommunity/askQuestions/askQuestions.vue'], resolve)
      },
      // 我的问答
      {
        'path': 'myQA',
        'name': 'myQA',
        'meta': {'title': ''},
        'component': resolve => require(['@/pages/QACommunity/myQA/index.vue'], resolve)
      }
    ]
  }
]

export default QACommunityRouteModule
