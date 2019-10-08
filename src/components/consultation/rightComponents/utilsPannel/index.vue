<template>
  <section class="utilsPannelViews" v-if="showComponent">
    <section class="_titls">
      <h3 v-html="title"></h3>
    </section>
    <footer class="otherArticle">
      <ul class="article-list-box">
        <li class="article-items" v-for="(item, index) in publicList" :key="index">
          <router-link :to="{path: '/information/details/' + item.seoId}">
            <span :title="item.title">{{item.title}}</span>
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
      params: {},
      pageConfig: {
        pageNum: 1,
        pageSize: 8
      },
      publicList: [],
      showComponent: true
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    requstUrl: {
      type: String,
      default: null
    }
  },
  watch: {
    requstUrl: {
      handler (_new, _old) {
        if (_new) {
          this.fetchInfo(_new)
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchInfo (_url) {
      // alert(_url)
      const _this = this
      _this.$axios.get(_url, {params: Object.assign({}, _this.pageConfig)})
        .then(res => {
          if (res.data.success) {
            _this.publicList = res.data.data.rows
            _this.showComponent = _this.publicList.length !== 0
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .utilsPannelViews
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
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
        /deep/ i
          font-size: 25px
          margin-right: 10px
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
            top: 46%
            margin-top: -6px
            height: 12px
            width: 12px
            border-radius: 50%
            background-color: #999999
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
              color: #1281Fc
          &:hover
            background-color: #1281fc
            &:before
              background-color: #fff
            span
              color: #fff
</style>
