<template>
  <section v-if="isShowStudy" ref="studyRef" :class="['StudyGuideComponent', isFixed ? 'fixed' : '', isOpenView ? 'isOpenView' : '']" v-drag-drop-two-points>
    <section class="studyContent">
      <header class="studyLLabel">
        <header class="dragDropClass studyGuideHeader">
          <h3>User Guide</h3>
          <span class="closeStudy" @click="closeStudy">
            <!-- <i class="el-icon-remove-outline"></i> -->
            <i class="el-icon-circle-close"></i>
          </span>
        </header>
        <el-select class="selectType" v-model="studySelect" :disabled="AllListLength <= 1" placeholder="请选择">
          <el-option
            v-for="(item, index) in AllList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <section :class="['labelList', isMinClass ? 'isMinClass' : '']">
          <ul class="labelBox">
            <li :class="['labelItem', item.id === selectValue.id ? 'active' : '']" v-for="(item, index) in labelList" :key="index" @click="selectLabelChange(item)">
              <span class="labelStepTip">{{item.labelTitle}}</span>
              <img class="labelImg" :src="item.labelUrl" :alt="item.labelTitle">
            </li>
          </ul>
        </section>
      </header>
      <footer class="studyRValue" v-if="isOpenView">
        <section class="studyRValueContent">
          <section class="studyValue">
            <img v-lazy="selectValue.valueUrl" alt="" :key="Math.random() * 10000">
          </section>
          <section class="studyInfo" v-show="selectValue.labelTitleSub">
            <h4 class="title">{{selectValue.labelTitleSub}}</h4>
            <!-- <article class="article">{{selectValue.labelIntro}}</article> -->
          </section>
        </section>
        <span class="closeView" @click="closeView">
          <i class="el-icon-circle-close"></i>
        </span>
      </footer>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      AllList: [],
      studySelect: '',
      // 是否打开右侧详情
      isOpenView: false,
      // 当前选中的数据
      selectValue: {},
      // 是否固定窗口
      isFixed: false,
      // 最小 避免超出
      isMinClass: false,
      // 当前窗口高度
      studyClientHeight: null,
      // 当前组件是否可见
      isShowStudy: true
    }
  },
  props: {
    selectType: {
      default: 0,
      type: Number
    },
    selectList: {
      default: () => [],
      type: Array
    },
    labelList: {
      default: () => [],
      type: Array
    },
    // 当前最低高度 当滚动条滚动时固定尺寸 必传值
    minRefOffsetTop: {
      default: null,
      type: Number
    },
    // 传入最大组件高度 大于则缩小组件或者关闭组件 必传值
    maxRefOffsetHeight: {
      default: null,
      type: Number
    },
    // 设置组件显示一半时固定高度 默认450 可直接使用默认值
    minRefClientHeight: {
      default: 450,
      type: Number
    },
    // 设置最小视窗 如果视窗小于当前尺寸则滚动到最小尺寸时 关闭组件 可直接使用默认值
    minRedomHeight: {
      default: 1595,
      type: Number
    },
    // 设置是否显示右侧栏
    isShowRView: {
      default: false,
      type: Boolean
    },
    // 传入与之前不一致的值即可重新刷新位置
    handlerScrollChangeState: {
      default: false,
      type: Boolean
    },
    // 设置选中的数据对象
    selectValueObject: {
      default: () => {},
      type: Object
    },
    // 是否初始化固定定位 deep 启用之后
    deepFixed: {
      default: false,
      type: Boolean
    },
    // 附加功能 定点跳转 参数为数字从0开始
    specifiedJump: {
      default: null,
      type: Number
    }
  },
  watch: {
    selectList: {
      handler (_new, _old) {
        if (Array.isArray(_new)) {
          this.AllList = _new
          this.studySelect = _new[this.selectType]
        }
      },
      deep: true,
      immediate: true
    },
    studySelect (_new, _old) {
      this.$emit('handleSelectChange', _new)
      this.closeView()
    },
    // 监听控制右侧是否打开
    isShowRView (_new, _old) {
      if (_new && Object.keys(this.selectValue).length !== 0) {
        this.isOpenView = true
        this.handlerScrollChange()
      }
    },
    // 强制调用滚动事件
    handlerScrollChangeState (_new, _old) {
      if (_new !== _old) {
        this.handlerScrollChange()
      }
    },
    // 监听传入的选中后的数据 自动选择数据
    selectValueObject: {
      handler (_new, _old) {
        if (_new !== _old && Object.keys(_new).length !== 0) {
          this.selectLabelChange(_new || {})
        } else {
          this.closeView(_new || {})
        }
      },
      deep: true,
      immediate: true
    },
    // 监听定点跳转
    specifiedJump (_new, _old) {
      if (_new) {
        if (this.labelList.length < _new) {
          this.selectLabelChange(this.labelList[_new])
        }
      }
    },
    minRefOffsetTop (_new, _old) {
      // console.log(_new)
      this.$refs['studyRef'].style.top = _new + 'px'
      console.log('设置高度成功!' + _new)
      this.handlerScrollChange()
    }
  },
  methods: {
    selectLabelChange (_info = {}) {
      this.selectValue = _info
      // 强制最大
      this.isMinClass = false
      this.isShowStudy = true
      this.isOpenView = true
      this.$emit('handlerSelectValueChange', _info)
    },
    closeView (_info = {}) {
      this.selectValue = _info
      this.isOpenView = false
      this.handlerScrollChange()
      this.$emit('handlerCloseViewChange', true)
    },
    closeStudy () {
      this.$emit('handlerCloseStudyChange', true)
    },
    handlerScrollChange () {
      // this.minRefOffsetTop
      // console.log(this.minRefOffsetTop)
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(this.studyClientHeight, this.$refs['studyRef'].clientHeight)
      if (this.deepFixed) {
        this.isFixed = true
      } else {
        if (scrollTop > this.minRefOffsetTop - 60) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      }
      // 更新自身高度
      this.updataClientHeight()
      // console.log('/*/*/*/**/****')
      // console.log(scrollTop)
      // console.log(this.maxRefOffsetHeight)
      // 适配 当前为未展开做的处理
      if (this.isOpenView) {
        return false
      }
      // console.log((scrollTop + this.studyClientHeight + 60 + 50), this.maxRefOffsetHeight)
      // 60 代表顶部Header高度 50 代表padding 50
      if ((scrollTop + this.studyClientHeight + 60 + 50) > this.maxRefOffsetHeight) {
        this.isMinClass = true
        // console.log(document.body.clientWidth)
        // 当窗口小于理想高度 隐藏
        if (document.body.clientWidth < this.minRedomHeight && scrollTop + this.minRefClientHeight + 60 + 50 > this.maxRefOffsetHeight) {
          this.isShowStudy = false
        } else {
          this.isShowStudy = true
        }
      } else {
        this.isMinClass = false
        this.isShowStudy = true
      }
    },
    updataClientHeight () {
      if (this.$refs['studyRef']) {
        const lintHeight = this.$refs['studyRef'].clientHeight
        if (lintHeight > this.studyClientHeight) {
          this.studyClientHeight = lintHeight
        }
      }
    },
    initRender () {
      this.$refs['studyRef'].style.top = this.minRefOffsetTop + 'px'
      console.log('设置高度成功!' + this.minRefOffsetTop)
      this.handlerScrollChange()
    }
  },
  computed: {
    AllListLength () {
      return this.AllList.length
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handlerScrollChange)
    this.studyClientHeight = this.$refs['studyRef'].clientHeight
    console.log('当前高度：' + this.studyClientHeight)
    this.initRender()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handlerScrollChange)
  }
}
</script>
<style lang="sass" scoped>
  @keyframes JumpAnimation
    0%
      transform: translateY(-80%)
    50%
      transform: translateY(-100%)
    100%
      transform: translateY(-80%)
  @keyframes JumpAnimationClose
    0%
      transform: translateY(0)
    50%
      transform: translateY(-5px)
    100%
      transform: translateY(0)
  .selectType
    margin-bottom: 20px
  .StudyGuideComponent
    position: absolute
    z-index: 10
    left: 0
    top: 0
    padding: 50px 20px 30px
    // width: 100%
    &.fixed
      position: fixed
      top: 60px !important
    &.isOpenView
      // background-color: rgba(0,0,0,.5)
      // width: 100%
    .studyContent
      display: flex
      box-shadow: 10px 10px 30px -10px #a5a5a5d9
      .studyLLabel
        background-color: #fff
        width: 260px
        display: flex
        justify-content: center
        flex-direction: column
        align-items: center
        padding: 0 0 30px 0
        .studyGuideHeader
          background-color: #1281FC
          display: flex
          justify-content: center
          align-items: center
          width: 200px
          position: relative
          height: 46px
          transform: translateY(-50%)
          border-radius: 5px
          transition: all .5s ease
          cursor: pointer
          &:active::after,
          &:hover::after,
          &:after
            content: ''
            width: 120px
            height: 100%
            position: absolute
            background-color: #258DFF
            z-index: 1
            border-radius: 20px
            transition: all .5s ease
          &:active::before,
          &:hover::before,
          &:before
            content: ''
            width: 90px
            height: 100%
            position: absolute
            background-color: #3997FF
            z-index: 2
            border-radius: 20px
            transition: all .5s ease
          >h3
            position: relative
            z-index: 9
            color: #fff
            font-size: 18px
            &::before
              content: ''
              width: 0
              height: 0
              border-width: 0 9px 17px 0
              border-style: solid
              border-color: transparent transparent #0062CC transparent
              position: absolute
              right: -63px
              top: -7px
          .closeStudy
            position: absolute
            z-index: 9
            // right: -22px
            // top: 28px
            transition: all .5s ease
            right: -40px
            top: 10px
            font-size: 30px
            &:hover
              animation: JumpAnimationClose 1s ease
              transition: all .5s ease
        .labelList
          height: 650px
          overflow-y: scroll
          transition: all .5s ease
          &.isMinClass
            height: 275px
            transition: all .5s ease
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
          .labelBox
            display: flex
            flex-direction: column
            .labelItem
              position: relative
              display: flex
              align-items: flex-end
              width: 230px
              transition: all .5s ease
              cursor: pointer
              margin-bottom: 20px
              align-items: center
              padding-top: 36px
              &.active,&:hover
                background-color: #EAF2FF
                transition: all .5s ease
                cursor: pointer
              .labelStepTip
                position: absolute
                width: 100%
                align-self: flex-start
                font-size: 14px
                color: #323232
                padding: 10px
                top: 0
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
              .labelImg
                margin: 0 auto
    .studyRValue
      flex: 1
      display: flex
      width: 670px
      position: absolute
      width: 670px
      left: 300px
      z-index: 9
      background-color: #fff
      padding: 50px 40px 30px 30px
      box-shadow: 10px 10px 30px -10px #a5a5a5d9
      .studyRValueContent
        display: flex
        flex-direction: column
        max-width: 670px
        .studyValue
          >img
            max-width: 100%
        .studyInfo
          >.title
            color: #FF0000
            font-size: 22px
            margin: 15px 0
          >.article
            font-size: 18px
            color: #444444
      .closeView
        display: flex
        align-self: self-start
        font-size: 30px
        margin-right: 15px
        transform: translateY(-80%)
        color: #323232
        cursor: pointer
        transition: all .5s ease
        position: absolute
        right: 0
        top: 40px
        &:hover
          animation: JumpAnimation 1s ease
          transition: all .5s ease
</style>
