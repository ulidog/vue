<template>
  <el-row class="step_28_Views">
    <el-col :span="24" class="content">
      <section class="priceCompoed">
        <section class="Deposit">
          <span>Desposit</span>
          <el-input v-model="unitPriceAll" placeholder="price" :disabled="true"></el-input>
        </section>
        <span class="Less"></span>
        <section class="Compensation">
          <span>Compensation amount</span>
          <el-input v-model="unitPriceInspect" placeholder="price"></el-input>
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
            :rows="10"
            placeholder="eg:Repair of the home  facilities:$23, cleaning fee: 23, total amount of $46"
            v-model="submitFrom.compensations">
          </el-input>
        </section>
        <span class="Remarks">eg:Repair of the home  facilities:$23, cleaning fee: 23, total amount of $46</span>
      </section>
      <landlord-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'"></landlord-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewReason from '@/components/contract/common/viewReason'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit,
    'landlord-view-reason': viewReason
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
        pricePaymentAmount: null
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
      const processFrom = {
        // _this.params.state === 195 ? 25 : 31
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2,
        deductionReason: _this.submitFrom.compensations,
        deductionMoney: _this.priceComputed.priceInspect.replace(/((?![0-9.$]).)+|\.\.|\$/g, ''),
        refundMoney: _this.priceComputed.pricePaymentAmount.replace(/((?![0-9.$]).)+|\.\.|\$/g, '')
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.$router.push({
              name: 'step-29-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {},
    reasonFromChange (val) {
      this.reasonFrom = val
      console.log(this.reasonFrom)
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
            _this.priceComputed.priceAll = _this.params.deposit
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_28_Views
    .content
      background-color: #fff
      padding: 100px 0 40px
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
</style>
