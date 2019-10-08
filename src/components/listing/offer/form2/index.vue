<template>
  <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm-min pad_top_20">
      <el-form-item label="First Name" prop="firstname">
        <el-input v-model="offerForm.firstname"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Middle Name">
        <el-input v-model="offerForm.middlename"></el-input>
      </el-form-item> -->
      <el-form-item label="Last Name" prop="lastname">
        <el-input v-model="offerForm.lastname"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      offerForm: {
        firstname: null,
        middlename: '',
        lastname: null
      },
      rules: {
        firstname: [
          { required: true, message: 'Enter your first name', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: 'Enter your last name', trigger: 'blur' }
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
          this.$emit('collectData', Object.assign({flag: true}, this.offerForm))
        } else {
          this.$emit('collectData', {
            flag: false,
            msg: 'Please correct the highlighted fields above'
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  mounted () {
    console.log(this.GlobalUserInfo)
    this.offerForm.firstname = this.GlobalUserInfo.firstname
    this.offerForm.lastname = this.GlobalUserInfo.lastname
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
</style>
