<style scoped>
.btn-go-back{
  margin-top: 2em;
}
</style>

<template>
  <div>
    <el-button
      class="btn-go-back"
      v-show="'viewBaseInfo' !== operateName"
      type="text"
      icon="el-icon-back"
      @click="setOperateName('viewBaseInfo')"
    >
      Go back
    </el-button>
    <vue-view-user-info v-if="'viewBaseInfo' === operateName" @setOperateName="setOperateName"></vue-view-user-info>
    <vue-modify-user-info v-if="'modifyBaseInfo' === operateName" @setOperateName="setOperateName"></vue-modify-user-info>
    <vue-change-avatar v-if="'changeAvatar' === operateName" @setOperateName="setOperateName"></vue-change-avatar>
  </div>
</template>

<script>
import VueViewUserInfo from '@/components/userCenter/account/userInfo/viewUserInfo.vue'
import VueModifyBaseInfo from '@/components/userCenter/account/userInfo/modifyBaseInfo.vue'
import VueChangeAvatar from '@/components/userCenter/account/userInfo/changeAvatar.vue'

export default {
  data () {
    return {
      'operateName': 'viewBaseInfo'
    }
  },
  'components': {
    'vue-view-user-info': VueViewUserInfo,
    'vue-modify-user-info': VueModifyBaseInfo,
    'vue-change-avatar': VueChangeAvatar
  },
  'methods': {
    setOperateName (_name) {
      this.operateName = _name
    }
  }
}
</script>
