<template>
  <el-row class="steps_08_Views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>Congratulations on your New SFT Purchase!</h3>
        <span class="circles-box">
          <el-progress type="circle" :percentage="progress" :stroke-width="1" :width="324" :show-text="false"></el-progress>
          <span>{{ progress }} <p>days</p></span>
        </span>
        <footer class="showTime">
          <section class="begin">
            <img src="" alt="">
            <span class="label">Begin</span>
            <span class="value">09/01/2018</span>
          </section>
          <section class="end">
            <img src="" alt="">
            <span class="label">End</span>
            <span class="value">10/30/2018</span>
          </section>
        </footer>
      </header>
      <footer class="submit-btns">
        <buy-doble-submit @confirmChange="_ConfirmChange" @rejectChange="_ConfirmChange2" :confirmTitle="'Early Rental Termination'" :ConfirmLoading="ConfirmLoading" :rejectTitle="'Confirm your purchase'"></buy-doble-submit>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import dobleSubmit from '@/components/contract/common/dobleSubmit'
export default {
  components: {
    'buy-doble-submit': dobleSubmit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      progress: 10
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
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          path: '/userCenter/contract/process/tenant/steps-10-checkout'
        })
      }, 500)
    },
    _ConfirmChange2 () {},
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
  .steps_08_Views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 20px 90px
      .title-tip
        height: 531px
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        position: relative
        h3
          position: absolute
          font-size: 1.4375em
          color: #444
          font-weight: bold
          top: 20px
        .circles-box
          position: relative
          display: flex
          align-items: center
          justify-content: center
          span
            position: absolute
            font-size: 124px
            color: #1281FC
            font-weight: bold
            background-color: #F4F4F4
            width: 310px
            height: 310px
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            p
              font-size: 19px
              color: #444
              position: absolute
              bottom: 30%
              right: 20%
              font-weight: bold
        .showTime
          width: 100%
          margin-top: 40px
          display: flex
          justify-content: center
          .begin,.end
            margin: 0 4.375em
            .label
              font-size: 1.5625em
              color: #999
              font-weight: bold
            .value
              font-size: 1.5625em
              color: #444
              font-weight: bold
</style>
