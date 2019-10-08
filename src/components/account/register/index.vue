<style lang="scss" scoped>
.register-layer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-dialog {
  width: 100%;
  padding-bottom: 2em;
  padding-top: 30px;
  background-color: #ffffff;
  border-radius: 10px;
}

.dialog-brow {
  text-align: center;
  position: relative;
  overflow: hidden;
}

.logo {
//   width: 16%;
//   position: absolute;
//   left: 4%;
//   top: 50%;
//   transform: translateY(-50%);
}

.title {
  width: 100%;
  text-align: center;
  line-height: 3em;
  font-size: 24px;
}

.dialog-register-type {
  text-align: center;
  /deep/ .ig-type {
    .el-radio__inner {
      width: 18px;
      height: 18px;
      &:after {
        width: 0;
        height: 0;
      }
    }
    .el-radio__label {
      font-size: 18px;
      color: #444;
    }
  }
}

.dialog-body {
  margin-top: 2em;
}

.row {
  width: 78%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.5em;
  position: relative;
}

.row input {
  width: 100%;
  height: 35px;
  padding-left: 8%;
  padding-right: 6%;
  background-repeat: no-repeat;
  background-size: auto 60%;
  background-position: 1% 50%;
  border: 1px solid #9e9e9e;
  border-radius: 0.4em;
//   font-size: 1em;
  color: #444444;
}

.row input:focus {
  border-color: #1281fc;
}

.row-username input {
  background-image: url(/static/img/common/account/username.png);
}

.row-userphone{
    position: relative
}

.row-userphone .code{
    position: absolute;
    top: 0;
    right: 3px;
    width: 66px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #1281FC;
    cursor: pointer;
}

.row-userphone .phoneNum {
  background-image: url(/static/img/account/phoneMark.png);
  background-repeat: no-repeat;
  width: 51%;
  position: relative;
  height: 32px;
  border: 1px solid #9e9e9e;
  border-radius: 0.4em;
  vertical-align: bottom;
  box-shadow: none;
  .mmp{
    position: absolute;
    left: 6px;
    top: 12px;
    z-index: 999;
  }
}
.row-userphone .msg {
  padding: 0 66px 0 6px;
}

.row-firstPwd input,
.row-repeatPwd input {
  background-image: url(/static/img/common/account/pwd.png);
}

.row button {
  width: 4%;
  height: 3em;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: 50% 15px;
  background-image: url(/static/img/common/account/hide_pwd.png);
  position: absolute;
  top: 0;
  right: 1%;
}

.row button:active {
  background-position: 50% 12px;
  background-image: url(/static/img/common/account/show_pwd.png);
}

.input-tip {
  font-size: 0.8em;
  height: 1.2em;
  color: rgb(219, 19, 19);
}

.about-agreement {
  width: 78%;
  margin-left: auto;
  margin-right: auto;
//   margin-bottom: 2em;
}

/deep/ .el-checkbox__inner {
  border-color: #999999;
}

.agreement-link {
  color: #1281fc;
  cursor: pointer;
}

.agreement-link:hover {
  text-decoration: underline;
}

.btn-register,
.btn-signIn {
  display: block;
  width: 78%;
  height: 32px;
  border: 2px solid #1281fc;
  border-radius: 16px;
  margin-bottom: 0.8em;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
}

.dialog-brow .el-button {
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
}

.btn-register:hover,
.btn-signIn:hover {
  box-shadow: 0 0 6px #1281fc;
}

.btn-register:active,
.btn-signIn:active {
  transform: matrix(1.01, 0, 0, 1.01, 0, 0);
}

.btn-register {
  background-color: #1281fc;
  color: #ffffff;
}

.btn-register.disabled {
  border-color: #999999;
  background-color: #999999;
}

.btn-signIn {
  color: #1281fc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}
</style>

<template>
  <div
    class="register-layer"
    @click="onClick"
    @mousewheel="onMousewheel"
    @mouseup="switchInputType($event, ['firstPwdInputType', 'repeatPwdInputType'], 'password')"
  >
    <div class="register-dialog">
      <div class="dialog-brow">
        <img class="logo" src="/static/img/account/logo.png">
        <!-- <h2 class="title">Register New {{ type ===1 ? 'Personal' : 'Agent'}} Account</h2> -->
        <h2 class="title">Sign Up To Ebuyhouse To Start Earning</h2>
        <!-- <el-button icon="el-icon-close" circle @click="close"></el-button> -->
      </div>
      <div class="dialog-register-type">
        <el-radio-group v-model="type" class="ig-type">
          <el-radio :label="1">Personal</el-radio>
          <el-radio :label="2">Agent</el-radio>
        </el-radio-group>
      </div>
      <div class="dialog-body">
        <!-- 邮箱注册 默认-->
        <div class="row row-username" v-if="Number(regType) === 1">
          <input
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="Enter your email address"
            tabindex="1"
            autofocus="true"
            v-model="username"
            @blur="checkUsername"
            @focus="cancelTip($event, 'showUsernameTip')"
          >
          <p class="input-tip">
            <span v-show="showUsernameTip">{{usernameTip}}</span>
          </p>
        </div>
        <!-- 邮箱注册 -->
        <!-- 电话注册 -->
        <div class="row row-userphone" v-if="Number(regType) === 2">
          <!-- *********************abc********************* -->
          <el-input type="text" class="phoneNum" v-model="phone" autocomplete="off" size="small">
              <img class="mmp" src="/static/img/account/phoneMark.png">
              <el-select v-model="phoneAreaCodeId" slot="prepend" placeholder="Area" style="width: 80px;height:32px;background:none;">
              <el-option :label="'+1 United States of America'" value="1"></el-option>
              <el-option :label="`+${item.areaCode} ${item.en}`" :value="item.id" v-for="item in phoneAreaCodeArray" :key="item.id"></el-option>
              </el-select>
          </el-input>
          <!-- *********************abc********************* -->
          <!-- <input
            class="phoneNum"
            style="width:49%"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="Your Phone number"
            tabindex="1"
            autofocus="true"
            v-model="phone"
            @blur="checkUsername"
            @focus="cancelTip($event, 'showUsernameTip')"
          > -->
          <input
            class="msg"
            style="width:47%"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="Enter code"
            tabindex="1"
            autofocus="true"
            v-model="code"
            @blur="checkUsername"
            @focus="cancelTip($event, 'showUsernameTip')"
          >
          <span class="code" @click="getMsg">Get Code</span>
          <p class="input-tip">
            <span v-show="showUsernameTip">{{usernameTip}}</span>
          </p>
        </div>
        <!-- 电话注册 -->
        <div class="row row-firstPwd">
          <input
            :type="firstPwdInputType"
            autocomplete="off"
            spellcheck="false"
            tabindex="2"
            placeholder="Please use 8-16 charcters with a mix of numbers and letters"
            v-model="firstPwd"
            @blur="checkFirstPwd"
            @focus="cancelTip($event, 'showFirstPwdTip')"
          >
          <button
            @mousedown="switchInputType($event, 'firstPwdInputType', 'text')"
            @mouseup="switchInputType($event, 'firstPwdInputType', 'password')"
          ></button>
          <p class="input-tip">
            <span v-show="showFirstPwdTip">{{firstPwdTip}}</span>
          </p>
        </div>
        <div class="row row-repeatPwd">
          <input
            :type="repeatPwdInputType"
            autocomplete="off"
            spellcheck="false"
            tabindex="3"
            placeholder="Please confirm your password"
            v-model="repeatPwd"
            @blur="checkRepeatPwd"
            @focus="cancelTip($event, 'showRepeatPwdTip')"
          >
          <button
            @mousedown="switchInputType($event, 'repeatPwdInputType', 'text')"
            @mouseup="switchInputType($event, 'repeatPwdInputType', 'password')"
          ></button>
          <p class="input-tip">
            <span v-show="showRepeatPwdTip">{{repeatPwdTip}}</span>
          </p>
        </div>
        <div class="about-agreement">
          <el-checkbox v-model="isAcceptAgreement" @change="checkAcceptAgreement">
            I have read and agreed to
            <a
              href="https://www.ebuyhouse.com/blog/terms-of-use/"
              target="view_window"
              style="color: #1281fc"
            >&lt;&lt;Terms of Use&gt;&gt;</a>
            and
            <a
              href="https://www.ebuyhouse.com/blog/privacy-policy/"
              target="view_window"
              style="color: #1281fc"
            >&lt;&lt;Privacy Policy&gt;&gt;</a> <br/> at Ebuyhouse.
          </el-checkbox>&ensp;
          <!-- <span class="agreement-link"> </span> -->
          <p class="input-tip">
            <span v-show="showAgreementTip">{{agreementTip}}</span>
          </p>
        </div>
        <button :class="['btn-register', {'disabled': isSendingRequest}]" @click="register">Register</button>
        <button class="btn-signIn" @click="signIn">
          <!-- <img src="/static/img/common/account/arrow_left.png" style="margin-right:0.5em;"> -->
          Sign in
        </button>
      </div>
      <vue-other-login @toggleLayer="_toggleRegisterLayer" @showWhat="showMe" :phoneEmail="1">
        <span>or Register With</span>
      </vue-other-login>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import VueOtherLogin from '@/components/account/common/otherLogin'
export default {
  components: {
    'vue-other-login': VueOtherLogin
  },
  data () {
    return {
      phone: '', // 电话
      phoneAreaCodeId: '', // 区号
      code: '', // 电话注册验证码
      phoneAreaCodeArray: [], // 接收区号数组
      regType: 1,
      type: 1,
      isSendingRequest: false,
      username: '',
      showUsernameTip: false,
      usernameTip: 'Please enter your email address in a correct format. ',
      firstPwd: '',
      showFirstPwdTip: false,
      firstPwdTip: '',
      repeatPwd: '',
      showRepeatPwdTip: false,
      repeatPwdTip: '',
      firstPwdInputType: 'password',
      repeatPwdInputType: 'password',
      isAcceptAgreement: false,
      showAgreementTip: false,
      agreementTip: 'Please read and agree to Ebuyhouse\'s Terms of Use and Privacy Policy.'
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig'
    })
  },
  created () {
    this.fetchAreaCode()
  },
  methods: {
    showMe (data) {
      this.regType = data
    },
    getMsg () {
      if (this.phone) {
        this.$axios({
          url: `${this.wxl_path}user/phoneRegisteredValidateCode?phone=${this.phone}&phoneAreaCodeId=${this.phoneAreaCodeId}&type=1`,
          method: 'get'
        })
          .then(res => {
            if (res.data.success) {
            }
          })
      }
    },
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
    ...mapMutations({
      UPDATA_GLOBAL_USER_INFO: 'UPDATA_GLOBAL_USER_INFO',
      updateCompletionState: 'updateCompletionState'
    }),
    close (_e) {
      this.$emit('toggleRegisterLayer', false)
    },
    onClick (_e) {
      if (_e.target.classList.contains('register-layer')) {
        this.$emit('toggleRegisterLayer', false)
      }
    },
    onMousewheel (_e) {
      _e.stopPropagation()
      _e.preventDefault()
    },
    checkUsername () {
      this.username = this.username.trim()
      if (Number(this.regType) === 1) {
        if (this.username.length === 0) {
          this.usernameTip = 'Please enter Email address.'
          this.showUsernameTip = true
        } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.(.){2,}$/.test(this.username)) {
          this.usernameTip = 'The format of the email you entered  was not correct.'
          this.showUsernameTip = true
        } else {
          this.showUsernameTip = false
        }
      }
    },
    checkFirstPwd () {
      this.firstPwd = this.firstPwd.trim()
      if (this.firstPwd.length === 0) {
        this.firstPwdTip = 'Please enter the password. '
        this.showFirstPwdTip = true
      } else if (this.firstPwd.length < 8 || this.firstPwd.length > 16) {
        this.firstPwdTip = 'Sorry. Your password should consist of 8-16 characters with only letters (a-z) and numbers (0-9).'
        this.showFirstPwdTip = true
      } else if (!/^[0-9a-zA-Z]+$/.test(this.firstPwd)) {
        this.firstPwdTip = 'Sorry, Your password should consist of 8-16 characters with only letters (a-z) and numbers (0-9).'
        this.showFirstPwdTip = true
      } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.firstPwd)) {
        this.firstPwdTip = 'Sorry. Your password should consist of 8-16 characters with only letters (a-z) and numbers (0-9).'
        this.showFirstPwdTip = true
      } else if (this.firstPwd !== this.repeatPwd) {
        this.repeatPwdTip = 'Sorry. Your password should consist of 8-16 characters with only letters (a-z) and numbers (0-9).'
        this.showRepeatPwdTip = true
      } else {
        this.showRepeatPwdTip = false
      }
    },
    checkRepeatPwd () {
      this.repeatPwd = this.repeatPwd.trim()
      if (this.repeatPwd.length === 0) {
        this.repeatPwdTip = 'Please enter the password.'
        this.showRepeatPwdTip = true
      } else if (this.repeatPwd.length < 8 || this.repeatPwd.length > 16) {
        this.repeatPwdTip = 'Sorry. Your passwords do not match.'
        this.showRepeatPwdTip = true
      } else if (!/^[0-9a-zA-Z]+$/.test(this.repeatPwd)) {
        this.repeatPwdTip = 'Sorry, Your passwords do not match.'
        this.showRepeatPwdTip = true
      } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.repeatPwd)) {
        this.repeatPwdTip = 'Sorry. Your passwords do not match.'
        this.showRepeatPwdTip = true
      } else if (this.firstPwd !== this.repeatPwd) {
        // this.repeatPwdTip = 'The password you entered twice didn’t match.'
        this.repeatPwdTip = 'Sorry. Your passwords do not match.'
        this.showRepeatPwdTip = true
      } else {
        this.showRepeatPwdTip = false
      }
    },
    checkAcceptAgreement () {
      this.showAgreementTip = !this.isAcceptAgreement
    },
    cancelTip (_e, _prop) {
      this[_prop] = false
    },
    switchInputType (_e, _prop, _v) {
      if (typeof _prop === 'string') {
        this[_prop] = _v
      } else if (_prop instanceof Array) {
        for (let i = 0; i < _prop.length; i++) {
          this[_prop[i]] = _v
        }
      }
    },
    register () {
      this.checkUsername()
      this.checkFirstPwd()
      this.checkRepeatPwd()
      this.checkAcceptAgreement()
      if (
        this.showUsernameTip ||
        this.showFirstPwdTip ||
        this.showRepeatPwdTip ||
        this.showAgreementTip ||
        this.isSendingRequest
      ) { return }
      this.isSendingRequest = true
      const locationConfig = JSON.parse(sessionStorage.getItem('locationConfig'))
      let jsonForm = {
        phone: this.phone, // 电话
        validateCode: this.code, // 短信验证码
        email: this.username,
        password: this.$md5(this.firstPwd).substr(8, 16),
        pwdConfirm: this.$md5(this.repeatPwd).substr(8, 16),
        orgin: 1,
        type: this.type,
        cityId: locationConfig.id,
        stateId: locationConfig.stateId,
        longitude: this.mapConfig.lng || this.mapConfig.xlng,
        latitude: this.mapConfig.lat || this.mapConfig.xlat
      }
      if (Number(this.regType) === 1) {
        delete jsonForm.phone
        delete jsonForm.validateCode
      } else {
        delete jsonForm.email
      }
      this.$axios({
        method: 'post',
        url: `${this.wxl_path}customer/registered`,
        data: jsonForm,
        header: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const data = response.data
          const info = data.data.userInfo
          if (data.success) {
            // 成功后更新全局基本信息
            this.UPDATA_GLOBAL_USER_INFO(info)
            // 存储信息
            this.$store.commit('signIn', {
              t: data.data.token,
              et: Date.now() + 1000 * 60 * 60,
              as: data.data.status,
              es: data.data.emailStatus,
              nn: info.nickname,
              a: info.avatar || '/static/img/common/header/avatar.png',
              n: `${info.firstname || ''} ${info.middlename || ''} ${info.lastname || ''}`,
              e: info.email
            })
            this.$emit('toggleRegisterLayer', false)
            // 打开补全信息
            this.updateCompletionState(true)
            window.location.href = this.$route.query.redirect || window.location.origin
          } else {
            this.$store.commit('signOut')
            // alert(data.msg)
          }
          this.isSendingRequest = false
        })
        .catch(error => {
          if (error) {
            this.isSendingRequest = false
          }
        })
    },
    signIn () {
      // this.$emit('toggleRegisterLayer', false)
      // this.$emit('toggleSignInLayer', true)
      this.$router.push({
        path: '/account/login',
        query: this.$route.query
      })
    },
    _toggleRegisterLayer (pg) {
      this.$emit('toggleRegisterLayer', pg)
    }
  }
}
</script>
