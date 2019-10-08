<template>
  <el-row class="step_04_Views">
    <el-col :span="24" class="header" v-if="!isSuccessStatus">
      <section class="refuse_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" v-if="isSuccessStatus" class="content-ref">
      <span>{{rentHouseOrderRecordingInfo.denialReason}}</span>
    </el-col>
    <el-col :span="24" class="content" v-if="!isSuccessStatus">
      <landlord-refuse @refuseFrom="refuseFromChange" :refuseTypeList="refuseTypeList"></landlord-refuse>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="!isSuccessStatus">
      <section class="Confirm">
        <el-button type="primary" class="btns" @click="ConfirmChange" :loading="ConfirmLoading">Submit</el-button>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import refuse from '@/components/contract/common/refuse'
export default {
  components: {
    'landlord-refuse': refuse
  },
  data () {
    return {
      params: {
        state: null
      },
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      refuseTypeList: [
        {
          label: 'The actual amount of payment doesn’t match with the agreed amount of payment',
          value: 0
        },
        {
          label: 'The proof of payment is blurred',
          value: 1
        },
        {
          label: 'Other reasons',
          value: -1
        }
      ],
      ConfirmLoading: false,
      isSuccessStatus: false,
      rentHouseOrderRecordingInfo: {
        denialReason: null
      }
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
    if (Number(this.params.state) === 6) {
      this.isSuccessStatus = false
    } else if (Number(this.params.state) === 7) {
      this.isSuccessStatus = true
    }
  },
  watch: {
    'params.state': function (val, oldVal) {
      if (Number(this.params.state) === 6) {
        this.isSuccessStatus = false
      } else if (Number(this.params.state) === 7) {
        this.isSuccessStatus = true
      }
    }
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.refuseFrom.refuseMsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          if (res.success) {
            _this.getOfferDetails()
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    refuseFromChange (val) {
      this.refuseFrom = val
      // console.log(this.refuseFrom)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            if (res.data.data.rentHouseOrderRecordingInfo === undefined) return
            _this.rentHouseOrderRecordingInfo = res.data.data.rentHouseOrderRecordingInfo
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_04_Views
    .header
      background-color: #fff
      width: 100%
      .refuse_title
        height: 62px
        display: flex
        align-items: center
        justify-content: center
        border-bottom: 1px solid #F3F4F5
        h3
          font-size: 1.8125em
          color: #444444
    .content
      background-color: #fff
    .content-ref
      background-color: #fff
      height: 500px
      padding: 50px 30px
      display: flex
      align-items: center
      justify-content: center
      text-align: center
      span
        font-size: 25px
        color: #444
    .btn-submit
      .Confirm
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
