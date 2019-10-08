<style scoped>
img{
  width: 100%;
  cursor: pointer;
}

img~img{
  margin-top: 1em;
}
.Categories_img {
  transition: all linear 0.3s;
  border-radius: 4px;
}
.Categories_img:hover {
  box-shadow: 0px 3px 10px 0 rgba(0,0,0,0.3);
  transform: scale(1.02);
  border: none;
}
</style>

<template>
  <div class="part-container" v-loading="questionTypeList.length === 0">
    <h5>Categories</h5>
    <router-link :to="{name: 'QADTypeTails', query: {ebuyhouse: $base64.encode(JSON.stringify({typeid: item.faqCategoryId, type: true}))}}" v-for="item in questionTypeList" :key="item.faqCategoryId">
      <img class="Categories_img" v-lazy="item.imgUrl" :key="item.faqCategoryId"/>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questionTypeList: []
    }
  },
  created () {
    this.fetchQuestionTypeList()
  },
  methods: {
    fetchQuestionTypeList () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}faq-category/find/stair`, {params: _this.pageConfig})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            _this.questionTypeList = res.data.data.rows
          }
        })
    }
  }
}
</script>
