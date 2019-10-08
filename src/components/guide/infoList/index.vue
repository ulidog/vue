<template>
  <section class="infoListComponent" v-loading="loadingPage">
    <section class="content">
      <ul class="content-box">
        <li class="list-item" v-for="item in infoList" :key="item.articleId">
          <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
            <h4 class="titles">{{item.title}}</h4>
            <section class="content-none-img" v-if="formImg(item.imgUrl).length === 0">
              <article class="info">{{item.detail|HtmlToString}}</article>
            </section>
            <section class="content-one-img" v-if="formImg(item.imgUrl).length === 1">
              <section class="imgs">
                <img :src="formImg(item.imgUrl)" :alt="formImg(item.imgUrl)" :key="item.articleId">
              </section>
              <article class="info">{{item.detail|HtmlToString}}</article>
            </section>
            <section class="content-twos-img" v-if="formImg(item.imgUrl).length > 1">
              <section class="imgs">
                <section class="imgBox" v-for="(cimg, index) in formImg(item.imgUrl)" :key="index" v-show="index < 3">
                  <img v-lazy="cimg" :alt="index" :key="Math.random() * 10000">
                </section>
                <section v-if="formImg(item.imgUrl).length === 2" class="imgBox"></section>
              </section>
              <!-- 2019-6-9 屏蔽多图片文章显示 -->
              <!-- <article class="info">{{item.detail|HtmlToString}}</article> -->
            </section>
          </router-link>
        </li>
        <li class="list-item" v-if="infoList.length === 0">No related data found</li>
      </ul>
    </section>
    <footer class="pageConfig" ref="pageConfig" v-if="pageConfig.pageTotal !== 0">
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageCurrentChange"
        :current-page="pageConfig.pageNum"
        :page-size="pageConfig.pageSize"
        :total="pageConfig.pageTotal">
      </el-pagination>
    </footer>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      loadingPage: false,
      infoList: [],
      searchParams: {
        keyWords: null
      },
      pageConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      pageConfigOffsetTop: 0
    }
  },
  // filters: {
  //   HtmlToString (String) {
  //     var dd = String.replace(/<\/?.+?>/g, '')
  //     return dd
  //   }
  // },
  watch: {
    guidePublic: {
      handler (_new, _old) {
        try {
          const differend = _new.categoryId !== _old.categoryId
          if (differend && Object.keys(_new).length !== 0) {
            this.formData(_new)
            this.fetchSearchList()
          } else {
            console.log('参数未更改,不做查询处理')
          }
        } catch (err) {
          console.log('参数未更改,不做查询处理')
        }
      },
      deep: true,
      immediate: true
    },
    'pageConfig.pageNum': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.fetchSearchList()
          window.scrollTo(0, 0)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      guidePublic: 'guidePublic'
    })
  },
  methods: {
    ...mapMutations({
      updataGuidePublic: 'UPDATA_GUIDE_PUBLIC'
    }),
    formData (_info) {
      this.searchParams = Object.assign({}, _info)
    },
    fetchSearchList () {
      const _this = this
      _this.loadingPage = true
      const cloneFrom = Object.assign({}, _this.pageConfig, {fkCategoryId: _this.guidePublic.categoryId})
      _this.$axios.get(`${this.ljj_path}/guide/article-list`, {params: cloneFrom})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.loadingPage = false
            _this.infoList = res.data.data.rows
            _this.pageConfig.pageTotal = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
      setTimeout(() => {
        _this.loadingPage = false
      }, 10000)
    },
    formImg (_content) {
      let imgArr = []
      if (!_content) return []
      try {
        imgArr = JSON.parse(_content)
      } catch (err) {
        imgArr = [_content]
      }
      return imgArr
    },
    pageCurrentChange (_new) {
      this.pageConfig.pageNum = _new
    },
    handlerScrollChange () {
      this.pageConfigOffsetTop = this.$refs['pageConfig'].offsetTop
      if (this.guidePublic.maxOffetTop !== this.pageConfigOffsetTop) {
        this.updataGuidePublic(Object.assign({}, this.guidePublic, {maxOffetTop: this.pageConfigOffsetTop}))
      }
    }
  },
  created () {
    this.fetchSearchList()
  },
  updated () {
    if (this.$refs['pageConfig']) {
      this.handlerScrollChange()
    }
  },
  mounted () {
    try {
      this.pageConfigOffsetTop = this.$refs['pageConfig'].offsetTop
      this.updataGuidePublic(Object.assign({}, this.guidePublic, {maxOffetTop: this.pageConfigOffsetTop, isSearch: false}))
    } catch (error) {
      console.log('抛出异常')
    }
    window.addEventListener('scroll', this.handlerScrollChange)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handlerScrollChange)
  }
}
</script>
<style lang="sass" scoped>
  .infoListComponent
    display: flex
    flex-direction: column
    margin-bottom: 100px
    .content
      border-right: 1px solid #D7DCE2
      .content-box
        display: flex
        flex-direction: column
        .list-item
          // width: 100%
          cursor: pointer
          padding-bottom: 45px
          margin-right: 2.5em
          border-bottom: 1px solid #CED8E4
          &:hover
            .titles
              color: #1281FC
          a:hover
            color: #323232
          &:last-child
            border-bottom: none
          .titles
            color: #323232
            font-size: 36px
            font-weight: bold
            transition: all 0.3s ease
            padding: 20px 0
          .content-none-img
            .info
              color: #323232
              width: 100%
              flex: 1
              padding: 0 20px 0 20px
              font-size: 18px
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 4
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              word-break: break-word
          .content-one-img
            width: 100%
            display: flex
            .imgs
              width: 30%
              overflow: hidden
              display: flex
              align-items: center
              justify-content: center
              // max-height: 125px
              img
                width: 100%
                // height: 100%
            .info
              height: 8.5em
              line-height: 25px
              color: #323232
              width: 60%
              flex: 0 0 60%
              padding: 0 20px 0 20px
              font-size: 18px
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 6
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              word-break: break-word
          .content-twos-img
            width: 100%
            display: flex
            flex-direction: column
            .imgs
              display: flex
              width: 100%
              justify-content: space-between
              .imgBox
                overflow: hidden
                width: 30%
                flex: 0 0 30%
                img
                  width: 100%
                  height: 100%
            .info
              color: #323232
              padding: 20px 20px 20px 0
              font-size: 18px
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 3
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              word-break: break-word
              height: 4.8em
    /deep/ .pageConfig
      margin: 20px auto
      .el-pager>li.number
        border-radius: 50%
        padding: 0px
        width: 30px
        height: 30px
        min-width: 30px
        line-height: 30px
        margin: 0 10px
      .el-pager>.number.active
        background: #1281FC
        color: #fff
        width: 30px
        height: 30px
        padding: 0px
</style>
