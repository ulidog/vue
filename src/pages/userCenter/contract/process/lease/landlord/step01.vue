<template>
  <el-row class="step_01_Views">
    <el-col :span="24" class="content">
      <landlord-offer-intro :tableData="formatContent"></landlord-offer-intro>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="isOldShow && isSubmit">
      <section class="PushLandlord">
        <el-button type="primary" class="btns" @click="ConsentChange" :loading="consentStatusLoading">Consent to Renter’s Offer</el-button>
        <el-button type="primary" class="btns" @click="RejectChange" plain>Reject</el-button>
      </section>
    </el-col>
    <el-col :span="24" class="after-submission-tip" v-else>
      <span class="success-tip">Waiting for the tenant to confirm and sign the rental contract</span>
    </el-col>
  </el-row>
</template>
<script>
import offerIntro from '@/components/contract/common/offerIntro'
import { getStateLineStore } from '@/utils'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    'landlord-offer-intro': offerIntro
  },
  data () {
    return {
      consentStatusLoading: false,
      isSubmit: true,
      params: null,
      formatContent: null,
      isOldShow: true
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.oldState) {
      this.isOldShow = false
    }
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 2) {
      this.isSubmit = false
    }
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
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
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
        rentHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          if (res.success) {
            _this.$router.push({
              name: 'common-steps-05',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
            // _this.isSubmit = false
            _this.consentStatusLoading = false
          }
        })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            _this.formatContentChange(res.data.data.rentHouseOrderInfo)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
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
          label: 'Rental Payment($/Month)',
          value: '$' + content.monthlyRent
        },
        {
          id: 1,
          label: 'Deposit',
          value: '$' + content.deposit
        },
        {
          id: 2,
          label: 'Processing time',
          value: content.transferDays + ' Days'
        }
      ])
      arrayList.push([
        {
          id: 0,
          label: 'Payment Method',
          value: Number(content.payMode) === 1 ? 'Pay the landord' : 'Pay the Ebuyhouse'
        },
        {
          id: 1,
          label: 'Rent payment',
          value: [content.rentPayment].map(item => {
            let typeString
            switch (Number(item)) {
              case 1:
                typeString = 'Monthly'
                break
              case 2:
                typeString = 'Quarterly'
                break
              case 3:
                typeString = 'Half year'
                break
              case 4:
                typeString = 'Year'
                break
            }
            return typeString
          })[0]
        },
        {
          id: 2,
          label: 'Rental term',
          value: content.rentTime + ' Months'
        }
      ])
      arrayList.push([
        {
          id: 0,
          label: 'Parcel #',
          value: content.apn
        },
        {
          id: 1,
          label: 'Zip',
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
