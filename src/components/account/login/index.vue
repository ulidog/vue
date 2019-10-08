<style scoped>
.sign-in-layer{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.sign-in-dialog{
  width: 100%;
  padding-bottom: 2em;
  padding-top: 30px;
  background-color: #ffffff;
  border-radius: 10px;
}

.dialog-brow{
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* .logo{ */
  /* width: 16%;
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%); */
/* } */

.title{
  width: 100%;
  text-align: center;
  font-size: 24px;
  padding: 30px 0 19px;
}

.dialog-brow .el-button{
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
}

/* .dialog-body{ */
  /* margin-top: 2em; */
/* } */

.row{
  width: 78%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.5em;
  position: relative;
}

.row input{
  width: 100%;
  height: 34px;
  padding-left: 8%;
  padding-right: 8%;
  background-repeat: no-repeat;
  background-size: auto 60%;
  background-position: 1% 50%;
  border: 1px solid #9e9e9e;
  border-radius: 0.4em;
  font-size: 1em;
  color: #444444;
  outline: none;
}

.row input:focus{
  border-color: #1281fc;
}

.row-username input{
  background-image: url(/static/img/common/account/username.png);
}

.row-pwd input{
  background-image: url(/static/img/common/account/pwd.png);
}

.row button{
  width: 4%;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position:50% 15px;
  background-image: url(/static/img/common/account/hide_pwd.png);
  position: absolute;
  top: 0;
  right: 3%;
}

.row button:active{
  background-position:50% 12px;
  background-image: url(/static/img/common/account/show_pwd.png);
}

.input-tip{
  font-size: 0.8em;
  height: 1.2em;
  color: rgb(219, 19, 19);
}

.forget-pwd{
  width: 78%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5em;
  text-align: right;
  color:#1281fc;
  cursor:pointer;
}

.forget-pwd:hover{
  text-decoration: underline;
}

.btn-register,
.btn-sign-in{
  display: block;
  width: 78%;
  height: 32px;
  border: 2px solid #1281fc;
  border-radius: 16px;
  margin-bottom: 0.8em;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  transition: all .53 ease;
}
.btn-register{
  margin-bottom: 59px;
}
.btn-register:hover,
.btn-sign-in:hover{
  box-shadow: 0 0 6px #1281fc;
  transition: all .3s ease;
}

.btn-register:active,
.btn-sign-in:active{
  transition: all .3s ease;
  transform: matrix(1.01, 0, 0, 1.01, 0, 0);
}

.btn-sign-in{
  transition: all .3s ease;
  background-color: #1281fc;
  color: #ffffff;
}

.btn-sign-in.disabled{
  border-color: #999999;
  background-color: #999999;
}

.btn-register{
  color: #1281fc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="sign-in-layer"
    @click="close"
    @mousewheel="onMousewheel"
    @mouseup="switchInputType($event, 'passwordInputType', 'password')"
  >
    <div class="sign-in-dialog" @click="dialogOnClick">
      <div class="dialog-brow">
        <img class="logo" src="/static/img/account/logo.png" />
        <h2 class="title">Sign in</h2>
        <!-- <el-button icon="el-icon-close" circle @click="close"></el-button> -->
      </div>
      <div class="dialog-body">
        <div class="row row-username">
          <input type="text" autocomplete="off" spellcheck="false" placeholder="Enter your email address or phone number" tabindex="1"
          autofocus="true" v-model="username" @focus="cancelTip($event, 'showUsernameTip')" />
          <p class="input-tip"><span v-show="showUsernameTip">{{usernameTip}}</span></p>
        </div>
        <div class="row row-pwd">
          <input :type="passwordInputType" autocomplete="off" spellcheck="false"
          placeholder="Input your 8-16 password" tabindex="2"
          v-model="password" @blur="checkPassword" @focus="cancelTip($event, 'showPasswordTip')"
          @keydown.enter="signIn" />
          <button
          @mousedown="switchInputType($event, 'passwordInputType', 'text')"
          @mouseup="switchInputType($event, 'passwordInputType', 'password')"
          ></button>
          <p class="input-tip"><span v-show="showPasswordTip">{{passwordTip}}</span></p>
        </div>
        <div class="forget-pwd" @click="forgetPwd">Forget password?</div>
        <button :class="['btn-sign-in', {'disabled': isSendingRequest}]" @click="signIn">Sign in</button>
        <button class="btn-register" @click="register">Register
          <!-- <img src="/static/img/common/account/arrow_right.png" style="margin-left:0.5em;" /> -->
        </button>
      </div>
      <vue-other-login @toggleLayer="_toggleSignInLayer">
        <span>or Sign in with</span>
      </vue-other-login>
    </div>
  </div>
</template>

<script>
import VueOtherLogin from '@/components/account/common/otherLogin'
import { mapMutations, mapGetters } from 'vuex'
// import hello from 'hellojs/dist/hello.all'
export default {
  components: {
    'vue-other-login': VueOtherLogin
  },
  data () {
    return {
      isSendingRequest: false,
      username: '',
      showUsernameTip: false,
      usernameTip: 'Please enter your email address in a correct format.',
      password: '',
      showPasswordTip: false,
      passwordTip: '',
      passwordInputType: 'password'
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig'
    })
  },
  methods: {
    ...mapMutations({
      UPDATA_GLOBAL_USER_INFO: 'UPDATA_GLOBAL_USER_INFO',
      UPDATA_WINDOW_FORGOT_STATUS: 'UPDATA_WINDOW_FORGOT_STATUS'
    }),
    close (_e) {
      this.$emit('toggleSignInLayer', false)
    },
    dialogOnClick (_e) {
      _e.stopPropagation()
    },
    onMousewheel (_e) {
      _e.stopPropagation()
      _e.preventDefault()
    },
    // checkUsername () {
    //   if (this.username.length === 0) {
    //     this.usernameTip = 'Please enter Email address.'
    //     this.showUsernameTip = true
    //   } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.(.){2,}$/.test(this.username)) {
    //     this.usernameTip = 'The format of the email you entered  was not correct.'
    //     this.showUsernameTip = true
    //   } else {
    //     this.showUsernameTip = false
    //   }
    // },
    checkPassword () {
      if (this.password.length === 0) {
        this.passwordTip = 'Please enter password.'
        this.showPasswordTip = true
      } else if (this.password.length < 8 || this.password.length > 16) {
        this.passwordTip = 'Please enter 8-16 characters including numbers and letters.'
        this.showPasswordTip = true
      } else if (!/^[0-9a-zA-Z]+$/.test(this.password)) {
        this.passwordTip = 'The password only contains number and letters.'
        this.showPasswordTip = true
      } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.password)) {
        this.passwordTip = 'The password must contain number and letters.'
        this.showPasswordTip = true
      } else {
        this.showPasswordTip = false
      }
    },
    cancelTip (_e, _prop) {
      this[_prop] = false
    },
    switchInputType (_e, _prop, _v) {
      this[_prop] = _v
    },
    signIn () {
      // this.checkUsername()
      this.checkPassword()
      if (this.showUsernameTip || this.showPasswordTip || this.isSendingRequest) return
      // this.isSendingRequest = true
      // alert(this.$md5(this.password).substr(8, 16))
      const locationConfig = JSON.parse(sessionStorage.getItem('locationConfig')) || {}
      this.$axios({
        'method': 'get',
        'url': `${this.wxl_path}customer/login`,
        'params': {
          'email': this.username,
          'password': this.$md5(this.password).substr(8, 16),
          'longitude': this.mapConfig.lng || this.mapConfig.xlng,
          'latitude': this.mapConfig.lat || this.mapConfig.xlat,
          'cityId': locationConfig.id,
          'stateId': locationConfig.stateId,
          'orgin': 1
        }
      })
        .then(response => {
          const data = response.data
          const info = data.data.userInfo
          if (data.success) {
            // console.log(data)
            // console.log(info)
            this.$store.commit(
              'signIn',
              {
                't': data.data.token, // token
                'et': Date.now() + 1000 * 60 * 60, // expire time
                'as': data.data.status, // account status
                'es': data.data.emailStatus, // email status
                'nn': info.nickname, // nickname
                'a': info.headUrl || '/static/img/common/header/avatar.png', // avatar
                'n': `${info.firstname || ''} ${info.middlename || ''} ${info.lastname || ''}`, // name
                'fn': info.firstname,
                'ln': info.lastname,
                'e': info.email, // email
                'uid': info.id,
                'img': info.headUrl, // headUrl
                'hxid': info.hxusername
              }
            )
            this.UPDATA_GLOBAL_USER_INFO(info)
            this.$emit('toggleSignInLayer', false)
            // this.$router.push({
            //   path: this.$route.query.redirect || '/'
            // })
            // alert(this.$route.query.redirect)
            // window.location.href = this.$route.query.redirect || window.location.origin
            try {
              this.$router.push({
                path: this.GetUrlRelativePath(this.$route.query.redirect)
              })
            } catch (error) {
              this.$router.push({
                path: '/'
              })
            }
          } else {
            this.$store.commit('signOut')
            // alert(data.msg)
          }
          this.isSendingRequest = false
        })
        .catch(error => {
          if (error) {
            this.$store.commit('signOut')
            this.isSendingRequest = false
          }
        })
    },
    GetUrlRelativePath (_str) {
      var url = _str
      var arrUrl = url.split('//')
      var start = arrUrl[1].indexOf('/')
      return arrUrl[1].substring(start)
      // stop省略，截取从start开始到结尾的所有字符
      // return relUrl
    },
    register () {
      // this.$emit('toggleSignInLayer', false)
      // this.$emit('toggleRegisterLayer', true)
      this.$router.push({
        path: '/account/register',
        query: this.$route.query
      })
    },
    forgetPwd () {
      // this.$emit('toggleSignInLayer', false)
      // this.$emit('toggleForgetPwdLayer', true)
      this.UPDATA_WINDOW_FORGOT_STATUS(true)
    },
    _toggleSignInLayer (pg) {
      this.$emit('toggleSignInLayer', pg)
    }
  }
}
</script>
