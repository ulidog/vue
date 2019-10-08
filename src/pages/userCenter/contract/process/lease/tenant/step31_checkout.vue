<template>
  <el-row class="step_31_Views">
    <el-col :span="24" class="content">
      <section class="header-titls">
        <h3>You have received the landlord’s lists of compensations, please check it.</h3>
      </section>
      <section class="priceCompoed">
        <section class="Deposit">
          <span>Desposit</span>
          <el-input v-model="unitPriceAll" placeholder="price" :disabled="true"></el-input>
        </section>
        <span class="Less"></span>
        <section class="Compensation">
          <span>Compensation amount</span>
          <el-input v-model="unitPriceInspect" placeholder="price" :disabled="true"></el-input>
        </section>
        <span class="equal"></span>
        <section class="Payment">
          <span>Payment amount</span>
          <el-input v-model="unitPricePaymentAmount" placeholder="price" :disabled="true"></el-input>
        </section>
      </section>
      <section class="compensations">
        <h3 class="headerTitle">Fill in the lists of compensations:</h3>
        <section class="article-content">
          <el-input
            type="textarea"
            :disabled="true"
            :rows="10"
            placeholder="eg:Repair of the home  facilities:$23, cleaning fee: 23, total amount of $46"
            v-model="submitFrom.compensations">
          </el-input>
        </section>
        <span class="Remarks">eg:Repair of the home  facilities:$23, cleaning fee: 23, total amount of $46</span>
      </section>
      <tenant-confirm-and-reject class="padding_10" @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      confirmTitle: 'Application for refund',
      priceComputed: {
        unit: '$',
        priceAll: '$500',
        priceInspect: null,
        pricePaymentAmount: null,
        a: null
      },
      submitFrom: {
        compensations: null
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
  },
  watch: {
    'priceComputed.priceInspect': function (val, oldVal) {
      // console.log(this.priceComputed.priceAll.toString().replace(/((?![0-9\.\$]).)+|\.\./g, ''), val.replace(/((?![0-9\.\$]).)+|\.\./g, ''))
      let p = this.priceComputed.priceAll.toString().replace(/((?![0-9.$]).)+|\.\.|\$/g, '') - val.replace(/((?![0-9.$]).)+|\.\.|\$/g, '')
      this.priceComputed.pricePaymentAmount = this.priceformat(p)
    }
  },
  computed: {
    unitPriceAll: {
      get: function () {
        return this.priceComputed.priceAll
      },
      set: function (p) {
        this.priceComputed.priceAll = this.priceformat(p)
      }
    },
    unitPriceInspect: {
      get: function () {
        return this.priceComputed.priceInspect
      },
      set: function (p) {
        this.priceComputed.priceInspect = this.priceformat(p)
      }
    },
    unitPricePaymentAmount: {
      get: function () {
        return this.priceComputed.pricePaymentAmount
      },
      set: function (p) {
        this.priceComputed.pricePaymentAmount = this.priceformat(p)
      }
    }
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
      if (_this.params.state === 33) {
        _this.$router.push({
          name: 'steps-34-checkout',
          query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
          params: _this.params
        })
      } else {
        const processFrom = {
          processState: _this.params.state,
          rentHouseOrderId: _this.params.id,
          state: 1
        }
        _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
          .then(res => {
            // console.log(res)
            if (res.success) {
              _this.getOfferDetails()
              _this.isSuccessStatus = true
              _this.$router.push({
                name: 'steps-37-checkout',
                query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
                params: _this.params
              })
            }
          })
      }
    },
    _reject () {
      this.$router.push({
        name: 'steps-32-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    reasonFromChange (val) {
      this.reasonFrom = val
    },
    priceformat (p) {
      let AfterProgressing = []
      p.toString().replace(/\$/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return this.priceComputed.unit + AfterProgressing.reverse().join('')
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            _this.priceComputed.priceAll = '$' + _this.params.deposit
            _this.priceComputed.priceInspect = '$' + res.data.data.rentHouseOrderDeductionInfo.deductionMoney
            _this.priceComputed.pricePaymentAmount = '$' + res.data.data.rentHouseOrderDeductionInfo.refundMoney
            _this.submitFrom.compensations = res.data.data.rentHouseOrderDeductionInfo.deductionReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_31_Views
    .content
      background-color: #fff
      padding: 20px 0 40px
      .header-titls
        margin: 0 1.875em
        h3
          font-size: 1.4375em
          color: #444
          height: 50px
          font-weight: bold
      .priceCompoed
        display: flex
        justify-content: space-between
        margin: 0 1.875em
        .Deposit,.Compensation,.Payment
          width: 30%
          span
            font-size: 1.4375em
            height: 70px
            display: flex
            align-items: center
            justify-content: flex-start
            color: #444
          /deep/ .el-input__inner
            height: 62px
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
      .compensations
        margin: 40px 1.875em 0
        .headerTitle
          height: 65px
          font-size: 1.4375em
          color: #444
          line-height: 65px
        .article-content
          /deep/ textarea
            background-color: #f3f4f5
            font-size: 23px
        .Remarks
          color: #666
          font-size: 1.1875em
          margin-top: 15px
          display: flex
      .padding_10
        padding: 0 30px
</style>
