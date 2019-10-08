<template>
  <div class="offer-continer">
    <el-form ref="uploadForm" :model="uploadForm" :rules="rules" class="offerForm-min pad_top_20">
      <el-form-item label="Rent/month" prop="monthlyRent" class="beforeUs">
        <el-input v-model.number="uploadForm.monthlyRent" type="number" :max="10000000000000000" @blur="maxPriceChange(uploadForm)">
          <!-- <template slot="prepend">$</template> -->
        </el-input>
      </el-form-item>
      <el-form-item label="Deposit" prop="deposit" class="beforeUs">
        <el-input v-model.number="uploadForm.deposit" :disabled="true">
          <!-- <template slot="prepend">$</template> -->
        </el-input>
      </el-form-item>
      <!-- prop="transferDays" -->
      <el-form-item label="Processing time (Max 60 days)">
        <el-input v-model.number="uploadForm.transferDays" type="number" :max="60" :min="1" @blur="checkMaxLength($event, uploadForm)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      uploadForm: {},
      rules: {
        monthlyRent: [
          { required: true, message: 'Please enter the amount', trigger: 'blur' }
        ],
        transferDays: [
          { required: true, message: 'Please enter the number of days for a breach of contract period', trigger: 'blur' },
          { type: 'number', message: 'Please correct the highlighted fields above' }
        ]
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
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (_new) {
        this.collectFrom('uploadForm')
      }
    },
    offerForm: {
      handler (_new, _old) {
        if (_new instanceof Object && Object.keys(_new).length !== 0) {
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
          this.$emit('collectData', {
            flag: true,
            monthlyRent: this.uploadForm.monthlyRent,
            deposit: this.uploadForm.deposit || 0, // 兼容避免用户房子没有押金填写时错误
            transferDays: this.uploadForm.transferDays
          })
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
      if (_val.monthlyRent === null || _val.monthlyRent === '' || _val.monthlyRent === undefined) return
      if (_val.monthlyRent > 10000000000000000) {
        _val.monthlyRent = 10000000000000000
      } else if (_val.monthlyRent < 0) {
        _val.monthlyRent = 0
      } else {
        _val.monthlyRent = Number(_val.monthlyRent).toFixed(2)
      }
    },
    // 最大
    checkMaxLength (_e, _val) {
      if (Number(_val.transferDays) > 60 || Number(_val.transferDays) < 0) {
        _val.transferDays = 60
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
