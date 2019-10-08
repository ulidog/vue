<template>
  <el-row class="inspectionWait">
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
      <footer class="inspectionType">
        <ul class="inspectionBox">
          <li v-for="item in inspectionTypeList" :key="item.id" :class="{'items-list': true, 'action': item.isCheck}" @click="typeChange(item)" @dblclick="_change(item)">
            <img v-lazy="item.imgUrl" :alt="item.serverName" :key="Math.random() * 10000"/>
          </li>
        </ul>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      inspectionFrom: {
        inspectionActionType: null,
        noticeType: 0
      }
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
      default: false,
      type: Boolean
    },
    inspectionTypeList: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    typeChange (val) {
      this.inspectionFrom.inspectionActionType = val.type
      this.$emit('clickChange', val)
    },
    _change (val) {
      this.$emit('dblclickChange', val)
    }
  }
}
</script>
<style lang="sass" scoped>
  .inspectionWait
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
      .inspectionType
        height: 100%
        display: flex
        justify-content: center
        margin: 50px 20px
        // padding: 0 120px
        .inspectionBox
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          li.items-list
            margin-bottom: 55px
            position: relative
            width: 14.75em
            display: flex
            height: 10em
            z-index: 2
            align-items: center
            justify-content: center
            cursor: pointer
            margin: 0 30px
            img
              position: absolute
              width: 100%
          li.action:before
            box-shadow: 1px 1px 1px 1px #9ecafa
            width: 104%
            height: 104%
            content: ''
            background-color: #9ecafa
            position: absolute
            top: -3%
            left: -2.8%
            border-radius: 8px
</style>
