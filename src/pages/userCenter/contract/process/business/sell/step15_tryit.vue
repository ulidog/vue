<template>
  <el-row class="step15_tryit">
    <el-col class="header" :span="24">
      <sell-wait :tip="content.tip" :noteTitle="content.noteTitle" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></sell-wait>
      <sell-submit @ConfirmChange="_confirm" :confirmTitle="'Confirm'" :ConfirmLoading="ConfirmLoading"></sell-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'sell-wait': viewWait,
    'sell-submit': submit
  },
  data () {
    return {
      params: {},
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
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          name: 'sell-step-13',
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
          params: _this.params
        })
      }, 500)
    },
    _reject () {
      this.$router.push({
        path: '/userCenter/contract/process/tenant/steps-13-checkout'
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
            if (res.data.data.saleHouseOrderRecordingInfo === undefined) return
            _this.content.noteMSG = res.data.data.saleHouseOrderRecordingInfo.denialReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step15_tryit
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
