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

.info > div {
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

.info-unit .el-button {
  flex-shrink: 1;
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
  color: #409eff;
  border-color: #409eff;
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
  <div class='part-container'>
    <div class='list-container'>
      <div
        class='info-unit'
        v-for='(unit, index) in collectionData'
        :key="index"
        @click="gotoDetail(unit)">
        <div class="avatar">
          <img v-lazy="unit.userHeadUrl" :key="unit.id">
          <p class="name">{{unit.contactName}}</p>
        </div>
        <div class="info">
          <div class="price">$ {{unit.priceMin|priceFormat}}/mo - {{unit.priceMax|priceFormat}}/mo</div>
          <div class="spec">
            <div class="bedroom">
              <img src="/static/img/listing/icons/bed.png">
              {{unit.bedroom}}
              <span v-if="unit.bedroom !== 'studio'">bds</span>
              <span v-else>&nbsp;</span>
            </div>
            <div class="bathroom">
              <img src="/static/img/listing/icons/bath.png">
              {{unit.bathroom}}
              <span>ba</span>
            </div>
            <div class="sqft">
              <img src="/static/img/listing/icons/Sqft.png">
              {{unit.livingSqlfMax}}
              <span>sqft</span>
            </div>
          </div>
          <div class="location">
            <img src="/static/img/common/header/location.png">
            {{unit.cityName}} {{unit.stateName}}
          </div>
          <div class="label">
            <el-tag v-for="(label, indexs) in unit.labelId" :key="indexs">{{label}}</el-tag>
          </div>
          <div class="post-time">{{unit.addTimeFormatDate}}</div>
        </div>
        <el-button @click.stop="remove(unit.id)">Delete</el-button>
      </div>
      <div class="noData" v-if="collectionData.length==0">
        <img src="/static/img/userCenter/Nonewcontents.jpg" alt="">
      </div>
    </div>
    <!-- <button v-if="collectionData.length > 1" class="batch-delete">
      <img src="/static/img/userCenter/batch_delete.png" @click="batchRemove"/>&ensp;批量删除
    </button>-->
    <el-pagination
      v-if="dataTotal > pageSize"
      class="clear"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="dataTotal"
      @current-change="pageTurn"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 3,
      dataTotal: 0,
      collectionData: []
    }
  },
  methods: {
    gotoDetail (_detailInfo) {
      this.$router.push({
        path: '/requestDetail',
        query: {id: _detailInfo.id}
      })
    },
    getCollectionData () {
      // 请求数据
      this.$axios({
        method: 'post',
        url: `${this.zjc_path}findMyCollectionList`,
        data: {
          collectionType: 5,
          pageSize: this.pageSize,
          pageNum: this.currentPage
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
              // alert(this.dataTotal)
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
          method: 'post',
          url: `${this.zjc_path}deleteCancelHouseCollection`,
          data: {
            housesId: _id
          }
        })
          .then(response => {
            if (response.data.success) {
              this.$message({
                message: 'successfully',
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
      console.log(this.collectionData.map(item => item.id))
    },
    pageTurn (_num) {
      this.currentPage = _num
      this.getCollectionData()
    }
  },
  mounted () {
    this.getCollectionData()
  }
}
</script>
