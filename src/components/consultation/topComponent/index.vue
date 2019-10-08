<template>
  <section class="topComponents">
    <section class="bg-img">
      <img src="/static/img/consultation/bg/top_banner.png" alt="topBG">
    </section>
    <section class="shareIcons">
      <ul class="icons">
        <li class="btn-twitter"><a href="https://twitter.com/ebuyhouseinc/"></a></li>
        <li class="btn-facebook"><a href="https://www.facebook.com/ebuyhouseinc/"></a></li>
        <li class="btn-yelp"><a href="https://www.yelp.com/biz/ebuyhouse-las-vegas"></a></li>
        <li class="btn-camera"><a href="https://www.instagram.com/ebuyhouseinc/"></a></li>
      </ul>
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
  background-image: url('/static/img/consultation/icons/twitter_gray.png');
}

.btn-twitter:hover{
  background-image: url('/static/img/common/footer/twitter_blue.png');
}

.btn-facebook{
  background-image: url('/static/img/consultation/icons/facebook_gray.png');
}

.btn-facebook:hover{
  background-image: url('/static/img/common/footer/facebook_blue.png');
}

.btn-yelp{
  background-image: url('/static/img/consultation/icons/yelp_gray.png');
}

.btn-yelp:hover{
  background-image: url('/static/img/common/footer/yelp_blue.png');
}

.btn-camera{
  background-image: url('/static/img/consultation/icons/ins_gray.png');
}

.btn-camera:hover{
  background-image: url('/static/img/common/footer/camera_blue.png');
}
</style>
<style lang="sass" scoped>
  .topComponents
    position: relative
    // margin-top: 60px
    .bg-img
      width: 100%
      height: 100%
      img
        width: 100%
        height: 100%
    .shareIcons
      position: absolute
      bottom: 1.5625em
      right: 3.125em
      padding: 0 9%
      .icons
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
            width: 100%
            height: 100%
            display: inline-block
</style>
