<style lang="scss" scoped>
.title{
  margin-top: 1em;
  margin-bottom: 1.5em;
  font-size: 1.2em;
  display: flex;
}

.title-txt{
  white-space: nowrap;
  padding-right: 1em;
}

.title-tip{
  flex-shrink: 1;
  font-size: 0.8em;
  color: #909090;
}

/deep/ .el-form-item__label,
.el-input__inner{
  font-size: 1.2em;
  color: #909090;
}

/deep/ .el-form-item__error{
  font-size: 1em;
}

.el-button{
  font-size: 1.3em;
}
</style>

<template>
  <div>
    <h6 class="title">
      <span class="title-txt">Change password</span>
      <span class="title-tip">Use 8-16 characters with a mix of numbers and letters</span>
    </h6>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px">
      <el-form-item label="Current pwd" prop="oldPwd">
        <el-input type="password" v-model="form.oldPwd" autocomplete="off" placeholder="Enter your old password."></el-input>
      </el-form-item>
      <el-form-item label="New pwd" prop="newPwd">
        <el-input type="password" v-model="form.newPwd" autocomplete="off" placeholder="Enter your new password."></el-input>
      </el-form-item>
      <el-form-item label="Confirm pwd" prop="confirmPwd">
        <el-input type="password" v-model="form.confirmPwd" autocomplete="off" placeholder="Confirm your new password."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    let checkOldPwd = (rule, value, callback) => {
      this.form.oldPwd = value.trim()
      if (this.form.oldPwd === '') {
        return callback(new Error('Please input the old password.'))
      }
      if (this.form.oldPwd.length < 8 || this.form.oldPwd.length > 16) {
        return callback(new Error('Password length is between 8-16 characters'))
      }
      if (!/^[0-9a-zA-Z]+$/.test(this.form.oldPwd)) {
        return callback(new Error('Passwords can only contain numbers and letters.'))
      }
      if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.form.oldPwd)) {
        return callback(new Error('Password must contain numbers and letters.'))
      }
      callback()
    }

    let checkNewPwd = (rule, value, callback) => {
      this.form.newPwd = value.trim()
      if (this.newPwd === '') {
        return callback(new Error('Please input the new password.'))
      }
      if (this.form.newPwd.length < 8 || this.form.newPwd.length > 16) {
        return callback(new Error('Your password should consist of 8-16 characters with only letters letters (a-z) and numbers (0-9)'))
      }
      if (!/^[0-9a-zA-Z]+$/.test(this.form.newPwd)) {
        return callback(new Error('Passwords can only contain numbers and letters.'))
      }
      if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.form.newPwd)) {
        return callback(new Error('Password must contain numbers and letters.'))
      }
      callback()
    }

    let checkConfirmPwd = (rule, value, callback) => {
      this.form.confirmPwd = value.trim()
      if (this.form.confirmPwd === '') {
        return callback(new Error('Please input the new password.'))
      }
      if (this.form.confirmPwd.length < 8 || this.form.confirmPwd.length > 16) {
        return callback(new Error('Your password should consist of 8-16 characters with only letters letters (a-z) and numbers (0-9)'))
      }
      if (!/^[0-9a-zA-Z]+$/.test(this.form.confirmPwd)) {
        return callback(new Error('Passwords can only contain numbers and letters.'))
      }
      if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.form.confirmPwd)) {
        return callback(new Error('Password must contain numbers and letters.'))
      }
      if (this.form.confirmPwd !== this.form.newPwd) {
        return callback(new Error('Two new passwords are inconsistent.'))
      }
      callback()
    }

    return {
      'form': {
        'oldPwd': '',
        'newPwd': '',
        'confirmPwd': ''
      },
      'rules': {
        'oldPwd': [
          {'validator': checkOldPwd, 'trigger': 'blur'}
        ],
        'newPwd': [
          {'validator': checkNewPwd, 'trigger': 'blur'}
        ],
        'confirmPwd': [
          {'validator': checkConfirmPwd, 'trigger': 'blur'}
        ]
      }
    }
  },
  props: {
    userInfo: {}
  },
  'methods': {
    submitForm (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: `${this.wxl_path}user/changePassword`,
            data: {
              originalPassword: this.$md5(_this.form.oldPwd).substr(8, 16),
              newPassword: this.$md5(_this.form.newPwd).substr(8, 16),
              pwdConfirm: this.$md5(_this.form.confirmPwd).substr(8, 16)
            }
          })
            .then(response => {
              const data = response.data
              if (data.success) {
                _this.$message.success('Success')
                this.$store.commit('signOut')
              } else {
                _this.$message.error(data.msg)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
