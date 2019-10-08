<template>
  <el-row class="step08_checkout">
    <el-col class="header" :span="24">
      <landlord-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></landlord-wait>
    </el-col>
    <el-col class="footer" :span="24">
      <p class="tip">Please proceed to the next step after checking the house:</p>
      <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" :confirmTitle="`The home is undamaged`" :rejectTitle="`The home is damaged`"></landlord-confirm-and-reject>
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
      params: {},
      content: {
        tip: `You have received the tenant's application for check-out.`,
        noteMSG: `Going to work in another city.`,
        isNoteMsg: true,
        isWaitImg: false
      },
      ConfirmLoading: false
    }
  },
  mounted () {
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
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'common-steps-04',
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
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'step-09-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
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
            if (res.data.data.rentHouseOrderRecordingInfo === undefined) return
            _this.content.noteMSG = res.data.data.rentHouseOrderRecordingInfo.denialReason
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step08_checkout
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
