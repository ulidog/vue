<template>
  <social-sharing
    :url="url"
    :title="title"
    :description="description"
    :quote="quote"
    :hashtags="hashtags"
    :twitter-user="twitterUser"
    inline-template
    @open="openChange">
    <div>
      <network network="email" class="fontHoverMarker">
        <i class="iconfont icon-youxiang1"></i>
      </network>
      <network network="facebook" class="fontHoverMarker">
        <i class="iconfont icon-facebookfacebook52"></i>
      </network>
      <!-- <network network="googleplus" class="fontHoverMarker">
        <i class="iconfont icon-googleplus-circle-f"></i>
      </network> -->
      <!-- <network network="line" class="fontHoverMarker">
        <i class="iconfont iconfont-line"></i>
      </network> -->
      <network network="linkedin" class="fontHoverMarker">
        <i class="iconfont icon-linkedin0"></i>
      </network>
      <network network="odnoklassniki" class="fontHoverMarker">
        <i class="iconfont icon-odnoklassniki-square"></i>
      </network>
      <network network="pinterest" class="fontHoverMarker">
        <i class="iconfont icon-pinterest1"></i>
      </network>
      <network network="reddit" class="fontHoverMarker">
        <i class="iconfont icon-reddit"></i>
      </network>
      <network network="skype" class="fontHoverMarker">
        <i class="iconfont icon-skype"></i>
      </network>
      <network network="sms" class="fontHoverMarker">
        <i class="iconfont icon-sms"></i>
      </network>
      <network network="telegram" class="fontHoverMarker">
        <i class="iconfont icon-telegram"></i>
      </network>
      <network network="twitter" class="fontHoverMarker">
        <i class="iconfont icon-twitter0"></i>
      </network>
      <network network="vk" class="fontHoverMarker">
        <i class="iconfont icon-vk-circle"></i>
      </network>
      <!-- <network network="weibo" class="fontHoverMarker">
        <i class="iconfont iconfont-weibo"></i>
      </network> -->
      <network network="whatsapp" class="fontHoverMarker">
        <i class="iconfont icon-logo-whatsapp"></i>
      </network>
    </div>
  </social-sharing>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://www.ebuyhouse.com/'
    }
  },
  props: {
    title: {
      default: 'Ebuyhouse is a trading platform for online trading of homes',
      type: String
    },
    description: {
      default: 'Ebuyhouse is a trading platform for online trading of homes',
      type: String
    },
    quote: {
      default: 'Ebuyhouse is a trading platform for online trading of homes',
      type: String
    },
    hashtags: {
      default: 'Online purchase,Online rental,Online Trading',
      type: String
    },
    twitterUser: {
      default: '#Ebuyhouse',
      type: String
    },
    shareConfig: {
      default: () => ['email', 'facebook', 'googleplus', 'line', 'linkedin', 'odnoklassniki', 'pinterest', 'reddit', 'skype', 'sms', 'telegram', 'twitter', 'vk', 'weibo', 'whatsapp'],
      type: [Object, Array]
    }
  },
  filters: {
    isBeing (str) {
      return this.shareConfig.includes(str)
    }
  },
  created () {
    this.url = `${window.location.origin}${window.location.pathname}/${window.location.search}`
    // console.log(this.url)
  },
  mounted () {
    // console.log(this.shareConfig.includes('email'))
    console.log(this)
  },
  methods: {
    isBeing (str) {
      return this.shareConfig.includes(str)
    },
    openChange (e) {
      this.$emit('openChange', e)
    }
  }
}
</script>
<style lang="sass" scoped>
  /deep/ .fontHoverMarker i
    color: #444
    font-size: 1.5em
    cursor: pointer
  /deep/ .fontHoverMarker:hover i
    color: #2599cc
</style>
