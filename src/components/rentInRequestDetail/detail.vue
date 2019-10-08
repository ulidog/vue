<style scoped>
.detail-part {
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 8%;
  padding-right: 8%;
  background-color: #ffffff;
  border-radius: 1em;
  overflow: hidden;
}

.detail-part > div:first-child {
  font-size: 1.5em;
  height: 2.5em;
  text-align: center;
  margin-bottom: 3em;
}

.detail-part > div:first-child span {
  display: inline-block;
  height: 100%;
  line-height: 2.5em;
  padding-left: 1.6em;
  padding-right: 1.6em;
  background-color: #f48a42;
  border-top-right-radius: 1em;
  border-bottom-left-radius: 1em;
  color: #ffffff;
}

.price {
  float: left;
  font-size: 1.8em;
  color: #f48a42;
  font-weight: bold;
  margin-bottom: 0.6em;
}

.collect {
  float: right;
}

.collect img {
  height: 1.8em;
  cursor: pointer;
}

.location {
  color: #666666;
  margin-bottom: 1.5em;
}

.location img {
  vertical-align: bottom;
}

.el-tag {
  font-size: 1.1em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
}

table {
  font-size: 1.2em;
  margin-top: 1.5em;
}

td {
  height: 3em;
}

tr td:nth-child(2n + 1) {
  color: #99aab7;
}

tr td:nth-child(2n + 1)::before {
  content: "";
  font-size: 1em;
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-right: 0.5em;
  background-color: #99aab7;
  transform: translateY(0.125em);
}

tr td:nth-child(2n) {
  padding-left: 1.2em;
  padding-right: 4em;
  color: #666666;
}

.additional-info {
  margin-top: 2.5em;
}

.additional-info h5 {
  font-size: 1.5em;
  margin-bottom: 0.8em;
}

.additional-info p {
  font-size: 1.1em;
  line-height: 1.5em;
  text-indent: 1.8em;
  color: #646464;
}

.more {
  font-size: 1.5em;
  margin-top: 1.5em;
  color: #99aab7;
  cursor: pointer;
  text-align: right;
}

.more span:hover {
  text-shadow: 2px 2px 2px #99aab7;
}
</style>

<template>
  <div class="detail-part">
    <div>
      <span v-if="1 === detailInfo.dealType">Whole House</span>
      <span v-if="2 === detailInfo.dealType">Single Room</span>
    </div>

    <div class="price">${{detailInfo.priceMin || 0}}~{{detailInfo.priceMax || ''}}/mo</div>

    <div class="collect">
      <!-- if (collectionData.includes(detailInfo.id)) { -->
      <img
        v-if="detailInfo.ifcollection === 1"
        src="/static/img/buyRequestList/collect_yellow.png"
        @click="cancelCollect(detailInfo.id)"
      >
      <!-- } else { -->
      <img v-else src="/static/img/buyRequestList/collect_gray.png" @click="collect(detailInfo.id)">
      <!-- } -->
    </div>

    <div class="location clear">
      <img src="/static/img/common/header/location.png">
      &ensp;{{detailInfo.cityName || ''}}
    </div>

    <div class="label">
      <el-tag
        v-for="(label, index) in (typeof detailInfo.labelId == 'string' ?  detailInfo.labelId.split(',') : detailInfo.labelId )"
        :key="label + index"
      >{{label}}</el-tag>
    </div>

    <table>
      <tbody>
        <tr>
          <td>Bedrooms</td>
          <td>{{detailInfo.bedroom || ''}}</td>
          <td>Bathrooms</td>
          <td>{{detailInfo.bathroom || ''}}</td>
        </tr>
        <tr>
          <td>Garages</td>
          <td>{{detailInfo.garage || ''}}</td>
          <td>Living sqft</td>
          <td>{{detailInfo.livingSqlfMax || ''}}</td>
        </tr>
        <tr>
          <td>Housing type</td>
          <td>{{detailInfo.houseType || ''}}</td>
          <td>Release time</td>
          <td>{{detailInfo.addTimeFormatDate || ''}}</td>
        </tr>
      </tbody>
    </table>

    <div class="additional-info">
      <h5>Additional information</h5>
      <p>{{detailInfo.additionalInformation || ''}}</p>
    </div>

    <vue-recommend :detailInfo="detailInfo" @setHouseListVisibility="setHouseListVisibility"></vue-recommend>

    <vue-potential-renter :detailInfo="detailInfo" :collectionData="collectionData">
      <!-- :collectionData="collectionData"
      @collect="collect"
      @cancelCollect="cancelCollect"-->
    </vue-potential-renter>

    <div class="more">
      <router-link to="/rentInRequestList" tag="span">More &gt;</router-link>
    </div>

    <vue-house-list
      v-if="houseListVisibility"
      @setHouseListVisibility="setHouseListVisibility"
      :houseListVisibility="houseListVisibility"
      :detailInfo="detailInfo"
    ></vue-house-list>
  </div>
</template>

<script>
import VueRecommend from '@/components/rentInRequestDetail/recommend.vue'
import VuePotentialRenter from '@/components/rentInRequestDetail/potentialRenter.vue'
import VueHouseList from '@/components/rentInRequestDetail/houseList.vue'

import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      houseListVisibility: false
    }
  },
  components: {
    'vue-recommend': VueRecommend,
    'vue-potential-renter': VuePotentialRenter,
    'vue-house-list': VueHouseList
  },
  props: {
    detailInfo: {},
    collectionData: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    collect (_id) {
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
          collectionType: 3
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            _this.detailInfo.ifcollection = 1
            this.collectionData.push(_id)
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    cancelCollect (_id) {
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
            _this.detailInfo.ifcollection = 0
            this.collectionData.splice(this.collectionData.indexOf(_id), 1)
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    setHouseListVisibility (_bool) {
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.houseListVisibility = _bool
    }
    // mounted() {
    //   this.collectionData[0] = this.detailInfo.ifcollection
    // },
  }
}
</script>
