<style lang="sass" scoped>
  @media screen and (max-width: 1300px)
    .page-container
  @media screen and (min-width: 1300px)
    .page-container
      padding-left: 18%
      padding-right: 18%
  @media screen and (min-width: 1515px)
    .page-container
</style>
<style lang="scss" scoped>
.page-container{
  padding-bottom: 6rem;
  background-color: #f3f4f5;
}

.page-brow{
  padding-top: 100px;
  padding-bottom: 4em;
  background-color: #f3f4f5;
}

.tab-box{
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.tab-box .tab{
  width: 23%;
  cursor: pointer;
  position: relative;
}

.tab-box .tab:hover::before{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 5px #1281fc;
  position: absolute;
  top: 0;
  left: 0;
}

.tab-box .tab.active::before{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 5px #b8cee2;
  position: absolute;
  top: 0;
  left: 0;
}

.tab-box .tab img{
  display: block;
  width: 100%;
}

/deep/ .part-container{
  margin-bottom: 2rem;
  background-color: #ffffff;
}

/deep/ .part-container>h4:first-child{
  padding-left: 1.5%;
  line-height: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 2px solid #f3f4f5;
}

/deep/ .part-container>h4:first-child .title-tip{
  color: #999999;
  font-size: 0.8rem;
}

/deep/ .part-body{
  padding-top: 2em;
  padding-bottom: 2em;
}

.btn-submit{
  display: block;
  width: 44%;
  height: 2.5em;
  margin-top: 3em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5em;
  background-color: #1281fc;
  font-size: 1.5em;
  color: #ffffff;
}
.btn-submit.actived {
  background-color: #1281fc;
}
.btn-submit:hover{
  box-shadow: 0 0 5px #1281fc;
}
.btn-submit:active{
  transform: matrix(1.02, 0, 0, 1.02, 0, 0);
}
</style>
<style>
  .el-form-item__label {
  text-align: left;
  }
  .el-form{
    margin-left: 3%;
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: '';
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:after {
    content: '*';
    color: #f56c6c;
    margin-left: 4px;
  }
  .el-row .el-col:not(:first-child) .el-form-item__label{
    text-indent: 40px;
  }
</style>

<template>
  <div class="page-container">
    <div class="page-brow">
      <div class="tab-box" ref="tabBox">
        <div :class="['tab', 'sale', {'active': actionType==='sale'}]" @click="switchActionType('sale')">
          <img v-show="actionType!=='sale'" src="/static/img/release/01nochecked.png" />
          <img v-show="actionType==='sale'" src="/static/img/release/01checked.png" />
        </div>
        <div :class="['tab', 'rentOut', {'active': actionType==='rentOut'}]" @click="switchActionType('rentOut')">
          <img v-show="actionType!=='rentOut'" src="/static/img/release/02nochecked.png" />
          <img v-show="actionType==='rentOut'" src="/static/img/release/02checked.png" />
        </div>
        <div :class="['tab', 'buy', {'active': actionType==='buy'}]" @click="switchActionType('buy')">
          <img v-show="actionType!=='buy'" src="/static/img/release/03nochecked.png" />
          <img v-show="actionType==='buy'" src="/static/img/release/03checked.png" />
        </div>
        <div :class="['tab', 'rentIn', {'active': actionType==='rentIn'}]"  @click="switchActionType('rentIn')">
          <img v-show="actionType!=='rentIn'" src="/static/img/release/04nochecked.png" />
          <img v-show="actionType==='rentIn'" src="/static/img/release/04checked.png" />
        </div>
      </div>
    </div>
    <router-view :isSubmitNow="isSubmitNow" @submit="submit" @disclaimer="getDisclaimer"></router-view>
    <button v-loading="loading" class="btn-submit" @click="triggerSubmit">Submit</button>
    <vue-toolbar></vue-toolbar>
  </div>
</template>

<script>
import VueToolbar from '@/components/common/toolbar.vue'
import { getToken } from '@/utils/session'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      'loading': false,
      'isSubmitNow': false,
      'actionType': '',
      'callbackUrlName': ['listing-sellInAudit', 'listing-rentInAudit', 'buyInAudit', 'rentInAudit'],
      'apiToken': null
    }
  },
  'components': {
    'vue-toolbar': VueToolbar
  },
  'computed': {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  watch: {
    GlobalUserInfo: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          if (_new.firstname === null ||
          _new.firstname === '' ||
          _new.lastname === null ||
          _new.lastname === '') {
            this.updateCompletionState(true)
          } else if (_new.emailStatus === 1) {
            this.checkEmailDialogState(true)
          }
        }
      },
      deep: true,
      immediate: true
    },
    isSubmitNow: {
      handler (_new, _old) {
        if (_new) {
          const _this = this
          _this.loading = true
          setTimeout(() => {
            _this.loading = false
          }, 1000)
        }
      }
    }
  },
  'methods': {
    ...mapMutations({
      updateCompletionState: 'updateCompletionState',
      checkEmailDialogState: 'checkEmailDialogState',
      updataUserInfo: 'UPDATA_GLOBAL_USER_INFO'
    }),
    getdealType () {
      this.actionType = this.$route.fullPath.split('/')[2]
    },
    switchActionType (_type) {
      this.$router.replace({path: `/release/${_type}`})
    },
    triggerSubmit () {
      if (getToken()) {
        this.Myaccount()
      } else {
        this.$store.commit('signOut', true)
      }
    },
    checkUserInfo () {
      const _this = this
      if (_this.GlobalUserInfo.firstname === null ||
      _this.GlobalUserInfo.firstname === '' ||
      _this.GlobalUserInfo.lastname === null ||
      _this.GlobalUserInfo.lastname === '') {
        _this.updateCompletionState(true)
      } else if (_this.GlobalUserInfo.emailStatus !== 2) {
        _this.checkEmailDialogState(true)
      } else {
        _this.isSubmitNow = true
        // _this.fetchOnlyToken(function (params) {
        //   _this.isSubmitNow = true
        // })
      }
    },
    submit (_param) {
      const _this = this
      _this.isSubmitNow = false
      // console.log(_param)
      // console.log(_param)
      if (_param.flag) {
        _this.$axios({
          'method': 'post',
          'url': _param.http_path,
          'data': Object.assign({}, _param),
          'headers': {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            _this.$message.success(response.data.msg)
            setTimeout(() => {
              _this.$router.push({
                name: _this.callbackUrlName[_param.backURL]
              })
            }, 500)
          })
          .catch(error => {
            if (error) {}
            _this.$message.error(error)
          })
      } else {
        _this.$message.error(_param.msg || '')
      }
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
            this.updataUserInfo(data)
            this.checkUserInfo()
          } else {
            // alert(response.data.msg)
          }
        })
    },
    getDisclaimer (val) {
      this.isChecked = val
      console.log(this.isChecked)
    },
    fetchOnlyToken (callback) {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/insert/token`)
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            _this.apiToken = res.data.data
            if (callback instanceof Function) {
              callback()
            }
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    }
  },
  created () {
    this.getdealType()
    if (this.actionType === 'buy' || this.actionType === 'rentIn') {
      this.isChecked = true
    }
  },
  beforeUpdate () {
    this.getdealType()
  }
}
</script>
