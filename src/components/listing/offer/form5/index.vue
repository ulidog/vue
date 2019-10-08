<template>
  <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm-min pad_top_20">
      <el-form-item label="SFT Trial Period" prop="tryTime">
        <el-radio-group v-model="offerForm.tryTime">
          <el-radio :label="item" v-for="item in [2, 3]" :key="item">{{ item }} months</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Rental Payment($/Month)">
        <el-input v-model.number="offerForm.tryRent" :disabled="true"></el-input>
        <span
          class="font-gary"
        >(The rent include utilities, gas charges and property management fees. The monthly rent is 0.75% of the total home price. You can enjoy one month's rent reduction when the deal is made.).</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      offerForm: {
        tryTime: 2
      },
      rules: {
        tryTime: [
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
    },
    updownKeyWords: {
      type: Object,
      default: () => {
        return { price: null }
      }
    }
  },
  watch: {
    'offerForm.tryTime': function (val, oldVal) {
      if (
        this.updownKeyWords.price !== undefined &&
        this.updownKeyWords.price !== null &&
        this.updownKeyWords.price !== ''
      ) {
        this.offerForm.tryRent = (0.0075 * this.updownKeyWords.price).toFixed(
          2
        )
      } else {
        this.offerForm.tryRent = 'Please enter the amount'
      }
    },
    'updownKeyWords.price': {
      handler (val, oldVal) {
        const _this = this
        if (this.offerForm.tryRent !== undefined) {
          this.$nextTick(() => {
            _this.$forceUpdate()
            _this.offerForm.tryRent = Number(0.0075 * val).toFixed(2)
          })
        } else {
          this.offerForm.tryRent = 'Please try to choose to live the months'
        }
      },
      immediate: true,
      deep: true
    },
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
