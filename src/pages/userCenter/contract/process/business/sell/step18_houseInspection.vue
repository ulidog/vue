<template>
  <el-row class="inspectionWaitViews">
    <el-col :span="24" class="content">
      <buy-inspection-wait :inspectionTypeList="inspectionTypeList" :tip="tip" class="header" @clickChange="_change" @dblclickChange="_change"></buy-inspection-wait>
      <buy-submit v-if="isSuccessStatus" @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'" class="btns"></buy-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import inspectionWait from '@/components/contract/common/inspectionWait'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'buy-inspection-wait': inspectionWait,
    'buy-submit': submit
  },
  data () {
    return {
      tipList: ['The home inspection report has been sent to your email, please check it.', 'The property inspection report has been sent to your email. Click here to view.', 'You have confirmed  the home inspection report, waiting for the buyer\'s reply.'],
      tip: `Uploaded successfully, waiting for the seller’s confirmation. Double click to view.`,
      inspectionTypeList: [],
      isSuccessStatus: true,
      ConfirmLoading: false,
      isEmailStatus: true
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (this.params.state === 23) {
      this.isEmailStatus = true
      this.tip = this.tipList[0]
    } else if (this.params.state === 192) {
      this.isEmailStatus = false
      this.tip = this.tipList[1]
    } else if (this.params.state === 24 || this.params.state === 25) {
      // this.isEmailStatus = true
      this.tip = this.tipList[2]
      this.isSuccessStatus = false
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
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = false
            _this.ConfirmLoading = false
          } else {
            _this.ConfirmLoading = false
          }
        })
        .catch(err => {
          console.log(err)
          _this.ConfirmLoading = false
        })
    },
    _change (val) {
      this.params.checkServerId = val.id
      this.$router.push({
        name: 'sell-step-19',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(Object.assign({}, val, this.params)))}
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
            _this.inspectionTypeList = res.data.data.checkServerList.map(item => {
              item.isCheck = false
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
  .inspectionWaitViews
    .content
      background-color: #fff
      padding-bottom: 30px
</style>
