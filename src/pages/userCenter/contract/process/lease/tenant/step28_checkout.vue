<template>
  <el-row class="steps_28_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3 v-if="!isSuccessStatus">Your rental agreement will be expired after one month, please click renewal or vacate the home.<br> Landlord adjustment of rent: <span style="color:#1281FC;">${{params.renewalMonthlyRent}}</span></h3>
        <h3 v-else>{{ Tip }}</h3>
      </header>
      <footer class="submit-btns" v-if="!isSuccessStatus">
        <landlord-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :confirmTitle="'Apply for renewal'" :rejectTitle="'Confirm check-out'" :ConfirmLoading="ConfirmLoading"></landlord-confirm-and-reject>
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
      Tip: `Wait for the contract to expire,please vacate the home`,
      ConfirmLoading: false,
      isSuccessStatus: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 24 || Number(this.params.state) === 179 || Number(this.params.state) === 196 || Number(this.params.state) === 195) {
      this.isSuccessStatus = true
      if (Number(this.params.state) === 179) {
        this.Tip = `Wait for the contract to expire,please vacate the home`
      }
      if (Number(this.params.state) === 196 || Number(this.params.state) === 195) {
        this.Tip = `The lease contract has expired. Waiting for the landlord the next steps.`
      }
    } else if (Number(this.params.state) === 29) {
      this.isSuccessStatus = false
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
      // console.log('提交成功!')
      setTimeout(() => {
        _this.$router.push({
          name: 'steps-02',
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
          params: _this.params
        })
      }, 500)
    },
    _reject () {
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.getOfferDetails()
            _this.isSuccessStatus = true
          }
        })
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
  .steps_28_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 40px
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
