<template>
  <section class="signature-file-container">
    <div class="request-state-group">
      <div class="title">Service List</div>
      <el-radio-group v-model="serviceState" @change="changeState">
        <el-radio label="available" @click.native="serviceType('available')">
          Available
          <!-- <router-link to="">Available</router-link> -->
        </el-radio>
        <el-radio label="check" @click.native="serviceType('check')">
          Check
          <!-- <router-link to="">Check</router-link> -->
        </el-radio>
        <el-radio label="refused" @click.native="serviceType('refused')">
          Refused
          <!-- <router-link to="">Refused</router-link> -->
        </el-radio>
        <el-radio label="soldOut" @click.native="serviceType('soldOut')">
          Sold Out
          <!-- <router-link to="">Sold Out</router-link> -->
        </el-radio>
      </el-radio-group>
      <div class="listBox">
        <ul v-if = 'listData.length > 0'>
          <!-- <li>
            <img class="pic" src="/static/img/article/advertorial/office.jpg" alt="">
            <div class="txt">
              <p class="tit">Rand C Waldron, DDS</p>
              <P class="num"><img src="/static/img/listing/icons/bed.png" alt="">(702)9163883</P>
              <P class="add"><img src="/static/img/listing/icons/bed.png" alt="">11291 Dolcetto Dr,Las Vegas,NV,342523</P>
              <p class="btns">
                <span>Airsoft</span>
                <span>Basketball Courts</span>
              </p>
            </div>
            <div class="twoBtn">
              <el-button v-show="serviceState !== 'check'" type="primary" plain>Edit</el-button>
              <el-button v-show="serviceState === 'available' || serviceState === 'check'" type="primary" plain>Sold out</el-button>
              <el-button v-show="serviceState === 'refused' || serviceState === 'soldOut'" type="primary" plain>Delete</el-button>
            </div>
          </li> -->
          <li v-for='(item, index) in listData' :key='index' @click="gotoDetail(item)">
            <img class="pic" v-lazy="item.logo || item.imgUrl || '/static/img/service/service_fengmian.png'">
            <div class="txt">
              <p class="tit">{{item.company}}</p>
              <P class="num"><i class="iconfont icon-message_phone"></i>&nbsp;&nbsp;{{item.phone | telephoneFormat}}</P>
              <!-- <P class="add"><i class="iconfont icon-search-location"></i>&nbsp;&nbsp;{{item.address ? item.address + ',' : ''}} {{item.cityName ? item.cityName + ',' : ''}} {{item.stateId ? item.stateId : ''}} {{item.companyCode ? item.companyCode : ''}}</P> -->
              <P class="add"><i class="iconfont icon-search-location"></i>&nbsp;&nbsp;{{item.address}}</P>
              <p class="btns" v-if = "item.types && Array.isArray(item.types) && item.types.length > 0">
                <span v-for = '(mark, index) in item.types' :key='index'>{{mark.type || mark.typeName}}</span>
              </p>
            </div>
            <div class="twoBtn">
              <!-- <el-button v-show="serviceState !== 'check'" @click.stop.native="toEdit(item)" type="primary" plain>Edit</el-button> -->
              <el-button v-show="serviceState === 'available' || serviceState === 'check'" @click.stop.native="toSoldout(item.id)" type="primary" plain>Sold out</el-button>
              <el-button v-show="serviceState === 'refused' || serviceState === 'soldOut'" @click.stop.native="toDelete(item.id)" type="primary" plain>Delete</el-button>
            </div>
          </li>
        </ul>
        <!-- 没有服务商数据 -->
        <div class="noData" v-if='listData.length === 0'>
          <img src="/static/img/service/service_emptyMark.png" alt="">
          <p class='uploadService' @click="openServiceUpload"><span><em>+</em> Upload Service</span></p>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        v-if = 'dataTotal > pageSize'
        class="clear servicePage"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="dataTotal"
        :current-page="pageIndex"
        @current-change="pageTurn"
      >
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      serviceState: this.$route.params.type,
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      listData: [] // 列表数据
    }
  },
  created () {
    const self = this
    self.initDataLoad()
  },
  computed: {
    ...mapGetters({
      GlobalUserInfo: 'GlobalUserInfo'
    })
  },
  methods: {
    ...mapMutations({
      serviceProviderFn: 'UPDATA_SERVICE_PROVIDER_FN'
    }),
    // 跳转至服务商详情
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {
        //   ebuyhouse: this.$base64.encode(
        //     JSON.stringify({ id: _id })
        //   )
        // }
      })
    },
    openServiceUpload () {
      if (this.GlobalUserInfo.isonceLogin === 6) {
        this.$router.push({path: '/upload-user-service'})
      } else {
        this.serviceProviderFn(true)
      }
    },
    // 编辑
    toEdit (paramData) {
      // console.log('22222222')
      // console.log(params)
      // console.log('33333333')
      // 跳转到编辑携带处理后的回显数据
      this.$router.push({name: 'upload-user-service', params: {editBackData: paramData}})
    },
    // 下架
    toSoldout (params) {
      let self = this
      self.$axios.post(`${this.ZJC_SERVER_PROD_PATH}service-company/update/shelf/status`, {companyId: params, shelfStatus: 2})
        .then(res => {
          if (res.data.success) {
            let stateNum
            if (self.serviceState === 'available') {
              stateNum = '2'
            } else if (self.serviceState === 'check') {
              stateNum = '1'
            } else if (self.serviceState === 'refused') {
              stateNum = '3'
            } else if (self.serviceState === 'soldOut') {
              stateNum = '4'
            }
            self.initDataLoad(stateNum) // 更新列表数据
            self.$message({message: res.data.msg, type: 'success', duration: 2000})
          } else {
            self.$message({message: res.data.msg, type: 'error', duration: 2000})
          }
        })
    },
    // 删除
    toDelete (params) {
      let self = this
      self.$axios.post(`${this.LJJ_SERVER_PROD_PATH}service-company/delete/company`, {companyId: params})
        .then(res => {
          if (res.data.success) {
            self.initDataLoad() // 更新列表数据
            self.$message({message: res.data.msg, type: 'success', duration: 2000})
          } else {
            self.$message({message: res.data.msg, type: 'error', duration: 2000})
          }
        })
    },
    changeState (_state) {
    },
    pageTurn (_num) {
      let self = this
      self.initDataLoad(_num)
    },
    serviceType (_val) {
      console.log(_val)
      this.$router.push({path: '/userCenter/service/' + _val})
    },
    // 初始加载列表数据
    initDataLoad (_num = 1) {
      const self = this
      let _info = {}
      self.pageIndex = _num
      if (self.serviceState === 'available') {
        _info.checkStatus = 2
        _info.shelfStatus = 1
      } else if (self.serviceState === 'check') {
        _info.checkStatus = 1
        _info.shelfStatus = 1
      } else if (self.serviceState === 'refused') {
        _info.checkStatus = 3
        _info.shelfStatus = 1
      } else if (self.serviceState === 'soldOut') {
        _info.shelfStatus = 2
      }
      self.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/list/company`, {params: Object.assign({}, _info, {pageNum: self.pageIndex, pageSize: self.pageSize})})
        .then(res => {
          if (res.data.success && Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
          // if (res.data.success && Array.isArray(res.data.data.rows)) {
            self.dataTotal = res.data.data.total
            self.listData = res.data.data.rows
            // self.dataTotal = 13
            // self.listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
          } else {
            self.listData = []
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .signature-file-container
    margin-left: 20px
    background-color: #fff
    display: flex
    flex-direction: column
    width: 100%
    min-height: 900px
    padding: 2.25rem 2.3rem
    .noData
      text-align: center
      padding: 8rem 0 1rem
      .uploadService
        margin-top: 5rem
        span
          display: inline-block
          padding: 0 1rem
          height: 3rem
          line-height: 3rem
          border-radius: 1.5rem
          background: #1281fc
          color: #fff
          font-size: 1.5rem
          cursor: pointer
          transition: all linear 0.2s
          em
            font-size: 1.8rem
            margin-right: 0.5rem
          &:hover
            font-size: 1.6rem
    .servicePage
      margin-top: 30px
      text-align: right
    .request-state-group
      .title
        font-size: 24px
        color: #444
        margin-bottom: 40px
      /deep/ .el-radio__label
        font-size: 20px
      /deep/ .el-radio__input
        vertical-align: bottom
      /deep/ .el-radio__inner
        width: 16px
        height: 16px
      .listBox
        ul
          li
            height: 11rem
            margin-top: 5rem
            overflow: hidden;
            border-radius: 5px;
            transition: all linear 0.3s;
            .pic
              float: left
              width: 27%
              border-radius: 5px
              height: 11rem
              margin-right: 1.2rem
              transition: all linear 0.3s;
              &:hover
                transform: scale(1.05);
            .txt
              float: left
              padding-top: 1rem
              width: 44%
              .tit
                font-size: 1.5rem
                color: #444
              .num
                font-size: 1.16rem
                color: #999
                margin-top: 1.5rem
                margin-bottom: 0.8rem
                img
                  width: 1rem
                  height: 1rem
                  margin-right: 0.5rem
                  vertical-align: middle
              .add
                font-size: 1.16rem
                color: #999
                margin-bottom: 0.8rem
                height: 1.4rem
                overflow: hidden
                img
                  width: 1rem
                  height: 1rem
                  margin-right: 0.5rem
                  vertical-align: middle
              .btns
                height: 1.8rem
                overflow: hidden
                span
                  display: inline-block
                  height: 1.8rem
                  line-height: 1.8rem
                  margin-right: 0.5rem
                  padding: 0 1.3rem
                  border-radius: 0.9rem
                  color: #1281FC
                  background: rgba(217, 232, 254, 1)
            .twoBtn
              float: right
              margin-top: 4rem
              margin-right: 2rem
              /deep/ .el-button
                padding: 0.6rem  1.2rem
                font-size: 1rem
            &:hover
              box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.6);
              transform: scale(1.01);
        ul:after
          content: ''
          display: table
          clear: both
</style>
