<template>
  <div class="offer-continer">
    <el-form ref="uploadForm" :model="uploadForm" :rules="rules" class="offerForm-min pad_top_20">
      <el-form-item label="Price" prop="price" class="beforeUs">
        <el-input v-model.number="uploadForm.price" type="number" :max="10000000000000000" @blur="maxPriceChange(uploadForm)"></el-input>
      </el-form-item>
      <el-form-item class="beforeUs">
        <span slot="label">Down Payment<span class="font-gary"> {{ advanceTitle[offerType - 1] }}</span></span>
        <el-input v-model="uploadForm.advanceMoney" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Contract Cancellation Period" prop="confessionDays">
        <el-input v-model.number="uploadForm.confessionDays" :disabled="true" type="number"></el-input>
        <span class="remarks">Buyers have the option to cancel their contract with the seller and receive a refund during this agreed upon cancellation period. If there has been no refund request after this period of time passes, the buyer will no longer be able to receive their down payment deposit refund. The first day of this period starts when the deal has been finalized and completed. </span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      advanceTitle: [`(10% of the asking price)`, `(5% of the asking price)`],
      rules: {
        price: [
          { required: true, message: 'Please enter the amount', trigger: 'blur' },
          { type: 'number', message: 'Please enter the number' }
        ],
        confessionDays: [
          { required: true, message: 'Please enter the number of days for a breach of contract period', trigger: 'blur' },
          { type: 'number', message: 'Please enter the number' }
        ]
      },
      uploadForm: {
        price: 0,
        advanceMoney: 0,
        confessionDays: 0
      }
    }
  },
  filters: {
    toFixedTwo (_val) {
      if (_val > 0) {
        return _val.toFixed(2)
      }
    }
  },
  props: {
    isSubmitNow: {
      type: Boolean,
      default: false
    },
    offerForm: {
      type: Object,
      default: Object
    },
    offerType: {
      type: Number,
      default: 1
    }
  },
  watch: {
    'uploadForm.price': function (val, oldVal) {
      if (val === null || val === '' || val === undefined) return
      this.uploadForm.price = Number(val)
      this.uploadForm.advanceMoney = Number((val * (this.offerType === 1 ? 0.10 : 0.05))).toFixed(2)
      this.$emit('collectData', Object.assign({flagJson: true}, this.uploadForm))
    },
    'offerType': function (_new, _old) {
      this.uploadForm = Object({}, this.uploadForm, {advanceMoney: Number((this.uploadForm.price * (_new === 1 ? 0.10 : 0.05))).toFixed(2)})
    },
    isSubmitNow (_new, _old) {
      if (_new) {
        this.collectFrom('uploadForm')
      }
    },
    offerForm: {
      handler (_new, _old) {
        if (_new instanceof Object && Object.keys(_new).length > 0) {
          this.uploadForm = Object.assign({}, _new)
        }
      },
      deep: true
    }
  },
  methods: {
    collectFrom (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.uploadForm.flagJson
          this.$emit('collectData', Object.assign({flag: true}, {
            price: this.uploadForm.price,
            advanceMoney: this.uploadForm.advanceMoney,
            confessionDays: this.uploadForm.confessionDays
          }))
        } else {
          this.$emit('collectData', {
            flag: false,
            msg: 'Please correct the highlighted fields above'
          })
        }
      })
    },
    // 正则校验
    maxPriceChange (_val) {
      console.log(_val)
      if (_val.price === null || _val.price === '' || _val.price === undefined) return
      if (_val.price > 10000000000000000) {
        _val.price = 10000000000000000
      } else if (_val.price < 0) {
        _val.price = 0
      } else {
        _val.price.toFixed(2)
      }
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
      /deep/ .beforeUs
        .el-input
          &:before
            content: '$'
            font-size: 14px
            position: absolute
            left: 1em
          input
            text-indent: 1em
</style>
