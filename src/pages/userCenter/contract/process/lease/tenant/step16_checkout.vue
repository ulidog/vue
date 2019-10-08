<template>
  <tenant-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></tenant-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import wait from '@/components/contract/common/wait'
export default {
  components: {
    'tenant-wait': wait
  },
  data () {
    return {
      params: {},
      content: {
        tip: `You have rejected the landlord's request for deduction, waiting for confirmation.`,
        noteMSG: null,
        isNoteMsg: true,
        isWaitImg: false
      }
    }
  },
  mounted () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.updateStatus(getStateLineStore(0, this.params.state))
    this.getOfferDetails()
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
            _this.content.noteMSG = res.data.data.rentHouseOrderRecordingInfo.denialReason
          }
          // console.info(res)
        })
    }
  }
}
</script>
