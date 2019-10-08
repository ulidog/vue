<template>
  <el-row class="comon_waiting">
    <el-col class="header" :span="24">
      <buy-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg" class="min-height"></buy-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'buy-wait': viewWait
  },
  data () {
    return {
      content: {
        tip: null,
        noteMSG: null,
        isNoteMsg: false,
        isWaitImg: true,
        noteTitle: null
      },
      ConfirmLoading: false,
      tipList: [`You have confirmed the payment voucher and are waiting for the buyer's next operation.`, ``]
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    this.content.tip = Number(this.processType) === 1 ? this.tipList[0] : this.tipList[1]
    if (Number(this.params.state) === 196) {
      this.content.tip = `Wait for the seller to upload the refund voucher`
    }
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
  .comon_waiting
    .header
      .min-height
        /deep/ .content
          min-height: 500px
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
