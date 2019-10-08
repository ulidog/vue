<template>
  <div class="offer-continer">
    <el-form ref="uploadForm" :model="uploadForm" class="offerForm-min pad_top_20">
      <el-form-item label="Parcel #" prop="apn">
        <el-input v-model="uploadForm.apn" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Zip" prop="zip">
        <el-input v-model="uploadForm.zip" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Living sqft" prop="livingSqft">
        <el-input v-model="uploadForm.livingSqft" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Address" prop="street">
        <el-input v-model="uploadForm.street" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      uploadForm: {}
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
        this.collectFrom()
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
    collectFrom () {
      const cloneForm = {
        flag: true,
        apn: this.uploadForm.apn,
        zip: this.uploadForm.zip,
        livingSqft: this.uploadForm.livingSqft,
        street: this.uploadForm.street
      }
      this.$emit('collectData', cloneForm)
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
