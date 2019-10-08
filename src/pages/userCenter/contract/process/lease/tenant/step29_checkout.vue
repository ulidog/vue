<template>
  <el-row class="step_20_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4>You received a refund voucher for the deposit.</h4>
      </section>
      <header class="titles-img-size">
        <h3>Refund the deposit: ${{ price }}</h3>
      </header>
      <landlord-img-set :imgList="imgList" :isSuccessStatus="isSuccessStatus"></landlord-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></landlord-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'landlord-img-set': imgSet,
    'landlord-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
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
            _this.getOfferDetails()
            _this.isSuccessStatus = true
            _this.$router.push({
              name: 'common-steps-04',
              query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      const _this = this
      this.$router.push({
        name: 'common-steps-02',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: Object.assign({},
          _this.params,
          {
            isAssess: true,
            pageUrl: 'common-steps-07',
            msg: `You have rejected the payment voucher, waiting for the other party to resubmit the voucher`
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
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            _this.price = this.params.deposit
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
  .step_20_Views
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
