<template>
  <section class="header-modules-from">
    <!-- 地图位置搜索 -->
    <section class="autoSerchCity">
      <!-- <el-autocomplete
        popper-class="keyword"
        v-model="submitForm.keyWord"
        :fetch-suggestions="remoteMethod"
        placeholder="Address, City, or Zip Code"
        @select="confirmWordsChange"
        size="small"
        @clear="keyWordClearChange"
        @change="keyWordNullChange"
        @keydown.enter="submitServer"
        clearable>
        <i class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handSerchClick">
        </i>
        <template slot-scope="{ item }">
          <div class="city">{{ item.cityAscii + ' ' + item.stateId }}</div>
          <span class="county">{{ item.countyName }}</span>
        </template>
      </el-autocomplete> -->
      <section class="search-box-content">
        <section :class="['custom-input', showList ? 'focus' : '' ]">
          <input v-model="submitForm.keyWord" placeholder="Address, City, or Zip Code" type="text" @focus="queryFocusChange" @blur="queryBlurChange" @keydown.enter="submitServer">
          <i class="iconfont icon-cancle close" @click="keyWordClearChange" v-show="submitForm.keyWord"></i>
          <i class="iconfont icon-search" @click="submitServer"></i>
        </section>
        <transition name="el-fade-in-linear">
          <section class="downdrap-list" v-show="showList">
            <ul class="remote-box">
              <!-- <li class="item"></li> -->
              <template v-for="item in SearchHistoryArray">
                <li class="local" @click="openHistory(item)" :key="item.id" v-if="item.type === -1 && RemoteArray.length === 0"><i class="iconfont icon-search-location"></i>{{ item.name }}</li>
                <li class="history" @click="openHistory(item)" :key="item.id" v-if="item.type === 0 && RemoteArray.length === 0">
                  <span v-if="item.xtype !== 3">
                    <i class="iconfont icon-search_histroy"></i>
                    <span>{{ item.name }}</span>
                  </span>
                  <router-link v-else :to="'/listing/details/' + item.id">
                    <i class="iconfont icon-search_histroy"></i>
                    <span>{{ item.name }}</span>
                  </router-link>
                  <i class="iconfont icon-guanbi close" @click.stop="deleteOnceHistory(item)"></i>
                </li>
              </template>
              <template v-for="item in RemoteArray">
                <li class="city" @click="confirmWordsChange(item)" :key="item.id" v-if="item.type === 1">{{ item.name }}</li>
                <li class="city" @click="confirmWordsChange(item)" :key="item.id" v-if="item.type === 2">{{ item.name }}</li>
                <li class="city" @click="confirmWordsChange(item)" :key="item.id" v-if="item.type === 3">
                  <router-link :to="'/listing/details/' + item.id">{{ item.name }}</router-link>
                </li>
              </template>
            </ul>
          </section>
        </transition>
      </section>
    </section>
    <!-- 价格 -->
    <section class="price" v-if="params.type">
      <el-popover
        class="select-box"
        placement="bottom"
        width="280"
        size="small"
        trigger="click">
        <section class="selctPrice" style="display: flex; align-items: center;">
          <el-select
            v-model="submitForm.minPrice"
            placeholder="Min"
            size="mini" clearable>
            <el-option
              label="$0"
              :value="0">
            </el-option>
            <el-option
              v-for="item in priceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>&nbsp;-&nbsp;</span>
          <el-select v-model="submitForm.maxPrice" placeholder="Max" size="mini" clearable>
            <el-option
              v-for="item in priceList"
              :disabled="item.value < submitForm.minPrice"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            <el-option
              label="Any Price"
              value="Any Price">
            </el-option>
          </el-select>
          <el-button style="margin-left:10px" type="primary" size="mini" @click="clearPriceChange">Any</el-button>
        </section>
        <el-input type="text" size="small" slot="reference" placeholder="Price" suffix-icon="el-icon-caret-bottom" class="priceInput" v-model="submitForm.Allprice" clearable @clear="clearPriceChange"></el-input>
      </el-popover>
    </section>
    <section class="price" v-else>
      <el-popover
        class="select-box"
        placement="bottom"
        width="280"
        size="small"
        trigger="click">
        <section class="selctPrice" style="display: flex; align-items: center;">
          <el-select
            v-model="submitForm.minPrice"
            placeholder="Min"
            size="mini"
            clearable>
            <el-option
              label="$0"
              :value="0">
            </el-option>
            <el-option
              v-for="item in minpriceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>&nbsp;-&nbsp;</span>
          <el-select v-model="submitForm.maxPrice" placeholder="Max" size="mini" clearable>
            <el-option
              v-for="item in minpriceList"
              :disabled="item.value < submitForm.minPrice"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            <el-option
              label="Any Price"
              value="Any Price">
            </el-option>
          </el-select>
          <el-button style="margin-left:10px" type="primary" size="mini" @click="clearPriceChange">Any</el-button>
        </section>
        <el-input type="text" size="small" slot="reference" placeholder="Rent/month" suffix-icon="el-icon-caret-bottom" class="priceInput" v-model="submitForm.Allprice" clearable  @clear="clearPriceChange"></el-input>
      </el-popover>
    </section>
    <!-- 床 -->
    <section class="Bedrooms">
      <el-select
        v-model="submitForm.bedRoom"
        placeholder="Bedrooms"
        size="small"
        class="BedroomsInput"
        suffix-icon="el-icon-caret-bottom"
        clearable>
        <el-option
          v-for="item in 500"
          :key="item - 1 == 0 ? 'studio' : item - 1 + '+'"
          :label="item - 1 == 0 ? 'studio' : item - 1 + '+'"
          :value="item - 1 == 0 ? 'studio' : item - 1">
        </el-option>
      </el-select>
    </section>
    <!-- 浴室 -->
    <!-- <section class="Bathrooms">
      <el-select
        v-model="submitForm.minBathRoom"
        placeholder="Bathrooms"
        size="small"
        class="BathroomsInput"
        suffix-icon="el-icon-caret-bottom"
        clearable>
        <el-option
          v-for="item in 500"
          :key="item * 0.5"
          :label="item * 0.5 + '+'"
          :value="item * 0.5">
        </el-option>
      </el-select>
    </section> -->
    <!-- 类型 -->
    <section class="housetype">
      <el-select
        v-model="submitForm.housetypeArray"
        multiple
        collapse-tags
        size="small"
        class="housetypeInput"
        suffix-icon="el-icon-caret-bottom"
        placeholder="Housing Type"
        clearable>
        <el-option
          v-for="item in housetypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </section>
    <!-- 面积 -->
    <!-- <section class="sqft">
      <el-popover
        class="select-box"
        placement="bottom"
        width="200"
        size="small"
        trigger="click">
        <section class="selctPrice" style="display: flex; align-items: center;">
          <el-select
            v-model="submitForm.minLiveSqft"
            placeholder="0 sqft"
            size="mini"
            clearable>
            <el-option
              v-for="item in sqftList"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>&nbsp;-&nbsp;</span>
          <el-select v-model="submitForm.maxLiveSqft" placeholder="50k SQFT" size="mini" clearable>
            <el-option
              v-for="item in sqftList"
              :disabled="item.value < submitForm.minLiveSqft"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <el-input type="text" size="small" slot="reference" placeholder="Living sqft" suffix-icon="el-icon-caret-bottom" class="LivingInput" v-model="submitForm.AllLiving" clearable  @clear="clearLivingChange"></el-input>
      </el-popover>
    </section> -->
    <!-- 物业费 -->
    <!-- <section class="minHOA">
      <el-select
        v-model="submitForm.maxHoaFee"
        size="small"
        suffix-icon="el-icon-caret-bottom"
        class="minHOAInput"
        placeholder="MAX HOA"
        clearable>
        <el-option
          v-for="item in 500"
          :key="item-1"
          :label="item-1 === 0 ? 'Any' : (item-1) * 10 + '/month'"
          :value="(item-1) * 10">
        </el-option>
      </el-select>
    </section> -->
    <!-- 年限 -->
    <!-- <section class="fixedyear">
      <el-popover
        class="select-box"
        placement="bottom"
        width="260"
        size="small"
        suffix-icon="el-icon-caret-bottom"
        trigger="click">
        <section class="selctPrice" style="display: flex; align-items: center;">
          <el-date-picker
            v-model="submitForm.minBuildYear"
            size="mini"
            type="year"
            suffix-icon="el-icon-caret-bottom"
            value-format="yyyy"
            placeholder="Min year"
            clearable>
          </el-date-picker>
          <span>&nbsp;-&nbsp;</span>
          <el-date-picker
            v-model="submitForm.maxBuildYear"
            size="mini"
            type="year"
            suffix-icon="el-icon-caret-bottom"
            value-format="yyyy"
            placeholder="Max year"
            clearable>
          </el-date-picker>
        </section>
        <el-input type="text" size="small" slot="reference" suffix-icon="el-icon-caret-bottom" placeholder="Year Built" class="priceInput" v-model="submitForm.Allyear" clearable></el-input>
      </el-popover>
    </section> -->
    <!-- 更多 -->
    <section class="More">
      <el-popover
        popper-class="buying-hander-top-select-more-box"
        placement="bottom"
        width="200"
        size="small"
        trigger="click"
        clearable>
        <el-form ref="moreForm" :model="submitForm" label-width="140px" label-position='left'>
          <!-- <el-form-item label="Bathrooms" label-width="100px">
            <section class="Bathrooms">
              <el-select
                v-model="submitForm.minBathRoom"
                placeholder="Bathrooms"
                size="small"
                class="BathroomsInput"
                suffix-icon="el-icon-caret-bottom"
                >
                <el-option
                  v-for="item in 500"
                  :key="item * 0.5"
                  :label="item * 0.5 + '+'"
                  :value="item * 0.5">
                </el-option>
              </el-select>
            </section>
          </el-form-item> -->
          <!-- 浴室数量 -->
          <el-form-item label="Baths">
            <section class="Bathrooms">
              <el-select
                v-model="submitForm.minBathRoom"
                placeholder="Bathrooms"
                size="small"
                class="BathroomsInput"
                suffix-icon="el-icon-caret-bottom"
                >
                <el-option
                  v-for="item in 500"
                  :key="item * 0.5"
                  :label="item * 0.5 + '+'"
                  :value="item * 0.5">
                </el-option>
              </el-select>
            </section>
          </el-form-item>
          <!-- 浴室数量 -->
          <!-- 居住面积 -->
          <el-form-item label="Living sqft">
            <section class="sqft">
              <!-- <el-popover
                class="select-box"
                placement="bottom"
                width="200"
                size="small"
                trigger="click"> -->
                <section class="selctPrice" style="display: flex; align-items: center;">
                  <el-select
                    v-model="submitForm.minLiveSqft"
                    placeholder="0 sqft"
                    size="mini"
                    clearable>
                    <el-option
                      v-for="item in sqftList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span>&nbsp;-&nbsp;</span>
                  <el-select v-model="submitForm.maxLiveSqft" placeholder="50k SQFT" size="mini" clearable>
                    <el-option
                      v-for="item in sqftList"
                      :disabled="item.value < submitForm.minLiveSqft"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </section>
                <!-- <el-input type="text" size="small" slot="reference" placeholder="Living sqft" suffix-icon="el-icon-caret-bottom" class="LivingInput" v-model="submitForm.AllLiving" clearable  @clear="clearLivingChange"></el-input>
              </el-popover> -->
            </section>
          </el-form-item>
          <!-- 居住面积 -->
          <el-form-item label="Lot size">
            <!-- <el-select
              v-model="submitForm.maxLotSqft"
              size="small"
              suffix-icon="el-icon-caret-bottom"
              class="sqftInput"
              placeholder="Any"
              clearable>
              <el-option
                v-for="item in 500"
                :key="item-1 == 0 ? `Any` : `${(item-1) * 100}SQFT`"
                :label="item-1 == 0 ? `Any` : `${(item-1) * 100}SQFT`"
                :value="item-1 == 0 ? `` : (item-1) * 100">
              </el-option>
            </el-select> -->
            <!-- <el-popover
              class="select-box"
              placement="bottom"
              size="small"
              trigger="click"> -->
              <section class="selctPrice" style="display: flex; align-items: center;">
                <el-select
                  v-model="submitForm.minLotSqft"
                  placeholder="0 sqft"
                  size="mini"
                  clearable>
                  <el-option
                    v-for="item in sqftList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>&nbsp;-&nbsp;</span>
                <el-select v-model="submitForm.maxLotSqft" placeholder="50 sqft" size="mini" clearable>
                  <el-option
                    v-for="item in sqftList"
                    :disabled="item.value < submitForm.minLotSqft"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </section>
              <!-- <el-input type="text" size="small" slot="reference" placeholder="Lot sqft" suffix-icon="el-icon-caret-bottom" class="LotSqftInput" v-model="submitForm.AllLotSqft" clearable @clear="clearLotSqftChange"></el-input>
            </el-popover> -->
          </el-form-item>
          <!-- 物业费 -->
          <el-form-item label="MAX HOA">
            <section class="minHOA">
              <el-select
                v-model="submitForm.maxHoaFee"
                size="small"
                suffix-icon="el-icon-caret-bottom"
                class="minHOAInput"
                placeholder="MAX HOA"
                clearable>
                <el-option label="No HOA Fee" :value="null"></el-option>
                <el-option
                  v-for="item in 500"
                  :key="item-1"
                  :label="item-1 === 0 ? 'Any' : '$' + (item-1) * 10 + '/month'"
                  :value="(item-1) * 10">
                </el-option>
              </el-select>
            </section>
          </el-form-item>
          <!-- 物业费 -->
          <!-- 建造年份 -->
          <el-form-item label="Year Built">
            <section class="fixedyear">
              <!-- <el-popover
                class="select-box"
                placement="bottom"
                width="260"
                size="small"
                suffix-icon="el-icon-caret-bottom"
                trigger="click"> -->
                <section class="selctPrice" style="display: flex; align-items: center;">
                  <el-date-picker
                    v-model="submitForm.minBuildYear"
                    size="mini"
                    type="year"
                    suffix-icon="el-icon-caret-bottom"
                    value-format="yyyy"
                    placeholder="Min"
                    clearable>
                  </el-date-picker>
                  <span>&nbsp;-&nbsp;</span>
                  <el-date-picker
                    v-model="submitForm.maxBuildYear"
                    size="mini"
                    type="year"
                    suffix-icon="el-icon-caret-bottom"
                    value-format="yyyy"
                    placeholder="Max"
                    clearable>
                  </el-date-picker>
                </section>
                <!-- <el-input type="text" size="small" slot="reference" suffix-icon="el-icon-caret-bottom" placeholder="Year Built" class="priceInput" v-model="submitForm.Allyear" clearable></el-input>
              </el-popover> -->
            </section>
          </el-form-item>
          <!-- 建造年份 -->
          <el-form-item label="Days on Ebuyhouse">
            <el-select
              v-model="submitForm.maxDays"
              size="small"
              class="HouseDaysInput"
              suffix-icon="el-icon-caret-bottom"
              placeholder="Days on Ebuyhouse"
              clearable>
              <el-option
                v-for="item in HouseDaysList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Rental Option" v-if="!params.type">
            <el-checkbox-group v-model="submitForm.saleOrRents" class="saleOrRentSing" @change="setSaleOrRentType">
              <el-checkbox :label="2">Whole House</el-checkbox>
              <el-checkbox :label="3">Single Room</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Pets " v-if="!params.type">
            <el-radio-group v-model="submitForm.extKey" class="pets">
              <el-radio label="13NB">Pets allowed</el-radio>
              <el-radio label="13NA">No pets</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="Advantages">
            <el-checkbox-group v-model="submitForm.labels" class="extKey">
              <el-checkbox v-for="(item, index) in tagList" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
        </el-form>
        <el-input type="text" size="small" slot="reference" suffix-icon="el-icon-caret-bottom" placeholder="More" class="priceInput" v-model="submitForm.more" clearable></el-input>
      </el-popover>
    </section>
    <!-- 确定 -->
    <!-- <section class="Apply">
      <el-button type="primary" size="small" class="submitbtnsty" @click="submitServer">Apply</el-button>
    </section> -->
    <!-- 重置 -->
    <section class="Reset">
      <el-button type="primary" size="small" class="submitbtnsty" @click="resetForm">Reset</el-button>
    </section>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { deepClone } from '@/utils'
export default {
  data () {
    return {
      // 提交得数据
      submitForm: {
        keyWord: null,
        housetypeArray: [],
        extKey: null,
        // labels: [],
        saleOrRents: []
      },
      // 搜索框数据管理
      SearchHistoryArray: [],
      RemoteArray: [],
      // 显示隐藏
      showList: false,
      // 地图参数 中心点 keyword
      mapConfig: {
        flag: false,
        lat: 0,
        lng: 0
      },
      // 关键词loading
      mapLoading: false,
      // 关键词搜索列表
      KeyWordCityList: [],
      // 基础数据
      priceList: [],
      minpriceList: [],
      // houseList
      housetypeList: [],
      // tagList
      // tagList: [],
      sqftList: [],
      HouseDaysList: [
        {
          label: '7 days',
          value: 7
        },
        {
          label: '14 days',
          value: 14
        },
        {
          label: '30 days',
          value: 30
        },
        {
          label: '90 days',
          value: 90
        },
        {
          label: '6 months',
          value: 180
        },
        {
          label: '12 months',
          value: 360
        },
        {
          label: '24 months',
          value: 680
        },
        {
          label: '36 months',
          value: 1080
        }
      ],
      selectFlag: false,
      isFirstLoader: true,
      // 延迟控制器
      FORM_TIMER: null,
      // 延迟
      serchTimeOut: null,
      pauseOnceForm: false
    }
  },
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom',
      SearchHistory: 'SearchHistory',
      mapConfigs: 'mapConfig'
    })
  },
  created () {
    try {
      // this.params = Object.assign(JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse)))
      this.params = this.formatParams(this.$route.params)
      // console.log(this.formatParams(this.$route.params))
      // console.log('获取地址参数----------------->')
      // console.log(this.params)
      // if (Object.keys(this.$route.query).length > 1 && Object.keys(this.$route.query).includes('type')) {
      //   // 定义复制后的数据
      //   const cloneMapConfig = Object.assign({}, this.params)

      //   this.UPDATA_MAP_CONFIG(Object.assign({}, this.mapConfigs, {
      //     isSearch: true,
      //     isDefault: true,
      //     cityId: cloneMapConfig.cityId || this.mapConfigs.cityId,
      //     lat: cloneMapConfig.lat || cloneMapConfig.latitude || this.mapConfigs.lat,
      //     lng: cloneMapConfig.lng || cloneMapConfig.longitude || this.mapConfigs.lng
      //   }))
      //   // this.UPDATA_MAP_CONFIG({isDefault: false, isMapSize: 4, isSearch: true})
      // }
      this.submitForm = Object.assign({}, this.submitForm, this.searchFrom, this.formatParams(this.$route.params))
      console.log('获取默认数据--------------------------->')
      console.log(this.submitForm)
    } catch (err) {}
  },
  watch: {
    'submitForm': {
      handler: function (_new, _old) {
        console.log('数据发生改变')
        // console.log(_new)
        const cloneForm = Object.assign({}, _new)
        const _this = this
        _this.submitForm.Allprice = ((_this.submitForm.minPrice || '') !== '' ? ((_this.submitForm.minPrice || '') + ' - ') : '') + (_this.submitForm.maxPrice || '')
        _this.submitForm.Allyear = ((_this.submitForm.minBuildYear || '') !== '' ? ((_this.submitForm.minBuildYear || '') + ' - ') : '') + (_this.submitForm.maxBuildYear || '')
        _this.submitForm.AllLiving = ((_this.submitForm.minLiveSqft || '') !== '' ? ((_this.submitForm.minLiveSqft || '') + ' - ') : '') + (_this.submitForm.maxLiveSqft || '')
        _this.submitForm.AllLotSqft = ((_this.submitForm.minLotSqft || '') !== '' ? ((_this.submitForm.minLotSqft || '') + ' - ') : '') + (_this.submitForm.maxLotSqft || '')
        _this.timeOutLoader()
        // console.log(this.searchFrom, cloneForm)
        clearTimeout(_this.FORM_TIMER)
        _this.FORM_TIMER = setTimeout(() => {
          _this.UPDATA_SERCH_FROM(Object.assign({}, this.searchFrom, cloneForm, {pageNum: 1}))
        }, 500)
      },
      deep: true
      // immediate: true
    },
    'searchFrom.keyWord': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.remoteMethod(_new)
          this.submitForm.keyWord = _new
        } else {
          console.log('数据相同 跳过')
        }
      }
    }
  },
  filters: {
    priceFormat (_N) {
      let AfterProgressing = []
      _N.toString().replace(/\D/g, '').split('').filter(items => {
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
      return AfterProgressing.reverse().join('')
    }
  },
  methods: {
    ...mapMutations({
      UPDATA_SERCH_FROM: 'UPDATA_SERCH_FROM',
      UPDATA_MAP_CONFIG: 'UPDATA_MAP_CONFIG',
      UPDATA_SEARCH_HISTORY: 'UPDATA_SEARCH_HISTORY'
    }),
    init () {
      for (let i = 1; i < 50; i++) {
        this.priceList.push({
          id: i,
          label: `$${this.$options.filters.priceFormat(i * 50000)}`,
          value: i * 50000
        })
        this.minpriceList.push({
          id: i,
          label: `$${this.$options.filters.priceFormat(i * 500)}`,
          value: i * 500
        })
      }
      for (let i = 0; i < 500; i++) {
        this.sqftList.push({
          id: i,
          label: `${i === 0 ? 'Any' : i * 100 + 'sqft'}`,
          value: i * 100
        })
      }
    },
    formatParams (_info) {
      // _info
      let cloneParams = Object.assign({}, _info)
      let checkNum = 0
      // 设置默认缺省值
      cloneParams['isComplete'] = false
      // 判断租购类型
      if (cloneParams.type === 'buy') {
        cloneParams['type'] = true
      } else {
        cloneParams['type'] = false
      }
      // 提取选择城市参数
      Object.keys(cloneParams).map(key => {
        if (cloneParams[key] && cloneParams[key].toString().includes('ebuy-')) {
          const index = cloneParams[key].indexOf('-')
          cloneParams[key] = cloneParams[key].substring(index + 1).toString()
          checkNum++
        }
        if (!cloneParams[key]) {
          cloneParams[key] = null
          cloneParams['isComplete'] = true
        }
      })
      if (checkNum < 6) {
        return {type: cloneParams.type}
      }
      return cloneParams
    },
    setSaleOrRentType () {
      let Types = 0
      this.submitForm.saleOrRents.map((item, index) => {
        Types = item + Types
      })
      this.submitForm['saleOrRent'] = Types
    },
    submitServer () {
      const _this = this
      clearTimeout(_this.serchTimeOut)
      _this.serchTimeOut = setTimeout(() => {
        if (!_this.submitForm.keyWord || !_this.KeyWordCityList) return
        if (_this.KeyWordCityList instanceof Array && _this.KeyWordCityList.length > 0 && _this.submitForm.keyWord && _this.submitForm.keyWord.length > 0) {
          for (let i = 0; i < _this.KeyWordCityList.length; i++) {
            if (_this.KeyWordCityList[i].cityAscii.toLowerCase() === _this.submitForm.keyWord.toLowerCase() && !_this.selectFlag) {
              _this.confirmWordsChange(_this.KeyWordCityList[i])
              return
            }
          }
          // _this.KeyWordCityList.reduce((result, item) => {
          //   if (item.cityAscii.toLowerCase() === _this.submitForm.keyWord.toLowerCase() && !_this.selectFlag) {
          //     _this.confirmWordsChange(item)
          //     // _this.UPDATA_SERCH_FROM(Object.assign(_this.submitForm, {flag: true}, {lng: item.lng, lat: item.lat, stateId: item.stateId}))
          //     // result.push(false)
          //   }
          // })
        } else {
          Object.assign(_this.submitForm, {flag: true})
        }
      }, 1500)
    },
    fetchHouseType () {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/house/type`)
        .then(res => {
          if (res.data.success) {
            // console.log(res)
            _this.housetypeList = res.data.data.map(item => {
              return {label: item.name, value: item.id}
            })
          }
        })
    },
    // fetchTagList () {
    //   const _this = this
    //   _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/all/label`)
    //     .then(res => {
    //       if (res.data.success) {
    //         // console.log(res)
    //         _this.tagList = res.data.data.map(item => {
    //           return {label: item.name, value: item.id}
    //         })
    //       }
    //     })
    // },
    // 搜索
    // remoteMethod (query, _cb) {
    //   console.log(query)
    //   this.keyWordNullChange()
    //   let _query
    //   if (query) {
    //     _query = query.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9,])/g, ' ')
    //   } else {
    //     _query = query
    //   }
    //   this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: _query, pageNum: 1, pageSize: 100 }})
    //     .then(res => {
    //       if (res.data.success) {
    //         // console.log()
    //         // _cb(res.data.data)
    //         // this.KeyWordCityList = res.data.data
    //         this.remoteMethodState(res.data.data, _query, _cb)
    //       }
    //       // console.log(res)
    //     })
    // },
    // 删除历史记录
    deleteOnceHistory (_info) {
      // this.showList = true
      let cloneSearchHistoryArray = deepClone(this.SearchHistory)
      this.SearchHistoryArray.splice(this.SearchHistoryArray.indexOf(_info), 1)
      cloneSearchHistoryArray.splice(cloneSearchHistoryArray.indexOf(_info), 1)
      this.UPDATA_SEARCH_HISTORY(cloneSearchHistoryArray)
    },
    // 打开历史记录
    openHistory (_info) {
      console.log(_info)
      if (_info.xtype !== 3) {
        const from = Object.assign({}, {keyWord: _info.name, cityName: _info.name})
        this.UPDATA_SERCH_FROM(Object.assign({}, from))
        this.UPDATA_MAP_CONFIG({
          lat: _info.lat,
          lng: _info.lng,
          isDefault: true,
          flag: true
        })
      }
    },
    // 搜索
    remoteMethod (query) {
      if (!query) {
        let cloneHistoryArray = deepClone(this.SearchHistory).reverse().slice(0, 10)
        try {
          let localHistory = JSON.parse(sessionStorage.getItem('locationConfig'))
          const localtionObject = {
            id: parseInt(Math.random() * 10000000000),
            lat: localHistory.lat,
            lng: localHistory.lng,
            type: -1,
            name: localHistory.cityAscii
          }
          cloneHistoryArray.unshift(localtionObject)
        } catch (error) {
          console.log('定位数据插入失败！')
        } finally {
          console.log(this.SearchHistory)
          // console.log(cloneHistoryArray)
          // _cb(cloneHistoryArray)
          // 截取0-11个包括一个定位 10个历史记录
          this.SearchHistoryArray = cloneHistoryArray
          this.RemoteArray = []
        }
        return
      }
      const _query = query.toString().replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9,])/g, ' ')
      // 当输入为纯数字 并且长度小于等于2时 停止搜索
      if (!isNaN(_query) && _query.length <= 2) return
      if (this.queryType !== 2) {
        this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/pad`, {params: { keyWord: _query, saleOrRent: this.queryType === 0 ? '1' : '5', pageNum: 1, pageSize: 100 }})
          .then(res => {
            if (res.data.success) {
              // console.log()
              // _cb(res.data.data)
              this.RemoteArray = res.data.data
            }
            console.log(res)
          })
      }
    },
    // 搜索州
    remoteMethodState (list, query, _cb) {
      this.keyWordNullChange()
      this.$axios.get(`${this.ljj_path}region/list/state-str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            // console.log()
            let lists = res.data.data.map(item => {
              item.cityAscii = item.name
              item.stateId = item.id
              item.type = true
              return item
            })
            _cb([...lists, ...list])
            this.KeyWordCityList = [...lists, ...list]
            this.submitServer()
          }
          // console.log(res)
        })
    },
    // 查询数组中是否包含某个元素
    InquireArrayObject (key, arr, obj) {
      return arr.some(item => {
        if (item[key] === obj[key]) {
          return true
        }
      })
    },
    // 确认关键字
    confirmWordsChange (_info) {
      const newHistoryObject = Object.assign({}, _info, {xtype: _info.type, type: 0})
      // 更新历史记录 去重操作
      // console.log(this.SearchHistory, newHistoryObject)
      // console.log(this.InquireArrayObject(this.SearchHistory, newHistoryObject))
      if (!this.InquireArrayObject('id', this.SearchHistory, newHistoryObject)) {
        this.UPDATA_SEARCH_HISTORY(newHistoryObject)
      }
      if (_info.type !== 3) {
        // console.log(_info)
        const _this = this
        this.selectFlag = true
        // this.mapConfig.flag = true
        // 先更新地图定位
        // Object.assign(this.mapConfig, {lat: _info.lat || _info.latitude, lng: _info.lng || _info.longitude})
        // 然后设置搜索参数
        this.submitForm = Object.assign({}, this.submitForm, {keyWord: _info.name.split(', ')[0], cityId: _info.type !== 2 ? _info.id : null, cityName: _info.name, random: parseInt(Math.random() * 1000)})
        // this.UPDATA_MAP_CONFIG(Object.assign({}, {StateType: _info.id.length < 3}, this.mapConfig))
        this.UPDATA_MAP_CONFIG(Object.assign({}, this.mapConfig, {
          lat: _info.lat || _info.latitude,
          lng: _info.lng || _info.longitude,
          isDefault: true,
          flag: true
        }))
        // console.log(Object.assign({}, this.submitForm, {StateType: _info.id.length < 3}, _this.mapConfig))
        setTimeout(() => {
          _this.mapConfig.flag = false
          _this.selectFlag = false
        }, 100)
        if (_info.id.length < 3) {
          Object.assign(this.submitForm, {flag: true}, {StateType: _info.id.length < 3})
        }
      }
    },
    // 搜索地址
    handSerchClick (_info) {
    },
    // 清空关键字
    keyWordClearChange () {
      this.submitForm.keyWord = null
      this.submitForm.cityId = null
      this.submitForm.stateId = null
      Object.assign(this.submitForm, {flag: true})
    },
    // 如果未点击清空按钮直接删除
    keyWordNullChange (_event) {
      if (!this.submitForm.keyWord) {
        this.submitForm.keyWord = null
        this.submitForm.cityId = null
        this.submitForm.stateId = null
      }
    },
    clearPriceChange () {
      this.submitForm.minPrice = null
      this.submitForm.maxPrice = null
    },
    clearLivingChange () {
      this.submitForm.minLiveSqft = null
      this.submitForm.maxLiveSqft = null
    },
    clearLotSqftChange () {
      this.submitForm.minLotSqft = null
      this.submitForm.maxLotSqft = null
    },
    resetForm () {
      this.submitForm = {
        keyWord: null,
        housetypeArray: []
        // labels: []
      }
      this.UPDATA_SERCH_FROM({
        keyWord: null,
        housetypeArray: [],
        // labels: [],
        deep: true
      })
    },
    timeOutLoader () {
      const _this = this
      setTimeout(() => {
        if (_this.params.type) {
          Object.assign(_this.submitForm, {saleOrRent: 1}, {flag: true})
        } else {
          Object.assign(_this.submitForm, {saleOrRent: 5}, {flag: true})
        }
      }, 100)
    },
    queryFocusChange () {
      // alert(this.queryType)
      this.remoteMethod(this.submitForm.keyWord)
      this.showList = true
    },
    queryBlurChange () {
      // this.showList = false
    },
    // 关闭
    isClosePenel (e) {
      if (!this.showList) return
      let targetStatus = false
      e.path.some(item => {
        // console.log(item.className)
        if (item.className && item.className.includes('search-box')) {
          targetStatus = true
          return true
        }
      })
      this.showList = targetStatus
    }
  },
  mounted () {
    this.init()
    this.fetchHouseType()
    // this.fetchTagList()
    this.timeOutLoader()
    window.document.addEventListener('click', this.isClosePenel)
  },
  destroyed () {
    window.document.removeEventListener('click', this.isClosePenel)
  }
}
</script>
<!-- 全局 -->
<style lang="sass">
  .buying-hander-top-select-more-box
    width: 24em !important
    font-size: 16px
    .saleOrRentSing,.pets
      display: flex
      flex-direction: column
      .el-radio
        margin: 15px 15px
    .extKey
      .el-checkbox
        margin-left: 30px
  input::-webkit-input-placeholder
    color: #444 !important
</style>
<style lang="sass" scoped>
  .keyword
    width: 120% !important
    .city
      font-size: 0.8em
      color: #444
    .county
      font-size: 0.2em
      color: #999
</style>
<style lang="sass" scoped>
  .header-modules-from
    height: 5.3125em
    display: flex
    // flex-wrap: wrap
    align-items: center
    justify-content: flex-start
    .autoSerchCity
      margin-left: 10px
      .search-box-content
        position: relative
        display: flex
        flex-direction: column
        .custom-input
          background: rgb(255, 255, 255)
          height: 32px
          border-radius: 5px
          display: flex
          position: relative
          align-items: center
          border: 1px solid #C0C4CC
          &.focus
            border: 1px solid #1281FC
          >input
            flex: 1
            border-radius: 5px
            outline: none
            border: none
            text-indent: 0.7em
            font-size: 14px
            width: 15em
            &::placeholder
              color: #999
              font-size: 14px
          >i
            position: absolute
            right: 10px
            cursor: pointer
            font-size: 18px
            color: #444
          i.close
            // font-size: 25px
            right: 40px
        .downdrap-list
          position: absolute
          z-index: 999
          top: 40px
          left: 0
          flex: 1
          background-color: #fff
          width: 100%
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.35)
          border-radius: 5px
          overflow: hidden
          .remote-box
            // padding: 10px
            max-height: 260px
            padding: 10px 0
            overflow-y: scroll
            transition: all .5s ease
            &.isMinClass
              height: 275px
              transition: all .5s ease
            &::-webkit-scrollbar
              width: 4px
              height: 4px
            &::-webkit-scrollbar-thumb
              border-radius: 0px
              -webkit-box-shadow: inset 0 0 5px #1281FC
              background: #1281FC
            &::-webkit-scrollbar-track
              // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
              border-radius: 0
              background: trnasparent
            li
              min-height: 32px
              display: flex
              align-items: center
              padding: 0 10px
              color: #444
              font-size: 14px
              align-items: center
              // padding: 6px 10px
              line-height: 25px
              &:hover
                background: #F5F7FA
                // color: #fff
                cursor: pointer
                i
                  // color: #fff !important
                a
                  // color: #fff
            .city
              a
                display: flex
                width: 100%
                height: 100%
                align-items: center
            .local
              i
                margin-right: 5px
                color: #1281fc
            .history
              display: flex
              justify-content: space-between
              &:first-child
                border-top: 1px solid #E0E0E0
              i
                margin-right: 5px
                color: #1281fc
              i.close
                color: #444
    .price,.fixedyear
      margin-left: 10px
      .selctPrice
        display: flex
        flex-direction: row
      .priceInput
        width: 12.5em
    .Bedrooms,.Bathrooms,.housetype,.minHOA,.sqft,.HouseDays,.More
      margin-left: 10px
      .BedroomsInput,.BathroomsInput,.minHOAInput,.sqftInput
        width: 7.5em
      .housetypeInput,.HouseDaysInput
        width: 12em
      .LivingInput,.LotSqftInput
        width: 10em
    .More
      width: 15em
      .el-form-item
        margin-bottom: 8px
    .Apply,.Reset
      margin-right: 1.25em
      margin-left: 10px
      .submitbtnsty
        width: 7.1825em
</style>
