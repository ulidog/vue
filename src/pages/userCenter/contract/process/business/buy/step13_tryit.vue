<template>
  <el-row class="step_13_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 style="font-weight: bold">The payment voucher you recived</h4>
      </section>
      <header class="titles-img-size">
        <h3>Down Payment (5% of the asking price): ${{ price }}</h3>
      </header>
      <buy-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></buy-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <buy-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></buy-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'

import imgSet from '@/components/contract/common/imgSet'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-img-set': imgSet,
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {
        advanceMoney: 0
      },
      price: null,
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      ConfirmLoading: false,
      isSuccessStatus: true,
      imgList: []
    }
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
    _reject (val) {
      // console.log(val)
      this.$router.push({
        name: 'common-steps-02',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: Object.assign({},
          this.params,
          {
            isAssess: true,
            pageUrl: 'common-steps-08',
            msg: null
          },
          {refuseTypeList: [
            {
              label: 'The actual amount of payment doesn’t match with the agreed amount of payment',
              value: 0
            },
            {
              label: 'The proof of payment is blurred',
              value: 1
            },
            {
              label: 'Other reasons',
              value: -1
            }
          ]})
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
            console.log(res.data.data.orderImgList)
            _this.price = res.data.data.sellerInnerRefundMoney
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
  .step_13_Views
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
