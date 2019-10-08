<style lang="scss" scoped>
.title{
  margin-top: 1em;
  margin-bottom: 1.5em;
  font-size: 1.2em;
  display: flex;
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
.btn-get-codes {
  height: 40px;
  border: 1px solid #409EFF;
  border-radius: 0.4em;
  color: #409EFF;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div>
    <h6 class="title">Bind mobile phone number</h6>
    <el-form :model="form" :rules="rules" ref="form" label-width="200px">
      <el-form-item label="Cellphone number" prop="phone">
        <el-input type="text" v-model="formatPhone" autocomplete="off">
          <el-select v-model="form.phoneAreaCodeId" slot="prepend" placeholder="Area" style="width: 150px">
            <el-option :label="`+${item.areaCode} ${item.en}`" :value="item.id" v-for="item in phoneAreaCodeArray" :key="item.id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="Verification code" prop="validateCode">
        <el-col :span="17" style="paddingRight:2em;">
          <el-input type="text" v-model="form.validateCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button v-if="!isReferCode" class="btn-get-code" @click="getCode" :disabled="!(form.phoneAreaCodeId && form.phone)">Get code</el-button>
          <span v-else class="btn-get-codes">{{timer}} s</span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">Bind</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var phoneValidate = (rule, value, callback) => {
      const num = value.toString().replace(/((?![0-9]).)+/g, '').substring(0, 10).length
      if (num > 12 || num < 10) {
        callback(new Error('Please enter the correct phone number'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value.length < 4 && value.length > 6) {
        callback(new Error('Please enter verification code.'))
      } else {
        callback()
      }
    }
    return {
      'form': {
        'phone': '',
        'validateCode': '',
        'phoneAreaCodeId': '',
        'origin': 1
      },
      'rules': {
        'phone': [
          {'validator': phoneValidate, 'trigger': 'blur'}
        ],
        'validateCode': [
          {'validator': validateCode, 'trigger': 'blur'}
        ]
      },
      'isReferCode': false,
      'timer': 120,
      'timerFlag': null,
      'phoneAreaCodeArray': []
    }
  },
  props: {
    userInfo: {}
  },
  created () {
    this.phoneAllCode()
  },
  computed: {
    formatPhone: {
      get: function () {
        // console.log(this.form.phone)
        if (!this.form.phone) return ''
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.form.phone.toString().length
        const str = this.form.phone.toString().replace(/((?![0-9]).)+/g, '')
        // str.substring(0, 3)
        // str.substring(3, 6)
        // str.substring(6)
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.form.phone = value
      }
    }
  },
  'methods': {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let cloneFrom = Object.assign({}, this.form)
          cloneFrom.phone = cloneFrom.phone.toString().replace(/((?![0-9]).)+/g, '')
          // alert('submit!');
          this.$axios({
            url: `${this.wxl_path}user/phoneBinding`,
            method: 'POST',
            params: cloneFrom
          })
            .then(res => {
              if (res.data.success) {
                this.$emit('setOperateName', 'index')
                this.$message.success(res.data.msg)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    phoneAllCode (e) {
      this.$axios({
        url: `${this.wxl_path}phoneAreaCode/find_all_phone_area_code`,
        method: 'post'
      })
        .then(res => {
          if (res.data.success) {
            this.phoneAreaCodeArray = res.data.data
          }
        })
    },
    getCode () {
      let cloneFrom = Object.assign({}, this.form)
      cloneFrom.phone = cloneFrom.phone.toString().replace(/((?![0-9]).)+/g, '')
      this.$axios({
        url: `${this.wxl_path}user/phoneBindingValidateCode`,
        method: 'get',
        params: cloneFrom
      })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            this.openTimerFlag()
          }
        })
    },
    openTimerFlag () {
      if (this.timerFlag) {
        clearInterval(this.timerFlag)
        this.timer = 120
      }
      this.isReferCode = true
      const _this = this
      this.timerFlag = setInterval(() => {
        _this.timer--
        if (_this.timer === 0) {
          clearInterval(_this.timerFlag)
          _this.isReferCode = false
        }
      }, 1000)
    }
  }
}
</script>
