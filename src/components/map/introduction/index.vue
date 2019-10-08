<template>
  <section class="introductionViews" v-loading="LOADING_CONFIG.listLoading">
    <header class="serchTip">
      <h3>{{ searchFrom.keyWord || locationCity }} Homes For {{params.type ? 'Sale':'Rent'}}: {{ PAGE_CONFIG.total || rightPageConfig.pageTotal }} homes available on Ebuyhouse</h3>
      <section class="sortType">
        <el-select
          v-model="sortTypeArray"
          size="small"
          class="sortTypeInput"
          icon="el-icon-caret-bottom"
          placeholder="Sort: Recent"
          @clear="clearChange"
          @change="sortChange"
          clearable>
          <el-option
            v-for="(item, index) in sortTypeList"
            :key="index"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </section>
    </header>
    <section class="Rmodule">
      <map-r-intro :PAGE_CONFIG="PAGE_CONFIG"></map-r-intro>
      <span>United States > {{ searchFrom.stateId && mapConfig.isSearch ? searchFrom.stateId + ' >' : '' }} {{ searchFrom.keyWord || searchFrom.cityName || 'Las Vegas' }}</span>
    </section>
    <section class="articleHouse">
      <header>
        <h3>WHY USE EBUYHOUSE</h3>
      </header>
      <footer>
        <article>
          <p>Ebuyhouse is the world’s first platform to connect homebuyers, sellers and renters directly, free of charge and without the use of real estate agents. The innovative platform integrates nearly every aspect of real estate transactions, streamlining the process and saving you money. Users can take advantage of the Ebuyhouse SFT Transaction method, which allows perspective homebuyers the option of living in a home on a trial basis before completing the transaction. This revolutionary method of buying and selling real estate has forever changed the industry. Also, by eliminating real estate agents from the equation, we've also eliminated the hidden fees and costly commissions. At Ebuyhouse, we believe that buying, selling and renting real estate property should be as simple and secure as any other e-commerce transaction</p>
          <br>
          <p>Ebuyhouse launched in the year of 2018. We are headquartered in Las Vegas, NV.</p>
        </article>
      </footer>
    </section>
    <footer class="bottomComponent">
      <map-bottom-common></map-bottom-common>
    </footer>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import mapRintro from '@/components/map/mapRintro'
import bottomCommon from '@/components/map/bottomCommon'
export default {
  components: {
    'map-r-intro': mapRintro,
    'map-bottom-common': bottomCommon
  },
  data () {
    return {
      params: {},
      locationCity: 'Real Estate',
      sortTypeArray: 0,
      sortTypeList: [
        {
          label: 'Time (oldest to newest)',
          sortType: 'asc',
          sort: 'createTime',
          id: 0
        },
        {
          label: 'Time (newest to oldest)',
          sortType: 'desc',
          sort: 'createTime',
          id: 1
        },
        {
          label: 'Price (low to high)',
          sortType: 'asc',
          sort: 'price',
          id: 2
        },
        {
          label: 'Price (high to low)',
          sortType: 'desc',
          sort: 'price',
          id: 3
        },
        {
          label: 'HOA fee (low to high)',
          sortType: 'asc',
          sort: 'hoaFee',
          id: 4
        },
        {
          label: 'HOA fee (high to low)',
          sortType: 'desc',
          sort: 'hoaFee',
          id: 5
        },
        {
          label: 'bedroom(low to high)',
          sortType: 'asc',
          sort: 'bedroom',
          id: 6
        },
        {
          label: 'bedroom(high to low)',
          sortType: 'desc',
          sort: 'bedroom',
          id: 7
        },
        {
          label: 'bathroom(low to high)',
          sortType: 'asc',
          sort: 'bathroom',
          id: 8
        },
        {
          label: 'bathroom(high to low)',
          sortType: 'desc',
          sort: 'bathroom',
          id: 9
        },
        {
          label: 'garage(low to high)',
          sortType: 'asc',
          sort: 'garage',
          id: 10
        },
        {
          label: 'garage(high to low)',
          sortType: 'desc',
          sort: 'garage',
          id: 11
        },
        {
          label: 'kitchen(low to high)',
          sortType: 'asc',
          sort: 'kitchen',
          id: 12
        },
        {
          label: 'kitchen(high to low)',
          sortType: 'desc',
          sort: 'kitchen',
          id: 13
        },
        {
          label: 'lotSqft(low to high)',
          sortType: 'asc',
          sort: 'lotSqft',
          id: 14
        },
        {
          label: 'lotSqft(high to low)',
          sortType: 'desc',
          sort: 'lotSqft',
          id: 15
        },
        {
          label: 'livingSqft(low to high)',
          sortType: 'asc',
          sort: 'livingSqft',
          id: 16
        },
        {
          label: 'livingSqft(high to low)',
          sortType: 'desc',
          sort: 'livingSqft',
          id: 17
        },
        {
          label: 'yearBuild(old to new)',
          sortType: 'asc',
          sort: 'yearBuild',
          id: 18
        },
        {
          label: 'yearBuild(new to old)',
          sortType: 'desc',
          sort: 'yearBuild',
          id: 19
        }
      ],
      LOADING_CONFIG: {},
      PAGE_CONFIG: {}
    }
    // propertyPrice bedroom bathroom garage kitchen lotSqft livingSqft yearBuild
  },
  props: {
    loadingConfig: {
      default: () => {
        return {
          gobalLoading: true,
          mapLoading: true,
          listLoading: true
        }
      },
      type: Object
    },
    pageConfig: {
      default: () => {
        return {
          total: 0
        }
      },
      type: Object
    }
  },
  watch: {
    loadingConfig: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          // console.log(_new)
          this.LOADING_CONFIG = _new
        }
      },
      deep: true,
      immediate: true
    },
    pageConfig: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          console.log(_new)
          this.PAGE_CONFIG = _new
        }
      },
      deep: true,
      immediate: true
    },
    mapConfig: {
      handler (_new, _old) {
        console.log('获取定位信息-->')
        console.log(_new, _old)
      },
      deep: true,
      immediate: true
    },
    searchFrom: {
      handler (_new, _old) {
        // console.log('获取定位信息-->')
        // console.log(_new, _old)
        if (!_new.sort) {
          this.sortTypeArray = 0
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    try {
      this.params = Object.assign({}, this.submitForm, this.searchFrom, this.formatParams(this.$route.params))
      console.log('top----params')
      console.log(this.params)
    } catch (err) {}
  },
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom',
      rightPageConfig: 'rightPageConfig',
      mapConfig: 'mapConfig'
    })
  },
  methods: {
    ...mapMutations({
      updata_from: 'UPDATA_SERCH_FROM'
    }),
    init () {},
    fetchHouseList () {},
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
    sortChange (_info) {
      // console.log(_info)
      let linObj = Object.assign({}, this.sortTypeList[_info])
      delete linObj.label
      delete linObj.value
      this.updata_from(Object.assign({}, this.searchFrom, linObj))
    },
    clearChange () {
      this.updata_from(this.searchFrom)
    }
  }
}
</script>
<style lang="sass" scoped>
  .introductionViews
    flex: 0 0 50%
    background-color: #f3f4f5
    width: 100%
    height: 100%
    overflow-y: scroll
    // box-shadow: 1px 0 10px 1px #ddd
    .serchTip
      height: 5.625em
      display: flex
      align-items: center
      justify-content: space-between
      // width: 100%
      margin: 0 5% 0 5%
      h3
        color: #444
        font-size: 1.125em
      .sortType
        .sortTypeInput
          width: 10em
    .Rmodule
      margin: 0 5% 0 5%
      span
        display: flex
        width: 100%
        justify-content: center
        font-size: 0.875em
        color: #444
    .articleHouse
      margin: 2.5em 3.125em 1.75em 3.625em
      header
        h3
          height: 70px
          font-size: 2em
          color: #444
          display: flex
          align-items: center
      footer
        article
          font-size: 1em
          color: #666
          line-height: 20px
</style>
