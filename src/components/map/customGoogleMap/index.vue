<template>
  <section class="map" ref="mapContent" v-loading="!LOADING_CONFIG.mapLoading">
    <vue-googlemap :center="center" :zoom="zoom" :minZoom="4" :restriction="restriction" :maxZoom="22" :events="mapEvents" @initMap="initMap" :mapOptions="ComponentInit">
      <!-- :key="`mark_${mark.id}`" -->
      <vue-googlemap-marker
        v-for="(mark, index) in marksList"
        :key="`mark_${index}`"
        :markerList="marksList"
        :markerInfo="mark"
        :events='events'
        :icon="mark.icon"
        :zIndex="mark.zIndex"
        :position='{lat: mark.latitude, lng: mark.longitude}'
        :ref="`mark_${index}`"
        :markRandom="markRandom"
        @markLoad="markLoadChange"
        @markClick="hrefChange"
        @markMouseover="markMouseover"
        @markMouseout="markMouseout">
      </vue-googlemap-marker>
      <vue-googlemap-overlayView :content="infoWindowConfig.content"
        :closeBoxMargin="'0'"
        :boxStyle="{width: 'auto', background: 'transparent'}"
        closeBoxStyle="display: none;"
        pane="floatPane"
        @infoBox="infoBoxChange"
        @closeClickChange="closeClickChange">
      </vue-googlemap-overlayView>
      <vue-googlemap-polygon
        :paths="patsLists"
        :editable="false"
        :fillColor="'transparent'"
        :fillOpacity="0"
        :strokeWeight="3"
        :strokeColor="'#1281fc'"
        :events='events'
        @change='getChange'>
      </vue-googlemap-polygon>
    </vue-googlemap>
  </section>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { deepCopy } from '@/utils'
import vueGooglemap from 'vue2-customer-googlemap'
Vue.use(vueGooglemap)
vueGooglemap.initGooglemap({
  // AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs
  // key: 'AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs',
  key: 'AIzaSyDmcOWTFjYWL4NSNFW72jxNp3pkFZY6Rs4',
  language: 'en',
  v: '3.36'
})
export default {
  data () {
    return {
      // 传入实例化Vue
      ComponentInit: this,
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 11,
      mapEvents: {
        zoom_changed (_this, __this) {
          // console.log(_this, __this)
          // console.log(_this.getZoom())
          __this.fetchZoomChange(_this)
        },
        resize (_this, __this, ev) {
          // console.log(ev)
        },
        dragend (_this, __this, ev) {
          __this.fetchZoomChange(_this)
        }
        // bounds_changed
        // center_changed
        // click
        // dblclick
        // drag
        // dragend
        // dragstart
        // heading_changed
        // idle
        // maptypeid_changed
        // mousemove
        // mouseout
        // mouseover
        // projection_changed
        // resize
        // rightclick
        // tilesloaded
        // tilt_changed
        // zoom_changed
      },
      controls: {},
      events: {
        click (_e, _this) {
          console.log(0)
        }
      },
      infoEvents: {
        closeclick (_e, _this) {
          console.log(0)
        }
      },
      restriction: {
        latLngBounds: {
          east: 180,
          north: 90,
          south: -90,
          west: -180
        },
        strictBounds: true
      },
      submitForm: {},
      marksList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 300
      },
      infoWindowConfig: {
        content: null
      },
      windowInfo: {},
      // 地图实列
      $Map: null,
      $infoBox: null,
      $oldMarker: null,
      markerListObject: [],
      markerLists: [],
      // 画线
      patsLists: [],
      // 通过该属性去让marker渲染
      markRandom: 0,
      // 本地定位详情
      locationConfig: null,
      // 定义变量第一次不让其调用
      isFirstFetchStatus: false,
      // 设置第一次地图加载时的延迟处理
      initHouseTimer: null,
      // 地图配置延迟处理
      initMaptimer: null,
      // loading
      LOADING_CONFIG: {},
      // 是否第一次加载
      isFirstGoPage: false,
      // hover 上去后的部分参数 必须与之前的数据进行重合
      hoverParams: {
        zIndex: null,
        icon: null
      },
      // 延迟加载拖拽数据
      isMinTimeOut: null,
      // 数据多次请求延迟 清除以前的请求
      PC_LINK_TIMER: null,
      // 用于性控制地图暂停一次缩放后是否加载列表数据开关
      toggleFirstZoomChangeState: true,
      // 用于控制暂停一次获取数据状态 仅用于表单数据改变
      pauseOnceHouse: true,
      // 用于控制暂停一次更新地图数据状态 仅用于地图定位缩放管理
      pauseOnceMap: true,
      // 定义一个定时器超出范围
      maxtimerout: 10000,
      // 当前定时器的循环次数
      metimerout: 0,
      // 定义调用获取房源的数量 用于规避城市ID问题
      mapHouseNumber: 0,
      // 是否根据路由参数定位
      isRouterParamsPosition: false,
      // 取消请求
      source: null
    }
  },
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom',
      mapConfig: 'mapConfig',
      mapInit: 'mapInit',
      hoverHouse: 'hoverHouse',
      houseList: 'houseList'
    })
  },
  props: {
    loadingConfig: {
      default: () => {
        return {
          gobalLoading: true,
          mapLoading: true,
          listLoading: true
        }
      },
      type: Object
    }
  },
  watch: {
    mapConfig: {
      handler (_info, _old) {
        const _status = deepCopy(JSON.stringify(_info)) !== deepCopy(JSON.stringify(_old))
        if (_status) {
          if (_info.flag || !this.isFirstGoPage) {
            console.log('开始初始化地图设置啦~~~~')
            if (this.pauseOnceMap) {
              this.locationPosition(_info)
            } else {
              // 跳过一次地图初始化配置
              console.log('成功跳过一次地图配置')
              this.pauseOnceMap = true
              this.LOADING_CONFIG.mapLoading = true
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    hoverHouse: {
      handler (_new, _old) {
        if (_new.status) {
          console.log(_new)
          // this.fetchInitMarkerObject(_new)
          this.markMouseover(this.fetchInitMarkerObject(_new), this.fetchMarkerObject(_new), Object.assign({}, _new, {isHover: true}))
        } else {
          this.markMouseout(this.fetchInitMarkerObject(_old), this.fetchMarkerObject(_old), Object.assign({}, _old, {isHover: true}))
        }
      },
      deep: true
    },
    searchFrom: {
      handler (_new, _old) {
        // const _this = this
        const _status = deepCopy(JSON.stringify(_new)) !== deepCopy(JSON.stringify(_old))
        // console.log(deepCopy(JSON.stringify(_new)) === deepCopy(JSON.stringify(_old)))
        if (_status) {
          console.log('侦听到搜索的数据改变')
          // console.log()
          console.log(_new)
          if (this.pauseOnceHouse) {
            // if (!_new.pauseOnceCityID) {
            this.fetchHouseList()
            // } else {
            //   setTimeout(() => {
            //     // _this.UPDATA_SERCH_FROM(Object.assign(_new, {pauseOnceCityID: false}))
            //     console.log('成功跳过一次数据获取')
            //     _this.pauseOnceHouse = false
            //   }, 1000)
            // }
          } else {
            // 成功跳过一次数据获取
            console.log('成功跳过一次数据获取')
            this.pauseOnceHouse = true
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      'UPDATA_HOUSE_LIST': 'UPDATA_HOUSE_LIST',
      'UPDATA_MARKER_LIST': 'UPDATA_MARKER_LIST',
      'UPDATA_MAP_INIT': 'UPDATA_MAP_INIT',
      'UPDATA_MAP_CONFIG': 'UPDATA_MAP_CONFIG',
      'UPDATA_SERCH_FROM': 'UPDATA_SERCH_FROM'
    }),
    cancelQuest () {
      if (typeof this.source === 'function') {
        this.source()
      }
    },
    formatParams (_info) {
      // _info
      let cloneParams = Object.assign({}, _info)
      let checkNum = 0
      // 设置默认缺省值
      cloneParams['isComplete'] = false
      // 判断租购类型
      if (cloneParams.type === 'buy') {
        cloneParams['type'] = true
      } else {
        cloneParams['type'] = false
      }
      // 提取选择城市参数
      Object.keys(cloneParams).map(key => {
        if (cloneParams[key] && cloneParams[key].toString().includes('ebuy-')) {
          const index = cloneParams[key].indexOf('-')
          cloneParams[key] = cloneParams[key].substring(index + 1).toString()
          checkNum++
        }
        if (!cloneParams[key]) {
          cloneParams[key] = null
          cloneParams['isComplete'] = true
        }
      })
      if (checkNum < 6) {
        return {type: cloneParams.type}
      }
      return cloneParams
    },
    // 自动获取数据函数
    fetchHouseList (options = {}) {
      const _this = this
      // _this.FETCH_URL_QUERY()
      // 打开loading列表开关
      _this.LOADING_CONFIG.listLoading = true
      _this.$emit('_loadingChange', _this.LOADING_CONFIG)
      let cloneFrom
      if (_this.$Map && _this.getArcR_Line() && _this.getMapCenterPostion()) {
        clearTimeout(_this.PC_LINK_TIMER)
        // console.log(_this.searchFrom, _this.submitForm, _this.mapConfig)
        console.log(_this.getMapCenterPostion())
        let deepCopySearchFrom = deepCopy(_this.searchFrom)
        _this.PC_LINK_TIMER = setTimeout(() => {
          cloneFrom = Object.assign({},
            // {latitude: _this.mapConfig.lat, longitude: _this.mapConfig.lng},
            deepCopySearchFrom,
            _this.submitForm,
            {houseType: deepCopySearchFrom.housetypeArray instanceof Array ? deepCopySearchFrom.housetypeArray.join(',') : null},
            {labelId: deepCopySearchFrom.labels instanceof Array ? deepCopySearchFrom.labels.join(',') : null},
            _this.getMapCenterPostion(),
            options,
            {distance: _this.getArcR_Line(), pageSize: 500})
          // console.log('****************')
          // console.log(cloneFrom)
          // console.log(_this.submitForm)
          // if (cloneFrom.lat && cloneFrom.lng && !_this.isFirstGoPage) {
          //   // 设置中心点
          //   _this.$Map.setCenter({lat: Number(cloneFrom.lat), lng: Number(cloneFrom.lng)})
          //   // 设置是否第一次进入地图页面
          //   _this.isFirstGoPage = true
          // } else {
          //   // 获取中心点
          //   Object.assign(cloneFrom, {latitude: _this.$Map.getCenter().lat(), longitude: _this.$Map.getCenter().lng()})
          // }
          // console.log(isFinite(cloneFrom.maxPrice))
          if (!isFinite(cloneFrom.maxPrice)) {
            delete cloneFrom.maxPrice
          }
          if (cloneFrom.cityId && cloneFrom.cityId.length < 3) {
            delete cloneFrom.cityId
            delete cloneFrom.stateId
          }
          if (!deepCopySearchFrom.pauseOnceCityID) {
            if (cloneFrom.cityId || cloneFrom.stateId) {
              delete cloneFrom.cityId
              delete cloneFrom.stateId
            }
          } else {
            _this.UPDATA_SERCH_FROM(Object.assign(deepCopySearchFrom, {pauseOnceCityID: false}))
            console.log('开启跳过一次数据获取')
            _this.pauseOnceHouse = true
          }
          if (cloneFrom.saleOrRents && cloneFrom.saleOrRents.length !== 0) {
            cloneFrom.saleOrRent = cloneFrom.saleOrRents.reduce((a, b) => a + b)
          }
          // 设置数量
          _this.mapHouseNumber++
          // 删除后台处理不了的空数据
          delete cloneFrom.labels
          delete cloneFrom.housetypeArray
          delete cloneFrom.saleOrRents
          // 删除extKey
          if (this.params.type) {
            delete cloneFrom.extKey
          }
          // 关闭上次请求
          _this.cancelQuest()
          _this.$axios({
            method: 'GET',
            url: `${this.SH_MAP_PROD_PATH}thouses/select/list-map`,
            params: cloneFrom,
            cancelToken: new axios.CancelToken(function executor (c) { // 设置 cancel token
              _this.source = c
            })
          })
            .then(res => {
              // console.log(res.data.data.rows)
              if (res.data.success) {
                const _map = res.data.data.map || []
                // 更改第一次进入页面状态
                _this.isFirstGoPage = true
                _this.UPDATA_MARKER_LIST([])
                _this.markerLists = []
                _this.markerListObject = []
                _this.marksList = _map.map((item, index) => {
                  if (item.countHouse === 1) {
                    item.icon = '/static/img/buying/icons/weixuan.png'
                  } else if (item.countHouse < 10) {
                    item.icon = `/static/img/buying/icons/building${item.countHouse}.png`
                  } else {
                    item.icon = `/static/img/buying/icons/building9+.png`
                  }
                  item.zIndex = index
                  return item
                }) || []
                _this.UPDATA_HOUSE_LIST(res.data.data.list || [])
                _this.$emit('_pageConfig', {total: res.data.data.total})
                _this.LOADING_CONFIG.mapLoading = true
                _this.markRandom = parseInt(Math.random() * 1000000000)
                // 关闭loading开关
                setTimeout(() => {
                  _this.LOADING_CONFIG.listLoading = false
                  _this.$emit('_loadingChange', _this.LOADING_CONFIG)
                }, 500)
              } else {
                // 更改第一次进入页面状态
                _this.isFirstGoPage = true
              }
            })
            .catch(err => {
              if (err) {
                console.log(err.message)
                // 关闭loading开关
                setTimeout(() => {
                  // 更改第一次进入页面状态
                  _this.isFirstGoPage = true
                  _this.LOADING_CONFIG.mapLoading = true
                  _this.LOADING_CONFIG.listLoading = false
                  _this.$emit('_loadingChange', _this.LOADING_CONFIG)
                }, 500)
              }
            })
        }, 500)
      } else {
        clearTimeout(this.initHouseTimer)
        this.metimerout = this.metimerout + 1
        if (this.metimerout < this.maxtimerout) {
          this.initHouseTimer = setTimeout(() => {
            _this.fetchHouseList(options)
          }, 500)
        } else {
          this.$message.error('Please connect to the internet and refresh！')
        }
      }
      // 超时10s关闭loading开关
      setTimeout(() => {
        _this.LOADING_CONFIG.listLoading = false
        _this.$emit('_loadingChange', _this.LOADING_CONFIG)
      }, 10000)
    },
    locationPosition (_info) {
      console.log('开始设置地图')
      // console.log(_info)
      // console.log(this.$Map, this.isFirstGoPage)
      // console.log(this.$Map && this.isFirstGoPage)
      const _this = this
      if (this.$Map && this.isFirstGoPage) {
        if (this.isRouterParamsPosition) {
          this.isRouterParamsPosition = false
          this.$Map.setCenter({lat: Number(this.params.latitude), lng: Number(this.params.longitude)})
          this.center = {lat: Number(this.params.latitude), lng: Number(this.params.longitude)}
          this.$Map.setZoom(this.params.zoom || 11)
        } else {
          if (!_info.isSearch) {
            console.log('成功进入选择城市方式搜索')
            if (_info.lat && _info.lng) {
              this.$Map.setCenter({lat: Number(_info.lat), lng: Number(_info.lng)})
              this.center = {lat: Number(_info.lat), lng: Number(_info.lng)}
            } else {
              this.$Map.setCenter({lat: Number(_info.xlat), lng: Number(_info.xlng)})
              this.center = {lat: Number(_info.xlat), lng: Number(_info.xlng)}
            }
            this.LOADING_CONFIG.mapLoading = false
            // 是否获取定位失败
            // console.log(_info.isDefault)
            if (_info.isDefault) {
              console.log('进入了')
              console.log(this.searchFrom.cityId)
              console.log('跳过一次移动或者缩放找房')
              this.toggleFirstZoomChangeState = false
              if (this.searchFrom.cityId && this.searchFrom.cityId.length === 2) {
                this.$Map.setZoom(7)
                console.log('已经设置了地图大小-----小')
              } else {
                this.$Map.setZoom(11)
                console.log('已经设置了地图大小----大')
              }
              this.LOADING_CONFIG.mapLoading = true
            } else {
              this.$Map.setZoom(_info.zoom || _info.isMapSize)
            }
            this.$forceUpdate()
          } else {
            console.log('成功进入全美国关键字搜索')
            // console.log('跳过一次移动或者缩放找房')
            // this.toggleFirstZoomChangeState = false
            this.$Map.setCenter({lat: Number(_info.xlat), lng: Number(_info.xlng)})
            this.LOADING_CONFIG.mapLoading = false
            this.center = {lat: Number(_info.xlat), lng: Number(_info.xlng)}
            // console.log('跳过一次移动或者缩放找房')
            // this.toggleFirstZoomChangeState = false
            // 是否获取定位失败
            this.$Map.setZoom(_info.isMapSize)
            // 跳过一次地图配置
            this.pauseOnceMap = false
            // 更改地图配置 将搜索的改成非搜索
            this.UPDATA_MAP_CONFIG(Object.assign({}, this.mapConfig, {isSearch: false}))
            this.$forceUpdate()
          }
        }
        // let InfoCase = {}
        // InfoCase['keyWord'] = _info.cityAscii
        // InfoCase['cityId'] = _info.cityId
        // InfoCase['stateId'] = _info.stateId
        // 描边相关 暂时不要删除
        // const _this = this
        // this.$indexDB.getDataByKey(this.$ebuyhouseDB.db, 'googleMap', _info.cityId, (e) => {
        //   if (e) {
        //     if (_info.cityId.length > 2) {
        //       this.$Map.setZoom(11)
        //     } else {
        //       this.$Map.setZoom(7)
        //     }
        //     this.patsLists = e.data
        //   } else {
        //     console.log(_info.cityId + '开始获取描边')
        //     this.fetchCityPolygon(_info.cityId)
        //   }
        // })
        // if (!_info.StateType) {
        //   this.fetchHouseList(Object.assign({}, this.searchFrom, InfoCase))
        // }
      } else {
        clearTimeout(_this.initMaptimer)
        _this.metimerout = _this.metimerout + 0.2
        if (_this.metimerout < _this.maxtimerout) {
          _this.initMaptimer = setTimeout(() => {
            _this.locationPosition(_info)
          }, 100)
        } else {
          _this.$message.error('Please connect to the internet and refresh！')
        }
      }
    },
    // 获取地图中心点坐标 如果没有获取到 则使用mapconfig参数
    getMapCenterPostion () {
      if (this.$Map.getCenter()) {
        if (this.$Map.center.lat() !== 0 && this.getLng(this.$Map.center.lng() !== 0)) {
          return {
            latitude: this.getLat(this.$Map.center.lat()),
            longitude: this.getLng(this.$Map.center.lng())
          }
        } else {
          return {
            latitude: this.mapConfig.lat,
            longitude: this.mapConfig.lng
          }
        }
      } else {
        return null
      }
    },
    /**
     * 谷歌地图计算两个坐标点的距离
     * @param lng1  经度1
     * @param lat1  纬度1
     * @param lng2  经度2
     * @param lat2  纬度2
     * @return 距离（千米）
     */
    getDistance (lng1, lat1, lng2, lat2) {
      let EARTH_RADIUS = 6378.137
      var radLat1 = this.rad(lat1)
      var radLat2 = this.rad(lat2)
      var a = radLat1 - radLat2
      var b = this.rad(lng1) - this.rad(lng2)
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
      s = s * EARTH_RADIUS
      s = Math.round(s * 10000) / 10000
      return s
    },
    getArcR_Line () {
      if (this.$Map.getBounds()) {
        let bounds = this.$Map.getBounds()
        // 获取地图的角
        let southWest = bounds.getSouthWest()
        // let northEast = bounds.getNorthEast()
        let mapCenter = this.$Map.getCenter()
        let LINE_1 = this.getDistance(
          mapCenter.lng(),
          mapCenter.lat(),
          southWest.lng(),
          mapCenter.lat()
        )
        let LINE_2 = this.getDistance(
          mapCenter.lng(),
          mapCenter.lat(),
          mapCenter.lng(),
          southWest.lat()
        )
        // console.log(LINE_1 > LINE_2 ? LINE_2 : LINE_1)
        return LINE_1 > LINE_2 ? LINE_2 : LINE_1
      } else {
        return null
      }
    },
    // 将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians
    rad (d) {
      return d * Math.PI / 180.0
    },
    FETCH_URL_QUERY () {
      try {
        this.params = this.formatParams(this.$route.params)
        console.log('map----params')
        console.log(this.params)
        if (this.params.latitude && this.params.longitude) {
          this.isRouterParamsPosition = true
        }
        if (this.params.type) {
          this.submitForm.saleOrRent = 1
          this.submitForm.dealType = 1
        } else {
          this.submitForm.saleOrRent = 5
          this.submitForm.dealType = 5
        }
      } catch (err) {}
    },
    hrefChange (_info) {
      const __info = this.searchListHouse(_info)
      if (Number(_info.countHouse) > 1) {
        this.$store.commit('SHOW_HOUSE_LAYER', {
          status: true,
          countHouse: _info.countHouse,
          data: {
            latitude: _info.latitude,
            longitude: _info.longitude,
            saleOrRent: this.submitForm.saleOrRent
          }
        })
      } else {
        this.$router.push({
          path: '/listing/details/' + __info.id
        })
      }
      // const __info = this.searchListHouse(_info)
      // let routeData = this.$router.resolve({
      //   name: 'listing-details',
      //   query: {ebuyhouse: this.$base64.encode(JSON.stringify({houseId: __info.id}))}
      // })
      // window.open(routeData.href, '_blank')
    },
    // 获取指定实例化marker对象
    fetchMarkerObject (_info) {
      let RT_INFO
      if (_info.status) {
        const str1 = _info.latitude.toString() + _info.longitude.toString()
        this.markerLists.map((item, index) => {
          const str2 = item.markerInfo.latitude.toString() + item.markerInfo.longitude.toString()
          if (str1 === str2) {
            RT_INFO = item
          }
          // if (item.) {}
        })
      }
      return RT_INFO
    },
    fetchInitMarkerObject (_info) {
      let RT_INFO
      if (_info.status) {
        const str1 = _info.latitude.toString() + _info.longitude.toString()
        this.markerListObject.map((item, index) => {
          const str2 = item.latitude.toString() + item.longitude.toString()
          if (str1 === str2) {
            RT_INFO = item
          }
          // if (item.) {}
        })
      }
      return RT_INFO
    },
    markChange (_info, __info) {
      // console.log(_info)
      // console.log(_info, __info)
      if (this.windowInfo.icon) {
        if (_info.countHouse === 1) {
          this.windowInfo.icon = '/static/img/buying/icons/weixuan.png'
        } else if (_info.countHouse < 10) {
          this.windowInfo.icon = `/static/img/buying/icons/building${_info.countHouse}.png`
        } else {
          this.windowInfo.icon = `/static/img/buying/icons/building9+.png`
        }
      }
      // this.windowInfo = _info
      this.infoWindowConfig.content = `
          <style>
            /* marker样式 */
            .cardListItems {
              width: 16.25em;
              max-width: 240px;
              height: 19.375em;
              background-color: #fff;
              border-radius: 5px;
              overflow: hidden;
              margin-bottom: 1.5625em
            }
            .cardListItems .header-img {
              height: 12.1875em;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .cardListItems .header-img img {
              height: 100%;
              width: 100%;
            }
            .cardListItems .Whole {
              position: relative;
            }
            .cardListItems .Whole:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 0;
              border-width: 4.375em 4.375em 0 0;
              border-style: solid;
              border-color: #fea416 transparent transparent transparent;
            }
            .cardListItems .Whole:after {
              content: 'W';
              position: absolute;
              top: 0.4em;
              left: 0.4em;
              color: #fff;
              font-size: 1.5em;
            }
            .cardListItems .Single {
              position: relative;
            }
            .cardListItems .Single:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              height: 0;
              border-width: 4.375em 4.375em 0 0;
              border-style: solid;
              border-color: #fe590e transparent transparent transparent;
            }
            .cardListItems .Single:after {
              content: 'S';
              position: absolute;
              top: 0.4em;
              left: 0.4em;
              color: #fff;
              font-size: 1.5em;
            }
            .cardListItems .footer-intro {
              height: 7.1875em;
              padding: 0.375em;
              display: flex;
              flex-direction: column;
            }
            .cardListItems .footer-intro h4 {
              font-size: 1.25em;
              font-weight: bold;
              color: #444;
              height: 2.5em;
            }
            .cardListItems .mini {
              font-size: .875em;
            }
            .cardListItems .intro {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height: 1.25em;
              font-size: 1em;
              width: 100%;
              color: #666;
              margin-bottom: .5em;
            }
            .cardListItems .icons-items {
              display: flex;
              // flex: 0 0 calc( 100% / 3 );
              justify-content: flex-start;
              align-items: center;
            }
            .cardListItems .icons-items img {
              margin-right: 5px;
              width: 1em;
              height: 1em;
            }
            .cardListItems .icons-items .target {
              margin: 0 5px;
              display: inline-block;
            }
            .cardListItems .art-itro article {
              font-size: 0.75em;
              color: #666;
            }
          </style>
          <li class="cardListItems">
            <a href="${window.location.origin}/listing/details/${__info.id}">
              <header class="header-img">
                <!--  ${__info.dealType === 3 ? 'Single' : ''} ${__info.dealType === 2 ? 'Whole' : ''} -->
                <img src="${__info.imgUrl}" alt="${__info.street}">
              </header>
              <footer class="footer-intro">
                <h4><span class="mini">$ </span>${__info.viewPrice} ${__info.dealType !== 1 ? '/mo' : ''}</h4>
                <section class="intro">
                  <section class="icons-items">
                    <!--<img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms">-->
                    <span>${__info.bedroom === 'studio' ? __info.bedroom : (__info.bedroom + ' bds')}</span>
                  </section>
                  <section class="icons-items">
                    <!--<img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms">-->
                    <span class="target">●</span>
                    <span>${__info.bathroom} ba</span>
                  </section>
                  <section class="icons-items">
                    <!--<img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft">-->
                    <span class="target">●</span>
                    <span>${__info.viewLivingSqft} sqft</span>
                  </section>
                </section>
                <footer class="art-itro">
                  <article>${__info.street}</article>
                </footer>
              </footer>
            </a>
          </li>`

      if (_info.countHouse === 1) {
        _info.icon = '/static/img/buying/icons/xuanzhong.png'
      } else if (_info.countHouse < 10) {
        _info.icon = `/static/img/buying/icons/building${_info.countHouse}_pre.png`
      } else {
        _info.icon = `/static/img/buying/icons/building9+_pre.png`
      }
      _info.zIndex = 99999
      // this.$refs.mark_window_info.open(this.$refs[`mark_${_info.id}`].$marker)
    },
    fetchMarkesListDistance (_info) {
      if (!this.isFirstFetchStatus) {
        this.isFirstFetchStatus = true
        return
      }
      const _this = this
      // _this.FETCH_URL_QUERY()
      delete _this.searchFrom.saleOrRent
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/distance/house`, {params: Object.assign({}, _info, _this.submitForm, _this.pageConfig)})
        .then(res => {
          // console.log(res.data.data.rows)
          if (res.data.success) {
            _this.UPDATA_MARKER_LIST([])
            _this.markerLists = []
            _this.marksList = res.data.data.rows.map(item => {
              item.icon = '/static/img/buying/icons/weixuan.png'
              item.id = item.thousesId
              return item
            })
            _this.UPDATA_HOUSE_LIST(_this.marksList)
            _this.LOADING_CONFIG.mapLoading = true
            _this.markRandom = parseInt(Math.random() * 1000000000)
          }
        })
    },
    searchListHouse (_info) {
      return this.houseList.map(item => item).filter(item => {
        return `${item.latitude}${item.longitude}` === `${_info.latitude}${_info.longitude}`
      })[0]
    },
    markMouseover (_info, _$marker, _infos = {isHover: false}) {
      console.log(_$marker)
      if (_info) {
        let __info = this.searchListHouse(_info)
        // console.log(_info)
        // 开始处理 进行缓存之前数据
        this.hoverParams = deepCopy(_info)
        if (_infos.isHover) {
          __info = _infos
        }
        // console.log(__info)
        // 修改元数据
        this.markChange(_info, __info)
        this.$infoBox.open(this.$Map, _$marker)
        this.$oldMarker = _$marker
        this.UPDATA_MAP_INIT({oldMarker: _$marker})
      }
    },
    markMouseout (_info, _$marker) {
      if (_info) {
        // this.$refs.mark_window_info.close()
        this.closeChange(_info)
        this.$infoBox.close(this.$Map, _$marker)
      }
    },
    closeClickChange () {
      // this.$infoBox.close()
      // this.closeChange(this.windowInfo)
    },
    closeChange (_info) {
      // 回退元数据
      // _info = this.hoverParams
      Object.assign(_info, this.hoverParams)
      // if (_info.countHouse === 1) {
      //   _info.icon = '/static/img/buying/icons/weixuan.png'
      // } else if (_info.countHouse < 10) {
      //   _info.icon = `/static/img/buying/icons/building${_info.countHouse}.png`
      // } else {
      //   _info.icon = `/static/img/buying/icons/building9+.png`
      // }
      // _info.zIndex = 1
    },
    fetchZoomChange (_this) {
      const __this = this
      if (!this.toggleFirstZoomChangeState) {
        this.toggleFirstZoomChangeState = true
        return
      }
      if (this.isMinTimeOut) {
        clearTimeout(this.isMinTimeOut)
      }
      this.isMinTimeOut = setTimeout(() => {
        // 判断是否为州
        if (__this.mapConfig.StateType) {
          __this.UPDATA_MAP_CONFIG({flag: false})
          return
        }
        console.log(_this.$map)
        // 获取需要查询的半径
        const _options = {
          latitude: __this.getLat(_this.getCenter().lat()),
          longitude: __this.getLng(_this.getCenter().lng())
        }

        console.log(_this.getCenter().lat(), _this.getCenter().lng(), _options)
        console.log('缩放后获取房源数据开始~~~~~~~')
        // 更新本地缓存地址
        // __this.submitForm()
        // Object.assign({}, __this.submitForm, _options)
        __this.UPDATA_SERCH_FROM(Object.assign({}, __this.searchFrom, {pageNum: 1}))
        // __this.pauseOnceHouse = false
        __this.fetchHouseList(Object.assign({}, _options))
        // this.fetchMarkesListDistance(_options)
        // 清空marker
        __this.$infoBox.close()
      }, 1000)
    },
    getLat (_lat) {
      let ___lat
      if (Math.abs(_lat / 180) > 1) {
        const __lat = _lat % 180
        ___lat = __lat > 90 ? (__lat % 90) - 90 : __lat % 90
      } else {
        ___lat = _lat > 90 ? (_lat % 90) - 90 : _lat % 90
      }
      return ___lat
    },
    getLng (_lng) {
      let ___lng
      if (Math.abs(_lng / 360) > 1) {
        const __lng = _lng % 360
        if (__lng < 0 && Math.abs(__lng) > 180) {
          ___lng = 360 - Math.abs(__lng)
        } else {
          ___lng = __lng > 180 ? (__lng % 180) - 180 : __lng % 180
        }
      } else {
        if (_lng < 0 && Math.abs(_lng) > 180) {
          ___lng = 360 - Math.abs(_lng)
        } else {
          ___lng = _lng > 180 ? (_lng % 180) - 180 : _lng % 180
        }
      }
      return ___lng
    },
    initMap (_initMap) {
      // 开始限制地图
      // eslint-disable-next-line no-undef
      // google.maps.MapRestriction({
      //   restriction: {
      //     latLngBounds: {
      //       east: 180,
      //       north: 90,
      //       south: -90,
      //       west: -180
      //     },
      //     strictBounds: true
      //   }
      // })
      console.log(_initMap)
      this.$Map = _initMap
      this.UPDATA_MAP_INIT({Map: this.$Map})
      console.log('初始化地图完成！')
      console.log(this.mapConfig)
      // 加载描边完成
      if (this.mapConfig.flag) {
        this.locationPosition(this.mapConfig)
      }
      // 关闭loading总开关
      const _this = this
      setTimeout(() => {
        _this.LOADING_CONFIG.gobalLoading = false
        _this.$emit('_loadingChange', _this.LOADING_CONFIG)
        console.log('已关闭全局loading')
      }, 500)
    },
    infoBoxChange (infoBox) {
      // console.log(infoBox)
      this.$infoBox = infoBox
      this.UPDATA_MAP_INIT({infoBox: this.$infoBox})
      console.log('成功初始化windowMark窗体')
    },
    markLoadChange (info, _$marker) {
      const _this = this
      this.markerLists.push(_$marker)
      this.markerListObject.push(info)
      console.log('正在更新Marker')
      // console.log(_this.marksList.length, _this.markerLists.length)
      if (_this.marksList.length === _this.markerLists.length) {
        // console.log(_this.marksList.length)
        _this.UPDATA_MARKER_LIST(this.markerLists)
        console.log('已重新更新marker')
      }
    },
    // 获取描边数据
    fetchCityPolygon (id) {
      return false
      // const _this = this
      // let URL_LIST = [`${_this.ljj_path}region/shape?id=${id}`, `${_this.ljj_path}/region/shape/state?abbreviation=${id}`]
      // if (_this.$Map) {
      //   if (id.length > 2) {
      //     URL_LIST = URL_LIST[0]
      //     _this.$Map.setZoom(11)
      //   } else {
      //     URL_LIST = URL_LIST[1]
      //     _this.$Map.setZoom(7)
      //   }
      //   console.log('正在获取描边' + id)
      //   _this.$indexDB.getDataByKey(_this.$ebuyhouseDB.db, 'googleMap', id, (e) => {
      //     // console.log(e)
      //     if (!e) {
      //       _this.$axios.get(URL_LIST)
      //         .then(res => {
      //           // console.log(res.data.data.rows)
      //           if (res.data.success) {
      //             // console.log(res.data)
      //             _this.patsLists = res.data.data
      //             _this.$indexDB.addData(_this.$ebuyhouseDB.db, 'googleMap', {id: id, data: res.data.data})
      //           }
      //         })
      //
      //     } else {
      //       _this.patsLists = e.data
      //     }
      //   })
      // } else {
      //   setTimeout(() => {
      //     _this.fetchCityPolygon(id)
      //   }, 1000)
      // }
    },
    // 获取定位信息
    fetchIpPosition () {
      const _this = this
      _this.$axios.get(`${this.LJJ_FETCH_LOCAL_ADRESS}`)
        .then(res => {
          if (res.data.success) {
            // console.log(res)
            _this.locationConfig = res.data.data
            // _this.center = {lat: Number(res.data.data.latitude), lng: Number(res.data.data.longitude)}
            _this.fetchCity({cityAscii: this.locationConfig.city, stateId: this.locationConfig.region_code})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取城市信息
    fetchCity (_opt) {
      const _this = this
      _this.$axios.get(`${this.ljj_path}region/city-by/name`, {params: _opt})
        .then(res => {
          if (res.data.success) {
            _this.center = {lat: Number(res.data.data.lat), lng: Number(res.data.data.lng)}
            _this.submitForm = Object.assign(_this.submitForm, res.data.data)
            _this.fetchCityPolygon(res.data.data.id)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 描边回调
    getChange (o) {
      console.log(o)
    }
  },
  created () {
    this.FETCH_URL_QUERY()
  },
  mounted () {
    this.LOADING_CONFIG.mapLoading = true
  },
  beforeDestroy () {
    const thisMapCenter = this.getMapCenterPostion()
    const thisMapZoom = this.$Map.getZoom()
    // const locationPosition = sessionStorage.getItem('locationConfig')
    try {
      const locationPosition = JSON.parse(sessionStorage.getItem('locationConfig'))
      if (!this.searchFrom.cityId) {
        this.UPDATA_SERCH_FROM(Object.assign({}, this.searchFrom, {cityId: locationPosition.id}))
      }
    } catch (error) {
    }
    this.UPDATA_MAP_CONFIG(Object.assign({}, this.mapConfig, {lat: thisMapCenter.latitude, lng: thisMapCenter.longitude, zoom: thisMapZoom}))
    console.log(this.mapConfig, thisMapZoom)
    clearTimeout(this.initHouseTimer)
    clearTimeout(this.initMaptimer)
    if (this.$refs['mapContent']) {
      this.$refs['mapContent'].remove()
    }
  }
}
</script>
<style lang="sass" scoped>
  .map
    height: 100%
</style>
