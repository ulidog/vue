<template>
  <el-row class="steps_26_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>The landlord is asking you for rent</h3>
      </header>
      <footer class="submit-btns">
        <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :confirmTitle="'Upload payment voucher'" :rejectTitle="'Early Rental Termination'" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
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
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1,
        denialReason: _this.checkoutmsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-27-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      const _this = this
      // const processFrom = {
      //   processState: _this.params.state,
      //   rentHouseOrderId: _this.params.id,
      //   state: 2,
      //   denialReason: _this.checkoutmsg
      // }
      // _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
      // .then(res => {
      // if (res.success) {
      _this.ConfirmLoading = false
      _this.$router.push({
        name: 'steps-10-checkout',
        query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
        params: _this.params
      })
      // }
      // })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_26_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      .title-tip
        height: 531px
        display: flex
        justify-content: center
        align-items: center
        h3
          font-size: 1.4375em
          color: #444
          font-weight: bold
        .hireRent
          margin-top: 58px
          height: 62px
          padding: 0 25px
          font-size: 1.1875em
          display: flex
          justify-content: center
          align-items: center
          color: #fff
      .submit-btns
        margin: 0 30px
</style>
