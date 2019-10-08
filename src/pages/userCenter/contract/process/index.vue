<template>
  <section class="processViews">
    <header class="processLine" v-if="!configInfo.isFullScreen ? true : (configInfo.showProcess ? true : false)">
      <header class="processStatus">
        <h3>{{ status[processTypeChange][MajorStatus] }}</h3>
      </header>
      <el-steps :active="MajorStatus" align-center class="processSty" finish-status="finish">
        <el-step v-for="item in status[processTypeChange]" :key="item" :description="item"></el-step>
      </el-steps>
    </header>
    <footer :class="{'processContent': true, 'action': configInfo.isFullScreen ? true : false}">
      <router-view @configInfo="configInfoChange"></router-view>
      <section class="viewTransactionRecord" @click="goProcessLine" v-if="!configInfo.isShowProceeLine">
        <span>View Transaction Record</span>
      </section>
    </footer>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      status: [
        // 租赁交易流程label
        ['Offer', 'Contract', 'Proof of Payment', 'Move In Checklist', 'Move In'],
        // 普通交易流程label
        ['Offer', 'Contract', 'Escrow', 'Appraisal', 'Valuation Confirmed', 'Balance Payment'],
        // SFT交易流程label
        ['Offer', 'Contract', 'Escrow', 'Move In Checklist', 'Try out', 'Appraisal', 'Valuation Confirmed', 'Balance Payment']
      ],
      configInfo: {
        showProcess: true,
        isFullScreen: false,
        isShowProceeLine: false // 是否显示进入流程的状态
      }
    }
  },
  watch: {
    '$route': (to) => {
      this.configInfo = {
        showProcess: true,
        isFullScreen: false
      }
      // if (to.name === 'common-steps-05') {
      //   this.isShowProceeLine = false
      // } else {
      //   this.isShowProceeLine = true
      // }
    }
  },
  computed: {
    ...mapGetters({
      MajorStatus: 'MajorStatus',
      processType: 'processType'
    }),
    processTypeChange () {
      if (this.processType.toString() === 'NaN') {
        return 0
      } else {
        return this.processType
      }
    }
  },
  methods: {
    configInfoChange (val) {
      this.configInfo = val
      // console.log(this.configInfo)
    },
    goBack () {
      // this.$router.replace({path: '/'});
      // replace替换原路由，作用是避免回退死循环
      this.$router.push({
        path: '/userCenter/contract',
        query: null
      })
    },
    goProcessLine () {
      this.$router.push({
        name: 'common-steps-05',
        query: this.$route.query
      })
    }
  },
  created () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  }
}
</script>
<style lang="sass" scoped>
  .processViews
    margin-left: 20px
    .processLine
      background-color: #fff
      height: 14.8125em
      display: flex
      align-items: center
      justify-content: center
      position: relative
      .processStatus
        position: absolute
        top: 20px
        h3
          font-size: 1.8125em
          color: #444
      .processSty
        width: 100%
        margin-top: 45px
        /deep/ .el-step__head.is-finish
          .el-step__line
            .el-step__line-inner
              transition-delay: 250ms !important
              border-width: 1px !important
              width: 100% !important
        /deep/ .el-step__head.is-finish,
        /deep/ .el-step__head.is-process
          color: #1281FC
          border-color: #1281FC
          font-size: 0
          .el-step__icon.is-text
            border: none
            background-color: #1281FC
            .el-step__icon-inner
              font-size: 0
        /deep/ .el-step__head
          color: #ddd
          border-color: #ddd
          font-size: 0
          >.el-step__icon.is-text
            background-color: #ddd
            border: none
        /deep/ .el-step__main
          padding-top: 20px
          .el-step__description
            font-size: 1.25em
            line-height: 31px
            text-align: center
            &.is-finish,
            &.is-process
              color: #1281FC
    .processContent
      margin-top: 22px
      position: relative
      .viewTransactionRecord
        background-color: #FEAC0D
        height: 70px
        width: 260px
        border-radius: 0 35px 35px 0
        box-shadow: 9px 12px 15px 0px rgba(254,172,13,0.48)
        position: absolute
        left: 100%
        top: 100px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        span
          color: #fff
          font-size: 18px
    .action
      margin: 0 !important
      // background-color: #fff
</style>
