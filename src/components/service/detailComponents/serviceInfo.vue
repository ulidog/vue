<template>
  <section class="serviceInfoComponent">
    <section class="serviceContent">
      <section class="headerServiceInfo">
        <section class="carouselImgVideo">
          <el-carousel indicator-position="none" @change="carouselChange" arrow="never">
            <el-carousel-item class="carousel-item-box">
              <img
                class="detail-carousel-img"
                :src="dowmCallMarge.logo || '/static/img/service/service.png'"/>
                <!-- handlerImgString(dowmCallMarge.imgUrl) || -->
            </el-carousel-item>
          </el-carousel>
          <!-- <span class="carouselItemTip">{{currentIndex}} / {{dowmCallMarge.imgs ? dowmCallMarge.imgs.length : 0}}</span> -->
        </section>
        <section class="info">
          <h4 class="compyTitle">{{dowmCallMarge.company}}</h4>
          <!-- <section class="info-item">
            <span class="label">Contact:</span>
            <span class="value">{{dowmCallMarge.contactsName}}</span>
          </section> -->
          <section class="info-item">
            <span class="label">Rating:</span>
            <span class="value">
              <el-rate
                v-model="dowmCallMarge.score"
                disabled
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <!-- <img v-for="(item, index) in parseInt(dowmCallMarge.score)" :key="index" :data-id="item" src="/static/img/service/service_star_click.png" alt="checked"> -->
            </span>
          </section>
          <section class="info-item" v-if="dowmCallMarge.websiteUrl">
            <span class="label">Website:</span>
            <span class="value"><a :href="(dowmCallMarge.websiteUrl.includes('http://') || dowmCallMarge.websiteUrl.includes('https://')) ? dowmCallMarge.websiteUrl : ('http://' + dowmCallMarge.websiteUrl)" target="_blank">{{dowmCallMarge.websiteUrl}}</a></span>
          </section>
          <section class="info-item" v-if="dowmCallMarge.phone">
            <span class="label">Phone Number:</span>
            <span class="value" v-if = "dowmCallMarge.phone && dowmCallMarge.phone.includes('(')">{{dowmCallMarge.phone}}</span>
            <span class="value" v-if = "dowmCallMarge.phone && !dowmCallMarge.phone.includes('(')">{{dowmCallMarge.phone | telephoneFormat}}</span>
            <!-- <span class="value" v-for="(citem, index) in dowmCallMarge.phones" :key="citem.phoneId">
              {{citem.phone}} {{ index !== dowmCallMarge.phones.length - 1 ? ',' : '' }}
            </span> -->
          </section>
          <section class="info-item">
            <span class="label">Business Address:</span>
            <span class="value">{{dowmCallMarge.address}}</span>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      currentIndex: 1
    }
  },
  filters: {
    phoneFormat: (phone) => {
      if (!phone) return null
      phone.toString().replace(/((?![0-9]).)+/g, '')
      return phone
    }
  },
  props: {
    dowmCallMarge: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    dowmCallMarge (_new, _old) {
      console.log(_new, _old)
    }
  },
  methods: {
    carouselChange (currentIndex, oldIndex) {
      console.log(currentIndex, oldIndex)
      this.currentIndex = currentIndex + 1
    },
    handlerImgString (_string) {
      if (!_string) return null
      let imgList = _string.split(',')
      return imgList[0]
    }
  },
  mounted () {
    console.log(this.dowmCallMarge)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 750px)
    .serviceInfoComponent
      .serviceContent
        .headerServiceInfo
          .carouselImgVideo
            width: 300px
            height: 300px
          .info
            padding-left: 50px
            .compyTitle
              font-size: 48px
  @media screen and (min-width: 320px) and (max-width: 750px)
    .serviceInfoComponent
      .serviceContent
        .headerServiceInfo
          flex-direction: column
          .carouselImgVideo
            width: 100%
            height: auto
          .info
            padding-left: 50px
            .compyTitle
              font-size: 30px
</style>

<style lang="sass" scoped>
  .serviceInfoComponent
    background-color: #fff
    transition: all .5s ease
    &:hover
      box-shadow: 10px 10px 10px -5px #ddd
    .serviceContent
      .headerServiceInfo
        display: flex
        padding: 55px 45px 50px
        background-color: #fff
        .carouselImgVideo
          border-radius: 5px
          // overflow: hidden
          transition: all .5s ease
          position: relative
          text-align: center
          .carousel-item-box
            display: flex
            align-items: center
            transition: all .5s ease
            .detail-carousel-img
              width: 100%
              max-height: 100%
          .carouselItemTip
            margin-top: 10px
            display: inline-block
            color: #323232
            font-size: 14px
        .info
          flex: 1
          transition: all .5s ease
          .compyTitle
            transition: all .5s ease
            color: #323232
            font-weight: bold
            margin-bottom: 30px
          .info-item
            display: flex
            min-height: 35px
            align-items: baseline
            overflow: hidden
            .label
              width: 200px
              color: #323232
              font-size: 22px
            .value
              flex: 1
              color: #323232
              font-size: 22px
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 1
              -webkit-box-orient: vertical
              word-break: break-word
              overflow: hidden
              >img
                margin-right: 5px
              >a
                color: #1281FC
                cursor: pointer
</style>
