<template>
  <section class="popularInformationViews">
    <header class="MajorImg">
      <img src="/static/img/consultation/default/popular_information.png" alt="popular_information">
    </header>
    <section class="_titls">
      <h3>Recommended Articles</h3>
    </section>
    <footer class="otherArticle">
      <ul class="article-list-box">
        <li class="article-items" v-for="(item, index) in popularList" :key="index">
          <router-link :to="{path: '/information/details/' + item.seoId}">
            <span :title="item.title">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      popularList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      guid: 'Guid'
    })
  },
  created () {
    this.fetchInfo()
  },
  methods: {
    fetchInfo () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}news/list/recent-posts`, {params: Object.assign({}, _this.pageConfig, {userId: _this.guid})})
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
      img
        height: 100%
    ._titls
      height: 75px
      display: flex
      align-items: center
      justify-content: flex-start
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
        // margin: 0 .5em 0 2.1875em
        .article-items
          height: 32px
          display: flex
          align-items: center
          text-indent: 1.5em
          position: relative
          cursor: pointer
          padding: 0 .5em 0 0.8em
          &:before
            content: ''
            position: absolute
            top: 50%
            margin-top: -6px
            height: 10px
            width: 10px
            border-radius: 50%
            background-color: #999
            left: 2.2em
          span
            color: #646464
            font-size: 0.875em
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            max-width: 240px
            display: inline-block
          &:hover
            background-color: #1281fc
            &:before
              background-color: #fff
            span
              color: #fff
</style>
