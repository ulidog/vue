<template>
  <section class="bottomModuleViews" v-if="pageConfig.pageTotal !== 0">
    <header class="otherMoreTitle">
      <span>{{ titles }}</span>
    </header>
    <section class="cardListBox">
      <ul class="cardList">
        <li class="cardListItem" v-for="item in RecommendedNearbyList" :key="item.houseId">
          <router-link :to="{ path: '/listing/details/' + item.houseId }">
            <header class="header-img">
              <img v-lazy="item.imgUrl" :alt="item.street" :key="item.houseId">
            </header>
            <footer class="footer-intro">
              <h4><span class="mini">$ </span>{{ item.price | priceFormat }} <span v-if="item.dealType !== 1">/mo</span></h4>
              <section class="intro">
                <section class="icons-items">
                  <!-- <img src="/static/img/listing/icons/utils_baths.png" alt="Bathrooms"> -->
                  <span>{{ item.bedroom }}</span>
                  <span v-if="item.bedroom !== 'studio'">&nbsp;bds</span>
                </section>
                <section class="icons-items">
                  <!-- <img src="/static/img/listing/icons/utils_bads.png" alt="Bedrooms"> -->
                  <span class="padding-5">●</span>
                  <span>{{ item.bathroom }} ba</span>
                </section>
                <section class="icons-items">
                  <!-- <img src="/static/img/listing/icons/utils_sqft.png" alt="Sqft"> -->
                  <span class="padding-5">●</span>
                  <span>{{ item.livingSqft | priceFormat }} sqft</span>
                </section>
              </section>
              <footer class="art-itro">
                <article>{{ item.street }}</article>
              </footer>
            </footer>
          </router-link>
        </li>
        <template v-if="RecommendedNearbyList.length < 8">
          <li class="cardListItem null" v-for="nullIndex in ((RecommendedNearbyList.length>4?8:4)-RecommendedNearbyList.length)" :key="nullIndex">
            <img src="/static/img/default/default_05.png" alt="">
          </li>
        </template>
      </ul>
    </section>
    <footer class="moreService">
      <!-- <span>{{ params.releaseType !== 1 ? 'For Rent' : 'For Sale' }}</span> -->
      <router-link v-if="params.dealType !== 1" :to="{path: addressStitching(houseInfo)}">More <i class="el-icon-arrow-right"></i></router-link>
      <router-link v-else :to="{path: addressStitching(houseInfo)}">More <i class="el-icon-arrow-right"></i></router-link>
    </footer>
    <!-- <footer class="more">
      <router-link :to="{name: 'map&buying', query: {ebuyhouse: $base64.encode(JSON.stringify({type: true}))}}">
        <span>More ></span>
      </router-link>
    </footer> -->
    <!-- <footer class="pageConfig" v-if="false">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageConfig.pageTotal">
      </el-pagination>
    </footer> -->
  </section>
</template>
<script>
export default {
  data () {
    return {
      params: {},
      pageConfig: {
        page: 1,
        pageSize: 8,
        pageTotal: 0
      },
      RecommendedNearbyList: []
    }
  },
  props: {
    titles: {
      default: null,
      type: String
    },
    houseInfo: {
      default: () => {},
      type: Object
    }
  },
  watch: {
    'pageConfig.page': function () {
      console.log('监听回调!')
      this.fetchRent(this.params)
    },
    houseInfo (val, oldVal) {
      this.formatData(val)
      this.params = val
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageConfig.page = val
    },
    formatData (_info) {
      this.fetchRent(_info)
    },
    addressStitching (_info = {}) {
      return `/map/${_info.dealType !== 1 ? 'rent' : 'buy'}/ebuy-${_info.keyWord ? _info.keyWord : ''}/ebuy-${_info.stateId ? _info.stateId : ''}/ebuy-${_info.cityId ? _info.cityId : ''}/ebuy-${_info.cityName ? _info.cityName : ''}/ebuy-${_info.latitude ? _info.latitude : ''}/ebuy-${_info.longitude ? _info.longitude : ''}`
    },
    fetchRent (_info) {
      const _this = this
      _this.$axios.get(`${_this.SH_HOUSE_PROD_PATH}thouses/nearby/house`, {
        params: Object.assign({
          latitude: _info.latitude,
          longitude: _info.longitude,
          dealType: _info.dealType,
          houseId: _info.houseId
        },
        _this.pageConfig
        )})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            _this.pageConfig.pageTotal = res.data.data.length
            _this.RecommendedNearbyList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .bottomModuleViews
    margin-top: 7.8em
    .otherMoreTitle
      // background-image: url('/static/img/listing/icons/bg_line.png')
      // background-color: #E7E7E7
      height: 52px
      background-size: contain
      background-position: center
      background-repeat: no-repeat
      display: flex
      justify-content: center
      align-items: center
      font-size: 36px
      color: #444444
      font-weight: bold
    .cardListBox
      margin-top: 20px
      .cardList
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        .cardListItem
          width: 22%
          // height: 19.375em
          background-color: #fff
          border-radius: 5px
          overflow: hidden
          margin-top: 1.5625em
          border: 1px solid #E9E9E9
          transition: all linear .5s
          &:hover
            transform: scale(1.02);
            box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.6);
            transition: all .3s ease
          .header-img
            height: 12.1875em
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            overflow: hidden
            img
              // min-width: 100%
              transition: all linear .5s
              &:hover
                transform: scale(1.08);
          .footer-intro
            height: 7.1875em
            padding: 0.375em
            display: flex
            flex-direction: column
            h4
              font-size: 1.25em
              font-weight: bold
              color: #444
              height: 1.5em
              .mini
                font-size: .875em
            .intro
              display: flex
              justify-content: flex-start
              align-items: center
              height: 1.5em
              font-size: 1em
              width: 100%
              color: #666
              margin-bottom: .5em
              position: relative
              &:before
                position: absolute
                content: ''
                width: calc( 100% + 0.375em * 2 )
                height: 1px
                background: #E9E9E9
                bottom: -0.25em
                left: -0.375em
              .padding-5
                padding: 0 5px
              .icons-items
                display: flex
                // flex: 0 0 calc( 100% / 3 )
                justify-content: flex-start
                align-items: center
                img
                  margin-right: 5px
                  width: 1em
                  height: 1em
            .art-itro
              article
                font-size: 14px
                color: #999
        .cardListItem.null
          display: flex
          justify: center
          align-items: center
          img
            width: 100%
    .pageConfig
      margin: 60px 0 65px 0
      display: flex
      justify-content: center
      background-color: transparent
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
          background-color: #639fd6
          color: #fff
          padding: 0
          height: 2em
          width: 2em
    .moreService
      margin: 60px 0 30px
      text-align: center
      width: 100%
      >a
        width: 364px
        height: 30px
        line-height: 30px
        text-align: center
        display: inline-block
        border-radius: 15px
        color: #999999
        border: 1px solid #999999
        transition: all .3s ease
        &:hover
          color: #fff
          background-color: #1281fc
          border: 1px solid #1281fc
</style>
