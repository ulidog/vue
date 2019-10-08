<template>
  <section :class="['ListingViewBox', {'colorFFF': pageSetting.isColorFFF}]">
    <section class="ListingView">
      <header class="backComponent">
        <back-history-router :historyParams="backparams"></back-history-router>
      </header>
      <section class="content">
        <router-view @UpParamsChange="_UpParamsChange"></router-view>
      </section>
    </section>
    <vue-toolbar></vue-toolbar>
  </section>
</template>
<script>
import backHistory from '@/components/listing/backHistory'
import VueToolbar from '@/components/common/toolbar.vue'
export default {
  components: {
    'back-history-router': backHistory,
    'vue-toolbar': VueToolbar
  },
  data () {
    return {
      backparams: {
        title: 'Back',
        isBack: true,
        link: null
      },
      pageSetting: {
        isColorFFF: false
      }
    }
  },
  methods: {
    _UpParamsChange (_prop) {
      Object.keys(_prop).map(item => {
        this.pageSetting[item] = _prop[item]
      })
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
<style lang="sass" scoped>
.ListingViewBox
  background-color: #fff
  .ListingView
    width: 62vw
    min-width: 1040px
    display: flex
    flex-direction: column
    margin: auto
    margin-top: 60px
    .backComponent
      margin-top: 20px
      height: 66px
      display: flex
      flex-direction: row
      align-items: center
.ListingViewBox.colorFFF
  background-color: #fff
</style>
