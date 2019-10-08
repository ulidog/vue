<style scoped>
.page-container{
  padding-top: 60px;
  padding-bottom: 6em;
  padding-left: 19%;
  padding-right: 19%;
  background-color: #f3f4f5;
}

.el-breadcrumb{
  margin-top: 3em;
  margin-bottom: 3em;
}
</style>

<template>
  <div class="page-container">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/requestList/buyRequest'}">Buying Request</el-breadcrumb-item>
      <el-breadcrumb-item>{{detailInfo.cityName || ''}}</el-breadcrumb-item>
    </el-breadcrumb>

    <vue-detail :detailInfo="detailInfo" :collectionData="collectionData"></vue-detail>

  </div>
</template>

<script>
import VueDetail from '@/components/buyRequestDetail/detail.vue'
import VueHouseList from '@/components/buyRequestDetail/houseList.vue'
import {getToken} from '@/utils/session'
export default {
  data () {
    return {
      'detailInfo': {},
      'collectionData': []
    }
  },
  'components': {
    'vue-detail': VueDetail,
    'vue-house-list': VueHouseList
  },
  'methods': {
    getCollectionData () {
      var _this = this
      if (!getToken()) {
        this.$store.commit('signOut', false)
        return
      }
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}findMyCollectionList`,
        'data': {
          'collectionType': 4,
          'pageSize': 10000,
          'pageNum': 1,
          'id': _this.detailInfo.id
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
            // alert(data.msg);
          }
        })
    },
    insertHouseRecord () {
      let _this = this
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}insertHouseRecord`,
        'data': {
          'needUserId': localStorage.getItem('uid'),
          'recordType': _this.detailInfo.releaseType,
          'houseBuyRentId': _this.detailInfo.id
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
          } else {
            // alert(data.msg)
          }
        })
    }
  },
  created () {
    if (this.$route.query.detailParam) {
      let detailParam = JSON.parse(this.$base64.decode(this.$route.query.detailParam))
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}needList`,
        'data': detailParam
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            this.detailInfo = data.data.rows[0]
            console.log(this.detailInfo)
            this.insertHouseRecord()
            this.getCollectionData()
          } else {
            // alert(data.msg);
          }
        })
    } else {
      this.$router.push({'path': '/buyRequestList'})
    }
  }
}
</script>
