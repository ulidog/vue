<template>
  <section class="searchComponent">
    <header class="searchKeyWords">
      <span class="label">Search Results for:</span>
      <span class="value">{{searchParams.keyWords || 'Please enter a keyword search'}}</span>
    </header>
    <section class="list-boxs">
      <ul class="list-boxs-content">
        <li class="list-item" v-for="item in searchList" :key="item.articleId">
          <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
            <h4 class="guide-min-title">{{item.title}}</h4>
            <article class="article-info">{{item.detail | HtmlToString}}</article>
          </router-link>
        </li>
        <li class="list-item" v-if="searchList.length === 0">No related data found</li>
      </ul>
    </section>
    <footer class="pageConfig" v-if="pageConfig.pageTotal !== 0">
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
      searchParams: {
        keyWords: null
      },
      pageConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      searchList: []
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
          const differend = _new.keyWords || _old.keyWords || _new.keyWords !== _old.keyWords
          if (differend && Object.keys(_new).length !== 0) {
            this.formData(_new)
            this.fetchSearchList()
          } else {
            console.log('参数未更改,不做查询处理')
          }
        } catch (error) {
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
      const cloneFrom = Object.assign({}, this.pageConfig, {title: _this.guidePublic.keyWords})
      _this.$axios.get(`${_this.ljj_path}/guide/article-list`, {params: cloneFrom})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.searchList = res.data.data.rows
            _this.pageConfig.pageTotal = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    pageCurrentChange (_new) {
      this.pageConfig.pageNum = _new
    }
  },
  created () {
    this.fetchSearchList()
  },
  mounted () {
    this.updataGuidePublic(Object.assign({}, this.guidePublic, {isSearch: true}))
  }
}
</script>
<style lang="sass" scoped>
  .searchComponent
    display: flex
    flex-direction: column
    margin-bottom: 100px
    .searchKeyWords
      display: flex
      padding: 30px 0
      .label, .value
        color: #646464
        font-size: 36px
      .value
        margin-left: 20px
    .list-boxs
      border-right: 1px solid #D7DCE2
      padding-right: 2.5em
      .list-boxs-content
        display: flex
        flex-direction: column
        .list-item
          display: flex
          flex-direction: column
          &:hover
            .guide-min-title
              color: #1281FC
          .guide-min-title
            color: #323232
            font-size: 30px
            transition: all .3s ease
          .article-info
            margin: 24px 0
            line-height: 24px
            color: #909090
            font-size: 18px
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            /* autoprefixer: on */
            word-break: break-word
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
