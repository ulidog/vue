<template>
  <section class="landlordViews">
    <router-view @configInfo="configInfoChange"></router-view>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      params: {},
      timer: null,
      orderInfo: {
        type: 0,
        types: 1
      }
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
  methods: {
    ...mapMutations({
      updateProcessType: 'UPDATE_PROCESSTYPE'
    }),
    configInfoChange (val) {
      this.$emit('configInfo', val)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            if (res.data.data.rentHouseOrderInfo.state !== _this.params.state) {
              _this.goOfferPage()
            }
            // 更新
            _this.params = Object.assign({}, res.data.data.rentHouseOrderInfo, {thisRole: res.data.data.thisRole})
            _this.getOfferChange(_this.params.thisRole)
          } else {
            _this.goOfferPage()
          }
          // console.info(res)
        })
        .catch(err => {
          if (err) _this.goOfferPage()
        })
    },
    getOfferChange (thisRole) {
      if (Number(thisRole) !== 2) {
        this.$router.push({
          name: 'process-null',
          query: {ebuyhouse: this.$base64.encode(JSON.stringify(Object.assign({}, this.params, this.orderInfo)))},
          params: Object.assign({}, this.params, this.orderInfo)
        })
      }
    },
    goOfferPage () {
      this.$router.push({
        name: 'process-null',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(Object.assign({}, this.params, this.orderInfo)))},
        params: Object.assign({}, this.params, this.orderInfo)
      })
    },
    setTimer () {
      const _this = this
      // alert(0)
      _this.timer = setInterval(() => {
        _this.getOfferDetails()
      }, 50000)
    }
  },
  created () {
    console.log('进入页面')
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateProcessType(0)
    this.setTimer()
  },
  mounted () {
  },
  destroyed () {
    console.log('退出页面')
    clearInterval(this.timer)
  }
}
</script>
<style lang="sass" scoped>

</style>
