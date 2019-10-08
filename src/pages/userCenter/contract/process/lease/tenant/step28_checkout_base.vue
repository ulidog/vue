<template>
  <el-row class="steps28_checkout">
    <el-col :span="24">
      <tenant-view-wait class="wait" :tip="`The contract expires in a month, Waiting for the landlord's confirmation`"></tenant-view-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'tenant-view-wait': viewWait
  },
  data () {
    return {
      params: {},
      content: {
        tip: `You have rejected the landlord claim and are now awaiting renegotiation`
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps28_checkout
    background-color: #fff
    .wait
      min-height: 750px
      /deep/ .time-img-waiting
        margin-top: 250px
</style>
