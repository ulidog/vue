<template>
  <el-row class="waitViews">
    <el-col :span="24" class="content">
      <section class="refund-tip" v-if="tip !== null">
        <h4>{{tip}}</h4>
      </section>
      <section class="msg-note" v-if="isNoteMsg">
        <h3 class="titles" v-if="noteTitle !== null">{{noteTitle}}</h3>
        <article class="gary-node-sty">{{noteMSG}}</article>
      </section>
      <section class="msg-tip" v-if="msgtip !== null">
        <p>{{msgtip}}</p>
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
    noteTitle: {
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
    },
    msgtip: {
      default: null,
      type: String
    }
  }
}
</script>
<style lang="sass" scoped>
  .waitViews
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      // height: 730px
      // min-height: 730px
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
        h3
          color: #444444
          font-size: 1.4375em
          margin: 0 10px 40px
        article
          font-size: 1.1875em
          color: #444
          margin: 0 10px
      .msg-tip
        margin-top: 190px
        p
          font-size: 1.4375em
          font-family: ArialMT
          font-weight: 400
          color: rgba(18,129,252,1)
          line-height: 37px
      .time-img-waiting
        height: 100%
        width: 100%
        display: flex
        justify-content: center
        align-items: center
</style>
