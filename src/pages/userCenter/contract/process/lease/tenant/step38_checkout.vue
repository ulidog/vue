<!-- 修改后合同到期流程主页 -->
<template>
  <el-row class="steps-38-checkout">
    <el-col :span="24" class="header">
      <h3>The contract expires in a month</h3>
      <section class="content">
        <el-radio-group v-model="RenewalFeeFrom.RenewalFeeType" class="radioSty">
          <el-radio :label="0" class="radiotype">continue to rent <span>Rent </span><el-input type="number" v-model="RenewalFeeFrom.price" :disabled="RenewalFeeFrom.RenewalFeeType != 0 ? true : false"></el-input></el-radio>
          <p>Select this option, the system will send a renewal of contract with your signature to the tenant automatically  after the tenant has submitted the renewal application.</p>
          <el-radio :label="1" class="radiotype">Maturity check out of a room</el-radio>
          <p>Select this option and the tenant cannot submit an application for renewal</p>
        </el-radio-group>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      params: {},
      RenewalFeeFrom: {
        RenewalFeeType: 0,
        price: 0
      }
    }
  },
  mounted () {
    this.updateStatus(4)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    })
  }
}
</script>
<style lang="sass" scoped>
  .steps-38-checkout
    .header
      background-color: #fff
      padding: 40px 30px
      h3
        font-size: 1.4375em
        font-weight: bold
        color: #444
      .content
        .radioSty
          p
            font-size: 21px
            color: #666
            line-height: 31px
            margin: 36px 0
          .radiotype
            display: flex
            align-items: center
            /deep/ .el-radio__input
              .el-radio__inner
                width: 24px
                height: 24px
                &:after
                  width: 10px
                  height: 10px
            /deep/ .el-radio__label
              font-size: 1.4735em
              padding-left: 20px

</style>
