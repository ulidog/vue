<style scoped>
.flex-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.5em;
}

.avatar {
  display: block;
  width: 20%;
  border-radius: 50%;
  margin-left: 40%;
}

.el-button {
  font-size: 1em;
}

.title {
  font-size: 1.2em;
}

table {
  width: 100%;
  border-spacing: 0;
  margin-top: 1em;
}

td {
  font-size: 1.2em;
  height: 4em;
  padding-bottom: 1em;
  white-space: nowrap;
}

td:first-child {
  padding-right: 2em;
  color: #909090;
}

td:nth-child(2) {
  color: #323232;
}

tr.topline td {
  padding-top: 1em;
  border-top: 1px solid #eeeeee;
}
</style>

<template>
  <div>
    <div class="flex-box">
      <img class="avatar" :src="headUrl">
      <el-button
        type="primary"
        size="mini"
        class="btn-change-avatar"
        @click="setOperateName('changeAvatar')"
      >Change Profile Photo</el-button>
    </div>
    <div class="flex-box">
      <h6 class="title">Profile</h6>
      <el-button
        type="primary"
        size="mini"
        class="btn-modify-base-info"
        @click="setOperateName('modifyBaseInfo')"
      >Update Profile</el-button>
    </div>
    <table>
      <tbody>
        <!-- <tr>
          <td>Nick name</td>
          <td>{{accounts.nickname === null || accounts.nickname === '' ? 'You haven\'t set the nick name' : accounts.nickname}}</td>
        </tr> -->
        <tr>
          <td>Gender</td>
          <td>{{accounts.sex === 2 ? 'Female' : 'Male'}}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{{accounts.address && cityName && stateName && accounts.zip && (accounts.address + cityName + stateName + accounts.zip) !== '' ? (accounts.address || '') + ' ' + (cityName || '') + ' ' + (stateName || '') + ' ' + (accounts.zip || '') : 'No address set' }}</td>
          <!-- <td>{{accounts.address + ' ' + cityName + ' ' + stateName + ' ' + accounts.zip != "" ? accounts.address + ' ' + cityName + ' ' + stateName + ' ' + accounts.zip : 'You haven\'t set the address' }}</td> -->
        </tr>
        <tr>
          <td>Name</td>
          <td>{{accounts.firstname || accounts.lastname ? `${accounts.firstname || ''} ${accounts.lastname || ''}` : 'You haven\'t set a name'}}</td>
          <!-- <td>{{accounts.firstname==null?'You haven\'t set a name':`${accounts.firstname} ${accounts.middlename} ${accounts.lastname}`}}</td> -->
        </tr>

        <!-- <tr class="topline">
          <td>Phone Number</td>
          <td v-if="accounts.phone === null || accounts.phone === ''">{{'You haven\'t set phone number'}}</td>
          <td v-else>
            <a :href="'tel:' + accounts.phone"><span style="color: #999; text-decoration: underline;">{{accounts.phone | telephoneFormat}}</span></a>
            {{accounts.phone | telephoneFormat}}
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{accounts.email}}</td>
        </tr>
        <template>
          <tr v-for="(value, key) in userPaperworkList" :key="key">
            <td>{{value.paperworkName}}</td>
            <td>{{value.paperworkCode}}</td>
          </tr>
        </template> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      accounts: {},
      headUrl: '',
      userPaperworkList: [],
      stateName: '',
      cityName: ''
    }
  },
  methods: {
    ...mapMutations({
      updataUserInfo: 'UPDATA_GLOBAL_USER_INFO'
    }),
    setOperateName (_name) {
      this.$emit('setOperateName', _name)
    },
    // 我的账户信息
    Myaccount () {
      /* const fd = new FormData() */
      this.$axios({
        method: 'GET',
        url: `${this.wxl_path}user/pc_userInfo`,
        headers: {'Content-Type': 'multipart/form-data'}
        /* 'data': fd */
      })
        .then(response => {
          const data = response.data.data.userInfo
          if (response.data.success) {
            this.stateName = data.stateId
            this.cityName = response.data.data.cityNameAbbreviation
            this.accounts = data
            this.userPaperworkList = response.data.data.userPaperworkList
            this.headUrl = response.data.data.userInfo.headUrl
            this.updataUserInfo(data)
          } else {
            // alert(response.data.msg)
          }
        })
    }
  },
  mounted () {
    this.Myaccount()
  }
}
</script>
