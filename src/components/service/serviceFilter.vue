<template>
  <section :class="['filterService', isFixedFilterTop ? 'maxWidth' : '']">
    <section ref="filterBordRef" :class="['filterComponent', isFixedFilterTop ? 'fixed' : '']">
      <section class="filterFrom">
        <el-popover
          v-model="popoverConfig.categoriesPopover"
          popper-class="categoriesSelectBox"
          placement="bottom-start"
          :visible-arrow="false"
          trigger="focus">
          <section class="categoriesSelect">
            <ul class="categoriesBox">
              <li :class="['categoriesItem', !submitForm.fkBusinessTypeId ? 'active' : '']">
                <span class="clickSwitchSty" @click="remoteChildTagsChange(null)">All Categories</span>
              </li>
              <li :class="['categoriesItem', submitForm.fkBusinessTypeId === item.typeId ? 'active' : '']" v-for="(item, index) in categoriesArray" :key="`${index}-${item.typeId}`">
                <span class="clickSwitchSty" @click="remoteChildTagsChange(item)">{{item.type}}</span>
              </li>
            </ul>
          </section>
          <el-button class="formatInput maxSizeInput" slot="reference">
            <!-- <span>{{ submitForm.categoriesLabel || 'All Categories' }}</span> -->
            <input v-model="submitForm.categoriesLabel" placeholder="All Categories" type="text">
            <i class="el-icon-arrow-down" v-if="!submitForm.categoriesLabel"></i>
            <i class="el-icon-error" @click="clearCategoriesChange" v-else></i>
          </el-button>
        </el-popover>
        <el-popover
          v-model="popoverConfig.tagsPopover"
          popper-class="TagsSelectBox"
          placement="bottom"
          :visible-arrow="false"
          trigger="focus">
          <section class="TagsChecked" @scroll="tagsScrollChange">
            <el-checkbox class="clickCheckedBox" :indeterminate="isIndeterminate" v-model="checkAllTags" @change="handleCheckAllChange">All Tags</el-checkbox>
            <el-checkbox-group class="clickCheckedGroup" v-model="checkedTags" @change="handleCheckedCitiesChange">
              <el-checkbox class="clickCheckedBox" v-for="(tag, index) in checkTagsArray" :label="tag" :key="`${index}-${tag.businessId}`">{{tag.name}}</el-checkbox>
            </el-checkbox-group>
          </section>
          <el-button slot="reference" :class="['formatTagsInput', 'maxSizeInput', (!checkAllTags && checkedTags.length !== 0) ? 'tagsMinBtn' : '']">
            <section class="labelContent" v-if="checkedTags.length > 0">
              <span v-show="checkAllTags">All Tags</span>
              <el-tag size="medium" v-show="!checkAllTags && cindex === 0" closable v-for="(mintag, cindex) in checkedTags" :key="cindex" @close="deleteTagsArray(mintag)">{{ mintag.name }}</el-tag>
              <el-tag size="medium" v-show="!checkAllTags && checkedTags.length > 1" closable @close="deleteTagsArray(checkedTags.slice(1, checkedTags.length))">{{ checkedTags.length - 1 }}+</el-tag>
            </section>
            <input v-model="tagsSearchLabel" type="text" :placeholder="checkedTags.length === 0 ? 'All Tags' : ''" @keydown.delete="deleteOnceTagChange">
            <i class="el-icon-arrow-down" v-if="checkedTags.length === 0"></i>
            <i class="el-icon-error" @click="clearTagsChange" v-else></i>
          </el-button>
        </el-popover>
        <el-popover
          v-model="popoverConfig.cityPopover"
          popper-class="CitySelectBox"
          placement="bottom-end"
          :visible-arrow="false"
          trigger="focus">
          <section class="citySelect">
            <ul class="cityBox">
              <li :class="['cityItem', submitForm.cityId === item.id ? 'active' : '']" v-for="(item, index) in KeyWordCityList" :key="`${index}-${item.id}`">
                <span class="clickSwitchSty" @click="selectCityChange(item)">{{ item.cityAscii }} {{ item.stateId }}</span>
              </li>
            </ul>
          </section>
          <el-input
            slot="reference"
            class="maxSizeInput"
            placeholder="Enter a City"
            ref="cityInput"
            autocomplete="off"
            v-model="submitForm.cityKeys"
            @focus="popoverConfig.cityPopover = true"
            @change="submitFrom">
            <!-- <i slot="suffix" @click.stop="submitFrom" class="el-input__icon el-icon-search"></i> -->
          </el-input>
        </el-popover>
        <span>
          <el-input
            class="maxSizeInput"
            placeholder="Address, Zip Code or Company Name"
            autocomplete="off"
            v-model="submitForm.address"
            @change="submitFrom">
            <i slot="suffix" @click.stop="submitFrom" class="el-input__icon el-icon-search"></i>
          </el-input>
        </span>
      </section>
    </section>
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
        cityKeys: null,
        fkBusinessTypeId: null,
        categoriesLabel: null || 'All Categories',
        latitude: null,
        longitude: null
      },
      // 用户存储搜索标签时暂存的keyWord变量
      tagsSearchLabel: null,
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
      // 获取filterDom数据
      filterRefClientHeight: 0,
      // 是否固定头部
      isFixedFilterTop: false,
      // 是否开启默认置顶
      isDefaultTop: false,
      // 跳过一次滚动
      skipOnceScroll: false,
      tagPageConfig: {
        pageNum: 1,
        pageSize: 100,
        pageTotal: 0,
        totalPage: 1
      },
      isFirstMethod: true
    }
  },
  watch: {
    'submitForm.cityKeys': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.remoteMethod(_new)
        } else {
          console.log('跳过一次查询')
        }
        // if (_new === null || _new === '') {
        //   this.submitForm.cityId = null
        //   this.submitForm.stateId = null
        //   this.submitForm.latitude = null
        //   this.submitForm.longitude = null
        // }
      }
    },
    // submitForm: {
    //   handler (_new, _old) {
    //     if (_old) {
    //       this.submitFrom()
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    submitForm: {
      handler (_new = {}, _old = {}) {
        let _newObject = Object.assign({}, _new)
        let _oldObject = Object.assign({}, _old)
        Object.keys(_newObject).map(item => {
          if (!_newObject[item]) {
            delete _newObject[item]
          }
        })
        Object.keys(_oldObject).map(item => {
          if (!_oldObject[item]) {
            delete _oldObject[item]
          }
        })
        const _submitStatus = JSON.stringify(_newObject) !== JSON.stringify(_oldObject)
        if (_submitStatus) {
          this.submitFrom()
        }
      },
      deep: true
    },
    checkedTags: {
      handler (_new, _old) {
        if (_old) {
          this.submitFrom()
        }
      },
      deep: true
      // immediate: true
    },
    // 监听大标签用户输入值
    'submitForm.categoriesLabel': {
      handler (_new, _old) {
        if (_new !== _old) {
          this.remoteBusinessType(_new)
        }
      }
    },
    // 监听小标签用户输入值
    tagsSearchLabel: {
      handler (_new, _old) {
        if (_new !== _old) {
          const _info = {
            typeId: this.submitForm.fkBusinessTypeId,
            type: this.submitForm.categoriesLabel
          }
          console.log(this.checkedTags)
          this.remoteChildTagsChange(_info.typeId ? _info : null, false, _new)
        }
      }
    }
  },
  props: {
    criticalPointHeight: {
      default: null,
      type: Number
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
          console.log(res)
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
    // 清空标签
    clearTagsChange () {
      this.checkedTags = []
      this.isIndeterminate = false
      this.tagsSearchLabel = null
    },
    // 判断是否删除单个标签
    deleteOnceTagChange (e) {
      // console.log(e)
      // console.log('删除操作------>')
      if (!this.tagsSearchLabel && this.checkedTags.length !== 0) {
        this.checkedTags.pop()
      }
    },
    // 获取父类
    remoteBusinessType (_keyWord = null) {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business/type`, {params: {pageSize: 1000, pageNum: 1, typeName: _keyWord}})
        .then(res => {
          if (res.data.success) {
            this.categoriesArray = res.data.data.rows
          }
        })
    },
    // 获取子类
    remoteChildTagsChange (_info = {}, _ifExted = false, _keyWord = null) {
      // 关闭弹窗
      this.popoverConfig.categoriesPopover = false
      if (!_ifExted) {
        this.tagPageConfig.pageNum = 1
      }
      // handler 处理数据
      if (_info) {
        // 存储ID
        this.submitForm.fkBusinessTypeId = _info.typeId
        // 赋值回显
        this.submitForm.categoriesLabel = _info.type
        // console.log(_info)
      } else {
        // 清空数据
        this.submitForm.fkBusinessTypeId = null
        // 赋值回显
        this.submitForm.categoriesLabel = null
        // 默认
        _info = {}
      }
      // 请求数据
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business`, {params: Object.assign({}, this.tagPageConfig, {fkTypeId: _info.typeId, name: _keyWord})})
        .then(res => {
          if (res.data.success) {
            if (_ifExted) {
              this.checkTagsArray = [...this.checkTagsArray, ...res.data.data.rows]
            } else {
              this.checkTagsArray = res.data.data.rows
            }
            // 将子级标签设置成全选
            // this.checkAllTags = false
            // this.checkedTags = this.checkTagsArray.slice(0, 10)
            // if (!this.isFirstMethod) {
            //   this.checkedTags = []
            // }
            // this.checkedTags = this.updateCheckedTags(this.checkTagsArray || [], this.checkedTags || [])
            // console.log('--------------->')
            this.checkedTags = this.updateCheckedTags(this.checkTagsArray || [], this.checkedTags || [], 'name') || []
            // this.isFirstMethod = false
            // this.isIndeterminate = true
            this.tagPageConfig.pageTotal = res.data.data.total
            this.tagPageConfig.totalPage = res.data.data.totalPage
          }
        })
    },
    // 更新选中状态数据
    updateCheckedTags (_array = [], _checkList = [], _checkName) {
      if (_checkList.length !== 0 && _array.length !== 0) {
        const newCheckedList = _array.map(item => {
          // console.log(_checkList.includes(item))
          // console.log()
          return _checkList.map(citem => {
            if (citem[_checkName] === item[_checkName]) {
              return item
            }
          }).filter(fs => fs)[0]
          // if (_checkList.includes(item)) {
          //   return item
          // }
        }).filter(fs => fs)
        if (_array.length === 0 || newCheckedList.length === 0) {
          return _checkList
        } else {
          return newCheckedList
        }
      }
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
      // console.log(_info)
      this.popoverConfig.cityPopover = false
      this.submitForm.cityKeys = _info.cityAscii
      this.submitForm.cityId = _info.id
      this.submitForm.stateId = _info.stateId
      this.submitForm.latitude = _info.lat || _info.latitude
      this.submitForm.longitude = _info.lng || _info.longitude
      this.submitFrom()
    },
    // 提交
    submitFrom () {
      this.popoverConfig.cityPopover = false
      this.$refs['cityInput'].blur()
      let cloneFrom = Object.assign({}, this.submitForm)
      // console.log('-----------')
      // console.log(cloneFrom)
      if (!this.isDefaultTop) {
        this.isDefaultTop = true
        // console.log('跳过一次')
      } else {
        this.handleForceSearchTop()
      }
      cloneFrom['fkBusinessIdsList'] = this.checkedTags.map(item => {
        return item.businessId
      }).join(',')
      if (this.checkAllTags) {
        cloneFrom.render = parseInt(Math.random() * 1000000)
        delete cloneFrom.fkBusinessIdsList
      }
      cloneFrom['important'] = true
      cloneFrom['resetPage'] = true
      //  console.log('提交')
      this.$emit('upCallMarge', cloneFrom)
    },
    // 清空城市搜索条件
    clearCityChange () {
      if (!this.submitForm.address) {
        this.submitForm.address = null
        this.submitForm.cityId = null
        this.submitForm.stateId = null
      }
    },
    // 搜索栏自动置顶
    handleSearchTopChange () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const filterRefOffsetTop = this.$refs['filterBordRef'].offsetTop
      const handleTop = filterRefOffsetTop - 60
      const criticalPointState = (scrollTop - this.criticalPointHeight + 60 + 80) > 0
      // console.log(this.criticalPointHeight)
      // console.log(scrollTop, handleTop)
      if ((scrollTop > handleTop) && criticalPointState) {
        // console.log(1)
        console.log('开启')
        this.isFixedFilterTop = true
      } else {
        console.log('关闭')
        this.isFixedFilterTop = false
      }
    },
    // 搜索栏强制置顶
    handleForceSearchTop () {
      console.log('置顶')
      const _this = this
      if (this.criticalPointHeight < 100) {
        setTimeout(() => {
          _this.handleForceSearchTop()
        }, 100)
      } else {
        // 强制置顶操作
        console.log(this.criticalPointHeight - 60 - 80 + 1)
        document.documentElement.scrollTop = this.criticalPointHeight
        document.body.scrollTop = this.criticalPointHeight
        window.scrollTo(0, this.criticalPointHeight - 60 - 80 + 1)
      }
    },
    // 清除分类
    clearCategoriesChange () {
      // 清空数据
      this.submitForm.fkBusinessTypeId = null
      // 赋值回显
      this.submitForm.categoriesLabel = null
    },
    urlParamsChange () {
      if (this.$route.query && this.$route.query.toString() !== '{}') {
        this.submitForm = Object.assign(this.submitForm, this.$route.query)
        // console.log(this.$route.query)
        if (this.$route.query.types) {
          const obj = JSON.parse(this.$route.query.types)
          this.checkedTags = [Object.assign({}, obj, {name: obj.typeName})]
        }
        // alert(1)
        // const _this = this
        // setTimeout(() => {
        //   _this.fetchListAll(Object.assign({}, _this.dowmCallMarge, _this.$route.query))
        // }, 1000)
      }
      // this.submitFrom()
    }
  },
  updated () {
    const lintClientHeight = this.$refs['filterBordRef'].clientHeight
    if (lintClientHeight !== this.filterRefClientHeight) {
      this.filterRefClientHeight = this.$refs['filterBordRef'].clientHeight
    }
  },
  created () {
    this.remoteBusinessType()
    this.remoteChildTagsChange()
    this.remoteMethod()
    this.urlParamsChange()
    window.addEventListener('scroll', this.handleSearchTopChange)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleSearchTopChange)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 1200px)
    .filterService
      .filterComponent
        width: 1200px
        &.fixed
          width: 100%
          .filterFrom
            width: 1200px
            margin: 0 auto
            padding: 0 50px
        // padding: 50px
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
      width: 1100px
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
        width: 10px
        height: 4px
      &::-webkit-scrollbar-thumb
        border-radius: 0px
        -webkit-box-shadow: inset 0 0 5px #1281FC
        background: #1281FC
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
  .filterService
    display: flex
    width: 100%
    justify-content: center
    background-color: #D0E5FF
    height: 80px
    .filterComponent
      padding: 25px 50px
      height: 80px
      position: initial
      transform: none
      border: none
      background-color: transparent
      // transition: all .5s ease
      &.fixed
        // transition: all .5s ease
        background: #D0E5FF
        position: fixed
        top: 60px
        z-index: 999
      &:hover
        box-shadow: none
        transition: all .5s ease
    .filterComponent
      height: 80px
      align-items: center
      display: flex
      // position: absolute
      // border: 1px solid #e8e6e6
      // border-radius: 5px
      // transform: translateY(-50%)
      // background-color: #D0E5FF
      padding: 0 50px
      // transition: all .5s ease
      // &:hover
      //   box-shadow: 10px 10px 30px -10px #a5a5a5d9
      //   transition: all .5s ease
      .filterFrom
        width: 100%
        display: flex
        justify-content: space-between
        // transition: all .5s ease
        >span
          flex: 0 0 20%
          margin-right: 20px
          &:last-child
            flex: 1
            margin-right: 0
          .el-button
            width: 100%
            display: flex
            justify-content: space-between
            height: 45px
            border-color: transparent
            border-radius: 22.5px
            &:active,&:focus,&:hover
              border-color: #1281fc
              outline: none
            &.tagsMinBtn
              padding: 5px 20px
            /deep/
              >span
                width: 100%
                display: flex
                justify-content: space-between
                align-items: center
              i.el-input__suffix
                font-size: 25px
                color: #444
          .maxSizeInput
            height: 45px
            /deep/ input
              height: 100%
              border-radius: 22.5px
              border-color: transparent
              outline: none
              &:active,&:focus,&:hover
                border-color: #1281fc
                outline: none
            /deep/ .el-input__suffix
              font-size: 20px
              color: #444
              padding: 0 5px
              cursor: pointer
              i
                display: flex
                align-items: center
          .formatInput
            padding-top: 0
            padding-bottom: 0
            /deep/ span
              display: flex
              height: 45px
              flex: 1
              input
                border: none
                background: transparent
                flex: 1
                font-size: 14px
                padding-left: 5px
          .formatTagsInput
            display: flex
            width: 100%
            input
              flex: 1
              width: 100%
              border: none
              outline: none
              background: transparent
              font-size: 14px
              padding-left: 5px
</style>
