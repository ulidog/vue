<style scoped>
.content-part{
  /* float: right; */
  /* width: 48%; */
  padding-top: 1em;
  padding-bottom: 3em;
  padding-left: 4%;
  padding-right: 4%;
  /* margin-right: 19%; */
  border-radius: 0.5em;
  background-color: #ffffff;
}

.tab-group button{
  height: 3em;
  color: #323232;
  font-size: 1.2em;
  margin-right: 3em;
  border-bottom: 2px solid transparent;
}

.tab-group button.active{
  border-color: #88c0fd;
}
</style>

<template>
  <div class="content-part">
    <div class="tab-group">
      <router-link
        to="{'path': '/personalCenter'}"
        tag="button"
        :class="[{'active': 'personalInfo' === serverName}]"
      >
        Personal information
      </router-link>
      <router-link
        to="{'path': '/personalCenter/account/security'}"
        tag="button"
        :class="[{'active': 'security' === serverName}]"
      >
        Account security
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'serverName': ''
    }
  },
  created () {
    this.serverName = this.$route.fullPath.split('/').pop()
  }
}
</script>
