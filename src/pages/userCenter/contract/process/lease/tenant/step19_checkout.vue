<template>
  <el-row class="steps19_checkout">
    <el-col :span="24" class="content">
      <tenant-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></tenant-wait>
      <section class="priceCompoed">
        <section class="Deposit">
          <span>Return double deposit</span>
          <el-input v-model="doubleDeposit" placeholder="price" :disabled="true"></el-input>
        </section>
        <section class="Compensation">
          <span>Prorated Rent (Rent/month: {{ rentMonth }}, Rent payment: {{ rentPaymentType }})</span>
          <el-input v-model="unitPriceInspect" placeholder="price" :disabled="true"></el-input>
        </section>
        <section class="Payment">
          <span>Total refund</span>
          <el-input v-model="unitPricePaymentAmount" placeholder="price" :disabled="true"></el-input>
        </section>
        <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-wait': viewWait,
    'tenant-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      content: {
        tip: `The landlord terminated the rental contract.`,
        noteMSG: `A house needs its own dwelling`,
        isNoteMsg: true,
        isWaitImg: false,
        msgtip: `To terminate the lease early, the landlord pays double the deposit. The compensation amount: $500`
      },
      doubleDeposit: null,
      rentMonth: null,
      rentPaymentType: null,
      unitPriceInspect: null,
      unitPricePaymentAmount: null,
      ConfirmLoading: false
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
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-22-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      this.$router.push({
        name: 'steps-20-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            _this.doubleDeposit = `$${Number(_this.params.deposit) * 2}`
            _this.rentMonth = _this.params.monthlyRent
            _this.rentPaymentType = [_this.params.rentPayment].map(item => {
              let typeString
              switch (Number(item)) {
                case 1:
                  typeString = 'Monthly'
                  break
                case 2:
                  typeString = 'Quarterly'
                  break
                case 3:
                  typeString = 'Half year'
                  break
                case 4:
                  typeString = 'Year'
                  break
              }
              return typeString
            })[0]
            if (res.data.data.rentHouseOrderDeductionInfo === undefined) return
            _this.unitPriceInspect = '$' + res.data.data.rentHouseOrderDeductionInfo.deductionMoney
            _this.unitPricePaymentAmount = '$' + res.data.data.rentHouseOrderDeductionInfo.refundMoney
            _this.content.noteMSG = res.data.data.rentHouseOrderDeductionInfo.deductionReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps19_checkout
    background-color: #fff
    .content
      padding-bottom: 30px
    .priceCompoed
      display: flex
      justify-content: space-between
      margin: 0 1.875em
      flex-direction: column
      .reson
        height: 5em
        border-bottom: 1px solid #F3F4F5
        margin-top: 5px
        h3
          color: #444
          font-size: 1.375em
          font-weight: bold
          text-align: center
          display: flex
          align-items: center
          height: 100%
          justify-content: center
      .Deposit,.Compensation,.Payment
        width: 100%
        span
          font-size: 1.4375em
          height: 70px
          display: flex
          align-items: center
          justify-content: flex-start
          color: #444
        /deep/ .el-input__inner
          height: 2.73em
          font-size: 1.4375em
      >span
        font-size: 1.8em
        display: flex
        align-items: center
        margin-top: 65px
        position: relative
      >span.Less:before
        content: ''
        height: 1px
        background-color: #444444
        width: 21px
        position: absolute
        bottom: 30px
        right: -10px
      >span.equal:before
        content: ''
        height: 1px
        background-color: #444444
        width: 21px
        position: absolute
        bottom: 28px
        right: -10px
      >span.equal:after
        content: ''
        height: 1px
        background-color: #444444
        width: 21px
        position: absolute
        bottom: 34px
        right: -10px
</style>
