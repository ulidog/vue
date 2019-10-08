<template>
  <el-row class="steps_15_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-if="!isSuccessStatus">{{deductionReason !== null ? tips[0] :tips[1]}}</h4>
        <h4 v-else>The proof of payment has been uploaded successfully, waiting for the landlord’s confirmation.</h4>
      </section>
      <header class="titles-img-size">
        <h3>The deduction amount and reason: {{ deductionReason }}</h3>
      </header>
      <tenant-img-set :imgList="imgList" @uploadImgList="uploadImgList" :isSuccessStatus="isSuccessStatus"></tenant-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="!isSuccessStatus">
      <tenant-submit @ConfirmChange="_confirm" :submitTitle="'Confirm'" :ConfirmLoading="ConfirmLoading"></tenant-submit>
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
    'tenant-img-set': imgSet,
    'tenant-submit': submit
  },
  data () {
    return {
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      tips: [`The landlord rejected your upload certificate, please re-upload it`, `You have agreed to the landlord deductions, please upload the proof of payment.`],
      ConfirmLoading: false,
      deductionReason: null,
      isSuccessStatus: false,
      imgList: []
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (this.params.state === 17 || this.params.state === 1844) {
      this.isSuccessStatus = false
    } else if (this.params.state === 18 || this.params.state === 1833) {
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
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      // if (_this.imgList.length < 1) return
      const uploadImg = _this.imgList.map((item, index) => {
        return JSON.parse(`{"url${(index + 1)}":"${item.url}"}`)
      })
      if (uploadImg.length === 0) {
        _this.$message.info('Please upload up to 5 photos!')
        _this.ConfirmLoading = false
        return
      }
      const paramsFrom = Object.assign({}, ...uploadImg, {houseOrderId: _this.params.id, type: 9})
      _this.$axios.post(`${this.WXL_LOCAL_PATH}rentHouseOrder/insert_order_img`, paramsFrom)
        .then(responese => {
          if (responese.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
              .then(res => {
                if (res.success) {
                  _this.isSuccessStatus = true
                }
              })
              .catch(err => {
                _this.ConfirmLoading = false
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
          _this.ConfirmLoading = false
        })
    },
    uploadImgList (val) {
      this.imgList = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.rentHouseOrderDeductionInfo !== undefined && (this.params.state === 1844 || this.params.state === 1833)) {
              _this.deductionReason = res.data.data.rentHouseOrderDeductionInfo.deductionReason
            }
            // console.log((this.params.state === 17 || this.params.state === 18))
            if (res.data.data.rentHouseOrderRecordingInfo && (this.params.state === 17 || this.params.state === 18)) {
              _this.deductionReason = res.data.data.rentHouseOrderRecordingInfo.denialReason
            }
            if (res.data.data.rentHouseOrderDeductionInfo && (this.params.state === 17 || this.params.state === 18)) {
              _this.deductionReason = res.data.data.rentHouseOrderDeductionInfo.deductionReason
            }
            if (res.data.data.orderImgList === undefined || res.data.data.orderImgList === null) return
            _this.imgList = res.data.data.orderImgList.map(item => {
              item.src = item.url
              item.name = item.createTime
              return item
            })
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_15_Views
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      .success-status
        padding-top: 23px
        h4
          font-size: 1.4375em
          color: #444
          font-weight: bold
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
