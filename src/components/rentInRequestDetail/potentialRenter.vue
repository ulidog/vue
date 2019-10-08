<style scoped>
.potential-renter-part {
  margin-top: 4em;
}

.potential-renter-part > h5:first-child {
  font-size: 1.5em;
  text-align: center;
  color: #3c99d6;
  margin-bottom: 1.5em;
}

.part-body {
  display: flex;
  justify-content: space-between;
}

.info-unit {
  width: 32%;
  padding-top: 1em;
  padding-bottom: 1.5em;
  padding-left: 1em;
  padding-right: 1em;
  border: 1px solid #3c99d6;
}

.info-unit .title {
  font-size: 1em;
  height: 2em;
  text-align: center;
  margin-bottom: 2em;
}

.info-unit .title span {
  display: inline-block;
  height: 100%;
  line-height: 2em;
  padding-left: 1em;
  padding-right: 1em;
  background-color: #f48a42;
  border-top-right-radius: 1em;
  border-bottom-left-radius: 1em;
  color: #ffffff;
}

.floor-collection {
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.floor-collection .left-part {
  display: flex;
  align-items: center;
}

.floor-collection .left-part img {
  width: 30%;
  margin-right: 0.5em;
}

.floor-collection .left-part div p:first-child {
  font-size: 1.2em;
  color: #444444;
}

.floor-collection .left-part div p:last-child {
  font-size: 1em;
  color: #646464;
}

.floor-collection .collect {
  display: flex;
  align-items: center;
  padding: 10px;
}

.floor-collection .collect img {
  width: 1.5em;
  cursor: pointer;
}

.floor-price {
  margin-top: 1em;
}

.floor-price .price {
  font-size: 1.2em;
  font-weight: bold;
  color: #f48a42;
}

.floor-price .price + span {
  font-size: 1em;
  color: #444444;
}

.floor-location {
  color: #666666;
  margin-top: 1em;
  white-space: wrap;
  word-break: break-word;
}

.floor-location img {
  vertical-align: bottom;
}

.floor-spec {
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
}

.floor-spec img {
  width: 1.2em;
}

.floor-spec span {
  color: #99aab7;
}

.floor-label {
  margin-top: 1em;
}

.el-tag {
  font-size: 1em;
  margin-right: 0.4em;
  margin-bottom: 0.4em;
}
</style>

<template>
  <div class="potential-renter-part">
    <h5>Potential renters</h5>

    <div class="part-body">
      <div v-for="(index, _key) in recommendList" :key="_key" class="info-unit" @click="gotoDetail(index)">
        <div class="title">
          <span>{{index.releaseType == 1 ? "Whole house" : index.releaseType== 2 ? "Single room":"Buying Request" }}</span>
        </div>

        <div class="floor-collection" >
          <div class="left-part">
            <img :src="index.userHeadUrl">
            <div>
              <p>{{index.contactName}}</p>
              <p>{{index.addTimeFormatDate}}</p>
            </div>
          </div>
          <div class="collect">
            <!-- if (index.ifcollection) { -->
            <img
              v-if="index.ifcollection !== 0"
              :bind-title="index.ifcollection"
              src="/static/img/buyRequestList/collect_yellow.png"
              @click.stop="cancelCollect(index.id,index.releaseType,_key)"
            >
            <!-- } else { -->
            <img
              v-else
              :bind-title="index.ifcollection"
              src="/static/img/buyRequestList/collect_gray.png"
              @click.stop="collect(index.id,index.releaseType,_key)"
            >
            <!-- } -->
          </div>
        </div>

        <div class="floor-price" >
          <span class="price">${{index.priceMin}}-{{index.priceMax}}</span>
          <span v-if="true">/month</span>
        </div>

        <div class="floor-location" >
          <img src="/static/img/common/header/location.png">
          &ensp;{{index.cityName}},{{index.stateName}}
        </div>

        <div class="floor-spec" >
          <div class="bedroom">
            <img src="/static/img/listing/icons/bed.png">
            {{index.bedroom}}
            <span v-if="index.bedroom !== 'studio'">bds</span>
            <span v-else>&nbsp;</span>
          </div>
          <div class="bathroom">
            <img src="/static/img/listing/icons/bath.png">
            {{index.bathroom}}
            <span>ba</span>
          </div>
          <div class="sqft">
            <img src="/static/img/listing/icons/Sqft.png">
            {{index.livingSqlfMax}}
            <span>sqft</span>
          </div>
        </div>
        <div class="floor-label">
          <!-- <el-tag v-for="(label, index) in detailInfo.labelList" :key="label + index">{{label}}</el-tag> -->
          <div v-for="(item, _key) in index.labelId ? index.labelId.split(',') : 0" :key="_key">
            <el-tag v-if="_key < 2">{{item}}</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/session'

export default {
  data () {
    return {
      recommendList: []
    }
  },
  props: {
    detailInfo: {},
    collectionData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getGoodData () {
      if (this.detailInfo.cityId) {
        const _this = this
        // 请求数据
        this.$axios({
          method: 'POST',
          url: `${this.zjc_path}findNearbyHousesList`,
          data: {
            cityId: _this.detailInfo.cityId,
            releaseType: _this.detailInfo.releaseType,
            collectionUserId: localStorage.getItem('uid'),
            id: _this.id
          }
        })
          .then(response => {
            const data = response.data.data
            if (response.data.success) {
              this.recommendList = data
            } else {
              // alert(response.data.msg)
            }
          })
      }
    },
    collect (_id, _dealType, index) {
      var _this = this
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.$axios({
        method: 'post',
        url: `${this.zjc_path}insertHouseCollection`,
        data: {
          housesId: _id,
          collectionType: _dealType === 1 ? 2 : _dealType === 2 ? 3 : 4
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            _this.recommendList[index].ifcollection = 1
            this.collectionData.push(_id)
          } else {
            // alert(data.msg)
          }
        })
    },
    cancelCollect (_id, _dealType, index) {
      var _this = this
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.$axios({
        method: 'post',
        url: `${this.zjc_path}deleteCancelHouseCollection`,
        data: { housesId: _id }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            _this.recommendList[index].ifcollection = 0
            this.collectionData.splice(this.collectionData.indexOf(_id), 1)
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    gotoDetail (_detailInfo) {
      let _this = this
      this.$router.push({
        path: '/rentInRequestDetail',
        query: {
          detailParam: _this.$base64.encode(
            JSON.stringify({
              id: _detailInfo.id,
              collectionUserId: _detailInfo.userId
            })
          )
        }
      })
    }
  },
  watch: {
    detailInfo: {
      handler () {
        this.getGoodData()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
