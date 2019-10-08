<template>
  <el-row class="ConsultationViews">
    <el-col :span="24" class="topView">
      <header class="topComponent">
        <consultation-top-component></consultation-top-component>
      </header>
    </el-col>
    <el-col :span="24" class="contentView">
      <header class="Navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!cateInfo.status" :to="{ path: '/information' }">Recent Posts</el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="{ name: cateInfo.name, query: cateInfo.query }">{{cateInfo.title}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="info.status">{{info.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </header>
      <footer class="intro">
        <section class="leftContent">
          <router-view @UploaderInfo="infoChange" @UploaderCateInfo="CateInfoChange"></router-view>
        </section>
        <section class="rightComponents">
          <consultation-right-components></consultation-right-components>
        </section>
      </footer>
    </el-col>
    <el-col :span="24" class="footerInfos">
      <footer class="bottomComponent">
        <!-- <consultation-bottom-component></consultation-bottom-component> -->
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import topComponent from '@/components/consultation/topComponent'
import RightComponents from '@/components/consultation/rightComponents'
// import bottomComponent from '@/components/consultation/bottomComponent'
export default {
  components: {
    'consultation-top-component': topComponent,
    'consultation-right-components': RightComponents
    // 'consultation-bottom-component': bottomComponent
  },
  data () {
    return {
      info: {},
      cateInfo: {}
    }
  },
  beforeCreate () {
    // 关闭主组件 （footer）
    // this.$emit('childToParentComponent', { showFooter: true, bgOpacityNone: true })
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if (scrollTop < 100) {
        this.$emit('childToParentComponent', { showFooter: true, bgOpacityNone: true })
      } else {
        this.$emit('childToParentComponent', { showFooter: true, bgOpacityNone: false })
      }
    },
    infoChange (_info) {
      this.info = _info
    },
    CateInfoChange (_info) {
      this.cateInfo = _info
    }
  }
}
</script>
<style lang="sass" scoped>
  .ConsultationViews
    margin: 0 auto
    display: flex
    // padding: 0 9%
    background-color: #f4f4f4
    flex-direction: column
    .topView
      // height: 28.75em
      width: 100%
      .topComponent
        display: flex
        width: 100%
        height: 100%
    .contentView
      width: 100%
      padding: 0 9%
      .Navigation
        height: 70px
        display: flex
        align-items: center
      .intro
        display: flex
        width: 100%
        .leftContent
          flex: 0 0 calc( 100% - 19.625em )
        .rightComponents
          flex: 0 0 19.625em
    .footerInfos
      width: 100%
      .bottomComponent
        width: 100%
        display: flex
        justify-content: center
        margin-top: 150px
</style>
