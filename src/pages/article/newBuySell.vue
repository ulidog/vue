<template>
  <section class="new-buy-sell">
    <!-- <header class="header-top-img">
      <img src="/static/img/index/banner_pho05.png" alt="banner.png">
      <section class="header-desc">
        <svg class="logo" aria-hidden="true">
          <use xlink:href="#icon-logo2"></use>
        </svg>
        <span>$1.6 Million Cash Giveaway</span>
        <h3>Buy, Sell, or Rent with No Fees</h3>
        <section class="svg-bg-box">
          <svg class="theme-bg" aria-hidden="true">
            <use xlink:href="#icon-juxing"></use>
          </svg>
          <span>$1.6 Million Cash Giveaway</span>
        </section>
      </section>
    </header> -->
    <header class="header-title">
      <h3>Buy, Sell, or Rent with No Fees<br>$1.6 Million Cash Giveaway</h3>
    </header>
    <section class="content-article">
      <section class="details-follows">
        <section class="content">
          <section class="list-box">
            <section class="list-item" v-for="item in followList" :key="item.id">
              <section class="left-img">
                <img :src="item.img" :alt="item.img">
              </section>
              <section class="right-intro">
                <article class="intro">{{item.content}}</article>
              </section>
            </section>
          </section>
        </section>
      </section>
      <header ref="fixedRef" class="description">
        <article class="content">
          <p>EBuyHouse lets you post your house for sale or rent for free.  Our listing platform will save you tens of thousands of dollars by not paying the traditional 6% fee charged by real estate agents.</p>
          <p>In addition, EBuyHouse is giving away <span class="red">$1,600,000</span> in cash rewards just for using our innovative real estate platform. </p>
          <p>Starting today at Ebuyhouse whether you buy, sell, or rent, by following the rules set forth by Ebuyhouse, you not only pay no fees, but you will also earn cash as part of our $1,600,000 giveaway.</p>
          <p>Ebuyhouse is an innovative real estate listing platform that never rests and is always neutral by protecting both parties. And remember, no fees….ever!</p>
          <article class="footer-article">
            <p>Just simply become a registered user of Ebuyhouse and you become eligible for this fantastic giveaway. Ebuyhouse is not only free but simple, safe, fast, and we always protect the interest of both parties. This cash giveaway is a gift from Ebuyhouse to the real estate community for 2019.</p>
            <h3>This promotion will start in June</h3>
          </article>
        </article>
        <section class="fixex-box" v-if="!token && registerWindowInfo">
          <section class="padd20-bg-boder">
            <section :class="['form-register', fixedStatus ? 'true' : 'false']">
              <header class="register-title-dec">
                <h3 class="title">Register Your Free Account</h3>
                <span class="desc">Enter Your Name & Email Below To Start Searching For Listings In Your Area</span>
                <i class="iconfont colseBox icon-quxiao" @click="closeRegister"></i>
              </header>
              <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="register-form-rule">
                <!-- email -->
                <el-form-item prop="email">
                  <el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="Enter your email address ">
                    <i slot="prefix" class="iconfont icon-emailmini"></i>
                  </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                  <!-- show-password -->
                  <el-input ref="password" type="password" v-model="registerForm.password" autocomplete="off" placeholder="Please use 8-16 charcters with a mix of numbers and letters.">
                    <i slot="prefix" class="iconfont icon-lock"></i>
                    <i slot="suffix" :class="['iconfont', isOpenView ? 'icon-open' : 'icon-colse']" @mousedown.stop="openViewPasswordChange('password')" @mouseup="closeViewPasswordChange('password')"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="pwdConfirm">
                  <!-- show-password -->
                  <el-input ref="checkpassword" type="password" v-model="registerForm.pwdConfirm" autocomplete="off" placeholder="Please confirm your password">
                    <i slot="prefix" class="iconfont icon-lock"></i>
                    <i slot="suffix" :class="['iconfont', isOpenCheckView ? 'icon-open' : 'icon-colse']" @mousedown.stop="openViewPasswordChange('checkpassword')" @mouseup="closeViewPasswordChange('checkpassword')"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="isConfirm">
                  <el-checkbox class="terms" v-model="registerForm.isConfirm">
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
                  <el-button class="themeButton" type="primary" @click="submitForm('registerForm')" :loading="submitLoading">Start Earning Now</el-button>
                </el-form-item>
                <section class="tip">* we will not spam, rent, or sell your information *</section>
              </el-form>
            </section>
          </section>
        </section>
      </header>
      <footer class="footer">
        <!-- <article class="footer-article">
          <p>Just simply become a registered user of Ebuyhouse and you become eligible for this fantastic giveaway. Ebuyhouse is not only free, but also simple, safe and fast. Protecting the interests of both parties always. This cash giveaway is a gift from Ebuyhouse to the real estate community for 2019. </p>
          <h3>This promotion will start in June</h3>
        </article> -->
        <!-- <section class="next-article">
          <span>Next:</span>
          <a href="http://" target="_blank" rel="noopener noreferrer">Buy,Sell or Rent , complete the transaction yourself , Safe and Fast,No Fees !</a>
        </section> -->
      </footer>
      <section class="share">
        <social-sharing
          :title="title"
          :description="description"
          :quote="quote"
          :twitter-user="twitterUser"
          inline-template
          @open="openChange">
          <section>
            <network network="facebook" class="fontHoverMarker">
              <img src="/static/img/article/buyAndSell/facebook.png" alt="facebook.png">
            </network>
            <network network="twitter" class="fontHoverMarker">
              <img src="/static/img/article/buyAndSell/twitter.png" alt="twitter.png">
            </network>
            <!-- <span >
              <img src="/static/img/article/buyAndSell/ins.png" alt="ins.png" @click="openWindows">
            </span> -->
          </section>
        </social-sharing>
          <img src="/static/img/article/buyAndSell/ins.png" @click="openWindows">
      </section>
      <section class="more-article">
        <h3>Related Articles</h3>
        <ul class="article-box">
          <li class="article-item" v-for="item in moreArticle" :key="item.id">
            <a :href="item.url">{{item.label}}</a>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      followList: [
        {
          id: 0,
          img: '/static/img/article/newBuySell/1000.png',
          content: 'For the first 1,000 users who utilize our SFT Transaction, both buyer and seller shall split $1,000 in cash.'
        },
        {
          id: 1,
          img: '/static/img/article/newBuySell/400.png',
          content: 'The first 1,000 visitors who use a contract on the website and buys or sells a house form the website, both buyer and seller shall split $400.'
        },
        {
          id: 2,
          img: '/static/img/article/newBuySell/200.png',
          content: 'Both landlord and renter of the first 1,000 rental transactions shall split $200 in cash.'
        }
        // {
        //   id: 3,
        //   img: '/static/img/article/newBuySell/gift.png',
        //   content: 'Just simply become a registered user of EBuyHouse and you become eligible for this fantastic giveaway. '
        // }
      ],
      url: 'https://www.ebuyhouse.com/article/new-buy-sell',
      title: 'Faster, Safer, Real Estate Transactions.',
      description: `EBuyHouse lets you post your house for sale or rent for free.  Our listing platform will save you tens of thousands of dollars by not paying the traditional 6% fee charged by real estate agents.`,
      quote: `EBuyHouse lets you post your house for sale or rent for free.  Our listing platform will save you tens of thousands of dollars by not paying the traditional 6% fee charged by real estate agents.`,
      hashtags: '#Ebuyhouse',
      twitterUser: 'Ebuyhouse',
      moreArticle: [
        {
          id: 0,
          url: 'https://www.ebuyhouse.com/article/buy-and-sell',
          label: 'Buy, Sell or Rent with No Commission'
        },
        {
          id: 1,
          url: 'https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4MjYwMDUwMDU2MjEwMDIyNCJ9',
          label: 'How to Register an Account'
        },
        {
          id: 2,
          url: 'https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzQxMDA3OTYxNzMxODkxMiJ9',
          label: 'Safe, Fast Trial (SFT) – Try it Before You Buy'
        },
        {
          id: 3,
          url: 'https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1MTc3NzQ2NjMxODg0OCJ9',
          label: 'How to Buy a Home on Ebuyhouse'
        },
        {
          id: 4,
          url: 'https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1NDA0NDgzMTU2Mzc3NiJ9',
          label: 'How to List a Home for Sale'
        },
        {
          id: 5,
          url: 'https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4MjU2MDc0NTY0MDE2NTM3NiJ9',
          label: 'How to List a Rental '
        }
      ],
      // 提交的表单
      registerForm: {
        email: null,
        password: null,
        pwdConfirm: null,
        isConfirm: false,
        orgin: 1,
        type: 1
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
        password: [
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
              if (this.registerForm.password !== value) {
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
      isOKCode: {
        phone: false,
        email: false,
        code: false,
        dbcode: false
      },
      isOpenView: false,
      isOpenCheckView: false,
      submitLoading: false,
      fixedStatus: false,
      registerWindowInfo: true
    }
  },
  computed: {
    ...mapGetters({
      mapConfig: 'mapConfig',
      token: 'token'
    })
  },
  methods: {
    ...mapMutations({
      UPDATA_GLOBAL_USER_INFO: 'UPDATA_GLOBAL_USER_INFO',
      updateCompletionState: 'updateCompletionState'
    }),
    async submitForm (_name) {
      const _this = this
      _this.$refs[_name].validate((valid, obj) => {
        // console.log(valid)
        if (valid) {
          // if () {}
          const locationConfig = JSON.parse(sessionStorage.getItem('locationConfig'))
          let cloneForm = Object.assign({}, _this.registerForm, {
            cityId: locationConfig.id,
            stateId: locationConfig.stateId,
            longitude: this.mapConfig.lng || this.mapConfig.xlng,
            latitude: this.mapConfig.lat || this.mapConfig.xlat,
            password: this.$md5(_this.registerForm.password).substr(8, 16),
            pwdConfirm: this.$md5(_this.registerForm.password).substr(8, 16)
          })
          _this.submitLoading = true
          this.$axios({
            method: 'post',
            url: `${this.wxl_path}customer/registered`,
            data: cloneForm,
            header: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              const data = response.data
              const info = data.data.userInfo
              if (data.success) {
                _this.submitLoading = false
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
                // this.$emit('toggleRegisterLayer', false)
                // 打开补全信息
                this.updateCompletionState(true)
                this.$router.push('/index')
              } else {
                _this.submitLoading = false
                // this.$store.commit('signOut')
                // alert(data.msg)
              }
            })
            .catch(error => {
              if (error) {
                _this.submitLoading = false
              }
            })
        } else {
          console.log(obj)
        }
      })
    },
    // 密码查看
    openViewPasswordChange (_domname) {
      // this.$refs[_domname]
      // console.log(this.$refs)
      this.$refs[_domname].$el.getElementsByTagName('input')[0].type = 'text'
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
    },
    openChange (E) {
      console.log(E)
    },
    openWindows () {
      window.open('https://www.instagram.com/ebuyhouseinc/', 'newwindow', 'height=459, width=626, top=95, left=650, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
    },
    handlerScrollChange () {
      const ofset = this.$refs['fixedRef'].offsetTop
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // const windowWith = window.document.body.clientWidth
      const windowHeig = window.screen.availHeight
      // 525px
      // console.log(ofset, ofset - scrollTop)
      if ((windowHeig - 525) / 2 > (ofset - scrollTop + 50)) {
        this.fixedStatus = true
      } else {
        this.fixedStatus = false
      }
    },
    closeRegister () {
      this.registerWindowInfo = false
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handlerScrollChange)
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handlerScrollChange)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1200px)
    .new-buy-sell
      padding-top: 60px
      width: 100%
      .header-title,
      .content-article
        width: 1200px
        margin: 0 auto
  @media screen and (max-width: 1200px)
    .new-buy-sell
      padding-top: 60px
      width: 100%
      .header-title,
      .content-article
        width: 100%
        padding: 0 20px
        margin: 0
  @media screen and (min-width: 750px)
    .list-box
      justify-content: space-between
    .fixex-box
      flex: 0 0 550px
  @media screen and (max-width: 750px)
    .list-box
      justify-content: center
    .fixex-box
      flex: 1
  .new-buy-sell
    .header-title
      display: flex
      justify-content: center
      border-bottom: 1px solid #444
      padding: 3rem 1rem
      >h3
        font-size: 4rem
        color: #444
        font-weight: bold
        text-align: center
    .header-top-img
      width: 100%
      font-size: 0
      height: 400px
      display: flex
      align-items: center
      justify-content: center
      overflow: hidden
      position: relative
      img
        // width: 100%
      .header-desc
        position: absolute
        display: flex
        flex-direction: column
        align-items: center
        >h3
          color: #EC1476
          font-size: 5rem
          font-weight: bold
        .svg-bg-box
          margin-top: 3rem
          display: flex
          justify-content: center
          align-items: center
          align-self: flex-end
          .theme-bg
            max-height: 4.5rem
            width: 40rem
          >span
            color: #fff
            font-size: 2.5rem
            position: absolute
        // .logo
        //   width: 240px
        //   height: 50px
        // span
        //   color: #1281FC
        //   font-size: 44px
        //   text-shadow: 1px 1px 1px #fff
        //   margin-top: 30px
    .content-article
      .description
        margin: 40px 0
        display: flex
        // align-items: flex-end
        justify-content: center
        flex-wrap: wrap
        .content
          font-size: 20px
          color: #666666
          flex: 1
          margin-right: 50px
          min-width: 320px
          >p
            line-height: 30px
            margin-bottom: 20px
            .red
              color: #FF0000
              font-size: 24px
          >.footer-article
            margin-top: 50px
            >p
              color: #666
              font-size: 20px
              line-height: 30px
              margin-bottom: 20px
            >h3
              // color: #FF4949
              color: #999999
              font-size: 18px
              margin-bottom: 50px
        .fixex-box
          display: flex
          align-items: center
          transition: all .5s ease
          .padd20-bg-boder
            background-color: #C7DFF9
            // border: 3px solid #1281FC
            border-radius: 10px
            padding: 65px 40px
            // transform: translateY(-5rem)
            position: relative
            flex: 1
          .form-register
            align-self: center
            flex: 1
            // flex: 0 0 610px
            // width: 610px
            // padding: 50px 60px 20px 60px
            // background: rgba(255,255,255,1)
            // box-shadow: 0px 14px 14px 0px rgba(222,222,222,1)
            // border-radius: 10px
            &.true
              position: fixed
              top: 25%
              right: 20%
            .register-title-dec
              display: flex
              flex-direction: column
              align-items: center
              .title
                text-align: center
                font-size: 35px
                font-weight: bold
                color: #000
                // white-space: nowrap
              .desc
                color: #444
                font-size: 20px
                line-height: 20px
                margin-top: 20px
                text-align: center
                margin-bottom: 25px
                // width: 270px
              .colseBox
                font-size: 36px
                color: #000
                position: absolute
                right: 18px
                top: 18px
                cursor: pointer
            .register-form-rule
              // margin: 1.5rem 0
              background: rgba(255,255,255,1)
              padding: 40px 20px
              border-radius: 10px
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
                      padding-left: 85px
                      outline: none
              /deep/ .el-form-item
                .el-form-item__content
                  display: flex
                  justify-content: center
                  .terms
                    display: flex
                    // align-items: center
                    .el-checkbox__inner
                      margin-top: 3px
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
              .tip
                display: flex
                justify-content: center
                color: #C1C1C1
                font-size: 12px
                margin-top: 30px
      .details-follows
        .content
          margin: 40px 0
          display: flex
          flex-wrap: wrap
          .list-box
            flex: 1
            display: flex
            flex-direction: row
            flex-wrap: wrap
            transition: all .5s ease
            .list-item
              display: flex
              flex-direction: column
              // justify-content: center
              align-items: center
              margin-bottom: 40px
              max-width: 345px
              transition: all .5s ease
              .left-img
                width: 345px
                height: auto
                // margin-right: 90px
                img
                  width: 100%
              .right-intro
                // flex: 1
                padding: 0 20px
                .intro
                  font-size: 18px
                  color: #999999
                  line-height: 30px
      .footer
        margin: 0
        .footer-article
          p
            color: #666
            font-size: 20px
            line-height: 30px
            margin-bottom: 20px
          h3
            // color: #FF4949
            color: #999999
            font-size: 18px
            margin-bottom: 50px
        .next-article
          display: flex
          margin: 20px 0
          span
            font-size: 24px
            color: #444
          a
            font-size: 24px
            color: #1281FC
            margin-left: 10px
      .share
        margin: 0
        border-top: 2px solid #E2E2E2
        padding: 30px 0
        display: flex
        /deep/ img
          margin: 0 5px
          width: 50px
          height: 50px
          transition: transform .5s ease
          cursor: pointer
          &:hover
            transform: scale(1.2)
            transition: transform .5s ease
      .more-article
        margin: 50px 0
        h3
          color: #444
          font-size: 36px
          margin-bottom: 50px
        .article-box
          display: flex
          flex-wrap: wrap
          .article-item
            display: flex
            width: 50%
            font-size: 24px
            color: #444
            margin-bottom: 20px
            transition: all .5s ease
            &:hover
              color: #1281FC
              transition: all .5s ease
            &:before
              content: '●'
              color: #999999
              margin-right: 5px
              transition: all .5s ease
            &:hover::before
              color: #1281FC
              transition: all .5s ease
</style>
