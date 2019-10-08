<template>
  <el-row class="step_21_Views">
    <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>The seller rejected your proof of payment</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <sell-view-reason :reasonTip="null" :dispabledInput="true" :inputContent="inputContent"></sell-view-reason>
      <sell-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" submitTitle="Upload again"></sell-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewReason from '@/components/contract/common/viewReason'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'sell-submit': submit,
    'sell-view-reason': viewReason
  },
  data () {
    return {
      params: {},
      reasonFrom: {
        reasonType: 0,
        reasonMsg: null
      },
      ConfirmLoading: false,
      reasonTip: 'Reasons for refusing a lower price',
      inputContent: null
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
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-29',
              query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
              params: this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      if (_this.ConfirmLoading) {
        setTimeout(() => {
          _this.ConfirmLoading = false
        }, 100000)
      }
    },
    _reject () {},
    reasonFromChange (val) {
      this.reasonFrom = val
      console.log(this.reasonFrom)
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
            _this.inputContent = res.data.data.saleHouseOrderRecordingInfo.denialReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_21_Views
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
      padding: 0 30px 30px
      /deep/ .reason_type
        margin: 15px
</style>
