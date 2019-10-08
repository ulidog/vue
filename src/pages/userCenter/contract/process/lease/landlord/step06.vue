<template>
  <el-row class="step_06_Views">
    <el-col :span="24" class="reasons" v-if="isReasons">
      <header class="reasons-title">
        <h3>Reasons for Termination</h3>
      </header>
      <footer class="refusal-msg">
        <article class="msg">
          {{reasonsMsg}}
        </article>
      </footer>
    </el-col>
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
            <el-input
              placeholder="0"
              v-model="submitFrom.refrigerator"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="basic-item conditioner">
          <span class="label">Washer and Dryer</span>
          <span class="value">
            <el-input
              placeholder="0"
              v-model="submitFrom.airConditioner"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="basic-item security">
          <span class="label">Security(Lock/Key)</span>
          <span class="value">
            <el-input
              placeholder="0"
              v-model="submitFrom.security"
              clearable>
            </el-input>
          </span>
        </section>
      </section>
      <section class="other">
        <section class="other-item">
          <span class="label">Gas</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.gasAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.gasCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Electricity</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.electricityAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone1"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.electricityCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Water</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.waterAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone2"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.waterCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Cleaning Service</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.cleaningServiceAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone3"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.cleaningServiceCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Pool Maintenance</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.poolMaintenanceAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone4"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.poolMaintenanceCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Gardening</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.gardeningAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone5"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.gardeningCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Property Tax Payment</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.payAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone6"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.payCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Trash</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.trashAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone7"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.trashCompany"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="other-item">
          <span class="label">Maintenance</span>
          <span class="value">
            <el-input
              class="inputSty"
              placeholder="Address"
              v-model="submitFrom.maintenanceAddress"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Phone number"
              v-model="formatPhone8"
              clearable>
            </el-input>
            <el-input
              class="inputSty"
              placeholder="Company name"
              v-model="submitFrom.maintenanceCompany"
              clearable>
            </el-input>
          </span>
        </section>
      </section>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <landlord-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></landlord-submit>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'landlord-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      submitFrom: {
        type: 0,
        refrigerator: 0,
        conditioner: 0,
        security: 0,
        airConditioner: 0,
        gasAddress: null,
        gasContact: null,
        gasCompany: null,
        electricityAddress: null,
        electricityContact: null,
        electricityCompany: null,
        waterAddress: null,
        waterContact: null,
        waterCompany: null,
        cleaningServiceAddress: null,
        cleaningServiceContact: null,
        cleaningServiceCompany: null,
        poolMaintenanceAddress: null,
        poolMaintenanceContact: null,
        poolMaintenanceCompany: null,
        gardeningAddress: null,
        gardeningContact: null,
        gardeningCompany: null,
        payAddress: null,
        payContact: null,
        payCompany: null,
        trashAddress: null,
        trashContact: null,
        trashCompany: null,
        maintenanceAddress: null,
        maintenanceContact: null,
        maintenanceCompany: null
      },
      isSuccessStatus: false,
      isReasons: false,
      reasonsMsg: null
    }
  },
  computed: {
    formatPhone: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.gasContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.gasContact.toString().length
        const str = this.submitFrom.gasContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.gasContact = value
      }
    },
    formatPhone1: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.electricityContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.electricityContact.toString().length
        const str = this.submitFrom.electricityContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.electricityContact = value
      }
    },
    formatPhone2: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.waterContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.waterContact.toString().length
        const str = this.submitFrom.waterContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.waterContact = value
      }
    },
    formatPhone3: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.cleaningServiceContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.cleaningServiceContact.toString().length
        const str = this.submitFrom.cleaningServiceContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.cleaningServiceContact = value
      }
    },
    formatPhone4: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.poolMaintenanceContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.poolMaintenanceContact.toString().length
        const str = this.submitFrom.poolMaintenanceContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.poolMaintenanceContact = value
      }
    },
    formatPhone5: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.gardeningContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.gardeningContact.toString().length
        const str = this.submitFrom.gardeningContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.gardeningContact = value
      }
    },
    formatPhone6: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.payContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.payContact.toString().length
        const str = this.submitFrom.payContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.payContact = value
      }
    },
    formatPhone7: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.trashContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.trashContact.toString().length
        const str = this.submitFrom.trashContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.trashContact = value
      }
    },
    formatPhone8: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.submitFrom.maintenanceContact) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.submitFrom.maintenanceContact.toString().length
        const str = this.submitFrom.maintenanceContact.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.submitFrom.maintenanceContact = value
      }
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
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1
      }
      _this.submitFrom.gasContact = _this.submitFrom.gasContact ? _this.submitFrom.gasContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.electricityContact = _this.submitFrom.electricityContact ? _this.submitFrom.electricityContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.waterContact = _this.submitFrom.waterContact ? _this.submitFrom.waterContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.cleaningServiceContact = _this.submitFrom.cleaningServiceContact ? _this.submitFrom.cleaningServiceContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.poolMaintenanceContact = _this.submitFrom.poolMaintenanceContact ? _this.submitFrom.poolMaintenanceContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.gardeningContact = _this.submitFrom.gardeningContact ? _this.submitFrom.gardeningContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.payContact = _this.submitFrom.payContact ? _this.submitFrom.payContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.trashContact = _this.submitFrom.trashContact ? _this.submitFrom.trashContact.replace(/[^0-9]/ig, '') : null
      _this.submitFrom.maintenanceContact = _this.submitFrom.maintenanceContact ? _this.submitFrom.maintenanceContact.replace(/[^0-9]/ig, '') : null
      _this.$axios.post(`${_this.WXL_LOCAL_PATH}rentHouseOrder/insert_order_transfer`, _this.submitFrom)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            _this.updateProcess({url: `${_this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: processFrom})
              .then(res => {
                if (res.success) {
                  _this.isSuccessStatus = true
                  _this.ConfirmLoading = false
                  _this.$router.push({
                    name: 'step-07',
                    query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                    params: _this.params
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            _this.ConfirmLoading = false
          }
        }).catch(err => {
          console.error('tag', err)
        })
      console.log(this.submitFrom)
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
            _this.submitFrom.houseOrderId = _this.params.id
            if (res.data.data.rentHouseOrderRecordingInfo !== undefined && Object.keys(res.data.data.rentHouseOrderRecordingInfo).length !== 0) {
              _this.reasonsMsg = res.data.data.rentHouseOrderRecordingInfo.denialReason
              _this.isReasons = true
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_06_Views
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
            /deep/ .el-input__inner
              height: 52px
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
          .label
            color: #444444
            font-size: 1.4375em
          .value
            display: flex
            .inputSty
              margin: 0 7px
              // width: 200px
              /deep/ .el-input__inner
                height: 52px
</style>
