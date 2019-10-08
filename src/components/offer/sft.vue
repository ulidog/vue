<template>
  <section class="SFTComponent">
    <section class="page">
      <h3 class="ebuy-main-title">Ebuyhouse SFT Real Estate Contract</h3>
      <h4 class="ebuy-main-min-title"><em>S</em>ecure<em>F</em>ast<em>T</em>rading</h4>
      <section class="p-box">
        <p class="ebuy-p">Seller (Hereinafter referred to as Party A):</p>
        <section class="bottom-line">
          <span class="embed-text">{{`${sftOfferInfo.seller_firstname} ${sftOfferInfo.seller_lastname}`}}</span>
        </section>
      </section>
      <section class="p-box">
        <p class="ebuy-p">Buyer (Hereinafter referred to as Party B):</p>
        <section class="bottom-line">
          <span class="embed-text">{{`${sftOfferInfo.buyer_firstname} ${sftOfferInfo.buyer_lastname}`}}</span>
        </section>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          I.Both parties hereby sign the Contract upon consensus. Party A agrees to sell the property located at
          <span class="embed-inline-text">{{sftOfferInfo.houses_address}}</span>
          , with the inside space of
          <span class="embed-inline-text">{{sftOfferInfo.living_sqft}}</span>
          square feet and the lot size of
          <span class="embed-inline-text">{{sftOfferInfo.lot_sqft}}</span>
          square feet/acres.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          II.The total price of the property shall be $
          <span class="embed-inline-text">{{sftOfferInfo.price}}</span>
          . Party B shall pay for the security deposit of 5% within 10 days after signing of the contract (Total amount $
          <span class="embed-inline-text">{{sftOfferInfo.advance_money}}</span>
          ), which will apply toward the purchase price of the property. If the security deposit has not been paid within 10 days, then the contract will become invalid.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          III.The SFT method affords the buyers the ability to undertake a live-in trial period of (<input type="checkbox" :checked="sftOfferInfo.try_time_month === 2" :disabled="true"/>Two months/<input type="checkbox" :checked="sftOfferInfo.try_time_month === 3" :disabled="true"/>Three months)
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          IV.After Party B has paid the security deposit, the rental fee during trial period shall be $
          <span class="embed-inline-text">{{sftOfferInfo.try_rent}}</span>
          /month (property price x 0.Z75% /mo, this includes all applicable utilities). After the trial period expires and Party B agrees to purchase the property, one month’s rent is automatically waived.
        </p>
      </section>
    </section>
    <section class="page">
      <section class="p-box">
        <p class="ebuy-p">
          V.Period of Revocation
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          1.If the contract is terminated within the first 10 days into the revocation period, Party A shall return all deposits to Party B within 10 days and terminate the contract upon cancellation.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          2.If the trial period has already started (more than 10 days into the revocation period), Party B shall pay Party A the rent of $
          <span class="embed-inline-text">{{sftOfferInfo.try_rent}}</span>
          , and Party A will deduct the deposit after the rent of $
          <span class="embed-inline-text">{{sftOfferInfo.advance_money}}</span>
          , and will return it to Party B within 10 days.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          VI.The funds management and related procedures of the SFT Contract may be entrusted to the legal personnel or agency.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          VII.According to the laws of the applicable state
          <span class="embed-inline-text">{{sftOfferInfo.state_name}}</span>
          , it is required to inform the Buyer about information related to the property.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          VIII.This contract is signed by both Party A and Party B, in triplicate, with each Party A, Party B, and Ebuyhouse platform holding one copy. The Appendixes to Ebuyhouse SFT Real Estate Contract shall have equal effects with the Contract
          <span class="embed-inline-text">{{sftOfferInfo.house_des}}.</span>
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          IX.This contract is a free template contract. The user may complement or modify, and our company does not assume any legal liability arising from the contract.
        </p>
      </section>
    </section>
    <section class="page">
      <section class="xp-box" style="align-items: center;">
        <p class="ebuy-p">Party A:</p>
        <img style="max-width: 50%; max-height: 300px;" :src="sftOfferInfo.seller_signature" alt="seller">
      </section>
      <section class="xp-box">
        <p class="ebuy-p">ID card No.</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.seller_user_paperwork_code}}</span>
        </section>
      </section>
      <section class="xp-box">
        <p class="ebuy-p">Telephone:</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.seller_phone}}</span>
        </section>
      </section>
      <section class="xp-box">
        <p class="ebuy-p">Email:</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.seller_email}}</span>
        </section>
      </section>
      <section class="xp-box" style="align-items: center;">
        <p class="ebuy-p">Party B:</p>
        <img style="max-width: 50%; max-height: 300px;" :src="sftOfferInfo.buyer_signature" alt="buyer">
      </section>
      <section class="xp-box">
        <p class="ebuy-p">ID card No.</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.buyer_user_paperwork_code}}</span>
        </section>
      </section>
      <section class="xp-box">
        <p class="ebuy-p">Telephone:</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.buyer_phone}}</span>
        </section>
      </section>
      <section class="xp-box">
        <p class="ebuy-p">Email:</p>
        <section class="bottom-line">
          <span class="embed-inline-text">{{sftOfferInfo.buyer_email}}</span>
        </section>
      </section>
    </section>
    <section class="page">
      <h3 class="ebuy-main-title">Ebuyhouse SFT Real Estate Contract</h3>
      <section class="p-box">
        <p class="ebuy-p">
          I.Upon the agreement of both parties, within 10 days after paying the remaining balance, according to the Ebuyhouse SFT Real Estate Contract, Party A and Party B must apply jointly to the house ownership registration authority, or local titling office, to register the change on ownership, signand conclude the property transfer form. Party B officially receives Party A’s real property and any agreed upon additional property. The taxes and dues payable for the above procedures shall be borne respectively by Party A and Party B in accordance with the local laws and industry regulations(unless agreed upon otherwise by both parties).
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          II.During the Period of Revocation, the risk of property damage or loss is the responsibility of Party A.  Upon transfer of the property title, the risk of property damage or loss will be transferred to party B.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          III.Upon formal delivery of the property, Party A shall pay the pro-rated costs of all applicable utilities.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          IV.Party A vows to truthfully state the status of property ownership and other specific conditions in this contract to ensure that the property does not have any property right dispute or legal obstruction affecting the transactions between the two parties. With regard to mortgages, leasing, tax and the like, Party A shall complete these procedures before the transfer of real property.After the contract becomes valid, if there are unsettled matters mentioned above, Party A shall accept full responsibility.
        </p>
      </section>
    </section>
    <section class="page">
      <section class="p-box">
        <p class="ebuy-p">
          V.If Party B does not pay the full price of the property in accordance with the provisions of this contract, Party B shall bear the responsibility for breach of contract according to the following commitments: when Party B fails to pay the remaining balance in time, Party B shall pay0.05% of the unpaid balance as liquidated damages for each overdue day. If Party B has not paid the balance in more than 30 days, Party A shall be entitled to terminate the contract.After Party A terminates the contract, the deposit shall be retained by Party A, and within 10 days Party A shall return the money less the deposit of Party B.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          VI.When Party A fails to perform its obligations in accordance with the provisions of this contract, Party A shall bear the responsibility for breach of contract in accordance with the following commitments: If Party A is overdue in the transfer of real property, Party A shall pay 0.05%of the total purchase price as liquidated damages for each overdue day. If Party A is overdue in the transfer of real property by more than 30 days, Party B shall be entitled to terminate the contract. Party A shall return the deposit to Party B within 10 days after the date of the termination of this contract and pay 10% of the total purchase price as the liquidated damages.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          VII.Any dispute resulting from or related to this contract shall be resolved through negotiation by both parties. If negotiation fails, it shall be submitted to a licensed legal arbitration commission registered with Ebuyhouse for arbitral settlement. If the arbitration fails, both parties can initiate legal proceedings in a court of law. The legal proceedings shall take place in the state in which the property is located.
        </p>
      </section>
    </section>
    <section class="page">
      <section class="p-box">
        <p class="ebuy-p">
          VIII.All funds of this contract are to be managed by an escrow company recognized by Ebuyhouse.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          IX.If Party B needs a loan, Party B shall provide bank loan procedures within the revocation period. Otherwise, it shall be regarded as a breach of contract.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          X.Upon the signing of the contract, after consultation, both parties shall confirm the modification of the items including payment, transfer of real property, etc. agreed in the contract which shall be deemed as effective parts modified in the contract.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          XI.If the transaction is postponed due to staff and government’s registration,Party A and Party B shall postpone the transaction time, the implementation of this contract will not be affected.
        </p>
      </section>
      <section class="p-box">
        <p class="ebuy-p">
          Please read this attachment to the contract carefully. The attachment to this contract has the same legal effect as Ebuyhouse SFT Real Estate Contract.This contract is a free template contract. The user may complement or modify, and our company does not assume any legal liability arising from the contract.
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
      sftOfferInfo: {},
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
  filters: {
    timerFormat: (timer) => {
      if (timer === null || timer === '') return
      const timers = new Date(timer)
      return ` ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    }
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
    }
  },
  created () {
    this.fetchOffer()
  },
  methods: {
    fetchOffer () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_sft_real_estate_contract`, {params: {saleHouseOrderId: _this.params.id}})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.sftOfferInfo = res.data.data
            console.log(this.sftOfferInfo)
          }
        })
    },
    autopointer () {
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = this.$html2canvas(el, options)
      console.log(this.output)
    }
  }
}
</script>
<style lang="sass" scoped>
  @import "./iconfont.scss"
  .SFTComponent
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
      .ebuy-main-min-title
        text-align: center
        font-size: 16px
        font-weight: bold
        color: #000
        font-family: 'myfont'
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
          align-items: center
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
          align-items: center
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
          align-items: center
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
