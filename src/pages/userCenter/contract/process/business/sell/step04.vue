<template>
  <el-row class="step_04_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 style="text-align: center; font-weight:bold;" v-html="Number(processType) === 2 ? titleList[0] : titleList[1]"></h4>
      </section>
      <header class="titles-img-size">
        <h3>{{ Number(processType) === 2 ? titleTypeList[0] : titleTypeList[1]}}: ${{ params.advanceMoney }}</h3>
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
      params: {
        advanceMoney: 0
      },
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      titleList: [`The proof of funds have been uploaded successfully. <a style="color: #1281FC" href="https://eforms.com/receipt/deposit/real-estate-down-payment/">(Optional- Down Payment Receipt)</a>`, `The buyer has upload the proof of payment`],
      titleTypeList: [`Down Payment (5% of the asking price)`, `Down Payment (10% of the asking price) `],
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
              name: Number(_this.processType) === 2 ? 'sell-step-06' : 'common-steps-06',
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
        name: 'sell-step-04-refuse',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
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
  .step_04_Views
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
