<template>
  <el-row class="step16_tryit">
    <el-col class="header" :span="24">
      <buy-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></buy-wait>
      <buy-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></buy-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-wait': viewWait,
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      content: {
        tip: `You have received the deduction details from the seller please confirm`,
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-20',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'buy-steps-17',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
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
  .step16_tryit
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
