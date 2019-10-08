<style lang="scss" scoped>
.list-part-container{
  width: 100%;
  padding-top: 4em;
  padding-bottom: 10em;
  background-color: #f3f4f5;
}

.list-part-brow{
  width: 62%;
  height: 3em;
  margin: 0 auto;
  border-bottom: 1px solid #639fd6;
}

.list-part-brow>button{
  height: 100%;
  font-size: 1.2em;
  padding-left: 2em;
  padding-right: 2em;
  color: #444444;
  float: left;
}

.list-part-brow>button.active{
  background-color: #639fd6;
  color: #ffffff;
}

.list-part-brow .el-select{
  float: right;
  width: 25%;
  height: 100%;
  padding-bottom: 0.2em;
}

/deep/ .list-part-brow .el-select .el-input{
  height: 100%;
}

/deep/ .list-part-brow .el-select .el-input__inner{
  height: 100%;
  padding-left: 0.5em;
  padding-right: 0;
  font-size: 1.2em;
}

/deep/ .list-part-brow .el-select .el-input .el-select__caret{
  font-size: 2em;
}

.list-part-body{
  width: 62%;
  margin: 0 auto;
}

.info-unit{
  padding-top: 1em;
  padding-bottom: 0.5em;
  padding-right: 0.5em;
  border-bottom: 1px solid #eaeaea;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.info-unit:hover{
  background-color: #ffffff;
}

.avatar-wrap{
  width: 14%;
}

.avatar-wrap img{
  display: block;
  width: 80%;
  margin: 0 auto;
}

.info-wrap{
  width: 86%;
}

.row{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.row{
  margin-bottom: 1em;
}

.row-left{
  width: 80%;
  display: flex;
  align-items: center;
}

.name{
  font-size: 2em;
  color: #444444;
  margin-right: 10%;
}

.bathroom,
.bedroom,
.sqft{
  margin-right: 4%;
  display: flex;
  align-items: flex-end;
  color: #666666;
  font-size: 1.2em;
}

.bathroom img,
.bedroom img,
.sqft img{
  width: 1.2em;
  margin-right: 0.4em;
}

.bathroom span,
.bedroom span,
.sqft span{
  margin-left: 0.4em;
}

.row-right{
  display: flex;
  align-items: center;
}

.release-time{
  color: #666666;
}

.location{
  display: flex;
  align-items: flex-end;
  color: #4e8dd1;
}

.price-range{
  color: #f48a42;
  font-size: 1.5em;
  font-weight: bold;
}

.el-tag{
  font-size: 1.1em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
}

.collect-count{
  display: flex;
  align-items: center;
  font-size: 1em;
}

.collect-count img{
  width: 2em;
  margin-right: 0.5em;
  cursor: pointer;
}

.el-pagination{
  margin-top: 4em;
  text-align: center;
}
</style>

<template>
  <div class="list-part-container" v-loading="loading">
    <div class="list-part-brow">
      <router-link to="/rentInRequestList" tag="button">Renting Request</router-link>
      <button class="active">Buying Request</button>
      <el-select v-model="sortRule" @change="setSortRule">
        <el-option
          v-for="item in sortRuleData"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="list-part-body">
      <div class="info-unit" v-for="(unit, index) in listData" :key="unit.id" @click="gotoDetail(unit)">
        <div class="avatar-wrap"><img v-lazy="unit.userHeadUrl" :key="unit.id"/></div>
        <div class="info-wrap">
          <div class="row">
            <div class="row-left">
              <div class="name">{{unit.contactName}}</div>
              <div class="bathroom">
                <img src="/static/img/index/bath.png" />
                {{unit.bedroom}}
                <span>bds</span>
              </div>
              <div class="bedroom">
                <img src="/static/img/index/bed.png" />
                {{unit.bathroom}}
                <span>ba</span>
              </div>
              <div class="sqft">
                <img src="/static/img/index/sqft.png" />
                {{unit.livingSqlfMax}}
                <span>Sqft</span>
              </div>
            </div>
            <div class="row-right">
              <div class="release-time">{{unit.addTimeFormatDate}}</div>
            </div>
          </div>
          <div class="row">
            <div class="location">
              <img src="/static/img/common/header/location.png">&ensp;{{unit.cityName}}
            </div>
            <div class="price-range">${{unit.priceMin}}-{{unit.priceMax}}<span v-if="unit.releaseType === 1">/mo</span></div>
          </div>
          <div class="row">
            <div class="label">
              <el-tag v-for="(label, index) in unit.labelId" :key="label + index">{{label}}</el-tag>
            </div>
            <!-- if (collectionData.includes(unit.id)) { -->
            <div v-if="unit.ifcollection === 1" style="color:#f48a42;" class="collect-count">
              <img src="/static/img/buyRequestList/collect_yellow.png" @click="cancelCollect($event, unit, index)" />
              {{unit.houseRecordCount}}
            </div>
            <!-- } else { -->
            <div v-else class="collect-count">
              <img src="/static/img/buyRequestList/collect_gray.png" @click="collect($event, unit, index)" />
              {{unit.houseRecordCount}}
            </div>
            <!-- } -->
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="dataTotal"
        @current-change="pageTurn"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getToken} from '@/utils/session'
export default {
  data () {
    return {
      'sortRule': 'Sort: Newest',
      'sortRuleData': [
        {'name': 'Newest', 'value': 'Newest'},
        {'name': 'Price (high to low)', 'value': 'priceType-1'},
        {'name': 'Price (low to high)', 'value': 'priceType-2'},
        {'name': 'Sqft. (high to low)', 'value': 'livingSqlfType-1'},
        {'name': 'Sqft. (low to high)', 'value': 'livingSqlfType-2'}
      ],
      'collectionData': []
    }
  },
  'props': {
    'pageSize': {
      'type': Number,
      'default': 20
    },
    'listData': {
      'type': Array,
      'default': []
    },
    'dataTotal': {
      'type': Number,
      'default': 0
    },
    'loading': {
      'type': Boolean,
      'default': false
    }
  },
  'methods': {
    setSortRule (_rule) {
      this.$emit('setSortRule', _rule)
    },
    gotoDetail (_detailInfo) {
      let _this = this
      this.$router.push({
        'path': '/buyRequestDetail',
        'query': {'detailParam': _this.$base64.encode(JSON.stringify({id: _detailInfo.id, collectionUserId: _detailInfo.userId}))}
      })
    },
    getCollectionData () {
      if (!getToken()) {
        this.$store.commit('signOut', false)
        return
      }
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}findMyCollectionList`,
        'data': {
          'collectionType': 3,
          'pageSize': 10000,
          'pageNum': 1
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data.rows
            if (arr instanceof Array && arr.length > 0) {
              this.collectionData = arr.map(item => item.id)
            }
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    collect (_e, _dataUnit, _index) {
      _dataUnit.ifcollection = 1
      _e.stopPropagation()
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}insertHouseCollection`,
        'data': {
          'housesId': _dataUnit.id,
          'collectionType': 3
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            this.collectionData.push(_dataUnit.id)
            const unit = this.listData[_index]
            unit.houseRecordCount++
            this.listData.splice(_index, 1, unit)
          }
        })
    },
    cancelCollect (_e, _dataUnit, _index) {
      _dataUnit.ifcollection = 0
      _e.stopPropagation()
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}deleteCancelHouseCollection`,
        'data': {
          'housesId': _dataUnit.id
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            this.collectionData.splice(this.collectionData.indexOf(_dataUnit.id), 1)
            const unit = this.listData[_index]
            unit.houseRecordCount--
            this.listData.splice(_index, 1, unit)
          }
        })
    },
    pageTurn (_num) {
      this.$emit('pageTurn', _num)
    }
  },
  'computed': {
    signInState () {
      return this.$store.state.signInState
    }
  },
  'watch': {
    signInState (_new) {
      if (_new) {
        this.getCollectionData()
      } else {
        this.collectionData = []
      }
    }
  },
  created () {
    this.getCollectionData()
  }
}
</script>
