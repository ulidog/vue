<template>
  <el-row class="comon_02_Views">
    <el-col :span="24" class="header">
      <section class="refuse_title">
        <h3>Reasons for termination</h3>
      </section>
    </el-col>
    <el-col :span="24" class="content">
      <buy-refuse @refuseFrom="refuseFromChange" :refuseTypeList="refuseTypeList"></buy-refuse>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <buy-submit @ConfirmChange="ConfirmChange" :ConfirmLoading="ConfirmLoading"></buy-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
import refuse from '@/components/contract/common/refuse'
export default {
  components: {
    'buy-refuse': refuse,
    'buy-submit': submit
  },
  data () {
    return {
      UPDATA_URL_HREF: [`${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`],
      GET_URL_HEEF: [`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, `${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`],
      params: null,
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
          label: 'Suspend renting',
          value: 1
        },
        {
          label: 'Other reasons',
          value: -1
        }
      ],
      ConfirmLoading: false,
      URL_NAME: 'common-steps-04',
      params_ags: null
    }
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.params_ags = this.$route.params
    if (this.$route.params !== null && this.$route.params !== undefined) {
      if (this.$route.params.isAssess) {
        this.URL_NAME = this.$route.params.pageUrl
      }
      if (this.$route.params.refuseTypeList) {
        this.refuseTypeList = this.$route.params.refuseTypeList
      }
    }
    this.getOfferDetails()
    if (Number(this.processType) === 0) {
      this.updateStatus(getStateLineStore(0, this.params.state))
      this.UPDATA_URL_HREF = this.UPDATA_URL_HREF[1]
    } else {
      this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
      this.UPDATA_URL_HREF = this.UPDATA_URL_HREF[0]
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
      let processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2,
        denialReason: _this.refuseFrom.refuseMsg
      }
      if (Number(this.processType) === 0) {
        delete processFrom.saleHouseOrderId
        processFrom['rentHouseOrderId'] = _this.params.id
      }
      _this.updateProcess({url: _this.UPDATA_URL_HREF, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: _this.URL_NAME,
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params_ags
            })
          } else {
            _this.ConfirmLoading = false
          }
        })
        .catch(err => {
          _this.ConfirmLoading = false
          console.log(err)
        })
    },
    getOfferDetails () {
      const _this = this
      let paramsId = { saleHouseOrderId: _this.params.id }
      if (Number(_this.processType) === 0) {
        delete paramsId.saleHouseOrderId
        paramsId['rentHouseOrderId'] = _this.params.id
        _this.GET_URL_HEEF = _this.GET_URL_HEEF[1]
      } else {
        _this.GET_URL_HEEF = _this.GET_URL_HEEF[0]
      }
      _this.$axios.get(_this.GET_URL_HEEF, {params: paramsId})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            if (Number(_this.processType) === 0) {
              _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            } else {
              _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            }
          }
          // console.info(res)
        })
    },
    refuseFromChange (val) {
      this.refuseFrom = val
      // console.log(this.refuseFrom)
    }
  }
}
</script>
<style lang="sass" scoped>
  .comon_02_Views
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
