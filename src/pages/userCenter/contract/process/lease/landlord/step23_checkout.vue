<template>
  <el-row class="step_23_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>The contract expires in a month</h3>
        <p class="hireRent" v-if="isSuccessStatus">Eviction notice has been sent for confirmation by tenant</p>
      </header>
      <footer class="submit-btns">
        <landlord-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Notice of eviction'"></landlord-submit>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit
  },
  data () {
    return {
      ConfirmLoading: false,
      isSuccessStatus: false
    }
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
        _this.isSuccessStatus = true
        // _this.$router.push({
        //   path: '/userCenter/contract/process/tenant/steps-10-checkout'
        // })
      }, 500)
    },
    _reject () {
      this.isSuccessStatus = true
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_23_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      .title-tip
        height: 531px
        display: flex
        widtth: 100%
        justify-content: center
        flex-direction: column
        align-items: center
        h3
          font-size: 1.4375em
          color: #444
          font-weight: bold
        .hireRent
          margin-top: 58px
          height: 62px
          padding: 0 25px
          font-size: 1.1875em
          display: flex
          justify-content: center
          align-items: center
          color: #fff
          background-color: rgba(0,0,0,.6)
</style>
