<style scoped>
  .part-container {
    margin: 0 auto;
  }

  .info-unit {
    padding-top: 1em;
    padding-bottom: 1em;
    padding-right: 2%;
    border-bottom: 2px solid #f9fafa;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
  }

  .info-unit:first-child {
    border-top: 2px solid #f9fafa;
  }

  .avatar {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .avatar img {
    width: 80%;
    border-radius: 50%;
  }

  .name {
    font-size: 1.1em;
    margin-top: 0.5em;
    color: #444444;
  }

  .info {
    align-self: stretch;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .info>a>div {
    width: 100%;
    margin-bottom: 0.5em;
  }

  .price {
    font-size: 1.5em;
    font-weight: bold;
    color: #f48a42;
  }

  .spec {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #666666;
  }

  .spec img {
    width: 1.2em;
    vertical-align: bottom;
  }

  .spec span {
    color: #99aab7;
    margin-right: 2em;
  }

  .location {
    color: #666666;
    display: flex;
    align-items: flex-end;
  }

  .el-tag {
    font-size: 0.9em;
    margin-right: 0.4em;
    margin-bottom: 0.4em;
  }

  .post-time {
    color: #999999;
  }

  .btn-group {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .img-heart {
    width: 30%;
    margin-bottom: 1em;
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
    margin-top: 2em;
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
  <div class="part-container">
    <div class="list-container">
      <div class="info-unit" v-for="(unit, index) in historyData" :key="index"  @click="gotoDetail(unit)">
        <div class="avatar">
          <img v-lazy="unit.userHeadUrl" :key="unit.houseId"/>
          <p class="name">{{unit.contactName}}</p>
        </div>
        <div class="info">
          <router-link :to="{ path: '/listing/details/'+unit.houseId}">
            <div class="price">$ {{unit.priceMin|priceFormat}} - {{unit.priceMax|priceFormat}}</div>
            <div class="spec">
              <div class="bedroom">
                <img src="/static/img/listing/icons/bed.png" />
                {{unit.bedroom}}
                <span v-if="unit.bedroom !== 'studio'">bds</span>
                <span v-else>&nbsp;</span>
              </div>
              <div class="bathroom">
                <img src="/static/img/listing/icons/bath.png" />
                {{unit.bathroom}}
                <span>ba</span>
              </div>
              <div class="sqft">
                <img src="/static/img/listing/icons/Sqft.png" />
                {{unit.livingSqftMin|priceFormat}} - {{unit.livingSqlfMax|priceFormat}}
                <span>sqft</span>
              </div>
            </div>
            <div class="location">
              <img src="/static/img/common/header/location.png" />
              {{unit.cityName}}  {{unit.stateName}}
            </div>
            <div class="label">
              <el-tag v-for="(label, indexs) in unit.labelId" :key="indexs">{{label}}</el-tag>
            </div>
            <div class="post-time">{{unit.addTimeFormatDate}}</div>
          </router-link>
        </div>
        <div class="btn-group">
          <el-button @click.stop="remove(unit.id)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="historyData.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
    <el-pagination
      v-if="dataTotal > pageSize"
      class="clear"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="dataTotal"
      @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'pageIndex': 1,
      'pageSize': 3,
      'dataTotal': 0,
      'historyData': []
    }
  },
  'methods': {
    getHistoryData () {
      // 请求数据
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}recordList`,
        'data': {
          'recordType': 3,
          'pageSize': this.pageSize,
          'pageNum': this.pageIndex
        }
      })
        .then(response => {
          const data = response.data.data.rows
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              data.forEach(item => {
                if (item.labelId) {
                  item.labelId = item.labelId.split(',')
                } else {
                  item.labelId = []
                }
              })
              this.historyData = data
              this.dataTotal = response.data.data.total
            } else {
              if (data.length === 0 && this.pageIndex > 1) {
                this.pageIndex--
                this.getHistoryData()
              }
              this.historyData = []
              this.dataTotal = 0
            }
          } else {
            // alert(response.data.msg);
          }
        })
        .catch(error => {
          // alert(error);
          if (error) {}
        })
    },
    remove (_id) {
      this.$confirm('Confirm delete?', 'Tip', {}).then(() => {
        this.$axios({
          'method': 'post',
          'url': `${this.zjc_path}recordDelete`,
          'data': {
            'id': _id
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: 'success',
                type: 'success'
              })
              this.getHistoryData()
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
    gotoDetail (_detailInfo) {
      this.$router.push({
        path: '/requestDetail',
        query: {id: _detailInfo.id}
      })
    },
    batchRemove () {
      this.remove(this.historyData.map(item => item.id))
    },
    pageTurn (_num) {
      this.pageIndex = _num
      this.getHistoryData()
    }
  },
  created () {
    this.getHistoryData()
  }
}
</script>
