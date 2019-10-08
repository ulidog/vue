<style lang='scss' scoped>
textarea{
  font-size: 1.2em;
  width: 100%;
  min-height: 10em;
  max-height: 20em;
  padding: 1em;
  border: 2px solid #fbd08b;
  resize: vertical;
  outline: none;
  color: #444444;
}

dt{
  font-size: 1.2em;
  color: #444444;
  margin-top: 1em;
  margin-bottom: 0.8em;
}

dd{
  font-size: 1.2em;
}

dd+dd{
  margin-top: 0.6em;
}

button{
  display: block;
  font-size: 1.2em;
  padding: 0.3em 0.8em;
  margin: 1.6em auto 0.2em;
  background-color: #f7a116;
  border-radius: 0.2em;
  color: #ffffff;
  transition: all linear 0.1s;
}
button:hover{
  transform: scale(1.05);
  font-size: 1.2em;
}
.part-button:hover {
  background-color: #1281fc
}
.radio-type-list {
  display: flex;
  flex-direction: column;
}
.radio-label-item {
  /* margin: 0.8em 0 0 0; */
  font-size: 16px;
  padding: 0.4em 0;
}

.part-container {
  padding-bottom: 1em;
}
</style>

<template>
  <div class="part-container">
    <h5>Ask a Question</h5>
    <textarea maxlength="200" placeholder="0 - 200 characters" autocomplete="off" spellcheck="false" v-model="content"></textarea>
    <dl>
      <dt>Choose a Category:</dt>
      <el-radio-group v-model="questionCatetory" class="radio-type-list">
        <el-radio :label="item.faqCategoryId" v-for="item in questionTypeList" :key="item.faqCategoryId" class="radio-label-item">{{item.type}}</el-radio>
      </el-radio-group>
    </dl>
    <button class="part-button" @click="quickQuestionChange">Post Question</button>
  </div>
</template>

<script>
import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      'content': null,
      'questionCatetory': '1',
      'pageConfig': {
        'pageNum': 1,
        'pageSize': 99
      },
      'questionTypeList': []
    }
  },
  filters: {},
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
    },
    quickQuestionChange () {
      const _this = this
      if (!getToken()) {
        this.$message.info('Please login to be a member before asking questions')
        this.$store.commit('signOut', true)
      } else {
        _this.$axios({
          url: `${this.ljj_path}faq/insert`,
          method: 'POST',
          data: {detail: _this.content, fkCategoryId: _this.questionCatetory}
        }).then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            _this.$message.success(res.data.msg)
            _this.content = null
          }
        })
      }
    }
  },
  mounted () {}
}
</script>
