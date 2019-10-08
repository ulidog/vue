<template>
  <el-row class="inspectionWaitViews">
    <el-col :span="24" class="content">
      <buy-inspection-wait :inspectionTypeList="inspectionTypeList" :tip="tip" class="header"></buy-inspection-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import inspectionWait from '@/components/contract/common/inspectionWait'
import { getStateLineStore } from '@/utils'
export default {
  components: {
    'buy-inspection-wait': inspectionWait
  },
  data () {
    return {
      params: {},
      tip: `You have chose to send the property inspection report to the seller via email. Please send the report to the seller’s email and wait for their confirmation.`,
      inspectionTypeList: [
        // {
        //   id: 0,
        //   src: '/static/img/contract/icons/property_rights_inspection.png',
        //   type: 0,
        //   alt: '.'
        // },
        // {
        //   id: 1,
        //   src: '/static/img/contract/icons/termite_inspection.png',
        //   type: 1,
        //   alt: '.'
        // }
      ]
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
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
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

</style>
