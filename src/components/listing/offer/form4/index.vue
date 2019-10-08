<template>
  <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm-min pad_top_20">
      <!-- prop="escrowCompany" -->
      <el-form-item label="Escrow Company's Name">
        <el-input v-model="offerForm.escrowCompany"></el-input>
      </el-form-item>
      <!-- prop="transferDays" -->
      <el-form-item label="Processing Time (Max 60 Days)">
        <el-input v-model.number="offerForm.transferDays" type="number" :max="60" :min="1" @blur="checkMaxLength($event, offerForm)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      offerForm: {},
      rules: {
        escrowCompany: [
          { required: true, message: 'Please enter the escrow company’s name', trigger: 'blur' }
        ],
        transferDays: [
          { required: true, message: 'Please enter the transfer time', trigger: 'blur' },
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
          this.$emit('collectData', Object.assign({flag: true}, {
            escrowCompany: this.offerForm.escrowCompany,
            transferDays: this.offerForm.transferDays
          }))
        } else {
          this.$emit('collectData', {
            flag: false,
            msg: 'Please correct the highlighted fields above'
          })
        }
      })
    },
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
</style>
