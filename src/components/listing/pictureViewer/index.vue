<template>
  <section class="pictureViews" @click="globalClose">
    <section class="viewBox">
      <header class="right-btn-num">
        <span>{{currentCarouse}}/{{infoImgList.length}}</span>
        <img src="/static/img/listing/icons/close.png" alt="close.png" @click.stop="closePic">
      </header>
      <section class="content">
        <el-tabs v-model="activeType" @tab-click="handleClick" class="tab-group">
          <el-tab-pane label="Picture" name="picture" class="tab-pic-group">
            <el-carousel
              ref="picCarouselGroup"
              class="tab-pic-carousel-box"
              :initial-index="defaultCarouse"
              height="675px"
              arrow="never"
              :loop="false"
              indicator-position="none"
              @change="carouselChange"
              :autoplay="false">
              <el-carousel-item v-for="item in infoImgList" :key="item.id" class="img-box-item">
                <img v-lazy="item.url" :alt="item.id" class="pic-size" :key="item.id">
              </el-carousel-item>
            </el-carousel>
            <ul class="switchTabCarousel hoverAction">
              <li class="arrowLift" @click.stop="switchTabPicArrowLeft" v-show="currentCarouse !== 1">
                <img src="/static/img/listing/icons/array_l.png" alt="l">
              </li>
              <li class="arrowRight" @click.stop="switchTabPicArrowRight" v-show="currentCarouse !== infoImgList.length">
                <img style="" src="/static/img/listing/icons/array_l.png" alt="r">
              </li>
            </ul>
            <section ref="picScrollRef" class="pic-item-radio">
              <ul class="pic-sign-item-box" :style="{'width': `calc( 20% * ${infoImgList.length} )`}">
                <li :class="['pic-item-pro-view', (item.id+1) == currentCarouse ? 'action' : '']" v-for="item in infoImgList" :key="item.id" :style="{'flex': `0 0 calc( 100% / ${infoImgList.length})`}" @click="switchTabPic(item)">
                  <img v-lazy="item.url" :alt="item.id" ::key="item.id">
                </li>
              </ul>
            </section>
          </el-tab-pane>
          <el-tab-pane label="Video" name="video" class="tab-video-group">
            <section class="vedio-box">
              <video :src="videoUrlObject.video" ref="video" class="video" controls="controls" :poster="videoUrlObject.img"></video>
            </section>
          </el-tab-pane>
          <el-tab-pane label="Map" name="map" class="tab-map-group">
            <section class="map-box">
              <google-map :center="mapInfo.mapCenter" :zoom="mapInfo.mapZoom" :marsks="mapInfo.mapMarsks"></google-map>
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>
    </section>
  </section>
</template>
<script>
import googleMap from '@/components/listing/googleMap'
import Vue from 'vue'
const stringToArray = Vue.filter('stringToArray')
export default {
  components: {
    'google-map': googleMap
  },
  data () {
    return {
      activeType: 'picture',
      infoImgList: [],
      // 轮播参数
      isHover: false,
      defaultCarouse: 0,
      currentCarouse: 1,
      // 视频参数
      videoUrlObject: {},
      defaultHouseInfo: {
        imgList: [],
        videoList: []
      },
      // 地图
      mapInfo: {
        mapCenter: {
          lat: 0,
          lng: 0
        },
        mapZoom: 16,
        mapMarsks: {
          isShow: false,
          number: 1,
          marsksList: [
            {
              id: 0,
              position: {
                lat: 0,
                lng: 0
              }
            }
          ]
        }
      },
      timerScroll: null
    }
  },
  props: {
    houseInfo: {
      default: () => {},
      type: Object
    },
    selectPic: {
      default: () => {},
      type: Object
    },
    isShowPictureViewer: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    houseInfo (val, oldVal) {
      this.infoImgList = this.formatImg(val)
      this.videoUrlObject = this.formatVideo(val)
      this.formatData(val)
    },
    selectPic (val, oldVal) {
      // console.log(val)
      if (val.isHaveUrl) {
        if (val.type === 'img') {
          this.activeType = 'picture'
          const pic = this.searchPic(val.imgUrl, this.infoImgList)
          this.currentCarouse = pic.id + 1
          this.switchTabPic(pic)
        } else {
          this.activeType = 'video'
        }
      }
    },
    isShowPictureViewer (_new, _old) {
      if (_new) {
        this.openKeyChange()
      } else {
        this.colseKeyChange()
      }
    }
  },
  // created () {
  //   this.openKeyChange()
  // },
  methods: {
    openKeyChange () {
      // let self = this
      // document.onkeydown = function (event) {
      //   // eslint-disable-next-line no-caller
      //   let e = event || window.event || arguments.callee.caller.arguments[0]
      //   if (self.activeType === 'picture') {
      //     if (e.keyCode === 37) {
      //       self.switchTabPicArrowLeft()
      //     }
      //     if (e.keyCode === 39) {
      //       self.switchTabPicArrowRight()
      //     }
      //     e.preventDefault()
      //   }
      // }
      // window
      window.addEventListener('keydown', this.keydownChange)
    },
    colseKeyChange () {
      window.removeEventListener('keydown', this.keydownChange)
    },
    keydownChange (event) {
      let self = this
      if (self.activeType === 'picture') {
        if (event.keyCode === 37) {
          self.switchTabPicArrowLeft()
        }
        if (event.keyCode === 39) {
          self.switchTabPicArrowRight()
        }
        event.preventDefault()
      }
    },
    formatImg (_info) {
      const imgList = _info.houseImg ? stringToArray(_info.houseImg) : []
      if (imgList.length !== 0) {
        return imgList.map((item, index) => {
          return {
            id: index,
            url: item
          }
        })
      } else {
        return [{id: 0, url: _info.imgUrl}]
      }
    },
    formatVideo (_info) {
      return _info.houseVideo ? JSON.parse(_info.houseVideo) : {}
    },
    formatData (_info) {
      this.mapInfo.mapCenter.lat = _info.latitude
      this.mapInfo.mapCenter.lng = _info.longitude
      this.mapInfo.mapMarsks.marsksList[0].position.lat = _info.latitude
      this.mapInfo.mapMarsks.marsksList[0].position.lng = _info.longitude
      this.mapInfo.mapMarsks.isShow = true
    },
    searchPic (_info, list) {
      return list.filter(item => {
        return item.url === _info
      })[0]
    },
    carouselChange (_new, _old) {
      this.currentCarouse = _new + 1
      // console.log(_new)
      // 计算底部滚动条位置
      const infoImgListLength = this.infoImgList.length
      if (infoImgListLength > 5 && _new > 2) {
        const clientWidth = document.body.clientWidth
        // console.log()
        // if (clientWidth > 1200) {
        const onceWith = clientWidth > 1200 ? 1200 * 0.2 : clientWidth * 0.2
        const defaultLeft = 0
        const needMovingWith = defaultLeft + (_new - 2) * onceWith
        // 进行移动操作
        if (this.$refs['picScrollRef']) {
          // this.$refs['picScrollRef'].scrollTo(needMovingWith, 0)
          // console.log(this.$refs)
          const _oldScrollTop = this.$refs['picScrollRef'].scrollTop
          const _oldScrollLeft = this.$refs['picScrollRef'].scrollLeft
          // console.log(_oldScrollTop, _oldScrollLeft)
          this.animateScrollTo(this.$refs['picScrollRef'], {_oldLeft: _oldScrollLeft, _oldTop: _oldScrollTop}, {_left: needMovingWith, _top: 0})
        }
        // }
      } else {
        // 进行移动操作
        if (this.$refs['picScrollRef']) {
          const _oldScrollTop = this.$refs['picScrollRef'].scrollTop
          // this.$refs['picScrollRef'].scrollTo(0, 0)
          this.animateScrollTo(this.$refs['picScrollRef'], {_oldLeft: _oldScrollTop}, {_left: 0})
        }
      }
    },
    animateScrollTo (ref, _oldposition = {_oldLeft: 0}, _position, timer = 1) {
      clearInterval(this.timerScroll)
      let {_left, _top} = _position
      let {_oldLeft} = _oldposition
      this.timerScroll = setInterval(() => {
        if (_oldLeft > (_left - 10) && _oldLeft < (_left + 10)) {
          clearInterval(this.timerScroll)
        } else if (_oldLeft < _left) {
          _oldLeft += 10
        } else if (_oldLeft > _left) {
          _oldLeft -= 10
        }
        ref.scrollTo(_oldLeft, _top)
      }, timer)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    switchTabPic (_info) {
      this.$refs.picCarouselGroup.setActiveItem(_info.id)
    },
    switchTabPicArrowLeft () {
      this.$refs.picCarouselGroup.prev()
    },
    switchTabPicArrowRight () {
      this.$refs.picCarouselGroup.next()
    },
    closePic () {
      this.$emit('UpMagerCloseChange')
    },
    globalClose (e) {
      // console.log(e)
      const targetRef = e.target
      if (targetRef.nodeName === 'SECTION' && targetRef.className.includes('pictureViews')) {
        this.closePic()
      }
    }
  },
  destroyed () {
    this.colseKeyChange()
  }
}
</script>
<style lang="sass" scoped>
  .pictureViews
    width: 100vw
    height: 100vh
    background-color: rgba(0,0,0,.8)
    display: flex
    justify-content: center
    align-items: center
    position: relative
    .viewBox
      width: 1200px
      height: 860px
      .right-btn-num
        position: absolute
        top: 15px
        right: 3em
        display: flex
        color: #fff
        display: flex
        align-items: center
        span
          font-size: 1.5em
          color: #fff
          margin-right: 1.2em
        img
          cursor: pointer
      .content
        width: 100%
        .tab-group
          width: 100%
          /deep/ .el-tabs__header
            .el-tabs__nav-wrap
              &:after
                width: 0 !important
                content: ''
              .el-tabs__item
                color: #fff
                font-size: 1.5em
          /deep/ .el-tabs__content
            overflow: inherit
          .tab-pic-group
            width: 100%
            .tab-pic-carousel-box
              // background-color: transparent
              background-color: #fff
              overflow: hidden
              .img-box-item
                display: flex
                justify-content: center
                align-items: center
                .pic-size
                  max-width: 100%
                  max-height: 100%
            .switchTabCarousel
              width: 100%
              position: absolute
              z-index: 9
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
            .pic-item-radio
              width: 100%
              margin-top: 10px
              overflow-x: scroll
              overflow-y: hidden
              &::-webkit-scrollbar
                width: 0
                height: 10px
              &::-webkit-scrollbar-thumb
                border-radius: 0px
                -webkit-box-shadow: inset 0 0 5px #1281FC
                background: #1281FC
              &::-webkit-scrollbar-track
                // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
                border-radius: 0
                background: trnasparent
              .pic-sign-item-box
                display: flex
                .pic-item-pro-view
                  height: 135px
                  margin-right: 5px
                  display: flex
                  align-items: center
                  justify-content: center
                  overflow: hidden
                  &.action
                    border: 1px solid #1281FC
                  img
                    width: 100%
          .tab-video-group
            .vedio-box
              height: 650px
              background-color: #fff
              width: 100%
              .video
                width: 100%
                height: 100%
          .tab-map-group
            .map-box
              width: 100%
              height: 800px
              background-color: #fff
</style>
