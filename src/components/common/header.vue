<style lang="scss" scoped>
@media screen and (min-width: 1300px) {
  .header-content {
    padding: 0 10%;
    width: 100%;
  }
}
.el-header{
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0px 5px #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  transition: background-color .5s ease, box-shadow .5s ease
}
.header-container {
  display: flex;
  flex-direction: column;
}
.header-content {
  // width: 72%;
  display: flex;
  height: 100%;
  // padding: 0 19%;
  align-items: center;
  // min-width: 1757px;
  align-self: start;
  justify-content: space-between;
}
.imgArc {
  color: #5092ff;
}
.imgArc img{
  border-radius: 50%;
  overflow: hidden;
}
.left-logo{
  display: flex;
  width: 240px;
  justify-content: space-between;
}
/**
* 控制顶部菜单栏透明化
**/
.el-header.bg_opacity_none {
  background-color: transparent;
  box-shadow: none;
  transition: background-color .5s ease, box-shadow .5s ease
}

.logo{
  width: 12%;
  min-width: 140px;
  margin-right: 2%;
  cursor: pointer;
}

.location{
  display: flex;
  align-items: center;
  // padding: 0.2rem 0.5rem;
  // border: 1px solid #4e8dd1;
  border-radius: 1rem;
  white-space: nowrap;
  cursor: pointer;
}

.placeholder{
  flex-grow: 1;
}

.location>div{
  margin-left: 0.2rem;
  white-space: nowrap;
  // color: #4e8dd1;
  color: #444;
}

.menu{
  display: flex;
  align-items: center;
  font-size: 20px;
  height: 100%;
}

.menu>li{
  float: left;
  cursor: pointer;
  color: #666666;
  display: flex;
  align-items: center;
  height: 100%;
}
.menu>li .el-dropdown{
  width: 100%;
  height: 100%;
  line-height: 60px;
}
.menu>li span{
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 14px !important;
}
.el-dropdown-link{
  padding: 0 0.8rem;
}
.menu>li:hover{
  background: #1281fc;
}

.menu>li:hover span{
  color: #fff;
}

.el-dropdown-link{
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}

/deep/ .li-account img{
  width: 2.5em;
}

.li-help img{
  width: 1.5em;
}

/deep/ .router-link-exact-active{
  color: #1281fc;
}
.footer-location {
  position: absolute;
  bottom: -450px;
  height: 450px;
  background-color: #fff;
  padding: 34px 105px;
  min-width: 950px;
  box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
  border-radius:5px;
}
/deep/.header-serch .el-input-group__append {
  background-color: #1281fc;
  border-color: #1281fc;
}
/deep/.header-serch .serarch-icon {
  color: #fff;
  font-size: 1.5em;
}
/deep/.header-serch .header-serchs {
  width: 100%;
}

.hotLabel {
  display: flex;
  flex-direction: column;
}
.hotLabel>h4 {
  font-size: 1em;
  margin: 30px 0 20px 20px;
  font-weight: 400;
}
.hotLabel>.hot-city-label-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 50px;
}
.hotLabel>.hot-city-label-box>.hot-city-item {
  display: flex;
  height: 36px;
  align-items: center;
}
.hotLabel>.hot-city-label-box>.hot-city-item>.name {
  font-weight: 400;
  font-size: 1em;
  display: inline-block;
  flex: 0 0 50px;
}
.hotLabel>.hot-city-label-box>.hot-city-item>.label-value-list {
  display: flex;
  flex: 0 0 calc( 100% - 120px );
}
.hotLabel>.hot-city-label-box>.hot-city-item>.label-value-list>.value-item {
  color: #2085E6;
  font-size: 1em;
  flex: 0 0 200px;
  cursor: pointer;
}
.historyLabel {
  margin-right: 20px;
}
.bigTit{
  border-bottom: 1px solid rgba(224,224,224,1);
}
.bigTop{
  border-top: 1px solid rgba(224,224,224,1);
}
.link-hover {
  padding: 0 !important;
  /deep/ a {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
/deep/ .el-dropdown span {
  white-space: nowrap;
}
.link-hover:hover{
  background: rgba(18,129,252,1) !important;
  span{
    color: #fff;
  }
  a{
    color: #fff!important;
  }
}
.me-info {
  font-size: 14px;
  min-width: 116px;
  /deep/ .el-badge{
    vertical-align: super;
  }
  /deep/ .el-dropdown{
    vertical-align: middle;
  }
}
.me-info .imgArc {
  border: 1px solid #5092ff;
  border-radius: 20px;
  color: #5092ff;
  font-size: 14px;
  padding: 8px 15px;
  cursor: pointer;
}
.me-info .imgArcs {
  cursor: pointer;
  height: 50px;
  width: 50px;
  padding: 0.4rem;
  /deep/ img {
    width: 100%;
    height: 100%;
  }
}
.txtParent{
  cursor: default !important;
}
.txtParent span{
  color: #444;
  font-weight: bold;
  cursor: default !important;
}
.spellNotice{
  font-size: 24px;
  color: #666;
  font-weight: 400;
}
// .spellNotice:hover{
//   color: #1281fc;
//   font-weight: bold;
// }
.noticeBox{
  display: inline-block;
  margin-right: 1rem;
  height: 60px;
  line-height: 60px;
  &:hover{
    background: #1281fc;
    .spellNotice{
      color: #fff;
    }
  }
}
.noticeBox{
  /deep/ .el-badge__content{
    top: 12px!important;
    right: 6px!important;
  }
}
.currTitle {
  background: #1281fc;
  color: #fff;
}
</style>

<template>
  <el-header :class="{'header-container': true, 'bg_opacity_none': bg_opacity_none}">
    <div class="header-content">
      <div class="left-logo">
        <img class="logo" src="/static/img/common/header/logo.png" @click="pageJump('/index')" />
      </div>
      <ul class="menu">
        <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="($route.name === 'map' && $route.params.type === 'buy') ? 'currTitle' : '' ">
              Buy
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px">
              <el-dropdown-item class="link-hover">
                <router-link to="/map/buy">
                  <span>Find Homes for Sale</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a href="javascript:;" @click="SwitchCategoriesChange(1)">
                  <span>FAQ of buying a home</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="$route.name === 'release for sale' ? 'currTitle' : ''">
              Sell
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px">
              <el-dropdown-item class="link-hover">
                <router-link to="/release/sale">
                  <span>List a Home for Sale</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a href="javascript:;" @click="SwitchCategoriesChange(2)">
                  <span>FAQ of selling a home</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="($route.name === 'map' && $route.params.type === 'rent') ? 'currTitle' : ''">
              <!-- <router-link to="/release/rentOut"> -->
                Rent
              <!-- </router-link> -->
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px;">
              <el-dropdown-item class="link-hover">
                <router-link to="/release/rentOut">
                  <span>
                    <!-- <i class="iconfont icon-nav_list"></i> -->
                    List your Rental</span>
                </router-link>
              </el-dropdown-item>
              <!-- <el-dropdown-item class="link-hover bigTit"> -->
              <el-dropdown-item class="link-hover">
                <router-link to="/map/rent">
                  <span>
                    <!-- <i class="iconfont icon-nav_map1"></i> -->
                    Find Rental Properties</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a href="javascript:;" @click="SwitchCategoriesChange(3)">
                  <span>FAQ of renting a home</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <!-- <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="($route.name === 'mortgage-calculator') ? 'currTitle' : ''">
              Loan
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px;">
              <el-dropdown-item class="link-hover">
                <router-link to="/help-center/help-home/calculator/mortgage-calculator">
                  <span>Mortgage Calculator</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li> -->

        <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="currClass === 'Wish' ? 'currTitle' : ''">
              Wish List
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px">
              <el-dropdown-item class="link-hover">
                <router-link to="/release/rentIn">
                  <span>Post a Rental Request</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link to="/release/buy">
                  <span>Post a Purchase Request</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link to="/requestList/rentRequest">
                  <span>Browse Rental Requests</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link to="/requestList/buyRequestSft">
                  <span>Browse Purchase Requests</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a href="javascript:;" @click="SwitchCategoriesChange(4)">
                  <span>FAQ of Wish List</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <li>
          <el-dropdown placement="bottom" :show-timeout=50 :hide-timeout=250>
            <span class="el-dropdown-link" :class="($route.name === 'sericeList' || $route.name === 'serviceDetail') ? 'currTitle' : ''">
                Service
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px">
              <el-dropdown-item class="link-hover">
                <router-link to="/service/list">
                  <span>
                  Service Providers</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a href="javascript:;" @click="SwitchCategoriesChange(5)">
                  <span>FAQ of service</span>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="li-help">
          <el-dropdown placement="bottom" :show-timeout="50" :hide-timeout="250">
            <span class="el-dropdown-link" :class="currClass === 'More' ? 'currTitle' : ''">
              More
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top: 5px">
              <el-dropdown-item class="link-hover" @click.native="pageJump('/help-center')">
                <router-link to="/help-center">
                  <span>Help Center</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link to="/QACommunity">
                  <span>FAQs</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link :to="{name: 'consultation-home-page'}" style="color:#666;">
                  <span>Information</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a target="_blank" href="https://www.ebuyhouse.com/blog">Blog</a>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <router-link to="/sft/contactus">
                  <span>Contact Us</span>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item class="link-hover">
                <a target="_blank" href="https://www.youtube.com/embed/videoseries?list=PL4PI3wncu1n2tI7qQAkK9VhgF6dRsHHEM">How To Videos</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="me-info">
        <!-- 消息提示 -->
        <el-dropdown v-if="this.signInState && notifyMessageArray.length !== 0" placement="bottom" :show-timeout="50" :hide-timeout="250">
          <div class="noticeBox el-dropdown-link"  @mouseenter="currTit('')">
            <el-badge :value="notifyMessageArray.length" :max="99" class="item">
              <i class="iconfont icon-nav_message spellNotice"></i>
            </el-badge>
          </div>
          <el-dropdown-menu slot="dropdown" v-if="notifyMessageArray && notifyMessageArray.length > 0" style="margin-top: 5px">
            <el-dropdown-item class="link-hover bigTit" v-for="(item, index) in notifyMessageArray.slice(0,2)" :key="index">
              <!-- msgType=1为系统消息 -->
              <router-link class="bigTit" style="color:#666;" v-if="item && item.msgType === 1" @click.native="jumpMsg('/userCenter/message/notification/list', item)" to="/userCenter/message/notification/list">
                <p><span>Notifications</span></p>
                <p>System Info: see msg</p>
                <!-- <p>{{item}}</p> -->
              </router-link>
              <!-- msgType=2为offer消息 -->
              <router-link class="bigTit" style="color:#666;" v-if="item && item.msgType === 2" @click.native="jumpMsg('/userCenter/message/offer/sale', item)" to="/userCenter/message/offer/sale">
                <p><span style="font-weight: bold;">Bids & Offers</span></p>
                <p><span>{{item.agreement.title}} : {{item.agreement.houseAddress}}</span></p>
                <!-- <p><span>{{item}}</span></p> -->
              </router-link>
              <!-- msgType=3为购买列表消息 -->
              <router-link class="bigTit" style="color:#666;" v-if="item && item.msgType === 3" @click.native="jumpMsg('/userCenter/message/recommend/buy', item)" to="/userCenter/message/recommend/buy">
                <p><span>Transaction</span></p>
                <p><span>Transaction Info: see msg</span></p>
              </router-link>
              <!-- msgType=4为即时通讯消息 -->
              <router-link class="bigTit" style="color:#666;" v-if="item && item.msgType === 4" @click.native="jumpMsg('/userCenter/message/msg', item)" to="/userCenter/message/msg">
                <p><span>Messages</span></p>
                <p><span>Messages Info: see news</span></p>
              </router-link>
            </el-dropdown-item>
            <!-- 超过三条展示More -->
            <el-dropdown-item class="link-hover bigTit">
              <router-link class="bigTit" style="color:#666;" to="/userCenter/message/notification/list">
                <p style="text-align: center;"><span>More</span></p>
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 消息提示 -->
        <el-dropdown placement="bottom" :show-timeout="50" :hide-timeout="250">
          <span :class="['el-dropdown-link', this.signInState ? 'imgArcs' : 'imgArc']" v-html="signInBtnContent"></span>
          <el-dropdown-menu slot="dropdown" style="margin-top: 9px; width: auto;">
            <!-- if (!this.signInState) { -->
            <el-dropdown-item class="link-hover" v-if="!this.signInState" @click.native="showSignInLayer"><span style="padding:0 32px;">Sign in</span></el-dropdown-item>
            <el-dropdown-item class="link-hover" v-if="!this.signInState" @click.native="showRegisterLayer"><span style="padding:0 32px;">Register</span></el-dropdown-item>
            <!-- } -->
            <!-- if (this.signInState) { -->
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/account">
                <span>My Account</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/message">
                <span>My Ebuyhouse Center</span>
              </router-link>
            </el-dropdown-item>
            <!-- <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/signature-file">
                <span>Signature file</span>
              </router-link>
            </el-dropdown-item> -->
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/listing">
                <span>My Listings</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/request">
                <span>My Requests</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/contract">
                <span>My Contracts</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/service/available">
                <span>My Service</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/collection">
                <span>My Favorites</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="this.signInState" class="link-hover">
              <router-link to="/userCenter/history">
                <span>Recently Viewed Homes</span>
              </router-link>
            </el-dropdown-item >
            <el-dropdown-item class="link-hover" v-if="this.signInState" @click.native="signOut"><span style="margin-left: 1.5rem">Sign out</span></el-dropdown-item>
            <!-- } -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <transition name="el-fade-in">
      <div class="footer-location" v-show="addressShow" v-click-outside="clickChange">
        <section class="header-serch">
          <el-autocomplete
            class="header-serchs"
            v-model="serchCityName"
            :fetch-suggestions="remoteMethod"
            :placeholder="locationConfig.city"
            @select="openSearch"
            :popper-append-to-body="false"
            clearable>
            <el-button slot="append" icon="el-icon-search serarch-icon" @click="keywordSearch"></el-button>
            <template slot-scope="{ item }">
              <div class="city">{{ item.cityAscii + ' ' + item.stateId }}</div>
            </template>
          </el-autocomplete>
        </section>
        <section class="hotLabel">
          <h4>Hot Cities:</h4>
          <ul class="hot-city-label-box">
            <li class="hot-city-item" v-for="(item, index) in hotCityList" :key="index" :style="{flex: `0 0 ${item.value.length !== 1 ? '100%' : 'calc( 100% / 3 )'}`}">
              <span class="name">{{item.label}}:</span>
              <ul class="label-value-list">
                <li class="value-item" v-for="(citem, cindex) in item.value" :key="`${index}-${cindex}`" @click="openSearch(citem)">{{citem.city}}</li>
              </ul>
            </li>
          </ul>
        </section>
        <section class="hotLabel" v-if="historyList.length !== 0">
          <h4>Search History:</h4>
          <ul class="hot-city-label-box">
            <li class="hot-city-item historyLabel" v-for="(item, index) in historyList" :key="index">
              <el-tag closable @close="closeHistoryListChange(item)" type="info">
                {{item.city}}
              </el-tag>
            </li>
          </ul>
        </section>
      </div>
    </transition>
  </el-header>
</template>

<script>
// import { getToken } from '@/utils/session'
import { mapMutations, mapGetters } from 'vuex'
import { deepClone } from '@/utils'
let uniqueKey = 1
export default {
  data () {
    return {
      'currClass': '',
      'signInBtnContent': 'Sign in / Register',
      'locationConfig': {
        'city': 'Las Vegas'
      },
      'addressShow': false,
      'hotCityList': [],
      'serchCityName': null,
      'historyList': [],
      'KeyWordCityList': [],
      'headUrl': '/static/img/common/header/avatar.png',
      'BuyList': [],
      'SellList': [],
      'RentList': [],
      'WishList': [],
      'ServerList': [],
      'SFTList': [],
      'InformationList': [],
      'TutorialList': []
    }
  },
  'props': {
    bg_opacity_none: {
      default: false,
      type: Boolean
    }
  },
  'methods': {
    currTit (_val) {
      this.currClass = _val
    },
    ...mapMutations({
      UPDATA_SERCH_FROM: 'UPDATA_SERCH_FROM',
      UPDATA_MAP_CONFIG: 'UPDATA_MAP_CONFIG',
      UPDATA_NOTIFY_MESSAGE_ARRAY: 'UPDATA_NOTIFY_MESSAGE_ARRAY',
      updataGuidePublic: 'UPDATA_GUIDE_PUBLIC'
    }),
    jumpMsg (_url, _info) {
      let cloneNotifyArray = deepClone(this.notifyMessageArray)
      console.log(cloneNotifyArray, _info)
      console.log(cloneNotifyArray.indexOf(_info))
      cloneNotifyArray.splice(cloneNotifyArray.indexOf(_info), 1)
      console.log(cloneNotifyArray)
      this.UPDATA_NOTIFY_MESSAGE_ARRAY(cloneNotifyArray)
      // debugger
      // this.$indexDB.deleteIndData(this.$ebuyhouseDB.db, 'notify', this.notifyMessageArray, _ind)
      this.$indexDB.putData(this.$ebuyhouseDB.db, 'notify', {id: 'notifyMessageArray' + this.GlobalUserInfo.id, data: cloneNotifyArray})
      // this.$router.push({'path': _url})
    },
    getUniqueKey () {
      return uniqueKey++
    },
    showSignInLayer () {
      this.$emit('toggleSignInLayer', true)
    },
    showRegisterLayer () {
      this.$emit('toggleRegisterLayer', true)
    },
    pageJump (_path, _params) {
      this.$router.push({'path': _path, query: _params})
    },
    signOut () {
      this.$store.commit('signOut')
    },
    enterChange (e) {
      console.log(e)
      console.log('按了回车')
    },
    // 获取定位信息
    fetchIpPosition () {
      const _this = this
      _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, isDefault: false, isMapSize: 4, isSearch: false})
      _this.$axios.get(`${_this.LJJ_FETCH_LOCAL_ADRESS}`)
        .then(res => {
          if (res.data.success) {
            const locationConfigObject = JSON.parse(res.data.data)
            _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, lat: locationConfigObject.latitude, lng: locationConfigObject.longitude, isDefault: true, isMapSize: 11, isSearch: false})
            // console.log(res)
            // _this.locationConfig = locationConfigObject
            // sessionStorage.setItem('locationConfig', locationConfigObject)
            _this.fetchCity({cityAscii: locationConfigObject.city, stateId: locationConfigObject.region_code})
          } else {
            _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, isDefault: false, isMapSize: 4, isSearch: false})
          }
        })
        .catch(err => {
          console.log(err)
          _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, isDefault: false, isMapSize: 4, isSearch: false})
        })
    },
    // 获取城市信息
    fetchCity (_opt) {
      const _this = this
      _this.$axios.get(`${this.ljj_path}region/city-by/name`, {params: _opt})
        .then(res => {
          if (res.data.success) {
            let city = res.data.data
            city['city'] = city.cityAscii
            _this.locationConfig = city
            sessionStorage.setItem('locationConfig', JSON.stringify(city))
            console.log('默认')
            console.log({latitude: city.lat, longitude: city.lng})
            // 设置搜索参数 默认加载的城市
            _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, lat: city.lat, lng: city.lng, isDefault: true, isMapSize: 11, isSearch: false})
            _this.UPDATA_SERCH_FROM(Object.assign({}, {cityId: city.id, keyWord: city.city || city.cityAscii, stateId: city.stateId, pauseOnceCityID: true}))
            // _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, lat: city.lat, lng: city.lng, isDefault: true, isMapSize: 11, isSearch: false})
          } else {
            _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, isDefault: false, isMapSize: 4, isSearch: false})
          }
        })
        .catch(err => {
          console.log(err)
          _this.UPDATA_MAP_CONFIG({xlat: 40.146317499873184, xlng: -99.12443711903546, isDefault: false, isMapSize: 4, isSearch: false})
        })
    },
    // 搜索
    fetchSerchParams () {
      // /region/hot/ list
      const _this = this
      _this.$axios.get(`${this.ljj_path}/region/hot/list`)
        .then(res => {
          if (res.data.success) {
            _this.hotCityList = _this.formatSearchData(res.data.data.rows)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatSearchData (_info) {
      let AllArray = []
      let ObjectArrays = []
      _info.map((item, index) => {
        if (!AllArray.includes(item.stateId)) AllArray.push(item.stateId)
        ObjectArrays.push(index)
        return item
      }).map(item => {
        AllArray.map((citem, cindex) => {
          if (item.stateId === citem) {
            if (ObjectArrays[cindex].value) {
              ObjectArrays.splice(cindex, 1, {label: citem, value: [...ObjectArrays[cindex].value, item]})
            } else {
              ObjectArrays.splice(cindex, 1, {label: citem, value: [item]})
            }
          }
        })
      })
      return ObjectArrays.filter(fs => fs instanceof Object)
    },
    timeOutShow () {
      const _this = this
      setTimeout(function () {
        _this.addressShow = true
      }, 100)
    },
    clickChange () {
      this.addressShow = false
    },
    openSearch (_info) {
      console.log(_info)
      this.locationConfig.city = _info.city || _info.cityAscii
      this.serchCityName = _info.city || _info.cityAscii
      this.UPDATA_SERCH_FROM({
        keyWord: this.serchCityName,
        stateId: _info.stateId,
        cityId: _info.id,
        pauseOnceCityID: true,
        cityName: this.serchCityName
      })
      this.UPDATA_MAP_CONFIG({
        city: _info.city || _info.cityAscii,
        lat: _info.lat,
        lng: _info.lng,
        isDefault: true,
        flag: true
      })
      this.search(_info)
      const xhistory = sessionStorage.getItem('locationHistoryList')
      if (xhistory) {
        if (!this.checkHistoryDetails(JSON.parse(xhistory), _info)) {
          sessionStorage.setItem('locationHistoryList', JSON.stringify([_info, ...JSON.parse(xhistory)]))
        }
      } else {
        sessionStorage.setItem('locationHistoryList', JSON.stringify([_info]))
      }
      this.historyList = JSON.parse(sessionStorage.getItem('locationHistoryList'))
      console.log('查看历史记录：')
      console.log(this.historyList)
    },
    search () {
      // this.$router.push({
      //   name: 'map&buying',
      //   query: {ebuyhouse: JSON.stringify({type: true})}
      // })
      this.clickChange()
    },
    keywordSearch () {
      const _this = this
      setTimeout(() => {
        _this.UPDATA_MAP_CONFIG({isDefault: false, isMapSize: 11, isSearch: false})
        // _this.UPDATA_SERCH_FROM(Object.assign({}, {keyWord: _this.serchCityName, cityName: _this.serchCityName}))
        _this.search()
        _this.$router.push({
          path: this.addressStitching({type: true, keyWord: _this.serchCityName.replace(/\//g, '\\')})
          // query: {type: true, keyWord: _this.serchCityName}
        })
      }, 100)
    },
    addressStitching (_info = {}) {
      return `/map/${_info.type ? 'buy' : 'rent'}/ebuy-${_info.keyWord ? _info.keyWord : ''}/ebuy-${_info.stateId ? _info.stateId : ''}/ebuy-${_info.cityId ? _info.cityId : ''}/ebuy-${_info.cityName ? _info.cityName : ''}/ebuy-${_info.latitude ? _info.latitude : ''}/ebuy-${_info.longitude ? _info.longitude : ''}`
    },
    closeHistoryListChange (_info) {
      const xh = JSON.parse(sessionStorage.getItem('locationHistoryList'))
      if (this.checkHistoryDetails(xh, _info)) {
        xh.splice(this.checkHistoryDetails(xh, _info), 1)
        sessionStorage.setItem('locationHistoryList', JSON.stringify(xh))
        this.historyList = xh
      }
    },
    checkHistoryDetails (_infoList, _info) {
      return _infoList.filter(item => {
        return item.city === _info.city
      })[0]
    },
    SwitchCategoriesChange (_cid) {
      this.$router.push({
        path: '/help-center/index/' + _cid
      })
      // if (_cid) {
      //   this.updataGuidePublic(Object.assign({}, this.guidePublic, {categoryId: _cid, fkCategoryId: _cid}))
      //   this.$router.push({
      //     name: 'helpCenterIndex'
      //   })
      // } else {
      //   this.updataGuidePublic(Object.assign({}, this.guidePublic, {categoryId: null, fkCategoryId: null}))
      //   this.$router.push({
      //     name: 'helpCenterIndex'
      //   })
      // }
    },
    // 搜索
    remoteMethod (query, _cb) {
      const _query = query.replace(/((?=[\x21-\x7e]+)[^A-Za-z0-9,])/g, ' ')
      this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: _query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            // console.log()
            _cb(res.data.data)
            this.KeyWordCityList = res.data.data
          }
          console.log(res)
        })
    },
    async fetchSearchList (type) {
      let res = await this.$axios.get(`${this.ljj_path}/guide/header-list`, {params: {fkCategoryId: type, pageSize: 20}})
      return res.data.data.rows
    },
    async fetchSearchTypeList () {
      let res = await this.$axios.get(`${this.ljj_path}news-category/list/str`, {params: {pageSize: 6}})
      return res.data.data.rows
    },
    async initList () {
      // this.BuyList = await this.fetchSearchList('73345648829005824')
      // this.SellList = await this.fetchSearchList('73345761261518848')
      // this.RentList = await this.fetchSearchList('73345837149061120')
      // this.WishList = await this.fetchSearchList('73379433540878336')
      // this.ServerList = await this.fetchSearchList('73380214704832512')
      // this.SFTList = await this.fetchSearchList('73380335899246592')
      let res = await this.$axios.get(`${this.ljj_path}guide/header-list?fkCategoryIds=1&fkCategoryIds=2&fkCategoryIds=3&fkCategoryIds=4&fkCategoryIds=5&fkCategoryIds=6&fkCategoryIds=7&fkCategoryIds=8`)

      // console.log(res)
      const _res = res.data.data
      this.BuyList = _res['4']
      this.SellList = _res['3']
      this.RentList = _res['2']
      this.WishList = _res['1']
      this.ServerList = _res['5']
      this.SFTList = [..._res['6'], ..._res['7']]
      this.InformationList = await this.fetchSearchTypeList()
      this.TutorialList = _res['8']
    }
  },
  'computed': {
    ...mapGetters({
      signInState: 'signInState',
      triggerSignInEvent: 'triggerSignInEvent',
      mapConfig: 'mapConfig',
      notifyMessageArray: 'notifyMessageArray',
      GlobalUserInfo: 'GlobalUserInfo',
      guidePublic: 'guidePublic'
    })
  },
  'watch': {
    signInState: {
      immediate: true,
      handler () {
        if (this.$store.state.signInState) {
          this.signInBtnContent = `<img style="border-radius: 50%;" src=${this.headUrl} />`
        } else {
          this.signInBtnContent = 'Sign in / Register'
        }
      }
    },
    triggerSignInEvent () {
      this.$emit('toggleSignInLayer', true)
    },
    GlobalUserInfo: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          this.headUrl = _new.headUrl
          if (this.$store.state.signInState) {
            this.signInBtnContent = `<img style="border-radius: 50%;" src=${this.headUrl} />`
          } else {
            this.signInBtnContent = 'Sign in / Register'
          }
        }
      },
      deep: true,
      immediate: true
    },
    mapConfig: {
      handler (_new, _old) {
        // this.locationConfig
        // 继承定位缓存数据
        Object.assign(this.locationConfig, _new)
      },
      deep: true,
      immediate: true
    }
  },
  'created' () {
    console.log('120')
    console.log(this.notifyMessageArray)
    console.log('121')
    // 获取定位
    // 判断是否存在
    // console.log(sessionStorage.getItem('locationConfig'))
    if (!sessionStorage.getItem('locationConfig')) {
      this.fetchIpPosition()
    }
    // if (getToken()) {
    //   this.$store.commit('signIn')
    // } else {
    //   if (this.$route.meta.requireAuth) {
    //     // this.$store.commit('signOut', true)
    //     this.$router.push({'path': '/index'})
    //   } else {
    //     // this.$store.commit('signOut', false)
    //   }
    // }
    this.fetchSerchParams()
  },
  mounted () {
    // this.initList()
    if (sessionStorage.getItem('locationHistoryList')) {
      this.historyList = JSON.parse(sessionStorage.getItem('locationHistoryList'))
      console.log(this.historyList)
    }
  }
}
</script>
