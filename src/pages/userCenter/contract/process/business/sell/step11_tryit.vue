<template>
  <el-row class="step_11_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-show="!isSuccessStatus">Please upload your proof of payment</h4>
        <h4 v-show="isSuccessStatus">The proof of payment has been uploaded successfully, waiting for the buyer’s confirmation.</h4>
      </section>
      <header class="titles-img-size">
        <h3>The home is undamaged.The amount of refund is 5% total price of home beyond a breach of contract period . ${{ params.advanceMoney }}</h3>
        <span v-show="!isSuccessStatus">Upload 1-5 photos</span>
      </header>
      <sell-img-set @uploadImgList="uploadImgList" :imgList="imgList" :isSuccessStatus="isSuccessStatus"></sell-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit" v-show="!isSuccessStatus">
      <sell-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></sell-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
import imgSet from '@/components/contract/common/imgSet'
export default {
  components: {
    'sell-img-set': imgSet,
    'sell-submit': submit
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
      ConfirmLoading: false,
      isSuccessStatus: false,
      imgList: []
    }
  },
  watch: {
    'params.state': function (val) {
      if (Number(this.params.state) === 16) {
        this.isSuccessStatus = false
      } else if (Number(this.params.state) === 17) {
        this.isSuccessStatus = true
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.params.state) === 16) {
      this.isSuccessStatus = false
    } else if (Number(this.params.state) === 17) {
      this.isSuccessStatus = true
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
      const uploadImg = _this.imgList.map((item, index) => {
        return JSON.parse(`{"url${(index + 1)}":"${item.url}"}`)
      })
      if (uploadImg.length === 0) {
        _this.$message.info('Please upload up to 5 photos!')
        _this.ConfirmLoading = false
        return
      }
      const paramsFrom = Object.assign({}, ...uploadImg, {houseOrderId: _this.params.id, type: 6})
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
    },
    uploadImgList (val) {
      this.imgList = val
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_11_Views
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
