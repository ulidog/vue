<template>
  <el-row class="step14_checkout">
    <el-col class="header" :span="24">
      <tenant-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg" :noteTitle="content.noteTitle"></tenant-wait>
    </el-col>
  </el-row>
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
        tip: `You have received the deduction details from the landlord, please confirm.`,
        noteMSG: null,
        isNoteMsg: true,
        isWaitImg: false,
        noteTitle: `Reasons for termination:`
      },
      ConfirmLoading: false
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
            if (res.data.data.rentHouseOrderRecordingInfo === undefined) return
            _this.content.noteMSG = res.data.data.rentHouseOrderRecordingInfo.denialReason
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step14_checkout
    .footer
      p
        font-size: 1.5625em
        color: #444
        margin: 110px 0 120px 40px
</style>
