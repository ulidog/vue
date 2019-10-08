<template>
  <el-row class="comon_trading_axis">
    <el-col class="header" :span="24">
      <header class="trading-axis-titles">
        <h3>Application Details</h3>
        <section class="block-type">
          <span class="seller" v-if="this.params.types !== 1">Seller</span>
          <span class="seller" v-else>Renter</span>
          <span class="buyer" v-if="this.params.types !== 1">Buyer</span>
          <span class="buyer" v-else>Landlord</span>
          <span class="offer" @click="goViewOffer">Check Contract</span>
        </section>
      </header>
      <section class="trading-axis-box">
        <ul class="trading-items-all">
          <template>
            <!--  v-show="item.processCode !== 400" -->
            <li :class="['trading-axis-item', item.thisRole == 2 ? 'seller' : 'buyer']" v-for="(item, index) in tradingAxis" :key="item.processCode * index * parseInt(Math.random() * 100)">
              <header class="anthor-img">
                <img :src="item.headUrl" :alt="item.nickname">
              </header>
              <section class="trading-info">
                <h3 class="anthor-name-info">{{item.nickname}} <span style="cursor: pointer;" @click="goProcessPage(item)">{{ item.englishProcessName }}</span></h3>
                <span class="timer">{{ item.createTime|timerFormat }}</span>
              </section>
            </li>
          </template>
        </ul>
      </section>
      <footer class="btns-type">
        <el-button>End of the contract</el-button>
      </footer>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
export default {
  components: {
  },
  data () {
    return {
      params: {},
      ConfirmLoading: false,
      tradingAxis: [],
      typeCodeString: ['sale', 'rent']
    }
  },
  filters: {
    timerFormat: (timer) => {
      if (timer === null) return
      const time = timer.toString().length > 10 ? timer : timer + '000'
      const timers = new Date(Number(time))
      return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    }
  },
  mounted () {
    // 关闭主组件 （footer）
    this.$emit('configInfo', {
      showProcess: false,
      isFullScreen: true,
      isShowProceeLine: true
    })
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.types !== 1) {
      this.typeCodeString = this.typeCodeString[0]
    } else {
      this.typeCodeString = this.typeCodeString[1]
      this.updateStatus(getStateLineStore(0, this.params.state))
    }
    this.fetchTradingAxisData()
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    _confirm () {
      if (this.successFrom.msg === null) { this.$message({message: 'Please fill in the reason of refusal', type: 'warning'}); return }
      const _this = this
      const successFroms = {
        explainText: this.successFrom.msg,
        houseOrderId: this.params.id,
        overallEvaluation: this.successFrom.rateAll,
        platformService: this.successFrom.platformServices,
        theOtherSide: this.successFrom.otherSide
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}${this.typeCodeString}HouseOrder/update_process`, data: successFroms})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
          } else {
          }
        }).catch(err => {
          console.info('tag', err)
        })
    },
    _reject () {
      this.$router.push({
        path: '/userCenter/contract/process/landlord/step-04-refuse'
      })
    },
    fetchTradingAxisData () {
      const _this = this
      let fetchParams = {}
      fetchParams[`${this.typeCodeString}HouseOrderId`] = _this.params.id
      _this.$axios.get(`${this.WXL_LOCAL_PATH}${this.typeCodeString}HouseOrder/find_${this.typeCodeString}_house_order_timeline`, {params: fetchParams})
        .then(res => {
          console.log(res)
          if (res.data.success) {
            _this.tradingAxis = res.data.data.orderTimelineList
          }
        })
        .catch(err => {
          console.info(err)
        })
    },
    goViewOffer () {
      // type: 1
      // types: 0
      if (this.params.types === 1) {
        this.$router.push({
          name: 'view-offer',
          query: {ebuyhouse: this.$base64.encode(JSON.stringify({type: 3, id: this.params.id}))}
        })
      } else {
        if (this.params.type === 0) {
          this.$router.push({
            name: 'view-offer',
            query: {ebuyhouse: this.$base64.encode(JSON.stringify({type: 2, id: this.params.id}))}
          })
        } else {
          this.$router.push({
            name: 'view-offer',
            query: {ebuyhouse: this.$base64.encode(JSON.stringify({type: 1, id: this.params.id}))}
          })
        }
      }
    },
    goProcessPage (_info) {
      // this.state
      if (this.params.types === 1) {
        this.$router.push({
          name: 'process-null',
          query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.houseOrderId, type: 0, types: 1, oldState: _info.processCode}))},
          params: {id: _info.houseOrderId, type: 0, types: 1}
        })
      } else {
        if (this.params.type === 0) {
          this.$router.push({
            name: 'process-null',
            query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.houseOrderId, type: 0, types: 0, oldState: _info.processCode}))},
            params: {id: _info.houseOrderId, type: 0, types: 0}
          })
        } else {
          this.$router.push({
            name: 'process-null',
            query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.houseOrderId, type: 1, types: 0, oldState: _info.processCode}))},
            params: {id: _info.houseOrderId, type: 1, types: 0}
          })
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  $sellerColor: #FF9900
  $buyerColor: #1281FC
  .comon_trading_axis
    .header
      background-color: #fff
      .trading-axis-titles
        height: 155px
        flex-direction: column
        border-bottom: 1px solid #f3f4f5
        display: flex
        align-items: center
        h3
          font-size: 1.8125em
          color: #444444
          height: 60px
          line-height: 60px
        .block-type
          height: 95px
          width: 100%
          display: flex
          justify-content: flex-start
          align-items: center
          .offer
            color: $buyerColor
            cursor: pointer
          span
            width: 140px
            font-size: 1.5625em
            color: #444
            padding: 0 60px
            position: relative
            display: inline-block
            height: 25px
            line-height: 25px
          span.seller:before
            content: ''
            width: 25px
            height: 25px
            background-color: $sellerColor
            border-radius: 50%
            position: absolute
            left: 30px
          span.buyer:before
            content: ''
            width: 25px
            height: 25px
            background-color: $buyerColor
            border-radius: 50%
            position: absolute
            left: 30px
      .trading-axis-box
        .trading-items-all
          margin: 30px 20px
          .trading-axis-item
            height: 90px
            display: flex
            align-items: center
            margin-bottom: 30px
            position: relative
            .anthor-img
              width: 83px
              height: 83px
              margin-left: 45px
              border-radius: 50%
              img
                width: 100%
                height: 100%
                border-radius: 50%
            .trading-info
              height: 83px
              padding-left: 15px
              display: flex
              flex-direction: column
              justify-content: center
              >h3.anthor-name-info
                font-size: 1.5625em
                color: #444
                height: 35px
                line-height: 25px
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                width: 400px
                >span
                  color: $buyerColor
              >span
                color: #999
                font-size: 1.1875em
          .trading-axis-item.buyer
            &:before
              content: ''
              width: 20px
              height: 20px
              background-color: $buyerColor
              border-radius: 50%
              position: absolute
              left: 10px
              z-index: 9
            &:after
              content: ''
              height: 100px
              width: 1px
              background-color: #999999
              position: absolute
              left: 20px
              top: -65px
              z-index: 8
          .trading-axis-item.seller
            &:before
              content: ''
              width: 20px
              height: 20px
              background-color: $sellerColor
              border-radius: 50%
              position: absolute
              left: 10px
              z-index: 9
            &:after
              content: ''
              height: 100px
              width: 1px
              background-color: #999999
              position: absolute
              left: 20px
              top: -65px
              z-index: 8
          .trading-axis-item:first-child
            &:after
              display: none
      .btns-type
        padding: 0px 30px 60px
        /deep/ button
          width: 100%
          background-color: #999999
          color: #fff
          outline: none
          border: none
          &:active
            border: none
          &:focus
            border: none
          &:hover
            border: none
</style>
