<template>
  <el-row class="step18_tryit">
    <el-col class="header" :span="24">
      <buy-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></buy-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'buy-wait': viewWait
  },
  data () {
    return {
      content: {
        tip: `The buyer refused your claim for compensations.`,
        noteMSG: `eg: The repair cost is unreasonable, he is willing to pay half of the repair cost,Repair of the home facilities: $20`,
        isNoteMsg: true,
        isWaitImg: false,
        noteTitle: `Reasons for termination:`
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
            _this.content.noteMSG = res.data.data.orderDeductionInfo.deductionReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step18_tryit
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
