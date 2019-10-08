<template>
  <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm pad_top_30">
      <el-form-item label="Payment Method" prop="payMode">
        <el-radio-group v-model="offerForm.payMode">
          <el-radio :label="item.value" v-for="item in payModeList" :key="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Transaction Mode" prop="transactionMode">
        <el-radio-group v-model="offerForm.transactionMode">
          <el-radio :label="item.value" v-for="item in transactionModeList" :key="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      houseIdList: [],
      offerForm: {
        payMode: 1,
        transactionMode: 1
      },
      rules: {
        payMode: [
          { required: true, message: 'Please select payment method', trigger: 'blur' }
        ],
        transactionMode: [
          { required: true, message: 'Please select payment method', trigger: 'blur' }
        ]
      },
      payModeList: [{value: 1, label: 'Full Payment'}, {value: 2, label: 'Loan'}],
      transactionModeList: [{value: 1, label: 'Traditional Transaction'}, {value: 2, label: 'SFT Transaction'}],
      CopyForm6KeysWords: ['apn', 'zip', 'livingSqft', 'street', 'price']
    }
  },
  props: {
    isSubmitNow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (_new) {
        this.collectFrom('offerForm')
      }
    },
    'offerForm.transactionMode': function (_new, _old) {
      // console.log(_new)
      // 更新一次数据（为选择不同付款类型从而数据类型不一致的问题）
      this.$emit('collectData', Object.assign({flagJson: true}, this.offerForm))
    }
  },
  created () {
  },
  methods: {
    collectFrom (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.offerForm.flagJson
          this.$emit('collectData', Object.assign({flag: true}, this.offerForm))
        } else {
          this.$emit('collectData', {
            flag: false,
            msg: 'Please correct the highlighted fields above'
          })
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .offer-continer
    margin-bottom: 20px
    border-radius: 3px
    overflow: hidden
    background-color: #fff
    padding: 0 3.875em
    .pad_top_30
      padding: 30px 0 10px
    .offerForm
      /deep/ .el-form-item
        position: relative
      /deep/ .el-form-item:first-child:before
        content: ''
        width: 100%
        height: 2px
        background-color: #F3F4F5
        position: absolute
        bottom: -11px
      /deep/ .el-form-item__label
        font-size: 1.3750em
        font-wight: bold
        color: #444
        float: none
</style>
