<template>
  <section class="btns-icons">
    <ul class="icons-btns-operation">
      <li class="icons">
        <img src="/static/img/consultation/icons/information_view.png" alt="browse">
        <span>{{iconsInfo.browse}}</span>
      </li>
      <li class="icons">
        <img src="/static/img/consultation/icons/information_message.png" alt="comments">
        <span>{{iconsInfo.comments}}</span>
      </li>
      <li class="icons">
        <img src="/static/img/consultation/icons/information_like.png" alt="like">
        <span>{{iconsInfo.like}}</span>
      </li>
      <li class="icons" @click="showShare = !showShare">
        <img src="/static/img/consultation/icons/information_share.png" alt="share">
        <span>{{iconsInfo.share}}</span>
      </li>
    </ul>
    <el-collapse-transition name="el-fade-in-linear">
      <!-- <div v-show="showShare">
        <common-share class="shareSize"></common-share>
      </div> -->
    </el-collapse-transition>
  </section>
</template>
<script>
import share from '@/components/consultation/share'
export default {
  components: {
    'common-share': share
  },
  data () {
    return {
      showShare: false,
      shareConfig: ['email', 'facebook', 'twitter', 'sms']
    }
  },
  props: {
    iconsInfo: {
      browse: {
        default: 0,
        type: Number
      },
      comments: {
        default: 0,
        type: Number
      },
      like: {
        default: 0,
        type: Number
      },
      share: {
        default: 0,
        type: Number
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .btns-icons
    display: flex
    .icons-btns-operation
      display: flex
      align-items: center
      margin: 0 20px 0 0
      li.icons
        display: flex
        align-items: center
        // font-size: 0.875em
        color: #666666
        cursor: pointer
        img
          width: 1.3em
          height: 1.3em
          margin-right: 6px
        span
          // font-size: 0.875em
          margin-right: 15px
    /deep/ .shareSize
      .fontHoverMarker
        margin: 0 2px
      .fontHoverMarker i
        font-size: 1em
</style>
