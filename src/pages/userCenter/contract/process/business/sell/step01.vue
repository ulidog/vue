<template>
  <el-row class="step_01_Views">
    <el-col :span="24" class="content">
      <sell-offer-intro :tableData="formatContent"></sell-offer-intro>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="isSubmit">
      <section class="optionalBox">
        <section class="content">
          <h5>According to the laws of the applicable state, it is required to inform the Buyer about information related to the property.<a class="blue" target="_blank" href="https://eforms.com/purchase-agreements/property-disclosure-statement/">(Property Disclosures)</a></h5>
          <h5>Also be sure to include any <a class="blue" target="_blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1MjgyMTMzMjExNTQ1NiJ9">contingencies</a> to this offer. These are important and protect you in the event of problems with the home or financing.</h5>
          <el-input type="textarea" v-model="offerHouseDes" :disabled="params.oldState"></el-input>
        </section>
        <sell-confirm-and-reject class="deepClass" @confirmChange="ConsentChange" :confirmTitle="'Consent to Buyer\'s Offer'" @rejectChange="RejectChange" :isDisabled="[noSubmit, false]" :ConfirmLoading="consentStatusLoading"></sell-confirm-and-reject>
      </section>
    </el-col>
    <el-col :span="24" class="after-submission-tip" v-else>
      <span class="success-tip">Waiting for the buyer to confirm and sign the contract.</span>
    </el-col>
  </el-row>
</template>
<script>
import offerIntro from '@/components/contract/common/offerIntro'
import { getStateLineStore } from '@/utils'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'sell-offer-intro': offerIntro,
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      consentStatusLoading: false,
      isSubmit: true,
      noSubmit: false,
      params: null,
      processFrom: null,
      formatContent: null,
      offerHouseDes: null,
      payModeList: [{value: 1, label: 'Full payment'}, {value: 2, label: 'Loan'}],
      transactionModeList: [{value: 2, label: 'SFT Transaction'}, {value: 1, label: 'Traditional Transaction'}]
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.params.state) === 2) {
      this.isSubmit = false
    }
  },
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
    ConsentChange () {
      const _this = this
      _this.consentStatusLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        offerHouseDes: _this.offerHouseDes,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.isSubmit = false
            _this.consentStatusLoading = false
          }
        })
    },
    RejectChange () {
      console.log('拒绝成功!')
      const _this = this
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          let playType = {}
          if (_this.params.transactionMode === 1) {
            playType = {
              type: 1, types: 0
            }
          } else {
            playType = {
              type: 0, types: 0
            }
          }
          if (res.success) {
            _this.$router.push({
              name: 'process-null',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(Object.assign({}, _this.params, playType)))},
              params: _this.params
            })
          }
        })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            _this.formatContentChange(res.data.data.saleHouseOrderInfo)
            // 查看房源描述
            _this.offerHouseDes = res.data.data.offerHouseDes || null
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            // 更新
            if (Number(this.params.state) === 2) {
              this.isSubmit = false
            }
          }
          // console.info(res)
        })
    },
    formatContentChange (content) {
      let arrayList = []
      const _this = this
      arrayList.push([
        {
          id: 0,
          label: 'Payment method',
          value: _this.payModeList.map(res => res).filter(item => {
            if (item.value === content.payMode) {
              return item
            }
          })[0].label
        },
        {
          id: 1,
          label: 'Transaction mode',
          value: _this.transactionModeList.map(res => res).filter(item => {
            if (item.value === content.transactionMode) {
              return item
            }
          })[0].label
        }
      ])
      arrayList.push([
        {
          id: 0,
          label: 'First Name',
          value: content.firstname
        },
        // {
        //   id: 1,
        //   label: 'Middle Name',
        //   value: content.middlename
        // },
        {
          id: 2,
          label: 'Last Name',
          value: content.lastname
        }
      ])
      arrayList.push([
        {
          id: 0,
          label: 'Price',
          value: '$' + content.price
        },
        {
          id: 1,
          label: 'Down Payment',
          value: '$' + content.advanceMoney
        },
        {
          id: 2,
          // label: 'A Breach Of Contract Period',
          label: 'A Breach Of Contract Period',
          value: content.confessionDays ? (content.confessionDays + ' Days') : null
        }
      ])
      arrayList.push([
        {
          id: 0,
          label: 'Escrow Company\'s Name',
          value: content.escrowCompany
        },
        {
          id: 1,
          label: 'Processing Time(Max 60Days)',
          value: content.transferDays ? (content.transferDays + ' Days') : null
        }
      ])
      if (Number(_this.processType) === 2) {
        arrayList.push([
          {
            id: 0,
            label: 'SFT Trial Period',
            value: content.tryTime ? (content.tryTime + ' Months') : null
          },
          {
            id: 1,
            // label: 'Rental Payment($/Month)',
            label: 'Rental Payment($/Month)',
            value: '$' + content.tryRent
          }
        ])
      }
      arrayList.push([
        {
          id: 0,
          label: 'Parcel #',
          value: content.apn
        },
        {
          id: 1,
          label: 'Zip Code',
          value: content.zip
        },
        {
          id: 2,
          label: 'Living sqft',
          value: content.viewLivingSqft || content.livingSqft
        },
        {
          id: 3,
          label: 'Address',
          value: content.street
        }
      ])
      _this.formatContent = arrayList
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_01_Views
    .content
      background-color: #fff
    .btn-submit
      margin-top: 20px
      .optionalBox
        background-color: #fff
        .content
          display: flex
          flex-direction: column
          padding: 30px
          h5
            font-size: 24px
            color: #323232
            .blue
              color: #1281FC
              text-decoration: underline
          /deep/ .el-textarea
            margin-top: 30px
            textarea
              resize: none
              height: 190px
              font-size: 18px
        /deep/ .deepClass .Confirm
          margin: 0 !important
      .PushLandlord
        width: 100%
        margin-top: 4.3125em
        display: flex
        justify-content: space-between
        .btns
          width: 25.8125em
          height: 3.75em
          /deep/ span
            font-size: 1.5625em
    .after-submission-tip
      width: 100%
      .success-tip
        width: 100%
        margin-top: 4.3125em
        display: flex
        justify-content: center
        font-size: 1.5625em
        color: #1281FC
</style>
