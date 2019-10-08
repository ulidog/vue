<template>
  <section class="recentpostsComponent">
    <header class="recentposts-titles">Recent Posts</header>
    <section class="content-list">
      <ul class="posts-box">
        <li class="post-item" v-for="item in recommendList" :key="item.articleId">
          <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
            <span class="arc"></span>
            <p class="titles">{{item.title}}</p>
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      pageConfig: {
        pageSize: 12
      },
      recommendList: []
    }
  },
  methods: {
    fetchGuideRecommend () {
      this.$axios.get(`${this.ljj_path}/guide/recommend/N`, { params: this.pageConfig })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            this.recommendList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchGuideRecommend()
  }
}
</script>
<style lang="sass" scoped>
  .recentpostsComponent
    padding-left: 2.5em
    margin-top: 30px
    .recentposts-titles
      font-size: 24px
      color: #323232
      font-weight: bold
      padding: 20px 0
      border-bottom: 1px dashed #D7DCE2
    .content-list
      .posts-box
        display: flex
        flex-direction: column
        padding: 10px 0
        .post-item
          height: 32px
          display: flex
          align-items: center
          padding: 0 1em
          a
            display: flex
            align-items: center
          a:hover
            color: #1281FC
            .titles
              color: #1281FC
          a>.arc
            height: 10px
            width: 10px
            background-color: #999
            display: inline-block
            border-radius: 50%
            margin-right: 10px
          a>.titles
            flex: 1
            font-size: 14px
            color: #646464
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            /* autoprefixer: on */
            word-break: break-word
          &:hover
            background-color: #1281fc
            a>.arc
              background-color: #fff
            a>.titles
              color: #fff
</style>
