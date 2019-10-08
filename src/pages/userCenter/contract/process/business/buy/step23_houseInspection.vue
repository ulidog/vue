<template>
  <el-row class="step_23_Views">
    <el-col :span="24" class="content">
      <section class="success-status">
        <h4 v-show="!isSuccessStatus">Please upload the inspection report that was given to you by the inspector after the evaluation of the property.</h4>
        <h4 v-show="isSuccessStatus">Please upload the inspection report that was given to you by the inspector after the evaluation of the property.</h4>
      </section>
      <header class="titles-img-size">
        <h3>{{ checkServerList[uploadStatus].serverName }}</h3>
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
import { mapMutations, mapActions } from 'vuex'
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
      params: {},
      ConfirmLoading: false,
      isSuccessStatus: false,
      imgList: [],
      UploadTitles: null,
      checkServerList: [{
        serverName: null,
        id: 0
      }],
      uploadStatus: 0
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
      const paramsFrom = Object.assign({}, ...uploadImg, {houseOrderId: _this.params.id, checkServerId: _this.checkServerList[_this.uploadStatus].id})
      _this.$axios.post(`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_check_server_img`, paramsFrom)
        .then(responese => {
          if (responese.data.success) {
            if (_this.checkServerList.length === _this.uploadStatus + 1) {
              _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
                .then(res => {
                  if (res.success) {
                    _this.ConfirmLoading = false
                    _this.$router.push({
                      name: 'buy-steps-24',
                      params: _this.params,
                      query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
                    })
                  }
                })
                .catch(err => {
                  console.log(err)
                  _this.ConfirmLoading = false
                })
            } else {
              _this.ConfirmLoading = false
              _this.uploadStatus++
              _this.imgList = []
              window.scrollTo(0, 0)
            }
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
            if (res.data.data.checkServerList === undefined) return
            _this.checkServerList = res.data.data.checkServerList
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
  .step_23_Views
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
