<template>
  <router-view></router-view>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    goBack () {
      // this.$router.replace({path: '/'});
      // replace替换原路由，作用是避免回退死循环
      this.$router.push({
        path: '/userCenter/contract',
        query: null
      })
    }
  }
}
</script>
