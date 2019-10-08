<template>
  <el-row class="inspectionWaitViews">
    <el-col :span="24" class="content">
      <buy-inspection-wait :inspectionTypeList="inspectionTypeList" :tip="tip" class="header" @clickChange="_change" @dblclickChange="_change"></buy-inspection-wait>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import inspectionWait from '@/components/contract/common/inspectionWait'
export default {
  components: {
    'buy-inspection-wait': inspectionWait
  },
  data () {
    return {
      tip: `Uploaded successfully, waiting for the seller’s confirmation. click to view.`,
      inspectionTypeList: []
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
    _change (val) {
      this.params.checkServerId = val.id
      this.$router.push({
        name: 'buy-steps-25',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(Object.assign({}, val, this.params, {serverName: val.serverName})))}
      })
    },
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
