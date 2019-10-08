<template>
  <!-- 子页面 -->
  <div class="page-container">
    <vue-bread-nav></vue-bread-nav>
    <div class="content">
        <vue-left-list ></vue-left-list>
        <div class="rightView">
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
    return {
    }
  },
  components: {
    'vue-left-list': leftList,
    'vue-bread-nav': breadNav
  }
}
</script>
<style scoped>
.content{
  display: flex;
  margin: 0 auto;
  max-width: 1180px;
}
</style>
