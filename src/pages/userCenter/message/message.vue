<style scoped>
.module-container {
  background-color: #ffffff;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.module-container>.header-btns {
  border-bottom: 2px solid #f9fafa;
  display: flex;
  height: 120px;
  background-color: #fff;
  display: flex;
}
.module-container>.header-btns>.el-radio-group {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 16px;
  padding-left: 3.125em;
}
.module-container>.header-btns>.el-radio-group>.el-badge {
  margin-right: 20px;
  z-index: 9;
}
.module-container>.header-btns>.el-radio-group>.el-badge:click {
  box-shadow: none;
  border: none;
}
.module-container>.header-btns>.el-radio-group>.el-badge>>>.el-radio-button__inner{
  border: none;
  font-size: 22px;
  color: #444;
  height: 40px;
  padding: 0 14px;
  display: flex;
  align-items: center;
}
.module-container>.header-btns>.el-radio-group>.el-badge>>>.el-badge__content {
  border: none;
  background-color: #FF3518;
  font-size: 10px;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  transition: all .3s ease;
}
.module-container>.header-btns>.el-radio-group>.el-badge>>>.el-badge__content.is-fixed {
  top: 4px;
  right: 12px;
}
.module-container>.header-btns>.el-radio-group>.el-badge>>>.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: linear-gradient(to right, #63a9f7, #1381fc);
  border: none;
  height: 40px;
  padding: 0 14px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #fff;
  transition: all .3s ease;
}
.module-container>.el-radio-group:first-child{
  font-size: 1em;
  display: block;
  text-align: center;
  user-select: none;
}

/* .module-container .part-container{
  margin-top: 2em;
} */
</style>

<template>
  <div class="module-container">
    <div class="header-btns">
      <el-radio-group v-model="type" @change="changeType">
        <el-badge :hidden="notifyMessageObject.unReadNotifies == 0 ? true : false" :value="notifyMessageObject.unReadNotifies">
          <el-radio-button label="notification">Notifications</el-radio-button>
        </el-badge>
        <!-- <el-badge :hidden="notifyMessageObject.unReadMessages == 0 ? true : false" :value="notifyMessageObject.unReadMessages">
          <el-radio-button label="msg">Messages</el-radio-button>
        </el-badge> -->
        <el-badge :hidden="notifyMessageObject.unReadAgreements == 0 ? true : false" :value="notifyMessageObject.unReadAgreements">
          <el-radio-button label="offer">Bids & Offers</el-radio-button>
        </el-badge>
        <el-badge :hidden="notifyMessageObject.unReadRecomments == 0 ? true : false" :value="notifyMessageObject.unReadRecomments">
          <el-radio-button label="recommend">Home Request Approvals</el-radio-button>
        </el-badge>
      </el-radio-group>
    </div>
    <div class="container-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      type: null,
      badgeConfig: {
        unReadAgreements: 0,
        unReadNotifies: 0,
        unReadRecomments: 0
      },
      // msg: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters({
      token: 'token',
      notifyMessageObject: 'notifyMessageObject'
    })
  },
  'methods': {
    changeType (_t) {
      this.type = _t
      this.$router.push({'path': `/userCenter/message/${_t}`})
    }
    // fetchBadgeSize () {
    //   if (!this.token) {
    //     clearInterval(this.timer)
    //     this.$store.commit('signOut', true)
    //   } else {
    //     const _this = this
    //     _this.$axios.get(`${this.YT_PROD_PATH}common/message/getMessageCountsByUserId`)
    //       .then(res => {
    //         // console.log(res)
    //         if (res.data.success) {
    //           _this.badgeConfig = res.data.data
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //     this.$axios.post(`${this.XT_PROD_PATH}message/select/count`)
    //       .then(res => {
    //         if (res.data.success) {
    //           this.msg = res.data.data
    //         }
    //       })
    //   }
    // }
  },
  created () {
    this.type = this.$route.fullPath.split('/')[3]
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
