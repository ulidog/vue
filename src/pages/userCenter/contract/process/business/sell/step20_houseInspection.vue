<template>
  <el-row class="reductionViews">
    <el-col :span="24" class="content">
      <section class="discountApplicationFrom">
        <header class="tips" v-if="!isSuccessStatus">
          <article class="maskTip">
            <span><img src="/static/img/contract/icons/successStatus.png" alt="successStatus"></span>
            You have confirmed the buyer's application for discount, waiting for the buyer to upload the balance payment voucher
          </article>
        </header>
        <header class="titles" v-else>
          <h3>The buyer has submitted the discount application.</h3>
        </header>
        <section class="fromStart">
          <el-form ref="reductionForm" :model="reductionForm" class="reductionForm">
            <el-form-item class="formlist-item" prop="totalPrice">
              <label slot="label">The last payment owed</label>
              <span>({{ processType === 1 ? '90%' : '95%' }} of the total price of home and the rent of try-out period, rent reduction in a one month try-out period)</span>
              <el-input v-model="reductionForm.totalPrice" placeholder="$" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="reducePrice">
              <label slot="label">The amount of discount</label>
              <el-input v-model="reductionForm.reducePrice" placeholder="$" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="actualPrice">
              <label slot="label">The amount of last payment owed, including requested discount</label>
              <el-input v-model="reductionForm.actualPrice" placeholder="$" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="ReductionType">
              <label slot="label">Reduction reason</label>
              <el-input
                class="textarea"
                type="textarea"
                :rows="10"
                :disabled="isDisabled"
                placeholder="Explain the reasons for a lower price in detail"
                v-model="reductionForm.reduceReason">
              </el-input>
            </el-form-item>
          </el-form>
        </section>
      </section>
      <sell-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" v-if="isSuccessStatus"></sell-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      tip: `Uploaded successfully, waiting for the seller’s confirmation. Double click to view.`,
      reductionForm: {
        totalPrice: null,
        reducePrice: null,
        actualPrice: null,
        ReductionType: 0,
        reduceReason: null
      },
      ConfirmLoading: false,
      isSuccessStatus: true,
      isDisabled: true,
      rules: {
        reducePrice: [
          { required: true, message: 'The debit price cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  watch: {
    'reductionForm.reducePrice': function (to) {
      this.reductionForm.actualPrice = Number(this.reductionForm.totalPrice.toString()) - Number(to.toString())
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.params.state) === 27) {
      this.isSuccessStatus = false
    }
    console.log(window.history)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _change (val) {
      console.log(val)
    },
    _confirm (formName) {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.isSuccessStatus = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'sell-step-21',
        params: this.params,
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))}
      })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            if (res.data.data.orderDickerInfo === undefined) return
            _this.reductionForm = res.data.data.orderDickerInfo
          }
        })
    },
    ReductionTypeChange (val) {
      // console.log(val)
      this.reductionForm.reduceReason = this.ReductionList[val].label
    }
  }
}
</script>
<style lang="sass" scoped>
  .reductionViews
    background-color: #fff
    padding: 10px 38px 80px
    .content
      .discountApplicationFrom
        .titles
          height: 60px
          display: flex
          align-items: center
          justify-content: center
          h3
            color: #444
            font-size: 1.5625em
            font-weight: bold
        .tips
          margin: 50px 0
          .maskTip
            background-color: #F6F6F6
            border: 1px solid #ddd
            border-radius: 5px
            display: flex
            align-items: center
            justify-content: center
            position: relative
            height: 200px
            font-size: 1.4375em
            color: #444
            padding: 0 120px
            text-align: center
            line-height: 50px
          span
            position: absolute
            top: -30px
            display: flex
        .fromStart
          .reductionForm
            .formlist-item
              display: flex
              flex-direction: column
              /deep/ label
                  font-size: 23px
                  color: #444
                  font-weight: bold
                  float: left
              /deep/ .el-form-item__content
                span
                  font-size: 19px
                  color: #999
                .el-input
                  margin-top: 20px
                  input
                    height: 50px
              /deep/ .radioSty
                display: flex
                flex-direction: column
                margin-left: 20px
                .radio-items
                  margin: 0
                  height: 50px
                  line-height: 50px
                  .el-radio__label
                    font-weight: 400
                    color: #444
                    font-size: 19px
              /deep/ .textarea
                margin-top: 20px
                textarea
                  font-size: 19px
                  color: #444
</style>
