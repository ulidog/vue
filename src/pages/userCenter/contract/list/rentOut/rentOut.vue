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
  width: 25%;
  border-radius: 0.5em;
  background-color: #eeeeee;
}

.cover img{
  width: 100%;
  border-radius: 0.5em;
}

.info{
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

.status-flag{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5em 0.6em;
  border-radius: 0.5em;
}

.status-flag::before{
  display: block;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
  content: '';
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: 0 0 ;
}

.status-flag::after{
  display: block;
  content: '';
  font-size: 1.2em;
}

.status-flag.processing{
  background-color: #eff6fe;
}

.status-flag.processing::before{
  background-image: url('/static/img/userCenter/loading_icon.png');
}

.status-flag.processing::after{
  content: 'Processing';
  color: #3c80c6;
}

.status-flag.success{
  background-color: #f0f9eb;
}

.status-flag.success::before{
  background-image: url('/static/img/userCenter/success_icon.png');
}

.status-flag.success::after{
  content: 'Success';
  color: #67c23a;
}

.status-flag.fail{
  background-color: #fdf6ec;
}

.status-flag.fail::before{
  background-image: url('/static/img/userCenter/warning_icon.png');
}

.status-flag.fail::after{
  content: 'Fail';
  color: #e6a23c;
}

.info-unit .btn-group .el-button{
  width: 100%;
  margin-top: 1em;
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
        <div class="cover" @click="goViewHouseDetails(unit.housesId)">
          <img v-lazy="unit.imgUrl" :key="unit.housesId" />
        </div>
        <div class="info" @click="goViewHouseDetails(unit.housesId)">
          <div class="name">
            <el-badge value="new" class="item" :hidden="unit.messageCount === 0">{{ unit|fetchName }}</el-badge>
          </div>
          <div class="price">$ {{unit.monthlyRent}} /mo</div>
          <div class="location">
            <img src="/static/img/common/header/location.png" />
            {{unit.street}}
          </div>
          <div class="post-time">{{unit.createTime|timerFormat}}</div>
        </div>
        <div class="btn-group">
          <div :class="['status-flag', stateStry(unit.state)]"></div>
          <el-button type="primary" @click="goProcessPage(unit)">View Details</el-button>
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
      'pageSize': 10,
      'dataTotal': 0,
      'collectionData': []
    }
  },
  filters: {
    fetchName: (val) => {
      return (val.firstname || '') + (val.middlename || '') + ' ' + (val.lastname || '')
    },
    timerFormat: (timer) => {
      if (timer === null) return
      const time = timer.toString().length > 10 ? timer : `${timer}000`
      const timers = new Date(Number(time))
      return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    }
  },
  watch: {
    'pageIndex': function (val) {
      this.fetchRentList()
    }
  },
  methods: {
    pageTurn (_num) {
      this.pageIndex = _num
    },
    fetchRentList () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}rentHouseOrder/find_my_deal_seller`, {params: {pageNum: _this.pageIndex, pageSize: _this.pageSize}})
        .then(res => {
          const data = res.data.data.rows
          if (res.data.success && data instanceof Array && data.length > 0) {
            _this.dataTotal = res.data.data.total
            _this.collectionData = data
          } else {
            if (data.length === 0 && this.pageIndex > 1) {
              this.pageIndex--
            }
          }
        })
        .catch(err => {
          console.info(err)
        })
    },
    stateStry: (state) => {
      switch (state) {
        case 400:
          return 'fail'
        case 200:
          return 'success'
        default:
          return 'processing'
      }
    },
    readyNotifice (_id) {
      const _this = this
      _this.$axios.get(`${this.YT_PROD_PATH}common/message/updateByOfferId`, {params: {offerId: _id}})
        .then(res => {})
    },
    goProcessPage (params) {
      if (params.messageCount !== 0) {
        this.readyNotifice(params.id)
      }
      /**
       * @param { type: Number, types: Number }
       * @type 普通交易流程还是SFT
       * @types 租赁还是购买
       **/
      this.$router.push({
        name: 'process-null',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: params.id, type: 0, types: 1}))},
        params: {id: params.id, type: 0, types: 1}
      })
    },
    goViewHouseDetails (_id) {
      this.$router.push({
        path: '/listing/details/' + _id
        // query: {ebuyhouse: this.$base64.encode(JSON.stringify({houseId: _id}))}
      })
    }
  },
  created () {
    this.fetchRentList()
  }
}
</script>
