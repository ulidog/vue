<template>
  <section class="service-page">
    <section class="service-page-bg">
      <header class="history-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/service' }">Service</el-breadcrumb-item>
          <el-breadcrumb-item>{{ serverInfo.types[0].mcategory || serverInfo.address }}</el-breadcrumb-item>
        </el-breadcrumb>
      </header>
      <section :class="['service-content']">
        <vue-service-info :dowmCallMarge="serverInfo"></vue-service-info>
        <vue-service-content :dowmCallMarge="serverInfo"></vue-service-content>
      </section>
    </section>
  </section>
</template>
<script>
import VueServiceInfo from '@/components/service/detailComponents/serviceInfo'
import VueServiceContent from '@/components/service/detailComponents/serviceContent'
export default {
  data () {
    return {
      params: {},
      tabActive: 1,
      serverInfo: {}
    }
  },
  components: {
    'vue-service-info': VueServiceInfo,
    'vue-service-content': VueServiceContent
  },
  created () {
    try {
      this.params = this.$route.params
      if (this.params.id) {
        this.fetchDetails(this.params.id)
      } else {
        console.log('参数错误，返回上一级')
      }
    } catch (error) {
      console.log('参数错误，返回上一级')
    }
  },
  methods: {
    tabChange (_index) {
      this.tabActive = _index
    },
    fetchDetails (_info, query) {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/detil`, {params: Object.assign({}, query || {}, {replaceCeoId: _info})})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            this.serverInfo = res.data.data
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1300px)
    .service-page
      .service-page-bg
        width: 1300px
        margin: 0 auto
  @media screen and (min-width: 320px) and (max-width: 1300px)
    .service-page
      .service-page-bg
        width: 100%
        padding: 0 20px
</style>

<style lang="sass" scoped>
  .service-page
    padding: 60px 0
    background-color: #f5f5f5
    .service-page-bg
      .history-breadcrumb
        height: 60px
        display: flex
        align-items: center
        /deep/ .el-breadcrumb
          font-size: 16px
          .el-breadcrumb__inner.is-link
            font-weight: 400
</style>
