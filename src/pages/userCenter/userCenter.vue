<style lang="sass" scoped>
  @media screen and (min-width: 1300px)
    .main
      width: 1300px
      flex: 0 0 1300px
  @media screen and (max-width: 1300px)
    .main
      width: 100%
      flex: 1
      padding: 0 20px
</style>

<style scoped>
.page-container{
  padding-top: calc(60px + 7em);
  padding-bottom: 4em;
  background-color: #f3f4f5;
  display: flex;
  justify-content: center;
}

.main {
  display: flex;
}

.left-menu {
  width: 22%;
}
.right-content {
  width: calc( 100% - 22% );
}

.menu-part{
  background-color: #ffffff;
}

.author_img {
  width: 50%;
  border-radius: 50%;
  transform: translate(50%, -50%);
  overflow: hidden;
  display: inline-block;
  position: absolute;
}

.avatar{
  width: 100%;
  height: 100%;
}

.name{
  font-size: 1.5em;
  line-height: 2em;
  text-align: center;
  padding-top: 3.375em
}

.menu-part{
  border-radius: 0.5em;
  position: relative;
}

.menu-part li{
  font-size: 1.2em;
  line-height: 3em;
  color: #323232;
  padding-left: 18%;
  cursor: pointer;
}

.menu-part li.active{
  background-color: #1281fc;
  color: #ffffff;
}
</style>

<template>
  <div class="page-container">
    <div :span="24" class="main">
      <div class="left-menu">
        <div class="menu-part">
          <div class="author_img">
            <img class="avatar" :src="img" />
          </div>
          <p class="name">{{name}}</p>
          <ul>
            <li :class="{'active': deepSeekRouteName('account')}" @click="jump('account')">My Account</li>
            <li :class="{'active': deepSeekRouteName('message')}" @click="jump('message')"><el-badge style="display: inline;" :hidden="notifyMenuObject.notifyAllMeassage == 0 ? true : false" :value="notifyMenuObject.notifyAllMeassage">My Ebuyhouse Center</el-badge></li>
            <!-- <li :class="{'active': deepSeekRouteName('signature-file')}" @click="jump('signature-file')">Signature file</li> -->
            <li :class="{'active': deepSeekRouteName('listing')}" @click="jump('listing')">My Listings</li>
            <li :class="{'active': deepSeekRouteName('request')}" @click="jump('request')">My Requests</li>
            <li :class="{'active': deepSeekRouteName('contract')}" @click="jump('contract')"><el-badge style="display: inline;" :hidden="notifyMenuObject.notifyAllContract == 0 ? true : false" :value="notifyMenuObject.notifyAllContract">Transactions</el-badge></li>
            <li :class="{'active': deepSeekRouteName('service')}" @click="jumps('service')">My Service</li>
            <li :class="{'active': deepSeekRouteName('collection')}" @click="jump('collection')">My Favorites</li>
            <li :class="{'active': deepSeekRouteName('history')}" @click="jump('history')">Recently Viewed Homes</li>
          </ul>
        </div>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
    <vue-toolbar></vue-toolbar>
  </div>
</template>

<script>
import VueToolbar from '@/components/common/toolbar.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      'img': '/static/img/common/header/avatar.png',
      'name': null
    }
  },
  'components': {
    'vue-toolbar': VueToolbar
  },
  'methods': {
    jump (_path) {
      this.$router.push({'path': `/userCenter/${_path}`})
    },
    jumps (_path) {
      this.$router.push({'path': `/userCenter/${_path}/` + 'available'})
    },
    deepSeekRouteName (thisName) {
      return !!this.$route.matched.find(item => item.meta.name === thisName)
    },
    fetchBadgeSize () {
      // 获取推送消息
      this.$WebSocket.websocketsend({signal: 1, type: 2})
      this.$WebSocket.websocketsend({signal: 1, type: 3})
      // this.$WebSocket.websocketsend({signal: 1, type: 4})
    }
  },
  'computed': {
    ...mapGetters({
      signInState: 'signInState',
      GlobalUserInfo: 'GlobalUserInfo',
      token: 'token',
      notifyMenuObject: 'notifyMenuObject'
    })
  },
  'watch': {
    signInState () {
      if (!this.$store.state.signInState) {
        this.$router.push({'path': '/index'})
      }
    },
    GlobalUserInfo: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          this.img = _new.headUrl
          const first = _new.firstname ? _new.firstname : 'Personal'
          const last = _new.lastname ? _new.lastname : 'Information'
          this.name = first + ' ' + last
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    if (this.token) {
      this.$store.commit('signIn')
      this.fetchBadgeSize()
    } else {
      this.$store.commit('signOut', true)
      this.$router.push({'path': '/index'})
    }
  }
}
</script>
