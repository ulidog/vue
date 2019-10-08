<template>
  <el-row class="steps_10_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Please fill out the reason for Early Rental Termination</h3>
      </header>
      <section class="checkoutmsg">
        <el-input
          class="checkoutmsg-textarea"
          type="textarea"
          placeholder="Please fill out the reason for Early Rental Termination"
          v-model="checkoutmsg">
        </el-input>
      </section>
      <section class="check-note">
        <article class="intro">Note:  The security deposit may be refunded minus any fees for damages and unpaid rent.</article>
      </section>
      <footer class="submit-btns">
        <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :rejectTitle="'Return'" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
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
      ConfirmLoading: false,
      checkoutmsg: null
    }
  },
  mounted () {
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
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state === 184 || _this.params.state === 12 ? 13 : _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.checkoutmsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-11-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject () {
      this.$router.go(-1)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
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
  .steps_10_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 5px 2.5em
      .title-tip
        display: flex
        justify-content: flex-start
        align-items: center
        height: 76px
        h3
          font-size: 1.4375em
          color: #444
          font-weight: bold
      .checkoutmsg
        width: 100%
        height: 370px
        // background-color: #F3F4F5
        /deep/ .el-textarea
          width: 100%
          height: 100%
          textarea
            width: 100%
            height: 100%
            background-color: #F3F4F5
            resize: none
            border: none
            font-size: 1.4375em
      .check-note
        margin-top: 35px
        margin-left: 10px
        .intro
          font-size: 1.4375em
          font-weight: 400
          color: rgba(18,129,252,1)
          line-height: 37px
</style>
