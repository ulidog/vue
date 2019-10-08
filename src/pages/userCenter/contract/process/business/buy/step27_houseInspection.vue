<template>
  <el-row class="reductionViews">
    <el-col :span="24" class="content">
      <section class="discountApplicationFrom">
        <header class="tips" v-if="isSuccessStatus && !isReduceReason">
          <article class="maskTip">
            <span><img src="/static/img/contract/icons/successStatus.png" alt="successStatus"></span>
            The discount application has been submitted successfully. Please wait for the seller’s reply.
          </article>
        </header>
        <header class="tips" v-if="isReduceReason">
          <article class="maskTip">
            <span><img src="/static/img/contract/icons/warningStatus.png" alt="successStatus"></span>
            {{reduceReasonTip}}
          </article>
        </header>
        <header class="titles" v-else>
          <h3>Discount Application</h3>
        </header>
        <section class="fromStart">
          <el-form ref="reductionForm" :model="reductionForm" class="reductionForm" :rules="rules">
            <el-form-item class="formlist-item" prop="totalPrice">
              <label slot="label">The last payment owed</label>
              <span v-html="Number(processType) === 1 ? tipList[0] : tipList[1]"></span>
              <el-input v-model="reductionForm.totalPrice" placeholder="$" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="reducePrice">
              <label slot="label">The amount of discount</label>
              <el-input v-model="reductionForm.reducePrice" type="number" placeholder="$" :disabled="isSuccessStatus" @blur="checkMony"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="actualPrice">
              <label slot="label">The amount of last payment owed, including requested discount</label>
              <el-input v-model="reductionForm.actualPrice" placeholder="$" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="formlist-item" prop="ReductionType">
              <label slot="label">Reduction reason</label>
              <el-radio-group @change="ReductionTypeChange" v-model="reductionForm.ReductionType" class="radioSty" :disabled="isSuccessStatus" v-if="!isSuccessStatus">
                <el-radio class="radio-items" :label="item.value" v-for="item in ReductionList" :key="item.id">{{item.label}}</el-radio>
              </el-radio-group>
              <!-- <article v-else>{{ReductionList[reductionForm.ReductionType].label}}</article> -->
              <el-input
                class="textarea"
                type="textarea"
                :rows="10"
                :disabled="isSuccessStatus"
                placeholder="Explain the reasons for a lower price in detail"
                v-model="reductionForm.reduceReason">
              </el-input>
            </el-form-item>
          </el-form>
        </section>
      </section>
      <buy-confirm-and-reject @confirmChange="_confirm('reductionForm')" @rejectChange="_reject" :confirmTitle="'Submit'" :rejectTitle="'Skip'" :ConfirmLoading="ConfirmLoading" v-if="!isSuccessStatus"></buy-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      tipList: [`(90% of the total price of home)`, `(95% of the total price of home and the rent of try-out period, rent reduction in a one month try-out period)`],
      inspectionTypeList: [
        {
          id: 0,
          src: '/static/img/contract/icons/property_rights_inspection.png',
          type: 0,
          alt: '.'
        },
        {
          id: 1,
          src: '/static/img/contract/icons/termite_inspection.png',
          type: 1,
          alt: '.'
        }
      ],
      reductionForm: {
        totalPrice: null,
        reducePrice: null,
        actualPrice: null,
        ReductionType: 0,
        reduceReason: null
      },
      ReductionList: [
        {
          id: 0,
          label: 'There are problems regarding this property’s rights',
          value: 0
        },
        {
          id: 1,
          label: 'There are termites on this property',
          value: 1
        },
        {
          id: 2,
          label: 'There are safety concerns ',
          value: 2
        },
        {
          id: 3,
          label: 'There is a large disparity between the assessed value of the house and the sale value.',
          value: 3
        },
        {
          id: 4,
          label: 'Other reasons ',
          value: 4
        }
      ],
      ConfirmLoading: false,
      isSuccessStatus: false,
      rules: {
        reducePrice: [
          { required: true, message: 'Please fill in the requested amount you wish to be discounted', trigger: 'blur' }
        ]
      },
      isReduceReason: false,
      reduceReasonTip: null
    }
  },
  watch: {
    'reductionForm.reducePrice': function (to) {
      this.reductionForm.actualPrice = (Number(this.reductionForm.totalPrice.toString().replace(/((?![0-9.$]).)+|\.\./g, '')) - Number(to.toString().replace(/((?![0-9.$]).)+|\.\./g, ''))).toFixed(2)
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    this.ReductionTypeChange(0)
    if (Number(this.params.state) === 26) {
      this.isSuccessStatus = true
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          _this.ConfirmLoading = true
          const processFrom = {
            processState: _this.params.state,
            saleHouseOrderId: _this.params.id,
            state: 1
          }
          const tableform = {
            houseOrderId: _this.params.id,
            totalPrice: _this.reductionForm.totalPrice,
            reducePrice: _this.reductionForm.reducePrice,
            actualPrice: _this.reductionForm.actualPrice,
            reduceReason: _this.reductionForm.reduceReason
          }
          _this.$axios.post(`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_order_dicker`, tableform)
            .then(res => {
              if (res.data.success) {
                _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
                  .then(res => {
                    if (res.success) {
                      _this.ConfirmLoading = false
                      _this.isSuccessStatus = true
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                _this.$message({
                  type: 'warning',
                  message: res.data.msg
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _reject () {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-29',
              params: _this.params,
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.reductionForm.totalPrice = res.data.data.balanceMoney
            if (res.data.data.saleHouseOrderRecordingInfo !== undefined && res.data.data.saleHouseOrderRecordingInfo !== null) {
              _this.reduceReasonTip = res.data.data.saleHouseOrderRecordingInfo.denialReason
              _this.isReduceReason = true
            }
            if (res.data.data.orderDickerInfo !== undefined && res.data.data.orderDickerInfo !== null) {
              // _this.reductionForm.reduceReason = res.data.data.orderDickerInfo.reduceReason
              // _this.reductionForm.totalPrice = res.data.data.orderDickerInfo.totalPrice
              // _this.reductionForm.reducePrice = res.data.data.orderDickerInfo.reducePrice
              // _this.reductionForm.actualPrice = res.data.data.orderDickerInfo.actualPrice
              _this.reductionForm = Object.assign({}, res.data.data.orderDickerInfo, {ReductionType: 0})
            }
            // _this.reductionForm = Object.assign({}, res.data.data.orderDickerInfo, {ReductionType: 0})
            // _this.reductionForm.totalPrice = _this.params.price * 0.95 + _this.params.tryRent * _this.params.tryTime
          }
        })
    },
    ReductionTypeChange (val) {
      // console.log(val)
      this.reductionForm.reduceReason = this.ReductionList[val].label
    },
    checkMony () {
      if (this.reductionForm.reducePrice > this.reductionForm.totalPrice) {
        this.reductionForm.reducePrice = this.reductionForm.totalPrice
      }
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
                  text-align: left
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
