<style lang="scss" scoped>
.part-container{
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

.info-unit{
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 2px solid #f9fafa;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.info-unit:first-child{
  border-top: 2px solid #f9fafa;
}

.avatar{
  width: 20%;
  flex-shrink: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar img:first-child{
  width: 80%;
  border-radius: 50%;
  margin-bottom: 0.5em;
}

.avatar img:last-child{
  width: 30%;
  position: absolute;
  left: 0;
  top: 0;
}

.info{
  flex-grow: 1;
  align-self: stretch;
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.info>div{
  width: 100%;
  margin-bottom: 0.5em;
}

.name{
  font-size: 1.5em;
  color: #444444;
}

.price{
  font-size: 1.5em;
  font-weight: bold;
  color: #f48a42;
}

.spec{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #666666;
}

.spec img{
  width: 1.2em;
  vertical-align: bottom;
}

.spec span{
  color: #99aab7;
  margin-right: 2em;
}

.location{
  color: #666666;
  display: flex;
  align-items: flex-end;
}

.el-tag{
  font-size: 0.9em;
  margin-right: 0.4em;
  margin-bottom: 0.4em;
}

.post-time{
  color: #999999;
}

.info-unit .btn-group{
  width: 9em;
  align-self: stretch;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}

/deep/ .btn-group .el-button+.el-button{
  margin-top: 0.5em;
}

.batch-delete{
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

.batch-delete:hover{
  color: #409EFF;
  border-color: #409EFF;
}

.el-pagination{
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
      <div class="info-unit" v-for="(unit, index) in collectionData" :key="index" @click="gotoDetail(unit)">
        <div class="avatar">
          <img v-lazy="unit.userHeadUrl" :key="unit.id" />
          <div class="post-time">{{unit.addTimeFormatDate}}</div>
          <img v-if="'whole' === unit.type" src="/static/img/userCenter/whole_house_logo.png" />
          <img v-if="'single' === unit.type" src="/static/img/userCenter/single_room_logo.png" />
        </div>
        <div class="info">
          <div class="name">{{unit.contactName}}</div>
          <div class="price">$ {{unit.priceMin}} - {{unit.priceMax}} /mo</div>
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
              {{unit.livingSqlfMax}}
              <span>sqft</span>
            </div>
          </div>
          <div class="location">
            <img src="/static/img/common/header/location.png" />
            {{unit.cityName + unit.stateId}}
          </div>
          <div class="label">
            <el-tag v-for="(label, indexs) in unit.labelId" :key="indexs" v-show="label !== '' && label !== 'null'">{{label}}</el-tag>
          </div>
        </div>
        <div class="btn-group">
          <!-- <el-button @click="putOnSale(unit.id)">Put on sale</el-button> -->
          <el-button @click.stop="remove(unit.id)">Delete</el-button>
        </div>
      </div>
      <div class="noData" v-if="collectionData.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
    <!-- <button v-if="collectionData.length > 1" class="batch-delete">
      <img src="/static/img/userCenter/batch_delete.png" @click="batchRemove"/>&ensp;批量删除
    </button> -->
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
    gotoDetail (_detailInfo) {
      this.$router.push({
        path: '/requestDetail',
        query: {id: _detailInfo.id}
      })
    },
    getCollectionData () {
      // 请求数据
      this.$axios({
        'method': 'GET',
        'url': `${this.zjc_path}PersonalCenterlist`,
        'params': {
          'pageSize': this.pageSize,
          'pageNum': this.pageIndex,
          'checkStatus': 4,
          'releaseType': 4
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
          'url': `${this.zjc_path}deleteHouse`,
          'data': {
            'id': _id
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: 'successfully',
                type: 'success'
              })
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
    putOnSale (_id) {

    },
    batchRemove () {
      this.remove(this.collectionData.map(item => item.id))
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
