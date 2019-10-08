<template>
  <section class="homeownerInformationViews">
    <section class="homeowner-bord">
      <section class="relative-box">
        <header class="Avatar" @click="goViewAuthorInfo">
          <img :src="params.headUrl" alt>
          <h4>{{ params.contactName }}</h4>
          <span>{{ params.userType === 1 ? '[Personal]' : '[Agent]' }}</span>
        </header>
        <section class="friend-box">
          <span class="add-friend-btn" @click="addFriendChange" v-if="!isFriend()"><i class="iconfont icon-message_AddFriend"></i> Add Friend</span>
          <span class="delete-friend-btn" @click="deleteFriendChange" v-else><i class="iconfont icon-message_CancelFriends"></i> Delete</span>
        </section>
      </section>
      <section class="contack-info">
        <!-- <section class="top-info-nick-name">
          <h4>{{ params.contactName }}</h4>
          <span>{{ params.userType === 1 ? '[Personal]' : '[Agent]' }}</span>
        </section> -->
        <section class="canplay-info">
          <ul class="info-box">
            <li class="info-item">
              <img src="/static/img/listing/icons/email.png" alt="email">
              <!-- <span>{{ params.contactEmail || 'Confidentiality' }}</span> -->
              <span v-if="params.emailConceal === 1"><a :href="'mailto:' + params.contactEmail">{{params.contactEmail}}</a></span>
              <span v-else>{{params.contactEmail}}</span>
            </li>
            <li class="info-item">
              <img src="/static/img/listing/icons/phone.png" alt="phone">
              <span v-if="params.emailConceal === 1"><a :href="'tel:+' + params.contactPhone">{{params.contactPhone | telephoneFormat}}</a></span>
              <span v-else>{{params.contactPhone | telephoneFormat}}</span>
            </li>
            <li class="info-item" v-if="params.userType !== 1">
              <img src="/static/img/listing/icons/conplay.png" alt="companyName">
              <span>{{ params.companyName || 'Hidden' }}</span>
            </li>
          </ul>
        </section>
      </section>
      <footer class="btns">
        <button class="contack" @click="instantMessaging">
          <!-- <img src="/static/img/listing/icons/Contactlandlord.png" alt=""> -->
          <span>Contact {{params.dealType === 1 ? 'seller' : 'landlord'}}</span>
        </button>
        <button class="make-offer" @click="checkOfferChange">
          <!-- <img src="/static/img/listing/icons/Makeanoffer.png" alt=""> -->
          <span>Make an offer</span>
        </button>
      </footer>
    </section>
    <footer class="other-economic" v-if="providerList.length !== 0">
      <header class="title">
        <h4>Service Providers</h4>
        <!-- <a href="/service/list" class="providers-more">More&gt;</a> -->
      </header>
      <section class="econmic-list">
        <section class="scroll">
          <router-link :to="'/service/detail/' + item.replaceCeoId" class="item" v-for="(item, index) in providerList" :key="index">
            <div class="left">
              <img :src="item.logo || '/static/img/service/service.png'" alt="">
            </div>
            <div class="right">
              <p class="info">{{item.company}}</p>
              <div class="bottom">
              <div class="category">
                <img src="/static/img/service/service_classify.png" alt="service_address">
                <p>{{item|handlerTypeName}}</p>
              </div>
              <div class="tel">
                <img src="/static/img/service/service_phone.png" alt="service_phone.png">
                <p>{{item.phone}}</p>
              </div>
              </div>
            </div>
          </router-link>
        </section>
        <!-- <router-link class="moreStyle" to="/service/list"> -->
          <!-- <span>More <i class="el-icon-arrow-right"></i></span> -->
        <router-link class="moreStyle" :to="{path: '/service/list', query: {cityId: houseInfo.cityId, latitude: houseInfo.latitude, longitude: houseInfo.longitude}}">More <i class="el-icon-arrow-right"></i></router-link>
        <!-- </router-link> -->
      </section>
    </footer>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
// import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      params: {
        headUrl: null,
        contactName: null,
        contactEmail: null,
        houseId: null,
        releaseType: null,
        longitude: 0,
        latitude: 0,
        cityId: 0,
        stateId: 0,
        emailConceal: 2
      },
      isRent: true,
      companyList: [],
      providerList: []

    }
  },
  // props: ['cityId'],
  props: {
    houseInfo: {
      default: () => {
        return {
          longitude: 0,
          latitude: 0,
          cityId: 0,
          stateId: 0,
          emailConceal: 2
        }
      },
      type: Object
    }
  },
  watch: {
    houseInfo: {
      handler (val, oldVal) {
        if (Object.keys(val).includes('cityId')) {
          this.formatData(val)
          this.params = val || {}
        }
      },
      deep: true
    }
  },
  filters: {
    // formatEmail (val) {
    //   if (!val || this.params.emailConceal === 1) return val
    //   return val.replace(val.substring(4, val.lastIndexOf('@')), '*****')
    //   // return 'Confidentiality'
    // },
    handlerTypeName (_info) {
      // typeof
      if (_info.types instanceof Array && _info.types.length > 0) {
        return _info.types[0].typeName
      } else {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      guid: 'Guid',
      token: 'token',
      userMessageList: 'userMessageList',
      GlobalUserInfo: 'GlobalUserInfo',
      mapConfig: 'mapConfig',
      userFriendList: 'userFriendList'
    })
  },
  methods: {
    ...mapMutations({
      openMessages: 'openMessage',
      UPDATE_CURRENT_MESSAGE_INFO: 'UPDATE_CURRENT_MESSAGE_INFO',
      UPDATE_USER_MESSAGE_LIST: 'UPDATE_USER_MESSAGE_LIST',
      UPDATE_CURRENT_USER_INFO: 'UPDATE_CURRENT_USER_INFO'
    }),
    // formatEmail (val) {
    //   if (!val || this.params.emailConceal === 1) return val
    //   return val.replace(val.substring(4, val.lastIndexOf('@')), '*****')
    // },
    formatData (_info) {
      if (_info && Object.keys(_info).length !== 0 && _info.dealType && _info.dealType === 1) {
        this.isRent = false
      }
      this.getHouseRight(_info || {})
    },
    checkOfferChange () {
      const _this = this
      if (!this.token || !(_this.params.houseId !== null)) {
        if (!this.token) {
          // 屏蔽弹窗方式 2019-6-3
          _this.$store.commit('signOut', true)
          // 新增活动版页面
          // this.$router.push({
          //   path: '/account/login',
          //   query: {redirect: window.location.href}
          // })
        } else {
          _this.$message({
            message:
              'The parameter is incorrect and will return to the previous step',
            type: 'warning'
          })
          setTimeout(() => {
            _this.$router.go(-1)
          }, 3000)
        }
        return
      }
      this.$axios
        .get(
          `${this.WXL_LOCAL_PATH}${
            this.isRent ? 'rent' : 'sale'
          }HouseOrder/find_transaction_status`,
          { params: { housesId: _this.params.houseId } }
        )
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.$router.push({
              name: 'rentAndsellOffer',
              query: {
                ebuyhouse: _this.$base64.encode(
                  JSON.stringify(
                    Object.assign(
                      {},
                      { housesId: _this.params.houseId },
                      { type: _this.isRent }
                    )
                  )
                )
              },
              params: { type: _this.isRent }
            })
          } else {
            _this.$message({
              message: res.data.msg,
              tyep: 'warning'
            })
          }
        })
    },
    instantMessaging () {
      if (!this.token) {
        // 屏蔽弹窗方式 2019-6-3
        this.$store.commit('signOut', true)
        // this.$router.push({
        //   path: '/sft/contactus'
        // })
        // 新增活动版页面
        // this.$router.push({
        //   path: '/account/login',
        //   query: {redirect: window.location.href}
        // })
      } else {
        const hxId = this.GlobalUserInfo.hxusername
        if (this.houseInfo.hxuserName !== hxId) {
          // this.addMessageNode()
          const inMessageList = this.userMessageList.some(item => {
            return item.from === this.houseInfo.hxuserName
          })
          const currentUser = {
            from: this.houseInfo.hxuserName,
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
    // 添加好友 2019-6-19
    addFriendChange () {
      if (this.token && this.$imConn) {
        // console.log(this.houseInfo)
        // alert(this.houseInfo.hxuserName)
        this.$imConn.subscribe({
          to: this.houseInfo.hxuserName,
          message: 'Hellow~'
        })
        // params.contactName
        this.$message.success(`You have sent a friend request to ${this.params.contactName}. please wait for him to confirm and accepct.`)
      } else {
        this.$store.commit('signOut', true)
      }
    },
    // 删除好友
    deleteFriendChange () {
      if (this.token && this.$imConn) {
        const _this = this
        _this.$imConn.removeRoster({
          to: _this.houseInfo.hxuserName,
          success: function () { // 删除成功
            _this.$imConn.unsubscribed({
              to: _this.houseInfo.hxuserName
            })
            _this.$message.success('You have successfully deleted your friend!')
            // _this.handlerDesignationDeleteChange(_this.houseInfo.hxuserName)
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
      if (this.houseInfo && this.houseInfo.hxuserName) {
        return this.userFriendList.some(item => {
          return item.name === this.houseInfo.hxuserName
        })
      } else {
        return false
      }
    },
    // 建立陌生人关系 后台
    addMessageNode (_info) {
      let Url = ['list/savese', 'list/tourist/savese']
      if (this.token) {
        Url = Url[0]
      } else {
        Url = Url[1]
      }
      this.$axios.post(`${this.XT_PROD_PATH + Url}`, {
        'messageNum': 1,
        'payload': 'hello',
        'toHead': this.params.headUrl,
        'toName': this.params.hxuserName,
        'toNickName': `${this.params.contactName}`,
        'toUserId': this.params.userId,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.addMessageListNode()
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
        'toHead': this.params.headUrl,
        'toName': this.params.hxuserName,
        'toNickName': `${this.params.contactName}`,
        'toUserId': this.params.userId,
        'type': 'text',
        'jId': this.token ? null : this.guid
      })
        .then(res => {
          this.openMessages(true)
        })
    },
    // 查看详情
    goViewAuthorInfo () {
      // console.log({ebuyhouse: this.$base64.encode(JSON.stringify({id: this.params.userId}))})
      this.$router.push({
        name: 'economic-man',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: this.params.userId}))}
      })
    },
    // 公司
    // fetchEconomicList () {
    //   this.$axios
    //     .get(`${this.LJJ_SERVER_PROD_PATH}service-company/referral/Broker`, {params: { pageSize: 6, longitude: this.params.longitude, latitude: this.params.latitude, cityId: this.params.cityId, stateId: this.params.stateId }})
    //     .then(res => {
    //       if (res.data.success) {
    //         // console.log(res.data)
    //         this.companyList = res.data.data.rows
    //       }
    //     })
    // },
    getHouseRight (_info = {}) {
      // ${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-R
      // console.log(_info)
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/referral/house/item-R`, {
        params: {
          latitude: _info.latitude || this.mapConfig.lat || this.mapConfig.xlat,
          longitude: _info.longitude || this.mapConfig.lng || this.mapConfig.xlng,
          cityId: _info.cityId,
          pageSize: 4
        }
      }).then(res => {
        if (res.data.success && res.data.data.rows instanceof Array) {
          this.providerList = res.data.data.rows
        } else if (res.data.success && res.data.data instanceof Array) {
          this.providerList = res.data.data
        }
      })
      // console.log(res)
    },
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.companyId}))}
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .homeownerInformationViews
    flex: 0 0 22.8125em
    margin-top: calc( 6.0625em + 3.625em )
    .homeowner-bord
      width: 100%
      border-radius: 5px
      min-height: 380px
      background: rgba(247,247,247,1)
      border: 1px solid rgba(233,233,233,1)
      border-radius: 10px
      position: relative
      .relative-box
        position: relative
        display: flex
        align-items: center
        flex-direction: column
        .Avatar
          // display: flex
          // justify-content: center
          // align-items: center
          text-align: center
          // width: 100%
          // position: absolute
          // top: -3.21875em
          cursor: pointer
          // left: 50%
          transform: translateY(-3.21875em)
          &:hover h4
            color: #1281FC
          h4
            font-size: 1.375em
            color: #323232
            margin-top: 24px
            margin-bottom: 7px
          span
            color: #1281FC
            font-size: 14px
            margin-top: 7px
            font-weight: 400
          img
            width: 6.4375em
            height: 6.4375em
            border-radius: 50%
            overflow: hidden
            transition: all .5s ease
            &:hover
              box-shadow: 1px 1px 1px 1px #ddd
              transition: all .5s ease
              transform: matrix(1.1, 0, 0, 1.1, 0, 0)
        .friend-box
          display: flex
          justify-content: center
          transform: translateY(-1rem)
          .add-friend-btn
            width: 142px
            height: 30px
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
          .delete-friend-btn
            width: 142px
            height: 30px
            background-color: #F3F4F6
            color: #666666
            font-size: 14px
            border-radius: 15px
            line-height: 30px
            text-align: center
            cursor: pointer
            border: 1px solid #F3F4F6
      .contack-info
        // margin-top: calc( 3.21875em + 72px )
        display: flex
        flex-direction: column
        width: 100%
        align-items: center
        .top-info-nick-name
          display: flex
          flex-direction: column
          align-items: center
          h4
            font-size: 1.375em
            color: #323232
            // height: 1.875em
          span
            color: #1281FC
            font-size: 14px
            margin-top: 7px
            font-weight: 400
        .canplay-info
          width: 100%
          padding: 30px 32px 30px 50px
          .info-box
            display: flex
            flex-direction: column
            .info-item
              margin: 7.5px 0
              color: #999
              font-size: 1.2rem
              display: flex
              align-items: flex-start
              word-break: break-word
              img
                width: 1.3rem;
                height: 1.3rem;
              span
                margin-left: 10px
                letter-spacing: 0.5px
      .btns
        display: flex
        flex-direction: column
        align-items: center
        margin-bottom: 35px
        button
          // width: 13.3125em
          height: 45px
          border-radius: 5px
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          margin-bottom: 1.25em
          transition: all .3s ease
          padding: 0 49px
          span
            font-size: 1.875em
        .contack
          background-color: #ffe07f
          color: #634d08
          &:hover
            color: #fff
            background-color: #ffd146
            transition: all .3s ease
        .make-offer
          background-color: #d2e4ff
          color: #2c63b6
          &:hover
            color: #fff
            background-color: #89b8ff
            transition: all .3s ease
    .other-economic
      .title
        padding: 80px 0 20px
        border-bottom: 1px solid #AFAFAF
        display: flex
        justify-content: space-between
        h4
          color: #444444
          font-size: 24px
          font-weight: bold
        .providers-more
          color: #999
      .econmic-list
        margin-top: 16px
        .scroll
          max-height: 700px
          overflow-y: scroll
          padding: 0 10px
          &.isMinClass
            height: 275px
            transition: all .5s ease
          &::-webkit-scrollbar
            width: 10px
            height: 4px
            cursor: pointer
          &::-webkit-scrollbar-thumb
            border-radius: 5px
            -webkit-box-shadow: inset 0 0 5px #0183fd
            background: #0183fd
          &::-webkit-scrollbar-track
            // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
            border-radius: 0
            background: trnasparent
        .moreStyle
          width: 364px
          height: 30px
          line-height: 30px
          text-align: center
          display: inline-block
          border-radius: 15px
          color: #999999
          border: 1px solid #999999
          transition: all .3s ease
          margin-top: 30px
          &:hover
            color: #fff
            background-color: #1281fc
            border: 1px solid #1281fc
        .item
          display: flex
          margin-top: 20px
          transition: all .3s ease
          &:hover
            cursor: pointer
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.6)
            transition: all .3s ease
          .left
            width: 100px
            height: 100px
            margin-right: 14px
            border-radius: 5px
            img
              width: 100%
              height: 100%
              display: block
              border-radius: 5px
          .right
            flex: 1
            display: flex
            flex-direction: column
            justify-content: space-around
            .info
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              // margin-bottom: 20px
              color: #444444
              font-size: 18px
              height: 42px
            .category,.tel
              display: flex
              line-height: 25px
              font-size: 16px
              color: #666666
              align-items: center
              img
                margin-right: 6px
              p
                flex: 1
</style>
