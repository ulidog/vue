<template>
  <el-row class="inspectionWaitViews">
    <el-col :span="24" class="content">
      <header class="backHistory">
        <span @click="goBack"> <i class="el-icon-back"></i>{{ params.serverName }}</span>
      </header>
      <section class="imgList">
        <ul class="img-box" v-loading="imgLoading">
          <li class="image-items" v-for="item in imgList" :key="item.id">
            <img v-lazy="item.url" :alt="item.createTime" class="img-type" :key="Math.random() * 10000">
          </li>
        </ul>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      params: {},
      imgList: [],
      imgLoading: true
    }
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    }),
    goBack () {
      this.$router.push({
        name: 'buy-steps-24',
        query: {ebuyhouse: this.$base64.encode(JSON.stringify(this.params))}
      })
    },
    fetchImgList () {
      const _this = this
      _this.$axios.get(`${this.WXL_LOCAL_PATH}saleHouseOrder/find_check_server_img`, {params: {houseOrderId: _this.params.id, checkServerId: _this.params.checkServerId}})
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.imgList = res.data.data
            setTimeout(() => {
              _this.imgLoading = false
            }, 500)
          }
        })
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    console.log(this.params)
    this.updateStatus(5)
    this.fetchImgList()
  }
}
</script>
<style lang="sass" scoped>
  .inspectionWaitViews
    background-color: #fff
    padding: 68px 78px
    .content
      .backHistory
        span
          color: #1281FC
          font-size: 1.1875em
          display: flex
          align-items: center
          cursor: pointer
      .imgList
        margin-top: 25px
        .img-box
          display: flex
          flex-wrap: wrap
          .image-items
            width: 13.75em
            height: 12.0625em
            margin-right: 30px
            margin-bottom: 15px
            display: flex
            align-items: center
            justify-content: center
            overflow: hidden
            >img
              width: 180px
</style>
