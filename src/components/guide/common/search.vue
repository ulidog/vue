<template>
  <section class="commonSearchComponet">
    <section class="searchFrom">
      <label for="SearchName">Search for:</label>
      <section class="seachInput">
        <input v-model="searchKeyWord" type="text" @keydown.enter="confirmSearchChange">
        <i v-show="!serchLoading" class="serch iconfont icon-search" @click="confirmSearchChange"></i>
      </section>
      <el-button class="btns" :loading="serchLoading" @click="confirmSearchChange">Search</el-button>
    </section>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      searchKeyWord: null,
      serchLoading: false,
      searchParams: {}
    }
  },
  watch: {
    guidePublic: {
      handler (_new, _old) {
        const differend = JSON.stringify(_new) !== JSON.stringify(_old)
        if (differend && Object.keys(_new).length !== 0) {
          this.formData(_new)
        } else {
          console.log('参数未更改,不做查询处理')
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      guidePublic: 'guidePublic'
    })
  },
  methods: {
    ...mapMutations({
      updataGuidePublic: 'UPDATA_GUIDE_PUBLIC'
    }),
    formData (_info) {
      this.searchParams = Object.assign({}, _info)
    },
    confirmSearchChange () {
      const _this = this
      if (_this.searchKeyWord && (_this.searchKeyWord !== '')) {
        _this.serchLoading = true
        _this.updataGuidePublic(Object.assign({}, _this.guidePublic, {isSearch: true, keyWords: _this.searchKeyWord}))
        _this.$router.push({
          name: 'guideSearch'
        })
        setTimeout(() => {
          _this.serchLoading = false
        }, 3000)
      }
    }
  },
  mounted () {
    this.updataGuidePublic(Object.assign({}, this.guidePublic))
  }
}
</script>
<style lang="sass" scoped>
  .commonSearchComponet
    padding-left: 2.5em
    .searchFrom
      border-bottom: 1px solid #CED8E4
      padding: 0 0 20px 0
      .SearchName
        color: #323232
        font-size: 14px
      .seachInput
        display: flex
        width: 100%
        padding: 10px 0
        position: relative
        input
          background: rgba(255, 255, 255, 1)
          border: 1px solid rgba(144, 144, 144, 1)
          border-radius: 3px
          transition: all .3s ease
          box-shadow: none
          outline: none
          width: 100%
          flex: 0 0 1
          text-indent: 0.8em
          font-size: 16px
          height: 40px
          &:focus,&:active,&:hover
            border: 1px solid #5092ff
            box-shadow: none
            &+i.serch
              color: #5092ff
          &:focus+i.serch
            display: none
        i.serch
          position: absolute
          right: 5px
          top: 50%
          transform: translateY(-50%)
          font-size: 27px
          transition: all .3s ease
          &:hover
            cursor: pointer
            color: #5092ff
          &:active
            transform: scale(0.8) translateY(-50%)
      button.btns
        width: 100%
        background-color: #1281FC
        padding: 0 25px
        height: 26px
        color: #fff
        font-size: 14px
        display: flex
        justify-content: center
        align-items: center
</style>
