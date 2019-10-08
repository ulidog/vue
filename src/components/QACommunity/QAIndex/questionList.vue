<style scoped>
.question-unit{
  padding-bottom: 1.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #999999;
}

.question-unit:not(:first-child){
  padding-top: 1.2em;
  border-top: 1px solid #eeeeee;
}

.question-unit .left-part{
  width: 85%;
}
.null-data {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  height: 500px;
  align-items: center;
}
.null-data img {
  width: 200px;
}

.null-data span {
  color: #444;
  font-size: 1.25em;
  margin-top: 20px;
}

.question{
  font-size: 1.2em;
  line-height: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.newestAnswer{
  font-size: 1.1em;
  width: 100%;
  padding-right: 20%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
}
.newestAnswer>.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.newestAnswer>img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.newestAnswer .name{
  color: #444444;
  font-size: 18px;
  vertical-align: middle;
  /* margin: 0 10px; */
}
.newestAnswer>.info .content{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: contents;
  vertical-align: middle;
}
.other-info{
  display: inline-block;
  width: 100%;
  margin: 10px 0;
}
.other-info span{
  float: left;
  margin-right: 10%;
  display: flex;
  align-items: center;
  user-select: none;
}

.answers{
  width: 80px;
  height: 80px;
  position: relative;
}

.answers img{
  width: 100%;
}

.answers div{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.answers div p{
  width: 100%;
  text-align: center;
}

.answers div p:first-child{
  font-size: 1.1em;
  color: #444444;
}

.el-pagination{
  margin-top: 3em;
  text-align: center;
}
</style>

<template>
  <div class="part-container" v-loading="questionLoading">
    <div class="question-unit" v-for="(unit, index) in questionList" :key="index">
      <div class="left-part">
        <h6 class="question">
          <router-link :to="{name: 'QAInfo', query: {ebuyhouse: $base64.encode(JSON.stringify({id: unit.xid}))}}">
          {{unit.question}}
          </router-link>
        </h6>
        <p class="other-info">
          <span>{{unit.releaseTime}}</span>
          <span>
            <img src="/static/img/QACommunity/view.png" />&ensp;
            {{unit.views}}
          </span>
          <span @click="unit.isShowShare = !unit.isShowShare">
            <img src="/static/img/QACommunity/share.png" />&ensp;
            {{unit.forward}}
          </span>
        </p>
        <p class="newestAnswer" v-if="unit.newestAnswer !== null">
          <img v-lazy="unit.newestHeadUrl" alt="" :key="unit.xid">
          <section class="info">
            <span class="name">{{unit.newestNickName}}</span>
            <span class="content">{{unit.newestAnswer}}</span>
          </section>
        </p>
        <vue-share
          v-if="unit.isShowShare"
          :url="shareUrl"
          :title="unit.question"
          :description="unit.question"
          :quote="unit.question">
        </vue-share>
      </div>
      <div class="answers">
        <router-link :to="{name: 'QAInfo', query: {ebuyhouse: $base64.encode(JSON.stringify({id: unit.xid}))}}">
          <img src="/static/img/QACommunity/gray_ball.png" />
          <div>
            <p>{{unit.answers}}</p>
            <p>answers</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="null-data" v-if="questionList.length === 0">
      <img src="/static/img/QACommunity/Nonewcontents.jpg" alt="null">
      <span>No new contents</span>
    </div>
    <el-pagination
      v-if="pageConfig.pageTotal !== 0"
      background
      layout="prev, pager, next"
      :total="pageConfig.pageTotal"
      :page-size="pageConfig.pageSize"
      :current-page="pageConfig.pageNum"
      @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
import share from '@/components/consultation/share'
export default {
  components: {
    'vue-share': share
  },
  data () {
    return {
      shareUrl: null,
      isShowShare: false,
      'pageConfig': {
        'pageNum': 1,
        'pageSize': 20,
        'pageTotal': 0
      },
      'questionList': [],
      'questionLoading': false
    }
  },
  props: {
    params: {
      default: null,
      type: Object
    },
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
    'pageConfig.pageNum': {
      handler (_new, _old) {
        this.fetchQuestionList()
      }
    },
    'serchStatus': {
      handler (_new, _old) {
        if (_new) {
          this.fetchQuestionList()
        }
      },
      immediate: true
    }
  },
  methods: {
    pageTurn (_num) {
      this.pageConfig.pageNum = _num
    },
    fetchQuestionList () {
      const _this = this
      _this.questionLoading = true
      _this.$axios.get(`${this.ljj_path}faq/list/by-detail`, {params: Object.assign({}, _this.pageConfig, _this.params, {detail: this.keyword})})
        .then(res => {
          if (res.data.success) {
            _this.pageConfig.pageTotal = res.data.data.total
            _this.questionList = res.data.data.rows.map((item, index) => {
              return {
                'id': index,
                'question': item.detail,
                'releaseTime': item.addTime,
                'views': item.countVisit || 0,
                'forward': item.countShare || 0,
                'answers': item.countComment || 0,
                'newestAnswer': item.assemblyComments.length !== 0 ? item.assemblyComments[0].content : null,
                'newestNickName': item.assemblyComments.length !== 0 ? item.assemblyComments[0].nickName : null,
                'newestHeadUrl': item.assemblyComments.length !== 0 ? item.assemblyComments[0].headUrl : null,
                'xid': item.faqId || null,
                'isShowShare': false
              }
            })
          }
          setTimeout(() => {
            _this.questionLoading = false
          }, 500)
        })
        .catch(err => {
          if (err) {
            setTimeout(() => {
              _this.questionLoading = false
            }, 500)
          }
        })
    }
  },
  created () {
    this.fetchQuestionList()
    this.shareUrl = window.location.href
  }
}
</script>
