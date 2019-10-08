<style lang="scss" scoped>
.el-form{
  width: 80%;
}

.el-form .el-row:last-child .el-form-item {
  margin-bottom: 0;
}

.el-select{
  width: 100%;
}

.rent-payment-radio-group .el-radio{
  margin-left: 0;
  margin-right: 20px;
}

.rent-payment-radio-group>div:first-child>.col-1,
.rent-payment-radio-group>div:first-child>.col-2{
  float: left;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <div class="part-container">
    <h4>Features</h4>
    <div class="part-body">

      <el-form :model="form" :rules="rules" :inline="false" ref="form" label-width="220px">
        <el-form-item label="Rental type" prop="rentalType">
          <el-radio-group v-model="form.rentalType">
            <el-radio :label="2">Whole House</el-radio>
            <el-radio :label="3">Single Room</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="11" :xl="12" :lg="18" :md="20" :sm="20" :xs="20">
            <el-form-item label="Rent/month" prop="monthlyRent">
              <el-input v-model="unitMonthlyRent" placeholder="">
                <template slot="append">$</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :xl="12" :lg="18" :md="20" :sm="20" :xs="20">
            <el-form-item label="Deposit" prop="deposit">
              <el-input v-model="unitDeposit" placeholder="">
                <template slot="append">$</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Rent payment" prop="rentPayment">
          <el-radio-group v-model="form.rentPayment" class="rent-payment-radio-group">
            <div>
              <div class="col-1">
                <el-radio :label="1">Monthly</el-radio>
                <el-radio :label="4">Quarterly</el-radio>
                <el-radio :label="2">Half year</el-radio>
                <el-radio :label="3">Yearly</el-radio>
              </div>
              <div class="col-2">
                <!-- <el-radio label="Other"></el-radio>
                <el-input v-model="form.customRentPayment" :disabled="form.rentPayment!=='Other'"></el-input> -->
              </div>
            </div>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Interior Decoration Grade" prop="interiorDecorationGrade">
          <el-radio-group v-model="form.interiorDecorationGrade">
            <el-radio label="A+"></el-radio>
            <el-radio label="A-"></el-radio>
            <el-radio label="B+"></el-radio>
            <el-radio label="B-"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-row :gutter="0">
          <el-col :span="12" :xl="12" :lg="18" :md="20" :sm="20" :xs="20">
            <el-form-item label="Bedrooms" prop="bedrooms">
              <el-select v-model="form.bedrooms" filterable placeholder="Studio">
                <el-option v-for="(item, index) in bedroomOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xl="12" :lg="18" :md="20" :sm="20" :xs="20">
            <el-form-item label="Kitchen" prop="kitchen">
              <el-select v-model="form.kitchen" filterable placeholder="0">
                <el-option v-for="(item, index) in kitchenOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="Bathrooms" prop="bathrooms">
              <el-select v-model="form.bathrooms" filterable placeholder="0">
                <el-option v-for="(item, index) in bathroomOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Garage" prop="garage">
              <el-select v-model="form.garage" filterable placeholder="0">
                <el-option v-for="(item, index) in garageOptions" :key="item + index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Parcel #">
              <el-input v-model="form.parcel" placeholder="Please enter 1-15 digits"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MLS#">
              <el-input v-model="form.mls" placeholder="Please enter 2-15 digits"></el-input>
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
      form: {
        unit: '$',
        rentalType: 2,
        monthlyRent: null,
        deposit: null,
        rentPayment: 1,
        // customRentPayment: null,
        interiorDecorationGrade: 'A+',
        bedrooms: null,
        kitchen: null,
        bathrooms: 0,
        garage: null,
        parcel: null,
        mls: null
      },
      rules: {
        rentalType: [
          { required: true, message: 'Please choose the type of rental.', trigger: 'change' }
        ],
        monthlyRent: [
          { required: true, message: 'Please enter monthly rent.', trigger: 'blur' },
          { required: true, message: 'Please enter monthly rent.', trigger: 'change' }
        ],
        deposit: [
          { required: true, message: 'Please enter the deposit amount.', trigger: 'blur' },
          { required: true, message: 'Please enter the deposit amount.', trigger: 'change' }
        ],
        rentPayment: [
          { required: true, message: 'Please choose or fill out the rent payment method.', trigger: 'change' }
        ],
        interiorDecorationGrade: [
          { required: true, message: 'Please choose the grade of interior decoration.', trigger: 'change' }
        ],
        bedrooms: [
          { required: true, message: 'Please enter the number of bedrooms.', trigger: 'change' }
        ],
        bathrooms: [
          { required: true, message: 'Please enter the number of bathrooms.', trigger: 'change' }
        ],
        parcel: [
          { required: true, message: 'Please enter the parcel.', trigger: 'blur' },
          { required: true, message: 'Please enter the parcel.', trigger: 'change' }
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
  methods: {
    // 回显数据
    EchoChange (_info) {
      this.form.monthlyRent = this.priceformat(_info.price)
      this.form.deposit = this.priceformat(_info.deposit)
      this.form.rentPayment = _info.rentPayment
      this.form.interiorDecorationGrade = _info.decorateGrade
      this.form.bedrooms = _info.bedroom
      this.form.kitchen = _info.kitchen
      this.form.bathrooms = _info.bathroom
      this.form.garage = _info.garage
      this.form.parcel = _info.apn
      this.form.mls = _info.mls
    },
    priceformat (p) {
      let AfterProgressing = []
      p.toString().replace(/\$/g, '').split('').filter(items => {
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
      return this.form.unit + AfterProgressing.reverse().join('')
    },
    generateBedroomOptions () {
      for (let i = 0; i <= 100; i++) {
        this.bedroomOptions.push({'label': i, 'value': i})
      }
    },
    generateKitchenOptions () {
      for (let i = 0; i <= 100; i++) {
        this.kitchenOptions.push({'label': i, 'value': i})
      }
    },
    generateBathroomOptions () {
      for (let i = 0; i <= 100; i += 0.5) {
        this.bathroomOptions.push({'label': i, 'value': i})
      }
    },
    generateGarageOptions () {
      for (let i = 0; i <= 100; i++) {
        this.garageOptions.push({'label': i, 'value': i})
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(
            'collectData',
            {
              'dealType': this.form.rentalType,
              'price': this.form.monthlyRent.replace(/\D/g, ''),
              'deposit': this.form.deposit.replace(/\D/g, ''),
              'rentPayment': this.form.rentPayment,
              'decorateGrade': this.form.interiorDecorationGrade,
              'bedroom': this.form.bedrooms,
              'kitchen': this.form.kitchen,
              'bathroom': this.form.bathrooms,
              'garage': this.form.garage,
              'apn': this.form.parcel,
              'mls': this.form.mls,
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
    this.generateBedroomOptions()
    this.generateKitchenOptions()
    this.generateBathroomOptions()
    this.generateGarageOptions()
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
  computed: {
    unitMonthlyRent: {
      get: function () {
        return this.form.monthlyRent
      },
      set: function (p) {
        this.form.monthlyRent = this.priceformat(p)
      }
    },
    unitDeposit: {
      get: function () {
        return this.form.deposit
      },
      set: function (p) {
        this.form.deposit = this.priceformat(p)
      }
    }
  }
}
</script>
