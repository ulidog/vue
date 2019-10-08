<template>
  <el-row class="inspectionWaitViews">
    <el-col :span="24" class="content">
      <buy-inspection-wait :inspectionTypeList="inspectionTypeList" :tip="tip" class="header" @dblclickChange="_change"></buy-inspection-wait>
      <buy-confirm-and-reject class="btns-all" @confirmChange="_confirm" @rejectChange="_reject" :confirmTitle="'Negotiate Price Reduction'" :rejectTitle="'Pay the final payment'" :ConfirmLoading="ConfirmLoading"></buy-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import inspectionWait from '@/components/contract/common/inspectionWait'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-inspection-wait': inspectionWait,
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      tip: `The seller has confirmed receiving your inspection report`,
      inspectionTypeList: [
        {
          id: 0,
          src: '/static/img/contract/icons/property_rights_inspection.png',
          type: 0,
          alt: '.'
        },
        {
          id: 1,
          src: '/static/img/contract/icons/termite_inspection.png',
          type: 1,
          alt: '.'
        }
      ],
      ConfirmLoading: false
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
    _change (val) {
      console.log(val)
      // this.$router.push({
      //   name: 'buy-steps-25',
      //   params: val
      // })
    },
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-27',
              params: _this.params,
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
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
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-29',
              params: _this.params,
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
            })
          }
        })
        .catch(err => {
          console.log(err)
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
  },
  mounted () {
    this.updateStatus(4)
  }
}
</script>
<style lang="sass" scoped>
  .inspectionWaitViews
    .content
      padding-bottom: 35px
      background-color: #fff
      .btns-all
        padding: 0 30px
</style>
