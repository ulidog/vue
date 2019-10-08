<template>
  <el-container class="info-container">
    <el-header class="info-c-header" height="618px">
      <section class="headerImg" v-loading="headerImg.imgUrl !== null ? false : true">
        <img :src="headerImg.imgUrl" :alt="headerImg.theme">
      </section>
    </el-header>
    <el-main class="info-c-main">
      <vue-question-list :params="{fkTopicId: params.hotId}"></vue-question-list>
    </el-main>
  </el-container>
</template>

<script>
import VueQuestionList from '@/components/QACommunity/QAIndex/questionList.vue'

export default {
  data () {
    return {
      params: {},
      headerImg: {
        imgUrl: null,
        theme: null
      }
    }
  },
  'components': {
    'vue-question-list': VueQuestionList
  },
  created () {
    console.log(JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse)))
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      if (this.params.hotId === undefined) {
        this.$message({
          message: 'The parameter is incorrect and will return to the previous step',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 3000)
        return
      }
    } catch (err) {
      this.$message({
        message: 'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
      return
    }
    this.$emit('upData', {isShowTab: false})
    this.fetchHeaderImg()
  },
  methods: {
    fetchHeaderImg () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}faq-topic/by-pk`, {params: {topicId: this.params.hotId}})
        .then(res => {
          if (res.data.success) {
            console.log(res.data)
            _this.headerImg = res.data.data
          }
        })
    }
  }
}
</script>

<style lang="sass" scoped>
  .info-container
    .info-c-header
      height: 545px
      padding: 0
      width: 100%
      .headerImg
        width: 100%
        height: 100%
        position: relative
        display: flex
        justify-content: center
        align-items: center
        .img-title
          font-size: 20px
          position: absolute
          height: 182px
          width: 80%
          background-color: rgba(0,0,0,.5)
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          color: #fff
          h4
            color: #fff
            font-size: 1.875em
            font-weight: bold
            margin: 20px
            word-break: break-word
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          span
            align-self: flex-end
            margin-right: 40px
        img
          width: 100%
          height: 100%
    .info-c-main
      padding: 30px 60px 120px
      background-color: #fff
</style>
