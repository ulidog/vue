<template>
  <el-row class="step_23_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-show="!isSuccessStatus">Please upload the proof of funds to complete the payment for this transaction. (<a class="blue" href="https://www.titleonecorp.com/buyerseller/whatisescrow.aspx">Escrow Document</a>or<a class="blue" href="https://corporatefinanceinstitute.com/resources/knowledge/other/pof-proof-of-funds/">Proof of Funds Letter</a>)</h4>
        <h4 v-show="isSuccessStatus">The proof of payment has been uploaded successfully, waiting for the seller's confirmation.</h4>
      </section>
      <header class="titles-img-size">
        <h3>{{ Number(processType) === 1 ? tipList[0] : tipList[1] }}<span class="prul">${{Number(price).toFixed(2)}}</span></h3>
        <span v-show="!isSuccessStatus">Upload 1-5 photos</span>
      </header>
      <buy-img-set @uploadImgList="uploadImgList" :imgList="imgList" :isSuccessStatus="isSuccessStatus"></buy-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit" v-show="!isSuccessStatus">
      <buy-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></buy-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'buy-img-set': imgSet,
    'buy-submit': submit
  },
  data () {
    return {
      tipList: [`Balance payment amount :`, `The last payment owed(95% of the total price of home and the rent of try-out period, rent reduction in a one month try-out period): `],
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
      isSuccessStatus: false,
      imgList: []
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.params.state) === 27) {
      this.isSuccessStatus = false
    } else if (Number(this.params.state) === 28) {
      this.isSuccessStatus = true
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  watch: {
    'params.state': function (val) {
      if (Number(this.params.state) === 27) {
        this.isSuccessStatus = false
      } else if (Number(this.params.state) === 28) {
        this.isSuccessStatus = true
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
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      // console.log('----------->')
      // console.log(_this.imgList)
      const uploadImg = _this.imgList.map((item, index) => {
        return JSON.parse(`{"url${(index + 1)}":"${item.url}"}`)
      })
      if (uploadImg.length === 0) {
        _this.$message.info('Please upload up to 5 photos!')
        _this.ConfirmLoading = false
        return
      }
      const paramsFrom = Object.assign({}, ...uploadImg, {houseOrderId: _this.params.id, type: 2})
      _this.$axios.post(`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_order_img`, paramsFrom)
        .then(responese => {
          if (responese.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
              .then(res => {
                if (res.success) {
                  _this.isSuccessStatus = true
                  _this.ConfirmLoading = false
                }
              })
              .catch(err => {
                _this.ConfirmLoading = false
                console.log(err)
              })
          }
        })
    },
    uploadImgList (val) {
      this.imgList = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
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
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      .success-status
        padding-top: 23px
        h4
          font-size: 1.4375em
          color: #444
          font-weight: bold
          .blue
            color: #1281fc
            text-decoration: underline
      .titles-img-size
        padding: 23px 0
        display: flex
        flex-direction: row
        justify-content: space-between
        h3
          color: #666
          font-size: 1.4375em
          .prul
            color: #1281fc
            font-weight: bold
        span
          font-size: 1.1875em
          color: #999
    .btn-submit
</style>
