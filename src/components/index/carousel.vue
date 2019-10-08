<style lang="scss" scoped>
.carousel-part{
  width: 100%;
  position: relative;
}

/deep/ .el-carousel__arrow{
  display: none!important;
  width: 3rem;
  height: 3rem;
  background-color: rgba(31,45,61,0.5);
}

/deep/ .el-carousel__arrow i{
  font-size: 1.5rem;
}
@media screen and (max-width: 1600px) {
    .el-more {
      display: none;
    }
}
.el-more {
  position: absolute;
  top:300px;
  left:50%;
  transform: translateX(-50%);
}
.el-carousel__item img.banner-img{
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 1200px) {
  .el-carousel__item .mainH3 > a {
    white-space: nowrap;
    color: #1281fc;
    font-size: 3.75rem;
    position: absolute;
    top: 19%;
    left: 50%;
    transform: translateX(-50%);
    transition: color .5s ease;
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}
@media screen and (max-width: 1200px) {
  .el-carousel__item .mainH3 > a {
    white-space: nowrap;
    color: rgba(255,255,255,1);
    font-size: 3rem;
    position: absolute;
    top: 19%;
    left: 50%;
    transform: translateX(-50%);
    transition: color .5s ease;
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}
@media screen and (min-width: 1200px) {
  .el-carousel__item .mainP {
    position: absolute;
    white-space: nowrap;
    color: #1281fc;
    font-size: 1.625rem;
    top: 29%;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}
@media screen and (max-width: 1200px) {
  .el-carousel__item .mainP {
    position: absolute;
    white-space: nowrap;
    color: #1281fc;
    font-size: 1.5rem;
    top: 28.8%;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}
@media screen and (min-width: 1200px) {
  .el-carousel__item .txtH3 a {
    white-space: nowrap;
    color: #1281fc;
    font-size: 3.75rem;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}
@media screen and (max-width: 1200px) {
  .el-carousel__item .txtH3 a {
    white-space: nowrap;
    color: #1281fc;
    font-size: 3rem;
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      color: #1281fc;
      transition: color .5s ease;
    }
  }
}

/deep/ .el-carousel__button{
  width: 3em;
  height: 0.5em;
  border-radius: 0.5em;
}

/deep/ .el-carousel__indicators{
  display: none!important;
}
.readMore{
  white-space: nowrap;
  color: #000;
  font-size: 1rem;
  position: absolute;
  // top: 46%;
  left: 50%;
  transform: translateX(-50%);
  &:hover {
    color: #1281fc;
    transition: color .1s ease;
  }
}
.btBox {position:absolute;top:20%;height:auto;text-align:center;width: 32%;left: 34%;}
.btBox .biantai1{display:inline-block;width: 100%;}
.btBox .biantai2{display: none;}
.btBox:hover .biantai1{display: none}
.btBox:hover .biantai2{display: inline-block;width: 100%;}
.btBox a.biantaiA{position: absolute;bottom:4%;color:#1281fc;margin:0 auto;z-index:100;height:2.8rem;border-radius:1.4rem;line-height:2.8rem;font-size:1.125rem;width:7.725rem;background-color: rgba(255, 255, 255, 1);}
a.biantaiA:hover{background-color:#1281fc;color:#fff;transition: all linear 0}
@media screen and (max-width: 750px) {
  .btBox{
    width: 50%;
    left: 25%;
  }
}
@media screen and (max-width: 1200px) {
  .btBox a.biantaiA{
    height: 2rem;
    line-height: 2rem;
    border-radius: 1rem;
    width: 6rem;
    font-size: 1rem;
  }
}
</style>

<template>
  <div class="carousel-part">
    <el-carousel trigger="click" :autoplay="false" :height="carouselHeight" ref="homeCarousel" >
      <el-carousel-item v-for="(item, index) in carouselData" :key="index">
        <img class="banner-img" :src="item.src" />
        <div class="btBox">
          <router-link :to="item.URL_NAME">
            <img class="biantai1" src="/static/img/index/bannerTo1.png" alt="">
            <img class="biantai2" src="/static/img/index/bannerTo2.png" alt="">
          </router-link>
          <!-- <router-link class="biantaiA readMore" style="" :to="item.URL_NAME">Read More</router-link> -->
        </div>
        <!-- <router-link :to="item.URL_NAME"  style="display:inline-block;">
          <h3 class="mainH3">
            <a>{{item.slogan || ""}}</a>
          </h3>
          <p class="mainP">{{item.minTit || ""}}</p>
          <h3 class="txtH3">
            <a>{{item.usTit || ""}}</a>
          </h3>
        </router-link>
        <router-link class="readMore" :to="item.URL_NAME">Read More →</router-link> -->
      </el-carousel-item>
    </el-carousel>
    <vue-search @searchIndex="changeCarouselIndex"></vue-search>
  </div>
</template>

<script>
import VueSearch from './search.vue'

let uniqueKey = 1

export default {
  data () {
    return {
      'carouselData': [],
      'carouselHeight': '500px'
    }
  },
  'components': {
    'vue-search': VueSearch
  },
  'methods': {
    changeCarouselIndex (_index) {
      return false
      // this.$refs.homeCarousel.setActiveItem(_index)
    },
    getUniqueKey () {
      return uniqueKey++
    },
    getCarouselData () {
      this.carouselData = [
        {
          src: '/static/img/index/notbanner.png',
          slogan: 'Buy, Sell, or Rent',
          minTit: 'Complete The Transaction Yourself',
          usTit: 'Safe and Fast ~ No Fees!',
          URL_NAME: '/article/buy-and-sell'
        }
        // {
        //   src: '/static/img/index/banner_pho.jpg',
        //   slogan: 'List Your Home For FREE!',
        //   minTit: 'Complete The Transaction Yourself',
        //   usTit: 'Safe and Fast ~ No Fees!',
        //   URL_NAME: '/article/buy-and-sell'
        // },
        // {
        //   src: '/static/img/index/banner_pho02.png',
        //   slogan: 'Homes For Sale',
        //   minTit: 'Complete The Transaction Yourself',
        //   usTit: 'Safe and Fast ~ No Fees!',
        //   URL_NAME: '/article/buy-and-sell'
        // },
        // {
        //   src: '/static/img/index/banner_pho03.png',
        //   slogan: 'Homes For Rent',
        //   minTit: 'Complete The Transaction Yourself',
        //   usTit: 'Safe and Fast ~ No Fees!',
        //   URL_NAME: '/article/buy-and-sell'
        // }
      ]
    },
    calcCarouselHeight () {
      window.setTimeout(() => {
        const img = window.document.querySelector('.carousel-part .banner-img')
        if (img && img.width && img.height) {
          if (window.innerWidth > 750) {
            // this.carouselHeight = `${Math.max(1200, window.innerWidth) / img.width * img.height}px`
            // 根据当前项目的设计稿轮播图初始宽1920，高886，在保证缩放的情况下图片不变形自适应高度采用下列计算公式
            this.carouselHeight = `${(500 * window.innerWidth) / 1920}px`
          }
          // 不大于750时给固定宽，保证轮播中的功能不缺失
          if (window.innerWidth <= 750) {
            this.carouselHeight = `350px`
          }
        } else {
          this.calcCarouselHeight()
        }
      }, 0)
    }
  },
  mounted () {
    this.getCarouselData()
    this.$nextTick(() => {
      this.calcCarouselHeight()
      window.addEventListener('resize', this.calcCarouselHeight)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.calcCarouselHeight)
  }
}
</script>
