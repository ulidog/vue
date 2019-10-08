<template>
  <el-row class="steps_30_Views">
    <el-col :span="24" class="header">
      <section class="refuse_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <tenant-refuse @refuseFrom="refuseFromChange" :refuseTypeList="refuseTypeList"></tenant-refuse>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <tenant-submit @ConfirmChange="_confirm" :ConfirmLoading="ConfirmLoading" :submitTitle="'Confirm'"></tenant-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import refuse from '@/components/contract/common/refuse'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'tenant-refuse': refuse,
    'tenant-submit': submit
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
          label: 'The actual amount of payment doesn’t match with the agreed amount of payment',
          value: 0
        },
        {
          label: 'The proof of payment is blurred',
          value: 1
        },
        {
          label: 'Other reasons',
          value: 2
        }
      ],
      ConfirmLoading: false
    }
  },
  mounted () {
    this.updateStatus(3)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      const _this = this
      let processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.refuseFrom.refuseMsg
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-28-checkout',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this._params
            })
          }
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
  .steps_30_Views
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
</style>
