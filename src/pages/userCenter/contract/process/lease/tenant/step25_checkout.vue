<template>
  <el-row class="steps25_checkout">
    <el-col :span="24" class="content">
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
        tip: `You have rejected the landlord's payment voucher, waiting for the landlord to re-upload`
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
            if (res.data.data.rentHouseOrderDeductionInfo === undefined) {
              _this.content.tip = 'Waiting for the landlord to upload the payment certificate'
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps25_checkout
    background-color: #fff
    .content
      display: flex
</style>
