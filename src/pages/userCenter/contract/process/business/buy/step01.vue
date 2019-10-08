<template>
  <el-row class="steps_01_Views">
    <el-col :span="24" class="content">
      <buy-offer-intro :tableData="formatContent"></buy-offer-intro>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="isOldShow">
      <section class="PushLandlord">
        <el-button type="primary" class="btns" :loading="submitLoading" @click="pushLandlordChange">Remind seller</el-button>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import offerIntro from '@/components/contract/common/offerIntro'
import { getStateLineStore } from '@/utils'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    'buy-offer-intro': offerIntro
  },
  data () {
    return {
      params: {},
      formatContent: null,
      payModeList: [{value: 1, label: 'Full payment'}, {value: 2, label: 'Loan'}],
      transactionModeList: [{value: 2, label: 'SFT Transaction'}, {value: 1, label: 'Traditional Transaction'}],
      isOldShow: true,
      submitLoading: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.oldState) {
      this.isOldShow = false
    }
    // console.log(this.params)
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  mounted () {
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    pushLandlordChange () {
      // console.log('提交成功!')
      const _this = this
      _this.submitLoading = true
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_seller_view_offer`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          // console.info(res)
          if (res.data.success) {
            _this.$message({
              message: 'Seller has been reminded to check the contract！',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      if (_this.submitLoading) {
        setTimeout(() => {
          _this.submitLoading = false
        }, 10000)
      }
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            _this.formatContentChange(res.data.data.saleHouseOrderInfo)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
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
            label: 'SFT Trail Period',
            value: content.tryTime ? (content.tryTime + ' Months') : null
          },
          {
            id: 1,
            label: 'Rental Payment($/Month)',
            value: content.tryRent
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
  .steps_01_Views
    .content
      background-color: #fff
    .btn-submit
      .PushLandlord
        width: 100%
        margin-top: 4.3125em
        display: flex
        justify-content: center
        .btns
          width: 34.6875em
          height: 3.75em
          /deep/ span
            font-size: 1.5625em
</style>
