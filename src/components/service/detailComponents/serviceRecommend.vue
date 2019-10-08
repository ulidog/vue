<template>
  <section ref="recomment" class="serviceRecommendComponent" v-if="providerList.length !== 0">
    <section ref="recommentFixed" v-show="isNone" :class="['fixedRecomment', isFixed ? 'fixed' : '']">
      <header class="title">
        <h4>Recommended</h4>
      </header>
      <section class="econmic-list">
        <router-link class="item" v-for="(item, index) in providerList" :key="index" :to="'/service/detail/' + item.replaceCeoId">
          <div class="left">
            <img v-lazy="item.logo" alt="" :key="item.companyId">
          </div>
          <div class="right">
            <p class="info">{{item.company}}</p>
            <div class="bottom">
              <div class="category">
                <img src="/static/img/service/service_classify.png" alt="service_classify.png">
                <p>{{item|handlerTypeName}}</p>
              </div>
              <div class="tel">
                <img src="/static/img/service/service_phone.png" alt="service_phone.png">
                <p>{{item.phone}}</p>
              </div>
            </div>
          </div>
        </router-link>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      providerList: [],
      flxedClientHeight: 0,
      isFixed: false,
      isNone: true
    }
  },
  props: {
    dowmCallMarge: {
      default: () => {},
      type: Object
    },
    updataMaxOffsetTop: {
      default: null,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig'
    })
  },
  created () {
    console.log('开始获取定位数据--------------------->')
    console.log(this.mapConfig)
  },
  watch: {
    dowmCallMarge: {
      handler (_new, _old) {
        if (_new.companyId) {
          this.fetchReCommentList()
        }
      },
      deep: true,
      immediate: true
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
  methods: {
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {
        //   ebuyhouse: this.$base64.encode(
        //     JSON.stringify({ id: _info.companyId })
        //   )
        // }
      })
    },
    async fetchReCommentList () {
      let providerRes = await this.$axios.get(
        `${this.LJJ_SERVER_PROD_PATH}service-company/referral/company/item-R`,
        {
          params: {
            // fkBusinessIds: this.dowmCallMarge.types.map(item => {
            //   return item.fkTypeId
            // }).join(','),
            latitude: this.dowmCallMarge.latitude || this.mapConfig.lat || this.mapConfig.xlat,
            longitude: this.dowmCallMarge.longitude || this.mapConfig.lng || this.mapConfig.xlng,
            pageSize: 6,
            cityId: this.dowmCallMarge.cityId,
            companyId: this.dowmCallMarge.companyId,
            category: this.dowmCallMarge.category
          }
        }
      )
      // console.log(providerRes)
      this.providerList = providerRes.data.data.rows
      // console.log(this.providerList)
      if (this.providerList.length === 0) {
        this.$emit('hiddenRightRecomment', true)
      } else {
        this.$emit('hiddenRightRecomment', false)
      }
    },
    handleScroll (e) {
      // console.log(e)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log('scrollTop =>' + scrollTop)
      if (this.$refs['recomment']) {
        const recommentOffsetTop = this.$refs['recomment'].offsetTop
        console.log('recommentOffsetTop =>' + recommentOffsetTop)
        if (((scrollTop + this.flxedClientHeight + 80) > this.updataMaxOffsetTop) || (this.updataMaxOffsetTop < (recommentOffsetTop + this.flxedClientHeight + 80))) {
          this.isNone = false
          return
        } else {
          this.isNone = true
        }
        if (recommentOffsetTop - scrollTop < 80) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      } else {
        const _this = this
        setTimeout(() => {
          _this.handleScroll()
          console.log('延迟10ms操作')
        }, 10)
      }
    }
  },
  updated () {
    if (this.$refs['recommentFixed']) {
      const newFlxedClientHeight = this.$refs['recommentFixed'].clientHeight
      if (newFlxedClientHeight > this.flxedClientHeight) {
        this.flxedClientHeight = newFlxedClientHeight
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 320px) and (max-width: 1300px)
    .serviceRecommendComponent
      .fixedRecomment.fixed
        position: fixed
        width: 30.15%
        top: 80px
  @media screen and (min-width: 1300px)
    .serviceRecommendComponent
      .fixedRecomment.fixed
        position: fixed
        width: calc( 1300px * 0.3115 )
        top: 80px
</style>

<style lang="sass" scoped>
  .serviceRecommendComponent
    margin-top: 20px
    position: relative
    .fixedRecomment
      background-color: #fff
      padding-bottom: 50px
      transition: all .5s ease
      &:hover
        box-shadow: 10px 10px 10px -5px #ddd
    .title
      margin: 0 35px
      padding: 20px 0 15px
      border-bottom: 1px solid #AFAFAF
      display: flex
      justify-content: space-between
      h4
        color: #444444
        font-size: 24px
        font-weight: bold
      .providers-more
        color: #999
    .econmic-list
      margin: 16px 35px
      .item
        display: flex
        margin-top: 20px
        transition: all .3s ease
        &:hover
          cursor: pointer
          box-shadow: 0px 0px 10px -2px #444
          transition: all .3s ease
        .left
          width: 100px
          height: 100px
          margin-right: 14px
          display: flex
          align-items: center
          img
            width: 100%
            max-height: 100%
            display: block
        .right
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-around
          .info
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            margin-bottom: 8px
            color: #444444
            font-size: 18px
          .category
            display: flex
            font-size: 16px
            color: #666666
            min-height: 25px
            align-items: center
            img
              width: 18px
              height: 18px
              margin-right: 5px
          .tel
            display: flex
            font-size: 16px
            color: #666666
            min-height: 25px
            align-items: center
            img
              width: 18px
              height: 18px
              margin-right: 5px
</style>
