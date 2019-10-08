<style lang='sass' scoped>
  .content-container
    width: 860px
    display: flex
    flex-direction: column
    .title
      text-align: center
      padding: 0 0 0.5em
      margin: 0
      font-size: 2.143em
      color: #444444
      // font-weight: bold
      border-bottom: 2px solid #F3F4F5
    .content
      padding: 1em 0
      .comment
        color: #444444
        font-size: 1.428em
        line-height: 1.6em
      .bgContent
        display: inline-block
        margin: 40px 0
        padding: 20px
        background-color: #F3F4F5
        display: flex
        font-size: 1.428em
        border-radius: 5px
        .toIcon
          margin-right: 1em
          .tips-icon
            margin-top: 0.2em
            width: 1em
            heihgt: 1em
            vertical-align: middle
        .toMain
          .tit
            color: #444444
            line-height: 1.6em
            font-weight: bold
            margin-bottom: 0.5em
            display: block
          .dl
            display: flex
            line-height: 1.6em
            margin-bottom: 0.5em
            .dd-list
              padding-left: 2em
      .calculator-ruleForm
        .el-select
          display: block
      #myChart
        width: 95%
        height: 300px
        margin: 20px auto
        border: 1px solid #CCC
      /deep/ .el-collapse-item__header
        background-color:#F6F6F6
        padding-left: 20px
      /deep/ .el-collapse-item__content
        padding: 40px 20px
        .el-checkbox__label
          padding-bottom: 20px
    .el-autocomplete
      width: 100%
  .el-form
    position:relative!important
    .el-form-item:nth-of-type(4)
      position:absolute!important
      top: 124px
      right: 0
      .el-form-item__content
        margin-left: 0!important
      .el-input
        .el-input__inner
        width: 302.48px!important
</style>

<template>
  <div class="content-container">
    <h3 class="title">Mortgage Calculator</h3>
    <div class="content">
      <p class="comment">
        Fill out the form below with details about the home, your down payment, and the price of the home to receive an estimation on the mortgage payment.
      </p>
      <article class="bgContent">
        <div class="toIcon">
          <img class="tips-icon" src="/static/img/helpCenter/tips.png" alt="tips.png">
        </div>
        <div class="toMain">
          <div class="rows">
            <span class="tit">Have you or your spouse served in the military?</span>
          </div>
          <div class="rows dl">
            <p class="dt">Veterans may be entitled to:</p>
            <ul class="dd-list">
              <li style="list-style: disc">Zero Down Payment</li>
              <li style="list-style: disc">No mortgage insurance</li>
              <li style="list-style: disc">Lower interest rate</li>
            </ul>
          </div>
          <div class="rows">
            <el-checkbox
              v-model="isChecked"
              @change="getChecked"
            >Yes! Apply veterans benefits</el-checkbox>
          </div>
        </div>
      </article>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        label-position="left"
        hide-required-asterisk
        class="calculator-ruleForm"
      >
        <el-form-item label="Address" prop="address">
          <el-autocomplete
          v-model="ruleForm.address"
          :fetch-suggestions="querySearchAsync"
          placeholder="City or Zip Code"
          @select="handleSelect">
        </el-autocomplete>
        </el-form-item>
        <el-form-item label="Home Price ($)">
          <el-input v-model="ruleForm.housePrice" @change="homePriceChange" @keydown="homePriceChange" :readonly="islock"></el-input>
        </el-form-item>
        <el-form-item label="Down Payment" prop="downPayment">
          <el-col :span="11">
            <el-input :disabled="downPaymenttype" v-model="ruleForm.downPayment" @change="downPaymentChange" @keydown="downPaymentChange" :readonly="islock"></el-input>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
        </el-form-item>
        <el-form-item prop="taxRate">
          <el-col :span="11">
            <el-input v-model="ruleForm.taxRate" @change="taxRateChange" :readonly="islock"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Loan Program">
          <el-col :span="11">
            <el-select
              v-model="ruleForm.loanType.label"
              placeholder="Please select the type of repayment"
              @change="selectLoadType"
            >
              <el-option
                v-for="(item,index) in optionType"
                :key="item.years"
                :label="item.label"
                :value="item.value"
                @click.native="getMonthlyRate(item.years,item.yearRate,index)"
              ></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-input v-model="curPercent" disabled :readonly="islock"></el-input>
          </el-col>
        </el-form-item>
        <vue-charts :dataMess="totalPrice"></vue-charts>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="More Options" name="1">
            <el-form-item label="Property Tax Rate (%)" prop="taxRate">
              <el-col :span="11">
                <el-input
                  v-model.number="ruleForm.taxRate"
                  @keyup.native="handleInput($event,'taxRate')" :readonly="islock"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Home Insurance ($)" prop="homeInsurance">
              <el-col :span="11">
                <el-input
                  v-model="ruleForm.homeInsurance" :readonly="islock"
                  @change="priceFormat('homeInsurance')"
                  @keyup.native="handleInput($event,'homeInsurance')"
                ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Condo/HOA Fees ($)" prop="HOA">
              <el-col :span="11">
                <el-input v-model="ruleForm.HOA" @keyup.native="handleInput($event,'HOA')" @change="priceFormat('HOA')" :readonly="islock"></el-input>
              </el-col>
            </el-form-item>
            <vue-charts v-if="activeName[0] == '1'" :dataMess="dataMess2"></vue-charts>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
  </div>
</template>

<script>
import echarts from '@/components/helpCenter/echarts.vue'
export default {
  data () {
    return {
      islock: true,
      activeName: ['1'],
      curPercent: '',
      cityList: [],
      monthlyRate: 0,
      month: 0,
      index: 0,
      downPaymenttype: false,
      placeholder: 'City or Zip Code',
      isChecked: false,
      dataMess1: {
        optionValue: 1800,
        param: [{ value: '1800', name: 'Principal & Interest' }]
      },
      dataMess2: {
        optionValue: '1800',
        param: [
          { value: '', name: 'Principal & Interest' },
          { value: '', name: 'Property Taxes' },
          { value: '', name: 'Home Insurance' },
          { value: '', name: 'Condo/HOA Fees' }
        ]
      },
      optionType: [
        {
          label: '30-Year Fixed',
          years: 30,
          value: '10%',
          yearRate: 0.1
        },
        {
          label: '20-Year Fixed',
          years: 20,
          value: '9%',
          yearRate: 0.09
        },
        {
          label: '10-Year Fixed',
          years: 10,
          value: '8%',
          yearRate: 0.08
        },
        {
          label: '5-Year Fixed',
          years: 5,
          value: '5%',
          yearRate: 0.05
        }
      ],
      ruleForm: {
        address: null,
        housePrice: 0,
        taxRate: '20%',
        homeInsurance: 0,
        HOA: 0,
        downPayment: 0,
        loanType: {
          label: null,
          value: null
        }
      },
      rules: {
        downPayment: [
          // { type: 'number', message: 'Can only enter numbers', trigger: 'blur' }
        ],
        taxRate: [
          // { message: 'Can only enter numbers', trigger: 'blur' }
        ],
        homeInsurance: [
          // { type: 'number', message: 'Can only enter numbers', trigger: 'blur' }
        ],
        HOA: [
          // { type: 'number', message: 'Can only enter numbers', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    'vue-charts': echarts
  },
  methods: {
    selectLoadType (e) {
      this.curPercent = e
    },
    handleInput (e, target) {
      this.ruleForm[target] =
        e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null
    },
    countOption () {
      this.dataMess2.optionValue =
        Number(this.ruleForm.homeInsurance) || 0 +
        Number(this.ruleForm.HOA) || 0 +
        Number(this.ruleForm.downPayment) || 0
      console.log(this.dataMess2.optionValue)
    },
    getMonthlyRate (years, yearRate, index) {
      this.monthlyRate = yearRate / years
      this.month = years * 12
      this.index = index
    },
    querySearchAsync (queryString, callback) {
      let list = [{}]
      let url = `${this.SH_MAP_PROD_PATH}region/list/Str?keyword=` + queryString
      this.$axios.get(url).then((response) => {
        for (let i of response.data.data) {
          i.value = i.cityAscii
        }
        console.log(response.data)
        list = response.data.data
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    async handleSelect (item) {
      let res = await this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/averaging/city?cityId=${item.id}&&dealType=1`)
      this.ruleForm.housePrice = Math.ceil(res.data.data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      if (JSON.stringify(res.data.data) === '{}') {
        this.ruleForm.housePrice = 0
      }
      this.islock = false
      this.homePriceChange()
    },
    getChecked () {
      console.log(this.isChecked)
      if (this.isChecked) {
        this.ruleForm.taxRate = 0
        this.ruleForm.downPayment = 0
        this.downPaymenttype = true
      } else {
        this.ruleForm.taxRate = 20
        this.downPaymenttype = false
      }
    },
    // 价格换算
    homePriceChange () {
      if (!this.ruleForm.taxRate || Number(this.ruleForm.taxRate.toString().replace(/%/g, '')) === 0) {
        this.ruleForm.downPayment = (Number(this.ruleForm.housePrice.replace(/,/g, '')).toFixed(2) * 0.2).toFixed(3)
        this.ruleForm.taxRate = '20%'
      } else {
        this.ruleForm.downPayment = (Number(this.ruleForm.housePrice.replace(/,/g, '')).toFixed(2) * Number(this.ruleForm.taxRate.toString().replace(/%/g, '')) / 100).toFixed(3)
      }
      this.ruleForm.housePrice = Number(this.ruleForm.housePrice.replace(/,/g, '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.ruleForm.downPayment = Number(this.ruleForm.downPayment.replace(/,/g, '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    },
    // 输入实时更新
    downPaymentChange () {
      if (parseFloat(this.ruleForm.downPayment.replace(/,/g, '')) > parseFloat(this.ruleForm.housePrice.replace(/,/g, ''))) {
        this.ruleForm.downPayment = this.ruleForm.housePrice
      }
      this.ruleForm.downPayment = Number(this.ruleForm.downPayment.replace(/,/g, '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.ruleForm.taxRate = Number(Number(this.ruleForm.downPayment.replace(/,/g, '')).toFixed(2) / Number(this.ruleForm.housePrice.replace(/,/g, '')).toFixed(2) * 100).toFixed(3) + '%'
    },
    taxRateChange () {
      if (!this.ruleForm.taxRate) {
        this.ruleForm.taxRate = 0
      }
      if (Number(this.ruleForm.taxRate.toString().replace(/%/g, '')) > 100) {
        this.ruleForm.taxRate = 100
      }
      this.ruleForm.downPayment = (this.ruleForm.housePrice.toString().replace(/,/g, '') * Number(this.ruleForm.taxRate.toString().replace(/%/g, '')) / 100).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.ruleForm.taxRate += '%'
    },
    priceFormat (_name) {
      this.ruleForm[_name] = Number(this.ruleForm[_name].toString().replace(/,/g, '')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
  },
  watch: {
    'ruleForm.downPayment': {
      handler (newVal) {
        this.dataMess2.param[0].value = Number(newVal.toString().replace(/,/g, '')) ? Number(newVal.toString().replace(/,/g, '')) : 0
        this.countOption()
      },
      immediate: true
    },
    'ruleForm.taxRate': {
      handler (newVal) {
        const deleteSign = Number(newVal.toString().replace(/%/g, ''))
        this.dataMess2.param[1].value = (deleteSign * this.ruleForm.downPayment) / 100
        this.countOption()
        // console.log(this.dataMess2)
      },
      immediate: true
    },
    'ruleForm.homeInsurance': {
      handler (newVal) {
        this.dataMess2.param[2].value = newVal.toString().replace(/,/g, '')
        this.countOption()
        // console.log(this.dataMess2)
      },
      immediate: true
    },
    'ruleForm.HOA': {
      handler (newVal) {
        this.dataMess2.param[3].value = Number(newVal.toString().replace(/,/g, '')) ? Number(newVal.toString().replace(/,/g, '')) : 0
        this.countOption()
      },
      immediate: true
    },
    'dataMess2.optionValue': {
      handler () {
        this.dataMess2.optionValue = this.totalPrice.optionValue
      },
      immediate: true
    }
  },
  computed: {
    totalPrice () {
      if (!this.ruleForm.housePrice || this.ruleForm.housePrice === 0) {
        return {
          optionValue: 0,
          param: [{ value: 1800, name: 'Principal & Interest' }]
        }
      } else {
        let P = Number(this.ruleForm.housePrice.toString().replace(/,/g, '')).toFixed(2) - Number(this.ruleForm.downPayment.toString().replace(/,/g, '')).toFixed(2)
        let R = this.optionType[this.index].yearRate / 12
        let N = this.optionType[this.index].years * 12
        let total = Math.ceil(P * R * Math.pow((1 + R), N) / (Math.pow((1 + R), N) - 1))
        let obj = {
          optionValue: total,
          param: [{ value: 1800, name: 'Principal & Interest' }]
        }
        return obj
      }
    }
  }
}
</script>
