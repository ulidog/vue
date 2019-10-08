<template>
  <section class="banner-bar">
    <template v-if="bannerParam">
      <div class="banner-info">
        <el-row class="container-area">
          <el-col :xs="24" :sm="24" :lg="12" class="banner-left">
            <div @click="handleDetail()" class="speMarkSon">
              <h3 class="title">{{bannerParam.left.title}}</h3>
              <h5 class="titleSub">{{bannerParam.left.titleSub}}</h5>
              <div class="titleSub-line"></div>
              <ul class="description" style="width: auto">
                <li style="margin-bottom: 0.6rem;" v-for="(item, index) in bannerParam.left.description" :key="index">{{item}}</li>
              </ul>
            </div>
            <p><el-button class="learm" @click="handleDetail()">Learn More</el-button></p>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12" class="banner-right hidden-md-and-down">
            <h3 class="title">{{bannerParam.right.title}}</h3>
            <!-- <el-button class="el-icon-arrow-left" @click="handlePrev"></el-button>
            <el-button class="el-icon-arrow-right" @click="handleNext"></el-button> -->
            <el-button class="more-guide-btn" @click="handleGuideList(bannerParam.right.fkCategoryId)">
              <!-- <router-link :to="{path: '/guide/list', query: {fkCategoryId: bannerParam.right.fkCategoryId}}">
                More&nbsp;<i class="el-icon-arrow-right"></i>
              </router-link> -->
              More&nbsp;<i class="el-icon-arrow-right"></i>
            </el-button>
            <!-- id -->
            <el-carousel ref="bannerCarousel" class="information-carousel" height="305px" indicator-position="none" :autoplay="false" arrow="never">
              <el-carousel-item v-for="(item, index) in carouselList" :key="index">
                <ul class="information-list">
                  <!-- 只展示5个 -->
                  <li class="information-item" v-show="cIndex < 5" v-for="(cItem, cIndex) in item" :key="cIndex" @click="handleDetail(cItem.articleId)">
                    <p class="information-row">
                      <span>{{cItem.title}}</span>
                    </p>
                  </li>
                </ul>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </div>
      <img class="banner-bg" v-lazy="bannerParam.bannerUrl" alt="" :key="Math.random() * 10000">
      <!-- <el-dialog :visible.sync="dialogVisible">
        <div class="bannerDialog" v-html="bannerDialog.detail"></div>
      </el-dialog> -->
    </template>
  </section>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      carouselPageSize: 8
    }
  },
  props: {
    bannerParam: {
      type: Object,
      default: null
    },
    bannerDialog: {
      type: Object,
      default: null
    }
  },
  watch: {
    bannerParam (_new, _old) {
      console.log(_new)
    }
  },
  methods: {
    ...mapMutations({
      updataGuidePublic: 'UPDATA_GUIDE_PUBLIC'
    }),
    handlePrev () {
      console.log(this.$refs.bannerCarousel)
      this.$refs.bannerCarousel.prev()
    },
    handleNext () {
      this.$refs.bannerCarousel.next()
    },
    handleDetail (_id) {
      var articleId = _id || this.bannerParam.right.list[0].articleId
      this.$router.push({name: 'guideDetail', query: {ebuyhouse: this.$base64.encode(JSON.stringify({articleId: articleId}))}})
      // var _index = index * this.carouselPageSize + cIndex
      // this.dialogVisible = true
      // this.$emit('getInformationDetail', this.bannerParam.right.list[_index])
    },
    handleGuideList (_cid) {
      this.updataGuidePublic(Object.assign({}, this.guidePublic, {categoryId: _cid, fkCategoryId: _cid}))
      this.$router.push({
        name: 'guideList'
      })
    }
  },
  computed: {
    carouselList () {
      var carouselPageSize = this.carouselPageSize
      var listData = this.bannerParam.right.list
      var result = []
      for (var i = 0; i < listData.length; i += carouselPageSize) {
        result.push(listData.slice(i, i + carouselPageSize))
      }
      return [result[0]]
    }
  }
}
</script>
<style lang="sass" scoped>
.speMarkSon
  cursor: pointer
  &:hover
    .title
      color: #1281FC!important
    .titleSub
      color: #1281FC!important
    .titleSub-line
      background: #1281FC!important
    li
      color: #1281FC!important
.bannerDialog
  overflow-y: scroll
  height: 500px
  &::-webkit-scrollbar
    width: 4px
    height: 4px
  &::-webkit-scrollbar-thumb
    border-radius: 5px
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
    background: rgba(0,0,0,0.2)
  &::-webkit-scrollbar-track
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
    border-radius: 0
    background: trnasparent
.banner-bar
  position: relative
  .banner-info
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
    width: 100%
    .banner-left
      color: #fff
      .title
        color: inherit
        font-size: 72px
        line-height: 1em
        padding-top: 22px
      .titleSub
        color: inherit
        font-size: 30px
        min-height: 80px
        line-height: 80px
      .titleSub-line
        margin-bottom: 30px
        display: block
        height: 1px
        width: 66px
        background-color: #fff
      .description
        font-size: 24px
        line-height: 30px
        margin-bottom: 40px
        .el-col
          margin-bottom: 15px
      .el-button
        color: #fff
        font-size: 14px
        line-height: 30px
        padding: 0 14px
        border: 1px solid #fff
        border-radius: 15px
        background-color: transparent
        &:hover
          .learm
          background-color: #1281FC
          border: 1px solid #1281FC
    .banner-right
      position: relative
      color: #444
      background-color: rgba(255, 255, 255, 0.6)
      border-radius: 5px
      .more-guide-btn
        position: absolute
        bottom: -18px
        left: 50%
        transform: translateX(-50%)
        background-color: #1281FC
        color: #fff
        height: 36px
        font-size: 14px
        line-height: 36px
        cursor: pointer
        border: none
        outline: none
        z-index: 3
        padding: 0
        padding: 0 10px 0 20px
        &:hover
          background-color: #0067d9
        /deep/ span
          display: inline-block
          width: 100%
          height: 100%
          a
            padding: 0 35px
            display: inline-block
            width: 100%
            height: 100%
            color: #fff
            font-size: 14px
      // .el-icon-arrow-left
      //   left: -20px
      // .el-icon-arrow-right
      //   right: -20px
      // >.el-button
      //   z-index: 3
      //   top: 50%
      //   width: 40px
      //   height: 40px
      //   color: #fff
      //   background-color: #1281FC
      //   font-size: 18px
      //   position: absolute
      //   padding: 0
      //   cursor: pointer
      //   border: none
      //   border-radius: 0
      .title
        height: 70px
        line-height: 70px
        font-size: 24px
        padding: 0 15px
        border-bottom: 1px solid #fff
        text-align: center
        text-overflow: ellipsis
        white-space: nowrap
      .information-carousel
        .information-list
          padding: 20px 50px
          .information-item
            cursor: pointer
            font-size: 18px
            line-height: 45px
            box-sizing: border-box
            &:hover
              .information-row
                font-weight: bold
                color: #1281FC
                &::before
                  background-color: #1281FC
            .information-row
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              display: flex
              align-items: center
              >span
                flex: 1
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
              &::before
                content: ''
                display: inline-block
                vertical-align: middle
                margin-right: 20px
                width: 8px
                height: 8px
                border-radius: 50%
                background-color: #444
.banner-bg
  width: 100%
  max-height: 700px
</style>
<style lang="scss" scoped>
.container-area {
  width: 1200px;
  margin: auto
}
@media screen and (min-width: 320px) and (max-width: 1200px) {
  .container-area {
    width: auto;
  }
}
</style>
