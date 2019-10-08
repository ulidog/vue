<template>
  <section class="headerComponent">
    <section class="headerBg">
      <h3 class="titles">How Can We Help?</h3>
      <section class="searchComponent">
        <h4 class="tip">Ebuyhouse is here for you! Please search below for what you need help with.</h4>
        <section class="searchInput">
          <el-popover
            v-model="seachParams.isShowList"
            :disabled="!seachParams.isShowList"
            trigger="manual"
            popper-class="help-list-popover"
            :visible-arrow="false"
            :offset="0"
            width="100%"
            placement="bottom-start">
            <section class="asyncSearchList">
              <ul class="list-box">
                <li class="list-item" v-for="item in searchList" :key="item.articleId">
                  <router-link :to="{name: 'guideDetail', query: {ebuyhouse: $base64.encode(JSON.stringify({articleId: item.articleId}))}}">
                  {{item.title}}
                  </router-link>
                </li>
                <li class="list-item" v-if="searchList.length === 0">No recommended data yet</li>
              </ul>
            </section>
            <section class="searchBox" slot="reference">
              <el-input
                class="forPlaceholder"
                placeholder="What would you like help with?"
                v-model="seachParams.keyWords"
                @focus="showPopover"
                @keydown.native="remoteChange"
                @blur="hiddenPopover">
              </el-input>
              <i class="search-icon-sty el-icon-search el-input__icon" slot="suffix" @click="confirmSearchChange"></i>
            </section>
          </el-popover>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      seachParams: {
        isShowList: false,
        keyWords: null
      },
      searchList: [],
      remoteChangeTimer: null
    }
  },
  methods: {
    ...mapMutations({
      updataGuidePublic: 'UPDATA_GUIDE_PUBLIC'
    }),
    showPopover () {
      this.seachParams.isShowList = true
    },
    hiddenPopover () {
      this.seachParams.isShowList = false
    },
    fetchSearchGuideList () {
      this.$axios.get(`${this.ljj_path}guide/search-list`, {params: {title: this.seachParams.keyWords, pageSize: 100}})
        .then(res => {
          if (res.data.success) {
            this.searchList = res.data.data.rows
          }
        })
    },
    remoteChange () {
      const _this = this
      clearTimeout(_this.remoteChangeTimer)
      _this.remoteChangeTimer = setTimeout(() => {
        _this.fetchSearchGuideList()
      }, 100)
    },
    confirmSearchChange () {
      const _this = this
      if (_this.seachParams.keyWords && (_this.seachParams.keyWords !== '')) {
        _this.updataGuidePublic(Object.assign({}, {isSearch: true, keyWords: _this.seachParams.keyWords}))
        _this.$router.push({
          name: 'guideSearch'
        })
      }
    }
  },
  mounted () {
    this.fetchSearchGuideList()
  }
}
</script>
<style lang="sass">
  .forPlaceholder
    input
      &::-webkit-input-placeholder
        color: #333
      &::-moz-placeholder
        color: #333
      &::-ms-input-placeholder
        color: #333
      &::-moz-placeholder
        color: #333
  .help-list-popover
    width: 60%
    padding: 0
    border: none
    outline: none
    overflow: hidden
    padding: 10px 0
    .asyncSearchList
      width: 100%
      .list-box
        max-height: 200px
        overflow-y: scroll
        &::-webkit-scrollbar
          width: 4px
          height: 4px
        &::-webkit-scrollbar-thumb
          border-radius: 5px
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
          background: rgba(0,0,0,0.2)
        &::-webkit-scrollbar-track
          // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
          border-radius: 0
          background: trnasparent
        .list-item
          padding: 0 15px
          height: 40px
          display: flex
          align-items: center
          transition: all .3s ease
          cursor: pointer
          &:hover
            background-color: #76a9eb
            color: #fff
            >a
              color: #fff
          a
            display: inline-block
            width: 100%
            height: 100%
            line-height: 40px

</style>
<style lang="sass" scoped>
  .headerComponent
    width: 100%
    .headerBg
      width: 100%
      height: 30rem
      background-image: url('/static/img/helpCenter/helpcenter_banner.jpg')
      .titles
        text-align: center
        width: 80%
        font-size: 6rem
        font-family: 'Arial-BoldMT'
        font-weight: bold
        color: rgba(255,255,255,1)
        margin: 0 auto
        padding: 5rem 0 0
      .searchComponent
        width: 60%
        margin: 50px auto 0
        .tip
          font-size: 1.5rem
          color: #fff
          font-weight: 400
          padding: 0 10px 10px
        .searchInput
          .searchBox
            display: flex
            position: relative
            .search-icon-sty
              position: absolute
              right: 10px
              font-size: 1.5rem
              cursor: pointer
              &:active
                transform: scale(.8)
</style>
