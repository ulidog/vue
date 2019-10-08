<style lang="scss" scoped>
.el-form{
  width: 90%;
  margin-left: 3%;
  // display: flex;
  // justify-content: space-between;
  // flex-direction: column;
}

.el-form-item{
  // margin-bottom: 0;
  margin-right: 2%;
  // flex-shrink: 1;
  // flex-basis: 28%;
  // display: flex;
  // justify-content: space-between;
}
/deep/ .el-input {
  width: 280px;
}
// .el-form-item.phone-num{
  // flex-grow: 1;
// }

// /deep/ .el-form-item__content{
  // flex-grow: 1;
  // flex-shrink: 1;
  // flex-basis: 0;
// }
.email-custom {
  /deep/ .el-form-item__content {
    display: flex;
  }
}
</style>

<template>
  <div class="part-container">
    <slot></slot>
    <div class="part-body">
      <el-form :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="First Name" prop="firstname" width="50%">
              <el-input v-model="form.firstname" placeholder="" spellcheck="false" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Last Name" prop="lastname" width="50%">
              <el-input v-model="form.lastname" placeholder="" spellcheck="false" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="Email" prop="email" class="email-custom">
              <el-input v-model="form.email" placeholder="" spellcheck="false" maxlength="50"></el-input>
              <!-- 邮箱选项 -->
              <div style="margin-left: 2.5rem;">
                <el-switch
                  style="display: flex; align-items: center; height: 40px;"
                  v-model="form.emailConceal"
                  active-value="1"
                  inactive-value="2"
                  active-text="Show your personal information"
                  inactive-text="Hide your personal information">
                </el-switch>
                <!-- <el-radio-group v-model="form.emailConceal" size="mini">
                  <el-radio :label="1" border style="margin-right:10px;">Show your email</el-radio>
                  <el-radio :label="2" border>Hide your email</el-radio>
                </el-radio-group> -->
              </div>
              <!-- 邮箱选项 -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="phone-num" label="Phone number" prop="phone">
              <el-input v-model="formatPhone" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    let validatePhone = (rule, value, callback) => {
      // console.log(value)
      if (!value.replace(/[^0-9]/ig, '')) {
        // callback(new Error('Please Use Format: (123) 123-1234'))
        callback()
      } else {
        var verify = value.replace(/[^0-9]/ig, '')
        if (!rule.regString.test(value) || verify.length < 10) {
          callback(new Error('Please Use Format: (123) 123-1234'))
        }
      }
      callback()
    }
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        emailConceal: '2'
      },
      rules: {
        firstname: [
          {required: true, message: 'Please enter name', trigger: ['blur', 'change']},
          {min: 1, max: 50, message: 'The length of the name is between 1 and 50 words.', trigger: ['blur', 'change']}
        ],
        lastname: [
          {required: true, message: 'Please enter name', trigger: ['blur', 'change']},
          {min: 1, max: 50, message: 'The length of the name is between 1 and 50 words.', trigger: ['blur', 'change']}
        ],
        email: [
          {required: true, message: 'Please enter email', trigger: ['blur', 'change']},
          {min: 7, max: 50, message: 'The length of the mailbox is between 7 and 50 words.', trigger: ['blur', 'change']}
        ],
        phone: [
          // {type: 'number', message: 'Please enter the number'}
          // {min: 10, max: 18, message: 'The length of the mailbox is between 8 and 18 words.', trigger: ['blur', 'change']}
          { validator: validatePhone, regString: /[(0-9]{3}[)\s0-9]{3}[-0-9]{4}/, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  props: {
    isSubmitNow: false,
    editForm: {
      type: Object,
      default: null
    }
  },
  watch: {
    isSubmitNow () {
      if (this.isSubmitNow) this.submit()
    },
    GlobalUserInfo: {
      handler (_new, _old) {
        console.log('开始')
        console.log(_new)
        Object.assign(this.form, _new)
      },
      deep: true,
      immediate: true
    },
    editForm: {
      handler (_new, _old) {
        // console.log('--------------------------------->')
        // console.log(_new)
        if (Object.keys(_new).length !== 0) {
          this.EchoChange(_new)
        }
      },
      deep: true
      // immediate: true
    }
  },
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    }),
    formatPhone: {
      get: function () {
        // console.log(this.dialogForm.phone)
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
  // created () {
  // },
  methods: {
    // 回显
    EchoChange (_info) {
      // contactName: `${this.form.firstname} ${this.form.lastname}`,
      // contactPhone: this.form.phone.replace(/[^0-9]/ig, ''),
      // contactEmail: this.form.email,
      // emailConceal: this.form.emailConceal
      this.form.firstname = _info.contactName.split(' ')[0]
      this.form.lastname = _info.contactName.split(' ')[1]
      this.form.phone = `(${_info.contactPhone.substring(0, 3)}) ${_info.contactPhone.substring(3, 6)}-${_info.contactPhone.substring(6, 11)}`
      this.form.email = _info.contactEmail
      this.form.emailConceal = _info.emailConceal
    },
    validateForm () {
      if (!this.form.emailConceal) {
        return {flag: false, msg: 'Please select the mailbox status.'}
      }
      if (this.form.firstname) {
        this.form.firstname = this.form.firstname.trim()
      }
      if (this.form.lastname) {
        this.form.lastname = this.form.lastname.trim()
      }
      if (this.form.email) {
        this.form.email = this.form.email.trim()
      }
      if (!this.form.firstname) return {flag: false, msg: 'Please enter your firstname.'}
      if (this.form.firstname.length > 50) return {flag: false, msg: 'The length of the firstname cannot be more than 50 letters.'}
      if (/^[a-z.\s]{1, 50}$/gi.test(this.form.firstname)) return {flag: false, msg: 'Names can only contain letters, dots, and blanks.'}

      if (!this.form.lastname) return {flag: false, msg: 'Please enter your lastname.'}
      if (this.form.lastname.length > 50) return {flag: false, msg: 'The length of the lastname cannot be more than 50 letters.'}
      if (/^[a-z.\s]{1, 50}$/gi.test(this.form.lastname)) return {flag: false, msg: 'Names can only contain letters, dots, and blanks.'}

      if (!this.form.email) return {flag: false, msg: 'Please enter email address.'}
      if (this.form.email.length > 50) return {flag: false, msg: 'The length of the mailbox cannot be more than 50 words.'}
      if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.(.){2,}$/.test(this.form.email)) return {flag: false, msg: 'Please enter your email address in a correct format.'}
      // if (this.form.emailConceal !== 1 || this.form.emailConceal !== 2) return {flag: false, msg: 'Please select the mailbox status.'}
      // this.form.phone = this.form.phone.trim()
      // if (this.form.phone) {
      //   if (this.form.phone.length > 18) return {flag: false, msg: 'The length of the phone number cannot be more than 18 digits.'}
      // }
      // if (this.form.phone) {
      //   if (this.form.phone.length < 8) return {flag: false, msg: 'The length of the telephone number must not be less than 8 digits.'}
      // }

      return {flag: true}
    },
    // oninput (val) {
    //   if (val) {
    //     let _val = val.replace(/[^0-9]/ig, '')
    //     if (_val !== '') {
    //       this.form.phone = '(' + _val.substr(0, 3) + ')' + _val.substr(3, 3) + '-' + _val.substr(6)
    //     }
    //   }
    // },
    submit () {
      let result = this.validateForm()
      this.$emit('collectData', result.flag ? Object.assign(result, {
        contactName: `${this.form.firstname} ${this.form.lastname}`,
        contactPhone: this.form.phone.replace(/[^0-9]/ig, ''),
        contactEmail: this.form.email,
        emailConceal: this.form.emailConceal
      }) : result)
    }
  }
}
</script>
