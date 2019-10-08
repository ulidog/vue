<template>
  <div class="page-container">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  beforeCreate () {
    // 关闭主组件 （Header）
    // this.$emit('childToParentComponent', { showHeader: true })
  }
}
</script>
<style scoped>
  body {
    font-family: Arial;
  }
  .page-container{
    padding-top: 60px;
    /* padding-bottom: 4em; */
    background-color: #fff;
  }
</style>
