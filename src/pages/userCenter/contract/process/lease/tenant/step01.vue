<template>
  <el-row class="steps_01_Views">
    <el-col :span="24" class="content">
      <tenant-offer-intro :tableData="formatContent"></tenant-offer-intro>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="isOldShow">
      <section class="PushLandlord">
        <el-button type="primary" class="btns" @click="pushLandlordChange">Remind landlord</el-button>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import offerIntro from '@/components/contract/common/offerIntro'
import { getStateLineStore } from '@/utils'
import { mapMutations } from 'vuex'
export default {
  components: {
    'tenant-offer-intro': offerIntro
  },
  data () {
    return {
      params: {},
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
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    pushLandlordChange () {
      // console.log('提交成功!')
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_seller_view_offer`, {params: {rentHouseOrderId: _this.params.id}})
        .then(res => {
          // console.info(res)
          if (res.data.success) {
            _this.$message({
              message: 'The landlord has been reminded to check the contract!',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
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
      console.log(content)
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
