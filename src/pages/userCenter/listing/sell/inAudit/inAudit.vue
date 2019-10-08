<style lang="scss" scoped>
  .part-container {
    margin-top: 2em;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
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
      <div class="info-unit" v-for="(unit, index) in collectionData" :key="index">
        <div class="cover">
          <div>
            <img v-lazy="unit.imgUrl" :key="unit.houseId" />
          </div>
        </div>
        <div class="info">
          <router-link :to="{ path: '/listing/details/'+unit.houseId}">
            <div class="name">{{unit.contactName}}</div>
            <div class="price">$ {{unit.price|priceFormat}}</div>
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
            <!-- <div class="label">
              <el-tag v-for="(label, index) in unit.labelList" :key="label + index">{{label}}</el-tag>
            </div> -->
            <!-- <div class="post-time">{{unit.createTime|timesFormat}}</div> -->
          </router-link>
        </div>
        <div class="btn-group">
          <el-button @click.stop="remove(unit.houseId)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="collectionData.length==0">
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
      :current-page="pageIndex"
       @current-change="pageTurn">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'pageIndex': 1,
      'pageSize': 10,
      'dataTotal': 0,
      'collectionData': []
    }
  },
  watch: {
    pageIndex: {
      handler (_new) {
        this.getCollectionData()
      }
    }
  },
  'methods': {

    getCollectionData () {
      // 请求数据
      this.$axios({
        'method': 'GET',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/select/center`,
        'params': {
          'statusString': 2,
          'pageSize': this.pageSize,
          'pageNum': this.pageIndex,
          'sortType': 1,
          'dealType': 1
        }
      })
        .then(response => {
          const data = response.data.data.rows
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              this.collectionData = data
              this.dataTotal = response.data.data.total
            } else {
              if (data.length === 0 && this.pageIndex > 1) {
                this.pageIndex--
              }
              this.collectionData = []
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
          'url': `${this.SH_HOUSE_PROD_PATH}thouses/delete/house`,
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
              this.getCollectionData()
            } else {
              this.$message.error(response.data.msg)
            }
          })
          .catch(error => {
            // alert(error);
            if (error) {}
          })
        this.getCollectionData()
      })
    },
    batchRemove () {
      this.remove(this.collectionData.map(item => item.houseId))
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
