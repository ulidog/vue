<style scoped lang="scss">
.notification{
  padding-bottom: 2em;
}
.notification-list{
  /* border-bottom: 2px solid #f9fafa; */
  margin-bottom: 2em;
}

.unit{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5em 3.125em;
  height: calc( 220px - 3em );
  border-bottom: 2px solid #f9f9f9;
}

.notification-icon{
  width: 34px;
  height: 34px;
}

.notification-icon img{
  width: 100%;
}

.unit>.info{
  width: calc( 100% - 174px);
  cursor: pointer;
  padding-right: 55px;
  padding-left: 30px;
}
.unit>.info>>>.el-badge__content.is-dot{
  width: 10px;
  height: 10px;
  background-color: #FF3518;
}
.unit>.info>.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title{
  font-size: 1.5em;
}

.time{
  color: #999999;
  margin-top: 1em;
}

.text{
  color: #666666;
  background-color: #f7f7f7;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 1em;
  line-height: 3em;
}

.btn-group{
  display: flex;
  align-items: center;
  height: 100%;
}

.btn-group .el-button{
  font-size: 1.25em;
  width: 140px;
  height: 40px;
  border: 1px solid #1281FC;
  border-radius: 3px;
  color: #1281FC;
  padding: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  transition: all .3s ease;
}
.btn-group .el-button:hover{
  color: #fff;
  transition: all .3s ease;
  border: none;
  background: linear-gradient(to right, #63a9f7, #1381fc);
}

.batch-delete{
  font-size: 1em;
  padding: 0.4em 0.8em;
  margin-right: 5%;
  margin-bottom: 2em;
  float: right;
  border: 1px solid #999999;
  border-radius: 0.4em;
  color: #999999;
  display: flex;
  align-items: center;
}
.batch-delete:hover{
  color: #409EFF;
  border-color: #409EFF;
}
.el-pagination{
  text-align: center;
  clear: both;
}
.noData {
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.noData>img {
  width: 200px;
}
</style>

<template>
  <div class="notification">
    <div class="notification-list">
      <div v-for="(unit, index) in dataList" :key="index" class="unit">
        <!-- if (unit.unread) { -->
        <div class="notification-icon">
          <img src="/static/img/userCenter/notification_logo.png" />
        </div>
        <div class="info" @click="view(unit.magid, unit.id, unit.notifyType)">
          <el-badge :hidden="!unit.unread" is-dot>
            <h6 class="title">{{unit.title}}</h6>
          </el-badge>
          <div class="time">{{unit.time|timerFormat}}</div>
          <div class="text">{{unit.text}}</div>
        </div>
        <div class="btn-group">
          <el-button @click="remove(unit.magid)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="dataList.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>

    <button v-if="dataList.length > 1" class="batch-delete" @click="batchRemove">
      <img src="/static/img/userCenter/batch_delete.png"/>&ensp;delete in batches
    </button>

    <el-pagination
      v-if="dataTotalSize > pageSize"
      background layout="prev, pager, next"
      :total="dataTotalSize"
      :page-size="pageSize"
      :current-page="pageIndex"
      @current-change="pageTurn">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data () {
    return {
      'pageSize': 10,
      'pageIndex': 1,
      'dataList': [],
      'dataTotalSize': 0
    }
  },
  'filters': {
    timerFormat: (timer) => {
      if (timer === null) return
      const time = timer.length > 10 ? Number(timer) : Number(timer + '000')
      const timers = new Date(time)
      return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    }
  },
  'methods': {
    getDataList () {
      const _this = this
      _this.$axios.get(`${this.YT_PROD_PATH}common/message/getMessageByStatus`, {params: {jump_type: 1, house_type: '1', currentPage: _this.pageIndex, pageSize: _this.pageSize}})
        .then(res => {
          const data = res.data.data.result.notifies
          if (res.data.success && data instanceof Array && data.length > 0) {
            _this.dataTotalSize = res.data.data.result.totalRecord
            _this.dataList = data.map(item => {
              return {
                'magid': item.id,
                'id': item.busId,
                'title': item.title,
                'time': item.dateTime,
                'text': item.shortInfo,
                'notifyType': item.notifyType,
                'unread': item.status === 1
              }
            })
          } else {
            _this.dataList = []
            if (data.length === 0 && this.pageIndex > 1) {
              this.pageIndex--
              this.getDataList()
            }
          }
        })
    },
    view (_msgid, _id, _type) {
      this.$router.push({
        name: 'notification-detail',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({msgid: _msgid, houseid: _id, type: _type}))}
      })
    },
    remove (_id) {
      const _this = this
      _this.$axios.get(`${this.YT_PROD_PATH}common/message/del`, {params: {messageIds: _id, jumpType: 1}})
        .then(res => {
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            this.getDataList()
          }
        })
    },
    batchRemove () {
      this.$confirm('Confirm delete all?', 'Tip', {}).then(() => {
        let ids = this.dataList.map(item => {
          return item.magid
        })
        // this.remove(item.id)
        this.$axios({
          'method': 'get',
          'url': `${this.YT_PROD_PATH}common/message/del`,
          'params': {
            'messageIds': ids.join(),
            'jumpType': 1
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.getDataList()
            } else {
              this.$message.error(response.data.msg)
            }
          })
          .catch(error => {
            if (error) {}
            // alert(error)
          })
      })
    },
    pageTurn (_index) {
      this.pageIndex = _index
      this.getDataList()
    }
  },
  created () {
    this.getDataList()
    // console.log(localStorage.getItem('uid'))
  }
}
</script>
