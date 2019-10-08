<template>
  <section class="provider-container" v-if="providerList.length !== 0">
    <!-- <div class="title">
      <h4>Nearby service provider</h4>
    </div> -->
    <div class="content">
      <router-link
        :to="'/service/detail/' + item.replaceCeoId"
        class="item"
        v-for="(item, index) in providerList"
        :key="index"
        v-show="index < 9">
        <div class="left">
          <img v-lazy="item.logo || item.imgUrl || '/static/img/service/service_fengmian.png'" alt :key="item.companyId"/>
        </div>
        <div class="right">
          <p class="description">{{item.company}}</p>
          <div class="labelValue" style="margin-bottom: 6px;">
            <img src="/static/img/service/service_classify.png" alt="service_address">&nbsp;
            <span class="valueInfo address" style="font-size:14px;color:#666;">{{item|handlerTypeName}}</span>
          </div>
          <div class="tel" style="margin-bottom: 6px;">
            <img src="/static/img/service/service_phone.png" alt>&nbsp;
            <span style="font-size:14px;">{{item.phone}}</span>
          </div>
          <div class="category">
            <img src="/static/img/service/service_address.png" alt>&nbsp;
            <span class="categorys" style="font-size:14px;">{{item.address}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- <footer class="moreService">
      <router-link to="/service/list">More <i class="el-icon-arrow-right"></i></router-link>
    </footer> -->
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      latitude: 0,
      longitude: 0,
      providerList: [],
      delayGet: null,
      source: null
    }
  },
  watch: {
    mapConfig: {
      handler (_new, _old) {
        if (_new !== _old && Object.keys(_new).length !== 0) {
          this.getHouseRight()
        }
      },
      deep: true
    }
  },
  filters: {
    HtmlToString (String) {
      if (!String) return
      var dd = String.replace(/<\/?.+?>/g, '')
      return dd
    },
    handlerTypeName (_info) {
      // typeof
      if (_info.types instanceof Array && _info.types.length > 0) {
        return _info.types[0].typeName
      } else {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig',
      searchFrom: 'searchFrom'
    })
  },
  methods: {
    getSonData (_info) {
      this.$emit('upMagerState', _info.length !== 0)
    },
    cancelQuest () {
      if (typeof this.source === 'function') {
        this.source()
      }
    },
    getHouseRight () {
      let self = this
      // ${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-R
      // console.log(_info)
      if (self.searchFrom.cityId) {
        clearTimeout(self.delayGet)
        this.cancelQuest()
        const locationConfig = JSON.parse(sessionStorage.getItem('locationConfig')) || {}
        self.$axios({
          url: `${self.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-B`,
          method: 'GET',
          params: {
            latitude: locationConfig.lat || this.mapConfig.lat || this.mapConfig.xlat,
            longitude: locationConfig.lng || this.mapConfig.lng || this.mapConfig.xlng,
            cityId: locationConfig.id || this.searchFrom.cityId
          },
          cancelToken: new axios.CancelToken(function executor (c) { // 设置 cancel token
            self.source = c
          })
        }).then(res => {
          if (res.data.success && res.data.data.rows instanceof Array) {
            this.providerList = res.data.data.rows
            this.getSonData(this.providerList)
          } else if (res.data.success && res.data.data instanceof Array) {
            this.providerList = res.data.data
            this.getSonData(this.providerList)
          }
        }).catch(err => {
          console.log(err.message)
        })
      } else {
        clearTimeout(self.delayGet)
        self.delayGet = setTimeout(function () {
          self.getHouseRight()
        }, 150)
      }
    },
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // name: 'serviceDetail',
        // query: {
        //   ebuyhouse: this.$base64.encode(
        //     JSON.stringify({ id: _info.companyId })
        //   )
        // }
      })
    }
  },
  mounted () {
    this.getHouseRight()
  }
}
</script>

<style lang="sass" scoped>
  .provider-container
    .title
      width: 100%
      height: 52px
      background-color: #e7e7e7
      line-height: 52px
      h4
        color: #444444
        font-size: 24px
        font-weight: bold
        text-align: center
        text-align: center
    .content
      margin-top: 40px
      display: flex
      flex-wrap: wrap
      .item
        width: 31.3%
        display: flex
        margin-right: 3%
        transition: all linear 0.3s
        &:hover
          box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.5)
          cursor: pointer
        &:nth-child(3n)
          margin-right: 0
        &:nth-child(n + 4)
          margin-top: 24px
        .left
          width: 120px
          height: 120px
          margin-right: 14px
          overflow: hidden
          border-radius: 5px
          img
            width: 100%
            height: 100%
            transition: all linear 0.5s
            &:hover
              transform: scale(1.1)
        .right
          flex: 1
          img
            width: 13px
            height: 13px
            line-height: initial
          .description
            margin-bottom: 10px
            font-size: 1.1rem
            color: #444
            height: 42px
            line-height: 21px
            overflow: hidden
          .category
            font-size: 16px
            color: #666666
            display: flex
            align-items: center
          .categorys
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            /* autoprefixer: on */
            word-break: break-word
          .tel
            font-size: 16px
            color: #666666
            display: flex
            align-items: center
            img
              display: block
    .moreService
      margin: 50px 0 20px
      text-align: center
      width: 100%
      >a
        width: 364px
        height: 30px
        line-height: 30px
        text-align: center
        display: inline-block
        border-radius: 15px
        color: #999999
        border: 1px solid #999999
        transition: all .3s ease
        &:hover
          color: #fff
          background-color: #1281fc
          border: 1px solid #1281fc
</style>
