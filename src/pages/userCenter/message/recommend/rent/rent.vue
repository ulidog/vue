<style scoped>
  .re-list-container {
    padding: 0 0 30px 0;
  }
  .info-unit {
    padding: 40px 50px;
    border-bottom: 2px solid #f9fafa;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
    height: 256px;
  }

  .cover {
    height: 100%;
    flex-shrink: 1;
    width: 14.625em;
    border-radius: 5px;
    align-self: stretch;
    display: flex;
    align-items: center;
    position: relative;
  }

  .cover img.main-img {
    width: 100%;
    border-radius: 5px;
    height: 100%;
  }
  .cover img.img-unit {
    position: absolute;
    left: 0;
    top: 0;
  }

  .info {
    align-self: stretch;
    width: 29.375em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 24px;
  }

  .info a>div {
    width: 100%;
    margin-bottom: 0.5em;
  }

  .name {
    font-size: 2em;
    color: #444444;
    font-weight:400;
  }

  .price {
    font-size: 1.5em;
    font-weight: 400;
    color: #F48A42;
    display: flex;
    align-items: center;
  }
  .price img {
    margin-right: 5px;
  }

  .spec {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #444;
    font-weight: 1.125em;
  }
  .spec>div {
    display: flex;
    align-items: center;
  }
  .spec>div img {
    margin-right: 5px;
  }
  .spec span.unit {
    color: #444;
    margin-right: 1.125em;
    margin-left: 5px;
  }

  .location {
    color: #666666;
    display: flex;
    align-items: center;
    margin: 0 0 8px !important;
  }
  .location>img{
    margin-right: 5px;
  }

  .el-tag {
    font-size: 0.9em;
    margin-right: 0.4em;
    margin-bottom: 0.4em;
  }

  .post-time {
    color: #444;
    display: flex;
    align-items: center;
    margin: 0 !important;
  }
  .post-time>img{
    margin-right: 5px;
  }

  .info-unit .delete-btn {
    width: 121px;
    height: 40px;
    flex-shrink: 1;
    border: 1px solid #1281FC;
    color: #1281FC;
    font-size: 1.125em;
    transition: all .5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .info-unit>>>.delete-btn:hover {
    width: 121px;
    height: 40px;
    background: linear-gradient(to right,rgba(100,170,247,1),rgba(18,129,252,1));
    border-radius: 5px;
    color: #fff;
    font-size: 1.125em;
    border: none;
    display: flex;
    align-items: center;
    transition: all .5s ease;
  }

  .batch-delete {
    font-size: 1em;
    padding: 0.4em 0.8em;
    margin-top: 2em;
    float: right;
    border: 1px solid #999999;
    border-radius: 0.4em;
    color: #999999;
    display: flex;
    align-items: center;
  }

  .batch-delete:hover {
    color: #409EFF;
    border-color: #409EFF;
  }

  .el-pagination {
    padding-top: 2em;
    text-align: center;
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
  <div v-loading="loading" class="re-list-container">
    <div class="list-container">
      <div class="info-unit" v-for="(unit, index) in collectionData" :key="index">
        <div class="cover">
          <img v-lazy="unit.housePicUrl" :key="unit.id" class="main-img"/>
          <img class="img-unit" v-if="'2' === unit.house_status" src="/static/img/userCenter/whole_house_logo.png" />
          <img class="img-unit" v-if="'3' === unit.house_status" src="/static/img/userCenter/single_room_logo.png" />
        </div>
        <div class="info">
          <router-link :to="{ path: '/listing/details/'+unit.houseId}">
            <div class="name">{{unit.houseHost}}</div>
            <div class="price"><img src="/static/img/userCenter/price.png" />$ {{unit.housePrice|priceFormat}}</div>
            <div class="spec">
              <div class="bedroom">
                <img src="/static/img/userCenter/bed.png" />
                <span>{{unit.houseBedroom}}</span>
                <span class="unit">bds</span>
              </div>
              <div class="bathroom">
                <img src="/static/img/userCenter/ba.png" />
                <span>{{unit.houseBathroom}}</span>
                <span class="unit">ba</span>
              </div>
              <div class="sqft">
                <img src="/static/img/userCenter/sqft.png" />
                <span>{{unit.houseLivingSpace}}</span>
                <span class="unit">Sqft</span>
              </div>
            </div>
            <div class="location">
              <img src="/static/img/userCenter/adr.png" />
              <span>{{unit.houseAddress}}</span>
            </div>
            <div class="post-time">
              <img src="/static/img/userCenter/time.png" />
              <span>{{unit.dateTime|timerFormat}}</span>
            </div>
          </router-link>
        </div>
        <el-button class="delete-btn" @click="remove(unit.id)">Delete</el-button>
      </div>
      <div class="noData" v-if="collectionData.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
    <el-pagination
      v-show="dataTotal > 0 ? true : false"
      class="clear"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="dataTotal"
      :current-page="pageIndex"
       @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'loading': false,
      'pageIndex': 1,
      'pageSize': 10,
      'dataTotal': 0,
      'collectionData': []
    }
  },
  watch: {
    'pageIndex': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.getCollectionData()
        }
      }
    }
  },
  filters: {
    timerFormat: (timer) => {
      if (timer === null) return
      const time = timer.toString().length <= 10 ? `${timer}000` : timer
      const timers = new Date(Number(time))
      return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    },
    priceFormat (_N) {
      let AfterProgressing = []
      Number(_N).toString().replace(/\D/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return AfterProgressing.reverse().join('')
    }
  },
  'methods': {
    getCollectionData () {
      const _this = this
      _this.loading = true
      // 请求数据
      _this.$axios({
        method: 'GET',
        url: `${_this.YT_PROD_PATH}common/message/getMessageByStatus`,
        params: {
          jump_type: 3,
          house_type: 5,
          pageSize: this.pageSize,
          currentPage: _this.pageIndex
        }
      })
        .then(response => {
          const data = response.data.data.result.recomments
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              _this.collectionData = data
              _this.dataTotal = response.data.data.result.totalRecord
            } else {
              _this.collectionData = []
              _this.dataTotal = 0
            }
            _this.loading = false
          } else {
            if (data.length === 0 && this.pageIndex > 1) {
              this.pageIndex--
            }
            // alert(response.data.msg);
            _this.loading = false
          }
        })
        .catch(error => {
          if (error) {}
          // alert(error);
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
            'jumpType': 3
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.getCollectionData()
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
      this.remove(this.collectionData.map(item => item.id).join(','))
    },
    pageTurn (_num) {
      this.pageIndex = _num
    }
  },
  created () {
    this.getCollectionData()
  }
}
</script>
