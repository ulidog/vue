<template>
  <el-row class="steps_04_Views">
    <el-col :span="24" class="header" v-show="!isSuccessStatus">
      <section class="payment_title">
        <h3>Please upload your proof of payment</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <section class="success-status" v-show="isSuccessStatus">
        <h4>The proof of payment has been uploaded successfully. Please wait for the landlord’s confirmation. <a class="bule" href="https://www.rocketlawyer.com/document/rent-receipt.rl#/">(Optional- Rent Receipt)</a></h4>
      </section>
      <header class="titles-img-size">
        <h3>Rent and deposit: <span class="primary-color">${{ Number(params.monthlyRent) + Number(params.deposit) }}</span></h3>
        <span v-show="!isSuccessStatus">Upload 1-5 photos</span>
      </header>
      <tenant-img-set @uploadImgList="uploadImgList" :imgList="imgList" :isSuccessStatus="isSuccessStatus"></tenant-img-set>
    </el-col>
    <el-col :span="24" class="btn-submit" v-show="!isSuccessStatus">
      <tenant-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></tenant-submit>
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
      params: {
        monthlyRent: 0,
        deposit: 0
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
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 5) {
      this.isSuccessStatus = false
    } else if (Number(this.params.state) === 6 || Number(this.params.state) === 10) {
      this.isSuccessStatus = true
    }
  },
  watch: {
    'params.state': function (val) {
      if (Number(this.params.state) === 5) {
        this.isSuccessStatus = false
      } else if (Number(this.params.state) === 6 || Number(this.params.state) === 10) {
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
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      if (_this.imgList.length === 0) {
        _this.$message.info('Please upload up to 5 photos!')
        _this.ConfirmLoading = false
        return
      }
      const uploadImg = _this.imgList.map((item, index) => {
        return JSON.parse(`{"url${(index + 1)}":"${item.url}"}`)
      })
      const paramsFrom = Object.assign({}, ...uploadImg, {houseOrderId: _this.params.id, type: 7})
      _this.$axios.post(`${this.WXL_LOCAL_PATH}rentHouseOrder/insert_order_img`, paramsFrom)
        .then(responese => {
          if (responese.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
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
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.orderImgList === undefined || res.data.data.orderImgList === null) return
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
  .steps_04_Views
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
          .bule
            text-decoration: underline
            color: #1281FC
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
        .primary-color
          color: #1281FC
          font-size: 1.25em
          font-weight: bold
    .btn-submit
</style>
