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

/deep/
.el-form-item__label,
.el-input__inner{
  font-size: 1.2em;
  color: #909090;
}

/deep/ .el-input__inner{
  font-size: 1.1em;
}

/deep/ .el-form-item__error{
  font-size: 1em;
}

.el-button{
  width: 100%;
  font-size: 1.3em;
}

.el-col .el-button{
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-get-code{
  height: 40px;
  border: 1px solid #409EFF;
  border-radius: 0.4em;
  color: #409EFF;
  font-size: 1.2em;
}
</style>

<template>
  <div>
    <h6 class="title">
      <span class="title-txt">Change email</span>
      <span class="title-tip">Enter the authentication code, and you can change the linked email.</span>
    </h6>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="Current email" prop="oldEmail">
        <el-input type="text" v-model="form.oldEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Enter code" prop="oldCode">
        <el-col :span="17" style="paddingRight:1em;">
          <el-input type="text" v-model="form.oldCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button class="btn-get-code" @click="oldCodesend(form.oldEmail)">Get code</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="New email" prop="newEmail">
        <el-input type="text" v-model="form.newEmail" autocomplete="off" placeholder="Enter a new email address"></el-input>
      </el-form-item>
      <el-form-item label="Enter code" prop="newCode">
        <el-col :span="17" style="paddingRight:1em;">
          <el-input type="text" v-model="form.newCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button class="btn-get-code" @click="oldnewCodesend(form.newEmail)">Get code</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter email.'))
      } else {
        callback()
      }
    }
    var checkEmail1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter email.'))
      } else {
        if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.(com)$/.test(this.form.newEmail)) {
          callback(new Error('Error in mailbox format.'))
        } else {
          callback()
        }
      }
    }
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter verification code.'))
      } else {
        this.$axios({
          'method': 'get',
          'url': `${this.wxl_path}user/emailChangeValidate`,
          'params': {
            'validateCode': this.form.oldCode
          }
        })
          .then(response => {
            if (response.data.success) {
              callback()
            } else {
              callback(new Error('Verification code error.'))
            }
          })
          .catch(error => {
            // alert(error)
            if (error) {}
          })
      }
    }
    var checkCode1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter verification code.'))
      } else {
        callback()
      }
    }
    return {
      'form': {
        'oldEmail': localStorage.getItem('e'),
        'oldCode': '',
        'newEmail': '',
        'newCode': ''
      },
      'rules': {
        'oldEmail': [
          {'validator': checkEmail, 'trigger': 'blur'}
        ],
        'oldCode': [
          {'validator': checkCode, 'trigger': 'blur'}
        ],
        'newEmail': [
          {'validator': checkEmail1, 'trigger': 'blur'}
        ],
        'newCode': [
          {'validator': checkCode1, 'trigger': 'blur'}
        ]
      }
    }
  },
  props: {
    userInfo: {}
  },
  'methods': {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            'method': 'post',
            'url': `${this.wxl_path}user/emailBindingValidate`,
            'data': {
              'email': this.form.newEmail,
              'originalValidateCode': this.form.oldCode,
              'newValidateCode': this.form.newCode
            }
          })
            .then(response => {
              if (response.data.success) {
                this.$message({
                  message: 'success',
                  type: 'success'
                })
                this.$emit('setOperateName', 'index')
              } else {
                this.$message.error(response.data.msg)
              }
            })
            .catch(error => {
              // alert(error)
              if (error) {}
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    oldCodesend (oldEmailName) {
      this.$axios({
        'method': 'get',
        'url': `${this.wxl_path}user/emailChangeValidateCode`,
        'params': {
          'email': oldEmailName
        }
      })
        .then(response => {
          if (response.data.success) {
            this.$message({
              message: 'send successfully',
              type: 'success'
            })
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(error => {
          // alert(error)
          if (error) {}
        })
    },
    oldnewCodesend (oldEmailName) {
      this.$axios({
        'method': 'get',
        'url': `${this.wxl_path}user/emailBindingValidateCode`,
        'params': {
          'email': oldEmailName
        }
      })
        .then(response => {
          if (response.data.success) {
            this.$message({
              message: 'send successfully',
              type: 'success'
            })
          } else {
            this.$message.error(response.data.msg)
          }
        })
        .catch(error => {
          // alert(error)
          if (error) {}
        })
    }
  }
}
</script>
