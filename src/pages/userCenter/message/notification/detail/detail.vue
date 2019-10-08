<template>
  <div class="details-info">
    <el-button class="back-sty" type="text" icon="el-icon-back" @click="goback">Go back</el-button>
    <div class="container-box">
      <header class="msg-info-intro">
        <div class="left-part">
          <img src="/static/img/userCenter/chakan.png" alt="ck">
          <div class="msg-info">
            <h6 class="title">{{msgInfo.title}}</h6>
            <span>{{msgInfo.dateTime|timerFormat}}</span>
          </div>
        </div>
        <div class="right-part">
          <img v-if="!houseInfo.transactionStatus" src="/static/img/userCenter/success_stamp.png" alt="success"/>
          <img v-if="houseInfo.transactionStatus === 3" src="/static/img/userCenter/success_stamp.png" alt="success"/>
          <img v-if="houseInfo.transactionStatus === 4" src="/static/img/userCenter/fail_stamp.png" alt="fail">
        </div>
      </header>
      <section class="msg-content">
        <article class="msg" v-html="msgInfo.shortInfo">
          <!-- <span style="color: #1281FC">#344-233-233</span> -->
          <!-- {{}} -->
        </article>
        <utils-house-info-component v-if="isShowHouseInfo"></utils-house-info-component>
      </section>
    </div>
  </div>
</template>

<script>
import houseInfoComponent from '@/components/userCenter/message/notifications/houseInfo.vue'
export default {
  components: {
    'utils-house-info-component': houseInfoComponent
  },
  data () {
    return {
      params: {},
      houseInfo: {},
      msgInfo: {},
      isShowHouseInfo: false
    }
  },
  'filters': {
    timerFormat: (timer) => {
      if (!timer) return
      const time = timer.length > 10 ? Number(timer) : Number(timer + '000')
      const timers = new Date(time)
      return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    }
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      if (this.params.type === 1 || this.params.type === 2 || this.params.type === 10 || this.params.type === 11) {
        this.isShowHouseInfo = true
        this.getMasHouseInfo()
      }
      this.fetchNotification()
      this.readyNotifice()
    } catch (err) {
      console.log(err)
    }
  },
  'methods': {
    goback () {
      this.$router.go(-1)
    },
    fetchNotification () {
      const _this = this
      _this.$axios.get(`${this.YT_PROD_PATH}common/message/detail`, {params: {messageId: this.params.msgid, jumpType: 1}})
        .then(res => {
          if (res.data.success) {
            _this.msgInfo = res.data.data
          }
        })
    },
    readyNotifice () {
      const _this = this
      _this.$axios.get(`${this.YT_PROD_PATH}common/message/updateByMessageId`, {params: {messageId: this.params.msgid, jumpType: 1}})
        .then(res => {})
    },
    getMasHouseInfo () {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/mine/detail`, {params: {thousesId: this.params.houseid}})
        .then(res => {
          if (res.data.success) {
            _this.houseInfo = res.data.data
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  .details-info
    border-top: 2px solid #f9fafa
    .back-sty
      margin-left: 2em
    .container-box
      background-color: #fff
      .msg-info-intro
        display: flex
        justify-content: space-between
        padding: 0 30px 20px 0
        align-items: center
        border-bottom: 1px solid #F3F4F5
        margin: 20px 40px 20px 50px
        .left-part
          display: flex
          align-items: flex-start
          >img
            width: 22px
            height: 22px
            margin: 5px 20px 0 0
          .msg-info
            h6
              font-size: 1.875em
              color: #444
              margin-bottom: 15px
            span
              color: #999
              font-size: 1em
      .msg-content
        display: flex
        flex-direction: column
        margin: 10px 80px
        .msg
          font-size: 20px
          color: #666
          text-indent: 2em
          height: 100px
          align-items: center
          display: flex
          flex-direction: column
          word-break: break-all
          /deep/ a
            display: contents
            color: #1281FC
</style>
