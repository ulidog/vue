<style scoped>
.house-list-layer{
  width: 100%;
  min-width: 1280px;
  height: 100%;
  min-height: 800px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog{
  width: 40%;
  height: 70%;
  background-color: #f3f4f5;
  border-radius: 1em;
  position: relative;
}

.dialog>h6:first-child{
  font-size: 1.5em;
  line-height: 4em;
  text-align: center;
}

.house-list-box{
  width: 92%;
  height: 70%;
  border-radius: 1em;
  margin: 0 auto;
  overflow: auto;
  background-color: #ffffff;
}

.house-unit{
  width: 96%;
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
}

.el-checkbox{
  transform: matrix(1.5, 0, 0, 1.5, 0 , 0);
}

.house-unit .house-img{
  width: 20%;
  height: 90px;
  margin-left: 2%;
}

.info-part{
  width:480px;
  height: 100%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.floor-price .price{
  font-size: 1.2em;
  font-weight: bold;
  color: #f48a42;
}

.floor-price .price+span{
  font-size: 1em;
  color: #444444;
}

.floor-location{
  margin: 5px 0;
  color: #666666;
  line-height: 1.2em;
  height: 2.4em;
  word-break: break-word;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */;
}

.floor-location img{
  vertical-align: bottom;
}

.floor-spec{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
}

.floor-spec img{
  width: 1.2em;
}

.floor-spec span{
  color: #99aab7;
  font-size: 1em;
}
.floor-location img {
  margin: 1px;
}

.btn-group{
  margin-top: 2%;
  text-align: center;
}

.btn-group button{
  font-size: 1.2em;
  padding: 0.4em 1.2em;
  border-radius: 0.5em;
  color: #ffffff;
}

.btn-set-out{
  background-color: #3c99d6;
}

.btn-close{
  background-color: #999999;
}
.address{
  width:16px;
  height: 16px;
}
</style>

<template>
  <div class="house-list-layer" @click="layerOnClick($event)" @mousewheel="layerOnMousewheel($event)">
    <div class="dialog">
      <h6>House list</h6>
      <div class="house-list-box">
        <div v-for="(index, _key) in recommendList" :key="_key" class="house-unit">
          <el-checkbox @change="handleCheckAllChange(index)"></el-checkbox>
          <img class="house-img" :src="index.imgUrl" />
          <div class="info-part">
            <div class="floor-price">
              <span class="price">${{index.price|priceFormat}}</span>
              <span>/month</span>
            </div>
            <div class="floor-location">
              <img class="address" src="/static/img/common/header/location.png">&ensp;{{index.street}}
            </div>
            <div class="floor-spec">
              <div class="bathroom">
                <img src="/static/img/listing/icons/bed.png" />
                {{index.bathroom}}
                <span v-if="index.bedroom !== 'studio'">bds</span>
                <span v-else>&nbsp;</span>
              </div>
              <div class="bedroom">
                <img src="/static/img/listing/icons/bath.png" />
                {{index.bedroom}}
                <span>ba</span>
              </div>
              <div class="sqft">
                <img src="/static/img/listing/icons/Sqft.png" />
                {{index.livingSqft|priceFormat}}
                <span>sqft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn-set-out" @click="sendhouse" :disabled="isCheckInp.length === 0">Set out</button>
        <button class="btn-close" @click="closeLayer">close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recommendList: [],
      isCheckInp: []
    }
  },
  'props': {
    'detailInfo': {},
    'houseListVisibility': {
      type: Boolean,
      default: false
    }
  },
  'methods': {
    closeLayer () {
      this.$emit('setHouseListVisibility', false)
    },
    layerOnClick (_e) {
      if (_e.target.classList.contains('house-list-layer')) {
        this.$emit('setHouseListVisibility', false)
      }
    },
    layerOnMousewheel (_e) {
      if (_e.target.classList.contains('house-list-layer')) {
        _e.preventDefault()
      }
    },
    renderList () {
      this.$axios({
        method: 'GET',
        url: `${this.SH_HOUSE_PROD_PATH}thouses/need/list`,
        params: {
          cityId: this.detailInfo.cityId,
          dealType: this.detailInfo.dealType === 1 ? 2 : 3,
          pageSize: 20,
          pageNum: 1
        }
      })
        .then(response => {
          const data = response.data.data.rows
          if (response.data.success) {
            if (data.length) {
              this.recommendList = data
            } else {
              // this.closeLayer();
              this.$message.error('You don’t have recommended homes.')
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
    handleCheckAllChange (_info) {
      this.isCheckInp.includes(_info.houseId) ? this.isCheckInp.splice(this.isCheckInp.indexOf(_info.houseId), 1) : this.isCheckInp.push(_info.houseId)
    },
    sendhouse () {
      let isCheckInps = this.isCheckInp.join()
      console.log(isCheckInps)
      if (isCheckInps) {
        this.$axios({
          'method': 'POST',
          'url': `${this.YT_PROD_PATH}common/message/houseRecomment`,
          'data': {
            'houseBuyRentId': isCheckInps,
            'destUserId': this.detailInfo.userId
          }
        })
          .then(response => {
            if (response.data.success) {
              this.closeLayer()
            } else {
              // alert(response.data.msg);
            }
          })
          .catch(error => {
            // alert(error);
            if (error) {}
          })
      } else {
        this.closeLayer()
        this.$message.error('Please choose suitable homes from the recommended lists.')
      }
    }
  },
  'watch': {
    houseListVisibility: {
      handler (_new, _old) {
        this.renderList()
      },
      deep: true,
      immediate: true
    }
  }

}
</script>
