<style lang="scss" scoped>
.part-container {
  margin-top: 2em;
  padding-bottom: 3rem;
  background-color: #ffffff;
  overflow: hidden;
}
/deep/.part-container .el-pagination{
  margin-top: 50px
}
.myQA-panel-head {
  text-align: right;
  padding: 0 2em;
  border-bottom: 1px solid #f3f4f5;
}
.myQA-panel-body {
  padding: 0 2em;
}
.myQA-panel-item {
  padding: 2em 0;
}
.myQA-panel-item:not(:last-child) {
  border-bottom: 1px solid #f3f4f5;
}
.myQA-item {
  font-size: 20px;
  color: #323232;
  display: inline-block;
  margin-left: 68px;
  line-height: 3em;
  cursor: pointer;
}
.myQA-item.active {
  color: #1281fc;
}
.myQA_p {
  margin-bottom: 1.6em;
  font-size: 18px;
  color: #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.myQA_add {
  display: flex;
  justify-content: space-between;
}
.myQA_add_min {
  color: #999999;
  font-size: 14px;
}
.myQA_add_min > span {
  margin-right: 2em;
}
</style>

<template>
  <div class="part-container">
    <div class="myQA-panel">
      <div class="myQA-panel-head">
        <span
          :class="tabIndex == 1 ? 'active' : ''"
          @click="changeTab(1)"
          class="myQA-item"
        >Your questions</span>
        <span
          :class="tabIndex == 2 ? 'active' : ''"
          @click="changeTab(2)"
          class="myQA-item"
        >Your answers</span>
      </div>
      <div class="myQA-panel-body">
        <ul v-if="tabIndex == 1" class="myQ-panel">
          <li class="myQA-panel-item" v-for="(item, index) in myQParam.paramList" :key="index">
            <p class="myQA_p">{{item.detail}}</p>
            <div class="myQA_add">
              <p class="myQA_add_min">
                <span class="myQA_time">{{item.addTime.split(' ')[0]}}</span>
                <span
                  class="myQA_vNum"
                >{{item.countComment == 0 ? "No answer" : item.countComment + " people answer" }}</span>
              </p>
              <!-- <p class="myQA-state">Waiting for answering</p> -->
            </div>
          </li>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="myQPage"
            :current-page="myQParam.pageNum"
            :page-size="myQParam.pageSize"
            :total="myQParam.total"
          ></el-pagination>
        </ul>
        <ul v-if="tabIndex == 2" class="myA-panel">
          <li class="myQA-panel-item" v-for="(item, index) in myAParam.paramList" :key="index">
            <p class="myQA_p">{{item.faqDetail}}</p>
            <div class="myQA_add">
              <p class="myQA_add_min">
                <span class="myQA_time">{{item.addTime.split(' ')[0]}}</span>
                <span
                  class="myQA_vNum"
                >{{item.countComment == 0 ? "No answer" : item.countComment + " people answer" }}</span>
              </p>
              <!-- <p class="myQA-state">Waiting for answering</p> -->
            </div>
          </li>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="myAPage"
            :current-page="myAPage.pageNum"
            :page-size="myAParam.pageSize"
            :total="myAParam.total"
          ></el-pagination>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 1,
      myQParam: {
        pageNum: 1,
        pageSize: 10,
        paramList: [],
        total: 0
      },
      myAParam: {
        pageNum: 1,
        pageSize: 10,
        paramList: [],
        total: 0
      }
    }
  },
  methods: {
    changeTab (_index) {
      this.tabIndex = _index
      _index === 1 ? this.getMyQParam() : this.getMyAParam()
    },
    myQPage (pageNum) {
      this.myQParam.pageNum = pageNum
      this.getMyQParam()
    },
    myAPage (pageNum) {
      this.myAParam.pageNum = pageNum
      this.getMyAParam()
    },
    getMyQParam (pageNum) {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}/faq/list/by-me`, {
          params: {
            pageNum: _this.myQParam.pageNum,
            pageSize: _this.myQParam.pageSize
          }
        })
        .then(res => {
          if (res.data.success) {
            this.myQParam.paramList = res.data.data.rows
            this.myQParam.total = res.data.data.total
            this.myQParam.pageSize = res.data.data.pageSize
          }
        })
    },
    getMyAParam () {
      const _this = this
      _this.$axios
        .get(`${this.ljj_path}comment/list/by-my-comment`, {
          params: {
            pageNum: _this.myAParam.pageNum,
            pageSize: _this.myAParam.pageSize
          }
        })
        .then(res => {
          if (res.data.success) {
            this.myAParam.paramList = res.data.data.rows
            this.myAParam.total = res.data.data.total
            this.myAParam.pageSize = res.data.data.pageSize
          }
        })
    }
  },
  created () {
    this.changeTab(1)
  }
}
</script>
