<template>
  <el-row class="step_21_views">
    <el-col :span="24" class="content">
      <header class="titles" v-if="!otShowType">
        <h3>Service inspection</h3>
      </header>
      <section class="intro positionLative">
        <span>Please Choose The Services Needed Below For The Property Of Interest</span>
        <el-button type="text" v-if="otShowType" class="skip" @click="_skip">Skip</el-button>
      </section>
      <section class="inspectionType">
        <ul class="inspectionBox">
          <li v-for="item in inspectionTypeList" :key="item.id" :class="{'items-list': true, 'action': item.isCheck}" @click="typeChange(item)">
            <img v-lazy="item.imgUrl" :alt="item.serverName"/>
          </li>
        </ul>
      </section>
      <section class="intro">
        <span>How To Send The Property Inspection Report To The Seller</span>
        <article class="article">
          You can send the property inspection report, along with the company information to the seller via email or choose to upload the report via ebuyhouse platform.
        </article>
      </section>
      <section class="noticeType">
        <el-radio-group v-model="inspectionFrom.noticeType" class="noticeBox">
          <el-radio :label="2">Email</el-radio>
          <el-radio :label="3">Upload</el-radio>
        </el-radio-group>
      </section>
      <buy-confirm-and-reject
        v-if="otShowType"
        @confirmChange="_confirm"
        @rejectChange="_reject"
        :ConfirmLoading="ConfirmLoading"
        rejectTitle="Application for refund"
        :isDisabled="otShowTypeDisabled"
        :rejectType="rejectType">
      </buy-confirm-and-reject>
      <buy-confirm-and-reject
        v-else @confirmChange="_confirm"
        @rejectChange="_skip"
        :ConfirmLoading="ConfirmLoading"
        rejectTitle="Skip">
      </buy-confirm-and-reject>
      <span class="period" v-if="otShowTypeDisabled[1]">You have exceeded your a breach of contract period. You can't refuse</span>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getStateLineStore } from '@/utils'
import confirmAndReject from '@/components/contract/common/confirmAndReject'
export default {
  components: {
    'buy-confirm-and-reject': confirmAndReject
  },
  data () {
    return {
      params: {},
      inspectionTypeList: [],
      inspectionFrom: {
        inspectionActionType: [],
        noticeType: 2
      },
      ConfirmLoading: false,
      otShowType: false,
      otShowTypeDisabled: [false, false],
      rejectType: 'primary'
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.getOfferDetails()
    this.updateStatus(getStateLineStore(this.params.transactionMode, this.params.state))
    if (Number(this.processType) === 1) {
      this.otShowType = true
    } else {
      this.otShowType = false
    }
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
      const _this = this
      _this.ConfirmLoading = true
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1,
        checkServerMode: _this.inspectionFrom.noticeType,
        checkServerIds: _this.inspectionFrom.inspectionActionType.join(',')
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            if (Number(processFrom.checkServerMode) === 2) {
              _this.$router.push({
                name: 'buy-steps-22',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            } else {
              _this.$router.push({
                name: 'buy-steps-23',
                query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
                params: _this.params
              })
            }
          } else {
            _this.ConfirmLoading = false
          }
        })
        .catch(err => {
          _this.ConfirmLoading = false
          console.log(err)
        })
    },
    _reject () {
      const _this = this
      const processFrom = {
        processState: 195,
        saleHouseOrderId: _this.params.id,
        state: 2
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'common-steps-06',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    _skip () {
      const _this = this
      const processFrom = {
        processState: _this.params.state,
        saleHouseOrderId: _this.params.id,
        state: 1,
        checkServerMode: 1
      }
      _this.updateProcess({url: `${this.WXL_LOCAL_PATH}saleHouseOrder/update_process`, data: processFrom})
        .then(res => {
          // console.log(res)
          if (res.success) {
            _this.ConfirmLoading = false
            _this.$router.push({
              name: 'buy-steps-29',
              query: {ebuyhouse: _this.$base64.encode(JSON.stringify(_this.params))},
              params: _this.params
            })
          }
        })
    },
    typeChange (val) {
      if (val.isCheck) {
        // 删除选中的
        this.inspectionFrom.inspectionActionType.splice(this.inspectionFrom.inspectionActionType.indexOf(val.id), 1)
        val.isCheck = false
      } else {
        this.inspectionFrom.inspectionActionType.push(val.id)
        val.isCheck = true
      }
    },
    getOfferDetails () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_offer_detail`, {params: {saleHouseOrderId: _this.params.id, state: _this.params.oldState ? _this.params.oldState : null}})
        .then(res => {
          if (res.data.success) {
            // 更新
            _this.params = Object.assign({}, _this.params, res.data.data.saleHouseOrderInfo)
            if (res.data.data.checkServerList === undefined) return
            _this.inspectionTypeList = res.data.data.checkServerList.map(item => {
              item.isCheck = false
              return item
            })
            if (_this.otShowType) {
              _this.otShowTypeDisabled.splice(1, 1, !res.data.data.confessionButton)
              if (!res.data.data.confessionButton) {
                _this.rejectType = 'info'
              }
            }
          }
          // console.info(res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .step_21_views
    padding: 20px 3.75em
    background-color: #fff
    .content
      padding-bottom: 70px
      position: relative
      .titles
        h3
          color: #444
          font-size: 1.4375em
          height: 37px
          line-height: 37px
          font-weight: bold
          text-align: center
      .intro
        margin-top: 30px
        span
          color: #444
          font-size: 1.4375em
          height: 37px
          line-height: 37px
          font-weight: bold
        article
          margin-top: 20px
          font-size: 19px
          font-weight: 400
          color: rgba(153,153,153,1)
          line-height: 25px
      .positionLative
        position: relative
        display: flex
        /deep/ .skip
          position: absolute
          right: 1.875em
          padding: 0 1em
          color: #1281FC
          display: flex
          height: 100%
          right: -2em
          transition: all .5s ease
          span
            border-bottom: 2px solid #1281FC
            font-size: 1.25em
            color: #1281FC
            display: flex
            padding: 0 10px 5px
            transition: all .5s ease
          &:hover
            background: #1281FC
            transition: all .5s ease
            span
              color: #fff
              border-color: #fff
              transition: all .5s ease
      .inspectionType
        margin: 20px 20px
        padding: 0px 5.5em
        .inspectionBox
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          li.items-list
            margin-bottom: 55px
            position: relative
            width: 14.75em
            display: flex
            height: 10em
            z-index: 2
            align-items: center
            justify-content: center
            cursor: pointer
            img
              position: absolute
              width: 14.75em
              height: 10em
          li.action:before
            box-shadow: 1px 1px 1px 1px #9ecafa
            width: 105%
            height: 108%
            content: ''
            background-color: #9ecafa
            position: absolute
            top: -5%
            left: -3%
            border-radius: 8px
      .noticeType
        .noticeBox
          display: flex
          margin: 30px 0
          display: flex
          align-items: center
          /deep/ .el-radio
            display: flex
            align-items: center
          /deep/ .el-radio__input
            .el-radio__inner
              width: 24px
              height: 24px
              &:after
                width: 10px
                height: 10px
          /deep/ .el-radio__label
            font-size: 1.4735em
            padding-left: 20px
      .period
        height: 30px
        display: flex
        justify-content: center
        align-items: center
        background-color: rgba(0, 0, 0, 0.8)
        color: #fff
        font-size: 10px
        position: absolute
        bottom: 0
        width: 100%
        border-radius: 3px
        cursor: pointer
</style>
