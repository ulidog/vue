<template>
  <el-row class="steps_07_Views">
    <el-col :span="24" class="header">
      <h3>Move In Checklist</h3>
    </el-col>
    <el-col :span="24" class="content">
      <section class="Basic">
        <!-- <section class="basic-item transfer">
          <span class="label">Housing transfer</span>
          <span class="value">
            <el-radio v-model="submitFrom.type" :label="0" class="redio-type">yes</el-radio>
          </span>
        </section> -->
        <section class="basic-item refrigerator">
          <span class="label">Refrigerator</span>
          <span class="value">
            {{ submitFrom.refrigerator }}
          </span>
        </section>
        <section class="basic-item conditioner">
          <span class="label">Washer and Dryer</span>
          <span class="value">
            {{submitFrom.airConditioner}}
          </span>
        </section>
        <section class="basic-item security">
          <span class="label">Security(Lock/Key)</span>
          <span class="value">
            {{submitFrom.security}}
          </span>
        </section>
      </section>
      <section class="other">
        <section class="other-item" v-for="item in otherList" :key="item.id" @click="openDialog(item)">
          <span class="label">{{ item.title }}</span>
          <span class="value">
            <span>{{ item.address }}&nbsp;{{ item.phone }}&nbsp;{{ item.name }}</span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </section>
      </section>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
    </el-col>
    <el-col :span="24">
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <template slot="title">
          <span>{{dialogTitle}}</span>
        </template>
        <el-form v-model="dialogForm">
          <el-form-item>
            <el-input v-model="dialogForm.address" placeholder="Address" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dialogForm.phone" placeholder="Phone number" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dialogForm.name" placeholder="Company name" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      submitFrom: {
        type: 0,
        refrigerator: 0,
        conditioner: 0,
        security: 0
      },
      isSuccessStatus: false,
      isReasons: false,
      isShowAll: false,
      otherList: [],
      dialogVisible: false,
      dialogTitle: null,
      dialogForm: {},
      dialogId: null
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
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
    _confirm () {
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.ConfirmLoading = true
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: Number(_this.processType) !== 1 ? 'common-steps-01' : 'common-steps-04',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _reject () {
      this.$router.push({
        name: 'common-steps-02',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
        params: Number(this.processType) !== 0 ? Object.assign({},
          this.params,
          {
            isAssess: true,
            pageUrl: 'common-steps-08',
            msg: `You have rejected the seller's payment voucher, waiting for the seller to re-upload`
          },
          {refuseTypeList: [
            {
              label: 'The handover form is incomplete',
              value: 0
            },
            {
              label: 'The information you fill is wrong',
              value: 1
            },
            {
              label: 'Other reasons',
              value: -1
            }
          ]}) : this.params
      })
    },
    openDialog (val) {
      this.dialogVisible = true
      this.dialogTitle = val.title
      this.dialogId = val.id
      this.dialogForm = val
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            const resparams = res.data.data.orderTransferInfo
            // 赋值
            _this.submitFrom.houseOrderId = _this.params.id
            _this.submitFrom.refrigerator = resparams.refrigerator
            _this.submitFrom.airConditioner = resparams.airConditioner
            _this.submitFrom.security = resparams.security
            if (resparams.gasAddress !== null) {
              _this.otherList.push({
                id: 0,
                subName: 'gas',
                title: 'Gas',
                address: resparams.gasAddress,
                phone: resparams.gasContact,
                name: resparams.gasCompany
              })
            }
            if (resparams.electricityAddress !== null) {
              _this.otherList.push({
                id: 1,
                subName: 'electricity',
                title: 'Electricity',
                address: resparams.electricityAddress,
                phone: resparams.electricityContact,
                name: resparams.electricityCompany
              })
            }
            if (resparams.waterAddress !== null) {
              _this.otherList.push({
                id: 2,
                subName: 'water',
                title: 'Water',
                address: resparams.waterAddress,
                phone: resparams.waterContact,
                name: resparams.waterCompany
              })
            }
            if (resparams.cleaningServiceAddress !== null) {
              _this.otherList.push({
                id: 3,
                subName: 'cleaningService',
                title: 'Cleaning Service',
                address: resparams.cleaningServiceAddress,
                phone: resparams.cleaningServiceContact,
                name: resparams.cleaningServiceCompany
              })
            }
            if (resparams.poolMaintenanceAddress !== null) {
              _this.otherList.push({
                id: 4,
                subName: 'poolMaintenance',
                title: 'Pool Maintenance',
                address: resparams.poolMaintenanceAddress,
                phone: resparams.poolMaintenanceContact,
                name: resparams.poolMaintenanceCompany
              })
            }
            if (resparams.gardeningAddress !== null) {
              _this.otherList.push({
                id: 5,
                subName: 'gardening',
                title: 'Gardening',
                address: resparams.gardeningAddress,
                phone: resparams.gardeningContact,
                name: resparams.gardeningCompany
              })
            }
            if (resparams.payAddress !== null) {
              _this.otherList.push({
                id: 6,
                subName: 'pay',
                title: 'Pay',
                address: resparams.payAddress,
                phone: resparams.payContact,
                name: resparams.payCompany
              })
            }
            if (resparams.trashAddress !== null) {
              _this.otherList.push({
                id: 7,
                subName: 'trash',
                title: 'Trash',
                address: resparams.trashAddress,
                phone: resparams.trashContact,
                name: resparams.trashCompany
              })
            }
            if (resparams.maintenanceAddress !== null) {
              _this.otherList.push({
                id: 8,
                subName: 'maintenance',
                title: 'Maintenance',
                address: resparams.maintenanceAddress,
                phone: resparams.maintenanceContact,
                name: resparams.maintenanceCompany
              })
            }
            console.log(this.otherList)
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_07_Views
    .reasons
      margin-bottom: 22px
      background-color: #fff
      display: flex
      flex-direction: column
      border-radius: 5px
      .reasons-title
        border-bottom: 1px solid #f3f4f5
        margin: 0 19px
        h3
          height: 60px
          display: flex
          justify-content: center
          align-items: center
          font-size: 1.4375em
          color: #444
          font-weight: bold
      .refusal-msg
        padding: 15px 19px 77px
        article
          font-size: 1.4375em
          color: #444
    .header
      background-color: #fff
      display: flex
      width: 100%
      padding: 10px 0
      h3
        font-size: 1.8125em
        color: #444
        font-weight: bold
        height: 45px
        display: flex
        align-items: center
        justify-content: center
        width: 100%
    .content
      background-color: #fff
      .Basic
        .transfer,.security
          border-bottom: 1px solid #f3f4f5
        .basic-item
          height: 72px
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 7px
          margin: 0 8px
          .label,.value
            width: 50%
            flex: 0 0 50%
          .label
            color: #444444
            font-size: 1.4375em
          .value
            .redio-type
              display: flex
              /deep/ .el-radio__input
                .el-radio__inner
                  width: 24px
                  height: 24px
                  &:after
                    width: 10px
                    height: 10px
              /deep/ .el-radio__label
                font-size: 1.4735em
                padding-left: 20px
            span
              font-size: 1.4735em
      .other
        padding-bottom: 20px
        .other-item
          border-bottom: 1px solid #f3f4f5
          height: 78px
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 7px
          margin: 0 8px
          cursor: pointer
          .label
            width: 50%
            flex: 0 0 50%
            color: #444444
            font-size: 1.4375em
          .value
            width: 50%
            flex: 0 0 50%
            display: flex
            justify-content: space-between
            align-items: center
            span
              font-size: 19px
              color: #999
              display: flex
              align-items: center
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              -webkit-line-clamp: 1
              // height: 20px
            i
              font-size: 35px
              color: #999
</style>
