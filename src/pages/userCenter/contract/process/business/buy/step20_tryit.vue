<template>
  <buy-wait :tip="`Waiting for the seller to upload the proof of refund`"></buy-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import wait from '@/components/contract/common/wait'
export default {
  components: {
    'buy-wait': wait
  },
  data () {
    return {
      params: {}
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
            // console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
          }
          // console.info(res)
        })
    }
  }
}
</script>
