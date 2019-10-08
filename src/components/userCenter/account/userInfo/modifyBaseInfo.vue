<style scoped lang="scss">
.title{
  margin-top: 2em;
  margin-bottom: 1.5em;
  font-size: 1.2em;
}

table{
  width: 100%;
  border-spacing: 0;
}

td{
  font-size: 1.2em;
  height: 4em;
  padding-bottom: 1em;
  white-space: nowrap;
  color: #909090;
}

td:first-child{
  padding-right: 2em;
}

.tr-city-state td>div{
  float: left;
  width: 30%;
}

.tr-city-state .el-input{
  margin-left: 5%;
}

.el-button--primary{
  display: block;
  font-size: 1.2em;
  margin: 0.8em auto 0;
}
.error {
  position: relative;
  /deep/ .el-input__inner {
    border: 1px solid #f56c6c;
    color: #f56c6c;
    transition: all .5s ease;
  }
  .tip {
    color: #f56c6c;
    position: absolute;
    left: 0;
    bottom: 0.5em;
    font-size: 14px;
  }
}
.success {
  position: relative;
  /deep/ .el-input__inner {
    border: 1px solid #67c23a;
    transition: all .5s ease;
  }
}
</style>

<template>
  <div>
    <h6 class="title">Basic Information</h6>
    <table>
      <tbody>
        <!-- <tr>
          <td>Nick name</td>
          <td colspan="2">
           <el-input v-model="accounts.nickname" placeholder="Please enter the content" clearable></el-input>
          </td>
        </tr> -->
        <tr>
          <td>Gender</td>
          <td colspan="2">
            <el-radio-group v-model="accounts.sex">
              <el-radio :label="1">Male</el-radio>
              <el-radio :label="2">Female</el-radio>
              <!-- <el-radio :label="3">Confidential</el-radio> -->
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>Address</td>
          <td colspan="2" :class="{'error': !formTip.tipAddressStatus, 'success': formTip.tipAddressStatus}">
            <el-input v-model="accounts.address" placeholder="Address" clearable @change="CheckAddressShreet"></el-input>
            <span class="tip">{{formTip.tipaddress}}</span>
          </td>
        </tr>
        <tr class="tr-city-state">
          <td></td>
          <td colspan="2" :class="{'error': !formTip.tipCityStateStatus, 'success': formTip.tipCityStateStatus}">
            <el-autocomplete v-model="accounts.cityName" :fetch-suggestions="getCityData" placeholder="Please Enter City"
            @select="onSelectCity" @change="CheckCityState" clearable></el-autocomplete>
            <!-- <el-select v-model="accounts.cityName" placeholder="Please Choose City" @change="onSelectCity(val)">
              <el-option @click.native="mmps(item)" v-for="item in cityData" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select> -->
            <el-input v-model="accounts.stateId" placeholder="state" @change="CheckCityState" disabled></el-input>
            <el-input v-model="accounts.zip" :maxlength="6" placeholder="Please Enter Zip Code" @change="CheckCityState" clearable></el-input>
            <span class="tip">{{formTip.tipcitystate}}</span>
          </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>First Name</td>
          <td :class="{'error': !formTip.tipFrtStatus, 'success': formTip.tipFrtStatus}">
            <el-input v-model="accounts.firstname" placeholder="" clearable @change="CheckFirstName"></el-input>
            <span class="tip">{{formTip.tipfirstname}}</span>
          </td>
        </tr>
        <!-- <tr>
          <td></td>
          <td>middle name</td>
          <td :class="{'error': !formTip.tipMldStatus, 'success': formTip.tipMldStatus}">
            <el-input v-model="accounts.middlename" placeholder="" clearable @change="CheckMiddleName"></el-input>
            <span class="tip">{{formTip.tipmiddlename}}</span>
          </td>
        </tr> -->
        <tr>
          <td></td>
          <td>Last Name</td>
          <td :class="{'error': !formTip.tipLastStatus, 'success': formTip.tipLastStatus}">
            <el-input v-model="accounts.lastname" placeholder="" clearable @change="CheckLastName"></el-input>
            <span class="tip">{{formTip.tiplastname}}</span>
          </td>
        </tr>
        <tr v-if="accounts.type === 2">
          <td>Company Name</td>
          <td colspan="2">
           <el-input v-model="accounts.companyName" placeholder="Please enter the content" clearable></el-input>
          </td>
        </tr>
      </tbody>
    </table>
    <el-button type="primary" @click="submit">Save</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'accounts': {},
      'cityData': [],
      'cityDataCheck': [],
      'formTip': {
        'tipfirstname': null,
        'tipmiddlename': null,
        'tiplastname': null,
        'tipaddress': null,
        'tipcitystate': null,
        'tipFrtStatus': true,
        'tipMldStatus': true,
        'tipLastStatus': true,
        'tipAddressStatus': true,
        'tipCityStateStatus': true
      },
      'isEdit': true
    }
  },
  mounted () {
    this.Myaccount()
    this.getCityData()
  },
  'methods': {
    checkCityName (_cityname) {
      let _status = false
      this.cityData.map(item => {
        if (item.value === _cityname) {
          if (item.cityId === this.accounts.cityId && item.stateId === this.accounts.stateId) {
            _status = true
          }
        }
      })
      return _status
    },
    // 获取城市数据
    getCityData (keyword, cb) {
      // 改变默认状态
      this.isEdit = false
      this.$axios.get(
        `${this.SH_MAP_PROD_PATH}region/list/Str`,
        {
          params: {
            'keyword': keyword,
            'pageNum': 1,
            'pageSize': 100
          }
        }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            if (data.data instanceof Array && data.data.length > 0) {
              // this.accounts.cityId = data.data[0].id
              this.cityData = data.data.map(item => {
                return {'value': item.cityAscii, 'cityId': item.id, 'stateId': item.stateId}
              })
            } else {
              this.accounts.cityId = -1
              this.cityData = []
            }
            cb(this.cityData)
          } else {
            // alert(data.msg);
          }
        })
        .catch(error => { if (error) {} })
    },
    // 选择城市回调方法
    onSelectCity (_cityInfo) {
      this.accounts.cityId = _cityInfo.cityId
      this.accounts.stateId = _cityInfo.stateId
      this.formTip.tipcitystate = ''
      this.formTip.tipCityStateStatus = true
    },
    Myaccount () {
      this.$axios({
        'method': 'GET',
        'url': `${this.wxl_path}user/pc_userInfo`,
        'headers': {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          const data = response.data.data.userInfo
          if (response.data.success) {
            // this.stateName = response.data.data.stateName
            // this.cityName = response.data.data.cityName
            console.log(response)
            this.accounts = Object.assign({}, {cityName: response.data.data.cityNameAbbreviation}, data)
            console.log(this.accounts)
            // 2019-6-9根据优化文档用户性别仅分男女，去掉保密选项
            if (Number(this.accounts.sex) !== 1 || Number(this.accounts.sex) !== 2) {
              this.accounts.sex = 1
            }
            this.isEdit = true
          } else {
            // alert(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 修改
    submit () {
      // console.log(this.CheckAddress())
      const cloneFrom = Object.assign({}, this.accounts)
      delete cloneFrom.phoneAreaCodeId
      delete cloneFrom.phone
      if (!this.isEdit && !this.checkCityName(cloneFrom.cityName)) {
        this.formTip.tipcitystate = 'Please select a city from the drop down list'
        this.formTip.tipCityStateStatus = false
        return
      }
      // if (this.accounts.cityName)
      if (this.formTip.tipFrtStatus && this.formTip.tipLastStatus && this.CheckAddress()) {
        this.$axios({
          'method': 'POST',
          'url': `${this.wxl_path}user/updateUserInfo/pc`,
          'data': cloneFrom
        })
          .then(response => {
            if (response.data.success) {
              this.$message.success(response.data.msg)
              this.$emit('setOperateName', 'viewBaseInfo')
            }
          })
          .catch(error => {
            if (error) {}
            console.log(error)
          })
      }
    },
    CheckAddressShreet (value) {
      if (value) {
        this.formTip.tipaddress = null
        this.formTip.tipAddressStatus = true
        return true
      }
      this.formTip.tipaddress = 'Please enter the street address.'
      this.formTip.tipAddressStatus = false
      return false
    },
    CheckCityState (value) {
      // 改变默认状态
      this.isEdit = false
      if (value) {
        this.formTip.tipcitystate = null
        this.formTip.tipCityStateStatus = true
        return true
      }
      this.formTip.tipcitystate = 'Please improve the address'
      this.formTip.tipCityStateStatus = false
      return false
    },
    CheckAddress () {
      // this.CheckAddressShreet(this.accounts.address)
      // this.CheckCityState(this.accounts.cityName)
      // this.CheckCityState(this.accounts.stateId)
      // this.CheckCityState(this.accounts.zip)
      // this.CheckFirstName(this.formTip.tipfirstname)
      // this.CheckLastName(this.formTip.tiplastname)
      // alert(this.CheckCityState(this.accounts.cityName))
      if (
        this.CheckAddressShreet(this.accounts.address) &&
        this.CheckCityState(this.accounts.cityName) &&
        this.CheckCityState(this.accounts.stateId) &&
        this.CheckCityState(this.accounts.zip) &&
        this.CheckFirstName(this.formTip.tipfirstname) &&
        this.CheckLastName(this.formTip.tiplastname)) {
        return true
      }
      this.$message.info('Please complete the information and submit')
      return false
    },
    CheckFirstName (value) {
      if (value) {
        if (new RegExp(/((?=[\x21-\x7e]+)[^A-Za-z.])/im).test(value)) {
          this.formTip.tipfirstname = 'Special characters are not allowed'
          this.formTip.tipFrtStatus = false
          return false
        }
      }
      this.formTip.tipfirstname = null
      this.formTip.tipFrtStatus = true
      return true
    },
    // CheckMiddleName (value) {
    //   if (value) {
    //     if (new RegExp(/((?=[\x21-\x7e]+)[^A-Za-z0-9.])/im).test(value)) {
    //       this.formTip.tipmiddlename = 'Special characters are not allowed'
    //       this.formTip.tipMldStatus = false
    //       return false
    //     }
    //   }
    //   this.formTip.tipmiddlename = null
    //   this.formTip.tipMldStatus = true
    //   return true
    // },
    CheckLastName (value) {
      if (value) {
        if (new RegExp(/((?=[\x21-\x7e]+)[^A-Za-z.])/im).test(value)) {
          this.formTip.tiplastname = 'Special characters are not allowed'
          this.formTip.tipLastStatus = false
          return false
        }
      }
      this.formTip.tiplastname = null
      this.formTip.tipLastStatus = true
      return true
    }
  }
}
</script>
