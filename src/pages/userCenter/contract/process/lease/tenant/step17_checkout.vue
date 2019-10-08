<template>
  <el-row class="steps_17_Views">
    <el-col :span="24" class="content">
      <p>The landlord agrees to your application for check-out</p>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <tenant-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Evaluation of landlord'"></tenant-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'tenant-submit': submit
  },
  data () {
    return {
      ConfirmLoading: false
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
        _this.$router.push({
          path: '/userCenter/contract/process/tenant/steps-15-checkout'
        })
      }, 500)
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_17_Views
    .content
      background-color: #fff
      min-height: 728px
      display: flex
      justify-content: center
      align-items: center
      p
        color: #444
        font-size: 1.4375em
</style>
