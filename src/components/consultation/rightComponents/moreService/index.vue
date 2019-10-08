<template>
  <section class="moreServiceViews">
    <header class="_titls">
      <h3>Information category</h3>
    </header>
    <footer class="msgCode">
      <img src="/static/img/consultation/icons/message.png" alt="message">
      <img src="/static/img/consultation/icons/erweima.png" alt="erweima">
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
  .moreServiceViews
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
    ._titls
      height: 75px
      display: flex
      align-items: center
      justify-content: center
      margin: 0 1.875em 0 2.1875em
      border-bottom: 1px solid #ededed
      h3
        font-size: 1.5em
        color: #323232
        font-weight: bold
        height: 100%
        display: flex
        align-items: center
        justify-content: center
    .msgCode
      display: flex
      margin: 0 1.875em 0 2.1875em
      align-items: center
      justify-content: center
      img
        width: 54px
        height: 54px
        margin: 30px 10px
</style>
