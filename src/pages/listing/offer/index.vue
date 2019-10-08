<template>
  <el-row class="offerView">
    <el-col class="header">
      <offer-form :isSubmitNow="isSubmitNow" @collectData="collectData"></offer-form>
      <offer-form1 :isSubmitNow="isSubmitNow" @collectData="collectData" v-if="offerType === 3 ? false : true"></offer-form1>
      <offer-form2 :isSubmitNow="isSubmitNow" @collectData="collectData"></offer-form2>
      <offer-form3 :isSubmitNow="isSubmitNow" @collectData="collectData" :offerForm="data" :offerType="offerType" v-if="offerType === 3 ? false : true"></offer-form3>
      <offer-form4 :isSubmitNow="isSubmitNow" @collectData="collectData" v-if="offerType === 3 ? false : true"></offer-form4>
      <offer-form5 :isSubmitNow="isSubmitNow" @collectData="collectData" :updownKeyWords="data" v-if="offerType === 2 ? true : false"></offer-form5>
      <offer-form8 :isSubmitNow="isSubmitNow" @collectData="collectData" :offerForm="data" v-if="offerType === 3 ? true : false"></offer-form8>
      <offer-form7 :isSubmitNow="isSubmitNow" @collectData="collectData" :offerForm="data" v-if="offerType === 3 ? true : false"></offer-form7>
      <offer-form6 :isSubmitNow="isSubmitNow" @collectData="collectData" :offerForm="data"></offer-form6>
    </el-col>
    <el-col class="submit">
      <!-- <el-button @click="sendOffer">{{ isLease ? btnsTitle[1] : btnsTitle[0]}}</el-button> -->
      <el-button @click="triggerSubmit" :loading="submitLoading" class="sub-btns-trigger">Submit</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { getToken } from '@/utils/session'
import form from '@/components/listing/offer/form'
import form1 from '@/components/listing/offer/form1'
import form2 from '@/components/listing/offer/form2'
import form3 from '@/components/listing/offer/form3'
import form4 from '@/components/listing/offer/form4'
import form5 from '@/components/listing/offer/form5'
import form6 from '@/components/listing/offer/form6'
import form7 from '@/components/listing/offer/form7'
import form8 from '@/components/listing/offer/form8'
export default {
  components: {
    'offer-form': form,
    'offer-form1': form1,
    'offer-form2': form2,
    'offer-form3': form3,
    'offer-form4': form4,
    'offer-form5': form5,
    'offer-form6': form6,
    'offer-form7': form7,
    'offer-form8': form8
  },
  data () {
    return {
      Url: [`${this.WXL_LOCAL_PATH}saleHouseOrder/insert_sale_house_order`, `${this.WXL_LOCAL_PATH}rentHouseOrder/insert_rent_house_order`],
      data: {
        origin: 1,
        confessionDays: 10
      },
      isSubmitNow: false,
      isStopCollectData: false,
      collectDataTimes: 0,
      offerType: 1,
      checkFormNum: 0,
      submitLoading: false
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (!_new) {
        this.collectDataTimes = 0
        this.isStopCollectData = false
      }
    },
    'data.transactionMode': function (_new, _old) {
      // console.log(_new)
      this.offerType = Number(_new)
    }
  },
  // 实例化前
  beforeCreate () {
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      if (this.params.type) {
        this.offerType = 3
      }
      this.Url = this.offerType === 3 ? this.Url[1] : this.Url[0]
    } catch (err) {
    }
  },
  methods: {
    triggerSubmit () {
      if (getToken()) {
        this.submitLoading = true
        this.isSubmitNow = true
      } else {
        this.$store.commit('signOut', true)
      }
    },
    submit (_param) {
      const _this = this
      _this.submitLoading = true
      if (_param.flag) {
        // console.log('success')
        // console.log(_param)
        // return
        this.$axios.post(this.Url, _param)
          .then(res => {
            // console.log(res)
            if (res.data.success) {
              _this.submitLoading = false
              _this.$message({
                message: 'Successful Offer',
                type: 'success'
              })
              setTimeout(() => {
                _this.$router.push({
                  name: 'process-null',
                  params: {id: (res.data.data.saleHouseOrder && res.data.data.saleHouseOrder.id) || res.data.data.rentHouseOrderId, state: res.data.data.state, types: _this.getTypes(), type: _this.getType()},
                  query: {ebuyhouse: _this.$base64.encode(JSON.stringify({id: (res.data.data.saleHouseOrder && res.data.data.saleHouseOrder.id) || res.data.data.rentHouseOrderId, state: res.data.data.state, types: _this.getTypes(), type: _this.getType()}))}
                })
              }, 500)
            } else {
              _this.submitLoading = false
              _this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          })
          .catch(err => {
            console.info(err)
            _this.submitLoading = false
          })
      } else {
        _this.submitLoading = false
        this.$message.error(_param.msg || '')
      }
      this.isSubmitNow = false
    },
    getTypes () {
      if (this.offerType === 3) {
        return 1
      } else {
        return 0
      }
    },
    getType () {
      if (this.offerType === 2) {
        return 0
      } else {
        return 1
      }
    },
    collectData (_data) {
      const _this = this
      if (this.isStopCollectData) return
      if (_data.flagJson) {
        _this.data = Object.assign({}, _this.data, _data)
        return
      }
      // console.log(_data, _this.collectDataTimes, _this.checkFormNumChange(_this.offerType))
      if (_data.flag) {
        Object.assign(_this.data, _data)
        if (++_this.collectDataTimes >= _this.checkFormNumChange(_this.offerType)) {
          _this.submit(_this.data)
        }
      } else {
        _this.isStopCollectData = true
        _this.submit(_data)
      }
    },
    checkFormNumChange (_type) {
      let checkNum
      switch (Number(_type)) {
        case 1:
          checkNum = 6
          break
        case 2:
          checkNum = 7
          break
        case 3:
          checkNum = 5
          break
        default:
          // 设置最大值 不让用户提交数据
          checkNum = 1000
      }
      return checkNum
    }
  }
}
</script>
<style lang="sass" scoped>
  .offerView
    .submit
      display: flex
      justify-content: center
      margin: 30px 0
      .sub-btns-trigger
        height: 2.3em
        background-color: #1281FC
        font-size: 1.5em
        width: 18em
        color: #fff
</style>
