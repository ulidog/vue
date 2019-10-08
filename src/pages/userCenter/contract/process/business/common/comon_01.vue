<template>
  <el-row class="common_01_views">
    <el-col :span="24" class="content">
      <header class="title-tip">
        <h3>{{!isSell ? (params.transactionMode === 2 ? title[0] : title[3] ) : (sellManagement ? title[2] : title[1])}}</h3>
        <div class="circles-box">
          <el-progress type="circle" :percentage="progress" :stroke-width="1" :width="324" :show-text="false"></el-progress>
          <span>{{ progressTime }} <p>days</p></span>
        </div>
        <footer class="showTime">
          <section class="begin">
            <img src="/static/img/contract/icons/times.png" alt="times">
            <span class="label">Begin</span>
            <span class="value">{{ params.tryConfessionStartTime | timerFormat }}</span>
          </section>
          <section class="end">
            <img src="/static/img/contract/icons/times.png" alt="times">
            <span class="label">End</span>
            <span class="value">{{ params.tryConfessionEndTime | timerFormat }}</span>
          </section>
        </footer>
        <section class="resonMsg" v-if="sellManagement">
          <span>The reason for check-out: {{denialReason}}</span>
        </section>
        <section class="remarsks" v-if="sellManagement">
          <section class="boxs">
            <h4><i class="el-icon-info"></i>The home is undamaged</h4>
            <p>The amount of refund is 5% total price of home beyond a breach of contract period.The reduction of rent during try-out period.</p>
          </section>
          <section class="boxs">
            <h4><i class="el-icon-info"></i>The home is damaged</h4>
            <p>The amount of refund is 5% total price of home beyond a breach of contract period.The reduction of rent during try-out period, charges of clean and repair. </p>
          </section>
        </section>
        <buy-doble-submit v-if="!isSell" @confirmChange="_ConfirmChange" @rejectChange="_ConfirmChange2" :confirmTitle=" params.transactionMode === 2 ? 'Early SFT Termination' : 'Early Traditional Termination' " :ConfirmLoading="ConfirmLoading" :rejectTitle="'Collect SFT Rent'"></buy-doble-submit>
        <buy-doble-submit v-if="sellManagement" @confirmChange="_ConfirmChange3" @rejectChange="_ConfirmChange4" :confirmTitle="'The home is undamaged'" :ConfirmLoading="ConfirmLoading" :rejectTitle="'The home is damaged.'"></buy-doble-submit>
      </header>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { getStateLineStore } from '@/utils'
import dobleSubmit from '@/components/contract/common/dobleSubmit'
export default {
  components: {
    'buy-doble-submit': dobleSubmit
  },
  data () {
    return {
      params: {
        tryConfessionStartTime: null,
        tryConfessionEndTime: null
      },
      title: ['Congratulations on your New SFT Purchase!', 'The Buyer Can Now Begin Their SFT Trial', 'The buyer has applied for ending of try-out,the days of trying-out: ', 'Congratulations on your New Traditional Purchase!'],
      ConfirmLoading: false,
      // 环形进度条
      progress: 100,
      progressTime: 0,
      // 是否为基础卖家或者买家
      isSell: false,
      sellManagement: false,
      denialReason: null,
      thisRole: null
    }
  },
  filters: {
    timerFormat: (times) => {
      console.log(times)
      if (times === null) return '00/0/0000'
      const timerInfo = new Date(times)
      return `${timerInfo.getMonth() + 1}/${timerInfo.getDate()}/${timerInfo.getFullYear()}`
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _ConfirmChange () {
      const _this = this
      _this.ConfirmLoading = true
      console.log('提交成功!')
      setTimeout(() => {
        _this.ConfirmLoading = false
        _this.$router.push({
          name: 'common-steps-03',
          query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
          params: _this.params
        })
      }, 500)
    },
    _ConfirmChange2 () {
      const _this = this
      const processFroms = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFroms})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-21',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _ConfirmChange3 () {
      const _this = this
      const processFroms = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFroms})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'sell-step-11',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _ConfirmChange4 () {
      const _this = this
      const processFroms = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFroms})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'sell-step-13',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            console.info(res)
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            _this.progressTime = res.data.data.remainingDays
            if (_this.progressTime > 0) {
              const times = (_this.params.tryConfessionEndTime - _this.params.tryConfessionStartTime) / 3600 / 1000 / 24
              _this.progress = res.data.data.remainingDays / times * 100
            } else {
              _this.progress = 0
            }
            if (Number(res.data.data.thisRole) === 1) {
              _this.isSell = false
            } else {
              _this.isSell = true
              if (Number(_this.params.state) === 15) {
                _this.sellManagement = true
              }
            }
            if (res.data.data.saleHouseOrderRecordingInfo !== undefined) {
              _this.denialReason = res.data.data.saleHouseOrderRecordingInfo.denialReason
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .common_01_views
    .content
      min-height: 730px
      background-color: #fff
      display: flex
      flex-direction: column
      padding: 20px 5.625em
      .title-tip
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        position: relative
        h3
          font-size: 1.4375em
          color: #444
          font-weight: bold
          display: flex
          width: 100%
          text-align: center
          justify-content: center
          margin: 20px 0 30px
        .circles-box
          position: relative
          display: flex
          align-items: center
          justify-content: center
          span
            position: absolute
            font-size: 124px
            color: #1281FC
            font-weight: bold
            background-color: #F4F4F4
            width: 310px
            height: 310px
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            p
              font-size: 19px
              color: #444
              position: absolute
              bottom: 30%
              right: 20%
              font-weight: bold
        .showTime
          width: 100%
          margin-top: 40px
          display: flex
          justify-content: center
          .begin,.end
            margin: 0 4.375em
            display: flex
            align-items: center
            .label
              font-size: 1.5625em
              color: #999
              font-weight: bold
            .value
              font-size: 1.5625em
              color: #444
              font-weight: bold
              margin-left: 15px
        .resonMsg
          display: flex
          justify-content: flex-start
          width: 100%
          margin-top: 70px
          span
            font-size: 1.4375em
            color: #444
        .remarsks
          border: 1px solid #ddd
          background-color: #f3f4f5
          border-radius: 5px
          padding: 20px 1.8em
          margin-top: 80px
          .boxs
            margin-bottom: 20px
            h4
              color: #444
              font-size: 23px
              font-weight: bold
              height: 35px
              line-height: 35px
              i
                margin-right: 10px
                color: #F48A42
            p
              color: #999
              font-size: 19px
              line-height: 25px
              margin-left: 25px
</style>
