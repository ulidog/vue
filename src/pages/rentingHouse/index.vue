<template>
  <section class="AdvertorialPage">
    <header class="header-top">
      <vue-product-banner :bannerParam="bannerParam" :bannerDialog="bannerDialog" @getInformationDetail="_getInformationDetail"></vue-product-banner>
    </header>
    <section class="container-area">
      <section class="content">
        <h3 class="head-text">Featured Homes</h3>
        <p class="tx-p">Browse our Most Recent Listings</p>
        <vue-search @searchIndex="changeCarouselIndex"></vue-search>
        <!-- <vue-rental></vue-rental> -->
        <vue-good-properties></vue-good-properties>
        <router-link :to="{path: 'map/rent'}">
          <button class="content-btn" >More</button>
        </router-link>
      </section>
      <footer class="footer-bottom">
      <vue-product-service :serviceList="serviceList" @upCallMarge="_upCallMarge" :pageConfig="pageConfig"></vue-product-service>
      </footer>
    </section>
    <router-link :to="{path: '/release/rentOut'}" class="side-right-button">List Your Rental</router-link>
  </section>
</template>

<script>
import VueSearch from './search.vue'
// import VueRental from './rental.vue'
import VueGoodProperties from './goodProperties.vue'
import VueBanner from '@/components/common/productBanner'
import VueService from '@/components/common/productService'
import { mapGetters } from 'vuex'
import Mock from '@/utils/mock'
export default {
  data () {
    return {
      serviceList: [],
      pageConfig: {
        pageTotal: 0
      },
      bannerDialog: {},
      bannerParam: {
        bannerUrl: '/static/img/common/productBanner/rent_pho.png',
        left: {
          title: 'Rent',
          titleSub: 'SFT Transaction',
          description: [
            'For Sale by Owner',
            'Standard Contracts Provided',
            'Save 6%'
          ]
        },
        right: {
          title: 'Information',
          fkCategoryId: Mock.guideId.rentingHouse,
          list: []
        }
      }
    }
  },
  'components': {
    'vue-search': VueSearch,
    // 'vue-rental': VueRental,
    'vue-good-properties': VueGoodProperties,
    'vue-product-banner': VueBanner,
    'vue-product-service': VueService
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig',
      searchFrom: 'searchFrom'
    })
  },
  watch: {
    mapConfig: {
      handler (_new, _old) {
        if (_new !== _old) {
          this._upCallMarge()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeCarouselIndex (_index) {
      return false
      // this.$refs.homeCarousel.setActiveItem(_index)
    },
    _upCallMarge (_info) {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-B`, {
        params: Object.assign({},
          _info || {pageSize: 6},
          {
            latitude: this.mapConfig.lat || this.mapConfig.xlat,
            longitude: this.mapConfig.lng || this.mapConfig.xlng,
            cityId: this.searchFrom.cityId
          }
        )
      })
        .then(res => {
          if (res.data.success) {
            this.serviceList = res.data.data.rows
            this.pageConfig.pageTotal = res.data.data.total
          }
        })
    },
    _getBannerParam () {
      this.$axios.get(`${this.ljj_path}guide/header-banner?fkCategoryId=${Mock.guideId.rentingHouse}&pageSize=20`)
        .then(res => {
          if (res.data.success) {
            this.bannerParam.right.list = res.data.data.rows
          }
        })
    },
    _getInformationDetail (_info) {
      this.$axios.get(`${this.ljj_path}/guide/detail`, {params: Object.assign({}, {articleId: _info.articleId})})
        .then(res => {
          if (res.data.success) {
            this.bannerDialog = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this._upCallMarge()
    this._getBannerParam()
  }
}
</script>
<style lang="sass" scoped>
.side-right-button
  position: fixed
  right: 0
  top: 65%
  background-color: #1281FC
  color: #fff
  height: 40px
  line-height: 40px
  font-size: 15px
  padding: 0 15px
  border-radius: 3px
  transform: rotate(-90deg) translateY(118%) translateX(62%)
  &:hover
    background-color: #0067d9
.container-area
  width: 1200px
  margin: 0 auto
.AdvertorialPage
  background-color: #f3f4f5
.content
  position: relative
  .head-text
   font-size: 4.8rem
   color: #323232
   font-weight: 600
   text-align: center
   margin-top: 4.1rem
   background-color: #f3f4f5
  .tx-p
    font-size: 1.8rem
    color: #646464
    text-align: center
    padding-top: 1rem
  .content-btn
    display: block
    margin: 0 auto
    width: 22.75rem;
    height: 2.875rem;
    border: 0.1rem solid #666666
    border-radius: 1.44rem
    font-size: 24px;
    &:hover
      background-color: #0067d9
      border: 0.1rem solid #0067d9
      color: #ffffff
/deep/ .el-carousel__indicators
  display: flex
  width: 100%
  justify-content: center
  margin-top: 12px
.footer-bottom
  padding-top: 6.5rem
</style>
<style lang="scss" scoped>
@media screen and (min-width: 320px) and (max-width: 1200px) {
  .container-area {
    width: auto !important;
  }
}
</style>
