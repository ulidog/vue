<template>
  <el-row class="step09_checkout">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Please enter the deduction amount and reason:</h3>
      </header>
      <section class="checkoutmsg">
        <el-input
          class="checkoutmsg-textarea"
          type="textarea"
          placeholder="Please enter the deduction amount and reason:"
          v-model="checkoutmsg">
        </el-input>
      </section>
      <footer class="submit-btns">
        <landlord-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'"></landlord-submit>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      checkoutmsg: null
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
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1,
        deductionReason: _this.checkoutmsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'step-10-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
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
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step09_checkout
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
