<template>
  <el-row class="step_25_Views">
    <el-col :span="24" class="header">
      <header class="tips">
        <article class="maskTip">
          <span><img src="/static/img/contract/icons/warningStatus.png" alt="warningStatus"></span>
          You have rejected the buyer's proof of payment waiting for the buyer to re-upload
        </article>
      </header>
    </el-col>
    <el-col :span="24" class="content">
      <h4>Reasons for termination</h4>
      <sell-view-reason :reasonTip="null" :inputContent="inputContent" :dispabledInput="true"></sell-view-reason>
      <!-- <sell-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading"></sell-submit> -->
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
    'sell-submit': submit,
    'sell-view-reason': viewReason
  },
  data () {
    return {
      reasonFrom: {
        reasonType: 0,
        reasonMsg: null
      },
      ConfirmLoading: false,
      inputContent: 'The actual amount of payment doesn’t match with the agreed amount of payment'
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
          name: 'sell-step-19',
          params: _this.params,
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
        })
      }, 500)
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
            if (res.data.data.saleHouseOrderRecordingInfo) {
              _this.inputContent = res.data.data.saleHouseOrderRecordingInfo.denialReason
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_25_Views
    .header
      background-color: #fff
      width: 100%
      padding: 3.875em
      // .reason_title
      //   height: 62px
      //   display: flex
      //   align-items: center
      //   justify-content: center
      //   border-bottom: 1px solid #F3F4F5
      //   h3
      //     font-size: 1.8125em
      //     color: #444444
      .tips
        margin: 40px 0
        .maskTip
          background-color: #F6F6F6
          border: 1px solid #ddd
          border-radius: 5px
          display: flex
          align-items: center
          justify-content: center
          position: relative
          height: 200px
          font-size: 1.4375em
          color: #444
          padding: 0 120px
          text-align: center
          line-height: 50px
        span
          position: absolute
          top: -30px
          display: flex
    .content
      background-color: #fff
      >h4
        font-size: 18px
        color: #444
        padding: 0 3.875em
</style>
