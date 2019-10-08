<style lang="scss" scoped>
.filter-part-container{
  padding-top: 7em;
  padding-bottom: 1em;
  background-color: #ffffff;
}
.search-tips {
  width: 62%;
  margin: 0 auto 2em;
  font-size: 1.25em;
}

.search-part{
  width: 62%;
  height: 3em;
  font-size: 1em;
  margin: 0 auto 2em;
  position: relative;
}

.el-autocomplete{
  display: block;
  height: 100%;
}

/deep/ .el-autocomplete .el-input{
  height: 100%;
}

/deep/ .el-autocomplete .el-input .el-input__inner{
  height: 100%;
  padding-right: 8%;
  font-size: 1.5em;
}

.search-part button{
  display: block;
  width: 5%;
  height: 100%;
  background-image: url(/static/img/buyRequestList/btn_search_gray.png);
  background-repeat: no-repeat;
  background-size: auto 60%;
  background-position: 50% 50%;
  position: absolute;
  right: 0;
  top: 0;
}

.search-part button:active{
  background-size: auto 62%;
}

.filter-part{
  width: 62%;
  margin: 0 auto;
}

table{
  width: 100%;
  user-select: none;
}

td{
  padding-bottom: 1em;
}

td.title{
  vertical-align: top;
  white-space: nowrap;
}

td span{
  float: left;
  color: #444444;
  font-size: 1em;
  margin-left: 2em;
  line-height: 1.6em;
  cursor: pointer;
}

td span:hover{
  color: #f48a42;
}

td span.selected{
  color: #f48a42;
}
</style>

<template>
  <div class="filter-part-container">
    <h4 class="search-tips">Looking for a buyer or tenant for your property? Search our housing requests to find buyers or renters in your area. </h4>
    <div class="search-part">
      <el-autocomplete
        v-model="selectedCityName"
        :fetch-suggestions="getCityData"
        placeholder="Enter city name."
        autocomplete="off"
        spellcheck="false"
        @select="setCity"
      >
      </el-autocomplete>
      <button @click="setCity()"></button>
    </div>

    <div class="filter-part">
      <table>
        <tbody>
          <tr>
            <td class="title">City: </td>
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
            <td class="title">Price : </td>
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
            <td class="title">Bedroom : </td>
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
            <td class="title">Housing type : </td>
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
    </div>

  </div>
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
      'hotCityData': [
        {'name': 'Any', 'id': -1}
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
        {'name': 'One-bedroom', 'count': 1},
        {'name': 'Two-bedroom', 'count': 2},
        {'name': 'Three-bedroom', 'count': 3},
        {'name': 'Four-bedroom', 'count': 4},
        {'name': 'Five-bedroom', 'count': 5}
      ],
      'housingTypeData': [
        {'name': 'Any', 'id': -1}
      ]
    }
  },
  'methods': {
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
    }
  },
  created () {
    this.getHotCityData()
    this.getHousingTypeData()
    this.setPriceRange(this.priceRangeData[0])
    this.setBedroom(this.bedroomData[0])
    this.setHousingType(this.housingTypeData[0])
    if (this.$route.query.keyWord || this.$route.query.stateId || this.$route.query.cityId) {
      this.setCity({'value': this.$route.query.keyWord, 'name': this.$route.query.keyWord, 'id': this.$route.query.cityId})
    }
  },
  mounted () {
    // console.log({'value': this.$route.query.keyWord, 'name': this.$route.query.keyWord, 'id': this.$route.query.cityId})
  }
}
</script>
