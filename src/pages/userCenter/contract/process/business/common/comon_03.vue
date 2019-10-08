<template>
  <el-row class="comon_03">
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
import { mapMutations, mapActions } from 'vuex'
import submit from '@/components/contract/common/submit'
import { getStateLineStore } from '@/utils'
export default {
  components: {
    'buy-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      tryitmsg: null,
      // 权限 期限内还是期限外
      tryInner: null
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      if (this.tryitmsg === null) { this.$message({message: 'Please fill in the reason of refusal', type: 'warning'}); return }
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.tryitmsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            // _this.$router.push({
            //   path: '/userCenter/contract',
            //   query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
            //   params: _this.params
            // })
            if (_this.tryInner) {
              _this.$router.push({
                name: 'buy-steps-09',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            } else {
              _this.$router.push({
                name: 'buy-steps-11',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            }
          } else {
            if (_this.tryInner) {
              _this.$router.push({
                name: 'buy-steps-09',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            } else {
              _this.$router.push({
                name: 'buy-steps-11',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            }
          }
        }).catch(err => {
          console.info('tag', err)
        })
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
            _this.tryInner = res.data.data.tryInner
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .comon_03
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
