<template>
  <el-row class="comon_08">
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
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            if (_this.$route.params.msg === undefined) {
              if (res.data.data.saleHouseOrderRecordingInfo !== undefined) {
                this.content.tip = res.data.data.saleHouseOrderRecordingInfo.denialReason
              }
            }
            if (_this.$route.params.msg === undefined) {
              if (res.data.data.saleHouseOrderRecordingInfoTwo !== undefined) {
                this.content.tip = res.data.data.saleHouseOrderRecordingInfoTwo.denialReason
              }
            }
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .comon_08
    background-color: #fff
</style>
