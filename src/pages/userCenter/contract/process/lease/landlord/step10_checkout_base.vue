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
        tip: null,
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
    if (this.params.state === 185) {
      this.content.tip = `The tenant has agreed to your debit and waits for the tenant to upload the payment voucher.`
    } else if (this.params.state === 1822) {
      this.content.tip = `You have rejected the tenant's payment voucher and wait for the tenant to re-upload.`
    }
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
          }
        })
    }
  }
}
</script>
