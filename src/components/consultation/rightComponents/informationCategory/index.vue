<template>
  <section class="informationCategory">
    <header class="_titls">
      <h3>Information category</h3>
    </header>
    <footer class="imgbord">
      <section class="imgbox" @click="goTypePage()">
        <img src="/static/img/consultation/bg/information_all.png" alt="no" v-if="!isAll">
        <img src="/static/img/consultation/bg/information_all_pre.png" alt="yes" v-else>
      </section>
      <template v-for="(item, index) in cateforyList">
        <section :key="index" class="imgbox" @click="goTypePage(item)">
          <img v-lazy="!isAll && selectCate === item.newsCategoryId ? toImgArray(item.img)[1] : toImgArray(item.img)[0]" :alt="item.newsCategoryId" :key="Math.random() * 10000">
          <!-- <img v-for="(citem, indexs) in toImgArray(item.img)" :src="citem" :alt="citem" :key="indexs"> -->
        </section>
      </template>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      pageConfig: {
        pageNum: 1,
        pageSize: 10
      },
      cateforyList: [],
      isAll: true,
      selectCate: null
    }
  },
  created () {
    this.fetchInfo()
  },
  watch: {
    '$route': {
      handler (_new, _old) {
        this.params = this.$route.query
        // console.log(this.params)
        if (this.params.type) {
          this.selectCate = this.params.type
          this.isAll = false
        } else {
          this.isAll = true
        }
        console.log(this.selectCate)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fetchInfo () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}news-category/list/str`, {params: _this.pageConfig})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            _this.cateforyList = res.data.data.rows
          }
        })
    },
    goTypePage (_info) {
      if (_info) {
        this.$router.push({
          name: 'consultation-home-page',
          query: {type: _info.newsCategoryId, title: _info.type}
        })
      } else {
        this.$router.push({
          name: 'consultation-home-page'
        })
      }
    },
    toImgArray (_content) {
      try {
        return JSON.parse(_content)
      } catch (error) {
        return [_content]
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .informationCategory
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
    ._titls
      height: 75px
      display: flex
      align-items: center
      justify-content: center
      margin: 0 1.875em 0 2.1875em
      border-bottom: 1px solid #ededed
      h3
        font-size: 1.5em
        color: #323232
        font-weight: bold
        height: 100%
        display: flex
        align-items: center
        justify-content: center
    .imgbord
      display: flex
      align-items: center
      justify-content: center
      margin: 0 1.875em 0 2.1875em
      flex-direction: column
      padding: 33px 0 35px 0
      img
        margin-bottom: 10px
        width: 246px
        height: 106px
        cursor: pointer
        transition: all .5s ease;
        &:hover
          box-shadow: 0 5px 10px 0 rgba(0,0,0,.4);
          transform: matrix(1.06, 0, 0, 1.06, 0, 0);
</style>
