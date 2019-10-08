<template>
  <section>
    <div class="dialog-footer">
      <div class="other-login">
        <slot></slot>
        <div class="right">
            <!-- 电话 -->
          <span class="icon" v-if="Number(phoneEmail) === 1" @click="changePhoneEmail(1)">
            <!-- <i class="fa fa-google fa-1x" @click="otherLogin('google')"></i> -->
            <img src="/static/img/account/phone.png" alt="">
          </span>
           <!-- 邮箱 -->
          <span class="icon" v-if="Number(phoneEmail) === 2" @click="changePhoneEmail(2)">
            <!-- <i class="fa fa-google fa-1x" @click="otherLogin('google')"></i> -->
            <img src="/static/img/account/email.png" alt="">
          </span>
          <span class="icon">
            <!-- <i class="fa fa-google fa-1x" @click="otherLogin('google')"></i> -->
            <img src="/static/img/account/google.png" @click="otherLogin('google')" alt="">
          </span>
          <span class="icon">
            <!-- <i class="fa fa-twitter-square fa-1x" @click="otherLogin('twitter')"></i> -->
            <img src="/static/img/account/twitter.png" @click="otherLogin('twitter')" alt="">
          </span>
          <span class="icon">
            <!-- <i class="fa fa-facebook-official fa-1x" @click="otherLogin('facebook')"></i> -->
            <img src="/static/img/account/facebook.png" @click="otherLogin('facebook')" alt="">
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      phoneEmail: 1, // 默认显示电话图标
      otherLoginData: {
        thirdPartyType: 1,
        token: null,
        picture: null,
        name: null
      }
    }
  },
  methods: {
    // changePhoneEmail (val) {
    //   if (Number(val) === 1) {
    //     this.phoneEmail = 2
    //   } else if (Number(val) === 2) {
    //     this.phoneEmail = 1
    //   }
    // },
    changePhoneEmail (val) {
      if (Number(val) === 1) {
        this.phoneEmail = 2
      } else if (Number(val) === 2) {
        this.phoneEmail = 1
      }
      this.$emit('showWhat', this.phoneEmail)
    },
    otherLogin (type) {
      /* global hello: true */
      /* eslint no-undef: "error" */
      let provider = hello(type)
      const _this = this
      provider.login().then((res) => {
        // _this.otherLoginData.token = res.authResponse.client_id
        // console.log(res)
        // console.log(_this.otherLoginData)
        // const authRes = provider.getAuthResponse()
        // console.log(authRes)
        // _this.getAuthorData(provider, type, res)
        return provider.api('me')
      }, (e) => {
        this.$message.error(type + ' Login failed, please try again!')
        // console.log(e)
      }).then((res) => {
        _this.otherLoginData.type = type
        switch (type) {
          case 'facebook':
            _this.otherLoginData.thirdPartyType = 3
            _this.otherLoginData.token = res.id
            _this.otherLoginData.name = res.name
            _this.otherLoginData.firstname = res.first_name
            _this.otherLoginData.lastname = res.last_name
            _this.otherLoginData.picture = res.picture
            break
          case 'google':
            _this.otherLoginData.thirdPartyType = 1
            _this.otherLoginData.token = res.id
            _this.otherLoginData.firstname = res.first_name
            _this.otherLoginData.lastname = res.last_name
            _this.otherLoginData.name = res.name
            _this.otherLoginData.picture = res.picture
            break
          case 'twitter':
            _this.otherLoginData.thirdPartyType = 2
            _this.otherLoginData.token = res.id_str
            _this.otherLoginData.name = res.name
            _this.otherLoginData.firstname = res.first_name
            _this.otherLoginData.lastname = res.last_name
            _this.otherLoginData.picture = res.profile_image_url_https
            break
        }
        setTimeout(() => {
          _this.otherLoginEby()
        }, 100)
      }, (e) => {
        console.log(e)
        this.$message.error(type + ' Login failed, please try again!')
      })
    },
    getAuthorData (_provider, _type, _res) {
      _provider.api('me/friends').then((res) => {
        // console.log(res)
      }, (e) => {
        // console.log(e)
        // alert('Whoops! ' + e.error.message)
      })
    },
    otherLoginEby () {
      // console.log(this.otherLoginData)
      this.$axios({
        'method': 'post',
        'url': `${this.wxl_path}customer/third/party/login`,
        'data': {
          'thirdPartyType': this.otherLoginData.thirdPartyType,
          'thirdPartyToken': this.otherLoginData.token,
          'headUrl': this.otherLoginData.picture,
          'orgin': 1,
          'nickname': this.otherLoginData.name
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
                'n': `${info.firstname} ${info.middlename} ${info.lastname}`, // name
                'fn': info.firstname,
                'ln': info.lastname,
                'e': info.email, // email
                'uid': info.id,
                'img': info.headUrl, // headUrl
                'hxid': info.hxusername
              }
            )
            this.$message.success(this.otherLoginData.type + ' Login Successful')
            this.$emit('toggleLayer', false)
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
            this.$message.error(this.otherLoginData.type + ' Login failed, please try again!')
            this.$store.commit('signOut')
            // alert(data.msg)
          }
          this.isSendingRequest = false
        })
        .catch(error => {
          if (error) {
            this.$message.error(this.otherLoginData.type + ' Login failed, please try again!')
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
    }
  },
  mounted () {
    hello.init({
      'facebook': '2158959574133215',
      'twitter': 'TPb7ChZdNFVGNuUUqy6FXBUZ6',
      'google': '102451223327-0r6umit982ml3396o5u0so5nfvbn8fpg.apps.googleusercontent.com'
    }, {
      redirect_uri: '/'
    })
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  width: 78%;
  margin: 0 auto;
}
.dialog-footer>.other-login {
  color: #999;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: baseline
}
.dialog-footer>.other-login>span {
  color: #999;
  font-size: 14px;
}
.dialog-footer>.other-login>.right {
  right: 0;
  color: #999;
  // position: absolute;
//   display: flex;
  justify-content: space-around;
//   width: 150px;
}
.dialog-footer>.other-login>.right>span>img {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  transition: transform .5s ease;
  &:hover {
    transform: scale(1.2);
    transition: transform .5s ease;
  }
}
.dialog-footer>.other-login>.right>span>i {
  width: 16px;
  height: 16px;
  position: absolute;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.dialog-footer>.other-login>.right>span>i:hover {
  color: #1281fc;
  font-size: 1.5rem;
  transition: all 0.5s ease;
}
</style>
