<template>
  <el-row class="comon_success">
    <el-col class="header" :span="24">
      <header class="rate-titles">
        <h3>Evaluation</h3>
      </header>
      <section class="rate-box">
        <section class="rate-all">
          <span>The overall evaluation:</span>
          <el-rate
            v-model="successFrom.rateAll"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
        <section class="rate-other-side">
          <span>Other side:</span>
          <el-rate
            v-model="successFrom.otherSide"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
        <section class="rate-platfor-services">
          <span>Platform services:</span>
          <el-rate
            v-model="successFrom.platformServices"
            :colors="['#99A9BF', '#F7BA2A', '#f48a42']">
          </el-rate>
        </section>
      </section>
      <footer class="comments">
        <h4>Comments</h4>
        <el-input
          class="comments-textarea"
          type="textarea"
          placeholder="Write down your comments about the platform and the other person."
          v-model="successFrom.msg">
        </el-input>
      </footer>
    </el-col>
    <el-col :span="24" class="btn-submit">
      <comon-confirm-and-reject @confirmChange="_confirm" @rejectChange="_reject" :ConfirmLoading="ConfirmLoading" :confirmTitle="'Submit'" :rejectTitle="'Skip'"></comon-confirm-and-reject>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'comon-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      typeString: ['sale', 'rent'],
      params: null,
      successFrom: {
        rateAll: 0,
        otherSide: 0,
        platformServices: 0,
        msg: null
      },
      ConfirmLoading: false
    }
  },
  beforeCreate () {
    // 关闭主组件 （footer）
    this.$emit('configInfo', {
      showProcess: false,
      isFullScreen: true
    })
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (Number(this.processType) === 0) {
      this.typeString = this.typeString[1]
    } else {
      this.typeString = this.typeString[0]
    }
    this.getOfferDetails()
  },
  computed: {
    ...mapGetters({
      processType: 'processType'
    })
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    ...mapActions({
      updateProcess: 'update_process'
    }),
    _confirm () {
      if (this.successFrom.msg === null) { this.$message({message: 'Please fill in the reason of refusal', type: 'warning'}); return }
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1,
        denialReason: _this.tryitmsg,
        evaluateMode: 2
      }
      if (Number(this.processType) === 0) {
        delete processFrom.saleHouseOrderId
        processFrom[`${this.typeString}HouseOrderId`] = _this.params.id
      }
      const successFroms = {
        explainText: this.successFrom.msg,
        houseOrderId: this.params.id,
        overallEvaluation: this.successFrom.rateAll,
        platformService: this.successFrom.platformServices,
        theOtherSide: this.successFrom.otherSide
      }
      // console.log(successFroms)
      // return
      _this.$axios.post(`${this.WXL_LOCAL_PATH}${this.typeString}HouseOrder/insert_order_evaluate`, successFroms)
        .then(ress => {
          if (ress.data.success) {
            _this.updateProcess({url: `${this.WXL_LOCAL_PATH}${this.typeString}HouseOrder/update_process`, data: processFrom})
              .then(res => {
                // console.log(res)
                if (res.success) {
                  _this.ConfirmLoading = false
                  _this.$router.push({
                    name: 'common-steps-05',
                    query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                    params: _this.params
                  })
                } else {
                  _this.$message({
                    message: res.msg,
                    type: 'warning'
                  })
                }
              }).catch(err => {
                console.info('tag', err)
              })
          } else {
            _this.$message({
              message: ress.data.msg,
              type: 'warning'
            })
          }
        })
    },
    _reject () {
      // this.$router.push({
      //   name: 'common-steps-05',
      //   query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))},
      //   params: this.params
      // })
      // return
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1,
        evaluateMode: 1
      }
      if (Number(this.processType) === 0) {
        delete processFrom.saleHouseOrderId
        processFrom[`${this.typeString}HouseOrderId`] = _this.params.id
      }
      this.updateProcess({url: `${this.WXL_LOCAL_PATH}${this.typeString}HouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'common-steps-05',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          console.info('tag', err)
        })
    },
    getOfferDetails () {
      const _this = this
      let paramsId = JSON.parse(`{ "${this.typeString}HouseOrderId": "${_this.params.id}" }`)
      _this.$axios.get(`${this.WXL_LOCAL_PATH}${this.typeString}HouseOrder/find_offer_detail`, {params: paramsId})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data[`${this.typeString}HouseOrderInfo`])
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .comon_success
    .header
      background-color: #fff
      .rate-titles
        height: 62px
        border-bottom: 1px solid #f3f4f5
        display: flex
        justify-content: center
        align-items: center
        h3
          font-size: 1.8125em
          color: #444444
      .rate-box
        .rate-all,.rate-other-side,.rate-platfor-services
          display: flex
          justify-content: space-between
          height: 64px
          align-items: center
          padding: 0 30px
          span
            font-size: 1.5625em
            color: #444444
          /deep/ .el-rate
            span
              i
                font-size: 34px
      .comments
        margin: 125px 30px 25px
        h4
          padding-bottom: 20px
          font-size: 1.5625em
          color: #444
        /deep/ .comments-textarea.el-textarea
          height: 290px
          width: 100%
          .el-textarea__inner
            width: 100%
            height: 100% !important
            font-size: 1.4325em
            border: none
            background-color: #f3f4f5
            resize: none
</style>
