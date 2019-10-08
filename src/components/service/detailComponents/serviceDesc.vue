<template>
  <section class="serviceDescComponent">
    <header class="title">
      <h4>Service Descriptions</h4>
    </header>
    <section class="serviceDescContent">
      <section class="serviceDescType">
        <router-link class="labelValue" v-show="item.typeName && item.typeName !== ''" v-for="item in dowmCallMarge.types" :key="item.tId" :to="{path: '/service/list', query: {cityId: dowmCallMarge.cityId, latitude: dowmCallMarge.latitude, longitude: dowmCallMarge.longitude, types: JSON.stringify(item)}}">{{item.typeName}}</router-link>
      </section>
      <section class="articleHtml" v-if="dowmCallMarge.content && dowmCallMarge.content !== ''">
        <article v-html="dowmCallMarge.content"></article>
      </section>
      <section v-else class="noContent">
        <section class="noConentIng">
          <img src="/static/img/service/service_noinformation.png" alt="service_noinformation.png">
        </section>
        <section class="noContentTip">
          <span class="tip">This company’s information is currently updating. We are sorry for the inconvenience.</span>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    dowmCallMarge: {
      default: () => {},
      type: Object
    }
  }
}
</script>
<style lang="sass" scoped>
  .serviceDescComponent
    margin-top: 20px
    margin-right: 20px
    flex: 1
    background-color: #fff
    transition: all .5s ease
    padding: 30px 15px 30px 40px
    &:hover
      box-shadow: 10px 10px 10px -5px #ddd
    .title
      margin-bottom: 30px
      h4
        font-size: 36px
        color: #323232
        font-weight: bold
    .serviceDescContent
      .serviceDescType
        display: flex
        flex-wrap: wrap
        .labelValue
          padding: 10px 30px
          color: #1281FC
          font-size: 18px
          background-color: #DAE9FF
          display: flex
          margin-right: 10px
          border-radius: 30px
          cursor: pointer
          margin-bottom: 10px
      .articleHtml
        margin-top: 30px
        /deep/ article
          div,p,span,ul,li,ol,img,video,audio,iframe,table
            max-width: 100% !important
            overflow: hidden
      .noContent
        width: 100%
        min-height: 220px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        .noContentTip
          margin-top: 20px
          span.tip
            color: #646464
            font-size: 18px
</style>
