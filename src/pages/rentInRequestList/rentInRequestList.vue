<style scoped>

</style>

<template>
  <div>
    <vue-filter-part
      @setCity="setCity"
      @setPriceRange="setPriceRange"
      @setBedroom="setBedroom"
      @setHousingType="setHousingType"
      @setRentInType="setRentInType"
    ></vue-filter-part>
    <vue-list-part
      :listData="listData"
      :pageSize="pageSize"
      :dataTotal="dataTotal"
      @setSortRule="setSortRule"
      @pageTurn="pageTurn"
      :loading="loading"
    >
    </vue-list-part>
  </div>
</template>

<script>
import VueFilterPart from '@/components/rentInRequestList/filterPart.vue'
import VueListPart from '@/components/rentInRequestList/listPart.vue'
export default {
  data () {
    return {
      'cityID': -1,
      'minPrice': -1,
      'maxPrice': -1,
      'bedroomCount': -1,
      'houseTypeId': -1,
      'rentInType': 4,
      'pageSize': 20,
      'pageNum': 1,
      'dataTotal': 0,
      'sortRule': 'Newest',
      'listData': [],
      'loading': false
    }
  },
  'components': {
    'vue-filter-part': VueFilterPart,
    'vue-list-part': VueListPart
  },
  'methods': {
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
    setRentInType (_type) {
      this.rentInType = _type
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
        'releaseType': this.rentInType,
        'pageSize': this.pageSize,
        'pageNum': this.pageNum
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
  }
}
</script>
