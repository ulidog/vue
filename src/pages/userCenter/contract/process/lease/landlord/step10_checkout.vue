<template>
  <tenant-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></tenant-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'tenant-wait': viewWait
  },
  data () {
    return {
      params: {},
      content: {
        tip: `The amount of the deduction and the reason have been sent to the tenant, waiting for confirmation by the other party`,
        // noteMSG: `Cost of air-conditioning repairs: $20, health costs: $20, total deduction: $40`,
        noteMSG: null,
        isNoteMsg: true,
        isWaitImg: false
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.rentHouseOrderDeductionInfo === undefined) return
            _this.content.noteMSG = res.data.data.rentHouseOrderDeductionInfo.deductionReason
          }
        })
    }
  }
}
</script>
