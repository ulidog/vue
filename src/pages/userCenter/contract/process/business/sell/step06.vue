<template>
  <el-row class="step_06_Views">
    <el-col :span="24" class="reasons" v-if="isReasons">
      <header class="reasons-title">
        <h3>Reasons for termination</h3>
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
              type="number"
              placeholder="0"
              min="0"
              v-model="submitFrom.refrigerator"
              clearable>
            </el-input>
          </span>
        </section>
        <section class="basic-item conditioner">
          <span class="label">Washer and Dryer</span>
          <span class="value">
            <el-input
              type="number"
              placeholder="0"
              min="0"
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
      <sell-submit @ConfirmChange="_ConfirmChange" :ConfirmLoading="ConfirmLoading"></sell-submit>
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
            <el-input v-model="dialogForm.address" placeholder="Address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formatPhone" placeholder="Phone number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dialogForm.name" placeholder="Company name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" right>
          <el-button type="primary" @click="dialogConfirmChange">Confirm</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import submit from '@/components/contract/common/submit'
export default {
  components: {
    'sell-submit': submit
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      submitFrom: {
        type: 0,
        refrigerator: 0,
        airConditioner: 0,
        security: 0
      },
      otherList: [
        {
          id: 0,
          subName: 'gas',
          title: 'Gas',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 1,
          subName: 'electricity',
          title: 'Electricity',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 2,
          subName: 'water',
          title: 'Water',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 3,
          subName: 'cleaningService',
          title: 'Cleaning Service',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 4,
          subName: 'poolMaintenance',
          title: 'Pool Maintenance',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 5,
          subName: 'gardening',
          title: 'Gardening',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 6,
          subName: 'pay',
          title: 'Property Tax Payment',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 7,
          subName: 'trash',
          title: 'Trash',
          address: null,
          phone: null,
          name: null
        },
        {
          id: 8,
          subName: 'maintenance',
          title: 'Maintenance',
          address: null,
          phone: null,
          name: null
        }
      ],
      isSuccessStatus: false,
      isReasons: false,
      reasonsMsg: null,
      dialogVisible: false,
      dialogTitle: null,
      dialogForm: {
        address: null,
        phone: null,
        name: null
      },
      dialogId: null,
      listingForm: {}
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  computed: {
    formatPhone: {
      get: function () {
        // console.log(this.dialogForm.phone)
        if (!this.dialogForm.phone) return ''
        // console.log(this.dialogForm.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.dialogForm.phone.toString().length
        const str = this.dialogForm.phone.toString().replace(/((?![0-9]).)+/g, '')
        // str.substring(0, 3)
        // str.substring(3, 6)
        // str.substring(6)
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
        this.dialogForm.phone = value
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
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      console.log('提交成功!')
      _this.$axios.post(`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_order_transfer`, _this.submitFrom)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: _this.processFrom})
              .then(res => {
                if (res.success) {
                  _this.isSuccessStatus = true
                  _this.ConfirmLoading = false
                  _this.$router.push({
                    name: 'sell-step-07',
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
      // setTimeout(() => {
      //   _this.ConfirmLoading = false
      //   _this.isSuccessStatus = true
      //   // _this.$router.push({
      //   //   path: '/userCenter/contract/process/sell/step-07'
      //   // })
      // }, 500)
      // console.log(this.submitFrom)
    },
    openDialog (val) {
      this.dialogVisible = true
      this.dialogTitle = val.title
      this.dialogId = val.id
      Object.assign(this.dialogForm, val)
    },
    dialogConfirmChange () {
      // console.log(this.listingForm)
      // this.dialogForm = this.listingForm
      Object.assign(this.otherList[this.dialogId], this.dialogForm)
      const opratingJson = JSON.parse(`{
        "${this.dialogForm.subName}Address": "${this.dialogForm.address || ''}",
        "${this.dialogForm.subName}Contact": "${this.dialogForm.phone || ''}",
        "${this.dialogForm.subName}Company": "${this.dialogForm.name || ''}"
      }`)
      console.log(opratingJson)
      Object.assign(this.submitFrom, opratingJson)
      this.dialogVisible = false
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.submitFrom.houseOrderId = _this.params.id
            if (res.data.data.saleHouseOrderRecordingInfo !== undefined) {
              _this.reasonsMsg = res.data.data.saleHouseOrderRecordingInfo.denialReason
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
</style>
