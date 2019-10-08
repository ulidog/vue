<template>
  <el-row class="steps_08_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Congratulations on your New Rental!</h3>
      </header>
      <footer class="submit-btns">
        <tenant-submit @ConfirmChange="_ConfirmChange" :submitTitle="'Early Rental Termination'" :ConfirmLoading="ConfirmLoading"></tenant-submit>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'tenant-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      titleTip: [`Congratulations on your New Rental!`, `Renewal and successful`]
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (this.params.state === 26) {
      this.titleTip = this.titleTip[1]
    } else {
      this.titleTip = this.titleTip[0]
    }
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          name: 'steps-10-checkout',
          params: _this.params,
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))}
        })
      }, 500)
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
  .steps_08_Views
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
</style>
