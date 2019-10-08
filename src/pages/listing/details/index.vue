<template>
  <el-row class="ListingRentViews" v-loading="loading">
    <el-col :span="24">
      <utils-details-image-carousel :houseInfo="houseInfo" @UpMagerChange="_UpMagerChange"></utils-details-image-carousel>
    </el-col>
    <el-col :span="24" class="contentMargin">
      <section class="price-label-info">
        <utils-price-label-info :houseInfo="houseInfo"></utils-price-label-info>
      </section>
      <section class="introduction">
        <utils-details-introduction :houseInfo="houseInfo"></utils-details-introduction>
        <utils-details-homeowner-information :houseInfo="houseInfo" :cityId="cityId"></utils-details-homeowner-information>
      </section>
      <!-- <section class="bottoms-content">
        <utils-details-voice-map :houseInfo="houseInfo"></utils-details-voice-map>
      </section> -->
      <!-- <utils-details-service-cooperation></utils-details-service-cooperation> -->
      <!-- <utils-details-nearby-service-provider :houseInfo="houseInfo"></utils-details-nearby-service-provider> -->
      <utils-details-bottom-module :titles="'Recommended Houses Nearby'" :houseInfo="houseInfo"></utils-details-bottom-module>
    </el-col>
    <el-col :span="24">
      <utils-details-nearby-service-provider :houseInfo="houseInfo"></utils-details-nearby-service-provider>
    </el-col>
    <el-col class="viewPic" :span="24" v-show="isShowPictureViewer">
      <utils-picture-viewer :houseInfo="houseInfo" :selectPic="selectPic" :isShowPictureViewer="isShowPictureViewer" @UpMagerCloseChange="UpMagerCloseChange"></utils-picture-viewer>
    </el-col>
    <!-- <el-col>
      <utils-step-carousel :stepIndex="stepIndex" :stepModule="stepRent"></utils-step-carousel>
    </el-col> -->
  </el-row>
</template>
<script>
import imageCarousel from '@/components/listing/imageCarousel'
import priceLabelInfo from '@/components/listing/priceLabelInfo'
import introduction from '@/components/listing/introduction'
import homeownerInformation from '@/components/listing/homeownerInformation/index'
import serviceCooperation from '@/components/listing/homeownerInformation/serviceCooperation'
import nearbyServiceProvider from '@/components/listing/homeownerInformation/nearbyServiceProvider'
// import voiceMap from '@/components/listing/voiceMap'
import bottomModule from '@/components/listing/bottomModule'
import pictureViewer from '@/components/listing/pictureViewer'
// import stepCarousel from '@/components/step/stepModule/stepRent'
// import stepMock from '@/utils/mock'
export default {
  components: {
    'utils-details-image-carousel': imageCarousel,
    'utils-price-label-info': priceLabelInfo,
    'utils-details-introduction': introduction,
    'utils-details-homeowner-information': homeownerInformation,
    'utils-details-service-cooperation': serviceCooperation,
    'utils-details-nearby-service-provider': nearbyServiceProvider,
    // 'utils-details-voice-map': voiceMap,
    'utils-details-bottom-module': bottomModule,
    'utils-picture-viewer': pictureViewer
    // 'utils-step-carousel': stepCarousel
  },
  data () {
    return {
      loading: true,
      params: null,
      houseInfo: null,
      isShowPictureViewer: false,
      selectPic: {},
      cityId: null,
      stepIndex: 1 // 步骤初始索引
    }
  },
  created () {
    try {
      this.params = this.$route.params
      if (this.params.houseId !== undefined) {
        this.init()
      }
    } catch (err) {
      this.$message({
        message: 'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
      return
    }
    // 设置背景
    this.$emit('UpParamsChange', {isColorFFF: true})
  },
  // computed: {
  //   stepRent () {
  //     return stepMock.stepRent
  //   }
  // },
  methods: {
    init () {
      this.fetchHouseInfo()
    },
    fetchHouseInfo () {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/item`, {params: {houseId: _this.params.houseId}})
        .then(res => {
          if (res.data.success) {
            _this.houseInfo = res.data.data
            console.log(_this.houseInfo.cityId)
            this.cityId = _this.houseInfo.cityId
            setTimeout(() => {
              _this.loading = false
            }, 1000)
          }
          // console.log(res)
          setTimeout(() => {
            _this.loading = false
          }, 1000)
        })
        .catch(err => {
          setTimeout(() => {
            _this.loading = false
          }, 1000)
          console.log(err)
        })
    },
    _UpMagerChange (_info) {
      if (_info.selectPic.isHaveUrl) {
        this.isShowPictureViewer = _info.isShowBtn
        this.selectPic = _info.selectPic
      }
    },
    // 关闭
    UpMagerCloseChange (_info) {
      this.isShowPictureViewer = false
    }
  },
  destroyed () {
    // 销毁实例时
    this.$emit('UpParamsChange', {isColorFFF: false})
  }
}
</script>
<style lang="sass" scoped>
  .ListingRentViews
    .contentMargin
    .introduction
      display: flex
    .viewPic
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      z-index: 9999
      display: flex
      justify-content: center
      align-items: center
</style>
