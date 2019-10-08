<style lang="scss" scoped>
.el-form {
  width: 85%;
}

.el-form .el-row:last-child .el-form-item {
  margin-bottom: 0;
}

/deep/ .el-radio {
  width: 25%;
  margin-left: 0;
  margin-bottom: 22px;
}

/deep/ .el-select {
  width: 80px;
  padding-left: 0;
  padding-right: 0;
}

/deep/ .part-body .radioGroup {
  padding-top: 15px;
}

</style>

<template>
  <div class="part-container">
    <h4>Building Info</h4>
    <div class="part-body">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="145px">

        <el-row>
          <el-col :span="24">
            <el-form-item label="Housing Type" prop="houseType" :style="{marginBottom: 0}">
              <el-radio-group v-model="ruleForm.houseType" class="radioGroup">
                <el-radio v-for="(item, index) in houseTypeData" :key="item.label + index" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="Living-sqft" prop="livingSqft">
              <el-input v-model="livingSqft">
                <template slot="append">sqft</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&ensp;</el-col>
          <el-col :span="12">
            <el-form-item label="Lot-size" prop="floorAreaNum">
              <el-input placeholder="" v-model="floorAreaNum" class="input-with-select">
                <el-select v-model="ruleForm.floorAreaUnit" slot="append">
                  <el-option label="sqft" value="sqft"></el-option>
                  <el-option label="acre" value="acre"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="Garage-sqft">
              <el-input v-model="garageSqft">
                <template slot="append">sqft</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&ensp;</el-col>
          <el-col :span="12">
            <el-form-item label="Basement-sqft" label-width="188px">
              <el-input v-model="basementSqft">
                <template slot="append">sqft</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="Year-built" prop="yearBuilt">
              <el-input v-model.number="ruleForm.yearBuilt" :max="new Date().getFullYear()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&ensp;</el-col>
          <el-col :span="12">
            <el-form-item label="HOA fee/month" label-width="188px" prop="hoaFee">
              <el-input v-model="hoaFee" placeholder="$"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// const priceFormat = Vue.filter('priceFormat')
export default {
  data () {
    // let validatorLotUnit = (rule, value, callback) => {
    //   if (value) {
    //     if (this.ruleForm.floorAreaUnit === 'sqft') {
    //       if (!new RegExp(/^[0-9]\d*$/).test(value)) {
    //         callback(new Error('Only numbers may be entered'))
    //       }
    //     } else {
    //       if (!new RegExp(/^([1-9]\d*|0)(\.\d{1,6})?$/).test(value)) {
    //         callback(new Error('The input format is incorrect or only supports 6 decimal places.'))
    //       }
    //     }
    //     callback()
    //   }
    // }
    return {
      'houseTypeData': [],
      'ruleForm': {
        'houseType': null,
        'livingSqft': null,
        'floorAreaUnit': 'sqft',
        'floorAreaNum': null,
        'yearBuilt': null,
        'hoaFee': null,
        'garageSqft': null,
        'basementSqft': null
      },
      'rules': {
        'houseType': [
          { 'required': true, 'message': 'Please select the house type', 'trigger': 'blur' }
        ],
        'livingSqft': [
          { 'required': true, 'message': 'Please enter the living sqft', 'trigger': 'blur' }
        ],
        'floorAreaNum': [
          { 'required': true, 'message': 'Please enter the lot sqft', 'trigger': 'blur' }
        ],
        'garageSqft': [
          { 'type': 'number', 'message': 'Only numbers may be entered' }
        ],
        'basementSqft': [
          { 'type': 'number', 'message': 'Only numbers may be entered' }
        ],
        'yearBuilt': [
          { 'required': true, 'message': 'Please enter the year built', 'trigger': 'blur' },
          { 'type': 'number', 'message': 'Only numbers may be entered' },
          { 'validator': (rule, value, callback) => {
            if (value) {
              // console.log(value)
              if (value > new Date().getFullYear() || value < 1970) {
                callback(new Error('Please enter the correct year'))
              }
              callback()
            }
          },
          'trigger': ['blur', 'change'] }
        ],
        'hoaFee': [
          { 'required': true, 'message': 'Please enter the hoa fee', 'trigger': 'blur' }
        ]
      }
    }
  },
  'props': {
    'isSubmitNow': {
      'type': Boolean,
      'default': false
    },
    'editForm': {
      'type': Object,
      'default': null
    }
  },
  'watch': {
    isSubmitNow (_new) {
      if (_new) {
        this.submitForm('ruleForm')
      }
    },
    editForm: {
      handler (_new, _old) {
        // console.log('--------------------------------->')
        // console.log(_new)
        if (Object.keys(_new).length !== 0) {
          this.EchoChange(_new)
        }
      },
      deep: true
      // immediate: true
    }
  },
  'computed': {
    hoaFee: {
      get: function () {
        return this.ruleForm.hoaFee
      },
      set: function (p) {
        this.ruleForm.hoaFee = this.priceformat(p)
      }
    },
    // Numformat
    livingSqft: {
      get: function () {
        return this.ruleForm.livingSqft
      },
      set: function (p) {
        this.ruleForm.livingSqft = this.Numformat(p)
      }
    },
    floorAreaNum: {
      get: function () {
        return this.ruleForm.floorAreaNum
      },
      set: function (p) {
        this.ruleForm.floorAreaNum = this.Numformat(p)
      }
    },
    garageSqft: {
      get: function () {
        return this.ruleForm.garageSqft
      },
      set: function (p) {
        this.ruleForm.garageSqft = this.Numformat(p)
      }
    },
    basementSqft: {
      get: function () {
        return this.ruleForm.basementSqft
      },
      set: function (p) {
        this.ruleForm.basementSqft = this.Numformat(p)
      }
    }
  },
  'methods': {
    // 回显数据
    EchoChange (_info) {
      this.ruleForm.livingSqft = _info.livingSqft
      this.ruleForm.floorAreaUnit = _info.userInputUnit.split(' ')[1]
      this.ruleForm.floorAreaNum = _info.userInputUnit.split(' ')[0].replace(/,/g, '')
      this.ruleForm.houseType = _info.houseTypeId
      this.ruleForm.yearBuilt = _info.yearBuild
      this.ruleForm.hoaFee = this.priceformat(_info.hoaFee)
      this.ruleForm.garageSqft = _info.garageSqft
      this.ruleForm.basementSqft = _info.basementSqft
    },
    priceformat (p) {
      let AfterProgressing = []
      p.toString().replace(/\D/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return '$' + AfterProgressing.reverse().join('')
    },
    Numformat (p) {
      let AfterProgressing = []
      p.toString().replace(/\D/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return AfterProgressing.reverse().join('')
    },
    getHouseTypeData () {
      const _this = this
      _this.$axios.get(`${_this.SH_HOUSE_PROD_PATH}thouses/house/type`)
        .then(res => {
          const data = res.data
          if (data.success) {
            data.data.forEach((item, index) => _this.houseTypeData.push({'label': item.name, 'value': item.id}))
            _this.ruleForm.houseType = _this.houseTypeData[0].value
          }
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(
            'collectData', {
              'livingSqft': this.ruleForm.livingSqft.replace(/\D/g, ''),
              'lotSqft': this.ruleForm.floorAreaUnit !== 'sqft' ? Number(this.ruleForm.floorAreaNum.replace(/\D/g, '')) * 43560 : this.ruleForm.floorAreaNum.replace(/\D/g, ''),
              'userInputUnit': `${this.Numformat(this.ruleForm.floorAreaNum)} ${this.ruleForm.floorAreaUnit}`,
              'houseTypeId': this.ruleForm.houseType,
              'yearBuild': this.ruleForm.yearBuilt,
              'hoaFee': this.ruleForm.hoaFee.replace(/\D/g, ''),
              'garageSqft': this.ruleForm.garageSqft ? this.ruleForm.garageSqft.replace(/\D/g, '') : null,
              'basementSqft': this.ruleForm.basementSqft ? this.ruleForm.basementSqft.replace(/\D/g, '') : null,
              'flag': true
            }
          )
        } else {
          this.$emit(
            'collectData',
            {
              'msg': 'Please fill in all the required information to submit this listing for approval',
              'flag': false
            }
          )
        }
      })
    }
  },
  mounted () {
    this.getHouseTypeData()
  }
}
</script>
