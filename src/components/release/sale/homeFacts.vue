<style scoped>
.el-form{
  width: 70%;
}

.el-form-item{
  padding-left: 1rem;
}

.el-form .el-row:last-child .el-form-item {
  margin-bottom: 0;
}

.el-select{
  width: 100%;
}
</style>

<template>
  <div class="part-container">
    <h4>Home Features</h4>
    <div class="part-body">
      <el-form ref="form" :model="ruleForm" :rules="rules" label-width="120px">

        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="Price" prop="price">
              <el-input placeholder="$" v-model="unitPriceAll">
                <!-- <template slot="prepend">$</template> -->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="Bedrooms" prop="bedroom">
              <el-select v-model="ruleForm.bedroom" filterable placeholder="Studio">
                <el-option v-for="(item, index) in bedroomOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Kitchen" prop="kitchen">
              <el-select v-model="ruleForm.kitchen" filterable placeholder="0">
                <el-option v-for="(item, index) in kitchenOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="Bathrooms" prop="bathroom">
              <el-select v-model="ruleForm.bathroom" filterable placeholder="0">
                <el-option v-for="(item, index) in bathroomOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Garage" prop="garage">
              <el-select v-model="ruleForm.garage" filterable placeholder="0">
                <el-option v-for="(item, index) in garageOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="Parcel #">
              <el-input v-model="ruleForm.parcel" minlength="5" maxlength="15" placeholder="Please enter 5-15digits"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MLS#" prop="mls">
              <el-input v-model="ruleForm.mls" placeholder="Please enter 2-15digits"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'ruleForm': {
        'unit': '$',
        'price': null,
        'bedroom': 0,
        'kitchen': null,
        'bathroom': 0,
        'garage': null,
        'parcel': null,
        'mls': null
      },
      'rules': {
        'price': [
          { 'required': true, 'message': 'Enter the price', 'trigger': 'blur' }
          // { 'type': 'number', 'message': 'Only numbers may be entered' }
        ],
        'bedroom': [
          { 'required': true, 'message': 'Select the number of bedrooms', 'trigger': 'change' }
        ],
        'kitchen': [
          { 'required': false, 'message': 'Select the number of kitchen', 'trigger': 'change' }
        ],
        'bathroom': [
          { 'required': true, 'message': 'Select the number of bathrooms', 'trigger': 'change' }
        ],
        'garage': [
          { 'required': false, 'message': 'Select the number of garages', 'trigger': 'change' }
        ],
        'parcel': [
          { 'required': true, 'message': 'Enter the parcel', 'trigger': 'change' }
        ],
        'mls': [
          { 'required': false, 'message': 'Enter the MLS', 'trigger': 'blur' }
        ]
      },
      'bedroomOptions': [{'label': 'Studio', 'value': 'studio'}],
      'kitchenOptions': [],
      'bathroomOptions': [],
      'garageOptions': []
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
    isSubmitNow: {
      handler (_new, _old) {
        if (_new) {
          this.submitForm('form')
        }
      },
      deep: true,
      immediate: true
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
  'methods': {
    // 回显
    EchoChange (_info) {
      this.ruleForm.price = this.priceformat(_info.price)
      this.ruleForm.bedroom = _info.bedroom
      this.ruleForm.kitchen = _info.kitchen
      this.ruleForm.bathroom = _info.bathroom
      this.ruleForm.garage = _info.garage
      this.ruleForm.parcel = _info.apn
      this.ruleForm.mls = _info.mls
    },
    initOptions () {
      for (let i = 0; i <= 100; i++) {
        this.bedroomOptions.push({label: i, value: i})
        this.kitchenOptions.push({label: i, value: i})
        this.garageOptions.push({label: i, value: i})
      }
      for (let i = 0; i <= 100; i += 0.5) {
        this.bathroomOptions.push({'label': i, 'value': i})
      }
    },
    inputInteger (_e, _field) {
      const target = _e.target
      let value = target.value
      value = value.replace(/[^$.\d]/g, '')
      value = value.replace('/./g', '')
      target.value = value
      _field = value
    },
    submitForm (formName) {
      if (this.ruleForm.bedroom === 'Studio') {
        this.ruleForm.bedroom = 'studio'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(
            'collectData',
            {
              'price': this.ruleForm.price.replace(/\D/g, ''),
              'bedroom': this.ruleForm.bedroom,
              'kitchen': this.ruleForm.kitchen,
              'bathroom': this.ruleForm.bathroom,
              'garage': this.ruleForm.garage,
              'apn': this.ruleForm.parcel,
              'mls': this.ruleForm.mls,
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
      return this.ruleForm.unit + AfterProgressing.reverse().join('')
    }
  },
  computed: {
    unitPriceAll: {
      get: function () {
        return this.ruleForm.price
      },
      set: function (p) {
        this.ruleForm.price = this.priceformat(p.replace(/\D/g, ''))
      }
    }
  },
  mounted () {
    this.initOptions()
  }
}
</script>
