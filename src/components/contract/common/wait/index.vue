<template>
  <el-row class="waitViews">
    <el-col :span="24" class="content">
      <section class="refund-tip">
        <h4>{{tip}}</h4>
      </section>
      <section class="msg-note" v-if="isNoteMsg">
        <article class="gary-node-sty">{{noteMSG}}</article>
      </section>
      <footer class="time-img-waiting" v-if="isWaitImg">
        <img src="/static/img/contract/icons/waiting.png" alt="waiting">
      </footer>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    tip: {
      default: null,
      type: String
    },
    noteMSG: {
      default: null,
      type: String
    },
    isNoteMsg: {
      default: false,
      type: Boolean
    },
    isWaitImg: {
      default: true,
      type: Boolean
    }
  }
}
</script>
<style lang="sass" scoped>
  .waitViews
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      height: 730px
      min-height: 730px
      display: flex
      flex-direction: column
      .refund-tip
        padding-top: 23px
        h4
          font-size: 1.4375em
          color: #444
          font-weight: bold
      .msg-note
        margin: 80px 0
        article
          font-size: 1.1875em
          color: #999999
          margin: 0 10px
      .time-img-waiting
        height: 100%
        width: 100%
        display: flex
        justify-content: center
        align-items: center
</style>
