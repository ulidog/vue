<style scoped>
.content-part{
  padding-top: 1em;
  padding-bottom: 3em;
  padding-left: 4%;
  padding-right: 4%;
  border-radius: 0.5em;
  margin-left: 20px;
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
        :to="{'path': '/userCenter'}"
        tag="button"
        :class="[{'active': 'userInfo' === serviceName}]">
        Personal Information
      </router-link>
      <router-link
        :to="{'path': '/userCenter/account/security'}"
        tag="button"
        :class="[{'active': 'security' === serviceName}]"
      >
        Account Security
      </router-link>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'serviceName': ''
    }
  },
  updated () {
    this.serviceName = this.$route.fullPath.split('/').pop()
  },
  created () {
    this.serviceName = this.$route.fullPath.split('/').pop()
  }
}
</script>
