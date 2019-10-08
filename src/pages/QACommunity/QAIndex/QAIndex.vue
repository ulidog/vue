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
      <vue-hot-topics v-if="!isHot"></vue-hot-topics>
      <vue-question-list :keyword="keyword" :serchStatus="serchStatus"></vue-question-list>
    </div>
    <div class="right-part">
      <vue-quick-question></vue-quick-question>
      <vue-questions-category></vue-questions-category>
      <!-- <router-link to="/article/buy-and-sell" tag="img" class="about-us" src="/static/img/QACommunity/about_us.png"></router-link> -->
    </div>
  </div>
</template>

<script>
import VueHotTopics from '@/components/QACommunity/QAIndex/hotTopics.vue'
import VueQuestionList from '@/components/QACommunity/QAIndex/questionList.vue'
import VueQuickQuestion from '@/components/QACommunity/QAIndex/quickQuestion.vue'
import VueQuestionsCategory from '@/components/QACommunity/QAIndex/questionsCategory.vue'

export default {
  data () {
    return {
      isHot: false
    }
  },
  props: {
    keyword: {
      default: null,
      type: String
    },
    serchStatus: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    serchStatus: {
      handler (_new) {
        if (_new) {
          this.isHot = true
        }
      }
    }
  },
  'components': {
    'vue-hot-topics': VueHotTopics,
    'vue-question-list': VueQuestionList,
    'vue-quick-question': VueQuickQuestion,
    'vue-questions-category': VueQuestionsCategory
  }
}
</script>
