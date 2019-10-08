<template>
  <section class="provider-container" v-if="providerList.length !== 0">
    <div class="title">
      <h4>Nearby Service Providers</h4>
    </div>
    <div class="content">
      <router-link
        :to="'/service/detail/' + item.replaceCeoId"
        class="item"
        v-for="(item, index) in providerList"
        :key="index"
        v-show="index < 9">
        <div class="left">
          <img v-lazy="item.logo || '/static/img/service/service.png'" alt :key="item.companyId"/>
        </div>
        <div class="right">
          <p class="description">{{item.company}}</p>
          <div class="labelValue">
            <img src="/static/img/service/service_classify.png" alt="service_address">
            <p class="valueInfo">{{item|handlerTypeName}}</p>
          </div>
          <div class="labelValue">
            <img src="/static/img/service/service_phone.png" alt="service_phone.png">
            <p class="valueInfo">{{item.phone}}</p>
          </div>
          <div class="labelValue">
            <img src="/static/img/service/service_address.png" alt="service_address">
            <p class="valueInfo address">{{item.address}}</p>
          </div>
        </div>
      </router-link>
    </div>
    <footer class="moreService">
      <router-link :to="{path: '/service/list', query: {cityId: houseInfo.cityId, latitude: houseInfo.latitude, longitude: houseInfo.longitude}}">More <i class="el-icon-arrow-right"></i></router-link>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      latitude: 0,
      longitude: 0,
      providerList: []
    }
  },
  props: {
    houseInfo: {
      default: () => {
        return {
          longitude: 0,
          latitude: 0,
          cityId: 0,
          stateId: 0,
          emailConceal: 2
        }
      },
      type: Object
    }
  },
  watch: {
    houseInfo: {
      handler (val, oldVal) {
        if (Object.keys(val).includes('cityId')) {
          this.formatData(val)
          this.params = val
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
      mapConfig: 'mapConfig'
    })
  },
  methods: {
    getHouseRight (_info = {}) {
      // ${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-R
      // console.log(_info)
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-B`, {
        params: {
          latitude: _info.latitude || this.mapConfig.lat || this.mapConfig.xlat,
          longitude: _info.longitude || this.mapConfig.lng || this.mapConfig.xlng,
          cityId: _info.cityId,
          pageSize: 4
        }
      }).then(res => {
        if (res.data.success && res.data.data.rows instanceof Array) {
          this.providerList = res.data.data.rows
        } else if (res.data.success && res.data.data instanceof Array) {
          this.providerList = res.data.data
        }
      })
      // console.log(res)
    },
    formatData (_info) {
      this.getHouseRight(_info || {})
    },
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {
        //   ebuyhouse: this.$base64.encode(
        //     JSON.stringify({ id: _info.companyId })
        //   )
        // }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .provider-container
    margin-bottom: 100px
    margin-top: 110px
    .title
      width: 100%
      height: 52px
      // background-color: #e7e7e7
      line-height: 52px
      h4
        color: #444444
        font-size: 36px
        font-weight: bold
        text-align: center
        text-align: center
    .content
      margin-top: 70px
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      .item
        width: 32%
        display: flex
        transition: all .3s ease
        &:nth-child(n + 4)
          margin-top: 35px
        &:hover
          box-shadow: 3px 3px 15px -1px #666
          border-radius: 5px
          background-color: #fff
          transition: all .3s ease
          cursor: pointer
          .left>img
            transform: matrix(1.1, 0, 0, 1.1, 0, 0)
            transition: transform 1s ease-out
        .left
          width: 134px
          height: 134px
          margin-right: 14px
          overflow: hidden
          border-radius: 5px
          img
            width: 100%
            height: 100%
            transition: transform 1s ease-out
            border-radius: 5px
            &:hover
              transform: matrix(1.1, 0, 0, 1.1, 0, 0)
              transition: transform 1s ease-out
        .right
          flex: 1
          .description
            margin-bottom: 15px
            font-size: 18px
            color: #444
            height: 42px
            overflow: hidden
            text-overflow: ellipsis
            overflow: hidden
            display: flex
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            display: -webkit-box
            &:hover
              color: #1281fc
          .labelValue
            display: flex
            margin: 10px 0
            &:last-child
              margin-bottom: 0px
            >img
              width: 18px
              height: 18px
              margin-right: 5px
              display: inline-block
            .valueInfo
              font-size: 16px
              color: #666
              flex: 1
              max-height: 18px
              line-height: 18px
              overflow: hidden
              text-overflow: ellipsis
              word-break: break-word
              -webkit-box-orient: vertical
              -webkit-line-clamp: 1
              display: -webkit-box
              &.address
                color: #666
                font-size: 16px
          .category
            font-size: 16px
            color: #666666
            display: flex
            line-height: 30px
            align-items: end
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
            line-height: 30px
            align-items: end
            img
              width: 30px
              height: 30px
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
