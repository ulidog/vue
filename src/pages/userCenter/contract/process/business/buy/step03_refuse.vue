<template>
  <el-row class="steps_03_Views">
    <el-col :span="24" class="header">
      <section class="refuse_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <tenant-refuse @refuseFrom="refuseFromChange" :refuseTypeList="refuseTypeList"></tenant-refuse>
    </el-col>
    <el-col :span="24" class="btn-submit">
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
    'tenant-refuse': refuse
  },
  data () {
    return {
      params: {},
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      },
      refuseTypeList: [
        {
          label: 'The signature is blurred',
          value: 0
        },
        {
          label: 'I changed my mind of buying',
          value: 1
        },
        {
          label: 'Other reasons',
          value: -1
        }
      ],
      ConfirmLoading: false
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
    ...mapActions({
      updateProcess: 'update_process'
    }),
    ConfirmChange () {
      const _this = this
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.refuseFrom.refuseMsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              path: '/userCenter/contract',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
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
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
          }
          // console.info(res)
        })
    },
    refuseFromChange (val) {
      this.refuseFrom = val
      console.log(this.refuseFrom)
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_03_Views
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
