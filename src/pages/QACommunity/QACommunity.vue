<style lang="sass" scoped>
  @media screen and (min-width: 1300px)
    .page-container
      width: 1300px
      margin: 0 auto
  @media screen and (max-width: 1300px)
    .page-container
      width: 100%
      padding-left: 20px
      padding-right: 20px
</style>

<style lang="scss" scoped>
.page-bg-color {
  width: 100%;
  background-color: #f3f4f5;
}

.page-container{
  padding-top: calc(60px + 3em);
  // padding-left: 19%;
  // padding-right: 19%;
  padding-bottom: 5em;
  overflow: hidden;
}

.questionSearch{
  height: 4em;
  border: 1px solid #1281fc;
  border-radius: 0.5em;
  display: flex;
  flex: 1;
  overflow: hidden;
}

.questionSearch input{
  width: 90%;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
  border: none;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  font-size: 1.5em;
  color: #444444;
}

.questionSearch button{
  width: 10%;
  height: 100%;
  background-color: #1281fc;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.questionSearch button:active{
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.questionSearch button:active img{
  height: 70%;
}

.questionSearch button img{
  height: 60%;
}

.tab-group{
  height: 4em;
  padding-left: 2em;
  padding-right: 2em;
  background-color: #ffffff;
  margin-top: 3em;
  color: #444444;
}

.tab-group span{
  font-size: 1.5em;
  display: inline-block;
  height: 100%;
  line-height: 2.5em;
  cursor: pointer;
}

.tab-group span+span{
  margin-left: 1.2em;
}

.tab-group span:hover{
  color: #1281fc;
}

.tab-group span.active{
  color: #1281fc;
  border-bottom: 2px solid #1281fc;
}

.breadcrumb {
  height: 70px;
  display: flex;
  align-content: center;
}
/deep/ .breadcrumb .el-breadcrumb {
  display: flex;
  align-items: center;
}
/deep/ .breadcrumb .el-breadcrumb .el-breadcrumb__item {
  font-size: 1.25em;
}
.questionSearch-group{
  display: flex;
}
.questionSearch-group>.askQuestions{
  margin-left: 20px;
  display: block;
  background-color: #1281FC;
  color: #fff;
  // padding-left: 50px;
  // padding-right: 50px;
  width: 260px;
  text-align: center;
  border-radius: 5px;
  font-size: 24px;
  line-height: 58px;
  cursor: pointer;
  transition: all ease 0.2s;
}
.questionSearch-group>.askQuestions:hover{
  font-size: 26px;
}
.askQuestions:hover {
    background-color:#0067d9
  }
</style>

<template>
  <div class="page-bg-color">
    <div class="page-container">
      <div class="questionSearch-group">
        <div class="questionSearch">
          <input type="text" v-model="queryWord" autocomplete="off" spellcheck="false"
            placeholder="What Would You Like to Search and Answer?"
            @keyup.enter="serchChange"
          />
          <button @click="serchChange"><img src="/static/img/QACommunity/magnifier.png" /></button>
        </div>
        <span class="askQuestions" @click="pageJump('/QACommunity/askQuestions')">Ask a Question</span>
      </div>
      <div class="tab-group" v-if="isShowTab">
        <span :class="[{'active': 'QAIndex' === serviceName}]" @click="pageJump('/QACommunity')">Community Questions</span>
        <span :class="[{'active': 'myQA' === serviceName}]" @click="pageJump('/QACommunity/myQA')">Your Q&As</span>
        <!-- <span :class="[{'active': 'askQuestions' === serviceName}]" >Your Q&As</span> -->
      </div>
      <div class="breadcrumb" v-else>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="{path: item.path}">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view @upData="upData" :keyword="queryWord" :serchStatus="serchStatus"></router-view>
      <vue-toolbar></vue-toolbar>
    </div>
  </div>
</template>

<script>
import VueToolbar from '@/components/common/toolbar.vue'

export default {
  data () {
    return {
      'serviceName': 'QAIndex',
      'isShowTab': true,
      'queryWord': null,
      'serchStatus': false
    }
  },
  'components': {
    'vue-toolbar': VueToolbar
  },
  'methods': {
    pageJump (_path) {
      this.$router.push(_path)
    },
    upData (_obj) {
      // this.[]
      Object.keys(_obj).map(item => {
        this[item] = _obj[item]
      })
    },
    serchChange () {
      this.serchStatus = true
      const _this = this
      setTimeout(() => {
        _this.serchStatus = false
      }, 1000)
    }
  },
  updated () {
    this.serviceName = this.$route.fullPath.split('/').pop()
  },
  created () {
    this.serviceName = this.$route.fullPath.split('/').pop()
  }
}
</script>
