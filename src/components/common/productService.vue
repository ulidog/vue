<template>
  <section class="filterServiceComponent">
    <header class="title">
      <h2 class="txt">Service Providers</h2>
    </header>
    <section class="filterServiceCondition">
      <!-- <section class="filterService">
        <section class="filterComponent">
          <section class="filterFrom">
            <el-popover
              v-model="popoverConfig.categoriesPopover"
              popper-class="categoriesSelectBox"
              placement="bottom-start"
              :visible-arrow="false"
              trigger="click">
              <section class="categoriesSelect">
                <ul class="categoriesBox">
                  <li :class="['categoriesItem', !submitForm.fkBusinessTypeId ? 'active' : '']">
                    <span class="clickSwitchSty" @click="remoteChildTagsChange(null)">All Categories</span>
                  </li>
                  <li :class="['categoriesItem', submitForm.fkBusinessTypeId === item.typeId ? 'active' : '']" v-for="(item, index) in categoriesArray" :key="index">
                    <span class="clickSwitchSty" @click="remoteChildTagsChange(item)">{{item.type}}</span>
                  </li>
                </ul>
              </section>
              <el-button slot="reference" class="minInputSty">
                <span>{{ submitForm.categoriesLabel || 'All Categories' }}</span>
                <i class="el-icon-arrow-down" v-if="!submitForm.categoriesLabel"></i>
                <i class="el-icon-circle-close" @click="clearCategoriesChange" v-else></i>
              </el-button>
            </el-popover>
            <el-popover
              v-model="popoverConfig.tagsPopover"
              popper-class="TagsSelectBox"
              placement="bottom"
              :visible-arrow="false"
              trigger="click">
              <section class="TagsChecked" @scroll="tagsScrollChange">
                <el-checkbox class="clickCheckedBox" :indeterminate="isIndeterminate" v-model="checkAllTags" @change="handleCheckAllChange">All Tags</el-checkbox>
                <el-checkbox-group class="clickCheckedGroup" v-model="checkedTags" @change="handleCheckedCitiesChange">
                  <el-checkbox class="clickCheckedBox" v-for="tag in checkTagsArray" :label="tag" :key="tag.businessId">{{tag.name}}</el-checkbox>
                </el-checkbox-group>
              </section>
              <el-button slot="reference" :class="['minInputSty', (!checkAllTags && checkedTags.length !== 0) ? 'tagsMinBtn' : '']">
                <section class="labelContent">
                  <span v-show="checkAllTags">All Tags</span>
                  <el-tag size="medium" v-show="!checkAllTags && cindex === 0" closable v-for="(mintag, cindex) in checkedTags" :key="cindex" @close="deleteTagsArray(mintag)">{{ mintag.name }}</el-tag>
                  <el-tag size="medium" v-show="!checkAllTags && checkedTags.length > 1" closable @close="deleteTagsArray(checkedTags.slice(1, checkedTags.length))">{{ checkedTags.length - 1 }}+</el-tag>
                </section>
                <i class="el-icon-arrow-down"></i>
              </el-button>
            </el-popover>
            <el-popover
              v-model="popoverConfig.cityPopover"
              popper-class="CitySelectBox"
              placement="bottom-end"
              :visible-arrow="false"
              trigger="click">
              <section class="citySelect">
                <ul class="cityBox" v-show="KeyWordCityList.length !== 0">
                  <li :class="['cityItem', submitForm.cityId === item.id ? 'active' : '']" v-for="(item, index) in KeyWordCityList" :key="index">
                    <span class="clickSwitchSty" @click="selectCityChange(item)">{{ item.cityAscii }} {{ item.stateId }}</span>
                  </li>
                </ul>
              </section>
              <el-input
                slot="reference"
                class="maxInputSty"
                placeholder="Enter a City, Address, Zip Code or Company Name"
                v-model="submitForm.address"
                @clear="clearCityChange"
                @change="submitFrom">
                <i slot="suffix" class="serchSty el-input__icon el-icon-search"></i>
              </el-input>
            </el-popover>
          </section>
        </section>
      </section> -->
    </section>
    <footer class="filterServiceList">
      <section class="serviceBox">
        <ul class="flexWrap">
          <router-link class="serviceItem" v-for="(item, index) in serviceList" :key="index" :to="'/service/detail/' + item.replaceCeoId">
            <header class="serviceLogo">
              <img v-if="item" v-lazy="item.logo || '/static/img/service/service_fengmian.png'" alt="" :key="item.companyId">
            </header>
            <section class="info">
              <h5 class="serviceInfoTitle">{{item.company}}</h5>
              <section class="labelValue">
                <img src="/static/img/service/service_classify.png" alt="service_address">
                <span class="valueInfo address">{{ item|handlerTypeName }}</span>
                <!-- <span v-else  class="valueInfo address"></span> -->
              </section>
              <section class="labelValue">
                <img src="/static/img/service/service_phone.png" alt="service_phone.png">
                <span class="valueInfo">{{item.phone}}</span>
              </section>
              <section class="labelValue">
                <img src="/static/img/service/service_address.png" alt="service_address">
                <span class="valueInfo address">{{item.address}}</span>
              </section>
            </section>
          </router-link>
          <li v-show="serviceList && serviceList.length !== 0" class="noContentBox" v-for="(item, index) in (9 - serviceList.length)" :key="index * 1000 + 100">
            <header class="companyItemLogo">
              <img src="/static/img/service/service_zhanwei.png" alt="">
            </header>
            <section class="noContents">
              <h3>Advertise Your Home Services Here!</h3>
              <span>(702) 916 3883</span>
            </section>
          </li>
        </ul>
      </section>
      <section class="pageConfig" v-if="serviceList.length !== 0">
        <!-- <el-pagination
          background
          class="serviceConfigPage"
          layout="prev, pager, next"
          @current-change="handleChange"
          :current-page="listPageConfig.pageNum"
          :page-size="listPageConfig.pageSize"
          :total="listPageConfig.pageTotal">
        </el-pagination> -->
         <router-link to="/service/list">
          <button class="content-btn" >More</button>
        </router-link>
      </section>
      <section class="noContent" v-else>
        <header class="noContentImg">
          <img src="/static/img/service/service_empty.png" alt="service_empty.png">
        </header>
        <footer class="noContentTip">
          <span class="tip">We Are Partnering With More Service Providers In Your Area. Check Back Again!</span>
        </footer>
      </section>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      // 提交数据
      submitForm: {
        address: null,
        cityId: null,
        stateId: null,
        fkBusinessTypeId: null,
        categoriesLabel: null
      },
      // 弹窗管理
      popoverConfig: {
        categoriesPopover: false,
        tagsPopover: false,
        cityPopover: false
      },
      categoriesArray: [],
      // 控制标签是否全选
      isIndeterminate: true,
      checkAllTags: false,
      checkTagsArray: [],
      checkedTags: [],
      KeyWordCityList: [],
      tagPageConfig: {
        pageNum: 1,
        pageSize: 100,
        pageTotal: 0,
        totalPage: 1
      },
      listPageConfig: {
        pageNum: 1,
        pageSize: 9,
        pageTotal: 0
      }
    }
  },
  watch: {
    'submitForm.address': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.remoteMethod(_new)
        } else {
          console.log('跳过一次查询')
        }
        if (_new === null || _new === '') {
          this.submitForm.cityId = null
          this.submitForm.stateId = null
        }
      }
    },
    submitForm: {
      handler (_new, _old) {
        if (_old) {
          this.submitFrom()
        }
      },
      deep: true,
      immediate: true
    },
    checkedTags: {
      handler (_new, _old) {
        if (_old) {
          this.submitFrom()
        }
      },
      deep: true,
      immediate: true
    },
    pageConfig: {
      handler (_new, _old) {
        Object.assign(this.listPageConfig, _new)
        // this.listPageConfig = _new
      },
      deep: true,
      immediate: true
    }
  },
  filters: {
    // Array.filters
    handlerTypeName (_info) {
      // typeof
      if (_info.types instanceof Array && _info.types.length > 0) {
        return _info.types[0].typeName
      } else {
        return null
      }
    }
  },
  props: {
    serviceList: {
      default: () => [
        console.log(this.serviceList)
      ],
      type: Array
    },
    pageConfig: {
      default: () => {},
      type: Object
    }
  },
  methods: {
    // 搜索
    remoteMethod (query) {
      this.$axios.get(`${this.SH_MAP_PROD_PATH}region/list/Str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            this.remoteMethodState(res.data.data, query)
          }
        })
    },
    // 搜索州
    remoteMethodState (list, query) {
      this.$axios.get(`${this.ljj_path}region/list/state-str`, {params: { keyword: query, pageNum: 1, pageSize: 100 }})
        .then(res => {
          if (res.data.success) {
            let lists = res.data.data.map(item => {
              item.cityAscii = item.name
              item.stateId = item.id
              item.type = true
              return item
            })
            this.KeyWordCityList = [...lists, ...list]
          } else {
            this.KeyWordCityList = list
          }
        })
    },
    // 全选标签
    handleCheckAllChange (val) {
      this.checkedTags = val ? this.checkTagsArray : []
      this.isIndeterminate = false
    },
    // 取消
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAllTags = checkedCount === this.checkTagsArray.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkTagsArray.length
    },
    // 获取父类
    remoteBusinessType () {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business/type`, {params: {pageSize: 1000, pageNum: 1}})
        .then(res => {
          if (res.data.success) {
            this.categoriesArray = res.data.data.rows
          }
        })
    },
    // 获取子类
    remoteChildTagsChange (_info = {}, _ifExted = false) {
      // 关闭弹窗
      this.popoverConfig.categoriesPopover = false
      // handler 处理数据
      if (_info) {
        // 存储ID
        this.submitForm.fkBusinessTypeId = _info.typeId
        // 赋值回显
        this.submitForm.categoriesLabel = _info.type
      } else {
        // 清空数据
        this.submitForm.fkBusinessTypeId = null
        // 赋值回显
        this.submitForm.categoriesLabel = null
        // 默认
        _info = {}
      }
      // 请求数据
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business`, {params: Object.assign({}, this.tagPageConfig, {fkTypeId: _info.typeId})})
        .then(res => {
          if (res.data.success) {
            if (_ifExted) {
              this.checkTagsArray = [...this.checkTagsArray, ...res.data.data.rows]
            } else {
              this.checkTagsArray = res.data.data.rows
            }
            // 将子级标签设置成全选
            this.checkAllTags = false
            // this.checkedTags = this.checkTagsArray.slice(0, 10)
            this.checkedTags = []
            this.isIndeterminate = true
            this.tagPageConfig.pageTotal = res.data.data.total
            this.tagPageConfig.totalPage = res.data.data.totalPage
          }
        })
    },
    // 滚动获取
    tagsScrollChange (e) {
      // console.log(e)
      const maxLoadingHeight = e.target.clientHeight + e.target.scrollTop + 120
      const tagRefScrollHeight = e.target.scrollHeight
      if (maxLoadingHeight > tagRefScrollHeight) {
        const _info = {
          typeId: this.submitForm.fkBusinessTypeId,
          type: this.submitForm.categoriesLabel
        }
        if (this.tagPageConfig.totalPage > this.tagPageConfig.pageNum) {
          this.tagPageConfig.pageNum++
          if (_info.typeId) {
            this.remoteChildTagsChange(_info, true)
          } else {
            this.remoteChildTagsChange(null, true)
          }
        }
      }
    },
    // 删除tags
    deleteTagsArray (_info) {
      if (_info instanceof Array) {
        // console.log(_info)
        _info.map(item => {
          this.checkedTags.splice(this.checkedTags.indexOf(item), 1)
        })
      } else {
        this.checkedTags.splice(this.checkedTags.indexOf(_info), 1)
        if (this.checkedTags.length === 0) {
          this.isIndeterminate = false
        }
      }
    },
    // 选择城市
    selectCityChange (_info) {
      this.popoverConfig.cityPopover = false
      this.submitForm.address = _info.cityAscii
      this.submitForm.cityId = _info.id
      this.submitForm.stateId = _info.stateId
      this.submitFrom()
    },
    // 提交
    submitFrom () {
      let cloneFrom = Object.assign({}, this.submitForm, this.listPageConfig)
      cloneFrom['fkBusinessIdsList'] = this.checkedTags.map(item => {
        return item.businessId
      }).join(',')
      if (this.checkAllTags) {
        delete cloneFrom.fkBusinessIdsList
      }
      //  console.log('提交')
      this.$emit('upCallMarge', cloneFrom)
    },
    // 清空城市搜索条件
    clearCityChange () {
      this.submitForm.address = null
      this.submitForm.cityId = null
      this.submitForm.stateId = null
    },
    // 清除分类
    clearCategoriesChange () {
      // 清空数据
      this.submitForm.fkBusinessTypeId = null
      // 赋值回显
      this.submitForm.categoriesLabel = null
    },
    // 分页
    handleChange (_new) {
      this.listPageConfig.pageNum = _new
      this.submitFrom()
    },
    // 跳转
    gotoDetail (_info) {
      this.$router.push({
        path: '/service/detail/' + _info.replaceCeoId
        // query: {ebuyhouse: this.$base64.encode(JSON.stringify({id: _info.companyId}))}
      })
    }
  },
  created () {
    this.remoteBusinessType()
    this.remoteChildTagsChange()
    this.remoteMethod()
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1200px)
    .filterService
      .filterComponent
        width: 815px
        // height: 150px
  @media screen and (min-width: 320px) and (max-width: 1200px)
    .filterService
      .filterComponent
        width: 100%
        // padding: 20px 10px
        // height: 90px
</style>

<style lang="sass">
  @media screen and (min-width: 1200px)
    .categoriesSelectBox, .TagsSelectBox, .CitySelectBox
      width: 815px
      height: 400px
    .categoriesItem, .cityItem
      flex: 0 0 25%
    .clickCheckedBox
      flex: 0 0 25%
  @media screen and (min-width: 320px) and (max-width: 1200px)
    .categoriesSelectBox, .TagsSelectBox, .CitySelectBox
      width: 100%
      height: 300px
      padding: 20px
    .categoriesItem, .cityItem
      flex: 0 0 calc( 100% / 3 )
    .clickCheckedBox
      flex: 0 0 calc( 100% / 3 )
</style>

<style lang="sass">
  .categoriesSelectBox, .TagsSelectBox, .CitySelectBox
    left: 50% !important
    transform: translateX(-50%) !important
    padding: 20px 0
    .categoriesSelect, .TagsChecked, .citySelect
      overflow-y: scroll
      height: 100%
      &::-webkit-scrollbar
        width: 6px
        height: 4px
      &::-webkit-scrollbar-thumb
        border-radius: 0px
        -webkit-box-shadow: inset 0 0 5px #1281FC
        background: #1281FC
        cursor: pointer
      &::-webkit-scrollbar-track
        // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
        border-radius: 0
        background: trnasparent
  .categoriesSelectBox, .CitySelectBox
    .categoriesSelect, .citySelect
      .categoriesBox, .cityBox
        display: flex
        flex-wrap: wrap
        .categoriesItem, .cityItem
          display: flex
          margin-bottom: 15px
          &.active
            .clickSwitchSty
              background-color: #eaf4ff
              color: #1281fc
              transition: all .5s ease
              border-radius: 3px
          .clickSwitchSty
            display: flex
            padding: 8px 20px
            transition: all .5s ease
            cursor: pointer
            &:hover
              background-color: #eaf4ff
              color: #1281fc
              transition: all .5s ease
              border-radius: 3px
  .TagsSelectBox
    .TagsChecked
      display: flex
      flex-direction: column
      >.clickCheckedBox
        flex: 0 0 10%
        display: flex
        margin: 0 0 15px 0
        &.is-checked
          /deep/ .el-checkbox__label
            background-color: #eaf4ff
            color: #1281fc
            transition: all .5s ease
            border-radius: 3px
        /deep/ .el-checkbox__input
          display: none
        /deep/ .el-checkbox__label
          display: flex
          padding: 8px 20px
          transition: all .5s ease
          cursor: pointer
          &:hover
            background-color: #eaf4ff
            color: #1281fc
            transition: all .5s ease
            border-radius: 3px
      >.clickCheckedGroup
        display: flex
        flex-wrap: wrap
        .clickCheckedBox
          display: flex
          margin: 0 0 15px 0
          &.is-checked
            /deep/ .el-checkbox__label
              background-color: #eaf4ff
              color: #1281fc
              transition: all .5s ease
              border-radius: 3px
          /deep/ .el-checkbox__input
            display: none
          /deep/ .el-checkbox__label
            display: flex
            padding: 8px 20px
            transition: all .5s ease
            cursor: pointer
            &:hover
              background-color: #eaf4ff
              color: #1281fc
              transition: all .5s ease
              border-radius: 3px
</style>

<style lang="sass" scoped>
.filterServiceComponent
  display: flex
  margin: 0 auto
  flex-direction: column
  align-items: center
  padding-bottom: 80px
  >.title
    margin: 30px auto
    .txt
      font-size: 48px
      color: #444
      font-weight: bold
  .filterServiceCondition
    width: 100%
    .filterService
      display: flex
      width: 100%
      justify-content: center
      .filterComponent
        border-radius: 5px
        transition: all .5s ease
        // &:hover
        //   box-shadow: 10px 10px 30px -10px #a5a5a5d9
        //   transition: all .5s ease
        .filterFrom
          display: flex
          justify-content: space-between
          transition: all .5s ease
          >span
            flex: 0 0 180px
            margin-right: 20px
            &:last-child
              flex: 1
              margin-right: 0
            .el-button
              width: 100%
              display: flex
              justify-content: space-between
              border-radius: 20px
              &.tagsMinBtn
                padding: 5px 20px
              /deep/
                >span
                  width: 100%
                  display: flex
                  justify-content: space-between
                  align-items: center
                  color: #909090
                i.el-input__suffix
                  font-size: 20px
                  color: #909090
            /deep/ .el-input__inner
              border-radius: 20px
            .maxInputSty
              /deep/ .el-input__suffix
                align-items: center
                display: flex
                right: 10px
                i.serchSty
                  background-color: #1281FC
                  color: #fff
                  padding: 0px 15px
                  width: 60px
                  border-radius: 13px
                  height: 26px
                  display: flex
                  justify-content: center
                  align-items: center
                  cursor: pointer
  .filterServiceList
    display: flex
    flex-direction: column
    width: 100%
    margin-top: 60px
    .serviceBox
      .flexWrap
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        .serviceItem
          flex: 0 0 calc( (100% - 40px) / 3 )
          display: flex
          margin-bottom: 25px
          cursor: pointer
          transition: all linear 0.3s;
          &:hover
            box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          .serviceLogo
            // box-shadow: 10px 10px 30px -10px #a5a5a5d9
            width: 135px
            height: 135px
            display: flex
            align-items: center
            padding-top: 6px
            overflow: hidden
            border-radius: 5px
            img
              width: 100%
              transform-origin: 50% 50%
              cursor: pointer
              transition: transform 1s ease-out 0s
              border-radius: 5px
              &:hover
                transform: matrix(1.1, 0, 0, 1.1, 0, 0)
          .info
            flex: 1
            margin-left: 20px
            display: flex
            flex-direction: column
            padding-right: 5px
            .serviceInfoTitle
              color: #444444
              font-size: 18px
              margin-bottom: 8px
              margin-top: 5px
              height: 37px
              overflow: hidden
              text-overflow：ellipsis
              // &:hover
              //   color: #1281fc
            .labelValue
              display: flex
              margin: 5px 0
              >img
                width: 18px
                height: 18px
                margin-right: 5px
                display: inline-block
              .valueInfo
                font-size: 15px
                color: #444
                flex: 1
                max-height: 18px
                line-height: 18px
                overflow: hidden
                text-overflow：ellipsis
                &.address
                  color: #909090
                  font-size: 14px
        .noContentBox
          display: flex
          flex: 0 0 calc( (100% - 40px) / 3 )
          margin-bottom: 25px
          .noContents
            margin-left: 20px
            margin-left: 20px
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            h3
              font-size: 25px
            span
              margin-top: 10px
    .pageConfig
      margin: 30px 0
      text-align: center
    .noContent
      width: 100%
      min-height: 220px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .noContentTip
        margin-top: 20px
        span.tip
          color: #323232
          font-size: 24px
  .content-btn
    display: block
    margin: 0 auto
    width: 22.75rem;
    height: 2.875rem;
    border: 0.1rem solid #666666
    border-radius: 1.44rem
    font-size: 24px;
    &:hover
      background-color: #0067d9
      border: 0.1rem solid #0067d9
      color: #ffffff
</style>
<style lang="scss">
  .search-box {
  position: relative;
  .search-box-content {
    position: relative;
    display: flex;
    flex-direction: column;
    .custom-input {
      background: rgb(255, 255, 255);
      opacity: 0.8;
      height: 46px;
      border-radius: 23px;
      display: flex;
      position: relative;
      align-items: center;
      border: 1px solid #fff;
      &.focus {
        border: 1px solid #1281FC;
      }
      >input {
        flex: 1;
        border-radius: 23px;
        outline: none;
        border: none;
        text-indent: 1em;
        font-size: 18px;
        &::placeholder {
          color: #999;
        }
      }
      >i {
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 26px;
        color: #1281FC;
      }
      i.close {
        // font-size: 25px;
        right: 40px;
      }
    }
    .downdrap-list {
      position: absolute;
      z-index: 999;
      top: 50px;
      left: 0;
      flex: 1;
      background-color: #fff;
      width: 100%;
      box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
      border-radius:5px 5px 10px 10px;
      overflow: hidden;
      .remote-box {
        // padding: 10px;
        max-height: 260px;
        padding: 10px 0;
        overflow-y: scroll;
        transition: all .5s ease;
        &.isMinClass {
          height: 275px;
          transition: all .5s ease;
        }
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 0px;
          box-shadow: inset 0 0 5px #1281FC;
          background: #1281FC;
        }
        &::-webkit-scrollbar-track{
          // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
          border-radius: 0;
          background: trnasparent;
        }
        li {
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #444;
          &:hover {
            background: #1281FC;
            color: #fff;
            cursor: pointer;
            i {
              color: #fff !important;
            }
            a {
              color: #fff;
            }
          }
        }
        .city {
          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
          }
        }
        .local {
          i {
            margin-right: 5px;
            color: #1281fc;
          }
        }
        .history {
          display: flex;
          justify-content: space-between;
          &:first-child {
            border-top: 1px solid #E0E0E0;
          }
          i {
            margin-right: 5px;
            color: #1281fc;
          }
          i.close {
            color: #444;
          }
        }
      }
    }
  }
}
</style>
