<!-- 修改后合同到期流程主页 -->
<template>
  <el-row class="steps-35-checkout">
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
      <landlord-submit :submitTitle="'Confirm'" @ConfirmChange="_confirm"></landlord-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit
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
      _this.ConfirmLoading = true
      let processFrom = {
        processState: 23,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      if (Number(this.RenewalFeeFrom.RenewalFeeType) !== 0) {
        processFrom['state'] = 2
        _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
          .then(res => {
            if (res.success) {
              _this.ConfirmLoading = false
              _this.$router.push({
                name: 'step-36-checkout',
                params: _this.params,
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
              })
            } else {
              _this.ConfirmLoading = false
            }
          })
          .catch(err => {
            _this.ConfirmLoading = false
            console.log(err)
          })
      } else {
        processFrom['state'] = 1
        processFrom['renewalMonthlyRent'] = this.RenewalFeeFrom.price
        _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
          .then(res => {
            if (res.success) {
              _this.ConfirmLoading = false
              _this.$router.push({
                name: 'step-36-checkout',
                params: _this.params,
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
              })
            } else {
              _this.ConfirmLoading = false
            }
          })
          .catch(err => {
            _this.ConfirmLoading = false
            console.log(err)
          })
      }
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
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
  .steps-35-checkout
    .header
      background-color: #fff
      padding: 40px 30px
      h3
        font-size: 1.4375em
        font-weight: bold
        color: #444
      .content
        .radioSty
          margin: 36px 0
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
