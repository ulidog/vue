/**
 * @time 2019-3-6 更改
 * 将对房屋相关数据进行分类处理
 * 分成控制系和数据系
 **/
let UP_SERCHFROM_TIMEOUT = null
let UP_MAPCONFIG_TIMEOUT = null
export default {
  state: {
    // 访问数据处理 => 仅用于筛选接口的使用
    searchFrom: {},
    // 地图配置控制 => 用于控制地图中心点 地图缩放比例
    mapConfig: {},
    // 房屋右侧显示list集合
    houseList: [],
    // 左侧地图marker初始化成功后的实例化对象
    markerList: [],
    // 初始化的地图对象
    mapInit: {},
    // 当前右侧地图Hover上的房源
    hoverHouse: {},
    // 右侧分页数据管理
    rightPageConfig: {}
  },
  getters: {
    searchFrom: state => state.searchFrom,
    mapConfig: state => state.mapConfig,
    houseList: state => state.houseList,
    markerList: state => state.markerList,
    mapInit: state => state.mapInit,
    hoverHouse: state => state.hoverHouse,
    rightPageConfig: state => state.rightPageConfig
  },
  mutations: {
    // 更新搜索参数
    UPDATA_SERCH_FROM (state, form = {deep: false}) {
      const _self = this
      const _this = this._vm
      console.log('开始存储搜索数据流')
      // 必须确保数据库表等已经初始化 再去做更新操作
      if (_this.$ebuyhouseDB.db) {
        if (Object.keys(form).length === 0) {
          // 清空操作 当数据插入或者访问为空时 清空所有搜索条件
          _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapSerchParams', (e) => {
            if (e) {
              _this.$indexDB.deleteData(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapSerchParams')
              this.commit('CLEAR_SERCH_FROM', {})
            }
          })
        } else {
          // 更新操作
          // 是否深度更改替换 默认false 仅对当前某一次进行深度替换
          if (!form.deep) {
            state.searchFrom = Object.assign({}, state.searchFrom, form)
          } else {
            state.searchFrom = Object.assign({}, form, {deep: false})
          }
          _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapSerchParams', (e) => {
            if (!e) {
              _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'buyOrRent', {id: 'googleMapSerchParams', data: state.searchFrom})
            } else {
              _this.$indexDB.putData(_this.$ebuyhouseDB.db, 'buyOrRent', {id: 'googleMapSerchParams', data: state.searchFrom})
            }
          })
        }
      } else {
        clearTimeout(UP_SERCHFROM_TIMEOUT)
        UP_SERCHFROM_TIMEOUT = setTimeout(() => {
          _self.commit('UPDATA_SERCH_FROM', form)
        }, 500)
      }
    },
    // 清空更新操作 或者直接更新数据 不经过缓存机制 可以后用作无痕模式
    CLEAR_SERCH_FROM (state, info = {deep: false}) {
      state.searchFrom = info
    },
    // 更新地图配置
    UPDATA_MAP_CONFIG (state, info) {
      const _self = this
      const _this = this._vm
      console.log('开始存储地图配置数据流')
      // 必须确保数据库表等已经初始化 再去做更新操作
      if (_this.$ebuyhouseDB.db) {
        if (Object.keys(info).length === 0) {
          // 清空操作 异步处理重置成默认定位
          // _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapGMapConfig', (e) => {
          //   if (e) {
          //     _this.$indexDB.deleteData(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapGMapConfig')
          //     this.commit('CLEAR_SERCH_FROM', {})
          //   }
          // })
        } else {
          // 更新操作
          // 是否深度更改替换 默认false 仅对当前某一次进行深度替换
          if (!info.deep) {
            state.mapConfig = Object.assign({}, state.mapConfig, info)
          } else {
            state.mapConfig = Object.assign({}, info, {deep: false})
          }
          _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'buyOrRent', 'googleMapGMapConfig', (e) => {
            if (!e) {
              _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'buyOrRent', {id: 'googleMapGMapConfig', data: state.mapConfig})
            } else {
              _this.$indexDB.putData(_this.$ebuyhouseDB.db, 'buyOrRent', {id: 'googleMapGMapConfig', data: state.mapConfig})
            }
          })
        }
      } else {
        clearTimeout(UP_MAPCONFIG_TIMEOUT)
        UP_MAPCONFIG_TIMEOUT = setTimeout(() => {
          _self.commit('UPDATA_MAP_CONFIG', info)
        }, 500)
      }
    },
    UPDATA_HOUSE_LIST: (state, list) => {
      state.houseList = list
    },
    UPDATA_MARKER_LIST: (state, list) => {
      state.markerList = list
    },
    UPDATA_MAP_INIT: (state, object) => {
      state.mapInit = Object.assign({}, state.mapInit, object)
    },
    UPDATA_HOVER_HOUSE: (state, object) => {
      state.hoverHouse = object
    },
    UPDATA_RIGHT_PAGE_CONFIG: (state, object) => {
      state.rightPageConfig = object
    }
  },
  // 异步数据管理
  actions: {}
}
