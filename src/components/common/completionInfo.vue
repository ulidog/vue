<template>
  <section class="completionInfo">
    <section class="temp-a">
      <img class="close" src="/static/img/common/account/close.png" alt="close" @click="closeWindowInfo">
      <header class="titles">
        <h4 class="t">Contact Information</h4>
      </header>
      <section class="descption">
        <article>Real profile photos and names help others trust you.You can go to the personal center to set up more details.</article>
      </section>
      <footer class="contents">
        <el-form label-position="left" label-width="150px" :model="updataFrom" :rules="rules" ref="updataFrom">
          <el-form-item label="Company Name" v-if="GlobalUserInfo.type === 2">
            <el-input v-model="updataFrom.companyName"></el-input>
          </el-form-item>
          <el-form-item label="First Name" prop="firstname">
            <el-input v-model="updataFrom.firstname"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastname">
            <el-input v-model="updataFrom.lastname"></el-input>
          </el-form-item>
          <el-form-item v-if="!GlobalUserInfo.phone" label="Phone Number" prop="phone">
            <!-- <el-input v-model="updataFrom.phone" @change="oninput"></el-input> -->
            <el-input type="text" v-model="formatPhone" autocomplete="off">
              <el-select v-model="updataFrom.phoneAreaCodeId" slot="prepend" placeholder="Area" style="width: 130px">
                <el-option :label="'+1 United States of America'" :value="344"></el-option>
                <el-option :label="`+${item.areaCode} ${item.en}`" :value="item.id" v-for="item in phoneAreaCodeArray" :key="item.id"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-form>
      </footer>
      <section class="submit">
        <el-button type="primary" @click="updateFrom">Submit</el-button>
      </section>
    </section>
    <!-- <section class="temp-b"></section> -->
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please Use Format: (123) 123-1234'))
      } else {
        var verify = value.replace(/[^0-9]/ig, '')
        if (!rule.regString.test(value) || verify.length < 10) {
          callback(new Error('Please Use Format: (123) 123-1234'))
        }
      }
      callback()
    }
    let validateName = (rule, value, callback) => {
      if (value) {
        if (new RegExp(/((?=[\x21-\x7e]+)[^A-Za-z.])/im).test(value)) {
          callback(new Error('Special characters are not allowed'))
        }
        callback()
      }
    }
    return {
      updataFrom: {
        nickname: null,
        phone: null,
        companyName: null,
        firstname: null,
        lastname: null,
        phoneAreaCodeId: 344
      },
      phoneAreaCodeArray: [],
      rules: {
        phone: [
          { validator: validatePhone, regString: /[(0-9]{3}[)\s0-9]{3}[-0-9]{4}/, trigger: 'blur' }
        ],
        firstname: [
          { validator: validateName, trigger: ['blur', 'change'] }
        ],
        lastname: [
          { validator: validateName, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
    GlobalUserInfo: {
      handler (_new, _old) {
        console.log(_new)
        // this.updataFrom = _new
        let cloneUserFrom = Object.assign({}, _new)
        delete cloneUserFrom.phoneAreaCodeId
        Object.assign(this.updataFrom, cloneUserFrom)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    }),
    formatPhone: {
      get: function () {
        // console.log(this.dialogupdataFrom.phone)
        if (!this.updataFrom.phone) return ''
        // console.log(this.updataFrom.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = this.updataFrom.phone.toString().length
        const str = this.updataFrom.phone.toString().replace(/((?![0-9]).)+/g, '')
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
        this.updataFrom.phone = value
      }
    }
  },
  methods: {
    ...mapMutations({
      updateCompletionState: 'updateCompletionState',
      checkEmailDialogState: 'checkEmailDialogState',
      updataUserInfo: 'UPDATA_GLOBAL_USER_INFO'
    }),
    // 电话号码判断
    // oninput (val) {
    //   if (val) {
    //     let _val = val.replace(/[^0-9]/ig, '')
    //     if (_val !== '') {
    //       this.updataFrom.phone = '(' + _val.substr(0, 3) + ')' + _val.substr(3, 3) + '-' + _val.substr(6, 4)
    //     }
    //   }
    // },
    updateFrom () {
      this.$refs['updataFrom'].validate((valid) => {
        if (valid) {
          let cloneFrom = Object.assign({}, this.updataFrom)
          // 如果存在电话号码
          // console.log(cloneFrom)
          if (this.GlobalUserInfo.phone) {
            delete cloneFrom.phone
            delete cloneFrom.phoneAreaCodeId
          }
          if (cloneFrom.phone) {
            // cloneFrom.phoneAreaCodeId = cloneFrom.phoneAreaCodeId.replace(/[^0-9]/ig, '')
            cloneFrom.phone = cloneFrom.phone.replace(/[^0-9]/ig, '')
          }
          // 提交操作
          // 192.168.0.104:9003
          // ${this.wxl_path}user/updateUserInfo/pc
          this.$axios.post(`${this.wxl_path}user/updateUserInfo/pc`, cloneFrom)
            .then(res => {
              this.$message.success('Update Success')
              this.closeWindowInfo()
              if (this.GlobalUserInfo.emailStatus !== 2) {
                this.checkEmailDialogState(true)
              }
              this.Myaccount()
            })
        } else {
          return false
        }
      })
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
          } else {
            // alert(response.data.msg)
          }
        })
    },
    closeWindowInfo () {
      this.updateCompletionState(false)
    },
    checkNameRex (str) {
      let patrn = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/im
      if (!patrn.test(str)) {
        return false
      }
      return true
    },
    fetchAreaCode () {
      this.$axios({
        url: `${this.wxl_path}phoneAreaCode/find_all_phone_area_code`,
        method: 'post'
      })
        .then(res => {
          if (res.data.success) {
            this.phoneAreaCodeArray = res.data.data
          }
        })
    }
  },
  created () {
    this.fetchAreaCode()
  }
}
</script>
<style lang="sass" scoped>
  .completionInfo
    width: 100%
    min-width: 1280px
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 999
    background-color: rgba(0, 0, 0, 0.8)
    display: flex
    justify-content: center
    align-items: center
    .temp-a
      width: 550px
      background-color: #fff
      border-radius: 5px
      position: relative
      .close
        position: absolute
        top: -40px
        right: -40px
        cursor: pointer
      .titles
        text-align: center
        h4
          font-size: 30px
          color: #444
          margin: 30px auto
      .descption
        margin: 0 50px
        article
          font-size: 16px
          color: #999
      .contents
        margin: 30px 50px
        /deep/
          .el-form-item__label
            font-size: 18px
            color: #323232
          .el-input
            border: none
            border-radius: 0
            .el-input__inner
              border: none
              border-bottom: 1px solid #DBDBDB
              border-radius: 0
              color: #323232
              transition: border .5s ease
              &:focus
                border-color: #1281FC
                transition: border .5s ease
      .submit
        width: 100%
        text-align: center
        margin: 60px 0 40px
        /deep/
          button
            padding: 10px 130px
            color: #fff
            font-size: 24px
            font-weight: bold
            border-radius: 3px
</style>
