<template>
  <section class="commonViews">
    <router-view @configInfo="configInfoChange"></router-view>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      params: {}
    }
  },
  watch: {
    '$route': function (to) {
      this.configInfoChange({
        showProcess: true,
        isFullScreen: false
      })
      // 拦截当用户手动输入参数不对时 拦截到定位页面 如果定位页面获取参数时错误 应向上级页面返回
      this.getOfferChange(this.params.thisRole)
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  methods: {
    ...mapMutations({
      updateProcessType: 'UPDATE_PROCESSTYPE'
    }),
    configInfoChange (val) {
      this.$emit('configInfo', val)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            if (res.data.data.saleHouseOrderInfo.state !== _this.params.state) {
              _this.goOfferPage()
            }
            // 更新
            _this.params = Object.assign({}, res.data.data.saleHouseOrderInfo, {thisRole: res.data.data.thisRole})
            _this.getOfferChange(_this.params.thisRole)
          } else {
            _this.goOfferPage()
          }
          // console.info(res)
        })
        .catch(err => {
          if (err) {}
          _this.goOfferPage()
        })
    },
    getOfferDetailed () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            if (res.data.data.rentHouseOrderInfo.state !== _this.params.state) {
              _this.goOfferPage()
            }
            // 更新
            _this.params = Object.assign({}, res.data.data.rentHouseOrderInfo, {thisRole: res.data.data.thisRole})
            _this.getOfferChange(_this.params.thisRole)
          }
          // console.info(res)
        })
    },
    getOfferChange (thisRole) {
      console.log('权值：' + thisRole)
      if (Number(thisRole) !== 2 && Number(thisRole) !== 1) {
        this.$router.push({
          name: 'process-null',
          query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
          params: this.params
        })
      }
    },
    goOfferPage () {
      this.$router.push({
        name: 'process-null',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    setTimer () {
      const _this = this
      // alert(0)
      _this.timer = setInterval(() => {
        if (Number(this.processType) !== 0) {
          _this.getOfferDetails()
        } else {
          _this.getOfferDetailed()
        }
      }, 50000)
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.transactionMode) {
      this.updateProcessType(Number(this.params.transactionMode))
      this.getOfferDetails()
    } else {
      this.updateProcessType(0)
      this.getOfferDetailed()
    }
    this.setTimer()
  },
  destroyed () {
    console.log('退出页面')
    clearInterval(this.timer)
  }
}
</script>
<style lang="sass" scoped>

</style>
