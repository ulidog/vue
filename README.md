#ebuyhouse project
#view location
--- https://test.ebuyhouse.com:10003 ---
--- https://www.ebuyhouse.com ---
#project setting
`bash
$ git clone 'http://120.78.196.201/ebuyhouse-cg/ebuyhouse-pc.git'
$ npm install -g yarn
$ yarn
$ yarn start
end`
#project info
floder
`
  #start
  components => 所有组件的存放地址 对应每个页面的组件位置
    buying => 房屋筛选的模块组件
    buyRequestList => 求购列表组件
    buyRequestDetail => 求购详情组件
    common => 公共组件用于全局类别组件 ex；页眉 页尾 登录 注册 弹窗等
    consultation => 咨询类组件 （暂时已不使用）
    contract => 交易流程使用的公共组件 少量
    helpCenter => 帮助中心模块组件
    index => 首页组件
    listing => 租或者购的房屋详情页面组件
    offer => 购买者或者租房者确认offer订单组件
    QACs => 问答类社区模块
    release => 发布房源，求租求购等组件
    rentInRequestDetail => 求租详情组件
    rentInRequestList => 求租列表组件
    servce => 服务模块组件
    userCenter => 用户中心组件模块
  directive => 自定义指令存放位置
  filter => 过滤
  pages => 与组件对应页面
  router => 模块化路由
  store => 状态管理器
    buying => 用于房屋筛选的状态管理
    contract => 交易流程模块管理
      pageStatus => 页面状态管理
      process => 当前订单进程管理
    message => 即时通讯状态管理
    userInfo => 用于动态管理用户数据
  utils => 公共部分东西
    config => 总配置文件 用于修改接口地址 发布前需要修改
    googleAnalytics => 用于谷歌统计 不管
    indexedDB => indexedDB 本地数据库的封装
      global => 全局对象表 存储对应的全局参数
      googleMap => 谷歌地图表 用于存储地图描边数据
      userInfo => 用户表 存储当前用户的数据
    plugin => 本地插件处理 自定义插件等等
    server => 统一请求封装
    session => 本地session封装处理
    index.js => 公共方法
  #end
`
#vue => v2.5.2
$ npm install vue@2.5.2 -g
#npm => v6.5.0
`请到指定地址下载 node.js nodejs版本 v9.6.0`
#部署
$ yarn build
打包前请先查看/utils/config/index.js里面的全局配置
测试地址是'https://testadmin.ebuyhouse.com:8050/'
正式地址是'https://testapi.ebuyhouse.com/'
发包前请务必检查
！！！！！！！！！！！！！！！
将打包后的dist包交予后台或者运营发包
发包前请务必先交予上级管理进行审核
并测试通过后即可发包
