<template>
  <el-row class="step10_tryit">
    <el-col :span="24" class="box">
      <header class="content">
        <h3>The buyer has applied for ending of try-out,the days of trying-out:            days</h3>
        <article class="article">
          结束试住的原因：xxxxxxxxxxxxxxxxxxx
        </article>
        <p>The amount of refund is 5% total price of home beyond a breach of contract period.The reduction of rent during try-out period, charges of clean and repair </p>
      </header>
      <footer class="btns">
        <sell-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :confirmTitle="'The home is undamaged'" :rejectTitle="'The home is damaged.'" :ConfirmLoading="ConfirmLoading"></sell-confirm-and-reject>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'sell-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      ConfirmLoading: false
    }
  },
  mounted () {
    this.updateStatus(4)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    _confirm () {},
    _reject () {}
  }
}
</script>
<style lang="sass" scoped>
  .step10_tryit
    background-color: #fff
    padding: 35px
    .box
      .content
        h3
          font-size: 1.4375em
          color: #444444
          line-height: 51px
        .article
          margin-top: 30px
          height: 300px
          color: #444
          font-size: 1.4375em
          line-height: 51px
        p
          font-size: 23px
          font-family: Adobe Heiti Std R
          font-weight: normal
          color: rgba(68,68,68,1)
          line-height: 51px
</style>
