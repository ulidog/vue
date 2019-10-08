<template>
  <section class="imageCarousel">
    <section class="ebuyhouse-share">
      <ul class="bings">
        <li class="visitMark">
          <!-- <img src="/static/img/listing/icons/view.png" alt=""> -->
          <i class="iconfont icon-yanjing"></i>
          <span>Visits</span>
          <span>{{params.viewCount}}</span>
        </li>
        <li class="cangMark" @click.stop.prevent="collectionHouse(params.cancelCang, params.houseId, params.dealType, params)">
          <!-- <img src="/static/img/listing/icons/love.png" alt="false" v-if="params.cancelCang === 0">
          <img src="/static/img/listing/icons/love_pre.png" alt="true" v-if="params.cancelCang !== 0"> -->
          <i class="iconfont icon-shoucang" v-if="params.cancelCang === 0"></i>
          <i class="iconfont icon-shoucang" style="color:#1281fc;font-weight:bold;" v-if="params.cancelCang !== 0"></i>
          <span>Save</span>
          <span>{{params.countCang}}</span>
        </li>
        <li class="shareMark" @click="showShare = !showShare">
          <!-- <img src="/static/img/listing/icons/share.png" alt=""> -->
          <i class="iconfont icon-fenxiang"></i>
          <span>Share</span>
          <span>{{params.countShare}}</span>
        </li>
      </ul>
      <el-collapse-transition name="el-fade-in-linear">
        <div v-show="showShare">
          <common-share @openChange='openChange' :title="shareTitle" :description="remark" :quote="shareTitle" :hashtags="shareHashtags" class="shareSize">
          </common-share>
        </div>
      </el-collapse-transition>
    </section>
    <el-carousel style="overflow: hidden;" indicator-position="outside" ref="tatilsCarousel" arrow="never">
      <el-carousel-item class="carousel-item" v-for="item in infoList" :key="item.id">
        <section class="imagesList">
          <section class="leftTitleImg" @click="viewChange(item.imgUrl)">
            <img v-lazy="item.imgUrl.imgUrl" :alt="item.imgUrl.type" :key="item.id">
          </section>
          <section class="rightIntroImg">
            <ul class="img-box">
              <li class="r-img-item" v-for="imgListItem in item.children" :key="imgListItem.id" @click="viewChange(imgListItem)">
                <img v-lazy="imgListItem.imgUrl" :alt="imgListItem.type" :key="imgListItem.id">
              </li>
              <li class="r-img-item video" @click="viewChange(item.video)">
                <section class="mask" :style="{'background-image': `url(${item.video.imgUrl})`}">
                  <video :src="item.video.videoUrl" ref="videos"></video>
                  <img src="/static/img/listing/icons/play.png" alt="" class="icon-auto">
                  <span>{{time}}</span>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </el-carousel-item>
    </el-carousel>
    <ul class="switchTabCarousel hoverAction">
      <li class="arrowLift" @click="switchTabPicArrowLeft">
        <img src="/static/img/listing/icons/array_l.png" alt="l">
      </li>
      <li class="arrowRight" @click="switchTabPicArrowRight">
        <img style="" src="/static/img/listing/icons/array_l.png" alt="r">
      </li>
    </ul>
  </section>
</template>
<script>
// import { getToken } from '@/utils/session'
import share from '@/components/consultation/share'
import Vue from 'vue'
import { mapGetters } from 'vuex'
const stringToArray = Vue.filter('stringToArray')
export default {
  components: {
    'common-share': share
  },
  data () {
    return {
      params: {
        countView: 0,
        cancelCang: 0,
        countCang: 0,
        countShare: 0
      },
      infoList: [],
      time: '00:00',
      showShare: false,
      shareUrl: window.location.href,
      shareHashtags: 'Ebuyhouse',
      mediaUrl: null,
      remark: null,
      shareTitle: null
    }
  },
  props: {
    houseInfo: {
      default: () => {
        return {
          countView: 0,
          cancelCang: 0,
          countCang: 0,
          countShare: 0
        }
      },
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  watch: {
    houseInfo (val, oldVal) {
      this.infoList = this.formatImg(val)
      this.remark = val.houseDesc.substring(0, 60) + '...'
      // window.title = this.shareTitle
      // console.log(window)
      document.title = this.shareTitle
      if (val.advantage) {
        this.shareHashtags = val.advantage.replace(/\s/g, '_').replace(/,/g, '#') || 'Ebuyhouse'
        console.log(this.shareHashtags)
      }
      // document.write(`<meta property="og:image" content="https://www.your-domain.com/path/image.jpg" />`)
      // 插入 meta 标签
      var oMeta = document.createElement('meta')
      console.log(this.infoList[0].imgUrl)
      oMeta.content = this.infoList[0].imgUrl.imgUrl
      oMeta.setAttribute('property', 'og:image')
      document.getElementsByTagName('head')[0].appendChild(oMeta)
      // var oMetas = document.createElement('meta')
      // oMetas.content = this.houseInfo.remark
      // oMetas.name = 'description'
      this.params = val
      // document.getElementsByTagName('head')[0].prepend(oMetas)
    }
  },
  updated () {
    if (this.$refs.videos) {
      const _this = this
      this.$refs.videos[0].addEventListener('canplaythrough', function () {
        _this.time = `${parseInt(_this.$refs.videos[0].duration / 60)}:${parseInt(_this.$refs.videos[0].duration % 60) < 10 ? ('0' + parseInt(_this.$refs.videos[0].duration % 60)) : parseInt(_this.$refs.videos[0].duration % 60)}`
      })
    }
  },
  created () {
  },
  mounted () {
    var oMeta = document.createElement('meta')
    oMeta.content = 'https://zjcebuyhouse.s3.amazonaws.com/ebuyhouse_images/1548124263285_747.jpg'
    oMeta.setAttribute('property', 'og:image')
    document.getElementsByTagName('head')[0].prepend(oMeta)
  },
  methods: {
    formatImg (_info) {
      // if () {}
      // houseImg
      let carouselList = []
      // 定义变量接收处理
      let houseImg = _info.houseImg ? stringToArray(_info.houseImg) : 0
      let houseVideo = _info.houseVideo ? JSON.parse(_info.houseVideo) : null
      const carouselListLength = Math.ceil(houseImg.length / 5)
      this.mediaUrl = _info.imgUrl
      this.shareTitle = _info.street + ' ' + _info.price
      this.remark = _info.houseDesc
      for (let i = 0; i < carouselListLength; i++) {
        carouselList.push({
          id: i,
          children: [],
          video: {
            type: 'video',
            imgUrl: houseVideo ? houseVideo.img : (_info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png'),
            videoUrl: houseVideo ? houseVideo.video : '',
            isHaveUrl: houseVideo
          },
          imgUrl: {
            id: i,
            type: 'img',
            imgUrl: _info.imgUrl ? _info.imgUrl : (_info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png'),
            isHaveUrl: _info.imgUrl !== ''
          }
        })
        for (let j = 0; j < 5; j++) {
          if (i * 5 + j < houseImg.length) {
            carouselList[i].children.push({
              id: i * 5 + j,
              type: 'img',
              imgUrl: houseImg[i * 5 + j],
              isHaveUrl: true
            })
          } else {
            // 添加默认
            carouselList[i].children.push({
              id: i * 5 + j,
              type: 'img',
              imgUrl: (_info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png'),
              isHaveUrl: false
            })
          }
        }
      }
      if (carouselListLength === 0) {
        carouselList.push({
          id: 0,
          children: [],
          video: {
            type: 'video',
            imgUrl: _info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png',
            videoUrl: houseVideo ? houseVideo.video : '',
            isHaveUrl: houseVideo
          },
          imgUrl: {
            id: 0,
            type: 'img',
            imgUrl: _info.imgUrl ? _info.imgUrl : (_info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png'),
            isHaveUrl: _info.imgUrl !== ''
          }
        })
        for (let j = 0; j < 5; j++) {
          carouselList[0].children.push({
            id: j,
            type: 'img',
            imgUrl: _info.dealType === 1 ? '/static/img/default/default_06.png' : '/static/img/default/default_07.png',
            isHaveUrl: false
          })
        }
      }
      return carouselList
    },
    viewChange (_info) {
      this.$emit('UpMagerChange', {selectPic: _info, isShowBtn: true})
    },
    openChange (e) {
      this.$axios.post(`${this.SH_HOUSE_PROD_PATH}thouses/share/add`, {houseId: this.houseInfo.houseId})
        .then(res => {
          console.log(res)
          this.houseInfo.countShare++
        })
    },
    collectionHouse (status = 0, id, type, _item) {
      if (!this.token) {
        this.$store.commit('signOut', true)
      } else {
        this.$axios({
          url: `${this.SH_HOUSE_PROD_PATH}thouses/add-collection/house`,
          method: 'POST',
          data: {collection: status, houseId: id, dealType: type}
        })
          .then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg)
              if (status === 0) {
                _item.cancelCang = 1
                _item.countCang++
              } else {
                _item.cancelCang = 0
                _item.countCang--
              }
              console.log(this.params)
            } else {
              this.$message.info(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
            // this.$message.error(err)
          })
      }
    },
    switchTabPicArrowLeft () {
      this.$refs.tatilsCarousel.prev()
    },
    switchTabPicArrowRight () {
      this.$refs.tatilsCarousel.next()
    }
  }
}
</script>
<style lang="sass" scoped>
  .imageCarousel
    width: 100%
    height: 360px
    margin-bottom: 40px
    position: relative
    .ebuyhouse-share
      position: absolute
      right: 0
      top: -30px
      display: flex
      .bings
        display: flex
        height: 30px
        width: 300px
        background-color: #F2F2F2
        align-items: center
        li
          flex: 0 0 calc( 100% / 3 )
          display: flex
          align-items: center
          justify-content: center
          margin: 5px 0
          border-right: 1px solid #777777
          cursor: pointer
          &:last-child
            border-right: none
          span
            font-size: 14px
            color: #444444
            margin-left: 5px
        .visitMark
          i
            font-size: 22px
            color: #555555
          &:hover
            span
              font-weight: bold
              color: #1281fc
            i
              // font-weight: bold
              color: #1281fc
        .cangMark
          font-size: 18px
          &:hover
            span
              font-weight: bold
              color: #1281fc
            i
              font-weight: bold
              color: #1281fc
        .shareMark
          font-size: 18px
          &:hover
            span
              font-weight: bold
              color: #1281fc
            i
              font-weight: bold
              color: #1281fc
    /deep/ .el-carousel
      height: 100%
      .el-carousel__container
        height: 100%
      .el-carousel__indicators.el-carousel__indicators--outside
        display: none
    .carousel-item
      .imagesList
        display: flex
        width: 100%
        flex-direction: row
        height: 100%
        .leftTitleImg
          flex: 0 0 38.22%
          display: flex
          justify-content: center
          align-items: center
          max-height: 100%
          cursor: zoom-in
          img
            width: 100%
            height: 100%
        .rightIntroImg
          flex: 0 0 calc( 100% - 38.22% )
          .img-box
            display: flex
            flex-direction: row
            flex-wrap: wrap
            height: 100%
            width: 100%
            align-items: baseline
            .r-img-item
              width: calc( ( 100% - 20px ) / 3 )
              margin-left: 5px
              height: calc( 50% - 2px )
              cursor: zoom-in
              img
                width: 100%
                height: 100%
            .video
              font-size: 0
              position: relative
              cursor: pointer
              &:before
                width: 100%
                height: 100%
                background-color: rgba(0, 0, 0, 0.6)
                position: absolute
                left: 0
                top: 0
                content: ''
                z-index: 9
              .mask
                background-position: center
                background-size: 100%
                background-repeat: no-repeat
                position: relative
                top: 0
                width: 100%
                height: 100%
                video
                  display: flex
                  width: 100%
                  height: 100%
                .icon-auto
                  position: absolute
                  top: 50%
                  left: 50%
                  width: 50px
                  height: 50px
                  margin: -25px 0 0 -25px
                  z-index: 10
                span
                  position: absolute
                  bottom: 10px
                  right: 10px
                  display: flex
                  padding: 5px 10px
                  background-color: #0e0e0d
                  border-radius: 10px
                  height: 20px
                  font-size: 14px
                  color: #fff
                  line-heihgt: 20px
                  justify-content: center
                  align-items: center
                  z-index: 10
              // ba
    .switchTabCarousel
      width: 100%
      position: absolute
      top: calc( 50% - 135px / 2 )
      opacity: 0
      transition: opacity .5s ease
      &.hoverAction
        opacity: 1 !important
        transition: opacity .5s ease
      .arrowLift
        position: absolute
        left: -50px
        cursor: pointer
      .arrowRight
        position: absolute
        right: -50px
        transform: rotate(180deg)
        cursor: pointer
</style>
