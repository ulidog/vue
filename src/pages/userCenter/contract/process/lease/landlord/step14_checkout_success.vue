<template>
  <el-row class="step14_success">
    <el-col class="header" :span="24">
      <header class="rate-titles">
        <h3>Evaluation</h3>
      </header>
      <section class="rate-box">
        <section class="rate-all">
          <span>The overall evaluation:</span>
          <el-rate
            v-model="successFrom.rateAll"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
        <section class="rate-other-side">
          <span>Other side:</span>
          <el-rate
            v-model="successFrom.otherSide"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
        <section class="rate-platfor-services">
          <span>Platform services:</span>
          <el-rate
            v-model="successFrom.platformServices"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
      </section>
      <footer class="comments">
        <h4>Comments</h4>
        <el-input
          class="comments-textarea"
          type="textarea"
          placeholder="Write down your comments about the platform and the other person."
          v-model="successFrom.msg">
        </el-input>
      </footer>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" :confirmTitle="'Submit'" :rejectTitle="'Skip'"></landlord-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'landlord-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      successFrom: {
        rateAll: 0,
        otherSide: 0,
        platformServices: 0,
        msg: null
      },
      ConfirmLoading: false
    }
  },
  beforeCreate () {
    // 关闭主组件 （footer）
    this.$emit('configInfo', {
      showProcess: false,
      isFullScreen: true
    })
  },
  mounted () {
    this.updateStatus(5)
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
        // _this.$router.push({
        //   path: '/userCenter/contract/process/tenant/steps-03'
        // })
      }, 500)
    },
    _reject () {
      this.$router.push({
        path: '/userCenter/contract/process/landlord/step-04-refuse'
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step14_success
    .header
      background-color: #fff
      .rate-titles
        height: 62px
        border-bottom: 1px solid #f3f4f5
        display: flex
        justify-content: center
        align-items: center
        h3
          font-size: 1.8125em
          color: #444444
      .rate-box
        .rate-all,.rate-other-side,.rate-platfor-services
          display: flex
          justify-content: space-between
          height: 64px
          align-items: center
          padding: 0 30px
          span
            font-size: 1.5625em
            color: #444444
          /deep/ .el-rate
            span
              i
                font-size: 34px
      .comments
        margin: 125px 30px 25px
        h4
          padding-bottom: 20px
          font-size: 1.5625em
          color: #444
        /deep/ .comments-textarea.el-textarea
          height: 290px
          width: 100%
          .el-textarea__inner
            width: 100%
            height: 100% !important
            font-size: 1.4325em
            border: none
            background-color: #f3f4f5
            resize: none
</style>
