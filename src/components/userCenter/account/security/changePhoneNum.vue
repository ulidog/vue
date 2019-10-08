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
    <h6 class="title">
      <span class="title-txt">Change cellphone number</span>
      <span class="title-tip">Through the original mobile phone number for verification code, you can change the binding mobile phone number.</span>
    </h6>
    <el-form :model="form" :rules="rules" ref="form" label-width="240px">
      <!-- <el-form-item label="Old cellphone number" prop="oldphone">
        <el-input type="text" v-model="formatoldPhone" autocomplete="off">
          <el-select v-model="form.phoneAreaCodeIds" slot="prepend" placeholder="Area" style="width: 150px">
            <el-option :label="`+${item.areaCode} ${item.en}`" :value="item.id" v-for="item in phoneAreaCodeArray" :key="item.id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="Verification code" prop="originalValidateCode">
        <el-col :span="17" style="paddingRight:1em;">
          <el-input type="text" v-model="form.originalValidateCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button v-if="!isReferCode" class="btn-get-code" @click="getCode(false)" :disabled="!(form.phoneAreaCodeIds && form.oldphone)">Get code</el-button>
          <span v-else class="btn-get-codes">{{timer}} s</span>
        </el-col>
      </el-form-item> -->
      <el-form-item label="New cellphone number" prop="phone">
        <el-input type="text" v-model="formatPhone" autocomplete="off">
          <el-select v-model="form.phoneAreaCodeId" slot="prepend" placeholder="Area" style="width: 150px">
            <el-option :label="`+${item.areaCode} ${item.en}`" :value="item.id" v-for="item in phoneAreaCodeArray" :key="item.id"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="Verification code" prop="newValidateCode">
        <el-col :span="17" style="paddingRight:1em;">
          <el-input type="text" v-model="form.newValidateCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button v-if="!isReferCodes" class="btn-get-code" @click="getCode(true)" :disabled="!(form.phoneAreaCodeId && form.phone)">Get code</el-button>
          <span v-else class="btn-get-codes">{{timers}} s</span>
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
    var phoneNum = (rule, value, callback) => {
      const num = value.toString().replace(/((?![0-9]).)+/g, '').substring(0, 10).length
      if (num > 12 || num < 10) {
        callback(new Error('Please enter the correct phone number'))
      } else {
        callback()
      }
    }
    var code = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter verification code.'))
      } else {
        callback()
      }
    }
    return {
      'form': {
        // 'oldphone': '',
        // 'originalValidateCode': '',
        'phoneAreaCodeId': 344,
        'phone': '',
        'newValidateCode': '',
        'origin': 1
      },
      'rules': {
        'oldphone': [
          {'validator': phoneNum, 'trigger': 'blur'}
        ],
        'originalValidateCode': [
          {'validator': code, 'trigger': 'blur'}
        ],
        'phone': [
          {'validator': phoneNum, 'trigger': 'blur'}
        ],
        'newValidateCode': [
          {'validator': code, 'trigger': 'blur'}
        ]
      },
      'isReferCode': false,
      'isReferCodes': false,
      'timer': 120,
      'timers': 120,
      'timerFlag': null,
      'timerFlags': null,
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
    },
    formatoldPhone: {
      get: function () {
        // console.log(this.form.phone)
        if (!this.form.oldphone) return ''
        // console.log(this.form.oldphone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.form.oldphone.toString().length
        const str = this.form.oldphone.toString().replace(/((?![0-9]).)+/g, '')
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
        this.form.oldphone = value
      }
    }
  },
  'methods': {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let cloneFrom = Object.assign({}, this.form)
          cloneFrom.phone = cloneFrom.phone.toString().replace(/((?![0-9]).)+/g, '')
          // cloneFrom.oldphone = cloneFrom.oldphone.toString().replace(/((?![0-9]).)+/g, '')
          this.$axios({
            url: `${this.wxl_path}user/phoneChangeBinding`,
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
    getCode (_type) {
      let CODE_URL = [`${this.wxl_path}user/phoneChangeValidateCode`, `${this.wxl_path}user/phoneBindingValidateCode`]
      const cloneFrom = Object.assign({}, this.form)
      let from = {}
      if (!_type) {
        CODE_URL = CODE_URL[0]
        from['phone'] = cloneFrom.oldphone.toString().replace(/((?![0-9]).)+/g, '')
        from['origin'] = 1
        from['phoneAreaCodeId'] = cloneFrom.phoneAreaCodeIds
      } else {
        CODE_URL = CODE_URL[1]
        from['phone'] = cloneFrom.phone.toString().replace(/((?![0-9]).)+/g, '')
        from['origin'] = 1
        from['phoneAreaCodeId'] = cloneFrom.phoneAreaCodeId
      }
      this.$axios({
        url: CODE_URL,
        method: 'get',
        params: from
      })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            this.openTimerFlag(_type)
          }
        })
    },
    openTimerFlag (_type) {
      if (!_type) {
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
      } else {
        if (this.timerFlags) {
          clearInterval(this.timerFlags)
          this.timers = 120
        }
        this.isReferCodes = true
        const _this = this
        this.timerFlags = setInterval(() => {
          _this.timers--
          if (_this.timers === 0) {
            clearInterval(_this.timerFlags)
            _this.isReferCodes = false
          }
        }, 1000)
      }
    }
  }
}
</script>
