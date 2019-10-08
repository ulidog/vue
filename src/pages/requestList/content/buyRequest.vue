<template>
  <section class="content-bar">
    <vue-request-filter
      @setCity="setCity"
      @setPriceRange="setPriceRange"
      @setBedroom="setBedroom"
      @setHousingType="setHousingType"
      @setSortRule="setSortRule"
      :downType="false"
    ></vue-request-filter>
    <vue-request-table
      :listData="listData"
      :loading="loading"
      :pageSize="pageSize"
      :dataTotal="dataTotal"
      @setSortRule="setSortRule"
      @pageTurn="pageTurn"
    ></vue-request-table>
    <router-link :to="{path: '/release/buy'}" class="side-right-button">Post A Purchase Request</router-link>
  </section>
</template>
<script>
import VueFilter from '@/components/requestList/requestFilter.vue'
import VueTable from '@/components/requestList/requestTable.vue'
import Mock from '@/utils/mock'

export default {
  data () {
    return {
      cityID: -1,
      minPrice: -1,
      maxPrice: -1,
      bedroomCount: -1,
      houseTypeId: -1,
      rentInType: 4,
      pageSize: 20,
      pageNum: 1,
      dataTotal: 0,
      sortRule: 'Newest',
      listData: [],
      loading: false,
      bannerParam: {
        bannerUrl: '/static/img/common/productBanner/sell_pho.png',
        left: {
          title: 'Sell',
          titleSub: 'Traditional Transaction',
          description: [
            'For Sale by Owner',
            'Standard Contracts Provided',
            'Save 6%'
          ]
        },
        right: {
          title: 'Information',
          fkCategoryId: Mock.guideId.buyRequest,
          list: []
        }
      }
    }
  },
  components: {
    'vue-request-filter': VueFilter,
    'vue-request-table': VueTable
  },
  methods: {
    getBannerParam () {
      this.$axios.get(`${this.ljj_path}guide/header-banner?fkCategoryId=${Mock.guideId.buyRequest}&pageSize=20`)
        .then(res => {
          if (res.data.success) {
            this.bannerParam.right.list = res.data.data.rows
            this.$emit('getBannerParam', this.bannerParam)
          }
        })
    },
    setCity (_id) {
      this.cityID = _id
      this.getListData()
    },
    setPriceRange (_min, _max) {
      this.minPrice = _min
      this.maxPrice = _max
      this.getListData()
    },
    setBedroom (_count) {
      this.bedroomCount = _count
      this.getListData()
    },
    setHousingType (_id) {
      this.houseTypeId = _id
      this.getListData()
    },
    setSortRule (_rule) {
      this.sortRule = _rule
      this.getListData()
    },
    pageTurn (_num) {
      this.pageNum = _num
      this.getListData()
    },
    getListData () {
      if (
        this.cityID === -2 ||
        this.minPrice === -2 || this.maxPrice === -2 ||
        this.bedroomCount === -2 || this.houseTypeId === -2
      ) {
        return
      }
      const data = {
        releaseType: 3,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      if (this.cityID !== -1) {
        data.cityId = this.cityID
      }
      if (this.minPrice > -1) {
        data.priceMin = this.minPrice
      }
      if (this.maxPrice > -1) {
        data.priceMax = this.maxPrice
      }
      if (this.bedroomCount !== -1) {
        data.bedroom = this.bedroomCount
      }
      if (this.houseTypeId !== -1) {
        data.houseTypeId = this.houseTypeId
      }
      if (this.sortRule !== 'Newest') {
        const temp = this.sortRule.split('-')
        data[temp[0]] = temp[1]
      }
      // 设置loading
      this.loading = true
      this.$axios({
        'method': 'post',
        'url': `${this.zjc_path}needList`,
        'data': data
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data.rows
            if (arr instanceof Array && arr.length > 0) {
              arr.forEach(item => {
                if (item.labelId) {
                  item.labelId = item.labelId.split(',')
                } else {
                  item.labelId = []
                }
              })
              this.listData = arr
              this.dataTotal = data.data.total
              this.loading = false
            } else {
              this.loading = false
              this.listData = []
              this.dataTotal = 0
            }
          } else {
            this.loading = false
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
          this.loading = false
        })
    }
  },
  mounted () {
    this.getListData()
    this.getBannerParam()
  }
}
</script>
<style lang="sass" scoped>
.side-right-button
  position: fixed
  right: 0
  top: 65%
  background-color: #1281FC
  color: #fff
  height: 40px
  line-height: 40px
  font-size: 15px
  padding: 0 15px
  border-radius: 3px
  transform: rotate(-90deg) translateY(205%) translateX(45%)
  &:hover
    background-color: #0067d9
.content-bar
  margin: 80px auto
</style>
