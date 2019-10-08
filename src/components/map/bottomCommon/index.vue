<template>
  <section class="bottomCommonViews">
    <header class="ebuyhouseinfo">
      <section class="left-ebuyhous">
        <img src="/static/img/common/footer/bottom_logo.png" alt="logo">
        <ul>
          <li>
            <img src="/static/img/common/footer/bottom_address.png" />
            <span>5430 W. Sahara Ave, Las Vegas, NV, 89146</span>
          </li>
          <li>
            <img src="/static/img/common/footer/bottom_phone.png" />
            <a href="tel:7029163883"><span style="color: #fff; text-decoration: underline;">(702) 916 3883</span></a>
          </li>
          <li>
            <img src="/static/img/common/footer/bottom_email.png" />
            <span>customersupport@ebuyhouse.com</span>
          </li>
        </ul>
      </section>
      <section class="right-share">
        <h3>LET’S GET SOCIAL</h3>
        <ul class="icons">
          <li class="btn-twitter"><a href="https://twitter.com/ebuyhouseinc/"></a></li>
          <li class="btn-facebook"><a href="https://www.facebook.com/ebuyhouseinc/"></a></li>
          <li class="btn-yelp"><a href="https://www.yelp.com/biz/ebuyhouse-las-vegas"></a></li>
          <li class="btn-camera"><a href="https://www.instagram.com/ebuyhouseinc/"></a></li>
        </ul>
        <a href="http://www.ebuyhouse.com/blog" target="_blank">http://www.ebuyhouse.com/blog</a>
      </section>
    </header>
    <footer class="more-contack">
      <header>
        <ul>
          <li><a href="https://www.ebuyhouse.com/blog/terms-of-use/" target="view_window">Terms of Use</a></li>
          <span>|</span>
          <li><a href="https://www.ebuyhouse.com/blog/privacy-policy/" target="view_window">Privacy  Policy</a></li>
        </ul>
      </header>
      <span></span>
      <footer>
        <span>© 2019 Ebuyhouse</span>
      </footer>
    </footer>
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
  .bottomCommonViews
    background-color: #545762
    width: 100%
    height: auto
    display: flex
    flex-direction: column
    .ebuyhouseinfo
      display: flex
      width: 100%
      .left-ebuyhous,.right-share
        width: calc( 50% - 5em )
        flex: 0 0 calc( 50% - 5em )
        margin-left: 5em
        padding: 2.5em 0
      .left-ebuyhous
        ul
          margin-top: 1.5625em
          display: flex
          flex-direction: column
          li
            display: flex
            align-items: center
            height: 30px
            color: #d1d1d1
            font-size: 1em
            img
              margin-right: 1em
      .right-share
        h3
          font-size: 1.875em
          color: #d1d1d1
        .icons
          margin-top: 1.5625em
          margin-bottom: 1.5625em
          display: flex
          flex-dirction: column
          li
            width: 2.1875em
            height: 2.1875em
            background-size: cover
            background-color: transparent
            cursor: pointer
            margin-right: 1.25em
            a
              display: inline-block
              width: 100%
              height: 100%
        a
          font-size: 1.25em
          color: #9fa0a5
    .more-contack
      display: flex
      flex-direction: column
      width: 100%
      header
        width: 100%
        ul
          display: flex
          width: 100%
          justify-content: center
          li,span,a
            color: #d1d1d1
            font-size: 1em
          span
            margin: 0 1em
      >span
        margin: 0.75em 0 0 0
        display: flex
        height: 1px
        background-color: #d1d1d1
        width: 100%
      footer
        display: flex
        justify-content: center
        height: 45px
        align-items: center
        span
          color: #d1d1d1
          font-size: 1em
</style>
