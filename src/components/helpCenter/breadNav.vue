<template>
  <div class="bread-nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="item.path"
      >{{item.meta.title}}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="breadList[breadList.length-1].meta.subtitle"
      >{{breadList[breadList.length-1].meta.subtitle}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      breadList: []
    }
  },
  methods: {},
  created () {
    this.breadList = this.$route.matched.filter((item, i) => {
      return !!item.meta.title
    })
    var _last = this.breadList[this.breadList.length - 1]
    _last.path = _last.meta.subpath ? (_last.parent.path + '/' + _last.meta.subpath) : ''
  }
}
</script>
<style scoped>
body {
  font-family: Arial;
}
.bread-nav {
  height: 135px;
  /* padding: 0 360px; */
  max-width: 1180px;
  margin: 0 auto;
  background-color: #fff;
}
/*面包屑导航样式*/
.el-breadcrumb {
  line-height: 135px;
  font-weight: 400;
  color: #54759b;
}
span.el-breadcrumb__inner.is-link {
  font-weight: 400;
  color: #54759b;
}
</style>
