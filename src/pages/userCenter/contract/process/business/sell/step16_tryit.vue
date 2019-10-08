<template>
  <el-row class="step_16_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4>The payment voucher you recived</h4>
      </section>
      <header class="titles-img-size">
        <h3>The home is damaged.The amount of refund is 5% total price of home beyond a breach of contract period .The reductionof rent during try-out period,charges of clean and repair ${{ refundMoney }}</h3>
      </header>
      <sell-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></sell-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <sell-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></sell-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'sell-img-set': imgSet,
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      refuseMsg: null,
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
      refundMoney: 0,
      isSuccessStatus: true,
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
    _confirm () {
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
    _reject () {
      this.$router.push({
        path: '/userCenter/contract/process/landlord/step-04-refuse'
      })
    },
    refuseFromChange (val) {
      this.refuseFrom = val
      console.log(this.refuseFrom)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            if (res.data.data.orderDeductionInfo !== undefined) {
              _this.refuseMsg = res.data.data.orderDeductionInfo.deductionReason
              _this.refundMoney = res.data.data.orderDeductionInfo.refundMoney
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_16_Views
    .header
      background-color: #fff
      width: 100%
      .payment_title
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
