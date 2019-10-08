<template>
  <section class="economicContainer">
    <header class="goHistory">
      <back-history-router :historyParams="backparams"></back-history-router>
    </header>
    <header class="author-info">
      <section class="left-author-header-img">
        <section class="header-img">
          <img :src="authorInfo.userInfo.headUrl" :alt="authorInfo.userInfo.nickname">
        </section>
        <section class="author-name">
          <span>{{authorInfo.userInfo.firstname}} {{authorInfo.userInfo.lastname}}</span>
          <img
            v-if="authorInfo.userInfo.sex === 1 ? true : false"
            src="/static/img/other/agent_man.png"
            alt="agent_man"
          >
          <img
            v-else-if="authorInfo.userInfo.sex === 2 ? true : false"
            src="/static/img/other/agent_women.png"
            alt="agent_women"
          >
        </section>
        <section class="contact-me">
          <!-- <el-button type="primary" plain @click="instantMessaging">Contact Me</el-button> -->
          <span class="add-friend-btn" @click="addFriendChange" v-if="!isFriend()"><i class="iconfont icon-message_AddFriend"></i> Add Friend</span>
          <span class="delete-friend-btn" @click="deleteFriendChange" v-else><i class="iconfont icon-message_CancelFriends"></i> Cancel Friend</span>
          <span class="contact-btn" @click="instantMessaging"><i class="iconfont icon-message_contact"></i> Contact</span>
        </section>
      </section>
      <section class="right-author-info-bord">
        <section class="header-type">
          <span>● {{ authorInfo.userInfo.type === 1 ? 'Personal' : 'Agent'}}</span>
        </section>
        <ul class="label-box">
          <li class="label">
            <img class="label-name" src="/static/img/other/agent_email.png" alt="agent_email">
            <!-- <span class="label-value"><a :href="'mailto:' + authorInfo.userInfo.email">{{ authorInfo.userInfo.email }}</a></span> -->
            <span class="label-value">{{ authorInfo.userInfo.email }}</span>
          </li>
          <li class="label" v-if="authorInfo.userInfo.phone">
            <img class="label-name" src="/static/img/other/agent_phone.png" alt="agent_phone">
            <!-- <span class="label-value"><a :href="'tel:+' + authorInfo.userInfo.phone">{{ authorInfo.userInfo.phone | telephoneFormat }}</a></span> -->
            <span class="label-value">{{ authorInfo.userInfo.phone | telephoneFormat }}</span>
          </li>
          <li class="label" v-if="authorInfo.userInfo.address">
            <img class="label-name" src="/static/img/other/agent_adress.png" alt="agent_adress">
            <span class="label-value">{{ authorInfo.userInfo.address|formatAddress }}</span>
          </li>
        </ul>
      </section>
    </header>
    <section class="house-info-list">
      <el-tabs v-model="houseTabName" class="house-tab" :before-leave="swithChange">
        <el-tab-pane label="For Sale" name="my-sale">
          <ul class="cardList" v-loading="houseInfoLoading">
            <li class="cardListItem" v-for="item in saleHouseList" :key="item.houseId">
              <router-link
                :to="{ path: '/listing/details/'+item.houseId}"
              >
                <header class="header-img">
                  <img :src="item.imgUrl" :alt="item.street">
                </header>
                <footer class="footer-intro">
                  <h4>
                    <span class="mini">$</span>
                    {{ item.price|priceFormat }}
                  </h4>
                  <section class="intro">
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                      <span>{{ item.bedroom }}</span>
                      <span v-if="item.bedroom !== 'studio'">&nbsp;bds</span>
                    </section>
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                      <span class="padding-5">●</span>
                      <span>{{ item.bathroom }} ba</span>
                    </section>
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                      <span class="padding-5">●</span>
                      <span>{{ item.livingSqft|priceFormat }} sqft</span>
                    </section>
                  </section>
                  <footer class="art-itro">
                    <article>{{ item.street }}</article>
                  </footer>
                </footer>
              </router-link>
            </li>
            <template v-if="saleHouseList.length !== 0 && saleHouseList.length % 4 !== 0">
              <li
                class="cardListItem null"
                v-for="nullIndex in ((Math.ceil(saleHouseList.length / 4) * 4)-saleHouseList.length)"
                :key="nullIndex"
              >
                <img src="/static/img/default/default_05.png" alt>
              </li>
            </template>
          </ul>
          <!-- <section
            class="more"
            @click="SaleMoreChange"
            v-if="pageSaleConfig.pageTotal > pageSaleConfig.pageNum * pageSaleConfig.pageSize"
          >
            <span class="more-name">More >></span>
          </section> -->
          <section class="pageStyle" v-if="pageSaleConfig.pageSize !== 0">
            <el-pagination
              background
              @current-change="handlerPageSaleChange"
              :current-page="pageSaleConfig.pageNum"
              :page-size="pageSaleConfig.pageSize"
              layout="prev, pager, next"
              :total="pageSaleConfig.pageTotal">
            </el-pagination>
          </section>
        </el-tab-pane>
        <el-tab-pane label="For Rent" name="my-rent">
          <ul class="cardList" v-loading="houseInfoLoading">
            <li class="cardListItem" v-for="item in rentHouseList" :key="item.houseId">
              <router-link
                :to="{ path: '/listing/details/'+item.houseId}"
              >
                <header class="header-img">
                  <img :src="item.imgUrl" :alt="item.street">
                </header>
                <footer class="footer-intro">
                  <h4>
                    <span class="mini">$</span>
                    {{ item.price|priceFormat }}
                    <span v-if="item.rentPayment">/mo</span>
                  </h4>
                  <section class="intro">
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                      <span>{{ item.bathroom }} bds</span>
                    </section>
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                      <span class="padding-5">●</span>
                      <span>{{ item.bedroom }} ba</span>
                    </section>
                    <section class="icons-items">
                      <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                      <span class="padding-5">●</span>
                      <span>{{ item.livingSqft|priceFormat }} sqft</span>
                    </section>
                  </section>
                  <footer class="art-itro">
                    <article>{{ item.street }}</article>
                  </footer>
                </footer>
              </router-link>
            </li>
            <template v-if="rentHouseList.length !== 0 && rentHouseList.length % 4 !== 0">
              <li
                class="cardListItem null"
                v-for="nullIndex in ((Math.ceil(rentHouseList.length / 4) * 4) - rentHouseList.length)"
                :key="nullIndex"
              >
                <img src="/static/img/default/default_05.png" alt>
              </li>
            </template>
          </ul>
          <!-- <section
            class="more"
            v-if="pageRentConfig.pageTotal > pageRentConfig.pageNum * pageRentConfig.pageSize"
          >
            <span class="more-name" @click="RentMoreChange">More >></span>
          </section> -->
          <section class="pageStyle" v-if="pageRentConfig.pageSize !== 0">
            <el-pagination
              background
              @current-change="handlerPageRentChange"
              :current-page="pageRentConfig.pageNum"
              :page-size="pageRentConfig.pageSize"
              layout="prev, pager, next"
              :total="pageRentConfig.pageTotal">
            </el-pagination>
          </section>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- companyList.length !== 0 -->
    <footer class="other-economic" v-if="false">
      <header class="title">
        <h4>TExcellent real estate agent</h4>
      </header>
      <section class="econmic-list">
        <ul class="ec-box">
          <li class="ec-item" v-for="item in companyList" :key="item.sort" @click="gotoDetail(item)">
            <header class="top-img">
              <img :src="item.logo" :alt="item.company">
            </header>
            <section class="ec-content">
              <h3>{{item.company}}</h3>
              <p>
                <img class="label-name" src="/static/img/other/agent_phone.png" alt="agent_phone">
                <span>{{item.phone ? item.phone : 'Confidentiality'}}</span>
                <!-- <span>{{item.phones.length !== 0 ? item.phones[0].phone : 'Confidentiality'}}</span> -->
              </p>
              <p>
                <img class="label-name" src="/static/img/other/agent_adress.png" alt="agent_adress">
                <span>{{item.address}}</span>
              </p>
            </section>
          </li>
        </ul>
      </section>
    </footer>
  </section>
</template>
<script>
import backHistory from '@/components/listing/backHistory'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    'back-history-router': backHistory
  },
  data () {
    return {
      params: {},
      backparams: {
        title: 'Back',
        isBack: true,
        link: null
      },
      houseTabName: 'my-sale',
      authorInfo: {
        userInfo: {}
      },
      // sale
      saleHouseList: [],
      pageSaleConfig: {
        pageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      // rent
      rentHouseList: [],
      pageRentConfig: {
        ageNum: 1,
        pageSize: 12,
        pageTotal: 0
      },
      // companyList
      companyList: [],
      // loading
      houseInfoLoading: false,
      delayGet: null
    }
  },
  filters: {
    formatAddress (_string) {
      if (!_string) return null
      return _string.replace(_string.substring(0, 5), '******')
    },
    rentPayType (_V) {
      return [_V].map(item => {
        let typeString
        switch (Number(item)) {
          case 1:
            typeString = 'Monthly'
            break
          case 2:
            typeString = 'Quarterly'
            break
          case 3:
            typeString = 'Half year'
            break
          case 4:
            typeString = 'Year'
            break
        }
        return typeString
      })[0]
    }
  },
  computed: {
    ...mapGetters({
      token: 'token',
      guid: 'Guid',
      mapConfig: 'mapConfig',
      searchFrom: 'searchFrom',
      GlobalUserInfo: 'GlobalUserInfo',
      userFriendList: 'userFriendList',
      userMessageList: 'userMessageList'
    })
  },
  watch: {
    mapConfig: {
      handler (_new, _old) {
        if (_new !== _old && Object.keys(_new).length !== 0) {
          // this.getHouseRight()
          // this.fetchEconomicList()
        }
      },
      deep: true
    }
  },
  created () {
    try {
      this.params = JSON.parse(
        this.$base64.decode(this.$route.query.ebuyhouse)
      )
      if (this.params.id) {
        this.fetchAuthorInfo(this.params.id)
        this.fetchHouseList(1)
        // this.fetchEconomicList()
      }
    } catch (error) {}
  },
  methods: {
    ...mapMutations({
      openMessages: 'openMessage',
      UPDATE_CURRENT_MESSAGE_INFO: 'UPDATE_CURRENT_MESSAGE_INFO',
      UPDATE_USER_MESSAGE_LIST: 'UPDATE_USER_MESSAGE_LIST',
      UPDATE_CURRENT_USER_INFO: 'UPDATE_CURRENT_USER_INFO'
    }),
    // 添加好友 2019-6-19
    addFriendChange () {
      if (this.token && this.$imConn) {
        // console.log(this.houseInfo)
        // alert(this.authorInfo.userInfo.hxusername)
        this.$imConn.subscribe({
          to: this.authorInfo.userInfo.hxusername,
          message: 'Hellow~'
        })
        this.$message.success(`You have sent a friend request to ${this.authorInfo.userInfo.firstname} ${this.authorInfo.userInfo.lastname}. please wait for him to confirm and accepct.`)
      } else {
        this.$store.commit('signOut', true)
      }
    },
    // 删除好友
    deleteFriendChange () {
      if (this.token && this.$imConn) {
        const _this = this
        _this.$imConn.removeRoster({
          to: _this.authorInfo.userInfo.hxusername,
          success: function () { // 删除成功
            _this.$imConn.unsubscribed({
              to: _this.authorInfo.userInfo.hxusername
            })
            _this.$message.success('You have successfully deleted your friend!')
            // _this.handlerDesignationDeleteChange(_this.authorInfo.userInfo.hxusername)
            _this.UPDATE_CURRENT_USER_INFO({})
          },
          error: function () { // 删除失败
            _this.$message.error('Failed to delete!')
          }
        })
      } else {
        this.$store.commit('signOut', true)
      }
    },
    isFriend (_hxid) {
      if (this.authorInfo && this.authorInfo.userInfo.hxusername) {
        return this.userFriendList.some(item => {
          return item.name === this.authorInfo.userInfo.hxusername
        })
      } else {
        return false
      }
    },
    swithChange (_active, _oldActive) {
      if (_active === 'my-sale') {
        if (this.saleHouseList.length === 0) {
          this.fetchHouseList(1)
        }
      } else {
        if (this.rentHouseList.length === 0) {
          this.fetchHouseList(5)
        }
      }
    },
    // 传入用户ID
    fetchAuthorInfo (_userid) {
      this.$axios
        .get(`${this.wxl_path}user/pc_userInfo/no/login`, {
          params: { id: _userid }
        })
        .then(res => {
          if (res.data.success) {
            this.authorInfo = res.data.data
          }
        })
    },
    fetchHouseList (_type) {
      this.houseInfoLoading = true
      const _this = this
      const pageConfig = Object.assign(
        {},
        _type !== 5 ? _this.pageSaleConfig : _this.pageRentConfig
      )
      _this.$axios
        .get(`${_this.SH_HOUSE_PROD_PATH}thouses/select/user`, {
          params: Object.assign(
            {
              userId: _this.params.id,
              dealType: _type
            },
            pageConfig
          )
        })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            if (_type !== 5) {
              _this.pageSaleConfig.pageTotal = res.data.data.total
              _this.saleHouseList = res.data.data.rows
            } else {
              _this.pageRentConfig.pageTotal = res.data.data.total
              _this.rentHouseList = res.data.data.rows
            }
          }
          this.houseInfoLoading = false
        })
    },
    SaleMoreChange () {
      this.fetchHouseList(1)
    },
    RentMoreChange () {
      this.fetchHouseList(5)
    },
    fetchEconomicList () {
      let self = this
      // ${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-R
      // console.log(_info)
      if (self.searchFrom.cityId) {
        clearTimeout(self.delayGet)
        self.$axios.get(`${self.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-B`, {
          params: {
            latitude: this.mapConfig.lat || this.mapConfig.xlat,
            longitude: this.mapConfig.lng || this.mapConfig.xlng,
            cityId: this.searchFrom.cityId
          }
        }).then(res => {
          if (res.data.success && res.data.data.rows instanceof Array) {
            this.companyList = res.data.data.rows
          } else if (res.data.success && res.data.data instanceof Array) {
            this.companyList = res.data.data
          }
        })
      } else {
        clearTimeout(self.delayGet)
        self.delayGet = setTimeout(function () {
          self.fetchEconomicList()
        }, 150)
      }
    },
    gotoDetail (_info) {
      this.$router.push({
        name: 'serviceDetail',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.companyId}))}
      })
    },
    instantMessaging () {
      if (!this.token) {
        this.$store.commit('signOut', true)
      } else {
        const hxId = this.GlobalUserInfo.hxusername
        if (this.authorInfo.userInfo.hxusername !== hxId) {
          // this.addMessageNode()
          const inMessageList = this.userMessageList.some(item => {
            return item.from === this.authorInfo.userInfo.hxusername
          })
          const currentUser = {
            from: this.authorInfo.userInfo.hxusername,
            to: hxId
          }
          if (!inMessageList) {
            this.UPDATE_USER_MESSAGE_LIST(currentUser)
          }
          this.UPDATE_CURRENT_MESSAGE_INFO(currentUser)
          this.openMessages(true)
        }
      }
    },
    // 建立陌生人关系 后台
    addUserMessageNode (_info) {
      let Url = ['list/savese', 'list/tourist/savese']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      console.log(_info)
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.headUrl || '',
        'toName': _info.hxusername,
        'toNickName': _info.firstname + ' ' + _info.lastname,
        'toUserId': _info.id,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.addMessageListNode(_info)
        })
    },
    // 添加到列表 后台
    addMessageListNode (_info) {
      let Url = ['list/save', 'list/tourist/save']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': _info.headUrl || '',
        'toName': _info.hxusername,
        'toNickName': _info.firstname + ' ' + _info.lastname,
        'toUserId': _info.id,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.openMessages(true)
        })
    },
    // // 建立陌生人关系 后台
    // addMessageNode (_info) {
    //   this.$axios.post(`${this.XT_PROD_PATH}list/savese`, {
    //     'messageNum': 1,
    //     'payload': 'hello',
    //     'toHead': this.authorInfo.userInfo.headUrl,
    //     'toName': this.authorInfo.userInfo.hxusername,
    //     'toNickName': `${this.authorInfo.userInfo.firstname}${this.authorInfo.userInfo.lastname}`,
    //     'toUserId': this.authorInfo.userInfo.id,
    //     'type': 'text'
    //   })
    //     .then(res => {
    //       this.addMessageListNode(_info)
    //     })
    // },
    // // 添加到列表 后台
    // addMessageListNode (_info) {
    //   this.$axios.post(`${this.XT_PROD_PATH}list/save`, {
    //     'messageNum': 1,
    //     'payload': 'hello',
    //     'toHead': this.authorInfo.userInfo.headUrl,
    //     'toName': this.authorInfo.userInfo.hxusername,
    //     'toNickName': `${this.authorInfo.userInfo.firstname}${this.authorInfo.userInfo.lastname}`,
    //     'toUserId': this.authorInfo.userInfo.id,
    //     'type': 'text'
    //   })
    //     .then(res => {
    //       this.openMessages(true)
    //     })
    // },
    handlerPageRentChange (_page) {
      this.pageRentConfig.pageNum = _page
      this.RentMoreChange(5)
    },
    handlerPageSaleChange (_page) {
      this.pageSaleConfig.pageNum = _page
      this.fetchHouseList(1)
    }
  }
}
</script>
<style lang="sass" scoped>
  .economicContainer
    margin-top: 60px
    .goHistory
      padding: 30px 15vw
    .author-info
      height: 460px
      width: 100%
      padding: 0 15vw
      background-color: #fff
      box-shadow: 0px 10px 10px -10px #ddd
      display: flex
      justify-content: space-around
      align-items: center
      position: relative
      z-index: 10
      .left-author-header-img
        width: 300px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        .header-img
          width: 170px
          height: 170px
          border-radius: 50%
          border: 1px solid #ddd
          img
            width: 100%
            height: 100%
            border-radius: 50%
        .author-name
          display: flex
          align-items: center
          margin: 20px 0
          span
            color: #444
            font-size: 2.25em
            white-space: nowrap
          img
            margin-left: 5px
        .contact-me
          width: 100%
          display: flex
          justify-content: space-between
          /deep/ .el-button
            padding: 0 40px
            height: 40px
            display: flex
            align-items: center
            span
              font-size: 1.5em
          .add-friend-btn,
          .contact-btn
            width: 142px
            height: 30px
            display: flex
            justify-content: center
            align-items: center
            background-color: #1281FC
            color: #fff
            font-size: 14px
            border-radius: 15px
            line-height: 30px
            text-align: center
            cursor: pointer
            border: 1px solid #1281FC
            &:hover
              color: #1273DE
              border-color: #1273DE
              background-color: #fff
            >i
              vertical-align: middle
              margin-right: 5px
          .delete-friend-btn
            display: flex
            width: 142px
            height: 30px
            justify-content: center
            align-items: center
            background-color: #F3F4F6
            color: #666666
            font-size: 14px
            border-radius: 15px
            line-height: 30px
            text-align: center
            cursor: pointer
            border: 1px solid #F3F4F6
      .right-author-info-bord
        width: 650px
        height: 330px
        position: relative
        &:after
          content: ''
          width: 100%
          height: 100%
          background-color: #F5F5F5
          position: absolute
          top: 0
          left: 0
          box-shadow: 8px -5px 10px 0px rgba(0, 0, 0, 0.24)
          border-radius: 5px
        &:before
          content: ''
          width: 100%
          height: 100%
          background-color: #F4F4F4
          z-index: 0
          position: absolute
          left: 25px
          top: -25px
          border-radius: 5px
        .header-type
          color: #144881
          font-size: 3em
          position: relative
          z-index: 1
          margin: 25px 0 25px 35px
        .label-box
          position: relative
          z-index: 1
          font-size: 16px
          .label
            height: 55px
            display: flex
            justify-content: left
            align-items: end
            padding-left: 35px
            span
              font-size: 1.5em
              color: #666
              padding-left: 10px
          .label:last-child
            height: 100px
    .house-info-list
      position: relative
      background-color: #FCFCFC
      width: 100%
      padding: 30px 15vw
      .house-tab
        /deep/ .el-tabs__header
          .el-tabs__nav-wrap
            &:after
              width: 0 !important
              content: ''
            .el-tabs__item
              color: #444
              font-size: 1.5em
              &.is-active
                color: #1281FC
        .pageStyle
          margin: 50px 0 30px
          display: flex
          justify-content: center
          text-align: center
        .cardList
          display: flex
          flex-wrap: wrap
          // justify-content: space-between
          .cardListItem
            width: 16.25em
            height: 19.375em
            background-color: #fff
            border-radius: 5px
            overflow: hidden
            margin-top: 40px
            border: 1px solid #E9E9E9
            transition: all .3s ease
            margin-right: 36px
            &:nth-child(4n)
              // margin-right: 0
            &:hover
              box-shadow: 1px 1px 10px -2px #666
              transition: all .3s ease
            .header-img
              height: 12.1875em
              width: 100%
              display: flex
              justify-content: center
              align-items: center
              overflow: hidden
              img
                // min-width: 100%
            .footer-intro
              height: 7.1875em
              padding: 0.375em
              display: flex
              flex-direction: column
              h4
                font-size: 1.25em
                font-weight: bold
                color: #444
                height: 1.5em
                .mini
                  font-size: .875em
              .intro
                display: flex
                justify-content: flex-start
                align-items: center
                height: 1.5em
                font-size: 1em
                width: 100%
                color: #666
                margin-bottom: .5em
                position: relative
                &:before
                  position: absolute
                  content: ''
                  width: calc( 100% + 0.375em * 2 )
                  height: 1px
                  background: #E9E9E9
                  bottom: -0.25em
                  left: -0.375em
                .padding-5
                  padding: 0 5px
                .icons-items
                  display: flex
                  // flex: 0 0 calc( 100% / 3 )
                  justify-content: flex-start
                  align-items: center
                  img
                    margin-right: 5px
                    width: 1em
                    height: 1em
              .art-itro
                article
                  font-size: 14px
                  color: #999
          .cardListItem.null
            display: flex
            justify: center
            align-items: center
            img
              width: 100%
    .other-economic
      width: 100%
      padding: 0 15vw
      position: relative
      background-color: #FCFCFC
      .title
        h4
          font-size: 2.25em
          color: #444444
          font-weight: 400
      .econmic-list
        .ec-box
          display: flex
          justify-content: start
          flex-wrap: wrap
          .ec-item
            width: 12.5em
            height: 17.75em
            margin: 20px 20px
            background-color: #fff
            border-radius: 5px
            cursor: pointer
            &:hover
              box-shadow: 10px 10px 10px -10px #ddd
            .top-img
              width: 100%
              height: 9.4375em
              border-radius: 5px
              img
                width: 100%
                height: 100%
                border-radius: 5px
            .ec-content
              h3
                font-size: 18px
                font-weight: bold
                color: rgba(51,51,51,1)
                margin: 0.5em 5px
                justify-content: center
                overflow: hidden
                display: -webkit-box
                /*! autoprefixer: off */
                -webkit-box-orient: vertical
                /*! autoprefixer: on */
                -webkit-line-clamp: 2
                word-break: break-word
              p
                display: flex
                justify-content: start
                align-items: center
                font-size: 16px
                color: #666
                margin: 0.5em 5px
                img
                  width: 16px
                  height: 16px
                  margin-right: 5px
                span
                  overflow: hidden
                  display: -webkit-box
                  /*! autoprefixer: off */
                  -webkit-box-orient: vertical
                  /*! autoprefixer: on */
                  -webkit-line-clamp: 2
                  word-break: break-word
</style>
