<template>
  <el-row class="step_21_Views">
    <el-col :span="24" class="header">
      <section class="reason_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <sell-view-reason :reasonTip="reasonTip" :dispabledInput="false"></sell-view-reason>
      <sell-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading"></sell-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
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
      reasonTip: 'The actual amount of payment doesn’t match with the agreed amount of payment'
    }
  },
  mounted () {
    this.updateStatus(7)
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
          path: '/userCenter/contract/process/landlord/step-19-checkout'
        })
      }, 500)
    },
    _reject () {},
    reasonFromChange (val) {
      this.reasonFrom = val
      console.log(this.reasonFrom)
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
</style>
