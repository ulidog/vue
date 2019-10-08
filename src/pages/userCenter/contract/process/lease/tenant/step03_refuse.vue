<template>
  <el-row class="steps_03_Views">
    <el-col :span="24" class="header">
      <section class="refuse_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <tenant-refuse @refuseFrom="refuseFromChange" :refuseTypeList="refuseTypeList"></tenant-refuse>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <section class="Confirm">
        <el-button type="primary" class="btns" @click="ConfirmChange" :loading="ConfirmLoading">Submit</el-button>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import refuse from '@/components/contract/common/refuse'
export default {
  components: {
    'tenant-refuse': refuse
  },
  data () {
    return {
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      refuseTypeList: [
        {
          label: 'The signature is blurred',
          value: 0
        },
        {
          label: 'Suspend renting',
          value: 1
        },
        {
          label: 'Other reasons',
          value: 2
        }
      ],
      ConfirmLoading: false
    }
  },
  mounted () {
    this.updateStatus(1)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ConfirmChange () {
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
    refuseFromChange (val) {
      this.refuseFrom = val
      console.log(this.refuseFrom)
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_03_Views
    .header
      background-color: #fff
      width: 100%
      .refuse_title
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
