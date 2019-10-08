<template>
  <div class="service-container">
    <div class="banner-box">
      <img class="banner" src="/static/img/service/banner-tuo.png" alt>
    </div>
    <div class="content-container">
      <vue-service-filter @upCallMarge="upCallMarge" :criticalPointHeight="criticalPointHeight"></vue-service-filter>
      <vue-service-list :dowmCallMarge="serchFrom" @criticalPointHeight="criticalPointChange"></vue-service-list>
      <p class='becomeSer' @click="uploadProvider">To  Be  Service  Provider</p>
    </div>
  </div>
</template>
<script>
// import VueFilter from '@/components/service/filter.vue'
// import VueSearch from '@/components/service/search.vue'
// import VueList from '@/components/service/list.vue'
import { mapGetters, mapMutations } from 'vuex'
import VueServiceFilter from '@/components/service/serviceFilter'
import VueServiceList from '@/components/service/serviceList'
export default {
  data () {
    return {
      serchFrom: {},
      criticalPointHeight: 0
    }
  },
  components: {
    // 'vue-filter': VueFilter,
    // 'vue-search': VueSearch,
    // 'vue-list': VueList,
    'vue-service-filter': VueServiceFilter,
    'vue-service-list': VueServiceList
  },
  computed: {
    ...mapGetters({
      token: 'token',
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  beforeCreate () {
    this.$emit('childToParentComponent', { bgOpacityNone: true })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      serviceProviderFn: 'UPDATA_SERVICE_PROVIDER_FN'
    }),
    uploadProvider () {
      const _this = this
      if (!_this.token) {
        // 跳转到登录
        _this.$store.commit('signOut', true)
      } else {
        // 如果不是一次登录直接跳上传服务商页
        if (this.GlobalUserInfo.isonceLogin === 6) {
          this.$router.push({path: '/upload-user-service'})
        } else {
          // 如果是一次登录弹出协议
          this.serviceProviderFn(true)
        }
      }
    },
    upCallMarge (_info) {
      console.log(_info)
      this.serchFrom = Object.assign({}, this.serchFrom, _info)
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if (scrollTop < 100) {
        this.$emit('childToParentComponent', { bgOpacityNone: true })
      } else {
        this.$emit('childToParentComponent', { bgOpacityNone: false })
      }
    },
    criticalPointChange (_info) {
      this.criticalPointHeight = _info
    }
  },
  destroyed () {

  }
}
</script>
<style lang="sass" scoped>
  .service-container
    .banner-box
      .banner
        width: 100%
        height: auto
        display: inline-block
        vertical-align: middle
    .content-container
      background-color: #F7F7F7
      .becomeSer
        position: fixed
        top: 58%
        right: 0
        height: 40px
        line-height: 40px
        color: #fff
        font-size: 15px
        padding: 0 15px;
        border-radius: 3px
        background-color: #1281fc
        transform: rotate(90deg) translateY(-180%) translateX(-28%)
        z-index: 999
        cursor: pointer
        &:hover
          box-shadow: 0 0 35px 2px rgba(0, 0, 0, 0.24)
          right: 2px
</style>
