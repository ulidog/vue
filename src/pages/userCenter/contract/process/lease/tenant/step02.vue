<template>
  <el-row class="steps_02_Views">
    <el-col :span="24" class="content">
      <section class="isFileTip">
        <header class="tip_title">
          <h3>{{ titleTip }}</h3>
        </header>
        <footer class="toContractIntro">
          <section class="bg_box" @click="openViewOffer">
            <img src="/static/img/contract/icons/contact.png" alt="contact">
            <span>Click to view contract details</span>
          </section>
        </footer>
      </section>
      <!-- 无签名档 -->
      <section class="TermsCanvas">
        <el-checkbox v-model="step2From.signature" @change="signatureChange">I confirm that it is my real intention to use the signature file for signing the contract.</el-checkbox>
        <section class="signatureBrod">
          <section class="bg_box">
            <img v-lazy="userSignatureInfo" alt="" v-if="step2From.signature" @click="openSigntrue" :key="Math.random() * 10000 * random">
          </section>
        </section>
      </section>
      <!-- 有签名档 -->
      <!-- <section class="TermsCanvas" v-else>
        <el-checkbox v-model="step2From.signature" @change="signatureChange">I confirm that it is my real intention to use the signature file for signing the contract.</el-checkbox>
        <section class="signatureBrod">
          <section class="bg_box">
            <img v-lazy="userSignatureInfo" alt="" v-if="step2From.signature" :key="Math.random() * 10000">
          </section>
        </section>
      </section> -->
      <footer class="userinfo">
        <h3>If you’ve already verified your identification, please select the document. If you haven’t, please follow the instructions below.</h3>
        <section class="IdCard">
          <el-select @change="cardTypeChange" v-model="step2From.cardType" clearable placeholder="Identity Document" size="medium" class="inputSty">
            <el-option
              v-for="item in cardTypeOptions"
              :key="item.id"
              :label="item.paperworkName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input
            v-show="step2From.cardType !== 0"
            placeholder="Document number"
            v-model="step2From.idCard"
            size="medium"
            class="inputSty"
            :disabled="true"
            clearable>
          </el-input>
          <el-input
            v-show="step2From.cardType === 0"
            placeholder="Name of the document"
            v-model="step2From.otherType"
            size="medium"
            class="inputSty"
            clearable>
          </el-input>
          <el-input
            v-show="step2From.cardType === 0"
            placeholder="Document number"
            v-model="step2From.otherNumber"
            size="medium"
            class="inputSty"
            clearable>
          </el-input>
        </section>
      </footer>
      <!-- close-text="Go to set" -->
      <el-alert
        v-if="cardTypeOptions.length < 2"
        type="info">
        <span slot="title" style="font-size:14px;">In order for you to move to the next step, you must prove verify your identification. Please click <span style="color: #1281FC; cursor: pointer" @click="goPage('account security')">here</span> if you haven’t already.</span>
      </el-alert>
    </el-col>
    <el-col :span="24" class="btn-submit" v-if="isOldShow">
      <section class="Confirm">
        <el-button type="primary" class="btns" @click="ConfirmChange" :disabled="noSubmit" :loading="ConfirmLoading">Confirm</el-button>
      </section>
    </el-col>
    <el-col :span="24" class="dialog">
      <el-dialog
        title="Please sign below"
        :visible.sync="isDialogSignatrue"
        :before-close="closeSignatrue"
        width="60%"
        center>
        <signature-pad @signatrue="_signatrue"></signature-pad>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import signaturePad from '@/components/contract/common/signaturePad'
export default {
  components: {
    'signature-pad': signaturePad
  },
  data () {
    return {
      // 传入或者得到的数据
      params: null,
      step2From: {
        signature: false,
        cardType: 0
      },
      processFrom: null,
      cardTypeOptions: [],
      ConfirmLoading: false,
      // 是否允许点击
      noSubmit: true,
      // 签名
      userSignatureInfo: null,
      // 证件是否齐全
      havecard: true,
      isOldShow: true,
      // 是否签名
      isSignatrue: false,
      // 签名弹窗
      isDialogSignatrue: false,
      // 新的证件号ID
      newCradId: null,
      // 标题
      titleTip: [`This is your rental contract and the landlord is waiting for you to sign. `, `Here is your renewed contract, waiting for your signature`],
      isSignature: false,
      random: 1
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.oldState) {
      this.isOldShow = false
    }
    // 获取签名档
    // this.fetchSignatureFile()
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (this.params.state !== 2) {
      this.titleTip = this.titleTip[1]
    } else {
      this.titleTip = this.titleTip[0]
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    goPage (_name) {
      this.$router.push({
        name: _name
      })
    },
    ConfirmChange () {
      const _this = this
      if (this.step2From.cardType === 0) {
        if (_this.step2From.otherType && _this.step2From.otherNumber) {
          _this.$axios.post(`${this.wxl_path}userPaperwork/insert_user_paperwork_order`, {paperworkName: _this.step2From.otherType, paperworkCode: _this.step2From.otherNumber, paperworkType: 4, origin: 1})
            .then(res => {
              if (res.data.success) {
                _this.newCradId = res.data.data
                _this.updataFrom(true)
              }
            })
        } else {
          this.updataFrom(false)
        }
      } else {
        this.updataFrom(false)
      }
    },
    updataFrom (_type) {
      const _this = this
      _this.ConfirmLoading = true
      _this.processFrom = {
        processState: _this.params.state,
        rentHouseOrderId: _this.params.id,
        state: 1,
        userPaperworkId: _type ? _this.newCradId : (_this.step2From.cardType === 0 ? null : _this.step2From.cardType),
        userSignatureUrl: _this.userSignatureInfo
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}rentHouseOrder/update_process`, data: _this.processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: _this.params.state !== 2 ? 'steps-08' : 'steps-03',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    // 获取签名档
    fetchSignatureFile () {
      const _this = this
      _this.$axios.get(`${this.wxl_path}user/mySignature`)
        .then(res => {
          if (res.data.success) {
            this.isSignature = res.data.data.status === 2
            if (this.isSignature) {
              this.userSignatureInfo = res.data.data.signature
              this.isSignatrue = true
            }
          }
        })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_offer_detail`, {params: {rentHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            try {
              // 更新
              _this.params = Object.assign({}, _this.params, res.data.data.rentHouseOrderInfo)
              // _this.userSignatureInfo = res.data.data.userSignatureInfo
              _this.cardTypeOptions = [...res.data.data.userPaperworkInfo, {id: 0, paperworkName: 'Other types of certification. '}]
              if (_this.cardTypeOptions.length !== 0) {
                _this.step2From.cardType = _this.cardTypeOptions[0].id
                _this.cardTypeChange(_this.cardTypeOptions[0].id)
              }
            } catch (err) {}
          }
          // console.info(res)
        })
    },
    // 选择卡片类别
    cardTypeChange (val) {
      const parentArray = this.searchArrayList('id', val, this.cardTypeOptions)
      if (parentArray.length !== 0) {
        this.step2From.idCard = parentArray[0].paperworkCode
      }
    },
    searchArrayList (name, value, array) {
      return array.map((item) => {
        if (value === item[name.toString()]) {
          return item
        }
      }).filter(fs => {
        if (fs !== undefined) {
          return fs
        }
      })
    },
    signatureChange (isSubmit) {
      // console.log(this.step2From.signature)
      if (isSubmit) {
        if (this.havecard && this.isSignatrue) {
          this.noSubmit = false
        } else {
          this.noSubmit = true
        }
        if (!this.isSignatrue) {
          this.isDialogSignatrue = true
        }
      } else {
        this.noSubmit = true
      }
    },
    openSigntrue () {
      this.isDialogSignatrue = true
    },
    // 上传签名回调
    _signatrue (_info) {
      console.log(_info)
      this.isSignatrue = true
      this.isDialogSignatrue = false
      this.userSignatureInfo = _info.url
      this.signatureChange(true)
      this.random++
    },
    // 关闭签名
    closeSignatrue () {
      if (!this.isSignatrue) {
        this.step2From.signature = false
      }
      this.isDialogSignatrue = false
    },
    openViewOffer () {
      const {href} = this.$router.resolve({
        name: 'view-offer',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({type: 3, id: this.params.id}))}
      })
      window.open(href, '_blank')
    }
  }
}
</script>
<style lang="sass" scoped>
  .steps_02_Views
    .content
      background-color: #fff
      padding: 1.25em 3.75em
      .isFileTip
        .tip_title
          height: 45px
          display: flex
          align-items: center
          justify-content: center
          h3
            font-size: 1.4375em
            font-weight: bold
            color: #444
            // height: 100%
        .toContractIntro
          display: flex
          padding: 20px 0 10px 0
          align-items: center
          justify-content: center
          .bg_box
            width: 17.5625em
            height: 9.3125em
            background: rgba(243,244,245,1)
            display: flex
            align-items: center
            flex-direction: column
            justify-content: center
            span
              color: #1281FC
              font-size: 1.1875em
              margin-top: 18px
      .TermsCanvas
        .el-checkbox.is-checked
          /deep/ .el-checkbox__inner
            background-color: #1281FC
            color: #1281FC
        .el-checkbox
          display: flex
          align-items: center
          /deep/ .el-checkbox__inner
            border-radius: 50%
            width: 25px
            height: 25px
            &:after
              height: 15px
              left: 7px
              top: 2px
              width: 8px
          /deep/ .el-checkbox__label
            font-size: 19px
        .signatureBrod
          display: flex
          padding: 10px 0 10px 0
          align-items: center
          justify-content: center
          .bg_box
            width: 17.5625em
            height: 9.3125em
            background: rgba(243,244,245,1)
            display: flex
            align-items: center
            flex-direction: column
            justify-content: center
            img
              width: 100%
              height: 100%
      .userinfo
        margin: 18px 0
        h3
          font-size: 1.4375em
          color: #999
        .IdCard
          display: flex
          flex-direction: column
          width: 25.9375em
          .inputSty
            margin: 10px 0
            height: 52px
            font-size: 19px
            /deep/ .el-input
              height: 100%
            /deep/ input
              height: 100%
              font-size: 19px
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
