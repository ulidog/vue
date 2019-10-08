<style scoped>
.el-button--text{
  font-size: 1em;
}

.btn-go-back{
  margin-top: 3em;
}

table{
  font-size: 1.1em;
  width: 100%;
  margin-top: 2.8em;
}

tr{
  height: 2.5em;
}

td:first-child{
  color: #909090;
}

td:nth-child(2){
  color: #323232;
}
</style>

<template>
  <div>
    <el-button
      class="btn-go-back"
      v-show="'index' !== operateName"
      type="text"
      icon="el-icon-back"
      @click="setOperateName('index')"
    >
      Go back
    </el-button>
    <table v-if="'index' === operateName">
      <tbody>
        <tr>
          <td>Phone number</td>
          <td>{{!!!userInfo.userInfo.phone ? `Your phone number hasn’t been set` : formatPhone}}</td>
          <td>
            <el-button type="text" v-if="!!!userInfo.userInfo.phone" icon="el-icon-plus" @click="setOperateName('bindPhoneNum')">Bind</el-button>
            <el-button type="text" v-if="!!userInfo.userInfo.phone && !!userInfo.userInfo.email" icon="el-icon-delete" @click="setOperateName('unbindPhoneNum')">Unlink</el-button>
            <el-button type="text" v-if="!!userInfo.userInfo.phone" icon="el-icon-edit" @click="setOperateName('changePhoneNum')">Change</el-button>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{!!!userInfo.userInfo.email ? `Your mailbox hasn’t been set` : userInfo.userInfo.email}}</td>
          <td>
            <el-button type="text" v-if="!!!userInfo.userInfo.email" icon="el-icon-plus" @click="setOperateName('bindEmail')">Bind</el-button>
            <el-button type="text" v-if="!!userInfo.userInfo.email" icon="el-icon-edit" @click="setOperateName('changeEmail')">Change</el-button>
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>****************</td>
          <td><el-button type="text" icon="el-icon-edit" @click="setOperateName('changePwd')">Reset</el-button></td>
        </tr>
        <tr>
          <td>Identity documents</td>
          <!-- userInfo.userPaperworkList[0].paperworkCode -->
          <td>{{userInfo.userPaperworkList.length > 0 ? '*************' : `You haven’t added any identity documents`}}</td>
          <td>
            <el-button type="text" v-if="userInfo.userPaperworkList.length === 0" icon="el-icon-plus" @click="setOperateName('bindIDDoc')">Bind</el-button>
            <el-button type="text" v-if="userInfo.userPaperworkList.length !== 0" icon="el-icon-view" @click="setOperateName('viewIDDoc')">View</el-button>
            <el-button type="text" v-if="userInfo.userPaperworkList.length !== 0" icon="el-icon-edit" @click="setOperateName('bindIDDoc')">Setting</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <vue-change-pwd v-if="'changePwd' === operateName"></vue-change-pwd>
    <vue-bind-phone-num v-if="'bindPhoneNum' === operateName" @setOperateName="setOperateName" :userInfo="userInfo"></vue-bind-phone-num>
    <vue-unbind-phone-num v-if="'unbindPhoneNum' === operateName" @setOperateName="setOperateName" :userInfo="userInfo"></vue-unbind-phone-num>
    <vue-change-phone-num v-if="'changePhoneNum' === operateName" @setOperateName="setOperateName" :userInfo="userInfo"></vue-change-phone-num>
    <vue-bind-email v-if="'bindEmail' === operateName" @setOperateName="setOperateName" :userInfo="userInfo"></vue-bind-email>
    <vue-change-email v-if="'changeEmail' === operateName" @setOperateName="setOperateName" :userInfo="userInfo"></vue-change-email>
    <vue-bind-id-document v-if="'bindIDDoc' === operateName" @setOperateName="setOperateName"></vue-bind-id-document>
    <vue-view-id-document v-if="'viewIDDoc' === operateName" @setOperateName="setOperateName"></vue-view-id-document>
  </div>
</template>

<script>
import VueChangePwd from '@/components/userCenter/account/security/changePwd.vue'
import VueBindPhoneNum from '@/components/userCenter/account/security/bindPhoneNum.vue'
import VueUnbindPhoneNum from '@/components/userCenter/account/security/unbindPhoneNum.vue'
import VueChangePhoneNum from '@/components/userCenter/account/security/changePhoneNum.vue'
import VueBindEmail from '@/components/userCenter/account/security/bindEmail.vue'
import VueChangeEmail from '@/components/userCenter/account/security/changeEmail.vue'
import VueBindIDDocument from '@/components/userCenter/account/security/bindIDDocument.vue'
import VueViewIDDocument from '@/components/userCenter/account/security/viewIDDocument.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      'operateName': 'index',
      'userInfo': {
        'userInfo': {
          'phone': '',
          'email': ''
        },
        'userPaperworkList': []
      }
    }
  },
  'components': {
    'vue-change-pwd': VueChangePwd,
    'vue-bind-phone-num': VueBindPhoneNum,
    'vue-unbind-phone-num': VueUnbindPhoneNum,
    'vue-change-phone-num': VueChangePhoneNum,
    'vue-bind-email': VueBindEmail,
    'vue-change-email': VueChangeEmail,
    'vue-bind-id-document': VueBindIDDocument,
    'vue-view-id-document': VueViewIDDocument
  },
  created () {
    this.Myaccount()
  },
  computed: {
    formatPhone: {
      get: function () {
        // console.log(this.form.phone)
        if (!this.userInfo.userInfo.phone) return ''
        // console.log(this.userInfo.userInfo.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.userInfo.userInfo.phone.toString().length
        const str = this.userInfo.userInfo.phone.toString().replace(/((?![0-9]).)+/g, '')
        // str.substring(0, 3)
        // str.substring(3, 6)
        // str.substring(6)
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (value) {
        this.userInfo.userInfo.phone = value
      }
    }
  },
  'methods': {
    ...mapMutations({
      updataUserInfo: 'UPDATA_GLOBAL_USER_INFO'
    }),
    setOperateName (_name) {
      this.operateName = _name
    },
    // 我的账户信息
    Myaccount () {
      /* const fd = new FormData() */
      this.$axios({
        method: 'GET',
        url: `${this.wxl_path}user/pc_userInfo`,
        headers: { 'Content-Type': 'multipart/form-data' }
        /* 'data': fd */
      })
        .then(response => {
          if (response.data.success) {
            this.userInfo = response.data.data
            this.updataUserInfo(this.userInfo.userInfo)
          } else {
            // alert(response.data.msg)
          }
        })
        .catch(error => {
          if (error) {}
          // alert(error)
        })
    }
  }
}
</script>
