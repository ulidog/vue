import Vue from 'vue'
// base path
// ebuy.ebuyhouse.com/blog
// 线上
const BASE_PATH = 'https://ebuyhouseapi.ebuyhouse.com/'
const SOCKET_BASE = 'wss://testapi.ebuyhouse.com/'
// 学习
// const BASE_PATH = 'https://tapi.ebuyhouse.com/'
// const SOCKET_BASE = 'wss://tapi.ebuyhouse.com/'
// 测试
// const BASE_PATH = 'https://testadmin.ebuyhouse.com:8050/'
// const SOCKET_BASE = 'wss://testadmin.ebuyhouse.com:8050/'
// const BASE_PATH = 'https://testadmin.ebuyhouse.com:8060/'
// const SOCKET_BASE = 'wss://testadmin.ebuyhouse.com:8060/'
// const SOCKET_BASE = 'ws://192.168.0.147:9111/'
// ws://192.168.0.105:9111
// const BASE_PATH2 = 'http://192.168.0.189:9004/'
// 曾俊程
Vue.prototype.zjc_path = `${BASE_PATH}ebuyhouse-seek/api/`
Vue.prototype.ZJC_SERVER_PROD_PATH = `${BASE_PATH}ebuyhouse-admin/manage/`
// Vue.prototype.zjc_path = `http://192.168.0.124:8014/api/`
// 易涛消息推送
Vue.prototype.YT_PROD_PATH = `${BASE_PATH}ebuyhouse-message/`
// 黎家俊
Vue.prototype.ljj_path = `${BASE_PATH}ebuyhouse-general/web/`
Vue.prototype.LJJ_SERVER_PROD_PATH = `${BASE_PATH}ebuyhouse-server/web/`
// 苏华
Vue.prototype.SH_MAP_PROD_PATH = `${BASE_PATH}ebuyhouse-search/web/`
// Vue.prototype.LJJ_SERVER_PROD_PATH = `${BASE_PATH2}web/`
// Vue.prototype.ljj_path = `${BASE_PATH4}web/`
Vue.prototype.SH_HOUSE_PROD_PATH = `${BASE_PATH}ebuyhouse-house/web/`
// Vue.prototype.SH_HOUSE_PROD_PATH = `http://192.168.0.108:9209/web/`
// Vue.prototype.SH_HOUSE_PROD_PATH = `http://192.168.0.189:9209/`
// 吴晓亮 会员模块
Vue.prototype.wxl_path = `${BASE_PATH}ebuyhouse-member/ebh/`
// Vue.prototype.wxl_path = `http://192.168.0.124:9003/ebh/`
// Vue.prototype.WXL_LOCAL_PATH = `${BASE_PATH}ebuyhouse-deal/ebh/`
Vue.prototype.WXL_LOCAL_PATH = `${BASE_PATH}ebuyhouse-deal/ebh/`
// Vue.prototype.WXL_LOCAL_PATH = `http://192.168.0.135:9333/ebh/`
// Vue.prototype.WXL_LOCAL_PATH = `${BASE_PATH}ebuyhouse-deal/ebh/`
// 易涛
Vue.prototype.SOCKET_URI = `${SOCKET_BASE}socket/`
// 徐堂
Vue.prototype.XT_PROD_PATH = `${BASE_PATH}ebuyhouse-socket/console/`
// Vue.prototype.XT_PROD_PATH = `http://192.168.0.124:9005/console/`
Vue.prototype.ZJC_ADMIN_PROD_PATH = `${BASE_PATH}ebuyhouse-admin/admin/`
// 上传图片
Vue.prototype.ZJC_UPLOAD_IMG_PROD_PATH = `${BASE_PATH}ebuyhouse-upload/api/uploadImages`
// Vue.prototype.ZJC_UPLOAD_IMG_PROD_PATH = `http://192.168.0.124:9006/api/uploadImages`
// 上传无水印图片
Vue.prototype.ZJC_UPLOAD_IMG_NO_WATERMARK_PATH = `${BASE_PATH}ebuyhouse-upload/api/uploadImages/no/watermark`
// 上传视频
Vue.prototype.ZJC_UPLOAD_VIDEO_PROD_PATH = `${BASE_PATH}ebuyhouse-upload/api/uploadVideo`
// 获取本机定位
Vue.prototype.LJJ_FETCH_LOCAL_ADRESS = `${BASE_PATH}ebuyhouse-position/ip/visitor/get-area`
Vue.prototype.LJJ_FETCH_AREA_CODE = `${BASE_PATH}ebuyhouse-position/ip/visitor/get-country`
// 高德地图 地理编码
Vue.prototype.SH_FETCH_AMAP_GEO = `${BASE_PATH}ebuyhouse-position/maps/geocode/geo`
