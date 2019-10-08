<style lang="scss" scoped>
/deep/ .el-radio{
  width: 25%;
  margin-left: 0;
  margin-bottom: 22px;
}

.el-autocomplete {
  width: 100%;
}

.el-select,
.el-input-number{
  width: 100%;
}

.el-form .el-row:last-child .el-form-item {
  margin-bottom: 0;
}

.marinTop15 {
  margin-top: 15px
}
</style>

<template>
  <div class="part-container">
    <h4>Features</h4>
    <div class="part-body">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px">

        <el-row>
          <el-col :span="16">
            <el-form-item label="City" prop="cityName">
              <el-autocomplete v-model="form.cityName" :fetch-suggestions="getCityData" placeholder=""
              @select="onSelectCity"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="Min price">
              <el-input v-model="unitMinPrice" :min="0" :max="1000000000" :step="500"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Max price">
              <el-input v-model="unitMaxPrice" :min="0" :max="1000000000" :step="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Bedrooms">
              <el-select v-model="form.bedroomCount">
                <el-option v-for="(item, index) in bedroomData" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Garage">
              <el-select v-model="form.garageCount">
                <el-option v-for="(item, index) in garageData" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Bathrooms">
              <el-select v-model="form.bathroomCount">
                <el-option v-for="(item, index) in bathroomData" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Living-sqft" prop="livingSqft">
              <el-input-number v-model="form.livingSqft" :precision="2" :min="0" :max="1000000000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="Housing Type" prop="resource" :style="{marginBottom: 0}">
              <el-radio-group v-model="form.housingType" class="marinTop15">
                <el-radio v-for="(item, index) in housingTypeData" :key="index" :label="item.id">
                  {{item.name}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
let uniqueKey = 1

export default {
  data () {
    return {
      'housingTypeData': [],
      'cityData': [],
      'bedroomData': [],
      'bathroomData': [],
      'garageData': [],
      'form': {
        'housingType': -1,
        'cityName': '',
        'cityID': -1,
        'stateID': -1,
        'minPrice': '0',
        'maxPrice': '$10,000',
        'bedroomCount': 'Studio',
        'bathroomCount': 0.5,
        'garageCount': 0,
        'livingSqft': 0,
        'unit': '$'
      },
      'rules': {
        'cityName': [
          {'required': true, 'message': 'Please enter city name.', 'trigger': ['blur', 'change']}
        ],
        'minPrice': [
          {'required': true, 'message': 'Please enter the minimum price.', 'trigger': ['blur', 'change']}
        ],
        'maxPrice': [
          {'required': true, 'message': 'Please enter the maximum price.', 'trigger': ['blur', 'change']}
        ],
        'livingSqft': [
          {'required': true, 'message': 'Please enter the living sqft.', 'trigger': ['blur', 'change']}
        ]
      }
    }
  },
  'props': {
    'isSubmitNow': false
  },
  'watch': {
    isSubmitNow () {
      if (this.isSubmitNow) this.submit()
    }
  },
  'methods': {
    // 获取unique key
    getUniqueKey () {
      return uniqueKey++
    },
    // 获取housing type数据
    getHousingTypeData () {
      this.$axios.post(`${this.zjc_path}findHouseTypeList`, {})
        .then(response => {
          this.housingTypeData = response.data.data
          this.form.housingType = this.housingTypeData[0].id
        })
        .catch(error => {
          if (error) {}
        })
    },
    // 获取城市数据
    getCityData (keyword, cb) {
      this.$axios.get(
        `${this.SH_MAP_PROD_PATH}region/list/Str`,
        {
          params: {
            'keyword': keyword,
            'pageNum': 1,
            'pageSize': 100
          }
        }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            if (data.data instanceof Array && data.data.length > 0) {
              this.form.cityID = data.data[0].id
              this.cityData = data.data.map(
                item => { return {'value': `${item.cityAscii},${item.stateId}`, 'cityID': item.id, 'stateID': item.stateId} }
              )
            } else {
              this.form.cityID = -1
              this.cityData = []
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
    // 选择城市回调方法
    onSelectCity (_cityInfo) {
      this.form.cityID = _cityInfo.cityID
      this.form.stateID = _cityInfo.stateID
    },
    // 生成bedrooms选项数据
    createBedroomData () {
      this.bedroomData.push('Studio')
      for (let i = 1; i <= 100; i++) {
        this.bedroomData.push(i)
      }
    },
    createBathroomData () {
      for (let i = 0.5; i <= 100; i += 0.5) {
        this.bathroomData.push(i)
      }
    },
    createGarageData () {
      for (let i = 0; i <= 100; i++) {
        this.garageData.push(i)
      }
    },
    validateForm () {
      this.form.cityName = this.form.cityName.trim()
      if (!this.form.cityName) return {flag: false, msg: 'Please enter the name of city. '}
      if (!this.cityData.find(item => item.value === this.form.cityName)) {
        return {flag: false, msg: 'The city you entered can not be found in the list. '}
      }

      // this.form.minPrice = parseInt(this.form.minPrice)
      // if (isNaN(this.form.minPrice)) return {flag: false, msg: 'Please enter the minimum price. '}
      if (parseInt(this.form.minPrice.toString().replace(/\D/g, '')) < 0) return {flag: false, msg: 'The minimum price should not be less than 0.'}
      if (parseInt(this.form.minPrice.toString().replace(/\D/g, '')) > 1000000000) return {flag: false, msg: 'The maximum price should not exceed 100000000.'}

      // this.form.maxPrice = parseInt(this.form.maxPrice)
      // if (isNaN(this.form.maxPrice)) return {flag: false, msg: 'Please enter the maximum price. '}
      if (parseInt(this.form.maxPrice.toString().replace(/\D/g, '')) < 0) return {flag: false, msg: 'The maximum price must be more than 0. '}
      if (parseInt(this.form.maxPrice.toString().replace(/\D/g, '')) > 1000000000) return {flag: false, msg: 'The minimum price must be less than 100000000.'}

      if (parseInt(this.form.minPrice.toString().replace(/\D/g, '')) > parseInt(this.form.maxPrice.toString().replace(/\D/g, ''))) return {flag: false, msg: 'The minimum price should not exceed the maximum price.'}

      this.form.livingSqft = Number(this.form.livingSqft)
      if (isNaN(this.form.livingSqft)) return {flag: false, msg: 'Please enter living areas.'}
      if (this.form.livingSqft < 0) return {flag: false, msg: 'The living area can\'t be less than 0 square meters.'}
      if (this.form.livingSqft > 1000000000) return {flag: false, msg: 'The living area shall not be more than 1000000000 square meters.'}
      this.form.livingSqft = this.form.livingSqft.toFixed(2) - 0
      if (this.form.bedroomCount === 'Studio') {
        this.form.bedroomCount = 'studio'
      }
      return {flag: true, msg: 'Through certification !'}
    },
    submit () {
      let result = this.validateForm()
      this.form.minPrice = this.form.minPrice.toString().replace(/\D/g, '')
      this.form.maxPrice = this.form.maxPrice.toString().replace(/\D/g, '')
      this.$emit('collectData', result.flag ? Object.assign(result, this.form) : result)
    },
    priceformat (p) {
      let AfterProgressing = []
      p.toString().replace(/\D/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return this.form.unit + AfterProgressing.reverse().join('')
    }
  },
  computed: {
    unitMinPrice: {
      get: function () {
        return this.form.minPrice
      },
      set: function (p) {
        this.form.minPrice = this.priceformat(p.replace(/\D/g, ''))
      }
    },
    unitMaxPrice: {
      get: function () {
        return this.form.maxPrice
      },
      set: function (p) {
        this.form.maxPrice = this.priceformat(p.replace(/\D/g, ''))
      }
    }
  },
  created () {
    this.getHousingTypeData()
    this.createBedroomData()
    this.createBathroomData()
    this.createGarageData()
  }
}
</script>
