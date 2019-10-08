<template>
  <div class="content-container">
    <div class="header-title">
      <h4>Account Support</h4>
    </div>
    <div class="content-form">
      <el-form
        :model="appealForm"
        ref="appealForm"
        label-width="200px"
        :rules="rules"
      >
        <el-form-item prop="contactEmail" label="Email">
          <el-input v-model="appealForm.contactEmail"></el-input>
        </el-form-item>

        <el-form-item label="My Account" prop="appealAccount">
          <el-input v-model="appealForm.appealAccount" placeholder="Personal or Agent"></el-input>
        </el-form-item>

        <el-form-item label="Message" prop="appealReason">
          <el-input
            type="textarea"
            v-model="appealForm.appealReason"
            placeholder="Please enter your complaint."
            :rows="10"
          ></el-input>
        </el-form-item>

        <el-form-item class="send-form">
          <el-button class="btns-submit" type="primary" @click="submitForm('appealForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      appealForm: {},
      rules: {
        contactEmail: [
          { required: true, message: 'Please input the email address', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change']
          }
        ],
        appealAccount: [
          { required: true, message: 'Please enter your account type', trigger: 'blur' }
        ],
        appealReason: [{ required: true, message: 'Please enter the reason', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post(`${this.wxl_path}user/insertUserAppeal`, _this.appealForm)
            .then(res => {
              if (res.data.success) {
                _this.$message({
                  message: 'Success',
                  type: 'success'
                })
                _this.$router.push({
                  name: 'account-after',
                  params: {
                    ..._this.appealForm
                  }
                })
              }
            })
            .catch(err => {
              if (err) {
                this.$message({
                  message: err.data.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: 'Complete the required fields! !',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .content-container
    display: flex
    flex-direction: column
    width: 860px
    .header-title
      padding: 10px 0 50px
      h4
        font-size: 1.875em
        color: #333
        font-weight: bold
    .content-form
      .el-form
        /deep/ .el-form-item
          .el-form-item__label
            text-align: left
            color: #444
            font-size: 1.25em
            font-weight: 400
        .send-form
          margin: 50px 0
          display: flex
          align-items: center
          justify-content: center
          .btns-submit
            height: 2em
            width: 16em
            font-size: 1.5em
</style>
