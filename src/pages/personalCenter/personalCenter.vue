<style scoped>
.page-container{
  padding-top: calc(60px + 9em);
  padding-bottom: 4em;
  background-color: #f3f4f5;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.main {
  flex: 0 0 62%;
  display: flex;
  width: 62%;
}

.left-menu {
  width: 22.07%;
}
.right-content {
  width: calc( 100% - 22.07% );
}

.menu-part{
  background-color: #ffffff;
}

.author {
  position: relative;
  height: 3.25em;
}

.avatar{
  display: block;
  /* margin-top: -25%; */
  margin-top: -25%;
  position: absolute;
  left: calc( 50% - 3.25em );
  width: 6.5em;
  height: 6.5em;
}

.name{
  font-size: 1.5em;
  line-height: 2em;
  text-align: center;
}

.menu-part{
  border-radius: 0.5em;
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
  <el-row class="page-container">
    <el-col :span="24" class="main">
      <header class="left-menu">
        <div class="menu-part">
          <header class="author">
            <img class="avatar" src="/static/img/buyRequestList/avatar.png" />
          </header>
          <p class="name">Jackson</p>
          <ul>
            <li :class="{'active': deepSeekRouteName('account')}" @click="jump('account')">My account</li>
            <li>My message</li>
            <li>Signature file</li>
            <li>My listing</li>
            <li>My request</li>
            <li :class="{'active': deepSeekRouteName('contract')}" @click="jump('contract')">My contract</li>
            <li>My collection</li>
            <li>History record</li>
          </ul>
        </div>
      </header>
      <footer class="right-content">
        <router-view></router-view>
      </footer>
    </el-col>
  </el-row>
</template>

<script>
/*
个人资料Personal information
账号安全Account security
绑定手机号码Link phone number
解绑手机号Unlink phone number
修改手机号Change mobile number
修改密码Reset password
修改邮箱Change Email
保存Save
*/

export default {
  data () {
    return {
    }
  },
  'methods': {
    jump (_path) {
      this.$router.push({'path': `/personalCenter/${_path}`});
    },
    deepSeekRouteName (thisName) {
      try {
        const navigate = this.$route.matched
        let status = false
        navigate.map(item => {
          if (item.meta.name == thisName) {
            status = true
          }
        })
        return status
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
