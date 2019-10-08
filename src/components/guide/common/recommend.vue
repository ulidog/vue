<template>
  <section class="recommendComponent" ref="recommend">
    <section :class="['fixedBox', isFixed ? 'fixed' : '']" v-show="isNone" ref="flxedBox">
      <header class="recommend-titles">Recommended</header>
      <section class="content">
        <ul class="content-box">
          <li class="recommend-item" v-for="item in recommendList" :key="item.articleId">
            <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
              <section class="imgBox">
                <img :src="formImg(item.imgUrl)[0]" :alt="formImg(item.imgUrl)[0]">
              </section>
              <h5 class="titles">{{item.title}}</h5>
            </router-link>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      recommendList: [],
      searchParams: {},
      pageConfig: {
        pageSize: 3
      },
      isFixed: false,
      flxedClientHeight: 0,
      isNone: false
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
    formData (_info) {
      this.searchParams = Object.assign({}, _info)
    },
    fetchRecommendList () {
      this.$axios.get(`${this.ljj_path}guide/recommend/S`, {params: this.pageConfig})
        .then(res => {
          if (res.data.success) {
            this.recommendList = res.data.data
          }
        })
    },
    formImg (_content) {
      let imgArr = []
      try {
        imgArr = JSON.parse(_content)
      } catch (err) {
        imgArr = [_content]
      }
      return imgArr
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = this.$refs['recommend'].offsetTop
      // console.log(offsetTop + this.flxedClientHeight, this.searchParams.maxOffetTop)
      if (((scrollTop + this.flxedClientHeight) > this.searchParams.maxOffetTop) || (this.searchParams.maxOffetTop < (offsetTop + this.flxedClientHeight))) {
        this.isNone = false
        return
      } else {
        this.isNone = true
      }
      if (offsetTop - scrollTop < 60) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  created () {
    this.fetchRecommendList()
  },
  updated () {
    const newFlxedClientHeight = this.$refs['flxedBox'].clientHeight
    if (newFlxedClientHeight > this.flxedClientHeight) {
      this.flxedClientHeight = newFlxedClientHeight
    }
  },
  mounted () {
    this.flxedClientHeight = this.$refs['flxedBox'].clientHeight
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="sass" scoped>
  .recommendComponent
    padding-left: 2.5em
    margin-top: 30px
    position: relative
    width: 100%
    .fixedBox
      &.fixed
        position: fixed
        top: 60px
        width: calc( 14% - 2.5em )
      .recommend-titles
        font-size: 24px
        color: #323232
        font-weight: bold
        padding: 20px 0
        border-bottom: 1px dashed #D7DCE2
      .content
        margin: 30px 0
        .content-box
          display: flex
          flex-wrap: wrap
          .recommend-item
            margin-bottom: 30px
            border: 1px solid #D7DCE2
            transition: all linear 0.3s
            overflow: hidden
            &:hover
              box-shadow: 0px 4px 12px 0 rgba(0,0,0,0.5)
              .titles
                color: #1281FC
                text-decoration: underline
            .imgBox
              width: 100%
              transition: all linear 0.5s
              img
                max-width: 100%
              &:hover
                transform: scale(1.05);
            .titles
              color: #323232
              font-size: 16px
              font-weight: 400
              font-family: 'HelveticaNeue'
              transition: all .2s ease
              border-top: 1px solid #D7DCE2
              padding: 2px 0.5em
</style>
