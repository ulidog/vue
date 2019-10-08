<template>
  <el-row class="comon_07">
    <el-col :span="24">
      <tenant-success-tip :tip="content.tip"></tenant-success-tip>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import successTip from '@/components/contract/common/successTip'
export default {
  components: {
    'tenant-success-tip': successTip
  },
  data () {
    return {
      content: {
        tip: null
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.content.tip = this.$route.params.msg
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
            // console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (_this.$route.params.msg === undefined) {
              if (res.data.data.rentHouseOrderDeductionInfo && Object.keys(res.data.data.rentHouseOrderDeductionInfo).length !== 0) {
                this.content.tip = res.data.data.rentHouseOrderDeductionInfo.deductionReason
              }
              if (res.data.data.rentHouseOrderRecordingInfo && Object.keys(res.data.data.rentHouseOrderRecordingInfo).length !== 0) {
                this.content.tip = res.data.data.rentHouseOrderRecordingInfo.denialReason
              }
            }
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .comon_07
    background-color: #fff
</style>
