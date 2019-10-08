<template>
  <el-row class="step_13_Views">
    <el-col :span="24" class="content">
      <section class="priceCompoed">
        <section class="price-items">
          <span>Down Payment</span>
          <el-input v-model="unitPriceAdvancePayment" placeholder="price" :disabled="true"></el-input>
        </section>
        <span class="Less"></span>
        <section class="price-items">
          <span>Rent</span>
          <el-input v-model="unitPriceRent" placeholder="price" :disabled="true"></el-input>
        </section>
        <span class="Less"></span>
        <section class="price-items">
          <span>Compensation amount</span>
          <el-input v-model="unitPriceInspect" placeholder="price"></el-input>
        </section>
        <span class="equal"></span>
        <section class="price-items">
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
            placeholder="eg:Repair of the home facilities:$23,cleaning fee: 23, total amount of $46"
            v-model="submitFrom.compensations">
          </el-input>
        </section>
        <span class="Remarks">eg:Repair of the home facilities:$23,cleaning fee: 23, total amount of $46</span>
      </section>
      <sell-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'"></sell-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'sell-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      confirmTitle: 'Application for refund',
      priceComputed: {
        unit: '$',
        priceAdvance: '500',
        priceRent: '$',
        priceInspect: '$',
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
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  watch: {
    'priceComputed.priceRent': function (val, oldVal) {
      let p = this.priceComputed.priceAdvance.toString().replace(/((?![0-9.$]).)+|\.\./g, '') - this.priceComputed.priceInspect.toString().replace(/((?![0-9.$]).)+|\.\./g, '') - val.toString().replace(/((?![0-9.$]).)+|\.\./g, '')
      this.priceComputed.pricePaymentAmount = this.priceformat(p)
    },
    'priceComputed.priceInspect': function (val, oldVal) {
      // console.log(this.priceComputed.priceRent.toString().replace(/((?![0-9\.\$]).)+|\.\./g, ''), val.replace(/((?![0-9\.\$]).)+|\.\./g, ''))
      let p = this.priceComputed.priceAdvance.toString().replace(/((?![0-9.$]).)+|\.\./g, '') - this.priceComputed.priceRent.toString().replace(/((?![0-9.$]).)+|\.\./g, '') - val.toString().replace(/((?![0-9.$]).)+|\.\./g, '')
      this.priceComputed.pricePaymentAmount = this.priceformat(p)
    }
  },
  computed: {
    unitPriceAdvancePayment: {
      get: function () {
        return this.priceComputed.priceAdvance
      },
      set: function (p) {
        this.priceComputed.priceAdvance = this.priceformat(p)
      }
    },
    unitPriceRent: {
      get: function () {
        return this.priceComputed.priceRent
      },
      set: function (p) {
        this.priceComputed.priceRent = this.priceformat(p)
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
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      const pFrom = {
        houseOrderId: _this.params.id,
        deductionReason: _this.submitFrom.compensations,
        deductionMoney: _this.priceComputed.priceInspect.replace(/((?![0-9.$]).)+|\.\./g, ''),
        refundMoney: _this.priceComputed.pricePaymentAmount.replace(/((?![0-9.$]).)+|\.\./g, '')
      }
      console.info(pFrom)
      _this.$axios.post(`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_order_deduction`, pFrom)
        .then(res => {
          if (res.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
              .then(res => {
                if (res.success) {
                  _this.ConfirmLoading = false
                  console.log('提交成功!')
                  _this.$router.push({
                    name: 'sell-step-14',
                    query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                    params: _this.params
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
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
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.priceComputed.priceAdvance = _this.params.advanceMoney
            _this.priceComputed.priceRent = _this.params.tryRent * _this.params.tryTime
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_13_Views
    .content
      background-color: #fff
      padding: 50px 0 40px
      .priceCompoed
        display: flex
        justify-content: space-between
        margin: 0 1.875em
        .price-items
          width: 22%
          span
            font-size: 1.4375em
            height: 70px
            display: flex
            align-items: center
            justify-content: flex-start
            color: #444
            font-weight: bold
          /deep/ .el-input__inner
            height: 45px
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
          width: 10px
          position: absolute
          bottom: 22px
          right: -5px
        >span.equal:before
          content: ''
          height: 1px
          background-color: #444444
          width: 10px
          position: absolute
          bottom: 18px
          right: -5px
        >span.equal:after
          content: ''
          height: 1px
          background-color: #444444
          width: 10px
          position: absolute
          bottom: 26px
          right: -5px
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
