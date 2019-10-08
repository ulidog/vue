<template>
  <!-- 子页面 -->
  <div class="page-container">
    <vue-bread-nav></vue-bread-nav>
    <div class="container">
      <vue-left-list></vue-left-list>
      <div class="right-container">
        <!-- 右边视图出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import leftList from '@/components/helpCenter/leftList.vue'
import breadNav from '@/components/helpCenter/breadNav.vue'
export default {
  data () {
    return {}
  },
  components: {
    'vue-left-list': leftList,
    'vue-bread-nav': breadNav
  }
}
</script>
<style lang="sass" scoped>
  .page-container
    .container
      display: flex
      // padding: 0 360px
      margin: 0 auto
      max-width: 1180px
</style>
