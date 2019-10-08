<template>
  <el-row class="step11_checkout">
    <el-col class="header" :span="24">
      <landlord-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg" :noteTitle="content.noteTitle"></landlord-wait>
      <landlord-submit @ConfirmChange="_confirm" :submitTitle="'Refill the deductible'" :ConfirmLoading="ConfirmLoading"></landlord-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-wait': viewWait,
    'landlord-submit': submit
  },
  data () {
    return {
      params: {},
      content: {
        tip: `The tenant refused your claim for compensations.`,
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      const _this = this
      if (_this.params.state === 15) {
        _this.$router.push({
          name: 'step-09-checkout',
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
          params: _this.params
        })
      } else {
        _this.ConfirmLoading = true
        const processFrom = {
          processState: _this.params.state,
          rentHouseOrderId: _this.params.id,
          state: 2
        }
        _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
          .then(res => {
            if (res.success) {
              _this.isSuccessStatus = true
              _this.ConfirmLoading = false
              _this.$router.push({
                name: 'step-09-checkout',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            }
          })
          .catch(err => {
            _this.ConfirmLoading = false
            console.log(err)
          })
      }
    },
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
  .step11_checkout
    .header
      background-color: #fff
      padding-bottom: 77px
</style>
