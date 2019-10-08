<template>
  <el-row class="step_03_Views">
    <el-col :span="24" class="content">
      <section class="isFileTip">
        <header class="tip_title">
          <h3>Waiting for the buyer to upload the proof of payment</h3>
        </header>
        <footer class="toContractIntro">
          <section class="bg_box" @click="openViewOffer">
            <img src="/static/img/contract/icons/contact.png" alt="contact">
            <span>Click to view contract details</span>
          </section>
        </footer>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
export default {
  components: {
  },
  data () {
    return {
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
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.userSignatureInfo = res.data.data.userSignatureInfo
            _this.cardTypeOptions = [...res.data.data.userPaperworkInfo, {paperworkName: 'other', id: 0}]
            _this.havecard = res.data.data.signatureStatus && res.data.data.paperworkStatus
            if (_this.havecard) {
              if (_this.step2From.signature) {
                _this.noSubmit = false
              }
            }
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
  .step_03_Views
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
