<template>
  <section ref="serviceListRef" class="serviceListComponent">
    <ul class="companyBox" v-loading="loading">
      <li class="companyItem" v-for="(item, index) in companyList" :key="index" @click="gotoDetail(item)">
        <header class="companyItemLogo">
          <img v-lazy="item.logo || '/static/img/service/service_fengmian.jpg'" :alt="item.company" :key="item.companyId">
        </header>
        <footer class="companyInfo">
          <h5 class="companyName">{{item.company}}</h5>
          <section class="group">
            <img src="/static/img/service/service_phone.png" alt="service_phone">
            <span v-if = "item.phone.includes('(')">{{ item.phone }}</span>
            <span v-if = "!item.phone.includes('(')">{{ item.phone | telephoneFormat}}</span>
          </section>
          <section class="group">
            <img src="/static/img/service/service_address.png" alt="service_address">
            <span>{{ item.address }}</span>
          </section>
          <!-- <section class="btnDetail">
            <el-button>Details <i class="el-icon-caret-right"></i></el-button>
          </section> -->
        </footer>
      </li>
      <template v-if="companyList.length !== 0">
        <li class="companyItem" v-for="items in (12 - companyList.length)" :key="items * 1000">
          <header class="companyItemLogo">
            <img src="/static/img/service/service_zhanwei.jpg" alt="">
          </header>
          <section class="noContents">
            <h3>Businesses Joined</h3>
            <span>(702) 916 3883</span>
          </section>
        </li>
      </template>
    </ul>
    <section class="noContent" v-if="companyList.length === 0">
      <header class="noContentImg">
        <img src="/static/img/service/service_empty.png" alt="service_empty.png">
      </header>
      <footer class="noContentTip">
        <span class="tip">This type of service provider is on the way </span>
      </footer>
    </section>
    <section class="page-part" v-if="pageConfig.pageTotal > pageConfig.pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleChange"
        :current-page="pageConfig.pageNum"
        :page-size="pageConfig.pageSize"
        :total="pageConfig.pageTotal">
      </el-pagination>
      <span class="customer-total-sty">Total {{ pageConfig.pageTotal }}</span>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      pageConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      companyList: [],
      serviceListRefOffsetTop: 0,
      loading: false,
      countryTotal: null,
      source: null
    }
  },
  props: {
    dowmCallMarge: {
      default: () => {
        return {addres: null}
      },
      type: Object
    }
  },
  watch: {
    dowmCallMarge: {
      handler (_new = {}, _old = {}) {
        console.log('搜索')
        console.log(_new, _old)
        let _newObject = Object.assign({}, _new)
        let _oldObject = Object.assign({}, _old)
        Object.keys(_newObject).map(item => {
          if (!_newObject[item]) {
            delete _newObject[item]
          }
        })
        Object.keys(_oldObject).map(item => {
          if (!_oldObject[item]) {
            delete _oldObject[item]
          }
        })
        const _submitStatus = JSON.stringify(_newObject) !== JSON.stringify(_oldObject)
        if (_submitStatus) {
          if (_new.resetPage) {
            this.pageConfig.pageNum = 1
          }
          this.fetchListAll(_new)
        }
      },
      deep: true
    },
    mapConfig: {
      handler (_new, _old) {
        if (_new !== _old && Object.keys(_new).length !== 0) {
          this.fetchListAll(this.dowmCallMarge)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig',
      searchFrom: 'searchFrom'
    })
  },
  methods: {
    handleChange (_info) {
      this.pageConfig.pageNum = _info
      if (this.dowmCallMarge.important) {
        this.fetchListAll(this.dowmCallMarge)
      } else {
        this.fetchListAll(Object.assign({}, this.dowmCallMarge, this.$route.query))
      }
      window.scrollTo(0, 0)
    },
    fetchAllTotal () {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/service/company/count`)
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.countryTotal = res.data.data
          }
        })
    },
    cancelQuest () {
      if (typeof this.source === 'function') {
        this.source()
      }
    },
    fetchListAll (query = {}) {
      this.loading = true
      const _this = this
      this.cancelQuest()
      console.log('请求数据')
      console.log(query)
      let cloneQuery = Object.assign({}, query)
      if (!cloneQuery.cityId) delete cloneQuery.cityId
      Object.keys(cloneQuery).map(key => {
        if (!cloneQuery[key]) {
          delete cloneQuery[key]
        }
      })
      const locationPosition = JSON.parse(sessionStorage.getItem('locationConfig'))
      this.$axios({
        url: `${this.LJJ_SERVER_PROD_PATH}service-company/filter`,
        method: 'GET',
        params: Object.assign({},
          {
            latitude: locationPosition.lat || this.mapConfig.lat || this.mapConfig.xlat,
            longitude: locationPosition.lng || this.mapConfig.lng || this.mapConfig.xlng,
            cityId: locationPosition.id || this.searchFrom.cityId
          },
          cloneQuery || {},
          this.pageConfig
        ),
        cancelToken: new axios.CancelToken(function executor (c) { // 设置 cancel token
          _this.source = c
        })
      })
        .then(res => {
          if (res.data.success) {
            this.companyList = res.data.data.rows
            this.pageConfig.pageTotal = res.data.data.total
          }
          this.loading = false
        }).catch(err => {
          if (!this.loading) {
            const _this = this
            setTimeout(() => {
              _this.loading = false
            }, 10000)
            console.log(err)
          }
        })
    },
    gotoDetail (_info) {
      // const customerId = (`${_info.company} ${_info.cityName} ${_info.companyCode}`).toLocaleLowerCase().replace(/\s|'|,|\.|"|\/|!|@|#|\$|%|\^|&|\*/g, '-')
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.companyId}))}
      })
      // let routeData = this.$router.resolve({
      //   name: 'serviceDetail',
      //   query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.companyId}))}
      // })
      // window.open(routeData.href, '_blank')
    },
    handleScrollChange () {
      this.updateRefOffsetTop()
    },
    updateRefOffsetTop () {
      if (this.$refs['serviceListRef']) {
        const lintOffsetTop = this.$refs['serviceListRef'].offsetTop
        if (lintOffsetTop !== this.serviceListRefOffsetTop) {
          this.serviceListRefOffsetTop = lintOffsetTop
          this.$emit('criticalPointHeight', this.serviceListRefOffsetTop)
        }
      }
    }
  },
  updated () {
    this.updateRefOffsetTop()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollChange)
    this.updateRefOffsetTop()
    // 获取参数后进行请求
    // this.urlParamsChange()
    // this.fetchAllTotal()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScrollChange)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1200px)
    .serviceListComponent
      width: 1200px
      margin: 0 auto
  @media screen and (min-width: 320px) and (max-width: 1200px)
    .serviceListComponent
      width: 100%
      margin: 0 15px
</style>

<style lang="sass" scoped>
  .serviceListComponent
    padding: 30px 0
    .companyBox
      position: relative
      display: flex
      flex-wrap: wrap
      .companyItem
        flex: 0 0 calc( ( 100% - 35px * 3 ) / 4 )
        margin-right: 35px
        background-color: #fff
        transition: all .5s ease
        cursor: pointer
        border-radius: 5px
        overflow: hidden
        display: flex
        flex-direction: column
        margin-bottom: 40px
        min-height: 334px
        &:nth-child(4n)
          margin-right: 0
        &:hover
          transition: all .5s ease
          box-shadow: 10px 10px 10px -5px #ddd
          .companyItemLogo>img
            transform: scale(1.2)
            transition: all .5s ease
          .btnDetail>.el-button
            transition: all .5s ease
            color: #FFF
            background-color: #1281FC
            border-color: #1281FC
        .companyItemLogo
          max-width: 100%
          height: 205px
          display: flex
          align-items: center
          overflow: hidden
          justify-content: center
          >img
            max-width: 100%
            transition: all .5s ease
        .noContents
          display: flex
          justify-content: center
          align-items: center
          flex-direction: column
          flex: 1
          h3
            color: #323232
            font-size: 18px
          span
            color: #323232
            font-size: 14px
            margin-top: 10px
        .companyInfo
          padding: 20px
          display: flex
          flex-direction: column
          flex: 1
          .companyName
            font-size: 14px
            color: #323232
            margin-bottom: 10px
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            font-weight: normal
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            /* autoprefixer: on */
          .group
            display: flex
            margin: 5px 0
            >img
              width: 18px
              height: 18px
            >span
              margin-left: 10px
              flex: 1
              color: #9D9D9D
              font-size: 14px
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 2
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
          .btnDetail
            align-self: flex-end
            justify-self: flex-end
            flex: 1
            display: flex
            align-items: flex-end
            >.el-button
              border-radius: 30px
              padding: 10px 25px
              font-size: 12px
              transition: all .5s ease
    .noContent
      width: 100%
      min-height: 220px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .noContentTip
        margin-top: 20px
        span.tip
          color: #323232
          font-size: 24px
    .page-part
      margin-top: 50px
      text-align: center
      display: flex
      width: 100%
      justify-content: center
      /deep/ button, /deep/ .number
        background-color: #fff
      .customer-total-sty
        background-color: #fff
        padding-left: 10px
        padding-right: 10px
        margin: 2px
        font-size: 13px
        display: flex
        align-items: center
</style>
