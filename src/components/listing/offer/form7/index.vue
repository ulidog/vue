<template>
  <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm-min pad_top_20">
      <el-form-item label="Payment method" prop="payMode">
        <el-radio-group v-model="offerForm.payMode">
          <el-radio :label="1">Pay the landlord</el-radio>
          <el-radio :label="2" :disabled="true">Pay to Ebuyhouse</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Rent payment" prop="rentPayment">
        <el-radio-group v-model="offerForm.rentPayment">
          <el-radio
            :label="item.value"
            v-for="item in rentPaymentType"
            :key="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Rental term">
        <el-input-number v-model.number="offerForm.rentPaymentTime" :max="36" :min="1"></el-input-number>
        <span>{{rentPaymentType[offerForm.rentPayment-1].label}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rentPaymentType: [
        { label: 'Months', value: 1 },
        { label: 'Quarterly', value: 2 },
        { label: 'Half year', value: 3 },
        { label: 'Year', value: 4 }
      ],
      offerForm: {
        rentPayment: 1,
        rentPaymentTime: 1,
        payMode: 1
      },
      rules: {
        payMode: [
          {
            required: true,
            message: 'Please select payment method',
            trigger: 'blur'
          }
        ],
        rentPayment: [
          {
            required: true,
            message: 'Please try to choose to live the months',
            trigger: 'blur'
          }
        ],
        rentPaymentTime: [
          {
            required: true,
            message: 'Please try to choose to live the months',
            trigger: 'blur'
          },
          { type: 'number', message: 'Please correct the highlighted fields above' }
        ]
      }
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
    }
  },
  methods: {
    collectFrom (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.offerForm.flagJson
          this.$emit(
            'collectData',
            Object.assign({ flag: true }, this.offerForm)
          )
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
    .pad_top_20
      padding: 20px 0
    .offerForm-min
      /deep/ .el-form-item
        margin-bottom: 8px
      /deep/ .el-form-item__label
        font-size: 1.3750em
        font-wight: bold
        color: #444
        float: none
      .font-gary,.remarks
        font-size: 14px
        color: #999999
        line-height: 20px
        display: inline-block
        word-wrap: break-word
        width: 100%
</style>
