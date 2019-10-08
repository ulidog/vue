<template>
  <el-row class="steps_03_Views">
    <el-col :span="24" class="content">
      <section class="isFileTip">
        <header class="tip_title">
          <h3 v-if="!isWaiting">{{Number(processType) === 2 ? titlesTypeList[0] : titlesTypeList[1]}}</h3>
          <h3 v-else v-html="Number(processType) === 2 ? titlesTypeProcess[0] : titlesTypeProcess[1]"></h3>
        </header>
        <footer class="toContractIntro">
          <section class="bg_box" @click="openViewOffer">
            <img src="/static/img/contract/icons/contact.png" alt="contact">
            <span>Click to view contract details</span>
          </section>
        </footer>
        <buy-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" v-if="isWaiting"></buy-confirm-and-reject>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      // 传统交易 OR SFT
      titlesTypeList: ['The Seller has signed the SFT Contract and is waiting for your confirmation.', 'Your traditional contract offer has been sent. Please wait for the seller to sign and confirm.'],
      titlesTypeProcess: [`The seller has signed SFT Contract and is waiting for your confirmation`, `The seller has signed the traditional contract and is waiting for your confirmation`],
      isWaiting: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.params.state) === 3) {
      this.isWaiting = false
    } else if (Number(this.params.state) === 4) {
      this.isWaiting = true
    }
  },
  mounted () {},
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm (val) {
      const _this = this
      _this.ConfirmLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-04',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _reject (val) {
      this.$router.push({
        name: 'buy-steps-03-refuse',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: this.params
      })
    },
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
    },
    openViewOffer () {
      const {href} = this.$router.resolve({
        name: 'view-offer',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({type: this.params.transactionMode, id: this.params.id}))}
      })
      window.open(href, '_blank')
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_03_Views
    .content
      background-color: #fff
      padding: 1.25em 3.75em
      .isFileTip
        min-height: 700px
        .tip_title
          height: 45px
          display: flex
          align-items: center
          justify-content: center
          h3
            font-size: 1.4375em
            font-weight: bold
            color: #444
            // height: 100%
        .toContractIntro
          display: flex
          padding: 20px 0 10px 0
          align-items: center
          justify-content: center
          .bg_box
            width: 17.5625em
            height: 9.3125em
            background: rgba(243,244,245,1)
            display: flex
            align-items: center
            flex-direction: column
            justify-content: center
            span
              color: #1281FC
              font-size: 1.1875em
              margin-top: 18px
</style>
