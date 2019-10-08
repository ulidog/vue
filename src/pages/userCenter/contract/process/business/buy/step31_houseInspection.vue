<template>
  <el-row class="step_23_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-show="!isSuccessStatus">Please upload your proof of payment</h4>
        <h4 v-show="isSuccessStatus">The proof of payment has been uploaded successfully, waiting for the seller’s confirmation.</h4>
      </section>
      <header class="titles-img-size">
        <h3>Property inspection test</h3>
        <span v-show="!isSuccessStatus">Upload 1-5 photos</span>
      </header>
      <buy-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></buy-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit" v-show="!isSuccessStatus">
      <buy-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></buy-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import submit from '@/components/contract/common/submit'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'buy-img-set': imgSet,
    'buy-submit': submit
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
      ConfirmLoading: false,
      price: 3344,
      isSuccessStatus: false,
      imgList: []
    }
  },
  mounted () {
    this.updateStatus(2)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.isSuccessStatus = true
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
  .step_23_Views
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      .success-status
        padding-top: 23px
        h4
          font-size: 1.4375em
          color: #444
      .titles-img-size
        padding: 23px 0
        display: flex
        flex-direction: row
        justify-content: space-between
        h3
          color: #666
          font-size: 1.4375em
        span
          font-size: 1.1875em
          color: #999
    .btn-submit
</style>
