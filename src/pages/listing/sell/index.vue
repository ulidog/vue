<template>
  <el-row class="ListingSellViews" v-loading="loading">
    <el-col :span="24">
      <sell-image-carousel :houseInfo="houseInfo"></sell-image-carousel>
    </el-col>
    <el-col :span="24" class="contentMargin">
      <section class="introduction">
        <sell-introduction :houseInfo="houseInfo"></sell-introduction>
        <sell-homeowner-information :houseInfo="houseInfo"></sell-homeowner-information>
      </section>
      <section class="bottoms-content">
        <sell-voice-map :houseInfo="houseInfo"></sell-voice-map>
      </section>
    </el-col>
    <el-col :span="24">
      <sell-bottom-module :titles="'Recommended housing nearby'"></sell-bottom-module>
    </el-col>
  </el-row>
</template>
<script>
import imageCarousel from '@/components/listing/imageCarousel'
import introduction from '@/components/listing/introduction'
import homeownerInformation from '@/components/listing/homeownerInformation'
import voiceMap from '@/components/listing/voiceMap'
import bottomModule from '@/components/listing/bottomModule'
export default {
  components: {
    'sell-image-carousel': imageCarousel,
    'sell-introduction': introduction,
    'sell-homeowner-information': homeownerInformation,
    'sell-voice-map': voiceMap,
    'sell-bottom-module': bottomModule
  },
  data () {
    return {
      loading: true,
      params: null,
      houseInfo: null
    }
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
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
    }
  },
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
    }
  }
}
</script>
<style lang="sass" scoped>
  .ListingSellViews
    .contentMargin
      margin-bottom: 4em
    .introduction
      display: flex
</style>
