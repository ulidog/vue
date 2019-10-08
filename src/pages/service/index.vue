<template>
  <div>
    <router-view @childToParentComponent="childToParentComponent"></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    // 关闭主组件 （footer）
    // this.$emit('childToParentComponent', { bgOpacityNone: true })
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    childToParentComponent (_info) {
      this.$emit('childToParentComponent', _info)
    }
    // handleScroll () {
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   // console.log(scrollTop)
    //   if (scrollTop < 100) {
    //     this.$emit('childToParentComponent', { bgOpacityNone: true })
    //   } else {
    //     this.$emit('childToParentComponent', { bgOpacityNone: false })
    //   }
    // }
  }
}
</script>
<style scoped>
  body {
    font-family: Arial;
  }
</style>
