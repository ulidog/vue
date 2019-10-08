<template>
  <el-row class="step_19_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-show="!isSuccessStatus">Please upload your proof of payment</h4>
        <h4 v-show="isSuccessStatus">{{ Number(processType) === 1 ? tipList[0][0] : tipList[0][1] }}</h4>
      </section>
      <header class="titles-img-size">
        <h3>{{ Number(processType) === 1 ? tipList[1][0] : tipList[1][1] }}<span class="color-primary">${{ refundMoney }}</span></h3>
        <span v-show="!isSuccessStatus">Upload 1-5 photos</span>
      </header>
      <buy-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></buy-img-set>
      <buy-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></buy-confirm-and-reject>
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
    'buy-img-set': imgSet,
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      tipList: [
        [`The seller has confirmed the refund, and uploaded the Proof of Refund.`, `The proof of payment has been uploaded successfully, waiting for the buyer’s confirmation.`],
        [`Total amount of Down Payment refunded: `, `The home is damaged.The amount of refund is 5% total price of home beyond a breach of contract period .The reductionof rent during try-out period,charges of clean and repair : `]
      ],
      refuseMsg: null,
      ConfirmLoading: false,
      refundMoney: 0,
      isSuccessStatus: true,
      imgList: []
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
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'common-steps-04',
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
        name: 'buy-steps-15',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
    refuseFromChange (val) {
      this.refuseFrom = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.refundMoney = res.data.data.saleHouseOrderInfo.advanceMoney
            if (res.data.data.orderDeductionInfo !== undefined) {
              _this.refuseMsg = res.data.data.orderDeductionInfo.deductionReason
              _this.refundMoney = res.data.data.orderDeductionInfo.refundMoney
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
  .step_19_Views
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
