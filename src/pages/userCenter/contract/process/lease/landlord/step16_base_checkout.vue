<template>
  <el-row class="step_16_base_Views">
    <el-col :span="24" class="content">
      <section class="compensations">
        <h3 class="headerTitle">Please fill out the reason for early termination of contract.</h3>
        <section class="article-content">
          <el-input
            type="textarea"
            :rows="10"
            v-model="submitFrom.compensations">
          </el-input>
        </section>
      </section>
      <section class="priceCompoed">
        <header class="reson">
          <h3>Refund amount</h3>
        </header>
        <section class="Deposit">
          <span>Return double deposit</span>
          <el-input v-model="unitPriceAll" placeholder="price" :disabled="true"></el-input>
        </section>
        <section class="Compensation">
          <span>Prorated Rent (Rent/month: {{ rentMonth }}, Rent payment: {{ rentPaymentType }})</span>
          <el-input v-model="unitPriceInspect" placeholder="price" @blur="filterString"></el-input>
        </section>
        <section class="Payment">
          <span>Total refund</span>
          <el-input v-model="unitPricePaymentAmount" placeholder="price" :disabled="true"></el-input>
        </section>
        <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" rejectTitle="Return"></tenant-confirm-and-reject>
      </section>
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
        priceInspect: '$0',
        pricePaymentAmount: '0',
        a: null
      },
      rentMonth: null,
      rentPaymentType: null,
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
      let p = Number(this.priceComputed.priceAll.toString().replace(/\D/g, '')) + Number(val.replace(/\D/g, ''))
      this.priceComputed.pricePaymentAmount = this.priceformat(p)
    },
    'priceComputed.priceAll': function (_new, _old) {
      let p = Number(_new.toString().replace(/\D/g, '')) + Number(this.priceComputed.priceInspect.replace(/\D/g, ''))
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
        this.priceComputed.priceInspect = this.priceformat(p.toString().replace(/((?![0-9.$]).)+|\.\./g, ''))
      }
    },
    unitPricePaymentAmount: {
      get: function () {
        return this.priceComputed.pricePaymentAmount
      },
      set: function (p) {
        this.priceComputed.pricePaymentAmount = this.priceformat(p.toString().replace(/((?![0-9.$]).)+|\.\./g, ''))
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
        processState: 19,
        rentHouseOrderId: _this.params.id,
        state: 2,
        deductionReason: _this.submitFrom.compensations,
        deductionMoney: _this.priceComputed.priceInspect.toString().replace(/\D/g, ''),
        refundMoney: _this.priceComputed.pricePaymentAmount.toString().replace(/\D/g, '')
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.$router.push({
              name: 'step-17-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'step-15-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    filterString () {
      this.priceComputed.priceInspect = this.priceComputed.priceInspect.toString().replace(/\$+((?![0-9.$]).)+|\.\./g, '')
    },
    reasonFromChange (val) {
      this.reasonFrom = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            _this.priceComputed.priceAll = `$${Number(_this.params.deposit) * 2}`
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
          }
          // console.info(res)
        })
    },
    priceformat (p) {
      let AfterProgressing = []
      p.toString().replace(/((?![0-9.$]).)+|\.\.|\$/g, '').replace(/\$/g, '').split('').filter(items => {
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
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_16_base_Views
    .content
      background-color: #fff
      padding: 0 0 40px
      .header-titls
        margin: 0 1.875em
        h3
          font-size: 1.4375em
          color: #444
          height: 50px
          font-weight: bold
      .compensations
        margin: 0 1.875em 0
        .headerTitle
          height: 65px
          font-size: 1.4375em
          color: #444
          line-height: 65px
          font-weight: bold
        .article-content
          /deep/ textarea
            background-color: #f3f4f5
            font-size: 1.25em
            resize: none
        .Remarks
          color: #666
          font-size: 1.1875em
          margin-top: 15px
          display: flex
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
