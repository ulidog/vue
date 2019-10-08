<template>
  <el-row class="step_27_Views">
    <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <landlord-view-reason class="minHeight" :isShowTextarea="false" :reasonTip="reasonFrom.reasonMsg"></landlord-view-reason>
      <landlord-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Upload again'"></landlord-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewReason from '@/components/contract/common/viewReason'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit,
    'landlord-view-reason': viewReason
  },
  data () {
    return {
      params: {},
      reasonFrom: {
        reasonType: 0,
        reasonMsg: null
      },
      ConfirmLoading: false,
      confirmTitle: 'Application for refund'
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
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          name: (_this.params.state !== 25 && _this.params.state !== 183) ? 'step-26-checkout' : 'step-28-checkout',
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
          params: _this.params
        })
      }, 500)
    },
    _reject () {},
    reasonFromChange (val) {
      this.reasonFrom = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.rentHouseOrderRecordingInfo !== undefined) {
              if (res.data.data.rentHouseOrderRecordingInfo.denialReason !== undefined) {
                _this.reasonFrom.reasonMsg = res.data.data.rentHouseOrderRecordingInfo.denialReason
              }
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_27_Views
    .header
      background-color: #fff
      width: 100%
      .reason_title
        height: 62px
        display: flex
        align-items: center
        justify-content: center
        border-bottom: 1px solid #F3F4F5
        h3
          font-size: 1.8125em
          color: #444444
    .content
      background-color: #fff
      padding-bottom: 30px
      .minHeight
        min-height: 500px
</style>
