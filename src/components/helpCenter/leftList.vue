<template>
  <div class="left-list">
    <ul>
      <div class="title">{{$route.matched[2].meta.titlemode}}</div>
      <li
        v-for="(item, index) in $route.matched[2].meta.leftList"
        :class="activeName == item.name ? 'active' : ''"
        :key="index"
      >
        <router-link :to="{name: item.name}">{{item.title}}</router-link>
      </li>
      <div class="line"></div>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false,
      activeName: ''
    }
  },
  created () {
    this.activeName =
      this.$route.matched[this.$route.matched.length - 1].meta.subpath ||
      this.$route.matched[this.$route.matched.length - 1].name
  }
}
</script>
<style scoped>
ul {
  width: 350px;
  height: 800px;
  position: relative;
}
.left-list ul > li {
  font-size: 20px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 36px;
}
.left-list ul > li.active > a {
  font-weight: bold;
  color: rgba(84, 117, 155, 1);
}
.left-list .title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(68, 68, 68, 1);
  line-height: 36px;
  margin-bottom: 20px;
}
.left-list ul .line {
  position: absolute;
  top: 0;
  right: 0;
}
.line {
  display: inline-block;
  width: 120px;
  height: 800px;
  background-image: url(/static/img/helpCenter/cutLine.png);
  background-repeat: no-repeat;
}
</style>
