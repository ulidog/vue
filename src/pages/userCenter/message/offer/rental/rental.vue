<style scoped>
.part-container {
  padding-bottom: 30px;
}
.offer-list{
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

.cover-part{
  align-self: stretch;
  width: 20%;
  display: flex;
  align-items: center;
  background-color: #eeeeee;
  position: relative;
}
.cover-part>a{
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
}

.cover{
  width: 100%;
}
.img-unit{
  position: absolute;
  top: 0;
  left: 0;
}
.info{
  width: 65%;
  cursor: pointer;
}

.name{
  font-size: 1.5em;
}

.time{
  color: #999999;
  margin-top: 1em;
}

.address{
  color: #444444;
  margin-top: 1em;
  display: flex;
  align-items: flex-end;
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

    <div class="offer-list">
      <div v-for="(unit, index) in dataList" :key="index" class="unit">
        <div class="cover-part" title="Click here to view listing details">
          <router-link :to="{ path: '/listing/details/'+unit.houseId}">
            <img class="cover" v-lazy="unit.housePicUrl" :key="unit.id"/>
            <img class="img-unit" v-if="'2' == unit.house_status" src="/static/img/userCenter/whole_house_logo.png" />
            <img class="img-unit" v-if="'3' == unit.house_status" src="/static/img/userCenter/single_room_logo.png" />
          </router-link>
        </div>
        <div class="info" @click="view(unit)" title="Point me into the transaction">
          <el-badge is-dot :hidden="unit.status === 1 ? false : true">
            <h6 class="name">{{unit.houseAddress}}</h6>
          </el-badge>
          <div class="time">{{unit.dateTime|timerFormat}}</div>
          <div class="text">{{unit.info}}</div>
        </div>
        <div class="btn-group">
          <el-button @click="remove(unit.id)">Delete</el-button>
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
    @current-change="pageTurn"
  >
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
  watch: {
    'pageIndex': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.getDataList()
        }
      }
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
      _this.loading = true
      // 请求数据
      this.$axios({
        method: 'GET',
        url: `${this.YT_PROD_PATH}common/message/getMessageByStatus`,
        params: {
          jump_type: 2,
          house_type: 5,
          pageSize: this.pageSize,
          currentPage: this.pageIndex
        }
      })
        .then(response => {
          const data = response.data.data.result.agreements
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              _this.dataList = data
              _this.dataTotalSize = response.data.data.result.totalRecord
            } else {
              if (data.length === 0 && this.pageIndex > 1) {
                this.pageIndex--
              }
              _this.dataList = []
              _this.dataTotalSize = 0
            }
            _this.loading = false
          } else {
            _this.loading = false
            // alert(response.data.msg);
          }
        })
        .catch(error => {
          // alert(error);
          if (error) {}
          _this.loading = false
        })
    },
    remove (_id) {
      this.$confirm('Confirm delete?', 'Tip', {}).then(() => {
        this.$axios({
          'method': 'get',
          'url': `${this.YT_PROD_PATH}common/message/del`,
          'params': {
            'messageIds': _id,
            'jumpType': 2
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
    batchRemove () {
      this.$confirm('Confirm delete all?', 'Tip', {}).then(() => {
        let ids = this.dataList.map(item => {
          return item.id
        })
        this.$axios({
          'method': 'get',
          'url': `${this.YT_PROD_PATH}common/message/del`,
          'params': {
            'messageIds': ids.join(),
            'jumpType': 2
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
    },
    view (_unit) {
      this.viewMessage(_unit.offerId)
      this.$router.push({
        name: 'process-null',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _unit.offerId, type: 0, types: 1}))},
        params: {id: _unit.offerId, type: 0, types: 1}
      })
    },
    viewMessage (_offerId) {
      // this.$axios.get(`${this.YT_PROD_PATH}common/message/updateByMessageId`, {params: {messageId: _id, jumpType: 2}})
      //   .then(res => {})
      this.$axios.get(`${this.YT_PROD_PATH}common/message/updateByOfferId`, {params: {offerId: _offerId}})
        .then(res => {})
    }
  },
  created () {
    this.getDataList()
  }
}
</script>
