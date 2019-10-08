<template>
  <section class="popularInformationViews">
    <header class="MajorImg">
      <img src="/static/img/consultation/default/popular_information.png" alt="popular_information">
    </header>
    <section class="_titls">
      <h3>Related recommend</h3>
    </section>
    <footer class="otherArticle">
      <ul class="article-list-box">
        <li class="article-items" v-for="(item, index) in popularList" :key="index">
          <router-link :to="{name: 'QAInfo', query: {ebuyhouse: $base64.encode(JSON.stringify({id: item.faqId}))}}">
            <span :title="item.detail">{{item.detail}}</span>
          </router-link>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      popularList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 12
      }
    }
  },
  props: {
    questionInfo: {
      default: () => {
        return {fkCategoryId: 1}
      },
      type: Object
    }
  },
  watch: {
    questionInfo: {
      handler (_new) {
        this.fetchInfo(_new)
      }
    }
  },
  methods: {
    fetchInfo (_info) {
      const _this = this
      _this.$axios.get(`${this.ljj_path}faq/list/by-category`, {params: Object.assign({}, _this.pageConfig, {fkCategoryId: _info.fkCategoryId})})
        .then(res => {
          if (res.data.success) {
            _this.popularList = res.data.data.rows
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .popularInformationViews
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
    .MajorImg
      width: 100%
      height: 125px
      display: flex
      align-items: center
      justify-content: center
      overflow: hidden
      img
        height: 100%
        width: 100%
    ._titls
      height: 75px
      display: flex
      align-items: center
      justify-content: center
      margin: 0 1.875em 0 2.1875em
      border-bottom: 1px solid #ededed
      h3
        font-size: 1.5em
        color: #323232
        font-weight: bold
        height: 100%
        display: flex
        align-items: center
        justify-content: center
    .otherArticle
      margin-top: 25px
      margin-bottom: 55px
      .article-list-box
        margin: 0 .5em 0 2.1875em
        .article-items
          height: 32px
          display: flex
          align-items: center
          position: relative
          cursor: pointer
          &:before
            content: ''
            position: absolute
            top: 48%
            margin-top: -6px
            height: 12px
            width: 12px
            border-radius: 50%
            background-color: #999999
          >a
            padding-left: 28px
          span
            color: #444
            font-size: 0.875em
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            max-width: 240px
            display: inline-block
            &:hover
              color: #1281FC
</style>
