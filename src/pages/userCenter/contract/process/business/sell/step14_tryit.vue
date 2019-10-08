<template>
  <el-row class="step14_checkout">
    <el-col class="header" :span="24">
      <sell-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></sell-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'sell-wait': viewWait,
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      content: {
        tip: `The amount of the deduction and the reason have been sent to buyer, waiting for confirmation by the other party`,
        noteMSG: `Cost of air-conditioning repairs: $20, health costs: $20, total deduction: $40`,
        isNoteMsg: true,
        isWaitImg: false
      },
      ConfirmLoading: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
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
            if (res.data.data.orderDeductionInfo === undefined) return
            _this.content.noteMSG = `Cost of air-conditioning repairs: ${res.data.data.orderDeductionInfo.deductionReason}`
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step14_checkout
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
