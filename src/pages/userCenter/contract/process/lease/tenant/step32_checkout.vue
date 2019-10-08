<template>
  <el-row class="steps_32_Views">
    <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <tenant-view-reason :remarsks="'eg:The repair cost is unreasonable, he is willing to pay half of the repair cost'" :dispabledInput="false" @reasonFrom="reasonFromChange"></tenant-view-reason>
      <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewReason from '@/components/contract/common/viewReason'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject,
    'tenant-view-reason': viewReason
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      const _this = this
      _this.processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.reasonFrom.reasonMsg
      }
      _this.ConfirmLoading = true
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-33-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      this.$router.push({
        name: 'steps-31-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    reasonFromChange (val) {
      this.reasonFrom = val
      console.log(this.reasonFrom)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_32_Views
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
