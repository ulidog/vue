<template>
  <section class="container-filter">
    <el-row class="filter-part">
      <el-col :xs="12" :sm="12" :lg="12">
        <el-button :class="[$route.path === '/requestList/buyRequest' ? 'active' : '', 'request-btn']">
          <router-link :to="{path: '/requestList/buyRequest'}">Purchase Requests</router-link>
        </el-button>
        <el-button :class="[$route.path === '/requestList/rentRequest' ? 'active' : '', 'request-btn']">
          <router-link :to="{path: '/requestList/rentRequest'}">Rental Requests</router-link>
        </el-button>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <el-popover
          v-model="popoverConfig.cityPopover"
          popper-class="CitySelectBox"
          placement="bottom-end"
          :visible-arrow="false"
          trigger="click">
          <section class="citySelect">
            <ul class="cityBox">
              <li :class="['cityItem', submitForm.cityId === item.id ? 'active' : '']" v-for="(item, index) in KeyWordCityList" :key="index">
                <span class="clickSwitchSty" @click="selectCityChange(item)">{{ item.cityAscii }} {{ item.stateId }}</span>
              </li>
            </ul>
          </section>
          <el-input
            slot="reference"
            class="maxInputSty"
            placeholder="Enter a City"
            v-model="submitForm.address"
            @clear="clearCityChange"
            @change="submitFrom"
            >
            <i slot="suffix" class="serchSty el-input__icon el-icon-search"></i>
          </el-input>
        </el-popover>
      </el-col>
    </el-row>
    <el-row class="filter-part filter-section">
      <table>
        <tbody>
          <tr>
            <td class="title">Hot City:</td>
            <td>
              <span
                v-for="(city, index) in hotCityData"
                :key="city.name + index"
                :class="[{'selected': city.name === selectedCityName}]"
                @click="setCity(city)"
              >
                {{city.name}}
              </span>
            </td>
          </tr>
          <tr>
            <td class="title">{{priceLabel}}</td>
            <td>
              <span
                v-for="(option, index) in priceRangeData"
                :key="option.name + index"
                :class="[{'selected': option.name === selectedPriceRange}]"
                @click="setPriceRange(option)"
              >
                {{option.name}}
              </span>
            </td>
          </tr>
          <tr>
            <td class="title">Bedrooms: </td>
            <td>
              <span
                v-for="(option, index) in bedroomData"
                :key="option.name + index"
                :class="[{'selected': option.name === selectedBedroom}]"
                @click="setBedroom(option)"
              >
                {{option.name}}
              </span>
            </td>
          </tr>
          <tr>
            <td class="title">Housing type: </td>
            <td>
              <span
                v-for="(type, index) in housingTypeData"
                :key="type.name + index"
                :class="[{'selected': type.name === selectedHousingTypeName}]"
                @click="setHousingType(type)"
              >
                {{type.name}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </el-row>
    <el-row class="filter-part filter-section">
      <table>
        <tbody>
          <tr>
            <td class="title">Filter:</td>
            <td>
              <span
                v-for="(type, index) in sortData"
                :key="type.name + index"
                :class="[{'selected': type.name === selectedSort}]"
                @click="setSortRule(type)"
              >
                {{type.name}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </el-row>
  </section>
</template>
<script>
export default {
  data () {
    return {
      'cityData': [],
      'selectedCityName': '',
      'selectedPriceRange': '',
      'selectedBedroom': '',
      'selectedHousingTypeName': '',
      'selectedSort': '',
      'hotCityData': [
        {'name': 'Any', 'id': -1}
      ],
      'housingTypeData': [
        {'name': 'Any', 'id': -1}
      ],
      'priceRangeConfig': [
        [
          {'name': 'Any', 'min': -1, 'max': -1},
          {'name': '$0-500', 'min': 0, 'max': 500},
          {'name': '$500-1,000', 'min': 500, 'max': 1000},
          {'name': '$1,000-$1,500', 'min': 1000, 'max': 1500},
          {'name': '$1,500-$2,000', 'min': 1500, 'max': 2000},
          {'name': '$2,000-$2,500', 'min': 2000, 'max': 2500},
          {'name': '$2,500-$3,000', 'min': 2500, 'max': 3000},
          {'name': '$3,000-$4,000', 'min': 3000, 'max': 4000},
          {'name': '$4,000-$5,000', 'min': 4000, 'max': 5000},
          {'name': '$5,000-$6,000', 'min': 5000, 'max': 6000},
          {'name': '$6,000+', 'min': 6000, 'max': -1}
        ],
        [
          {'name': 'Any', 'min': -1, 'max': -1},
          {'name': '0-200K', 'min': 0, 'max': 200000},
          {'name': '200-400K', 'min': 200000, 'max': 400000},
          {'name': '400-600K', 'min': 400000, 'max': 600000},
          {'name': '600-800K', 'min': 600000, 'max': 800000},
          {'name': '800-1M', 'min': 800000, 'max': 1000000},
          {'name': '1-2M', 'min': 1000000, 'max': 2000000},
          {'name': '2-3M', 'min': 2000000, 'max': 3000000},
          {'name': '3-4M', 'min': 3000000, 'max': 4000000},
          {'name': '4-5M', 'min': 4000000, 'max': 5000000},
          {'name': '5M+', 'min': 5000000, 'max': -1}
        ]
      ],
      'priceRangeData': [
        {'name': 'Any', 'min': -1, 'max': -1},
        {'name': '0-200K', 'min': 0, 'max': 200000},
        {'name': '200-400K', 'min': 200000, 'max': 400000},
        {'name': '400-600K', 'min': 400000, 'max': 600000},
        {'name': '600-800K', 'min': 600000, 'max': 800000},
        {'name': '800-1M', 'min': 800000, 'max': 1000000},
        {'name': '1-2M', 'min': 1000000, 'max': 2000000},
        {'name': '2-3M', 'min': 2000000, 'max': 3000000},
        {'name': '3-4M', 'min': 3000000, 'max': 4000000},
        {'name': '4-5M', 'min': 4000000, 'max': 5000000},
        {'name': '5M+', 'min': 5000000, 'max': -1}
      ],
      'bedroomData': [
        {'name': 'Any', 'count': -1},
        {'name': 'Studio', 'count': 'studio'},
        {'name': '1+', 'count': 1},
        {'name': '2+', 'count': 2},
        {'name': '3+', 'count': 3},
        {'name': '4+', 'count': 4},
        {'name': '5+', 'count': 5},
        {'name': '6+', 'count': 6},
        {'name': '7+', 'count': 7},
        {'name': '8+', 'count': 8},
        {'name': '9+', 'count': 9},
        {'name': '10+', 'count': 10}
      ],
      'sortData': [
        {'name': 'Most Recent', 'value': 'Newest'},
        {'name': 'Price(Low-High)', 'value': 'priceType-2'},
        {'name': 'Price (High-Low)', 'value': 'priceType-1'},
        {'name': 'Living SqFt (High-Low)', 'value': 'livingSqlfType-1'},
        {'name': 'Living SqFt (Low-High)', 'value': 'livingSqlfType-2'}
      ],
      'popoverConfig': {
        cityPopover: false
      },
      'KeyWordCityList': [],
      'submitForm': {
        'address': null,
        'cityId': null,
        'stateId': null,
        'fkBusinessTypeId': null,
        'categoriesLabel': null
      }
    }
  },
  'watch': {
    'submitForm.address': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.remoteMethod(_new)
        } else {
          console.log('跳过一次查询')
        }
        if (_new === null || _new === '') {
          this.submitForm.cityId = null
          this.submitForm.stateId = null
        }
      }
    },
    submitForm: {
      handler (_new, _old) {
        if (_old) {
          this.submitFrom()
        }
      },
      deep: true,
      immediate: true
    },
    downType: {
      handler (_new, _old) {
        if (_new) {
          this.priceRangeData = this.priceRangeConfig[0]
        } else {
          this.priceRangeData = this.priceRangeConfig[1]
        }
      },
      immediate: true
    }
  },
  'props': {
    downType: {
      type: Boolean,
      default: false
    },
    priceLabel: {
      default: 'Price: ',
      type: String
    }
  },
  'methods': {
    // 搜索
    remoteMethod (query) {
      this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            this.remoteMethodState(res.data.data, query)
          }
        })
    },
    // 搜索州
    remoteMethodState (list, query) {
      this.$axios.get(`${this.ljj_path}region/list/state-str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            let lists = res.data.data.map(item => {
              item.cityAscii = item.name
              item.stateId = item.id
              item.type = true
              return item
            })
            this.KeyWordCityList = [...lists, ...list]
          } else {
            this.KeyWordCityList = list
          }
        })
    },
    // 选择城市
    selectCityChange (_info) {
      this.popoverConfig.cityPopover = false
      this.submitForm.address = _info.cityAscii
      this.submitForm.cityId = _info.id
      this.submitForm.stateId = _info.stateId
      this.submitFrom()
    },
    // 提交
    submitFrom () {
      let cloneFrom = Object.assign({}, this.submitForm)
      //  console.log('提交')
      this.$emit('setCity', cloneFrom.cityId)
    },
    // 清空城市搜索条件
    clearCityChange () {
      this.submitForm.address = null
      this.submitForm.cityId = null
      this.submitForm.stateId = null
    },
    // 获取城市数据
    getCityData (keyword, cb) {
      this.$axios.get(
        `${this.SH_MAP_PROD_PATH}region/list/Str`,
        {
          params: {
            'keyword': keyword,
            'pageNum': 1,
            'pageSize': this.pageSize
          }
        }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data
            if (arr instanceof Array && arr.length > 0) {
              this.cityData = arr.map(
                item => {
                  return {'value': item.cityAscii, 'name': item.cityAscii, 'id': item.id}
                }
              )
              if (!this.$route.query.keyWord && !this.$route.query.stateId && !this.$route.query.cityId) {
                this.$emit('setCity', this.cityData[0].id)
              }
            } else {
              this.cityData = []
              if (!this.$route.query.keyWord && !this.$route.query.stateId && !this.$route.query.cityId) {
                this.$emit('setCity', -1)
              }
            }
            cb(this.cityData)
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    getHotCityData () {
      this.$axios({
        'method': 'get',
        'url': `${this.ljj_path}region/hot/list`,
        'data': {
          'pageNum': 1,
          'pageSize': 100
        }
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data.rows
            if (arr instanceof Array && arr.length > 0) {
              this.hotCityData = [...this.hotCityData, ...arr.map(item => { return {'name': item.city, 'id': item.id} })]
              if (!this.$route.query.keyWord && !this.$route.query.stateId && !this.$route.query.cityId) {
                this.setCity(this.hotCityData[0])
              }
            } else {
              if (!this.$route.query.keyWord && !this.$route.query.stateId && !this.$route.query.cityId) {
                this.setCity({'name': '', 'id': -1})
              }
            }
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    getHousingTypeData () {
      this.$axios.post(`${this.zjc_path}findHouseTypeList`, {})
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data
            if (arr instanceof Array && arr.length > 0) {
              this.housingTypeData = [...this.housingTypeData, ...arr]
            }
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    setCity (_city) {
      if (!_city) {
        _city = this.hotCityData.find(item => item.name === this.selectedCityName)
      }
      if (!_city) {
        // alert('Please select the city where you exist!')
        this.$message.info('Please select the city where you exist!')
      }
      this.selectedCityName = _city.name
      this.$emit('setCity', _city.id)
    },
    setPriceRange (_option) {
      this.selectedPriceRange = _option.name
      this.$emit('setPriceRange', _option.min, _option.max)
    },
    setBedroom (_option) {
      this.selectedBedroom = _option.name
      this.$emit('setBedroom', _option.count)
    },
    setHousingType (_type) {
      this.selectedHousingTypeName = _type.name
      this.$emit('setHousingType', _type.id)
    },
    setSortRule (_type) {
      this.selectedSort = _type.name
      this.$emit('setSortRule', _type.value)
    }
  },
  created () {
    this.getHotCityData()
    this.getHousingTypeData()
    this.setPriceRange(this.priceRangeData[0])
    this.setBedroom(this.bedroomData[0])
    this.setHousingType(this.housingTypeData[0])
    this.setSortRule(this.sortData[0])
    if (this.$route.query.keyWord || this.$route.query.stateId || this.$route.query.cityId) {
      this.setCity({'value': this.$route.query.keyWord, 'name': this.$route.query.keyWord, 'id': this.$route.query.cityId})
    }
  },
  mounted () {
    this.remoteMethod()
  }
}
</script>

<style lang="sass" scoped>
.filter-part
  margin-bottom: 42px
  /deep/ .el-input__inner
  .maxInputSty
    /deep/ .el-input__suffix
      align-items: center
      display: flex
      right: 10px
      i.serchSty
        background-color: #1281FC
        color: #fff
        padding: 0px 15px
        width: 36px
        height: 26px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        &:hover
          background-color: #0072f1
  &.filter-section
    color: #444444
    border-radius: 3px
    border: 1px solid #E2E2E2
    background-color: #ECEDEF
    padding: 12px 20px 2px
  .request-btn
    border: none
    padding: 0
    width: 45%
    height: 40px
    &.active
      color: #fff
      background: linear-gradient(to right, #63A9F7 , #1281FC)
    a
      color: inherit
      display: block
      height: 40px
      line-height: 40px
  table
    width: 100%
    user-select: none
    tr
      &:last-child
        td
          padding: 0
      td
        min-width: 100px
        padding-bottom: 1em
        &:last-child
          width: 100%
        &.title
          vertical-align: top
          white-space: nowrap
          line-height: 30px
        span
          float: left
          color: #444444
          font-size: 16px
          margin-left: 10px
          margin-bottom: 10px
          padding: 0 15px
          border-radius: 15px
          line-height: 30px
          cursor: pointer
          &:hover
            color: #fff
            background-color: #1281FC
          &.selected
            color: #fff
            background-color: #1281FC
</style>
