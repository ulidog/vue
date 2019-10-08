<style lang="scss" scoped>
.search-part {
  position: absolute;
  top: 70%;
  left: 33%;
  width: 34%;
  height: 14%;
  z-index: 9;
  align-items: center;
  transition: all .3s linear;
  display: flex;
}
@media screen and (max-width: 751px) {
  .search-part {
    position: absolute;
    top: 64%;
    left: 10%;
    width: 80%;
    height: 14%;
    z-index: 9;
    align-items: center;
    transition: all .3s linear;
    display: flex;
  }
}
.search-part.action {
  transition: all .3s linear;
  height: 34%;
  top: 41%;
  background: #fff;
}
.serch-box{
  width: 100%;
  height: 5rem;
  z-index: 9;
}
.header-serchs {
  width: 100%;
  height: 100%;
  /deep/ .el-input {
    height: 100%;
    input {
      height: 100%;
      border-radius: 2.8rem;
      font-size: 1.13rem;
      color: rgba(102, 102, 102, 1);
      border: none;
      padding-right: 80px;
      background: rgba(255,255,255,0.3);
      &::placeholder {
        color: rgba(102, 102, 102, 1);
      }
    }
    .el-input-group__append {
      width: 9.5%;
      height: 100%;
      padding: 0;
      background-color: transparent;
      position: absolute;
      border: none;
      top: 0;
      right: 0;
      button {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        background-image: url('/static/img/index/search_icon.png');
        background-repeat: no-repeat;
        background-size: 37% auto;
        background-position: 50% 50%;
        margin: 0px;
        padding: 0;
        &:active{
          background-size: 55% auto;
        }
      }
    }
  }
  /deep/ .city {
    a {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .local {
    i {
      margin-right: 5px;
      color: #1281fc;
    }
  }
  /deep/ .history {
    display: flex;
    justify-content: space-between;
    &:first-child {
      border-top: 1px solid #E0E0E0;
    }
    i {
      margin-right: 5px;
      color: #1281fc;
    }
    i.close {
      color: #444;
    }
  }
}

.tab-box{
  height: 45%;
  display: flex;
  margin-bottom: 3.5%;
}

.tab-box div{
  height: 2.2rem;
  margin-right: 1.9rem;
  // overflow: hidden;
  line-height: 2.2rem;
  width: 5.625rem;
  text-align: center;
  border-radius: 1.4rem;
  cursor: pointer;
  font-size: 1.125rem;
  color: rgba(102, 102, 102, 1);
  position: relative;
  background-color: rgba(255,255,255,0.5);
}

.tab-box div:hover{
  color: #1281fc;
}

.tab-box div.active{
  color: rgba(255, 255, 255, 1);
  background-color: rgba(18, 129, 252, 1);
}

.tab-box div.active:hover{
  color: #ffffff;
}

.tab-box div.active::before{
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 0.5rem solid transparent;
  border-top-color: rgba(18, 129, 252, 1);
  position: absolute;
  left: 50%;
  top: 2.2rem;
  transform: translateX(-50%);
}

// .search-box{
//   height: 55%;
//   background-color: rgba(255,255,255,0.5);
//   border-radius: 1.5rem;
// }

// .search-box input{
//   width: 90%;
//   height: 100%;
//   float: left;
//   padding-left: 1rem;
//   padding-right: 1rem;
//   border: 1px solid transparent;
//   border-bottom-left-radius: 0.5rem;
//   border-top-left-radius: 0;
//   outline: none;
//   font-size: 1.2rem;
//   color: #999999;
// }

// .search-box input:focus{
//   border-color: #3e95d6;
// }

// /deep/ .search-box .WishListButton{
//   width: 9.5%;
//   height: 100%;
//   float: right;
//   border-radius: 0.5rem;
//   background-image: url(/static/img/index/sousuo.png);
//   background-repeat: no-repeat;
//   background-size: 88% auto;
//   background-position: 50% 50%;
// }

// .search-box button:active{
//   background-size: 55% auto;
// }
.search-box {
  position: relative;
  .search-box-content {
    position: relative;
    display: flex;
    flex-direction: column;
    .custom-input {
      background: rgb(255, 255, 255);
      opacity: 0.8;
      height: 46px;
      border-radius: 23px;
      display: flex;
      position: relative;
      align-items: center;
      border: 1px solid #fff;
      &.focus {
        border: 1px solid #1281FC;
      }
      >input {
        flex: 1;
        border-radius: 23px;
        outline: none;
        border: none;
        text-indent: 1em;
        font-size: 18px;
        &::placeholder {
          color: #999;
        }
      }
      >i {
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 26px;
        color: #1281FC;
      }
      i.close {
        // font-size: 25px;
        right: 40px;
      }
    }
    .downdrap-list {
      position: absolute;
      z-index: 999;
      top: 50px;
      left: 0;
      flex: 1;
      background-color: #fff;
      width: 100%;
      box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
      border-radius:5px 5px 10px 10px;
      overflow: hidden;
      .remote-box {
        // padding: 10px;
        max-height: 260px;
        padding: 10px 0;
        overflow-y: scroll;
        transition: all .5s ease;
        &.isMinClass {
          height: 275px;
          transition: all .5s ease;
        }
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 0px;
          -webkit-box-shadow: inset 0 0 5px #1281FC;
          background: #1281FC;
        }
        &::-webkit-scrollbar-track{
          // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
          border-radius: 0;
          background: trnasparent;
        }
        li {
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #444;
          &:hover {
            background: #1281FC;
            color: #fff;
            cursor: pointer;
            i {
              color: #fff !important;
            }
            span {
              color: #fff !important;
            }
            a {
              color: #fff !important;
            }
          }
        }
        .city {
          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
          }
        }
        .local {
          i {
            margin-right: 5px;
            color: #1281fc;
          }
        }
        .history {
          display: flex;
          justify-content: space-between;
          &:first-child {
            border-top: 1px solid #E0E0E0;
          }
          i {
            margin-right: 5px;
            color: #1281fc;
          }
          i.close {
            color: #444;
          }
        }
      }
    }
  }
}

</style>

<template>
  <div class="search-part">
    <section class="serch-box">
      <div class="tab-box" ref="tabBox">
        <div class="active" @click="switchQueryType('buy', 0)">Buy</div>
        <div @click="switchQueryType('rent', 1)">Rent</div>
        <div @click="switchQueryType('Wish List', 2)">Wish List</div>
      </div>
      <div class="search-box">
        <section class="search-box-content">
          <section :class="['custom-input', (showList || showCityList) ? 'focus' : '' ]">
            <input v-model="queryWord" :placeholder="placeholder" type="text" @focus="queryFocusChange" @blur="queryBlurChange" @keydown.enter="keywordSearch">
            <i class="iconfont icon-cancle close" @click="resetKeyWordChange" v-show="queryWord"></i>
            <i class="iconfont icon-search" @click="keywordSearch"></i>
          </section>
          <transition name="el-fade-in-linear">
            <section class="downdrap-list" v-show="showList">
              <ul class="remote-box">
                <!-- <li class="item"></li> -->
                <!-- 搜索历史列表 -->
                <template v-for="item in SearchHistoryArray">
                  <li class="local" @click="openHistory(item)" :key="item.id" v-if="item.type === -1 && RemoteArray.length === 0">
                    <i class="iconfont icon-search-location"></i>
                    {{ item.name}}
                  </li>
                  <li class="history" @click="openHistory(item)" :key="item.id" v-if="item.type === 0 && RemoteArray.length === 0">
                    <span v-if="item.xtype !== 3">
                      <i class="iconfont icon-search_histroy"></i>
                      <!-- <span>{{ item.name}}</span> -->
                      <!-- 在有键入值时 首位就匹配到 -->
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) === 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(0, queryWord.length)}}</span>
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) === 0">{{ item.name.slice(queryWord.length)}}</span>
                      <!-- 在有键入值时 首位以后才匹配到 -->
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) > 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                      <span v-if="queryWord && queryWord.length !== 0 && item.name.toLowerCase().indexOf(queryWord.toLowerCase()) > 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase())), item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase())) + queryWord.length}}</span>
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
                  <li class="city" @click="openSearch(item)" :key="item.id" v-if="item.type === 3">
                    <router-link :to="'/listing/details/' + item.id">
                      <!-- {{ item.name}} -->
                      <span v-if="queryWord && queryWord.length !== 0">{{ item.name.slice(0, item.name.toLowerCase().indexOf(queryWord.toLowerCase()))}}</span>
                      <span v-if="queryWord && queryWord.length !== 0" style="color:#ff4146;font-weight:bold;">{{ item.name.slice(item.name.toLowerCase().indexOf(queryWord.toLowerCase()), item.name.toLowerCase().indexOf(queryWord.toLowerCase()) + queryWord.length)}}</span>
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
      queryType: 0,
      queryWord: null, // 检索关键词
      placeholder: 'Enter City or Zip Code',
      placeholderArr: [
        // 'Enter a City, Address or Zip Code',
        'Enter a City or Zip Code',
        'Enter a City or Zip Code',
        'Enter a City'
      ],
      isMap: true,
      type: true,
      SearchHistoryArray: [],
      RemoteArray: [],
      wishListArray: [],
      showList: false, // buy,rent下拉列表
      showCityList: false // wishlist下拉列表
    }
  },
  created () {
    // console.log('0000000000000000')
    // console.log(this.SearchHistoryArray)
    // console.log('1111111111111111')
  },
  computed: {
    ...mapGetters({
      SearchHistory: 'SearchHistory',
      mapConfig: 'mapConfig'
    })
  },
  filters: {
    filterKeyLight (text) {
      if (!this.queryWord) return text
      const result = text.replace(new RegExp(this.queryWord, 'g'), `<i style='color:red'>${this.queryWord}</i>`)
      return result
    }
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
  methods: {
    ...mapMutations({
      UPDATA_SERCH_FROM: 'UPDATA_SERCH_FROM',
      UPDATA_MAP_CONFIG: 'UPDATA_MAP_CONFIG',
      UPDATA_SEARCH_HISTORY: 'UPDATA_SEARCH_HISTORY'
    }),
    switchQueryType (_type, _index) {
      this.$emit('searchIndex', _index)
      this.$refs.tabBox.querySelector('.active').classList.remove('active')
      this.$refs.tabBox.children[_index].classList.add('active')
      this.placeholder = this.placeholderArr[_index]
      this.queryType = _index
      if (_index === 2) {
        this.isMap = false
      } else {
        this.isMap = true
        this.type = _index === 0
      }
    },
    searchs (_info = {}) {
      // this.UPDATA_SERCH_FROM({keyWord: this.queryWord})
      this.$router.push({
        name: 'map&buying',
        query: {type: this.queryType === 0 ? true : this.queryType !== 1, keyWord: this.queryWord}
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
    openSearch (_info) {
      const newHistoryObject = Object.assign({}, _info, {xtype: _info.type, type: 0})
      // 更新历史记录 去重操作
      // console.log(this.SearchHistory, newHistoryObject)
      // console.log(this.InquireArrayObject(this.SearchHistory, newHistoryObject))
      if (!this.InquireArrayObject('id', this.SearchHistory, newHistoryObject)) {
        console.log(newHistoryObject)
        this.UPDATA_SEARCH_HISTORY(newHistoryObject)
      }
      if (_info.type !== 3) {
        if (this.isMap) {
          const from = Object.assign({}, {keyWord: _info.name.split(', ')[0], cityId: _info.type !== 2 ? _info.id : null, cityName: _info.name.split(', ')[0]})
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
        console.log('开始搜索')
        console.log(Object.assign({}, {keyWord: this.queryWord.replace(/\//g, '\\')}))
        // 更新历史记录
        this.UPDATA_SEARCH_HISTORY({
          xtype: -2,
          type: 0,
          name: this.queryWord.replace(/\//g, '\\'),
          id: parseInt(Math.random() * 1000000000),
          lat: this.mapConfig.lat || this.mapConfig.xlat,
          lng: this.mapConfig.lng || this.mapConfig.xlng
        })
        // alert(1)
        // this.UPDATA_MAP_CONFIG({isDefault: false, isMapSize: 4, isSearch: true})
        this.UPDATA_MAP_CONFIG({isDefault: false, isMapSize: 11, isSearch: false})
        this.UPDATA_SERCH_FROM(Object.assign({}, {keyWord: this.queryWord.replace(/\//g, '\\')}))
        this.search(Object.assign({}, {keyWord: this.queryWord.replace(/\//g, '\\')}))
      } else {
        // this.searchs({name: this.queryWord.replace(/\//g, '\\')})
        this.$router.push({
          path: '/requestList/buyRequest',
          query: {keyWord: this.queryWord}
        })
      }
    },
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
    resetKeyWordChange () {
      this.queryWord = null
    },
    // 搜索
    remoteMethod (query) {
      // 没有键入关键词
      if (!query) {
        // 显示历史记录，最多显示4条
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
      // document.
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
    },
    queryFocusChange () {
      // alert(this.queryType)
      // queryType: 0-buy, 1-rent, 2-wish list
      // 当选择buy或者rent时
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
    queryBlurChange () {
      // this.showList = false
    },
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
    openWishFilterChange (_info) {
      this.$router.push({
        path: '/requestList/buyRequest',
        query: {keyWord: _info.cityAscii, cityId: _info.id, stateId: _info.stateId, lat: _info.lat, lng: _info.lng}
      })
    }
  },
  mounted () {
    window.document.addEventListener('click', this.isClosePenel)
  },
  destroyed () {
    window.document.removeEventListener('click', this.isClosePenel)
  }
}
</script>
