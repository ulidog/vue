<template>
  <section ref="customerRatingRef" :class="['customerRatingComponent', pageConfig.pageTotal !== 0 ? 'reverse' : '']">
    <section class="customerRatingTopSubmitFrom">
      <header class="title">
        <h4>Customer Ratings</h4>
      </header>
      <section class="customerRatingContent">
        <!-- <article class="content">Hi! therel Rate this businessl!</article> -->
        <article class="content">Sharing your experience can help others learn about this company’s services!</article>
      </section>
      <section class="everyComment">
        <section class="rating">
          <span>Click to rate</span>
          <el-rate
            class="rate"
            v-model="commentFrom.commentRate"
            :texts="rateConfig.texts"
            :colors="rateConfig.colors"
            show-text>
          </el-rate>
        </section>
        <section class="commendMsg">
          <el-input class="commendMsgTextarea" maxlength="500" type="textarea" v-model="commentFrom.desc"></el-input>
          <el-button class="commendMsgSubmit" :loading="sendLoading" @click="submitChange">Send</el-button>
        </section>
      </section>
    </section>
    <footer v-if="pageConfig.pageTotal !== 0" class="pageConfig">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :current-page="pageConfig.pageNum"
        :total="pageConfig.pageTotal">
      </el-pagination>
    </footer>
    <section class="customerCommend" v-loading="customerCommentLoading">
      <header class="title">
        <h5 class="infoTitle">Customer Reviews <span class="commentTotal">({{pageConfig.pageTotal}})</span></h5>
      </header>
      <section class="commendBox" v-if="pageConfig.pageTotal !== 0">
        <ul class="commendList">
          <li class="commendItem" v-for="(item, index) in commentList" :key="index">
            <header class="userAuther">
              <img :src="item.headUrl" :alt="item.nickname">
            </header>
            <section class="commendInfo">
              <h5 class="authorName">{{item.nickname}}<span class="replyTime">{{item.addTime}}</span></h5>
              <el-rate
                class="authorRate"
                v-model="item.score"
                disabled
                text-color="#F7BA2A">
              </el-rate>
              <article class="authorMsg">{{item.content}}</article>
            </section>
          </li>
        </ul>
      </section>
      <section v-else class="noComment">
        <section class="noImgContent">
          <img src="/static/img/service/service_nocomment.png" alt="service_nocomment.png">
        </section>
        <section class="noTip">
          <span class="tip">Be the first to review this business!</span>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      commentFrom: {
        commentRate: 5,
        desc: null
      },
      rateConfig: {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        texts: ['Very Unsatisfied', 'Unsatisfied', 'Acceptable', 'Satisfied', 'Very Satisfied']
      },
      sendLoading: false,
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      commentList: [],
      customerCommentLoading: false,
      maxOffsetTop: null
    }
  },
  props: {
    dowmCallMarge: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  watch: {
    dowmCallMarge: {
      handler (_new, _old) {
        if (_new.companyId) {
          this.fetchOneCommentList({fkCompanyId: _new.companyId})
        }
      },
      deep: true,
      immediate: true
    },
    'pageConfig.pageNum': {
      handler (_new, _old) {
        this.fetchOneCommentList({fkCompanyId: this.dowmCallMarge.companyId})
      }
    },
    // 监听最大值
    maxOffsetTop: {
      handler (_new, _old) {
        if (_new && _new !== _old) {
          this.$emit('updataMaxOffsetTop', _new)
        }
      }
    }
  },
  methods: {
    fetchOneCommentList (query) {
      this.customerCommentLoading = true
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/list/comment`, { params: Object.assign({}, query || {}, this.pageConfig) })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.commentList = res.data.data.rows.map(item => {
              item['children'] = []
              item['pageNum'] = 1
              item['isNextPage'] = false
              item['Remaining'] = 0
              item['newComment'] = null
              item['isShow'] = false
              item['placeholder'] = null
              // item['newComment'] = null
              return item
            })
            console.log(this.commentList)
            this.pageConfig.pageTotal = res.data.data.total
            this.customerCommentLoading = false
          }
        })
      if (this.customerCommentLoading) {
        const _this = this
        setTimeout(() => {
          _this.customerCommentLoading = false
        }, 10000)
      }
    },
    submitChange () {
      const _this = this
      if (!_this.token) {
        this.$store.commit('signOut', true)
        return
      }
      if (!_this.commentFrom.desc) return
      _this.sendLoading = true
      _this.addOneComment({
        fkCompanyId: this.dowmCallMarge.companyId,
        content: this.commentFrom.desc,
        score: this.commentFrom.commentRate
      })
      // setTimeout(() => {
      //   _this.commentFrom.desc = null
      //   _this.commentFrom.commentRate = 0
      //   _this.sendLoading = false
      // }, 2000)
    },
    addOneComment (query) {
      const _this = this
      this.$axios.post(`${this.LJJ_SERVER_PROD_PATH}service-company/insert/comment`, Object.assign({}, query || {}))
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.msg)
            this.commentFrom.desc = null
            this.commentFrom.commentRate = 5
            this.sendLoading = false
            this.fetchOneCommentList({fkCompanyId: this.dowmCallMarge.companyId})
          }
        })
      setTimeout(() => {
        _this.sendLoading = false
      }, 10000)
    },
    currentChange (_newPageNum) {
      this.pageConfig.pageNum = _newPageNum
    }
  },
  updated () {
    const lintTop = this.$refs['customerRatingRef'].clientHeight + this.$refs['customerRatingRef'].offsetTop
    if (lintTop !== this.maxOffsetTop) {
      this.maxOffsetTop = lintTop
    }
  },
  mounted () {
    this.maxOffsetTop = this.$refs['customerRatingRef'].clientHeight + this.$refs['customerRatingRef'].offsetTop
  }
}
</script>
<style lang="sass" scoped>
  .customerRatingComponent
    margin-top: 20px
    margin-right: 20px
    flex: 1
    background-color: #fff
    transition: all .5s ease
    &.reverse
      flex-direction: column-reverse
      display: flex
      .customerCommend
        margin: 0
        border: none
      .customerRatingTopSubmitFrom
        margin-top: 30px
        border-top: 1px solid #E9E9E9
    &:hover
      box-shadow: 10px 10px 10px -5px #ddd
    .customerRatingTopSubmitFrom
      padding: 30px 15px 30px 40px
      .title
        margin-bottom: 20px
        h4
          font-size: 36px
          color: #323232
          font-weight: bold
      .customerRatingContent
        .content
          font-size: 18px
          color: #646464
      .everyComment
        margin-top: 30px
        .rating
          display: flex
          font-size: 18px
          align-items: center
          >span
            color: #323232
          .rate
            margin-left: 20px
        .commendMsg
          display: flex
          flex-direction: column
          margin-bottom: 15px
          margin-top: 20px
          .commendMsgTextarea
            height: 150px
            /deep/ textarea
              height: 100%
              resize: none
          .commendMsgSubmit
            align-self: flex-end
            margin-top: 20px
            padding: 10px 45px
            background-color: #1281FC
            border-radius: 3px
            outline: none
            border: none
            &:action,
            &:before
              border: none
              box-shadow: none
            /deep/ span
              color: #fff
    .customerCommend
      margin-top: 30px
      border-top: 1px solid #E9E9E9
      padding: 0 45px
      .title
        padding: 25px 0 10px
        h5
          color: #323232
          font-size: 18px
          >span.commentTotal
            font-size: 18px
            color: #999999
      .commendBox
        .commendList
          display: flex
          flex-direction: column
          width: 100%
          .commendItem
            min-height: 155px
            display: flex
            padding: 20px 0
            border-bottom: 1px solid #E9E9E9
            .userAuther
              width: 60px
              align-self: flex-start
              height: 60px
              display: flex
              align-items: center
              background-color: #DAE9FF
              border-radius: 50%
              overflow: hidden
              >img
                width: 100%
                max-height: 100%
            .commendInfo
              flex: 1
              padding-left: 20px
              padding-top: 20px
              .authorName
                font-size: 22px
                color: #323232
                font-weight: bold
                >span.replyTime
                  color: #999
                  margin-left: 35px
                  font-weight: 400
              .authorRate
                display: flex
                height: 40px
                align-items: center
              .authorMsg
                display: flex
                word-break: break-all
                overflow: hidden
                color: #323232
                font-size: 18px
      .noComment
        width: 100%
        padding: 30px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        min-height: 350px
        .noTip
          margin-top: 15px
          span.tip
            color: #646464
            font-size: 18px
    .pageConfig
      margin: 30px 0
      padding: 0 45px
      display: flex
      justify-content: center
</style>
