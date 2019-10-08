<style lang="scss" scoped>
.left-part{
  width: 72%;
  float: left;
}

.right-part{
  width: 25%;
  float: right;
}

/deep/ .part-container{
  padding: 2em;
  background-color: #ffffff;
  margin-top: 2em;
  overflow: hidden;
}

/deep/ .part-container>h5:first-child{
  font-size: 1.4em;
  padding-bottom: 1.5em;
}

img.about-us{
  width: 100%;
  margin-top: 2em;
  cursor: pointer;
}

.more-part-container img:nth-child(2){
  width: 25%;
  margin-right: 5%;
  cursor: pointer;
}

.more-part-container img:last-child{
  width: 20%;
  vertical-align: top;
  cursor: pointer;
}

</style>

<template>
  <div>
    <div class="left-part">
      <vue-questions-info @questionInfo="questionInfoChange"></vue-questions-info>
    </div>
    <div class="right-part">
      <vue-related-recommend :questionInfo="questionInfo"></vue-related-recommend>
      <!-- <router-link to="/index" tag="img" class="about-us" src="/static/img/QACommunity/about_us.png"></router-link> -->
    </div>
  </div>
</template>

<script>
import VueQuestionsInfo from '@/components/QACommunity/QAIndex/questionsInfo.vue'
import VueRelatedRecommend from '@/components/QACommunity/QAIndex/RelatedRecommend.vue'

export default {
  data () {
    return {
      questionInfo: {}
    }
  },
  'components': {
    'vue-related-recommend': VueRelatedRecommend,
    'vue-questions-info': VueQuestionsInfo
  },
  created () {
    this.$emit('upData', {isShowTab: false})
  },
  methods: {
    questionInfoChange (_info) {
      this.questionInfo = _info
    }
  },
  destroyed () {
    this.$emit('upData', {isShowTab: true})
  }
}
</script>
