<style scoped>
.part-container{
  margin: 0 auto;
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

.cover{
  flex-shrink: 1;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 28%;
  background-color: #eeeeee;
  border-radius: 0.5em;
  overflow: hidden;
}

.cover>div{
  position: relative;
}

.cover>div img:first-child{
  display: block;
  width: 100%;
  border-radius: 0.5em;
}

.cover>div img+img{
  position: absolute;
  width: 27%;
  left: 0;
  top: 0;
}

.info{
  align-self: stretch;
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.info>a>div{
  width: 100%;
  margin-bottom: 0.5em;
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
  align-items: flex-start;
}
.location>span{
  margin-left: 10px;
}
.el-tag{
  font-size: 0.9em;
  margin-right: 0.4em;
  margin-bottom: 0.4em;
}

.post-time{
  color: #999999;
}

.info-unit .el-button{
  flex-shrink: 1;
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
      <div class="info-unit" v-for="(unit, index) in collectionData" :key="index">
        <div class="cover">
          <div>
            <img v-lazy="unit.imgUrl" :key="unit.id"/>
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
              <span>{{unit.street}}</span>
            </div>
            <!-- <div class="label">
              <el-tag v-for="(label, indexs) in unit.labelList" :key="indexs">{{label.name}}</el-tag>
            </div> -->
            <div class="post-time">{{unit.createTime|timesFormat}}</div>
          </router-link>
        </div>
        <el-button @click.stop="remove(unit.houseId)">Delete</el-button>
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
    getCollectionData () {
      // 请求数据
      this.$axios({
        'method': 'GET',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/collection/house`,
        'params': {
          'pageSize': this.pageSize,
          'pageNum': this.pageIndex,
          'collectionType': 5,
          'sortType': 1
        }
      })
        .then(response => {
          const data = response.data.data.rows
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              /* data.forEach(item => {
                if (item.labelId) {
                  item.labelId = item.labelId.split(',');
                } else {
                  item.labelId = [];
                }
              }); */
              this.collectionData = data
              this.dataTotal = response.data.data.total
            } else {
              if (data.length === 0 && this.pageIndex > 1) {
                this.pageIndex--
                this.getCollectionData()
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
          'url': `${this.zjc_path}deleteCancelHouseCollection`,
          'data': {
            'housesId': _id
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: 'success',
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
    batchRemove () {
      this.remove(this.collectionData.map(item => item.id))
    },
    pageTurn (_num) {
      this.pageIndex = _num
      this.getCollectionData()
    }
  },
  created () {
    this.getCollectionData()
  }
}
</script>
