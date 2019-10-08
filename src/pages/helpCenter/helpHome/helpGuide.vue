<template>
  <div>
    <!-- <vue-help-header></vue-help-header> -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
// import header from "@/components/common/header.vue"

export default {
  data () {
    return {}
  },
  // components:{
  //   "vue-help-header": header
  // },
  methods: {}
}
</script>
<style scoped>
body {
  font-family: Arial;
}
main {
  /* width: 1200px; */
  margin: 0 auto;
  position: relative;
}
</style>
