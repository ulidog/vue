<template>
  <div class="info-container">
    <header class="questionInfo">
      <p>{{questionInfo.detail}}</p>
      <section class="ImgList" v-if="questionInfo.tFaqImgs.length !== 0">
        <div class="imgBox" v-for="imgList in questionInfo.tFaqImgs" :key="imgList.faqImgId">
          <img :src="imgList.url" :alt="imgList.faqImgId" :key="imgList.faqImgId">
        </div>
      </section>
      <div class="btn-info-content">
        <div class="leftShowClass">
          <span class="author">{{questionInfo.nickName}}</span>
          <span class="date">{{questionInfo.addTime}}</span>
          <span class="view">
            <i class="eye-icon icon"></i>
            <span class="number">{{questionInfo.countVisit}}</span>
          </span>
          <span class="share" @click="isShowShare = !isShowShare">
            <i class="share-icon icon"></i>
            <span class="number">{{questionInfo.countShare}}</span>
          </span>
          <span class="comments" @click="myCommons.isShow = !myCommons.isShow">
            <i class="msg-icon icon"></i>
            <span class="number">{{questionInfo.countComment}}</span>
          </span>
        </div>
        <div class="rightCommons" v-show="!myCommons.isShow">
          <transition name="el-fade-in">
            <el-button
              v-show="!myCommons.isShow"
              @click="myCommons.isShow = !myCommons.isShow"
              class="btn"
            >Answer</el-button>
          </transition>
        </div>
      </div>
      <vue-share
        v-if="isShowShare"
        :url="shareUrl"
        :title="questionInfo.detail"
        :description="questionInfo.detail"
        :quote="questionInfo.detail"
        @openChange="_openChange">
      </vue-share>
      <el-collapse-transition>
        <div class="meassage-content" v-show="myCommons.isShow">
          <div class="textarea-content">
            <el-input
              :class="{active: myCommons.msgSize>5000}"
              type="textarea"
              :rows="10"
              placeholder="Please enter the answer"
              v-model="myCommons.msg"
            ></el-input>
            <span
              :class="['RemainingSize', {active: myCommons.msgSize>5000}]"
            >{{myCommons.msgSize}}/5000</span>
          </div>
          <div class="bottom-btns">
            <span @click="myCommons.isShow = !myCommons.isShow">
              Pack up
              <i class="el-icon-caret-top"></i>
            </span>
            <transition name="el-fade-in">
              <el-button v-show="myCommons.isShow" class="btn" @click="answerSubmit">Submit</el-button>
            </transition>
          </div>
        </div>
      </el-collapse-transition>
    </header>
    <footer class="bottom-container-box">
      <div class="reply-content">
        <ul appear-active-class="reply-active" class="reply-box">
          <li class="reply-item" v-for="(item, index) in answerList.replyList" :key="index">
            <header class="replyAuthor">
              <img :src="item.headUrl" :alt="item.nickName">
              <div class="authorName">
                <h5>{{item.nickName}}</h5>
                <span class="time">{{item.addTime}}</span>
                <p>{{item.content}}</p>
              </div>
            </header>
            <section class="Article">
              <p>{{item.detail}}</p>
            </section>
            <footer class="btns-easy">
              <span v-if="selfId == item.fkUserId">
                <i class="del-icon icon" @click="delReply(item)"></i>
              </span>
              <span>
                <i class="msg-icon icon" @click="item.myCommons.isShow = !item.myCommons.isShow"></i>
                {{item.replyNum}}
              </span>
              <span>
                <i class="god-icon icon on" v-if="item.cancelZan" @click="unLike(item)"></i>
                <i class="god-icon icon" v-else @click="toLike(item)"></i>
                {{item.countLikes}}
              </span>
            </footer>
            <el-collapse-transition>
              <div class="meassage-content msg-inner" v-show="item.myCommons.isShow">
                <ul class="reply-comment-list">
                  <li
                    class="reply-comment-item"
                    v-for="(citem, cindex) in item.children"
                    :key="cindex"
                  >
                    <header class="replyAuthor">
                      <img :src="citem.fromUrl" :alt="citem.fromNickname">
                      <div class="authorName">
                        <h5>
                          <span class="formTo">
                            {{citem.fromNickname}} @ {{citem.toNickname}}
                          </span>
                          :{{citem.content}}
                        </h5>
                        <p>
                          <span class="time">{{citem.addTime}}</span>
                          <span>
                            <i
                              v-if="selfId == citem.fromUserId"
                              class="del-icon icon"
                              @click="delComment(citem)"
                            ></i>
                            <i class="msg-icon icon" @click="replyToReply(item,citem)"></i>
                          </span>
                        </p>
                      </div>
                    </header>
                  </li>
                  <span
                    class="moreChange"
                    @click="loadMoreCommons(item)"
                    v-if="item.myCommons.total > item.children.length ? true : false"
                  >More</span>
                </ul>
                <div class="textarea-content">
                  <p class="textarea-content-to">
                    <span>@{{item.myCommons.toUserName}}</span>
                    <span class="toComment" @click="replyComment(item)">to: {{item.nickName}}</span>
                  </p>
                  <el-input
                    :class="{active: item.myCommons.msgSize>5000}"
                    type="textarea"
                    :rows="10"
                    placeholder="Please enter the answer"
                    v-model="item.myCommons.msg"
                  ></el-input>
                  <span
                    :class="['RemainingSize', {active: item.myCommons.msg.length>5000}]"
                  >{{item.myCommons.msg.length}}/5000</span>
                </div>
                <div class="bottom-btns">
                  <span @click="item.myCommons.isShow = !item.myCommons.isShow">
                    Pack up
                    <i class="el-icon-caret-top"></i>
                  </span>
                  <transition name="el-fade-in">
                    <el-button
                      v-show="item.myCommons.isShow"
                      class="btn"
                      @click="replySubmit(item)"
                    >Submit</el-button>
                  </transition>
                </div>
              </div>
            </el-collapse-transition>
          </li>
          <el-pagination
            background layout="prev, pager, next"
            @current-change="answerListChange"
            :current-page="answerList.pageNum"
            :page-size="answerList.pageSize"
            :total="answerList.total"></el-pagination>
        </ul>
      </div>
    </footer>
  </div>
</template>
<script>
// import { getToken } from '@/utils/session'
import share from '@/components/consultation/share'
import { mapGetters } from 'vuex'
export default {
  components: {
    'vue-share': share
  },
  data () {
    return {
      shareUrl: null,
      isShowShare: false,
      selfId: localStorage.getItem('uid'),
      params: {},
      questionInfo: {
        detail: null,
        nickName: null,
        addTime: null,
        countVisit: 0,
        countComment: 0,
        countShare: 0,
        faqId: null,
        tFaqImgs: []
      },
      pageConfig: {
        pageNum: 1,
        pageSize: 20
      },
      answerList: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        replyList: []
      },
      myCommons: {
        isShow: false,
        msg: null,
        msgSize: 0
      }
    }
  },
  watch: {
    'myCommons.msg': {
      handler (_new) {
        this.myCommons.msgSize = _new.length
      },
      deep: true
    },
    questionInfo: {
      handler (_new) {
        this.$emit('questionInfo', _new)
      }
    }
  },
  computed: {
    ...mapGetters({
      token: 'token',
      guid: 'Guid'
    })
  },
  created () {
    try {
      this.params = JSON.parse(
        this.$base64.decode(this.$route.query.ebuyhouse)
      )
      if (this.params.id === undefined) {
        this.$message({
          message:
            'The parameter is incorrect and will return to the previous step',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 3000)
        return
      }
    } catch (err) {
      this.$message({
        message:
          'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
      return
    }
    this.fetchQuestionInfo()
    this.fetchReplyInfo()
    this.shareUrl = window.location.href
  },
  methods: {
    answerListChange (pageNum) {
      this.answerList.pageNum = pageNum
      this.fetchReplyInfo()
    },
    replyToReply (item, citem) {
      item.myCommons.toType = 'reply'
      item.myCommons.toUserName = citem.fromNickname
      item.myCommons.toUserId = citem.fromUserId
      item.myCommons.targetId = citem.replyId
    },
    loadMoreCommons (item) {
      item.myCommons.pageNum++
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}reply/list/by-comment`, {
          params: {
            commentId: item.commentId,
            pageSize: item.myCommons.pageSize,
            pageNum: item.myCommons.pageNum
          }
        })
        .then(res => {
          if (res.data.success) {
            item.myCommons.pageNum = res.data.data.pageNum
            item.myCommons.total = res.data.data.total
            item.children = [...item.children, ...res.data.data.rows]
          }
        })
    },
    delComment (item) {
      const _this = this
      _this
        .$axios({
          url: `${this.ljj_path}reply/del-comment`,
          method: 'POST',
          params: {
            replyId: item.replyId,
            fromUserId: _this.selfId
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            _this.fetchReplyInfo()
          }
        })
    },
    delReply (item) {
      const _this = this
      _this
        .$axios({
          url: `${this.ljj_path}comment/del-comment`,
          method: 'POST',
          params: {
            commentId: item.commentId,
            fkUserId: item.fkUserId
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            _this.fetchReplyInfo()
          }
        })
    },
    // 点赞
    toLike (item) {
      const _this = this
      _this
        .$axios({
          url: `${this.ljj_path}zan/like`,
          method: 'POST',
          params: {
            fkTargetId: item.commentId,
            fkUserId: _this.guid
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            item.cancelZan = 1
            item.countLikes++
          }
        })
    },
    // 取消点赞
    unLike (item) {
      const _this = this
      _this
        .$axios({
          url: `${this.ljj_path}zan/cancel-like`,
          method: 'POST',
          params: {
            fkTargetId: item.commentId,
            fkUserId: _this.guid
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            item.cancelZan = 0
            item.countLikes--
          }
        })
    },
    // 回复评论
    replySubmit (item) {
      const _this = this
      if (!this.token) {
        _this.$store.commit('signOut', true)
      } else {
        _this
          .$axios({
            url: `${this.ljj_path}reply/add-reply`,
            method: 'POST',
            params: {
              fkCommentId: item.commentId,
              fkTargetId: item.myCommons.targetId,
              targetType: 1,
              toUserId: item.myCommons.toUserId,
              content: item.myCommons.msg
            }
          })
          .then(res => {
            if (res.data.success) {
              _this.$message.success(res.data.msg)
              item.myCommons.msg = null
              item.myCommons.isShow = !item.myCommons.isShow
              _this.fetchReplyInfo()
            }
          })
      }
    },
    // 提交
    answerSubmit () {
      const _this = this
      if (!this.token) {
        _this.$store.commit('signOut', true)
      } else {
        _this.$axios
          .post(`${this.ljj_path}comment/add-comment`, {
            fkTargetId: _this.questionInfo.faqId,
            targetType: 'faq',
            content: this.myCommons.msg
          })
          .then(res => {
            if (res.data.success) {
              _this.$message.success(res.data.msg)
              _this.myCommons.msg = null
              _this.myCommons.isShow = !_this.myCommons.isShow
              _this.fetchReplyInfo()
            }
          })
      }
    },
    // 获取问题详情
    fetchQuestionInfo () {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}faq/detil`, { params: { faqId: this.params.id } })
        .then(res => {
          if (res.data.success) {
            console.log(res.data)
            _this.questionInfo = res.data.data
          }
        })
    },
    // 获取评论
    fetchCommentInfo (item) {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}reply/list/by-comment`, {
          params: {
            commentId: item.commentId,
            pageSize: item.myCommons.pageSize,
            pageNum: item.myCommons.pageNum
          }
        })
        .then(res => {
          if (res.data.success) {
            item.myCommons.pageSize = res.data.data.pageSize
            item.myCommons.pageNum = res.data.data.pageNum
            item.myCommons.total = res.data.data.total
            item.children = res.data.data.rows
          }
        })
    },
    // 获取评论
    fetchReplyInfo () {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}comment/list`, {
          params: {
            targetType: 'faq',
            fkTargetId: _this.params.id,
            pageSize: _this.answerList.pageSize,
            pageNum: _this.answerList.pageNum,
            fkUserId: _this.guid
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.answerList.total = res.data.data.total
            _this.answerList.replyList = res.data.data.rows.map(item => {
              item.myCommons = {
                toUserName: item.nickName,
                toUserId: item.fkUserId,
                targetId: item.commentId,
                toType: 'comment',
                isShow: false,
                msg: '',
                msgSize: 0,
                pageNum: 1,
                pageSize: 5,
                total: 0
              }
              item.children = []
              _this.fetchCommentInfo(item)
              return item
            })
          }
        })
    },
    // 分享回调
    _openChange () {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}faq/share/plus-one`, {
          params: {
            faqId: this.params.id
          }
        })
        .then(res => {
          if (res.data.success) {
            _this.fetchQuestionInfo()
          }
        })
    }
  }
}
</script>
<style lang='sass' scoped>
  .info-container
    .icon
      width: 24px
      height: 24px
      vertical-align: middle
      display: inline-block
      background-size: 100%
      background-repeat: no-repeat
      cursor: pointer
      &.del-icon
        background-image: url(/static/img/QACommunity/delete.png)
        &:hover
          background-image: url(/static/img/QACommunity/delete_pre.png)
      &.msg-icon
        background-image: url(/static/img/QACommunity/message.png)
        &:hover
          background-image: url(/static/img/QACommunity/message_pre.png)
      &.eye-icon
        background-image: url(/static/img/QACommunity/view.png)
      &.god-icon
        background-image: url(/static/img/QACommunity/good.png)
        &:hover
          background-image: url(/static/img/QACommunity/good_pre.png)
        &.on
          background-image: url(/static/img/QACommunity/good_pre.png)
      &.share-icon
        background-image: url(/static/img/QACommunity/share.png)
        &:hover
          background-image: url(/static/img/QACommunity/share_pre.png)
    .questionInfo
      padding: 1.875em 1.875em 1.5625em 3.75em
      background-color: #fff
      font-size: 1.125em
      color: #444
      transition: all 0.5s ease
      &:hover
        box-shadow: 1px 2px 10px 0px #ddd
        transition: all 0.5s ease
      >p
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        word-break: break-word
      .ImgList
        margin-top: 20px
        display: flex
        align-items: center
        .imgBox
          width: 12.25em
          margin-right: 15px
          overflow: hidden
          img
            width: 100%
      .btn-info-content
        height: 45px
        display: flex
        justify-content: space-between
        align-items: flex-end
        .leftShowClass
          display: flex
          line-height: 24px
          span
            color: #999
            font-size: 0.875em
            padding: 0 0.9rem
            cursor: pointer
          >span:first-child
            padding-left: 0
          .view,.share,.comments
            display: flex
            align-items: center
        .rightCommons
          /deep/ .btn
            border: none
            background-color: #f28e44
            color: #fff
            font-size: 1.25em
            display: flex
            height: 40px
            padding: 0 30px
            transition: all linear 0.2s
            &:hover
              padding: 0 34px
      .meassage-content
        padding-top: 30px
        .textarea-content
          position: relative
          /deep/ .el-textarea
            .el-textarea__inner
              transition: all 0.5s ease
              resize: none
              &:hover
                border-color: #ff3366
                transition: all 0.5s ease
              &:focus
                border-color: #ff3366
                transition: all 0.5s ease
          /deep/ .el-textarea.active
            .el-textarea__inner
              color: #ff3366
          .RemainingSize
            position: absolute
            bottom: .5em
            right: .5em
            color: #999
          .RemainingSize.active
            color: #ff3366
        .bottom-btns
          display: flex
          justify-content: space-between
          height: 45px
          align-items: center
          padding-top: 30px
          /deep/ .btn
            border: none
            background-color: #f28e44
            color: #fff
            font-size: 1.25em
            display: flex
            height: 40px
            padding: 0 30px
            transition: all linear 0.2s
            &:hover
              padding: 0 34px
          >span
            color: #999
            font-size: 14px
            vertical-item: middle
            cursor: pointer
    .bottom-container-box
      .meassage-content
        padding-top: 0!important
      .reply-content
        .reply-box
          /deep/ .el-pagination
            margin-top: 50px
          .reply-item
            background-color: #fff
            padding: 25px 50px
            margin-top: 20px
            display: flex
            flex-direction: column
            .replyAuthor
              height: auto
              display: flex
              img
                width: 50px
                height: 50px
                min-width: 50px
                border-radius: 50%
              .authorName
                margin-left: 15px
                display: flex
                flex-direction: column
                justify-content: center
                >h5
                  font-size: 1.125em
                  color: #444
                >span
                  color: #999
                  font-size: 0.875em
                >p
                  font-size: 1.125em
                  color: #444
                  margin-top: 0.4em
                  word-break: break-word
            .Article
              margin-left: 65px
              margin-top: 10px
              p
                color: #666
                font-size: 1.125em
                line-height: 1.125em
            .btns-easy
              display: flex
              justify-content: flex-end
              margin-right: 30px
              >span
                margin-left: 20px
                vertical-align: middle
                color: #999
            .meassage-content
              padding-top: 30px
              .textarea-content
                position: relative
                /deep/ .el-textarea
                  .el-textarea__inner
                    transition: all 0.5s ease
                    resize: none
                    &:hover
                      border-color: #ff3366
                      transition: all 0.5s ease
                    &:focus
                      border-color: #ff3366
                      transition: all 0.5s ease
                /deep/ .el-textarea.active
                  .el-textarea__inner
                    color: #ff3366
                .RemainingSize
                  position: absolute
                  bottom: .5em
                  right: .5em
                  color: #999
                .RemainingSize.active
                  color: #ff3366
                .textarea-content-to
                  display: flex
                  justify-content: space-between
                  line-height: 24px
                  font-size: 16px
                  color: #444
                  font-weight: bold
                  .toComment
                    color:#2397E5
                    cursor: pointer
              .bottom-btns
                display: flex
                justify-content: space-between
                height: 45px
                align-items: center
                padding-top: 30px
                /deep/ .btn
                  border: none
                  background-color: #f28e44
                  color: #fff
                  font-size: 1.25em
                  display: flex
                  height: 40px
                  padding: 0 30px
                >span
                  color: #999
                  font-size: 14px
                  vertical-item: middle
                  cursor: pointer
              .reply-comment-list
                padding: 1em 0 1em 70px
                .moreChange
                  font-size: 14px
                  cursor: pointer
                  display: flex
                  width: 100%
                  justify-content: center
                  padding: 0
                  color: #444
                  opacity: 0
                  height: 0
                  transition: all .5s ease
                  padding-top: 4em
                  margin-top: -4em
                  &:hover
                    text-decoration-line: underline
                    color: #2397e5
                    cursor: pointer
                    padding: 4em 0 2em
                    opacity: 1
                    transition: all .5s ease
                .reply-comment-item
                  padding: 2em 0
                  .replyAuthor
                    height: auto
                    .authorName
                      width: calc(100% - 65px)
                      overflow: hidden
                      h5
                        word-break: break-word
                        margin-bottom: 5px
                        .formTo
                          color: #2397E5
                      >p
                        display: flex
                        justify-content: space-between
                        color: #999
                        font-size: 0.875em
                        .icon
                          vertical-align: middle
                          margin-left: 20px
</style>
