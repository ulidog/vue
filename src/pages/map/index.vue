<template>
  <el-row class="mapViews" v-loading="loadingConfig.gobalLoading">
    <!-- 地图房源弹窗列表 -->
    <map-house-layer v-if= 'showHouseLayer.status' @click="changeShowHouseLayer"></map-house-layer>
    <el-col :span="24" class="map-box">
      <header class="topComponent">
        <map-top-header></map-top-header>
      </header>
      <footer class="mapAndIntro">
        <section class="leftMap">
          <map-custom-google-map :loadingConfig="loadingConfig" @_loadingChange="loadingChange" @_pageConfig="pageChange"></map-custom-google-map>
        </section>
        <section class="rightIntro">
          <map-introduction :loadingConfig="loadingConfig" :pageConfig="pageConfig"></map-introduction>
        </section>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import topHeader from '@/components/map/topHeader'
import customGoogleMap from '@/components/map/customGoogleMap'
import introduction from '@/components/map/introduction'
import houseLayer from '@/components/map/houseLayer'
export default {
  components: {
    'map-top-header': topHeader,
    'map-custom-google-map': customGoogleMap,
    'map-introduction': introduction,
    'map-house-layer': houseLayer
  },
  data () {
    return {
      loadingConfig: {
        gobalLoading: true,
        mapLoading: true,
        listLoading: true
      },
      pageConfig: {
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      showHouseLayer: 'showHouseLayer'
    })
  },
  methods: {
    changeShowHouseLayer () {
      this.$store.commit('SHOW_HOUSE_LAYER', false)
    },
    loadingChange (_params = {}) {
      // this.loadingConfig
      Object.assign(this.loadingConfig, _params)
    },
    pageChange (_params = {}) {
      Object.assign(this.pageConfig, _params)
    },
    closeLayer () {
      this.$store.commit('SHOW_HOUSE_LAYER', false)
    }
  },
  created () {
    // 关闭主组件 （footer）
    this.$emit('childToParentComponent', { showFooter: true })
  },
  mounted () {
    // 关闭主组件 （footer）
    this.$emit('childToParentComponent', { showFooter: true })
  },
  destroyed () {
    this.$emit('childToParentComponent', { showFooter: false })
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1400px)
    .leftMap,.rightIntro
      flex: 0 0 50%
  @media screen and (min-width: 800px) and (max-width: 1400px)
    .leftMap
      flex: 0 0 60%
    .rightIntro
      flex: 0 0 40%
  @media screen and (max-width: 800px)
    .leftMap
      flex: 0 0 0
    .rightIntro
      flex: 0 0 100%
  .mapViews
    margin-top: 60px
    background-color: #f3f4f5
    display: flex
    width: 100%
    height: calc( 100vh - 60px )
    .map-box
      height: 100%
      flex-direction: column
      .topComponent
        width: 100%
        height: 5.3125em
        position: relative
        z-index: 9
        box-shadow: 0px 1px 10px 1px #ddd
      .mapAndIntro
        height: calc( 100% - 5.3125em )
        width: 100%
        display: flex
        position: relative
        z-index: 5
        .leftMap,.rightIntro
          transition: all .5s cubic-bezier(1, 1, 0, 0)
        .rightIntro
          position: relative
          z-index: 3
          box-shadow: -1px 3px 10px #ddd

</style>
