<style lang="sass" scoped>
  @media screen and (max-width: 1300px)
    .search-part
      width: 35%
      top: 8%
    .tab-box
      font-size: 1.5em
  @media screen and (min-width: 1300px)
    .search-part
      top: 8%
      width: 26.5%
    .tab-box
      font-size: 1.5em
  @media screen and (min-width: 1515px)
    .search-part
      top: 8%
    .tab-box
      font-size: 1.5em
  @media screen and (max-width: 750px)
    .search-part
      width: auto
      top: 8%
    .tab-box
      font-size: 1.5em
</style>
<style lang="scss" scoped>
.search-part {
 margin: 0 auto;
 width: 500px;
}
.search-part.action {
  transition: all .3s linear;
  height: 34%;
  top: 41%;
  background: #fff;
}
.serch-box{
  position: relative;
  width: 100%;
  // height: 100px;
  margin-top: 1.65rem;
  z-index: 9;
}
.header-serchs {
  width: 100%;
  height: 100%;
  background-color: #f3f4f5;
  /deep/ .el-input {
    height: 100%;
    input {
      height: 50px;
      border-radius: 2.5rem;
      font-size: 1.2rem;
      color: #444;
      &::placeholder {
        color: #777;
      }
    }
    .el-input-group__append {
      width: 6rem;
      height: 5rem;
      padding: 0;
      background-color: #1281fc;
      border: none;
      transition: all .3s linear;
      &:hover {
        background-color: #0072f1;
        button {
          transition: all .3s linear;
          background-image: url('/static/img/index/search.png');
        }
      }
    }
  }
}
.serchs-btn {
  width: 3rem;
  height: 1.5rem;
  color: #fff;
  border-radius: 1.5rem;
  background-color: #1281FC;
  background-image: url('/static/img/index/search_1.png');
  background-repeat:no-repeat;
  background-position:center;
  position: absolute;
  top:25px;
  transform: translateY(-50%);
  right: 21px;
  &:hover{
    background-color: #0072f1;
  }
}

.tab-box{
  height: 45%;
  display: flex;
}

.tab-box div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  cursor: pointer;
  color: #ffffff;
  position: relative;
}
.tab-box div:not(.active) {
  text-shadow: 1px 1px 1px #a09595f2;
}

.tab-box div:hover{
  color: #1281fc;
}

.tab-box div.active{
  background-color: rgba(0, 0, 0, 0.6);
}

.tab-box div.active:hover{
  color: #ffffff;
}

.tab-box div.active::before{
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 0.3rem solid transparent;
  border-bottom-color: #ffffff;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.search-box{
  height: 55%;
  background-color: #ffffff;
  // border-top-right-radius: 0.5rem;
  // border-bottom-right-radius: 0.5rem;
  // border-bottom-left-radius: 0.5rem;
  border-radius: 23px;
}

.search-box input{
  width: 90%;
  height: 100%;
  float: left;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid transparent;
  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0;
  outline: none;
  font-size: 1.2rem;
  color: #999999;
}

.search-box input:focus{
  border-color: #3e95d6;
}

/deep/ .search-box .WishListButton{
  width: 9.5%;
  height: 100%;
  float: right;
  border-radius: 0.5rem;
  background-image: url('/static/img/index/search.png');
  background-repeat: no-repeat;
  background-size: 88% auto;
  background-position: 50% 50%;
  &:hover {
    background-image: url('/static/img/index/search.png');
  }
}

.search-box button:active{
  background-size: 55% auto;
}
</style>

<template>
  <div class="search-part">
    <section class="serch-box">
     <!-- <div class="tab-box" ref="tabBox"> -->
        <!-- <div class="active" @click="switchQueryType('buy', 0)">Buy</div> -->
        <!-- <div @click="switchQueryType('rent', 1)">Rent</div>
        <div @click="switchQueryType('Wish List', 2)">Wish List</div> -->
      <!-- </div>  -->
      <div class="search-box">
        <!-- <input type="text" v-if="!isMap" autocomplete="off" spellcheck="false"
        v-model="queryWord" :placeholder="placeholder" @keydown.enter="searchs" /> -->
        <!-- <el-autocomplete
          class="header-serchs"
          v-model="queryWord"
          :fetch-suggestions="remoteMethod"
          :placeholder="placeholder"
          @select="openSearch"
          @keydown.enter="keywordSearch"
          :popper-append-to-body="false"
          clearable>
          该行要注释的
          <button class="serchs-btn" slot="append" @keydown.enter="keywordSearch" @click="keywordSearch"></button>
          <template slot-scope="{ item }">
            <div class="city">{{ item.cityAscii + ' ' + item.stateId }}</div>
          </template>
        </el-autocomplete> -->
        <!-- 搜索历史列表 -->
        <section class="search-box-content">
          <section :class="['custom-input', (showList || showCityList) ? 'focus' : '' ]">
            <input v-model="queryWord" :placeholder="placeholder" type="text" @focus="queryFocusChange" @keydown.enter="keywordSearch">
            <i class="iconfont icon-cancle close" @click="resetKeyWordChange" v-show="queryWord"></i>
            <i class="iconfont icon-search" @click="keywordSearch"></i>
          </section>
          <transition name="el-fade-in-linear">
            <section class="downdrap-list" v-show="showList">
              <ul class="remote-box">
                <!-- <li class="item"></li> -->
                <!-- 搜索历史列表 -->
                <template v-for="item in SearchHistoryArray">
                  <li class="local" @click="openHistory(item)" :key="item.id" v-if="item.type === -1 && RemoteArray.length === 0"><i class="iconfont icon-search-location"></i>{{ item.name }}</li>
                  <li class="history" @click="openHistory(item)" :key="item.id" v-if="item.type === 0 && RemoteArray.length === 0">
                    <span v-if="item.xtype !== 3">
                      <i class="iconfont icon-search_histroy"></i>
                      <!-- <span>{{ item.name}}</span> -->
                      <!--在有键入值时 首位就匹配到 -->
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) === 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(0, queryWord.length)}}</span>
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) === 0">{{ item.name.slice(queryWord.length)}}</span>
                      <!--在有键入值时 首位以后才匹配到 -->
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) > 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) > 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase())), item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()))+queryWord.length}}</span>
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) > 0">{{ item.name.slice(item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()))+queryWord.length)}}</span>
                      <!-- 没有键入值 或者没有匹配到-->
                      <span class="3" v-if="queryWord === null || queryWord === '' || queryWord === undefined || item.name.toLowerCase().indexOf(queryWord.toLowerCase()) < 0">{{ item.name}}</span>
                    </span>
                    <router-link v-else :to="'/listing/details/' + item.id">
                      <i class="iconfont icon-search_histroy"></i>
                      <!-- <span>{{ item.name}}</span> -->
                      <span v-if="queryWord && queryWord.length !== 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                      <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                      <span v-if="queryWord === null || queryWord === '' || queryWord === undefined">{{ item.name}}</span>
                    </router-link>
                    <i class="iconfont icon-guanbi close" @click.stop="deleteOnceHistory(item)"></i>
                  </li>
                </template>
                <!-- 检索关键词列表 -->
                <template v-for="item in RemoteArray">
                  <li class="city" @click="openSearch(item)" :key="item.id" v-if="item.type === 1">
                    <!-- {{ item.name}} -->
                    <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                    <span v-if="queryWord && queryWord.length !== 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()), item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                    <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                    <span v-if="queryWord === null || queryWord === '' || queryWord === undefined">{{ item.name}}</span>
                  </li>
                  <li class="city" @click="openSearch(item)" :key="item.id" v-if="item.type === 2">
                    <!-- {{ item.name}} -->
                    <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                    <span v-if="queryWord && queryWord.length !== 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()), item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                    <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                    <span v-if="queryWord === null || queryWord === '' || queryWord === undefined">{{ item.name}}</span>
                  </li>
                  <!-- <li class="city" @click="openSearch(item)" :key="item.id" v-if="item.type === 3"> -->
                  <li class="city" :key="item.id" v-if="item.type === 3">
                    <router-link :to="'/listing/details/' + item.id">
                      <!-- {{ item.name}} -->
                      <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                      <span class="speTxt" v-if="queryWord && queryWord.length !== 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()), item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                      <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
                      <span v-if="queryWord === null || queryWord === '' || queryWord === undefined">{{ item.name}}</span>
                    </router-link>
                  </li>
                </template>
              </ul>
            </section>
          </transition>
          <transition name="el-fade-in-linear">
            <section class="downdrap-list" v-show="showCityList && wishListArray.length !== 0">
              <ul class="remote-box">
                <!-- <li class="item"></li> -->
                <template v-for="item in wishListArray">
                  <li class="city" @click="openWishFilterChange(item)" :key="item.id">{{ item.cityAscii }} {{item.stateId}}</li>
                </template>
              </ul>
            </section>
          </transition>
        </section>
        <!-- <button class="serchs-btn" slot="append" @keydown.enter="keywordSearch" @click="keywordSearch"></button> -->
        <!-- <button v-if="!isMap" @click="searchs" class="WishListButton"></button> -->
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { deepClone } from '@/utils'
export default {
  data () {
    return {
      SearchHistoryArray: [],
      RemoteArray: [],
      wishListArray: [],
      queryType: 1,
      queryWord: '',
      placeholder: 'Enter a City, Address or Zip Code',
      // placeholderArr: [
      //   'Enter a City, Address or Zip Code',
      //   'Enter a City, Address or Zip Code',
      //   'Enter a City'
      // ],
      isMap: true,
      type: false,
      showList: false,
      showCityList: false
    }
  },
  computed: {
    ...mapGetters({
      SearchHistory: 'SearchHistory',
      mapConfig: 'mapConfig'
    })
  },
  watch: {
    queryWord (_new, _old) {
      if (_new !== _old) {
        if (this.queryType !== 2) {
          this.remoteMethod(_new)
        } else {
          this.remoteMethodCity(_new)
        }
      }
    }
  },
  mounted () {
    window.document.addEventListener('click', this.isClosePenel)
  },
  destroyed () {
    window.document.removeEventListener('click', this.isClosePenel)
  },
  methods: {
    ...mapMutations({
      UPDATA_SERCH_FROM: 'UPDATA_SERCH_FROM',
      UPDATA_MAP_CONFIG: 'UPDATA_MAP_CONFIG',
      UPDATA_SEARCH_HISTORY: 'UPDATA_SEARCH_HISTORY'
    }),
    // 关闭
    isClosePenel (e) {
      // console.log(e)
      if (this.queryType !== 2) {
        if (!this.showList) return
        let targetStatus = false
        e.path.some(item => {
          // console.log(item.className)
          if (item.className && item.className.includes('search-box')) {
            targetStatus = true
            return true
          }
        })
        this.showCityList = false
        this.showList = targetStatus
      } else {
        if (!this.showCityList) return
        let targetStatus = false
        e.path.some(item => {
          // console.log(item.className)
          if (item.className && item.className.includes('search-box')) {
            targetStatus = true
            return true
          }
        })
        this.showList = false
        this.showCityList = targetStatus
      }
    },
    openHistory (_info) {
      if (_info.xtype !== 3) {
        if (this.isMap) {
          const from = Object.assign({}, {keyWord: _info.name, cityName: _info.name})
          this.UPDATA_SERCH_FROM(Object.assign({}, from))
          this.UPDATA_MAP_CONFIG({
            lat: _info.lat,
            lng: _info.lng,
            isDefault: true,
            flag: true
          })
          this.search(from)
        } else {
          this.searchs(_info)
        }
      }
    },
    // switchQueryType (_type, _index) {
    //   this.$emit('searchIndex', _index)
    //   this.$refs.tabBox.querySelector('.active').classList.remove('active')
    //   this.$refs.tabBox.children[_index].classList.add('active')
    //   this.placeholder = this.placeholderArr[_index]
    //   this.queryType = _index
    //   if (_index === 2) {
    //     this.isMap = false
    //   } else {
    //     this.isMap = true
    //     this.type = _type === 0
    //   }
    // },
    // 搜索
    remoteMethodCity (query) {
      this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            // console.log()
            this.wishListArray = res.data.data
          }
          console.log(res)
        })
    },
    queryFocusChange () {
      // alert(this.queryType)
      if (this.queryType !== 2) {
        this.remoteMethod(this.queryWord)
        this.showList = true
        this.showCityList = false
      } else {
        this.resetKeyWordChange(this.queryWord)
        this.showCityList = true
        this.showList = false
      }
    },
    resetKeyWordChange () {
      this.queryWord = null
    },
    // 删除历史记录
    deleteOnceHistory (_info) {
      // this.showList = true
      let cloneSearchHistoryArray = deepClone(this.SearchHistory)
      let sameIdIndex
      this.SearchHistoryArray.splice(this.SearchHistoryArray.indexOf(_info), 1)
      for (let i = 0; i < cloneSearchHistoryArray.length; i++) {
        if (cloneSearchHistoryArray[i].id === _info.id) {
          sameIdIndex = i
        }
      }
      cloneSearchHistoryArray.splice(sameIdIndex, 1)
      this.UPDATA_SEARCH_HISTORY(cloneSearchHistoryArray)
    },
    searchs (_info = {}) {
      // this.UPDATA_SERCH_FROM({keyWord: this.queryWord})
      if (this.queryType !== 2) {
        this.$router.push({
          name: 'map&buying',
          query: {type: false, keyWord: this.queryWord}
        })
      } else {
        this.$router.push({
          path: '/buyRequestList',
          query: {keyWord: _info.name || _info.cityAscii, stateId: _info.stateId, cityId: _info.id}
        })
      }
    },
    openSearch (_info) {
      if (this.isMap) {
        const from = Object.assign({}, {keyWord: _info.name.split(', ')[0] || _info.cityAscii, stateId: _info.stateId, cityId: _info.id, cityName: _info.name.split(', ')[0]})
        this.UPDATA_SERCH_FROM(Object.assign({}, from))
        this.UPDATA_MAP_CONFIG({
          lat: _info.lat,
          lng: _info.lng,
          isDefault: true,
          flag: true
        })
        this.search(from)
      } else {
        this.searchs(_info)
      }
    },
    search (_info) {
      const __info = Object.assign({}, {type: this.type}, _info)
      this.$router.push({
        path: this.addressStitching(__info)
        // query: __info
      })
    },
    addressStitching (_info = {}) {
      return `/map/${_info.type ? 'buy' : 'rent'}/ebuy-${_info.keyWord ? _info.keyWord : ''}/ebuy-${_info.stateId ? _info.stateId : ''}/ebuy-${_info.cityId ? _info.cityId : ''}/ebuy-${_info.cityName ? _info.cityName : ''}/ebuy-${_info.latitude ? _info.latitude : ''}/ebuy-${_info.longitude ? _info.longitude : ''}`
    },
    keywordSearch () {
      if (this.isMap) {
        // console.log('开始搜索')
        // console.log(Object.assign({}, {keyWord: this.queryWord}))
        // 更新历史记录
        this.UPDATA_SEARCH_HISTORY({
          xtype: -2,
          type: 0,
          name: this.queryWord.replace(/\//g, '\\'),
          id: parseInt(Math.random() * 1000000000),
          lat: this.mapConfig.lat || this.mapConfig.xlat,
          lng: this.mapConfig.lng || this.mapConfig.xlng
        })
        this.UPDATA_MAP_CONFIG({isDefault: false, isMapSize: 11, isSearch: false})
        this.UPDATA_SERCH_FROM(Object.assign({}, {keyWord: this.queryWord}))
        this.search(Object.assign({}, {keyWord: this.queryWord}))
      } else {
        this.searchs({city: this.queryWord})
      }
    },
    // 搜索
    // remoteMethod (query, _cb) {
    //   const _query = query.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9,])/g, ' ')
    //   this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: _query, pageNum: 1, pageSize: 100 }})
    //     .then(res => {
    //       if (res.data.success) {
    //         // console.log()
    //         _cb(res.data.data)
    //       }
    //       console.log(res)
    //     })
    // }
    // 搜索
    remoteMethod (query) {
      if (!query) {
        let cloneHistoryArray = deepClone(this.SearchHistory).reverse().slice(0, 4)
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
      // if (!isNaN(_query) && _query.length <= 2) return
      if (_query.length <= 2) return
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
    }
  }
}
</script>
