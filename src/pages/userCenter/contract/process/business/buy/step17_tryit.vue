<template>
  <el-row class="steps_17_Views">
    <!-- <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col> -->
    <el-col :span="24" class="content">
      <buy-view-reason :dispabledInput="false" :reasonTip="reasonTip" @reasonFrom="reasonFromChange" :remarsks="remarsks"></buy-view-reason>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <buy-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading"></buy-submit>
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
    'buy-submit': submit,
    'buy-view-reason': viewReason
  },
  data () {
    return {
      reasonFrom: {
        reasonType: 0,
        reasonMsg: null
      },
      ConfirmLoading: false,
      reasonTip: `Please fill in  Reasons for termination`,
      remarsks: `eg: The repair cost is unreasonable, he is willing to pay half of the repair cost,Repair of the home facilities`
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
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.reasonFrom.reasonMsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-18',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
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
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_17_Views
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
</style>
