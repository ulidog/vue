<template>
  <div class="search-container">
    <vue-bread-nav></vue-bread-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import breadNav from '@/components/helpCenter/breadNav.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    // 'vue-left-list': leftList,
    'vue-bread-nav': breadNav
  }
}
</script>

<style>

</style>
