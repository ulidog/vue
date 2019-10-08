<template>
  <section class="homeViews" v-loading="listLoading">
    <section class="card-list-box">
      <ul class="list-box">
        <li class="list-box-items" v-for="(item, index) in articleList" :key="index">
          <router-link :to="{path: '/information/details/' + item.seoId}">
            <header class="MajorImg">
              <img v-lazy="item.img" :alt="item.seoId" :key="item.seoId">
            </header>
            <footer class="right-content">
              <header class="article-title">
                <h3>{{ item.title }}</h3>
                <section class="autherinfo">
                  <span>{{ item.author }} &nbsp;</span>
                  <span>{{ item.addTime }}</span>
                  <img src="/static/img/consultation/icons/pic.png" alt="icons-pic">
                </section>
              </header>
              <section class="article-preview">
                <article class="preview">{{item.detail|HtmlToString}}</article>
              </section>
              <footer class="icons-btns-operation">
                <span class="icons">
                  <img src="/static/img/consultation/icons/information_view.png" alt="browse">
                  <span>{{item.countView}}</span>
                </span>
                <span class="icons">
                  <img src="/static/img/consultation/icons/information_message.png" alt="comments">
                  <span>{{item.countComment}}</span>
                </span>
                <span class="icons">
                  <img src="/static/img/consultation/icons/information_like.png" alt="like">
                  <span>{{item.countZan}}</span>
                </span>
                <span class="icons">
                  <img src="/static/img/consultation/icons/information_share.png" alt="share">
                  <span>{{item.countShare}}</span>
                </span>
              </footer>
            </footer>
          </router-link>
        </li>
      </ul>
    </section>
    <section class="pageConfig">
      <el-pagination
        layout="prev, pager, next"
        :current-page="pageConfig.pageNum"
        @current-change="handleCurrentChange"
        :total="pageConfig.pageTotal">
      </el-pagination>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      params: {},
      pageConfig: {
        pageNum: 1,
        pageSize: 6,
        pageTotal: 0
      },
      articleList: [],
      listLoading: false
    }
  },
  watch: {
    'pageConfig.pageNum': function () {
      console.log('监听回调!')
      this.fetchConsultationList()
    }
  },
  computed: {
    ...mapGetters({
      guid: 'Guid'
    })
  },
  // filters: {
  //   HtmlToString (String) {
  //     var dd = String.replace(/<\/?.+?>/g, '')
  //     return dd
  //   }
  // },
  created () {
    this.params = this.$route.query
    // console.log(this.params)
    if (this.params.type) {
      this.$emit('UploaderCateInfo', {status: true, query: this.params, title: this.params.title, name: 'consultation-home-page'})
      this.fetchConsultationList(this.params.type)
    } else {
      this.fetchConsultationList()
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageConfig.pageNum = val
    },
    fetchConsultationList (type) {
      const _this = this
      _this.listLoading = true
      _this.$axios.get(`${_this.ljj_path}news/list`, {params: Object.assign({}, _this.pageConfig, {userId: _this.guid, fkCategoryId: type || this.params.type})})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.articleList = res.data.data.rows
            _this.pageConfig.pageTotal = res.data.data.total
            _this.listLoading = false
            window.scrollTo(0, 0)
          }
        })
      setTimeout(() => {
        _this.listLoading = false
      }, 10000)
    }
  }
}
</script>
<style lang="sass" scoped>
  .homeViews
    display: flex
    width: 100%
    flex-direction: column
    .card-list-box
      width: 100%
      .list-box
        display: flex
        flex-direction: column
        margin-right: 40px
        .list-box-items
          background-color: #fff
          border-radius: 2px
          padding: 4.6875em 3.5625em 4em 3.5625em
          display: flex
          flex-direction: row
          width: 100%
          margin-bottom: 1.75em
          transition: box-shadow .5s ease
          &:hover
            box-shadow: 5px 5px 10px 3px rgba(0,0,0,.53);
            transition: box-shadow .5s ease
            a
              .article-title
                h3
                  color: #1281fc !important
              .article-preview
                .preview
                  color: #1281fc !important
          a
            display: flex
            flex-direction: row
            &:hover
              .article-title
                h3
                  color: #1281fc !important
          .MajorImg
            flex: 0 0 calc( 100% - 27.8125em )
            height: 27.8125em
            justify-content: center
            align-items: center
            width: 27.8125em
            overflow: hidden
            img
              width: 100%
              height: 100%
              transform-origin: 50% 50%
              transition: all 1s ease-out 0s
              &:hover
                transform: matrix(1.05, 0, 0, 1.05, 0, 0)
          .right-content
            flex: 0 0 27.8125em
            position: relative
            .article-title
              margin: 24px 20px 0 28px
              width: calc( 27.8125em - 48px )
              h3
                transition: all .5s ease
                font-size: 2.2em
                color: #444
                text-overflow: -o-ellipsis-lastline
                overflow: hidden
                text-overflow: ellipsis
                display: -webkit-box
                /*! autoprefixer: off */
                -webkit-box-orient: vertical
                /* autoprefixer: on */
                -webkit-line-clamp: 2
                max-width: 100%
                word-break: break-word
                font-weight: bold
              .autherinfo
                height: 45px
                font-size: 14px
                color: #666666
                display: flex
                align-items: center
            .article-preview
              margin: 10px 20px 0 28px
              .preview
                font-size: 1.125em
                color: #444
                text-overflow: -o-ellipsis-lastline
                overflow: hidden
                text-overflow: ellipsis
                display: -webkit-box
                /*! autoprefixer: off */
                -webkit-box-orient: vertical
                /* autoprefixer: on */
                -webkit-line-clamp: 12
                word-break: break-word
                max-height: 10em
                line-height: 1.3em
                &:hover
                  color: #1281fc
            .icons-btns-operation
              display: flex
              align-items: center
              margin: 0 20px 0 28px
              position: absolute
              bottom: 0
              span
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
    .pageConfig
      margin: 1.8em 0
      display: flex
      justify-content: center
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
