<template>
  <section class="step-11-tryit">
    <tenant-wait :class="{'action': isOutTime}" :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></tenant-wait>
    <footer v-if="isOutTime" class="footerIntro">
      <p>You has submitted the application of canceling the order, and waiting for the seller to determine whether you need to pay the fees of cleaning and repair.</p>
      <span>The amount of refund is 5% total price of home beyond a breach of contract period.The reduction of rent during try-out period, charges of clean and repair</span>
    </footer>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import viewWait from '@/components/contract/common/viewWait'
export default {
  components: {
    'tenant-wait': viewWait
  },
  data () {
    return {
      content: {
        tip: `Waiting for the seller to upload the proof of refund`,
        noteMSG: `We will return the down payment in full when you end your trial within a breach of contract period.`,
        isNoteMsg: true,
        isWaitImg: true
      },
      isOutTime: true,
      content2: {
        tip: null,
        noteMSG: null,
        isNoteMsg: false,
        isWaitImg: true
      }
    }
  },
  watch: {
    // isOutTime: {
    //   handler (val) {
    //     val ? this.content = this.content2 : this.content
    //   }
    // }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    this.content = this.isOutTime ? this.content2 : this.content
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
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step-11-tryit
    background-color: #fff
    .action
      padding-top: 80px
    .footerIntro
      padding: 30px 70px
      p
        font-size: 1.5625em
        line-height: 51px
        color: #444
      span
        font-size: 1.4375em
        line-height: 37px
        color: #999
        margin: 60px 0 140px
        display: flex
</style>
