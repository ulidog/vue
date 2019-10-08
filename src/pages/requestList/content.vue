<template>
  <section class="container-bar">
    <vue-product-banner :bannerParam="bannerParam" :bannerDialog="bannerDialog" @getInformationDetail="_getInformationDetail"></vue-product-banner>
    <div class="container-area">
      <router-view @getBannerParam="_getBannerParam"></router-view>
      <vue-product-service :serviceList="serviceList" @upCallMarge="_upCallMarge" :pageConfig="pageConfig"></vue-product-service>
    </div>
  </section>
</template>

<script>
import VueBanner from '@/components/common/productBanner'
import VueService from '@/components/common/productService'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      serviceList: [],
      pageConfig: {
        pageTotal: 0
      },
      bannerDialog: {},
      bannerParam: null
    }
  },
  components: {
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
            console.log('122311231231132213')
            console.log(this.serviceList)
          }
        })
    },
    _getBannerParam (_info = {}) {
      console.log(_info)
      this.bannerParam = _info
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
  }
}
</script>
<style lang="scss" scoped>
.container-bar {
  margin-top: 60px;
  background-color: #f3f4f5
}
.container-area {
  width: 1200px;
  margin: 0 auto
}
</style>
<style lang="scss" scoped>
@media screen and (min-width: 320px) and (max-width: 1200px) {
  .container-area {
    width: auto;
  }
}
</style>
