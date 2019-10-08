<template>
  <el-row class="steps_16_Views">
    <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <tenant-view-reason :reasonTip="inputContent" :isShowTextarea="false"></tenant-view-reason>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <tenant-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Upload again'"></tenant-submit>
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
    'tenant-submit': submit,
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
      confirmTitle: 'Application for refund',
      inputContent: null
    }
  },
  mounted () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.updateStatus(getStateLineStore(0, this.params.state))
    this.getOfferDetails()
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
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-15-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          } else {
            _this.ConfirmLoading = false
          }
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
            _this.inputContent = res.data.data.rentHouseOrderRecordingInfo.denialReason
          }
          // console.info(res)
        })
    },
    reasonFromChange (val) {
      this.reasonFrom = val
      console.log(this.reasonFrom)
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_16_Views
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
