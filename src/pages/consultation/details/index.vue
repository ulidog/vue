<template>
  <section class="detailsViews">
    <header class="article-title">
      <h3 class="subtitle">{{artilceInfo.title}}<img src="/static/img/consultation/icons/pic.png" alt="icons-pic"></h3>
    </header>
    <section class="article-author-info">
      <span class="author-name">{{artilceInfo.author}}</span>
      <span class="author-time">{{artilceInfo.addTime}}</span>
    </section>
    <section class="article-content">
      <article v-html="artilceInfo.detail"></article>
    </section>
    <section class="share">
      <section :class="{'like_big': true, 'strol_blue': artilceInfo.cancelZan !== 0}" @click="likeChange">
        <img src="/static/img/consultation/icons/like_big.png" v-if="artilceInfo.cancelZan === 0" alt="like_big">
        <img src="/static/img/consultation/icons/like_big_true.png" v-else alt="like_big_true">
      </section>
      <section class="share_big" @click="showShare = !showShare">
        <img src="/static/img/consultation/icons/share_big.png" alt="share_big">
      </section>
      <el-collapse-transition>
        <div v-show="showShare">
          <common-share @openChange="openChange"></common-share>
        </div>
      </el-collapse-transition>
    </section>
    <section class="btnsComponent">
      <common-btns-component :iconsInfo="iconsInfo"></common-btns-component>
    </section>
    <section class="PreNextArticle">
      <section class="pre" v-if="proNextInfo.previousNews">
        <span>Previous Article : <router-link :to="{path: '/information/details/' + proNextInfo.previousNews.seoId}"><span class="MajorColor">{{ proNextInfo.previousNews.title }}</span></router-link></span>
      </section>
      <section class="next" v-if="proNextInfo.nextNews">
        <span>Next Article : <router-link :to="{path: '/information/details/' + proNextInfo.nextNews.seoId}"><span class="MajorColor">{{ proNextInfo.nextNews.title }}</span></router-link></span>
      </section>
    </section>
    <section class="Comments">
      <header class="coments-titles">
        <h3 class="titles">Comments</h3>
      </header>
      <section class="coments-myMsg">
        <section class="left-msg">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            @focus="mmp"
            @blur="mmps"
            v-model="comments.beforemsg">
          </el-input>
          <img src="/static/img/consultation/icons/write.png" alt="write" class="isNulllIcon" v-if="showSpell === 1" v-show="comments.beforemsg == null || comments.beforemsg.length == 0">
        </section>
        <section class="right-submit">
          <el-button type="primary" round size="small" class="sendmsgInput" @click="fetchComonsChange">Send</el-button>
        </section>
      </section>
      <footer class="comentslistbox" v-loading="comonLoading">
        <ul class="comentsbox">
          <template v-for="item in msgList">
            <li class="msg-list" :key="item.id">
              <section class="author-content-info">
                <header class="imgIntro">
                  <img :src="item.authorImg" :alt="item.authorName">
                  <section class="authorInfo">
                    <span @click="openMsgBord(item, 0)">{{item.authorName}}</span>
                    <p>{{item.msg}}</p>
                  </section>
                </header>
                <footer class="times">
                  <span>{{item.time}}</span>
                </footer>
              </section>
              <footer class="btns">
                <ul class="icons">
                  <li class="icons-items" @click="openMsgBord(item, 0)">
                    <img src="/static/img/consultation/icons/comments.png" alt="msg">
                    <span>{{item.commonNum}}</span>
                  </li>
                  <li class="icons-items">
                    <img :src="item.isLike ? likes.likepre : likes.like" alt="like" @click="fetchReply(item.isLike?1:0, item.id)">
                    <span>{{item.likeNum}}</span>
                  </li>
                </ul>
              </footer>
              <section class="childrenMsg" v-if="item.children !== null && item.children.length !== 0">
                <ul class="childComentsbox" v-loading="item.childLoading">
                  <li class="msg-list" v-for="childItem in item.children" :key="childItem.id">
                    <section class="author-content-info">
                      <header class="imgIntro">
                        <img :src="childItem.authorImg" :alt="childItem.authorName" class="secImg" height="25px" width="25px">
                        <section class="authorInfo">
                          <section class="authortitle">
                            <span @click="openMsgBord(item, 1, childItem)">{{childItem.authorName}}: </span>
                            <p>reply</p>
                            <span @click="openMsgBord(item, 2, childItem)"> @{{childItem.toThorName}}</span>
                            {{childItem.msg}}
                          </section>
                        </section>
                      </header>
                      <footer class="times">
                        <span>{{childItem.time}}</span>
                      </footer>
                    </section>
                    <footer class="btns">
                      <ul class="icons">
                        <li class="icons-items" @click="openMsgBord(item, 1, childItem)">
                          <img src="/static/img/consultation/icons/comments.png" alt="msg">
                        </li>
                      </ul>
                    </footer>
                  </li>
                  <span
                    class="moreChange"
                    @click="loadMoreCommons(item.id, item.children[item.children.length-1].pageNum+1, item.index, item.childLoading)"
                    v-if="item.children[item.children.length-1].totalPage>item.children[item.children.length-1].pageNum ? true : false">More</span>
                </ul>
              </section>
            </li>
            <li :key="item.id * MathRandom" class="showMsgBord" v-show="item.isCommon">
              <section class="left-msg">
                <el-input
                  type="textarea"
                  autofocus
                  :autosize="{ minRows: 4, maxRows: 4}"
                  :placeholder="comments.placeHolder"
                  v-model="comments.msg"
                  @blur="colseCommonChange">
                </el-input>
                <!-- <img src="/static/img/consultation/icons/write.png" alt="write" class="isNulllIcon" v-show="comments.msg == null || comments.msg.length == 0"> -->
              </section>
              <section class="right-submit">
                <el-button type="primary" size="small" class="sendmsgInput" @click="fetchReplyChange" style="border-radius:16px">Send</el-button>
              </section>
            </li>
          </template>
        </ul>
        <section class="pageConfig">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageConfig.pageSize"
            @current-change="handleCurrentChange"
            :total="pageConfig.pageTotal">
          </el-pagination>
        </section>
      </footer>
    </section>
  </section>
</template>
<script>
import btnsComponent from '@/components/consultation/commonComponents/btnsComponent'
import share from '@/components/consultation/share'
import { getToken } from '@/utils/session'
import { mapGetters } from 'vuex'
export default {
  components: {
    'common-btns-component': btnsComponent,
    'common-share': share
  },
  data () {
    return {
      showSpell: 1,
      params: {},
      showShare: false,
      likes: {
        like: '/static/img/consultation/icons/like.png',
        likepre: '/static/img/consultation/icons/like_pre.png'
      },
      iconsInfo: {
        browse: 0,
        comments: 0,
        like: 0,
        share: 0
      },
      artilceInfo: {
        title: null,
        name: null,
        time: null,
        article: null,
        preArticle: 50,
        preArticleName: null,
        nextArticle: 52,
        nextArticleName: null
      },
      comments: {
        beforemsg: null,
        msg: null,
        placeHolder: null,
        type: null,
        id: null,
        xid: null,
        userid: null
      },
      msgList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      cpageConfig: {
        pageNum: 1,
        pageSize: 2,
        pageTotal: 0
      },
      proNextInfo: {
        nextNews: null,
        previousNews: null
      },
      // 评论的loading
      comonLoading: false
    }
  },
  watch: {
    'pageConfig.pageNum': function () {
      // console.log('监听回调!')
      this.fetchOneCommotsChange()
    }
  },
  computed: {
    ...mapGetters({
      guid: 'Guid'
    }),
    MathRandom: () => {
      return Number.parseInt(Math.random() * 100)
    }
  },
  created () {
    this.params = this.$route.params
    if (!this.params.id) {
      this.$message({
        message: 'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
    }
  },
  methods: {
    mmp () {
      this.showSpell = 2
    },
    mmps () {
      if (this.comments.beforemsg === null || this.comments.beforemsg.length === 0) {
        this.showSpell = 1
      }
    },
    openMsgBord (parent, type, child) {
      // 关闭以前的
      this.closeMsgBord()
      // 设置回复@谁的
      switch (type) {
        case 0:
          this.comments.placeHolder = `@${parent.authorName}`
          this.comments.xid = parent.id
          this.comments.userid = parent.userid
          break
        case 1:
          this.comments.placeHolder = `@${child.authorName}`
          this.comments.xid = child.xid
          this.comments.userid = child.fromUserId
          break
        case 2:
          this.comments.placeHolder = `@${child.toThorName}`
          this.comments.xid = child.xid
          this.comments.userid = child.toUserId
          break
      }
      this.comments.id = parent.id
      this.comments.type = type
      // 打开当前的
      parent.isCommon = true
    },
    closeMsgBord () {
      this.msgList.map(item => {
        item.isCommon = false
        return item
      })
    },
    colseCommonChange () {
      if (this.comments.msg === null || this.comments.msg === '') {
        this.closeMsgBord()
      }
    },
    handleCurrentChange (val) {
      this.pageConfig.pageNum = val
    },
    // 获取文章详情
    fetchConsultationIntro () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}news/seo/view-detail`, {params: {seoId: _this.params.id, fkUserId: _this.guid}})
        .then(res => {
          // console.log(res.data)
          if (res.data.success) {
            _this.artilceInfo = res.data.data
            _this.iconsInfo = {
              browse: _this.artilceInfo.countView || 0,
              comments: _this.artilceInfo.countComment || 0,
              like: _this.artilceInfo.countZan || 0,
              share: _this.artilceInfo.countShare || 0
            }
            _this.$emit('UploaderInfo', {status: true, title: _this.artilceInfo.title})
            _this.fetchProNextInfo()
            _this.fetchOneCommotsChange()
          }
        })
    },
    // 获取上下页的数据
    fetchProNextInfo () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}news/previous-next`, {params: {newsId: _this.artilceInfo.newsId, addTime: _this.artilceInfo.addTime}})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.proNextInfo = Object.assign({}, _this.proNextInfo, res.data.data)
          }
        })
    },
    // 点赞
    likeChange () {
      const _this = this
      // if (!getToken()) {
      //   this.$store.commit('signOut', true)
      // } else {
      _this.$axios({
        url: `${this.ljj_path}news/zan`,
        method: 'post',
        params: {
          status: Number(_this.artilceInfo.cancelZan) === 0 ? 2 : 1,
          fkNewsId: _this.artilceInfo.newsId,
          fkUserId: _this.guid
        }
      })
        .then(res => {
          if (res.data.success) {
            _this.fetchConsultationIntro()
          }
        })
      // }
    },
    // 分享回调
    openChange (_e) {
      console.log(_e)
      const _this = this
      _this.$axios.post(`${this.ljj_path}news/share`, {newsId: _this.artilceInfo.newsId})
        .then(res => {
          console.log(res.data.success)
        })
    },
    // 获取评论数据 一级
    fetchOneCommotsChange () {
      const _this = this
      _this.comonLoading = true
      _this.$axios.get(`${this.ljj_path}comment/list`, {
        params: Object.assign({}, {
          replySize: 2,
          targetType: 'news',
          fkTargetId: _this.artilceInfo.newsId,
          fkUserId: _this.guid
        }, _this.pageConfig)})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            // console.log(res.data)
            const _data = res.data.data.rows
            _this.pageConfig.pageTotal = res.data.data.total
            _this.msgList = _data.map((item, index) => {
              _this.fetchTwoCommotsChange(item.commentId, index)
              return {
                id: item.commentId,
                xid: item.fkCommentId,
                userid: item.fkUserId,
                index: index,
                authorImg: item.headUrl,
                authorName: item.nickName,
                msg: item.content,
                time: item.addTime,
                isLike: item.cancelZan !== 0,
                isCommon: false,
                commonNum: item.replyNum,
                likeNum: item.countLikes,
                children: [],
                childLoading: false
              }
            })
            // console.log(_this.msgList)
          }
          setTimeout(() => {
            _this.comonLoading = false
          }, 1000)
        })
    },
    // 获取评论数据 二级
    fetchTwoCommotsChange (id, index, xoptions) {
      const _this = this
      _this.$axios.get(`${this.ljj_path}reply/list/by-comment`, {
        params: Object.assign({}, {
          commentId: id
        }, _this.cpageConfig, xoptions)})
        .then((res, resolved) => {
          // console.log(res)
          if (res.data.success) {
            // console.log(res.data)
            const _data = res.data.data.rows
            _this.msgList[index].children = [..._this.msgList[index].children, ..._data.map(item => {
              return {
                id: item.commentId,
                xid: item.replyId,
                toUserId: item.toUserId,
                fromUserId: item.fromUserId,
                authorImg: item.fromUrl,
                authorName: item.fromNickname,
                toThorName: item.toNickname,
                toThorImg: item.toUrl,
                msg: item.content,
                time: item.addTime,
                isLike: item.cancelZan !== 0,
                isCommon: false,
                totalPage: res.data.data.totalPage,
                pageNum: res.data.data.pageNum
              }
            })]
            setTimeout(() => {
              _this.comonLoading = false
            }, 300)
          }
        })
    },
    // 加载二级评论更多数据
    loadMoreCommons (_id, _pageNum, _index) {
      const _this = this
      this.msgList[_index].childLoading = true
      this.fetchTwoCommotsChange(_id, _index, {pageNum: _pageNum})
      setTimeout(() => {
        _this.msgList[_index].childLoading = false
      }, 500)
    },
    // 评论
    fetchComonsChange () {
      const _this = this
      if (_this.comments.beforemsg === null || _this.comments.beforemsg === '') {
        return
      }
      if (!getToken()) {
        this.$store.commit('signOut', true)
      } else {
        _this.$axios.post(`${this.ljj_path}comment/add-comment`, {fkTargetId: _this.artilceInfo.newsId, targetType: 'news', content: _this.comments.beforemsg})
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              _this.$message.success(res.data.msg)
              _this.comments.beforemsg = null
              _this.fetchOneCommotsChange()
            }
          })
      }
    },
    // 高级评论
    fetchReplyChange () {
      const _this = this
      if (_this.comments.msg === null || _this.comments.msg === '') {
        return
      }
      if (!getToken()) {
        this.$store.commit('signOut', true)
      } else {
        _this.$axios({
          url: `${this.ljj_path}reply/add-reply`,
          method: 'POST',
          params: {
            fkCommentId: _this.comments.id,
            fkTargetId: _this.comments.xid,
            targetType: _this.comments.type !== 0 ? 1 : 2,
            toUserId: _this.comments.userid,
            content: _this.comments.msg
          }
        })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              _this.$message.success(res.data.msg)
              _this.comments.msg = null
              _this.fetchOneCommotsChange()
            }
          })
      }
    },
    // 评论点赞
    fetchReply (isTrue, fkid) {
      const replyURL = ['zan/like', 'zan/cancel-like']
      const _this = this
      _this.$axios({
        url: `${this.ljj_path}${replyURL[isTrue]}`,
        method: 'post',
        params: {
          fkTargetId: fkid,
          fkUserId: _this.guid
        }
      })
        .then(res => {
          if (res.data.success) {
            _this.fetchOneCommotsChange()
          }
        })
    }
  },
  mounted () {
    this.fetchConsultationIntro()
  }
}
</script>
<style lang="sass" scoped>
  .detailsViews
    margin-right: 40px
    padding: 25px 13.875em 130px 11.25em
    background-color: #fff
    .article-title
      display: flex
      align-items: center
      h3
        color: #2599cc
        font-size: 1.5em
        height: 50px
        display: flex
        align-items: center
        word-break: break-word
        img
          margin: 5px 0 0 10px
    .article-author-info
      display: flex
      align-items: center
      height: 30px
      span
        color: #999999
        font-size: 0.875em
      .author-time
        margin-left: 2em
    .article-content
      margin: 20px 0
      overflow: hidden
      width: 100%
      /deep/ article
        color: #444
        word-break: break-word
        position: relative
        max-width: 100%
        img,div,p,span,video,audio,section,iframe
          max-width: 100%
    .share
      display: flex
      align-items: center
      justify-content: center
      height: 190px
      .like_big,.share_big
        width: 4.375em
        height: 4.375em
        border: 1px solid #666666
        border-radius: 50%
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        transition: box-shadow .4s ease
        margin: 0 12px
        &:hover
          box-shadow: 1px 1px 10px 1px #ddd
          transition: box-shadow .4s ease
      .strol_blue
        border: 1px solid #1281fc
    .PreNextArticle
      margin: 50px 0 0 0
      display: flex
      flex-direction: column
      align-items: flex-start
      .pre,.next
        height: 40px
        display: flex
        align-items: center
        span
          color: #666
          font-size: 1em
          .MajorColor
            color: #2397e5
            cursor: pointer
            &:hover
              text-decoration: underline
    .Comments
      .coments-titles
        margin: 40px 0
        h3
          height: 40px
          display: flex
          align-items: center
          background-color: #bcd3e5
          font-size: 1.125em
          color: #444
          padding-left: 10px
      .coments-myMsg
        display: flex
        width: 100%
        .left-msg
          flex: 0 0 calc( 100% - 6.25em )
          width: calc( 100% - 6.25em )
          position: relative
          .el-textarea
            position: relative
            z-index: 10
            background-color: transparent
            /deep/ textarea
              background-color: transparent
          .isNulllIcon
            position: absolute
            padding: 5px
            top: 0
            left: 0
            width: 30px
            height: 30px
            user-select: none
            z-index: 9
        .right-submit
          flex: 0 0 6.25em
          width: 6.25em
          display: flex
          align-items: flex-end
          justify-content: center
          .sendmsgInput
            // height: 38px
            padding: 9px 15px
            background-color: #bcd3e5
            color: #444
            border: none
      .comentslistbox
        .comentsbox
          display: flex
          flex-direction: column
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
            &:hover
              text-decoration-line: underline
              color: #2397e5
              cursor: pointer
              padding: 10px 0
              opacity: 1
              transition: all .5s ease
          .msg-list
            margin-top: 20px
            display: flex
            flex-direction: column
            .author-content-info
              display: flex
              position: relative
              .imgIntro
                display: flex
                position: relative
                width: 100%
                img
                  width: 57px
                  height: 50px
                  border-radius: 50%
                  overflow: hidden
                  // flex: 0 0 50px
                  margin: 0 1.09375em
                .secImg
                  width: 33px
                  height: 30px
                .authorInfo
                  display: flex
                  flex-direction: column
                  width: 100%
                  span,p
                    display: flex
                    flex-wrap: wrap
                  span
                    color: #2397e5
                    font-size: 1.125em
                    cursor: pointer
                  p
                    margin-top: 10px
                    color: #666666
                    font-size: 1em
                  .authortitle
                    line-height: 25px
                    max-width: 75%
                    word-break: break-word
                    position: relative
                    vertical-align: middle
                    span
                      font-size: 1em
                      position: relative
                      display: inline-block
                      vertical-align: middle
                    p
                      margin: 0
                      position: relative
                      display: inline-block
                      vertical-align: middle
              .times
                position: absolute
                right: 0
                top: 0
                span
                  color: #999999
                  font-size: 0.875em
            .btns
              display: flex
              width: 100%
              .icons
                display: flex
                width: 100%
                justify-content: flex-end
                .icons-items
                  margin-left: 2.1875em
                  cursor: pointer
                  img
                    width: 22px
                    height: 22px
                    vertical-align: middle
                  span
                    font-size: 14px
                    vertical-align: middle
                    color: #444
            .childrenMsg
              margin-left: 4.6875em
            &:hover+.moreChange
              padding: 10px 0
              opacity: 1
              transition: all .5s ease
          .showMsgBord
            margin-left: 4.6875em
            display: flex
            .left-msg
              flex: 0 0 calc( 100% - 6.25em )
              width: calc( 100% - 6.25em )
              position: relative
              .el-textarea
                position: relative
                z-index: 10
                background-color: transparent
                /deep/ textarea
                  background-color: transparent
              .isNulllIcon
                position: absolute
                padding: 5px
                top: 0
                left: 0
                width: 30px
                height: 30px
                user-select: none
                z-index: 9
            .right-submit
              flex: 0 0 6.25em
              width: 6.25em
              display: flex
              align-items: flex-end
              justify-content: center
              .sendmsgInput
                background-color: #bcd3e5
                color: #444
                border: none
        .pageConfig
          margin: 1.8em 0
          display: flex
          justify-content: flex-end
          background-color: transparent
          .el-pagination
            background-color: transparent
            /deep/ button
              background-color: transparent
            /deep/ li
              background-color: transparent
              padding: 0
              height: 2em
              width: 2em
              min-width: 2em
              margin: 0 0.5em
            /deep/ li.active
              border-radius: 50%
              background-color: #639fd6
              color: #fff
              padding: 0
              height: 2em
              width: 2em
</style>
