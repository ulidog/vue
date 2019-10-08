<template>
  <section class="guideIndex">
    <header class="breadcrumbComponent">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'guideList' }">User Guide</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path === '/guide/detail'">{{publicParams.title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path === '/guide/search'">Search: {{publicParams.keyWords}}</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <section class="contentGuide">
      <section class="leftContent">
        <router-view></router-view>
      </section>
      <section class="rightContent">
        <guide-common></guide-common>
      </section>
    </section>
  </section>
</template>
<script>
import GuideCommon from '@/components/guide/common'
import { mapGetters } from 'vuex'
export default {
  components: {
    'guide-common': GuideCommon
  },
  data () {
    return {
      publicParams: {}
    }
  },
  watch: {
    guidePublic: {
      handler (_new, _old) {
        if (Object.keys(_new).lenght !== 0) {
          this.publicParams = _new
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      guidePublic: 'guidePublic'
    })
  },
  mounted () {
    console.log(this.guidePublic)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1300px)
    .guideIndex
      width: 70%
      margin: 0 auto
  @media screen and (max-width: 1200px)
    .guideIndex
      width: 100%
      padding: 5px
  .guideIndex
    margin-top: 60px
    display: flex
    flex-direction: column
    .breadcrumbComponent
      height: 30px
      color: #646464
      font-size: 16px
      padding: 15px 0
      span
        font-size: 16px
    .contentGuide
      display: flex
      .leftContent
        width: 80%
        flex: 0 0 80%
      .rightContent
        width: 20%
        flex: 0 0 20%
</style>
