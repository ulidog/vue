<template>
  <el-row class="steps12_checkout">
    <el-col class="header" :span="24">
      <landlord-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></landlord-wait>
      <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></landlord-confirm-and-reject>
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
    'landlord-wait': viewWait,
    'landlord-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      content: {
        tip: `You have received the deduction details from the landlord, please confirm.`,
        // noteMSG: `Cost of air-conditioning repairs: $20, health costs: $20, total deduction: $40`,
        noteMSG: null,
        isNoteMsg: true,
        isWaitImg: false
      },
      ConfirmLoading: false
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-15-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      this.$router.push({
        name: 'steps-13-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))}
      })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.rentHouseOrderDeductionInfo === undefined) return
            _this.content.noteMSG = res.data.data.rentHouseOrderDeductionInfo.deductionReason
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps12_checkout
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
