<template>
  <section class="visitorsRecordViews">
    <header class="MajorImg">
      <img src="/static/img/consultation/default/visitors_record.png" alt="visitors_record">
    </header>
    <section class="_titls">
      <h3>Visitors record</h3>
    </section>
    <footer class="otherAuthor">
      <ul class="author-list-box">
        <li class="author-items" v-for="(item, index) in visitorsList" :key="index">
          <img :src="item.headUrl" :alt="index">
          <span>{{item.nickName}}</span>
          <time>{{item.addTime}}</time>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      params: {},
      pageConfig: {
        pageNum: 1,
        pageSize: 8
      },
      visitorsList: []
    }
  },
  created () {
    try {
      if (this.$route.query.ebuyhouse !== undefined) {
        this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      } else {
        if (this.params.id === undefined) {
          this.params.id = null
        }
      }
    } catch (err) {
      console.log(err)
    }
    this.fetchInfo()
  },
  methods: {
    fetchInfo () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}news/view-list`, {params: Object.assign({}, _this.pageConfig, {fkNewsId: _this.params.id})})
        .then(res => {
          if (res.data.success) {
            _this.visitorsList = res.data.data.rows
          }
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .visitorsRecordViews
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
    margin-top: 20px
    .MajorImg
      width: 100%
      height: 125px
      display: flex
      align-items: center
      justify-content: center
      img
        height: 100%
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
    .otherAuthor
      margin-top: 20px
      // margin-bottom: 55px
      .author-list-box
        margin: 0 .5em 0 2.1875em
        .author-items
          height: 35px
          display: flex
          align-items: center
          text-indent: 1em
          position: relative
          cursor: pointer
          margin-bottom: 35px
          img
            width: 1.875em
            height: 1.875em
            border-radius: 50%
            overflow: hidden
          span
            color: #666
            font-size: 0.875em
          time
            color: #999999
            font-size: 0.875em
</style>
