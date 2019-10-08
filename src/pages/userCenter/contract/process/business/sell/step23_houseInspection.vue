<template>
  <el-row class="step_23_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4>The buyer has uploaded the proof of payment.</h4>
      </section>
      <header class="titles-img-size">
        <h3>{{Number(processType) === 1 ? tipList[0] : tipList[1]}} ${{ price }}</h3>
      </header>
      <sell-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></sell-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <sell-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></sell-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'sell-img-set': imgSet,
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      tipList: [`Balance payment amount: `, `The last payment owed(95% of the total price of home and the rent of try-out period, rent reduction in a one month try-out period)：`],
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
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
      price: 0,
      isSuccessStatus: true,
      imgList: []
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
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
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: Number(_this.processType) === 1 ? 'sell-step-06' : 'common-steps-04',
              params: _this.params,
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'sell-step-24',
        params: this.params,
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))}
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
            if (!res.data.data.orderDickerInfo) {
              _this.price = res.data.data.sellerTailMoney
            } else {
              _this.price = res.data.data.orderDickerInfo.totalPrice - res.data.data.orderDickerInfo.reducePrice
            }
            if (res.data.data.orderImgList === undefined) return
            _this.imgList = res.data.data.orderImgList.map(item => {
              item.src = item.url
              item.name = item.createTime
              return item
            })
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_23_Views
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
