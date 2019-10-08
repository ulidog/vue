<template>
  <section class="forget-password-component">
    <section class="forget-container">
      <header class="header-title-tools">
        <img src="/static/img/common/header/logo.png" class="logo">
        <h4>Forgot Password?</h4>
        <i class="position-absolute el-icon-circle-close" @click="closeWindowForgot"></i>
      </header>
      <section class="forgot-type">
        <el-radio-group class="forgot-type-group" v-model="forgotType">
          <el-radio class="forgot-type-group-item" :label="true">Email</el-radio>
          <el-radio class="forgot-type-group-item" :label="false">Phone Number</el-radio>
        </el-radio-group>
      </section>
      <section class="forgot-form-box">
        <el-form :model="forgotForm" status-icon :rules="rules" ref="forgotForm" class="forgot-form-rule">
          <!-- email or phone -->
          <el-row :gutter="15">
            <!-- email -->
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="forgotType">
              <el-form-item prop="email">
                <el-input type="text" v-model="forgotForm.email" autocomplete="off" placeholder="Enter your email address ">
                  <i slot="prefix" class="iconfont icon-emailmini"></i>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- phone -->
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-else>
              <el-form-item prop="phone" class="phone-code-dropdown" placement="top-start">
                <el-dropdown class="selct-code-box" trigger="click" @command="selectPhoneCodeChange">
                  <span class="el-dropdown-link">{{currentAreaCodeObject.locale}}+{{currentAreaCodeObject.areaCode}}<i class="el-icon-arrow-right"></i></span>
                  <el-dropdown-menu slot="dropdown" class="area-box-container">
                    <el-dropdown-item :command="item" v-for="item in phoneAreaCodeArray" :key="item.id">+{{item.areaCode}} {{item.en}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-input type="text" v-model.number="forgotForm.phone" autocomplete="off" placeholder="Your Phone number">
                  <i slot="prefix" class="iconfont icon-phone2"></i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- prop="validateCode" -->
              <el-form-item class="customer-get-code">
                <el-input type="text" v-model="forgotForm.validateCode" autocomplete="off" placeholder="Enter code"></el-input>
                <section class="email-getcode nocode">
                  <span v-if="isCode" @click="getCodeChange">Get Code</span>
                  <span v-else>{{ countdown }}s</span>
                </section>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 密码 -->
          <el-form-item prop="newPassword">
            <!-- show-password -->
            <el-input ref="password" type="password" v-model="forgotForm.newPassword" autocomplete="off" placeholder="Please use 8-16 charcters with a mix of numbers and letters.">
              <i slot="prefix" class="iconfont icon-lock"></i>
              <i slot="suffix" :class="['iconfont', isOpenView ? 'icon-open' : 'icon-colse']" @mousedown.stop="openViewPasswordChange('password')" @mouseup="closeViewPasswordChange('password')"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwdConfirm">
            <!-- show-password -->
            <el-input ref="checkpassword" type="password" v-model="forgotForm.pwdConfirm" autocomplete="off" placeholder="Please confirm your password">
              <i slot="prefix" class="iconfont icon-lock"></i>
              <i slot="suffix" :class="['iconfont', isOpenCheckView ? 'icon-open' : 'icon-colse']" @mousedown.stop="openViewPasswordChange('checkpassword')" @mouseup="closeViewPasswordChange('checkpassword')"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="isConfirm">
            <el-checkbox class="terms" v-model="forgotForm.isConfirm">
              I have read and agreed to
              <a class="themeColor"
                href="https://www.ebuyhouse.com/blog/terms-of-use/"
                target="view_window"
                style="color: #1281fc">&lt;Terms of Use&gt;</a>
                and
              <a class="themeColor"
                href="https://www.ebuyhouse.com/blog/privacy-policy/"
                target="view_window"
                style="color: #1281fc"
              >&lt;Privacy Policy&gt;</a>at Ebuyhouse. </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="themeButton" type="primary" @click="submitForm('forgotForm')" :loading="submitLoading">Reset Password</el-button>
          </el-form-item>
        </el-form>
      </section>
    </section>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 类型
      forgotType: true,
      // 提交的表单
      forgotForm: {
        email: null,
        phone: null,
        validateCode: null,
        newPassword: null,
        pwdConfirm: null,
        isConfirm: false
      },
      // 正则校验
      rules: {
        email: [
          {
            validator: (rule, value, callback) => {
              if (value === '' || !value) {
                this.isOKCode.email = false
                callback(new Error('E-mail can not be empty.'))
                return
              }
              if (!/^[A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(value)) {
                this.isOKCode.email = false
                callback(new Error('Please enter the correct mailbox format.'))
                return
              }
              this.isOKCode.email = true
              callback()
            },
            trigger: 'change'
          }
        ],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (value === '' || !value) {
                this.isOKCode.phone = false
                callback(new Error('Phone can not be empty.'))
                return
              }
              if (!/^\d{10,12}$/g.test(value)) {
                this.isOKCode.phone = false
                callback(new Error('please enter a valid phone number.'))
                return
              }
              this.isOKCode.phone = true
              callback()
            },
            trigger: 'change'
          }
        ],
        validateCode: [
          {
            validator: async (rule, value, callback) => {
              if (this.isOKCode.dbcode) {
                callback()
                return
              }
              // console.log(!value)
              if (value === '' || !value) {
                // this.isOKCode.phone = false
                callback(new Error('Please enter your verification code.'))
                return
              }
              if (!this.isOKCode.code) {
                callback(new Error('Please click to get the verification code first.'))
                return
              }
              let res = await this.checkCode(value)
              // console.log('---------->')
              // console.log(res)
              if (!res.success) {
                callback(new Error(res.msg))
                return
              }
              // this.checkCode(value)
              // if (!/^\d{10,12}$/g.test(value)) {
              //   this.isOKCode.phone = false
              //   callback(new Error('please enter a valid phone number.'))
              // }
              // this.isOKCode.phone = true
              this.isOKCode.dbcode = true
              callback()
            },
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === '' || !value) {
                callback(new Error('Please enter your password.'))
                return
              }
              if (!/^[a-zA-Z0-9]{8,16}$/g.test(value)) {
                callback(new Error('Sorry. The set password can only be numbers or letters.'))
                return
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        pwdConfirm: [
          {
            validator: (rule, value, callback) => {
              if (value === '' || !value) {
                callback(new Error('Please confirm your password.'))
                return
              }
              if (this.forgotForm.newPassword !== value) {
                callback(new Error('Inconsistent password entered twice.'))
                return
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        isConfirm: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('Please read and agree to the privacy policy.'))
                return
              }
              callback()
            },
            trigger: 'change'
          }
        ]
      },
      // 区号数组
      phoneAreaCodeArray: [],
      // 选中后的区号对象 默认
      currentAreaCodeObject: {
        areaCode: '1',
        createTime: 1544404208000,
        en: 'United States of America',
        id: 344,
        locale: 'US',
        zh: '美国'
      },
      // 是否可以获取code
      isCode: true,
      // 倒计时 默认120s
      countdown: 120,
      // 定时器
      timer: null,
      isOKCode: {
        phone: false,
        email: false,
        code: false,
        dbcode: false
      },
      isOpenView: false,
      isOpenCheckView: false,
      submitLoading: false
    }
  },
  methods: {
    ...mapMutations({
      UPDATA_WINDOW_FORGOT_STATUS: 'UPDATA_WINDOW_FORGOT_STATUS',
      UPDATA_SHOW_CLAUSE: 'UPDATA_SHOW_CLAUSE'
    }),
    async submitForm (_name) {
      const _this = this
      _this.$refs[_name].validate((valid, obj) => {
        // console.log(valid)
        if (valid) {
          // if () {}
          let cloneForm = Object.assign({}, _this.forgotForm)
          cloneForm['newPassword'] = this.$md5(_this.forgotForm.newPassword).substr(8, 16)
          cloneForm['pwdConfirm'] = this.$md5(_this.forgotForm.newPassword).substr(8, 16)
          if (_this.forgotType) {
            delete cloneForm.phone
          } else {
            delete cloneForm.email
          }
          _this.submitLoading = true

          _this.checkCode(cloneForm.validateCode, function (_resparmams) {
            if (!_resparmams.success) {
              _this.submitLoading = false
              _this.$message.info(_resparmams.msg)
              return
            }
            _this.$axios({
              url: `${_this.wxl_path}user/emailRetrievePwd`,
              method: 'POST',
              data: cloneForm
            }).then(res => {
              _this.$message.success('Reset password successfully!')
              _this.submitLoading = false
              _this.closeWindowForgot()
            }).catch(err => {
              _this.$message.info(err)
              _this.submitLoading = false
            })
          })
        } else {
          console.log(obj)
        }
      })
    },
    // 选择区号回调
    selectPhoneCodeChange (info) {
      // console.log(info)
      this.currentAreaCodeObject = info
    },
    // 区号获取
    fetchAreaCode () {
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
    // 获取验证码
    getCodeChange () {
      const _this = this
      let typeForm = {}
      let REQUEST_URL
      // _this.forgotType ? (typeForm['email'] = _this.forgotForm.email) : (typeForm['phone'] = _this.forgotForm.phone)
      // 判断选择的是手机还是邮箱
      if (_this.forgotType) {
        REQUEST_URL = `${_this.wxl_path}user/emailRetrievePwdValidateCode`
        typeForm['email'] = _this.forgotForm.email
      } else {
        REQUEST_URL = `${_this.wxl_path}user/phoneRegisteredValidateCode`
        typeForm['phone'] = _this.forgotForm.phone
        typeForm['phoneAreaCodeId'] = _this.currentAreaCodeObject.id
        typeForm['type'] = 2
      }
      let timerOut = 120
      _this.$axios({
        method: 'GET',
        url: REQUEST_URL,
        params: typeForm
      })
        .then(response => {
          const data = response.data
          _this.isOKCode.code = true
          _this.isCode = false
          if (data.success) {
            _this.$message.success('Send verification code successfully, please check your verification code.')
            _this.timer = setInterval(() => {
              _this.countdown = timerOut--
              if (_this.countdown === 0) {
                clearInterval(_this.timer)
                _this.isCode = true
              }
            }, 1000)
          }
        })
    },
    // 验证验证码
    async checkCode (_code, func) {
      let typeForm = {
        validateCode: _code
      }
      this.forgotType ? (typeForm['email'] = this.forgotForm.email) : (typeForm['phone'] = this.forgotForm.phone)
      let res = await this.$axios({
        method: 'GET',
        url: `${this.wxl_path}user/retrievePwdValidateCode`,
        params: typeForm
      })
      // console.log(res)
      // return res.data.success
      func(res.data)
    },
    // 密码查看
    openViewPasswordChange (_domname) {
      // this.$refs[_domname]
      // console.log(this.$refs)
      this.$refs[_domname].$el.getElementsByTagName('input')[0].type = 'text'
      console.log(_domname)
      if (_domname === 'password') {
        this.isOpenView = !this.isOpenView
      } else {
        this.isOpenCheckView = !this.isOpenCheckView
      }
      // this.$refs[_domname].$el.getElementsByTagName('input')[0].setAttribute('type', 'text')
    },
    closeViewPasswordChange (_domname) {
      this.$refs[_domname].$el.getElementsByTagName('input')[0].type = 'password'
      if (_domname === 'password') {
        this.isOpenView = !this.isOpenView
      } else {
        this.isOpenCheckView = !this.isOpenCheckView
      }
    },
    // 关闭
    closeWindowForgot () {
      this.UPDATA_WINDOW_FORGOT_STATUS(false)
    },
    openTerms () {
      this.UPDATA_SHOW_CLAUSE(true)
    }
  },
  mounted () {
    window.document.body.style.overflowY = 'hidden'
    this.fetchAreaCode()
  },
  destroyed () {
    window.document.body.style.overflowY = 'auto'
  }
}
</script>

<style lang="sass" scoped>
  @media screen and (min-width: 900px)
    .forget-password-component
      .forget-container
        width: 900px
      .forgot-form-rule
          width: 705px
  @media screen and (max-width: 900px)
    .forget-password-component
      .forget-container
        width: 95%
      .forgot-form-box
        .forgot-form-rule
          width: 705px
  @media screen and (max-width: 765px)
    .forget-password-component
      .forget-container
      .forgot-form-box
        .forgot-form-rule
          width: 90%
</style>

<style lang="sass">
  .el-dropdown-menu.el-popper.area-box-container
    max-width: 215px
    max-height: 200px
    overflow-y: scroll
    transform: translateX(140px)
    &.isMinClass
      height: 270px
      transition: all .5s ease
    &::-webkit-scrollbar
      width: 8px
      height: 4px
    &::-webkit-scrollbar-thumb
      border-radius: 0px
      -webkit-box-shadow: inset 0 0 5px #1281FC
      background: #1281FC
    &::-webkit-scrollbar-track
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
      border-radius: 0
      background: trnasparent
</style>

<style lang="sass" scoped>
  .forget-password-component
    width: 100vw
    height: 100vh
    background: rgba(0, 0, 0, 0.8)
    position: fixed
    top: 0
    left: 0
    z-index: 999
    display: flex
    justify-content: center
    align-items: center
    .forget-container
      height: auto
      background-color: #fff
      border-radius: 10px
      display: flex
      flex-direction: column
      // 标题
      .header-title-tools
        padding: 3rem 0 2rem
        display: flex
        justify-content: center
        width: 100%
        flex: 1
        position: relative
        >img
          position: absolute
          left: 4.8%
          top: 29%
        >h4
          font-size: 24px
          color: #666666
          font-weight: bold
        .position-absolute
          position: absolute
          right: 2rem
          top: 2rem
          font-size: 30px
          color: #999999
          cursor: pointer
      // 类型
      .forgot-type
        display: flex
        justify-content: center
        margin: 0.5rem 0
        .forgot-type-group
          display: flex
          .forgot-type-group-item
            display: flex
            align-items: center
            /deep/ .el-radio__label
              font-size: 18px
              color: #666666
      // 表单内容
      .forgot-form-box
        display: flex
        justify-content: center
        padding-bottom: 30px
        .forgot-form-rule
          margin: .8rem 0
          .themeColor
            color: #1281FC
            cursor: pointer
          // 设置默认背景色
          /deep/ .el-input
            .el-input__inner
              background-color: #F3F3F3
              border: 1px solid #F3F3F3
              transition: all 0.5s ease
              &:focus
                border: 1px solid #1281FC
                transition: all 0.5s ease
              &::-webkit-input-placeholder
                color: #808080
            .el-input__prefix
              margin-left: 5px
              >i
                color: #808080
            .el-input__suffix
              margin-right: 5px
              cursor: pointer
              i
                color: #808080
          /deep/ .el-form-item.el-form-item--feedback.is-error
            .el-input__inner
              border-color: #F56C6C
          /deep/ .el-form-item.el-form-item--feedback.is-success
            .el-input__inner
              border-color: #67c23a
            .el-input__suffix i.el-input__icon.el-input__validateIcon.el-icon-circle-check
              color: #67c23a
          .customer-get-code
            /deep/ .el-form-item__content
              display: flex
              position: relative
              .el-input
                flex: 1
                .el-input__inner
                  padding-right: 80px
              .email-getcode
                position: absolute
                right: 0
                width: 80px
                display: flex
                align-items: center
                justify-content: center
                height: 100%
                cursor: pointer
                &.nocode
                  >span
                    color: #1281FC
                &.code
                  >span
                    color: #999
          .phone-code-dropdown
            position: relative
            /deep/ .el-form-item__content
              position: relative
              display: flex
              .selct-code-box
                position: absolute
                z-index: 9
                min-width: 78px
                padding-left: 35px
                height: 100%
                cursor: pointer
                outline: none
                left: 0
                >span
                  color: #444444
                  font-size: 12px
              .el-input
                .el-input__inner
                  padding-left: 95px
                  outline: none
          /deep/ .el-form-item
            .el-form-item__content
              display: flex
              justify-content: flex-start
              .terms
                display: flex
                .el-checkbox__label
                  font-size: 12px
                  display: flex
                  flex-wrap: wrap
              .themeButton
                width: 95%
                height: 32px
                border-radius: 16px
                padding: 0
                >span
                  font-size: 14px
                  color: #fff
</style>
