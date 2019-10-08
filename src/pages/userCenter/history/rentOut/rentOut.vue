<style lang="scss" scoped>
  .part-container {
    // margin-top: 2em;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    padding-bottom: 50px;
  }

  .info-unit {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 2px solid #f9fafa;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: pointer;
  }

  .info-unit:first-child {
    border-top: 2px solid #f9fafa;
  }

  .cover {
    flex-shrink: 1;
    width: 28%;
    border-radius: 0.5em;
    align-self: stretch;
    background-color: #eeeeee;
    display: flex;
    align-items: center;
    height: 175px
  }

  .cover>div {
    width: 100%;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 0.5em;
  }

  .cover>div img:first-child {
    display: block;
    width: 100%;
    border-radius: 0.5em;
  }

  .cover>div img+img {
    position: absolute;
    width: 27%;
    left: 0;
    top: 0;
  }

  .info {
    align-self: stretch;
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .info>a>div {
    width: 100%;
    margin-bottom: 0.5em;
  }

  .name {
    font-size: 1.5em;
    color: #444444;
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

  .info-unit .btn-group {
    align-self: stretch;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .info-unit .btn-group.grayscale {
    filter: grayscale(100%);
  }
  .info-unit .btn-group>span {
    margin-top: 15px;
    color: #999999;
    font-size: 16px;
  }

  /deep/ .btn-group .el-button+.el-button {
    margin-top: 0.5em;
    margin-left: 0;
  }
  /deep/ .btn-group .el-button {
    border: 1px solid #1281FC;
    color: #1281FC;
    height: 40px;
    padding: 0;
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
    font-size: 18px;
    &:hover {
      background: linear-gradient(to right, #63a9f7, #1381fc);
      border: none;
      color: #fff;
      transition: all .3s ease;
    }
  }
  /deep/ .btn-group.grayscale .el-button:hover {
    background: none;
    color: #666;
    border: 1px solid #666;
    filter: grayscale(100%);
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
      <div class="info-unit" v-for="(unit, index) in historyData" :key="index">
        <div class="cover">
          <div>
            <img v-lazy="unit.imgUrl" :key="unit.houseId" />
            <img v-if="'whole' === unit.type" src="/static/img/userCenter/whole_house_logo.png" />
            <img v-if="'single' === unit.type" src="/static/img/userCenter/single_room_logo.png" />
          </div>
        </div>
        <div class="info">
          <router-link :to="{ path: '/listing/details/'+unit.houseId}">
            <div class="price">$ {{unit.price|priceFormat}}/mo</div>
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
                {{unit.livingSqft|priceFormat}}
                <span>sqft</span>
              </div>
            </div>
            <div class="location">
              <img src="/static/img/common/header/location.png" />
              {{unit.street}}
            </div>
            <div class="label">
              <el-tag v-for="(label, indexs) in unit.labelList" :key="indexs">{{label.name}}</el-tag>
            </div>
            <div class="post-time">{{unit.createTime|timesFormat}}</div>
          </router-link>
        </div>
        <div class="btn-group">
          <el-button @click.stop="remove(unit.houseId)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="historyData.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
   <button v-if="historyData.length > 1" class="batch-delete" @click="batchRemove">
      <img src="/static/img/userCenter/batch_delete.png"/>&ensp;delete in batches
    </button>
    <el-pagination
      v-if="dataTotal > pageSize"
      class="clear"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="dataTotal"
      @current-change="pageTurn"
    >
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
  filters: {
    rentPayType (_V) {
      return [_V].map(item => {
        let typeString
        switch (Number(item)) {
          case 1:
            typeString = 'Monthly'
            break
          case 2:
            typeString = 'Quarterly'
            break
          case 3:
            typeString = 'Half year'
            break
          case 4:
            typeString = 'Year'
            break
        }
        return typeString
      })[0]
    }
  },
  'methods': {
    getHistoryData () {
      // 请求数据
      this.$axios({
        'method': 'get',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/browse/house`,
        'params': {
          'dealType': 5,
          'pageSize': this.pageSize,
          'pageNum': this.pageIndex,
          'sortType': 1
        }
      })
        .then(response => {
          const data = response.data.data.rows
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
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
            // alert(response.data.msg)
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
          'url': `${this.SH_HOUSE_PROD_PATH}thouses/delete/browse/house`,
          'data': {
            'houseId': _id
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
            // alert(error)
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
      // this.remove(this.historyData.map(item => item.id))
      let ids = this.historyData.map(item => {
        return item.houseId
      })
      this.remove(ids.join())
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
