<template>
  <buy-wait :tip="tip" :noteMSG="noteMSG" :isNoteMsg="true"></buy-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'buy-wait': viewWait
  },
  data () {
    return {
      params: {},
      tip: 'Waiting for the seller to upload the proof of refund',
      noteMSG: 'We will return the down payment in full when you end your trial within a breach of contract period.'
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
            if (res.data.data.saleHouseOrderRecordingInfo) {
              _this.noteMSG = res.data.data.saleHouseOrderRecordingInfo.denialReason
            }
            if (res.data.data.saleHouseOrderRecordingInfoTwo) {
              _this.noteMSG = res.data.data.saleHouseOrderRecordingInfoTwo.denialReason
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
