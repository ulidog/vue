<template>
  <el-row class="step36_checkout">
    <el-col :span="24">
      <landlord-success-tip :tip="content.tip"></landlord-success-tip>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import successTip from '@/components/contract/common/successTip'
export default {
  components: {
    'landlord-success-tip': successTip
  },
  data () {
    return {
      content: {
        tip: [`You have confirmed  continue to rent this home, and waiting for tenant 's confirmation`, `The tenant has determed  end the lease when the lease expire, waiting for the tenant to vacate the home.`]
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 179) {
      this.content.tip = this.content.tip[1]
    } else {
      this.content.tip = this.content.tip[0]
    }
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
            console.info(res)
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
  .step36_checkout
    background-color: #fff
</style>
