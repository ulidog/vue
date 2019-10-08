<template>
  <section class="bottomComponentViews">
    <header class="header-info">
      <header class="logoAndshare">
        <img src="/static/img/consultation/icons/buttom_logo.png" alt="buttom_logo">
        <ul class="icons">
          <li class="btn-twitter"></li>
          <li class="btn-facebook"></li>
          <li class="btn-yelp"></li>
          <li class="btn-camera"></li>
        </ul>
      </header>
      <footer class="download">
        <span>Download</span>
        <img src="/static/img/common/footer/googlePlay.png" onclick="window.open('http://www.baidu.com')"/>
        <img src="/static/img/common/footer/appStore.png" onclick="window.open('http://www.baidu.com')"/>
      </footer>
    </header>
    <section class="tips-info">
      <ul class="tips-box">
        <li class="tips-items">Terms of Use</li>
        <li class="tips-items">Tips for Choosing A House</li>
        <li class="tips-items">Introduction of Housing Types</li>
        <li class="tips-items">How to Determine a Genuine Buyer</li>
      </ul>
    </section>
    <section class="contack-info">
      <ul class="contack">
        <li>
          <img src="/static/img/consultation/icons/Bottom_address.png" />
          <span>5430 W. Sahara Ave, Las Vegas, NV, 89146</span>
        </li>
        <li>
          <img src="/static/img/consultation/icons/Bottom_phone.png" />
          <span>(702) 916 3883</span>
        </li>
        <li>
          <img src="/static/img/consultation/icons/Bottom_email.png" />
          <span>customersupport@ebuyhouse.com</span>
        </li>
      </ul>
    </section>
    <section class="blog-info">
      <a href="http://blog.ebuyhouse.com" target="_blank">http://blog.ebuyhouse.com</a>
    </section>
    <section class="copy-info">
      <span>© 2019 Ebuyhouse</span>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.btn-twitter{
  background-image: url('/static/img/common/footer/twitter_gray.png');
}

.btn-twitter:hover{
  background-image: url('/static/img/common/footer/twitter_blue.png');
}

.btn-facebook{
  background-image: url('/static/img/common/footer/facebook_gray.png');
}

.btn-facebook:hover{
  background-image: url('/static/img/common/footer/facebook_blue.png');
}

.btn-yelp{
  background-image: url('/static/img/common/footer/yelp_gray.png');
}

.btn-yelp:hover{
  background-image: url('/static/img/common/footer/yelp_blue.png');
}

.btn-camera{
  background-image: url('/static/img/common/footer/camera_gray.png');
}

.btn-camera:hover{
  background-image: url('/static/img/common/footer/camera_blue.png');
}
</style>
<style lang="sass" scoped>
  .bottomComponentViews
    width: 58.125em
    margin: 50px 0
    display: flex
    justify-content: space-between
    flex-direction: column
    .header-info
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      .logoAndshare
        display: flex
        align-items: center
        .icons
          display: flex
          flex-dirction: column
          margin-left: 40px
          li
            width: 2.1875em
            height: 2.1875em
            background-size: cover
            background-color: transparent
            cursor: pointer
            margin-right: 1.25em
      .download
        display: flex
        align-items: center
        span
          font-size: 1.125em
          color: #898989
          font-weight: bold
          margin: 0 1.875em
        img
          margin: 0 0 0 0.625em
    .tips-info
      width: 100%
      height: 35px
      display: flex
      align-items: center
      .tips-box
        display: flex
        height: 100%
        justify-content: space-between
        align-items: center
        width: 100%
        color: #666666
        font-size: 1em
    .contack-info
      width: 100%
      height: 35px
      display: flex
      align-items: center
      justify-content: center
      .contack
        display: flex
        height: 100%
        justify-content: center
        align-items: center
        width: 100%
        color: #666666
        li
          margin: 0 1.25em
          span
            font-size: 1em
          img
            width: 0.875em
            height: 0.875em
    .blog-info,.copy-info
      width: 100%
      height: 35px
      display: flex
      align-items: center
      justify-content: center
      a
        color: #a8a8a8
        font-weight: bold
      span
        color: #666
</style>
