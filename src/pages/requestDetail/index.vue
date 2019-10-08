<style scoped>
.container-page {
  background-color: #f3f4f5
}
.container-area {
  max-width: 1200px;
  padding-top: 100px;
  padding-bottom: 100px;
  margin: auto;
}
.breadcrumb-bar:hover {
  color: #1281fc
}
.breadcrumb-bar {
  font-size: 1.2em;
  line-height: 2.6em;
  cursor: pointer;
}
</style>
<style scoped>
@media screen and (max-width: 1200px) {
  .container-area {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>

<template>
  <section class="container-page">
    <div class="container-area">
      <div class="breadcrumb-bar" @click="goBack()">
        <i class="el-icon-back"></i>
        <span>back</span>
      </div>
      <vue-detail
        :detailData="detailData"
        :potentialData="potentialData"
        :recommendData="recommendData"
        :recommendVisible="recommendVisible"
        @handlerCollection="handlerCollection"
        @handlerRecommend="handlerRecommend"
      >
      </vue-detail>
      <vue-potential
       :potentialData="potentialData"
       :detailData="detailData"
      ></vue-potential>
    </div>
  </section>
</template>

<script>
import VueDetail from '@/components/requestDetail/detail.vue'
import VuePotential from '@/components/requestDetail/potential.vue'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      detailParam: {},
      detailData: {},
      potentialData: [],
      recommendData: [],
      recommendVisible: false
    }
  },
  components: {
    'vue-detail': VueDetail,
    'vue-potential': VuePotential
  },
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  watch: {
    GlobalUserInfo: {
      handler (_new, _old) {
        var _id = this.$route.query.id
        if (_id) {
          let detailParam = this.detailParam = {
            id: _id,
            collectionUserId: _new.id
          }
          this.getDetail(detailParam)
        } else {
          this.$router.push({'path': '/rentInRequestList'})
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getDetail (detailParam) {
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}needList`,
        'data': detailParam
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            this.detailData = data.data.rows[0]
            this.getPotential(this.detailData)
            if (getToken()) {
              this.getRecommend(this.detailData)
            }
          }
        })
    },
    getPotential (_detailData) {
      if (_detailData.cityId) {
        // 请求数据
        this.$axios({
          method: 'POST',
          url: `${this.zjc_path}findNearbyHousesList`,
          data: {
            cityId: _detailData.cityId,
            releaseType: _detailData.releaseType,
            collectionUserId: this.GlobalUserInfo.id,
            id: _detailData.id
          }
        })
          .then(response => {
            const data = response.data
            if (data.success) {
              this.potentialData = data.data
            }
          })
      }
    },
    getRecommend (_detailData) {
      this.$axios({
        method: 'GET',
        url: `${this.SH_HOUSE_PROD_PATH}thouses/need/list`,
        params: {
          cityId: _detailData.cityId,
          releaseType: _detailData.releaseType,
          pageSize: _detailData.pageSize || 100,
          pageNum: _detailData.pageNum || 1
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const rows = data.data.rows
            if (rows.length > 0) {
              this.recommendData = rows
            } else {
              this.recommendVisible = false
            }
          } else {}
        })
    },
    handlerCollection (_info) {
      if (_info.boolean) {
        this.$axios({
          'method': 'post',
          'url': `${this.zjc_path}deleteCancelHouseCollection`,
          'data': _info.params
        })
          .then(response => {
            const data = response.data
            if (data.success) {
              this.$message.success('success!')
              this.getDetail(this.detailParam)
            }
          })
      } else {
        this.$axios({
          'method': 'post',
          'url': `${this.zjc_path}insertHouseCollection`,
          'data': _info.params
        })
          .then(response => {
            const data = response.data
            if (data.success) {
              this.$message.success('success!')
              this.getDetail(this.detailParam)
            }
          })
      }
    },
    handlerRecommend (_info) {
      this.$axios({
        method: 'POST',
        url: `${this.YT_PROD_PATH}common/message/houseRecomment`,
        data: {
          houseBuyRentId: _info.join(','),
          destUserId: this.detailData.userId
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            this.$message.success('success')
          } else {
            this.$message.error(data.msg)
          }
          this.recommendVisible = false
        })
    }
  }
  // mounted () {
  //   if (this.$route.query.id) {
  //     this.detailParam.id = this.$route.query.id
  //     this.getDetail(this.detailParam)
  //   } else {
  //     this.$router.push({'path': '/buyRequestList'})
  //   }
  // }
}
</script>
