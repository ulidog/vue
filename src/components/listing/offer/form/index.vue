<template>
  <div></div>
  <!-- <div class="offer-continer">
    <el-form ref="offerForm" :model="offerForm" :rules="rules" class="offerForm pad_top_30">
      <el-form-item label="housesId" prop="housesId">
        <el-select
          v-model="offerForm.housesId"
          filterable
          @change="fetchHouseInfo(offerForm.housesId)"
          placeholder="请输入apn">
          <el-option
            v-for="item in houseIdList"
            :key="item.id"
            :label="item.apn"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div> -->
</template>
<script>
export default {
  data () {
    return {
      params: {},
      houseIdList: [],
      offerForm: {},
      // rules: {
      //   housesId: [
      //     { required: true, message: '请输入房屋ID --- 测试', trigger: 'blur' }
      //   ]
      // },
      CopyForm6KeysWords: ['apn', 'zip', 'livingSqft', 'street', 'price', 'deposit']
    }
  },
  props: {
    isSubmitNow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (_new) {
        this.collectFrom('offerForm')
      }
    }
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      if (this.params.housesId === null || this.params.type === undefined) {
        this.$message({
          message: 'The parameter is incorrect and will return to the previous step',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 3000)
        return
      }
      this.offerForm['housesId'] = this.params.housesId
    } catch (err) {
      this.$message({
        message: 'The parameter is incorrect and will return to the previous step',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
    }
    // this.fetchHouseIdList()
  },
  mounted () {
    try {
      this.fetchHouseInfo(this.params.housesId)
    } catch (err) {
    }
  },
  methods: {
    fetchHouseIdList () {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/select/house`, {params: {pageSize: 1000}})
        .then(res => {
          // console.log(res.data.data.rows)
          if (res.data.success) {
            _this.houseIdList = res.data.data.rows
          }
        })
    },
    collectFrom (formName) {
      delete this.offerForm.flagJson
      this.$emit('collectData', Object.assign({flag: true}, this.offerForm))
    },
    fetchHouseInfo (_houseId) {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/item`, {params: {houseId: _houseId}})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            const serverKeys = res.data.data
            Object.keys(serverKeys).filter(item => {
              _this.CopyForm6KeysWords.forEach(childItem => {
                if (item === childItem) {
                  Object.assign(_this.offerForm, JSON.parse(`{"${item}": "${serverKeys[item]}"}`))
                }
                if (item === 'price') {
                  Object.assign(_this.offerForm, JSON.parse(`{"monthlyRent": "${serverKeys[item]}"}`))
                }
              })
            })
            // console.log(_this.offerForm)
            this.$emit('collectData', Object.assign({flagJson: true}, _this.offerForm))
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .offer-continer
    margin-bottom: 20px
    border-radius: 3px
    overflow: hidden
    background-color: #fff
    padding: 0 3.875em
    .pad_top_30
      padding: 30px 0 10px
    .offerForm
      /deep/ .el-form-item
        position: relative
      /deep/ .el-form-item:first-child:before
        content: ''
        width: 100%
        height: 2px
        background-color: #F3F4F5
        position: absolute
        bottom: -11px
      /deep/ .el-form-item__label
        font-size: 1.3750em
        font-wight: bold
        color: #444
        float: none
</style>
