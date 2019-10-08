<template>
  <section class="companyProfileComponent">
    <header class="title">
      <h4>Company Profile</h4>
    </header>
    <section class="companyProfileContent">
      <section class="articleHtml" v-if="dowmCallMarge.businessContent && dowmCallMarge.businessContent !== ''">
        <article v-html="dowmCallMarge.businessContent"></article>
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
  .companyProfileComponent
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
    .companyProfileContent
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
