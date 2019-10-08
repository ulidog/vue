<template>
 <section class="RentalComponent" ref="print">
  <section class="page">
    <h3 class="ebuy-main-title">Ebuyhouse Rental Contract</h3>
    <section class="p-box">
      <p class="ebuy-p">The Lessor (Hereinafter referred to as Party A): </p>
      <section class="bottom-line">
        <span class="embed-text">{{`${rentOfferInfo.seller_firstname} ${rentOfferInfo.seller_lastname}`}}</span>
      </section>
    </section>
    <section class="p-box">
      <p class="ebuy-p">Driver’s License No.: </p>
      <section class="bottom-line">
        <span class="embed-text">{{`${rentOfferInfo.seller_user_paperwork_code}`}}</span>
      </section>
    </section>
    <section class="p-box">
      <p class="ebuy-p">The Lessor (Hereinafter referred to as Party B): </p>
      <section class="bottom-line">
        <span class="embed-text">{{`${rentOfferInfo.buyer_firstname} ${rentOfferInfo.buyer_lastname}`}}</span>
      </section>
    </section>
    <section class="p-box">
      <p class="ebuy-p">Driver’s License No.: </p>
      <section class="bottom-line">
        <span class="embed-text">{{`${rentOfferInfo.buyer_user_paperwork_code}`}}</span>
      </section>
    </section>
    <section class="p-box">
      <p class="ebuy-p">
        1.Party A leases the property located at
        <span class="embed-inline-text">{{rentOfferInfo.houses_address}}</span>
        having an interior size of
        <span class="embed-inline-text">{{rentOfferInfo.living_sqft}}</span>
        square feet, to Party B.
      </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">
        2.The lease term totals
        <span class="embed-inline-text">{{rentOfferInfo.rent_time}}</span>
        months, starting from
        <span class="embed-inline-text">{{rentOfferInfo.dwell_start_time | timerFormat}}</span>
        and ending
        <span class="embed-inline-text">{{rentOfferInfo.dwell_end_time | timerFormat}}</span>
        . When the term expires, Party A has the right to take back the house, and Party B shall return the property on schedule.
      </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">
        3.As negotiated by both parties, the rent is USD
        <span class="embed-inline-text">{{rentOfferInfo.monthly_rent}}</span>
        per month. When paying the rent for the first time, Party B shall pay USD
        <span class="embed-inline-text">{{rentOfferInfo.monthly_rent}}</span>
        as the rent and USD
        <span class="embed-inline-text">{{rentOfferInfo.deposit}}</span>
        as the security deposit. The rent shall be paid before the 5th day of each month.
      </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">4.As negotiated by both Parties, Party B is responsible for paying the fees associated with living in the property during the lease term including all applicable utilities. Party A is responsible for all taxes and home owner’s insurance. </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">5.This Contract is in triplicate and comes into effect after the signature of both parties. Each party holds one copy and Ebuyhouse also holds one copy.
        <span class="ebuy-super-txt">The Attachment of Ebuyhouse rental Contract</span> has the same legal effect with the Contract.</p>
    </section>
  </section>
  <section class="page">
    <section class="xp-box" style="align-items: center;">
      <p class="ebuy-p">Signature of Party A:</p>
      <img style="max-width: 50%; max-height: 300px;" :src="rentOfferInfo.seller_signature" alt="seller">
    </section>
    <section class="xp-box">
      <p class="ebuy-p">Date of Signature: </p>
      <section class="bottom-line">
        <span class="embed-inline-text">{{rentOfferInfo.seller_user_signature_time | timerFormat}}</span>
      </section>
    </section>
    <section class="xp-box" style="align-items: center;">
      <p class="ebuy-p">Signature of Party B:</p>
      <img style="max-width: 50%; max-height: 300px;" :src="rentOfferInfo.buyer_signature" alt="buyer">
    </section>
    <section class="xp-box">
      <p class="ebuy-p">Date of Signature: </p>
      <section class="bottom-line">
        <span class="embed-inline-text">{{rentOfferInfo.buyer_user_signature_time | timerFormat}}</span>
      </section>
    </section>
  </section>
  <section class="page">
    <h3 class="ebuy-main-title">Attachment of Ebuyhouse Rental Contract</h3>
    <section class="no-p-box">
      <p class="ebuy-p">
        1.When the property is being handed over, both parties shall sign the <span class="ebuy-super-txt">Transfer List</span>. During the lease term, Party A shall ensure the safe use of the property. Party A shall be responsible for the maintenance of the property and all facilities, except those whose responsibility shall be borne by Party B. Party A bears no responsibility for the decoration or ornament made by Party B. If the property or its facilities have been damaged by the improper use of Party B, Party B shall instantly be responsible for the repair or economic compensations.  If party B intends to make changes that affect the property, such as the inner structure, decoration or installation of equipment, change shall be made only after detailed descriptions about the scale, range, process and/or materials to be used are agreed upon in writing by Party A.
      </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">
        2.Party B has the right to terminate the Contract if Party A is engaged in one of the following behaviors: (1) Party A cannot provide the property or the property conditions do not meet those standards required by laws; (2) Party A fails to fulfill its obligations of property repair; (3) Party A does not buy property insurance; (4) Party A cannot ensure that the property and its facilities and equipment are in normal conditions for normal use.
      </p>
    </section>
    <section class="p-box">
      <p class="ebuy-p">
        3.Party B shall pay the agreed upon rent per month to Party A or through Ebuyhouse in form of cash or electronic funds transfer.
      </p>
    </section>
  </section>
  <section class="page">
    <section class="no-p-box">
      <p class="ebuy-p">
        3.1 If Party B stops renting the property before the expiration of the lease term, Party B shall notify Party A one month in advance and pay 50% of the monthly rent as liquidated damages. One month later, Party B returns the property and Party A shall return 50% of the security deposit within 10 days.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        3.2 If Party B fails to notify Party A one month in advance, Party A shall not return the security deposit to Party B.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        3.3 When Party B returns the property to Party A in expiration of the term, Party B must ensure there is are no damages to facilities and equipment to the property, and Party A shall return the security deposit to Party B within 10 days.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        4.Party A has the right to handle articles left by Party B without the consent of Party B. Both parties shall engage in the returning and acceptance of the property and sign the <span class="ebuy-super-txt">Transfer List</span>.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        5.During the lease term, Party B shall pay all applicable utilities and any other applicable fees. Party B shall pay all fees before returning the property.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        6.If the Contract cannot be fulfilled or if damages are caused by force majeure, both parties bear no responsibility. If the Contract is terminated due to the above-mentioned reasons, the rent shall be calculated in accordance with actual use time. If the time is less than one month, it shall be calculated in accordance with the number of days. The pro-rated balance will be paid to refunded to Party B. In this case, the force majeure refers to objective circumstances that are unforeseeable, unavoidable, and insuperable.
      </p>
    </section>
  </section>
  <section class="page">
    <section class="no-p-box">
      <p class="ebuy-p">
        7.Any dispute arising from or related to this Contract shall be resolved through the negotiation of both parties. If negotiation fails, it shall be submitted to a licensed legal arbitration commission registered with Ebuyhouse for arbitral settlement. If no agreement is reached through arbitration, it shall be resolved by filing a petition in a court of law. The place of the litigation shall be the same as that where the property is located.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        8.[Ebuyhouse.com™] is not a licensed real estate broker, salesperson, or agent. By facilitating this rental through its online platform, it is providing software/technology and a means for direct, consumer-to-consumer communications—not acting as a broker. If a party asks Ebuyhouse.com™ for advice or to explain a provision in this Agreement, any response cannot be assumed to be accurate or complete. Ebuyhouse.com™ is not a licensed lawyer and no such response shall be deemed to be the provision of legal services. Each party hereby (1) agrees to indemnify, defend, and hold Ebuyhouse.com™ harmless from any and all claims, rental transactions, and (2) irrevocably, and knowingly waives any claims it may have against [Ebuyhouse.com™] with respect to the same.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        9. During the lease term, if Party A unilaterally proposes to terminate the Contract due to the fact that Party A cannot provide the property as stipulated in the Contract or other reasons, Party A shall return the security deposit to Party B and pay an additional sum equal to the security deposit as the liquidated damages to Party B.
      </p>
    </section>
  </section>
  <section class="page">
    <section class="no-p-box">
      <p class="ebuy-p">
        10.If Party B refuses to pay rent or vacate the premises without any reason, Party B shall bear economic losses and related costs of lost labor, and legal fees brought to Party A. Party B shall be recorded in the credit file of Ebuyhouse Property Rental system.
      </p>
    </section>
    <section class="no-p-box">
      <p class="ebuy-p">
        11.Please read this attachment of the contract carefully. The attachment needs not be signed by both parties but has the same legal effect as the <span class="ebuy-super-txt">Ebuyhouse Rental Contract.</span>
      </p>
    </section>
  </section>
 </section>
</template>
<script>
import Vue from 'vue'
import VueHtml2Canvas from 'vue-html2canvas'

Vue.use(VueHtml2Canvas)
export default {
  data () {
    return {
      rentOfferInfo: {},
      output: null
    }
  },
  props: {
    params: {
      default: () => {
        return {id: null}
      },
      type: Object
    },
    status: {
      default: false,
      type: Boolean
    }
  },
  // filters: {
  //   timerFormat: (timer) => {
  //     if (timer === null) return
  //     const timers = new Date(timer)
  //     return ` ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
  //   }
  // },
  created () {
    this.fetchOffer()
  },
  watch: {
    params: {
      handler (_new, _old) {
        this.fetchOffer()
      }
    },
    status: {
      handler (_new) {
        if (_new) {
          this.autopointer()
        }
      }
    },
    output: {
      handler (_new) {
        if (_new !== null) {
          this.point()
        }
      }
    }
  },
  methods: {
    fetchOffer () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_house_leasing_contract`, {params: {rentHouseOrderId: _this.params.id}})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.rentOfferInfo = res.data.data
            console.log(this.rentOfferInfo)
          }
        })
    },
    autopointer () {
      var printBox = this.$refs['print']
      // 拿到打印的区域的html内容
      var newContent = printBox.innerHTML
      // 将旧的页面储存起来，当打印完成后返给给页面。
      var oldContent = document.body.innerHTML
      // 赋值给body
      document.body.innerHTML = newContent
      // 执行window.print打印功能
      window.print()
      // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
      // const el = this.$refs.printMe
      // // add option type to get the image version
      // // if not provided the promise will return
      // // the canvas.
      // const options = {
      //   type: 'dataURL'
      // }
      // this.$html2canvas(el, options).then(res => {
      //   // console.log(res)
      //   this.output = res
      // })
    },
    point () {
      var printHtml = document.createElement('img')
      // var newWindow = window.open("",'newWindow')
      printHtml.src = this.output
      document.body.innerHTML = printHtml
      window.print()
    }
  }
}
</script>
<style lang="sass" scoped>
  @import './iconfont.scss'
  .RentalComponent
    .page
      padding: 2.54cm 3.18cm
      background-color: #fff
      width: 21cm
      height: 29.7cm
      &:nth-child(n+2)
        margin-top: 1cm
      .ebuy-main-title
        font-size: 20px
        font-weight: bold
        color: #000
        font-family: 'Times New Roman'
        text-align: center
        margin-bottom: 20px
      .ebuy-super-txt
        font-family: 'myfont' !important
        font-style: italic
      .p-box
        display: flex
        .ebuy-p
          font-size: 17px
          font-family: 'Times New Roman'
          font-weight: 400
          line-height: 40px
          display: flex
          flex-wrap: wrap
          .embed-inline-text
            display: flex
            font-size: 14px
            font-family: 'myfont' !important
            font-style: italic
            margin: 0 10px
            border-bottom: 1px solid #000
            justify-content: center
            padding: 0 .5cm
            flex-wrap: wrap
        .bottom-line
          flex: 1
          border-bottom: 1px solid #000
          margin: 10px
          text-align: center
          .embed-text
            font-size: 18px
            text-align: center
            font-family: 'myfont' !important
            font-style: italic
      .no-p-box
        display: flex
        .ebuy-p
          font-size: 17px
          font-family: 'Times New Roman'
          font-weight: 400
          line-height: 40px
          display: inline-block
          .embed-inline-text
            display: flex
            font-size: 14px
            font-family: 'myfont' !important
            font-style: italic
            margin: 0 10px
            border-bottom: 1px solid #000
            justify-content: center
            padding: 0 .5cm
            flex-wrap: wrap
      .xp-box
        display: flex
        .ebuy-p
          font-size: 17px
          font-family: 'Times New Roman'
          font-weight: 400
          line-height: 60px
          display: flex
          flex-wrap: wrap
          font-weight: bold
        .bottom-line
          flex: 1
          border-bottom: 1px solid #000
          margin: 10px
          text-align: center
          .embed-text
            font-size: 18px
            text-align: center
            font-family: 'myfont' !important
            font-style: italic
</style>
