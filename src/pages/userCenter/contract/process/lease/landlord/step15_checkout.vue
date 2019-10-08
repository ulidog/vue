<template>
  <el-row class="step_15_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3 v-show="!isSuccessStatus"> Tenant has moved In</h3>
        <p class="hireRent" v-show="isSuccessStatus">Waiting for the tenant to pay the rent</p>
      </header>
      <footer class="submit-btns" v-show="!isSuccessStatus">
        <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :confirmTitle="'Ask the tenant for rent'" :rejectTitle="'Ending a rental contract'" :ConfirmLoading="ConfirmLoading"></landlord-confirm-and-reject>
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
    'landlord-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      isSuccessStatus: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 12) {
      this.isSuccessStatus = false
    } else if (Number(this.params.state) === 193 || Number(this.params.state) === 192 || Number(this.params.state) === 188) {
      this.isSuccessStatus = true
    }
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
        processState: 194,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
          } else {
            _this.ConfirmLoading = false
          }
        })
        .catch(err => {
          _this.ConfirmLoading = false
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'step-16-base-checkout',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
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
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_15_Views
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
        flex-direction: column
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
          background-color: rgba(0,0,0,.6)
      .submit-btns
        padding: 0 2.5em
</style>
