<template>
  <el-row class="step09_tryit">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Please fill out the reason for Early Rental Termination:</h3>
      </header>
      <section class="tryitmsg">
        <el-input
          class="tryitmsg-textarea"
          type="textarea"
          placeholder="Please fill out the reason for Early Rental Termination:"
          v-model="tryitmsg">
        </el-input>
      </section>
      <footer class="submit-btns">
        <buy-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'"></buy-submit>
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
    'buy-submit': submit
  },
  data () {
    return {
      ConfirmLoading: false,
      tryitmsg: null
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
    _confirm () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          path: '/userCenter/contract/process/buy/step-11-tryit'
        })
      }, 500)
    },
    _reject () {},
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step09_tryit
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
      .tryitmsg
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
