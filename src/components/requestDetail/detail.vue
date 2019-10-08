<style scoped>
.care-icon {
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 26px;
  background-image: url('/static/img/icon/love.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}
.care-icon.on {
  background-image: url('/static/img/icon/love_click.png')
}
.care-btn {
  line-height: 40px;
  width: 40px;
  height: 40px;
  padding: 0;
}
.section-detail {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
}
.section-detail-area {
  position: relative;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  padding-top: 100px;
  padding-bottom: 40px;
}
.section-detail-recommend {
  width: 100%;
  position: absolute;
  top: -100px;
  display: flex;
}
.recommend-avatar {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
}
.recommend-avatar img {
  width: 100%;
  height: 100%;
}
.recommend-control {
  display: flex;
  justify-content: space-between;
  padding: 110px 20px 0;
  width: calc(100% - 200px);
}
.recommend-control-param .param-sup{
  font-size: 2em;
  line-height: 2em
}
.recommend-control-param .param-sub{
  color: #646464;
  font-size: 1em
}
.recommend-control-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-item:not(:last-child) {
  border-bottom: 1px solid #E0E0E0
}
.content-item {
  padding: 35px 0;
}
.content-item .content-sup .param-sup {
  color: #F48A42;
  font-size: 2em;
  line-height: 2em;
}
.content-item .content-sup .param-sub {
  color: #444444;
}
.content-item .content-sub {
  margin-top: 2.4em;
}
.content-item .content-sub .label:not(:last-child){
  margin-right: 10px;
}
.content-item .content-sub .label{
  line-height: 28px;
  display: inline-block;
  background-color:#E7F1FD ;
  border: 1px solid #8BC0FF;
  border-radius: 15px;
  padding: 0 14px;
  color: #1281FC;
}
.content-item-area {
  padding: 0 10%;
}
.param-list {
  display: flex;
  flex-wrap: wrap;
}
.param-item {
  width: 50%;
  display: flex;
  line-height: 1.6;
  padding: 1em 1em 1em 0;
  align-items: center;
}
.param-item::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #444;
}
.param-item-dt {
  width: 8em;
  font-size: 1.2em;
  color: #444;
  display: inline-block;
  word-break: break-all;
}
.param-item-dd {
  color: #999999;
  font-size: 1.2em;
  display: inline-block;
}

.house-list-box {
  height: 400px;
  border-radius: 1em;
  margin: 0 auto;
  overflow: auto;
  background-color: #ffffff;
}

.house-unit {
  width: 96%;
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
}

.el-checkbox {
  transform: matrix(1.5, 0, 0, 1.5, 0, 0);
}

.house-unit .house-img {
  width: 20%;
  height: 90px;
  margin-left: 2%;
}

.info-part {
  width: 480px;
  height: 100%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.floor-price .price {
  font-size: 1.2em;
  font-weight: bold;
  color: #f48a42;
}

.floor-price .price + span {
  font-size: 1em;
  color: #444444;
}

.floor-location {
  margin: 5px 0;
  color: #666666;
  line-height: 1.2em;
  height: 2.4em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}

.floor-location img {
  vertical-align: bottom;
}

.floor-spec {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
}

.floor-spec img {
  width: 1.2em;
}

.floor-spec span{
  color: #99aab7;
  font-size: 1em;
}
.floor-location img {
  margin: 1px;
}

.btn-group {
  margin-top: 2%;
  text-align: center;
}

.btn-group button {
  font-size: 1.2em;
  padding: 0.4em 1.2em;
  border-radius: 0.5em;
  color: #ffffff;
}

.address {
  width: 16px;
  height: 16px;
}
.checkbox-group-auto {
  font-size: 1em
}

</style>
<style lang="sass" scoped>
/deep/ .el-checkbox__label
  display: none
.PropertyDescription
  min-height: 280px
  margin-top: 60px
  display: flex
  justify-content: center
  .article-descpt,.map-component
    flex: 1
    margin-top: 1.6875em
    margin-right: 43px
    display: flex
    align-items: center
    background: rgba(247,247,247,1)
    border-radius: 10px
    position: relative
    padding: 60px 20px 20px
    .title-image
      height: 70px
      background-image: url('/static/img/listing/icons/house_title_bg.png')
      background-repeat: no-repeat
      background-position: top
      font-size: 25px
      color: #2C63B6
      padding: 0 20px
      font-weight: bold
      display: flex
      align-items: center
      padding-bottom: 10px
      position: absolute
      top: -23px
      left: 50px
    .image-text-dh
      height: 28px
      width: 28px
      background-image: url('/static/img/listing/icons/house_text_bg.png')
      background-repeat: no-repeat
      position: absolute
      top: 20px
      right: 50px
    article
      font-size: 1.25em
      color: #444
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 50
      /*! autoprefixer: off */
      -webkit-box-orient: vertical
      /* autoprefixer: on */
      word-break: break-word
      line-height: 34px
      text-indent: 2em
</style>

<template>
  <section class="section-detail">
    <div class="section-detail-area">
      <div class="section-detail-recommend">
        <div class="recommend-avatar"><img :src="detailData.userHeadUrl" alt=""></div>
        <div class="recommend-control">
          <div class="recommend-control-param">
            <div class="param-sup">{{detailData.contactName}}</div>
            <div class="param-sub">{{detailData.contactEmail}}</div>
          </div>
          <div class="recommend-control-wrap">
            <div class="recommend-control-inner">
              <el-button class="recommend-btn" @click="instantMessaging">Contact</el-button>
              <el-button class="recommend-btn" @click="showRecommend">Recommend</el-button>
              <el-button class="care-btn" @click="handlerCollection"><i :class="[detailData.ifcollection ? 'on' : '','care-icon']"></i></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="section-detail-content">
        <div class="content-item">
          <div class="content-sup">
            <p class="param-sup">
              ${{detailData.priceMin | priceFormat}}-{{detailData.priceMax | priceFormat}}
              <span v-if="detailData.releaseType === 1">/ mo</span>
            </p>
            <p class="param-sub"><i class="el-icon-location"></i>{{detailData.cityName}}</p>
          </div>
          <div class="content-sub">
            <template v-if="detailData.labelId">
              <span class="label" v-for="(labelItem, labelIndex) in detailData.labelId.split(',')" :key="labelIndex">{{labelItem}}</span>
            </template>
          </div>
        </div>
        <div class="content-item">
          <div class="content-item-area">
            <ul class="param-list">
              <li class="param-item">
                <span class="param-item-dt">Bedrooms</span>
                <span class="param-item-dd">{{detailData.bedroom}}</span>
              </li>
              <li class="param-item">
                <span class="param-item-dt">Bathrooms</span>
                <span class="param-item-dd">{{detailData.bathroom}}</span>
              </li>
                <li class="param-item">
                <span class="param-item-dt">Garages</span>
                <span class="param-item-dd">{{detailData.garage}}</span>
              </li>
                <li class="param-item">
                <span class="param-item-dt">Living Sqft</span>
                <span class="param-item-dd">{{detailData.livingSqlfMax}}</span>
              </li>
              <li class="param-item">
                <span class="param-item-dt">Housing Type</span>
                <span class="param-item-dd">{{detailData.houseType}}</span>
              </li>
                <li class="param-item">
                <span class="param-item-dt">Release Time</span>
                <span class="param-item-dd">{{detailData.addTimeFormatDate}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-item">
          <div class="content-item-area">
            <section class="PropertyDescription" >
              <section class="article-descpt">
                <h5 class="title-image">Property Descriptions</h5>
                <span class="image-text-dh"></span>
                <article>{{detailData.additionalInformation || ''}}</article>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="House list" :visible.sync="recommendVisibles" center>
      <div class="house-list-box">
        <el-checkbox-group class="checkbox-group-auto" v-model="recommendMultiple">
          <div v-for="(item, index) in recommendData" :key="index" class="house-unit">
            <el-checkbox :label="item.houseId"></el-checkbox>
            <img class="house-img" :src="item.imgUrl">
            <div class="info-part">
              <div class="floor-price">
                <span class="price">${{item.price|priceFormat}}</span>
              </div>
              <div class="floor-location">
                <img class="address" src="/static/img/common/header/location.png">
                &ensp;{{item.street}}
              </div>
              <div class="floor-spec">
                <div class="bathroom">
                  <img src="/static/img/index/bath.png">
                  {{item.bathroom}}
                  <span>Bathrooms</span>
                </div>
                <div class="bedroom">
                  <img src="/static/img/index/bed.png">
                  {{item.bedroom}}
                  <span v-if="parseInt(item.bedroom)">Bedrooms</span>
                </div>
                <div class="sqft">
                  <img src="/static/img/index/sqft.png">
                  {{item.livingSqft|priceFormat}}
                  <span>Sqft</span>
                </div>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recommendVisibles = false">Close</el-button>
        <el-button type="primary" @click="handlerRecommend">Set out</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      recommendMultiple: [],
      recommendVisibles: false
    }
  },
  props: {
    detailData: {
      type: Object,
      default () {
        return {}
      }
    },
    potentialData: {
      type: Array,
      default () {
        return []
      }
    },
    recommendData: {
      type: Array,
      default () {
        return []
      }
    },
    recommendVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    recommendVisible: {
      handler (_new) {
        this.recommendVisibles = _new
      }
    }
  },
  computed: {
    ...mapGetters({
      token: 'token',
      signInState: 'signInState',
      GlobalUserInfo: 'GlobalUserInfo',
      userMessageList: 'userMessageList'
    })
  },
  methods: {
    ...mapMutations({
      signOut: 'signOut',
      openMessages: 'openMessage',
      UPDATE_CURRENT_MESSAGE_INFO: 'UPDATE_CURRENT_MESSAGE_INFO',
      UPDATE_USER_MESSAGE_LIST: 'UPDATE_USER_MESSAGE_LIST'
      // UPDATE_CURRENT_USER_INFO: 'UPDATE_CURRENT_USER_INFO'
    }),
    handlerCollection () {
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      this.$emit('handlerCollection', {
        boolean: this.detailData.ifcollection,
        params: {
          housesId: this.detailData.id,
          collectionType: this.detailData.releaseType + 1
        }
      })
    },
    handlerRecommend () {
      if (!this.recommendMultiple.length) {
        this.$message.error('Please choose suitable homes from the recommended lists.')
        return
      }
      this.$emit('handlerRecommend', this.recommendMultiple)
    },
    showRecommend () {
      if (!getToken()) {
        this.$store.commit('signOut', true)
        return
      }
      if (!this.recommendData.length) {
        this.$message.error('You don’t have recommended homes.')
        return
      }
      this.recommendVisibles = true
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
        console.log(this.detailData)
        const hxId = this.GlobalUserInfo.hxusername
        if (this.detailData.hxId !== hxId) {
          // this.addMessageNode()
          const inMessageList = this.userMessageList.some(item => {
            return item.from === this.detailData.hxId
          })
          const currentUser = {
            from: this.detailData.hxId,
            to: hxId
          }
          if (!inMessageList) {
            this.UPDATE_USER_MESSAGE_LIST(currentUser)
          }
          this.UPDATE_CURRENT_MESSAGE_INFO(currentUser)
          this.openMessages(true)
        }
      }
    }
  }
}
</script>
