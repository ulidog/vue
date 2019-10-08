<template>
  <section class="infoDetailComponent">
    <section class="content">
      <header class="titles">{{articleInfo.title}}</header>
      <article class="article-content" v-html="articleInfo.detail"></article>
    </section>
    <footer class="proNext" ref="proNext">
      <ul class="pager">
        <li class="pager-item" v-if="pagerInfo.previousGuide">
          <i class="iconfont icon-iconfontzuo"></i>
          <span>Previous Article :</span>
          <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: pagerInfo.previousGuide.articleId}))}}">{{pagerInfo.previousGuide.title}}</router-link>
        </li>
        <li class="pager-item" v-if="pagerInfo.nextGuide">
          <i class="iconfont icon-xiayiye"></i>
          <span>Next Article :</span>
          <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: pagerInfo.nextGuide.articleId}))}}">{{pagerInfo.nextGuide.title}}</router-link>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      params: {},
      searchParams: {
        keyWords: null
      },
      pageConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      articleInfo: {
        title: null,
        detail: null
      },
      pagerInfo: {},
      proNextOffsetTop: 0
    }
  },
  watch: {
    guidePublic: {
      handler (_new, _old) {
        const differend = JSON.stringify(_new) !== JSON.stringify(_old)
        if (differend && Object.keys(_new).length !== 0) {
          this.formData(_new)
        } else {
          console.log('参数未更改,不做查询处理')
        }
      },
      deep: true,
      immediate: true
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
    InitArticle () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}/guide/detail`, {params: Object.assign({}, this.params)})
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.articleInfo = res.data.data
            this.updataGuidePublic(Object.assign({}, this.guidePublic, this.articleInfo))
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchPagerInfo () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}/guide/previous-next`, {params: Object.assign({}, this.params)})
        .then(res => {
          if (res.data.success) {
            this.pagerInfo = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handlerScrollChange () {
      this.proNextOffsetTop = this.$refs['proNext'].offsetTop
      if (this.guidePublic.maxOffetTop !== this.proNextOffsetTop) {
        this.updataGuidePublic(Object.assign({}, this.guidePublic, {maxOffetTop: this.proNextOffsetTop}))
      }
    }
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    } catch (error) {
      this.$message({
        message: 'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
      return false
    }
    this.InitArticle()
    this.fetchPagerInfo()
  },
  updated () {
    if (this.$refs['proNext']) {
      this.handlerScrollChange()
    }
  },
  mounted () {
    this.proNextOffsetTop = this.$refs['proNext'].offsetTop
    this.updataGuidePublic(Object.assign({}, this.guidePublic, {maxOffetTop: this.proNextOffsetTop, isSearch: false}))
    window.addEventListener('scroll', this.handlerScrollChange)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handlerScrollChange)
  }
}
</script>s
<style lang="sass" scoped>
  .infoDetailComponent
    display: flex
    flex-direction: column
    .content
      border-right: 1px solid #D7DCE2
      padding-right: 2.5em
      .titles
        color: #1281FC
        font-size: 60px
        font-family: 'Arial-BoldMT'
        margin: 30px 0
        font-weight: bold
    .proNext
      margin: 30px 2.5em 150px 0
      border-top: 1px solid #D7DCE2
      padding: 30px 0 0 0
      .pager
        .pager-item
          color: #666
          font-size: 18px
          margin-bottom: 10px
          >span
            font-size: 18px
            color: #666
          >a
            color: #1281FC
            &:hover
              text-decoration: underline
</style>
