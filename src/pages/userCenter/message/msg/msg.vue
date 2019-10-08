<style scoped>
.part-container {
  padding-bottom: 2em;
}
.msg-list{
  border-bottom: 2px solid #f9fafa;
  margin-bottom: 2em;
}

.unit{
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  border-top: 2px solid #f9fafa;
}

.avatar{
  width: 8%;

}

.avatar img{
  width: 100%;
  border-radius: 50%;
}

.info{
  width: 65%;
}

.name{
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
  flex-direction: column;
  align-items: flex-end;
}

.btn-group .el-button{
  margin-bottom: 1em;
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
  <div class="part-container">

    <div class="msg-list">
      <div v-for="(unit, index) in dataList" :key="index" class="unit">
        <!-- if (unit.count > 0) { -->
        <el-badge :hidden="unit.messageNum === 0" class="avatar" :value="unit.messageNum" :max="99">
          <img v-lazy="unit.fromHead" :key="unit.fromUserId" />
        </el-badge>
        <div class="info">
          <h6 class="name">{{unit.fromNickName}}</h6>
          <div class="time">{{unit.updateTime|timerFormat}}</div>
          <div class="text">{{unit.payload}}</div>
        </div>
        <div class="btn-group">
          <el-button type="primary" @click="reply(unit.fromUserId, unit)">Reply</el-button>
          <!-- 有问题  暂时屏蔽  2019-6-1 -->
          <el-button @click="remove(unit)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="dataList.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
    <!-- 有问题  暂时屏蔽  2019-6-1 -->
    <button v-if="dataList.length > 1" class="batch-delete" @click="batchRemove()">
      <img src="/static/img/userCenter/batch_delete.png"/>&ensp;delete in batches
    </button>

    <el-pagination
      v-if="dataTotalSize > pageSize"
      background layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="pageIndex"
      :total="dataTotalSize"
      @current-change="pageTurn"
    >
    </el-pagination>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      'pageSize': 10,
      'pageIndex': 1,
      'dataList': [],
      'dataTotalSize': 0,
      'msgAllList': []
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
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  'methods': {
    ...mapMutations({
      openMessages: 'openMessage'
    }),
    getDataList () {
      this.dataTotalSize = 0
      this.fetchFriendsList()
    },
    // 获取好友列表 后台
    fetchFriendsList () {
      this.$axios.get(`${this.XT_PROD_PATH}list/select`)
      // this.$axios.get('http://192.168.0.135:9005/console/list/delete')
        .then(res => {
          if (res.data.success && res.data.data instanceof Array && res.data.data.length > 0) {
            // this.msgAllList = res.data.data.map((item, index, ags) => {
            //   if (ags.length / this.pageSize) {}
            // })
            this.msgAllList = []
            this.dataList = []
            const pageSizes = Math.ceil(res.data.data.length / this.pageSize)
            let num = 0
            for (let i = 0; i < pageSizes; i++) {
              this.msgAllList.push([])
            }
            res.data.data.map((item, k) => {
              this.msgAllList[num].push(item)
              if ((k + 1) % this.pageSize === 0) {
                num++
              }
            })
            this.dataList = this.msgAllList[0]
            this.dataTotalSize = res.data.data.length
          } else {
            this.msgAllList = []
            this.dataList = []
          }
        })
    },
    reply (_id, _info) {
      this.$axios.get(`${this.XT_PROD_PATH}message/update/state`, {params: {id: _id}})
        .then(res => {
          this.fetchFriendsList()
          this.instantMessaging(_info)
        })
    },
    remove (_info) {
      this.$axios.get(`${this.XT_PROD_PATH}list/delete`, {
        params: {
          toUserId: _info.toUserId,
          fromUserId: _info.fromUserId
        }
      })
        .then(res => {
          this.$message.success(res.data.msg)
          this.getDataList()
        })
    },
    batchRemove () {
      this.$confirm('Confirm delete all?', 'Tip', {}).then(() => {
        let ids = this.dataList.map(item => {
          // this.remove(item.id)
          return item.fromUserId
        })
        this.$axios({
          'method': 'get',
          'url': `${this.XT_PROD_PATH}list/delete/pc`,
          'params': {
            'toUserId': ids.join()
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
            // alert(error);
            if (error) {}
          })
      })
    },
    pageTurn (_index) {
      this.pageIndex = _index
      this.dataList = this.msgAllList[_index - 1]
    },
    instantMessaging (_info) {
      const hxId = window.localStorage.getItem('hxid')
      if (_info.fromName !== hxId) {
        this.addMessageNode(_info)
      }
    },
    // 建立陌生人关系 后台
    addMessageNode (_info) {
      this.$axios.post(`${this.XT_PROD_PATH}list/savese`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.fromHead,
        'toName': _info.fromName,
        'toNickName': _info.fromNickName,
        'toUserId': _info.fromUserId,
        'type': 'text'
      })
        .then(res => {
          this.addMessageListNode(_info)
        })
    },
    // 添加到列表 后台
    addMessageListNode (_info) {
      this.$axios.post(`${this.XT_PROD_PATH}list/save`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.fromHead,
        'toName': _info.fromName,
        'toNickName': _info.fromNickName,
        'toUserId': _info.fromUserId,
        'type': 'text'
      })
        .then(res => {
          this.openMessages(true)
          this.fetchBadgeSize()
        })
    },
    // 重新拉去消息总数
    fetchBadgeSize () {
      // 获取推送消息
      this.$WebSocket.websocketsend({signal: 1, type: 2})
      this.$WebSocket.websocketsend({signal: 1, type: 3})
      // this.$WebSocket.websocketsend({signal: 1, type: 4})
    }
  },
  created () {
    this.getDataList()
  }
}
</script>
