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
        <section :class="{'other-item': true, 'action': submitFrom.gas.isShowAll}" @click="submitFrom.gas.isShowAll = !submitFrom.gas.isShowAll" v-if="isShowListChange(submitFrom.gas)">
          <span class="label">Gas</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.gas.address}}</span>
            <span class="inputSty">{{submitFrom.gas.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.gas.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.electricity.isShowAll}" @click="submitFrom.electricity.isShowAll = !submitFrom.electricity.isShowAll" v-if="isShowListChange(submitFrom.electricity)">
          <span class="label">Electricity</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.electricity.address}}</span>
            <span class="inputSty">{{submitFrom.electricity.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.electricity.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.water.isShowAll}" @click="submitFrom.water.isShowAll = !submitFrom.water.isShowAll" v-if="isShowListChange(submitFrom.water)">
          <span class="label">Water</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.water.address}}</span>
            <span class="inputSty">{{submitFrom.water.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.water.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.cleanService.isShowAll}" @click="submitFrom.cleanService.isShowAll = !submitFrom.cleanService.isShowAll" v-if="isShowListChange(submitFrom.cleanService)">
          <span class="label">Cleaning Service</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.cleanService.address}}</span>
            <span class="inputSty">{{submitFrom.cleanService.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.cleanService.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.pool.isShowAll}" @click="submitFrom.pool.isShowAll = !submitFrom.pool.isShowAll" v-if="isShowListChange(submitFrom.pool)">
          <span class="label">Pool Maintenance</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.pool.address}}</span>
            <span class="inputSty">{{submitFrom.pool.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.pool.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.gardening.isShowAll}" @click="submitFrom.gardening.isShowAll = !submitFrom.gardening.isShowAll" v-if="isShowListChange(submitFrom.gardening)">
          <span class="label">Gardening</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.gardening.address}}</span>
            <span class="inputSty">{{submitFrom.gardening.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.gardening.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.payment.isShowAll}" @click="submitFrom.payment.isShowAll = !submitFrom.payment.isShowAll" v-if="isShowListChange(submitFrom.payment)">
          <span class="label">Property Tax Payment</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.payment.address}}</span>
            <span class="inputSty">{{submitFrom.payment.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.payment.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.trash.isShowAll}" @click="submitFrom.trash.isShowAll = !submitFrom.trash.isShowAll" v-if="isShowListChange(submitFrom.trash)">
          <span class="label">Trash</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.trash.address}}</span>
            <span class="inputSty">{{submitFrom.trash.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.trash.name}}</span>
          </span>
        </section>
        <section :class="{'other-item': true, 'action': submitFrom.maintenance.isShowAll}" @click="submitFrom.maintenance.isShowAll = !submitFrom.maintenance.isShowAll" v-if="isShowListChange(submitFrom.maintenance)">
          <span class="label">Maintenance</span>
          <span class="value">
            <span class="inputSty">{{submitFrom.maintenance.address}}</span>
            <span class="inputSty">{{submitFrom.maintenance.phone | changeDigital}}</span>
            <span class="inputSty">{{submitFrom.maintenance.name}}</span>
          </span>
        </section>
      </section>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <tenant-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading"></tenant-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'tenant-confirm-and-reject': confirmAndReject
  },
  filters: {
    changeDigital (val) {
      if (val) {
        let _val = val.replace(/[^0-9]/ig, '')
        if (_val !== '') {
          return '(' + _val.substr(0, 3) + ')' + _val.substr(3, 3) + '-' + _val.substr(6)
        } else {
          return val
        }
      } else {
        return val
      }
    }
  },
  data () {
    return {
      ConfirmLoading: false,
      submitFrom: {
        type: 0,
        refrigerator: 0,
        airConditioner: 0,
        security: 0,
        gas: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        electricity: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        water: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        cleanService: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        pool: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        gardening: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        payment: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        trash: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        },
        maintenance: {
          address: null,
          phone: null,
          name: null,
          isShowAll: false
        }
      },
      isSuccessStatus: false,
      isReasons: false,
      isShowAll: false
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(0, this.params.state))
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
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.ConfirmLoading = true
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
        .then(res => {
          if (res.success) {
            _this.isSuccessStatus = true
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'steps-08',
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
        params: Object.assign(this.params, {isAssess: true, pageUrl: 'steps-09'}, {
          refuseTypeList: [
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
          ]
        })
      })
    },
    isShowListChange: (val) => {
      // console.log(val)
      if (val.address !== null && val.phone !== null && val.name !== null) {
        return true
      }
      return false
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            const resparams = res.data.data.orderTransferInfo
            console.log(resparams)
            // 赋值
            _this.submitFrom.houseOrderId = _this.params.id
            _this.submitFrom.refrigerator = resparams.refrigerator
            _this.submitFrom.airConditioner = resparams.airConditioner
            _this.submitFrom.security = resparams.security
            if (resparams.gasAddress !== null || resparams.gasAddress !== undefined) {
              Object.assign(_this.submitFrom.gas, {
                id: 0,
                address: resparams.gasAddress,
                phone: resparams.gasContact,
                name: resparams.gasCompany
              })
            }
            if (resparams.electricityAddress !== null || resparams.electricityAddress !== undefined) {
              Object.assign(_this.submitFrom.electricity, {
                id: 1,
                address: resparams.electricityAddress,
                phone: resparams.electricityContact,
                name: resparams.electricityCompany
              })
            }
            if (resparams.waterAddress !== null || resparams.waterAddress !== undefined) {
              Object.assign(_this.submitFrom.water, {
                id: 2,
                address: resparams.waterAddress,
                phone: resparams.waterContact,
                name: resparams.waterCompany
              })
            }
            if (resparams.cleaningServiceAddress !== null || resparams.cleaningServiceAddress !== undefined) {
              Object.assign(_this.submitFrom.cleanService, {
                id: 3,
                address: resparams.cleaningServiceAddress,
                phone: resparams.cleaningServiceContact,
                name: resparams.cleaningServiceCompany
              })
            }
            if (resparams.poolMaintenanceAddress !== null || resparams.poolMaintenanceAddress !== undefined) {
              Object.assign(_this.submitFrom.pool, {
                id: 4,
                address: resparams.poolMaintenanceAddress,
                phone: resparams.poolMaintenanceContact,
                name: resparams.poolMaintenanceCompany
              })
            }
            if (resparams.gardeningAddress !== null || resparams.gardeningAddress !== undefined) {
              Object.assign(_this.submitFrom.gardening, {
                id: 5,
                address: resparams.gardeningAddress,
                phone: resparams.gardeningContact,
                name: resparams.gardeningCompany
              })
            }
            if (resparams.payAddress !== null || resparams.payAddress !== undefined) {
              Object.assign(_this.submitFrom.payment, {
                id: 6,
                address: resparams.payAddress,
                phone: resparams.payContact,
                name: resparams.payCompany
              })
            }
            if (resparams.trashAddress !== null || resparams.trashAddress !== undefined) {
              Object.assign(_this.submitFrom.trash, {
                id: 7,
                address: resparams.trashAddress,
                phone: resparams.trashContact,
                name: resparams.trashCompany
              })
            }
            if (resparams.maintenanceAddress !== null || resparams.maintenanceAddress !== undefined) {
              Object.assign(_this.submitFrom.maintenance, {
                id: 8,
                address: resparams.maintenanceAddress,
                phone: resparams.maintenanceContact,
                name: resparams.maintenanceCompany
              })
            }
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
          transition: height .5s ease
          .label
            color: #444444
            font-size: 1.4375em
          .value
            display: flex
            .inputSty
              margin: 0 7px
              width: 200px
              font-size: 1.4735em
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              -webkit-line-clamp: 2
          &.action
            height: 150px
            min-height: 78px
            padding: 10px 7px
            transition: height .5s ease
            .inputSty
              margin: 0 7px
              width: 200px
              font-size: 1.4735em
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              -webkit-line-clamp: 10
              align-items: center
              display: flex
</style>
