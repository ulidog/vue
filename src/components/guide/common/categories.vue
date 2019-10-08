<template>
  <section class="categoriesComponent">
    <header class="categories-titles">Categories</header>
    <section class="content">
      <ul class="content-box">
        <li :class="{'cate-item': true, 'active': !searchParams.fkCategoryId}" @click="SwitchCategoriesChange(null)">All</li>
        <li :class="{'cate-item': true, 'active': searchParams.fkCategoryId === item.categoryId}" v-for="item in categoriesList" :key="item.categoryId" @click="SwitchCategoriesChange(item.categoryId)">{{item.type}}</li>
      </ul>
    </section>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      categoriesList: [],
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
    fetchCategoriesList () {
      this.$axios.get(`${this.ljj_path}guide/category-list`)
        .then(res => {
          if (res.data.success) {
            this.categoriesList = res.data.data.rows
          }
        })
    },
    SwitchCategoriesChange (_cid) {
      if (_cid) {
        this.updataGuidePublic(Object.assign({}, this.guidePublic, {categoryId: _cid, fkCategoryId: _cid}))
        this.$router.push({
          name: 'guideList'
        })
      } else {
        this.updataGuidePublic(Object.assign({}, this.guidePublic, {categoryId: null, fkCategoryId: null}))
        this.$router.push({
          name: 'guideList'
        })
      }
    }
  },
  created () {
    this.fetchCategoriesList()
  }
}
</script>
<style lang="sass" scoped>
  .categoriesComponent
    padding-left: 2.5em
    margin-top: 30px
    .categories-titles
      font-size: 24px
      color: #323232
      font-weight: bold
      padding: 20px 0
      border-bottom: 1px dashed #D7DCE2
    .content
      margin: 30px 0
      .content-box
        display: flex
        flex-wrap: wrap
        .cate-item
          width: calc( 50% - 5px )
          flex: 0 0 calc( 50% - 5px )
          height: 30px
          border: 1px solid #909090
          color: #646464
          font-size: 16px
          display: flex
          justify-content: center
          align-items: center
          margin-bottom: 10px
          transition: all .1s ease
          cursor: pointer
          text-overflow: ellipsis
          overflow: hidden
          display: -webkit-box
          -webkit-line-clamp: 1
          /*! autoprefixer: off */
          -webkit-box-orient: vertical
          /* autoprefixer: on */
          word-break: break-word
          line-height: 30px
          &:nth-child(2n+1)
            margin-right: 10px
          &:hover, &.active
            border-color: #1281FC
            background-color: #1281FC
            color: #fff
</style>
