<template>
  <section class="bottomModuleViews">
    <section class="cardListBox">
      <ul class="cardList">
        <li class="cardListItem" v-for="item in houseList" :key="item.thousesId" @mouseover="showMarkMapPosition(item)" @mouseout="hideMarkMapPosition">
          <router-link :to="{ path: '/listing/details/' + item.id }">
            <!-- , item.releaseType === 3 ? 'Single' : '', item.releaseType === 2 ? 'Whole' : '' -->
            <header :class="['header-img']">
              <img v-lazy="item.imgUrl" :key="item.id" :alt="item.street">
            </header>
            <footer class="footer-intro">
              <h4><span class="mini">$ </span>{{ item.viewPrice }} {{ item.dealType !== 1 ? '/mo' : '' }}</h4>
              <section class="intro">
                <section class="icons-items">
                  <span>{{ item.bedroom }}</span>
                  <span v-if="item.bedroom !== 'studio'">&nbsp;bds</span>
                </section>
                <section class="icons-items">
                  <span class="target">●</span>
                  <span>{{ item.bathroom }} ba</span>
                </section>
                <section class="icons-items">
                  <span class="target">●</span>
                  <span>{{ item.viewLivingSqft }} sqft</span>
                </section>
              </section>
              <footer class="art-itro">
                <article>{{ item.street }}</article>
              </footer>
            </footer>
          </router-link>
        </li>
        <template v-if="houseList.length < 6 && houseList.length !== 0">
          <li class="cardListItem null" v-for="nullIndex in ((houseList.length>3?6:3)-houseList.length)" :key="nullIndex">
            <img src="/static/img/default/default_05.png" alt="">
          </li>
        </template>
        <template v-else-if="houseList.length === 0">
          <img class="default" src="/static/img/default/default_02.png" alt="default_02">
        </template>
      </ul>
    </section>
    <footer class="pageConfig" v-if="(houseLists.length > 6 ? true : false) && isShowPagination">
      <custom-el-pagination
        layout="prev, slota, pager, slotb, next"
        :current-page="pageConfig.pageNum"
        :page-size="pageConfig.pageSize"
        @current-change="handleCurrentChange"
        prev-text="prev"
        next-text="next"
        :total="pageConfig.pageTotal">
        <!-- <template slot="slota">
          <span class="btn" v-show="isShowPrev" @click="jumpMapList(false)">prev</span>
        </template>
        <template slot="slotb">
          <span class="btn" v-show="isShowNext" @click="jumpMapList(true)">next</span>
        </template> -->
      </custom-el-pagination>
      <!-- <section class="custom-pagetion">
        <ul class="box">
          <li class="item" @click="pageConfig.pageNum !== 1 ? pageConfig.pageNum-- : pageConfig.pageNum">
            <span>prev</span>
          </li>
          <li class="item pageNum">
            <span>{{pageConfig.pageNum}}</span>
          </li>
          <li class="item" @click="pageConfig.pageNum < pageConfig.pageTotal / pageConfig.pageSize ? pageConfig.pageNum++ : pageConfig.pageNum">
            <span>next</span>
          </li>
        </ul>
      </section> -->
    </footer>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      houseList: [],
      pageList: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 6,
        pageTotal: 0
      },
      // 延迟定时器
      timer: null,
      isShowNext: false,
      isShowPrev: false,
      isShowPagination: false
    }
  },
  props: {
    titles: {
      default: null,
      type: String
    },
    PAGE_CONFIG: {
      default: () => {},
      type: Object
    }
  },
  watch: {
    'pageConfig.pageNum' (_new, _old) {
      this.handleCurrentChange(_new)
    },
    pageConfig: {
      handler (_new, _old) {
        this.updata_rightPageConfig(_new)
      },
      immediate: true,
      deep: true
    },
    houseLists: {
      handler (_new, _old) {
        this.formatList(_new)
      }
    },
    PAGE_CONFIG: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          // console.log('/*//*/*/*/*/*/*/*/*/*/')
          // console.log(Math.ceil(_new.total / 500) > this.searchFrom.pageNum)
          this.isShowPagination = false
          this.isShowNext = Math.ceil(_new.total / 500) > this.searchFrom.pageNum
          this.isShowPrev = this.searchFrom.pageNum > 1
          // console.log(this.isShowPrev, this.isShowNext)
          const _this = this
          setTimeout(() => {
            _this.isShowPagination = true
          }, 100)
        }
      },
      immediate: true,
      deep: true
    },
    searchFrom: {
      handler (_new, _old) {
        if (Object.keys(_new).length > 0) {
          this.isShowPagination = false
          // console.log('/*//*/*/*/*/*/*/*/*/*/')
          // console.log(Math.ceil(this.PAGE_CONFIG.total / 500) > _new.pageNum)
          this.isShowNext = Math.ceil(this.PAGE_CONFIG.total / 500) > _new.pageNum
          this.isShowPrev = _new.pageNum > 1
          // console.log(this.isShowPrev, this.isShowNext)
          const _this = this
          setTimeout(() => {
            _this.isShowPagination = true
          }, 100)
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      houseLists: 'houseList',
      searchFrom: 'searchFrom'
    })
  },
  methods: {
    ...mapMutations({
      'updata_hoverHouse': 'UPDATA_HOVER_HOUSE',
      'updata_rightPageConfig': 'UPDATA_RIGHT_PAGE_CONFIG',
      'UPDATA_SERCH_FROM': 'UPDATA_SERCH_FROM'
    }),
    init () {},
    formatList (_list) {
      if (_list instanceof Array && _list.length > 0) {
        let pageTotal = _list.length
        // let pageList =
        this.pageList = []
        let num = 0
        let pageNumSize = Math.ceil(pageTotal / this.pageConfig.pageSize)
        for (let i = 1; i <= pageNumSize; i++) {
          this.pageList.push([])
        }
        _list.map((item, k) => {
          this.pageList[num].push(item)
          if ((k + 1) % this.pageConfig.pageSize === 0) {
            num++
          }
        })
        // 设置默认数据组
        this.houseList = this.pageList[0]
        // 重置分页数据
        // console.log('获取分页最大数量----------------->')
        // console.log(pageNumSize)
        this.pageConfig.pageNum = 1
        this.pageConfig.pageTotal = pageTotal
      } else {
        // 设置默认数据组
        this.houseList = []
        // 重置分页数据
        this.pageConfig.pageNum = 1
        this.pageConfig.pageTotal = 0
      }
    },
    handleCurrentChange (val) {
      this.pageConfig.pageNum = val
      this.houseList = this.pageList[val - 1]
    },
    // 显示地图marks
    showMarkMapPosition (_info) {
      const _this = this
      this.timer = setTimeout(() => {
        _this.updata_hoverHouse(Object.assign({}, _info, {status: true}))
      }, 500)
    },
    // 隐藏
    hideMarkMapPosition () {
      clearInterval(this.timer)
      this.updata_hoverHouse({status: false})
    },
    // 跳转
    jumpMapList (_bool) {
      if (_bool) {
        this.UPDATA_SERCH_FROM(Object.assign({}, this.searchFrom, {pageNum: this.searchFrom.pageNum + 1}))
      } else {
        this.UPDATA_SERCH_FROM(Object.assign({}, this.searchFrom, {pageNum: this.searchFrom.pageNum - 1}))
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .bottomModuleViews
    .cardListBox
      .cardList
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        >.default
          margin: 0 auto
          padding: 30px
        .cardListItem
          width: 31%
          // height: 19.375em
          background-color: #fff
          overflow: hidden
          margin-bottom: 1.5625em
          border-radius: 10px
          transition: box-shadow .5s ease
          &:hover
            box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.33)
            transition: box-shadow .5s ease
          >a
            display: block
          .header-img
            height: 12.1875em
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            overflow: hidden
            img
              max-height: 100%
              transform-origin: 50% 50%
              transition: all 1s ease-out 0s
              &:hover
                transform: matrix(1.1, 0, 0, 1.1, 0, 0)
          .Whole
            position: relative
            &:before
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 0
              height: 0
              border-width: 4.375em 4.375em 0 0
              border-style: solid
              border-color: #fea416 transparent transparent transparent
            &:after
              content: 'W'
              position: absolute
              top: 0.4em
              left: 0.4em
              color: #fff
              font-size: 1.5em
          .Single
            position: relative
            &:before
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 0
              height: 0
              border-width: 4.375em 4.375em 0 0
              border-style: solid
              border-color: #fe590e transparent transparent transparent
            &:after
              content: 'S'
              position: absolute
              top: 0.4em
              left: 0.4em
              color: #fff
              font-size: 1.5em
          .footer-intro
            height: 7.1875em
            padding: 0.375em
            display: flex
            flex-direction: column
            h4
              font-size: 20px
              font-weight: bold
              color: #444
              height: 2em
              // .mini
              //   font-size: .875em
            .intro
              display: flex
              justify-content: flex-start
              align-items: center
              height: 1.25em
              font-size: 14px
              width: 100%
              color: #999
              padding-bottom: .5em
              border-bottom: 1px solid #f2f3f4
              white-space: nowrap
              .icons-items
                display: flex
                // flex: 1
                justify-content: flex-start
                align-items: center
                font-size: 14px
                &:nth-child(2),&:nth-child(3)
                  justify-content: center
                .target
                  margin: 0 10px
                  display: inline-block
                img
                  margin-right: 5px
                  width: 1em
                  height: 1em
            .art-itro
              padding: 5px 0
              article
                line-height: 1.5em
                color: #999999
                overflow: hidden
                text-overflow:ellipsis
                display: -webkit-box
                -webkit-line-clamp: 2
                /*! autoprefixer: off */
                -webkit-box-orient: vertical
                /* autoprefixer: on */
                font-size: 0.75em
                color: #666
        .cardListItem.null
          display: flex
          justify: center
          align-items: center
          img
            width: 100%
    .pageConfig
      margin: 1.125em 0
      display: flex
      justify-content: center
      background-color: transparent
      .custom-pagetion
        .box
          display: flex
          .item
            color: 14px
            margin: 0 5px
            padding: 5px 10px
            color: #323232
            background-color: #ececec
            cursor: pointer
            &:hover
              background-color: #1281FC
              color: #fff
          .pageNum
            background-color: #1281FC
            color: #fff
      .el-pagination
        background-color: transparent
        /deep/ button
          background-color: transparent
        /deep/ li
          background-color: transparent
          padding: 0
          height: 2em
          width: 2em
          min-width: 2em
          margin: 0 0.5em
        /deep/ li.active
          border-radius: 50%
          background-color: #1281fc
          color: #fff
          padding: 0
          height: 2em
          width: 2em
        .btn
          cursor: pointer
          &:hover
            color: #1281fc
</style>
