<template>
  <el-row class="step_16_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Please fill out the reason for early termination of contract.</h3>
      </header>
      <section class="checkoutmsg">
        <el-input
          class="checkoutmsg-textarea"
          type="textarea"
          v-model="checkoutmsg">
        </el-input>
      </section>
      <section class="check-note">
        <article class="intro">Ending a rental contract in advance, double deposit shall be paid. The compensation amount: {{price}}</article>
      </section>
      <footer class="submit-btns">
        <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :rejectTitle="'Return'" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      ConfirmLoading: false,
      checkoutmsg: null,
      price: null
    }
  },
  mounted () {
    this.updateStatus(4)
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
          path: '/userCenter/contract/process/tenant/steps-11-checkout'
        })
      }, 500)
    },
    _reject () {}
  }
}
</script>
<style lang="sass" scoped>
  .step_16_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 5px 2.5em
      .title-tip
        display: flex
        justify-content: flex-start
        align-items: center
        height: 76px
        h3
          font-size: 1.4375em
          color: #444
          font-weight: bold
      .checkoutmsg
        width: 100%
        height: 370px
        // background-color: #F3F4F5
        /deep/ .el-textarea
          width: 100%
          height: 100%
          textarea
            width: 100%
            height: 100%
            background-color: #F3F4F5
            resize: none
            border: none
            font-size: 1.4375em
      .check-note
        margin-top: 35px
        margin-left: 10px
        .intro
          font-size: 1.4375em
          font-weight: 400
          color: rgba(18,129,252,1)
          line-height: 37px
</style>
