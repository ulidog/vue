<template>
  <section class="userguideIndexContentComponent">
    <header class="userguide-header-titles">
      <h3 class="titles">User Guide</h3>
      <router-link :to="{name: 'guideList'}">
        <span>More ></span>
      </router-link>
    </header>
    <section class="userguide-content">
      <header class="userguide-tabs">
        <ul class="tab-bts-box">
          <li :class="['tab-bts-item', thisCatetorId === item.categoryId ? 'active' : '']" v-for="item in categoriesList" :key="item.categoryId" @click="SwitchCatetorChange(item)">{{item.type}}</li>
        </ul>
      </header>
      <section class="userguide-content-list-imgs">
        <section class="userguide-catetor-list-box">
          <ul class="userguide-catetor-list-box-max">
            <li class="userguide-catetor-list-item" v-for="item in recommendList" :key="item.articleId">
              <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
                <span class="arc"></span>
                <h5 class="article-titles">{{item.title}}</h5>
              </router-link>
            </li>
          </ul>
        </section>
        <section class="userguide-catetor-imgs">
          <img src="/static/img/helpCenter/userguide_pho.png" alt="userguide_pho.png">
        </section>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      recommendList: [],
      categoriesList: [],
      pageConfig: {
        pageSize: 10
      },
      thisCatetorId: null
    }
  },
  watch: {
    thisCatetorId: {
      handler (_new, _old) {
        if (_new && (_new !== _old)) {
          this.fetchRecommendList()
        }
      }
    }
  },
  methods: {
    fetchRecommendList () {
      this.$axios.get(`${this.ljj_path}guide/search-list`, {params: Object.assign({}, this.pageConfig, {fkCategoryId: this.thisCatetorId})})
        .then(res => {
          if (res.data.success) {
            this.recommendList = res.data.data.rows
          }
        })
    },
    fetchCategoriesList (callback) {
      this.$axios.get(`${this.ljj_path}guide/category-list`)
        .then(res => {
          if (res.data.success) {
            this.categoriesList = res.data.data.rows
            if (callback instanceof Function) {
              callback(res.data.data.rows)
            }
          }
        })
    },
    SwitchCatetorChange (_info) {
      this.thisCatetorId = _info.categoryId
    }
  },
  created () {
    const _this = this
    this.fetchCategoriesList((typeList) => {
      if (!_this.$route.params.type) {
        _this.thisCatetorId = typeList[0].categoryId
      } else {
        // _this.SwitchCatetorChange(_this.$route.params.type)
        _this.thisCatetorId = _this.$route.params.type
      }
    })
  }
}
</script>
<style lang="sass" scoped>
  .userguideIndexContentComponent
    padding: 60px
    width: 100%
    background-color: #fff
    border-radius: 4px
    transition: all .3s ease
    &:hover
      box-shadow: 10px 10px 20px -5px #ddd
      // .titles
      //   color: #1281fc
    .userguide-header-titles
      display: flex
      justify-content: space-between
      padding-bottom: 30px
      border-bottom: 1px solid #E0E0E0
      align-items: baseline
      .titles
        font-size: 3.5rem
        transition: all .3s ease
        cursor: default
      >a>span
        color: #909090
        font-size: 1rem
        cursor: pointer
        &:hover
          color: #1281fc
    .userguide-content
      .userguide-tabs
        margin-top: 30px
        .tab-bts-box
          display: flex
          flex-wrap: wrap
          .tab-bts-item
            padding: 10px 0
            flex: 0 0 calc( 95% / 6 )
            border: 1px solid #909090
            color: #646464
            font-size: 16px
            display: flex
            justify-content: center
            align-items: center
            margin-bottom: 10px
            transition: all .5s ease
            cursor: pointer
            margin-right: 1%
            border-radius: 20px
            &:hover, &.active
              border-color: #1281FC
              background-color: #E0EEFD
              color: #1281FC
      .userguide-content-list-imgs
        display: flex
        .userguide-catetor-list-box
          flex: 1
          padding: 30px 0
          .userguide-catetor-list-item
            height: 35px
            line-height: 35px
            a
              display: flex
              align-items: center
            a:hover
              color: #1281FC
              .article-titles
                color: #1281FC
            a>.arc
              height: 10px
              width: 10px
              background-color: #646464
              display: inline-block
              border-radius: 50%
              margin-right: 10px
            a>.article-titles
              flex: 1
              font-size: 18px
              color: #646464
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 1
              /*! autoprefixer: off */
              -webkit-box-orient: vertical
              /* autoprefixer: on */
              word-break: break-word
        .userguide-catetor-imgs
          flex: 0 0 30%
          padding: 20px 0 0 0
</style>
