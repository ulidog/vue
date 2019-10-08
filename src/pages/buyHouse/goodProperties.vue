<style lang="sass" scoped>
  @media screen and (max-width: 1200px)
    .box
      width: 95%
      .property-items
        min-width: 300px
        max-width: 350px
      @for $i from 1 through 6
        .property-items:nth-child(#{$i})
          margin-bottom: 18px
  @media screen and (min-width: 1200px)
    .box
      .property-items
        max-width: 350px
      @for $i from 1 through 6
        .property-items:nth-child(#{$i})
          margin-bottom: 18px
  @media screen and (min-width: 1515px)
    .box
      .property-items
        width: calc((100% - 4rem) / 3)
        max-width: 450px
      .property-items:nth-child(1),
      .property-items:nth-child(2),
      .property-items:nth-child(3)
        margin-bottom: 18px
</style>

<style lang="scss" scoped>
.good-properties-part{
  padding-top: 3rem;
  padding-bottom: 30px;
  background-color: #f3f4f5;
}

.box{
  transition: all .5s cubic-bezier(1, 1, 0, 0);
  margin: 0 auto;
  overflow: hidden;
}

.box-brow{
  height: 2.5rem;
  padding-left: 0.8rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.box-brow::before{
  content: "";
  display: block;
  width: 0.25rem;
  height: 100%;
  background-color: #1281fc;
  position: absolute;
  left: 0;
  top: 0;
}

.box-brow>div{
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box-brow>div>h4{
  color: #444444;
  font-size: 1.2rem;
  line-height: 1.2rem;
  white-space: nowrap;
}

.box-brow>div>span{
  color: #666666;
  font-size: 0.9rem;
  line-height: 0.9rem;
  white-space: nowrap;
}

.box-brow button{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  color: #999999;
  font-size: 1rem;
}

.properties-carousel{
  display: flex;
  justify-content: space-between;
}

.properties-group{
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.property-items{
  // width: -webkit-calc((100% - 4rem) / 3);
  // width: -moz-calc((100% - 4rem) / 3);
  // width: -ms-calc((100% - 4rem) / 3);
  // width: -o-calc((100% - 4rem) / 3);
  // width: calc((100% - 4rem) / 3);
  max-width: 350px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  transform-origin: 50% 50%;
  transition: box-shadow .5s ease;
}

.property-items:hover{
  box-shadow: 5px 5px 10px 1px rgba(0,0,0,.33);
}

.property-img{
  width: 100%;
  overflow: hidden;
}

.like-or-nolike {
  position: absolute;
  top: 10px;
  right: 10px;
}

.property-img img{
  display: block;
  width: 100%;
  transform-origin: 50% 50%;
  transition: transform 1s ease-out 0s;
}

.property-img img:hover{
  transform: matrix(1.1, 0, 0, 1.1, 0, 0);
}

.property-price{
  padding-top: 0.5rem;
  padding-left: 3.5%;
  color: #444444;
  line-height: 2.8rem;
}

.price-unit{
  font-size: 1.2rem;
}

.price-num{
  font-size: 1.8rem;
}

.property-structure{
  padding-left: 3.5%;
  padding-right: 3.5%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
}

.property-structure>div{
  display: flex;
  align-items: center;
  color: #999999;
  line-height: 2.8rem;
}

.property-structure>div>img{
  width: 1.5em;
  margin-right: 0.2em;
}

.property-structure>div>.num{
  font-size: 1.5em;
}

.property-structure>div>.num>.unit{
  font-size: 0.7em;
}

.property-describe{
  margin: 1rem 3.5%;
  font-size: 1rem;
  line-height: 1.5rem;
  height:3rem;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */;
}

/deep/ .el-carousel__indicator{
  width: 1%;
  height: 3px;
  padding: 0;
  border-radius: 1.5px;
  margin-right: 1%;
  overflow: hidden;
}

/deep/ .el-carousel__indicator button{
  width: 100%;
  height: 100%;
  background-color: #999;
}
</style>

<template>
  <div class="good-properties-part">
    <div class="box">
      <!-- <div class="box-brow">
        <div>
          <h4><router-link :to="{name: 'map&buying', query: {ebuyhouse: $base64.encode(JSON.stringify({type: true}))}}">Featured Homes</router-link></h4>
          <span>Browse our Most Recent Listings</span>
        </div>
        <button><router-link :to="{name: 'map&buying', query: {ebuyhouse: $base64.encode(JSON.stringify({type: true}))}}">More<img src="/static/img/index/more.png" /></router-link></button>
      </div> -->
      <div class="box-body">
        <el-carousel class="carousel" trigger="click" arrow="never" :interval="3000" indicator-position="outside" :height="carouselHeight">
          <el-carousel-item v-for="(group, index) in goodPropertiesData" :key="index">
            <div class="properties-group">
              <div ref="carousel-items" class="property-items" v-for="(item, cindex) in group" :key="cindex">
                <router-link :to="{ path: '/listing/details/'+item.houseId}">
                  <div class="property-img">
                    <img v-lazy="item.imgUrl" style="height: 308px;" :key="item.houseId" />
                  </div>
                  <!-- <div class="like-or-nolike">
                    <img src="/static/img/other/shoucang_1.png" alt="false" v-if="item.checkStatus !== 2" @click.stop.prevent="collectionHouse(1, item.houseId, item.dealType, item)">
                    <img src="/static/img/other/shoucang_2.png" alt="true" v-if="item.checkStatus === 2" @click.stop.prevent="collectionHouse(2, item.houseId, item.dealType, item)">
                  </div> -->
                  <div class="property-price">
                    <strong class="price-unit">$</strong>
                    <strong class="price-num">{{item.price|priceFormat}}</strong>
                  </div>
                  <div class="property-structure">
                    <div class="bed">
                      <img src="/static/img/listing/icons/bed.png" />
                      <span class="num">
                        {{item.bedroom}}<span class="unit" v-if="item.bedroom !== 'studio'">&nbsp;bds</span>
                      </span>
                    </div>
                    <div class="bath">
                      <img src="/static/img/listing/icons/bath.png" />
                      <span class="num">
                        {{item.bathroom}}<span class="unit">&nbsp;ba</span>
                      </span>
                    </div>
                    <div class="sqft">
                      <img src="/static/img/listing/icons/Sqft.png" />
                      <span class="num">
                        {{item.livingSqft|priceFormat}}<span class="unit">&nbsp;sqft</span>
                      </span>
                    </div>
                  </div>
                  <div class="property-describe">{{item.street}}</div>
                </router-link>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <section class="pageConfig" v-if="serviceList.length !== 0">
        <el-pagination
          background
          class="serviceConfigPage"
          layout="prev, pager, next"
          @current-change="handleChange"
          :current-page="listPageConfig.pageNum"
          :page-size="listPageConfig.pageSize"
          :total="listPageConfig.pageTotal">
        </el-pagination>
      </section> -->
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/session'
let uniqueKey = 1
export default {
  data () {
    return {
      goodPropertiesData: [],
      carouselHeight: '800',
      goodData: []
    }
  },
  filters: {
    priceFormat (_N) {
      let AfterProgressing = []
      _N.toString().replace(/\D/g, '').split('').filter(items => {
        if (items !== ',') {
          return items
        }
      }).map((item, index, arg) => {
        if ((arg.length - 1 - index) % 3 === 0) {
          AfterProgressing.unshift(item)
          if ((index + 1) !== arg.length) {
            AfterProgressing.unshift(',')
          }
        } else {
          AfterProgressing.unshift(item)
        }
      })
      return AfterProgressing.reverse().join('')
    }
  },
  methods: {
    getUniqueKey () {
      return uniqueKey++
    },
    getGoodPropertiesData () {
      // console.log(this.goodData.length)
      const I_LENGTH = Math.ceil(this.goodData.length / 6)
      let arr = []
      for (let i = 0; i < I_LENGTH; i++) {
        arr.push([])
        for (let k = 0; k < 6; k++) {
          if (i * 5 + k < this.goodData.length) {
            arr[i].push(this.goodData[i * 6 + k])
          }
        }
      }
      this.goodPropertiesData = arr.map(item => {
        return item.filter(citem => {
          return citem !== undefined
        })
      })
      this.carouselMaxIndex = this.goodPropertiesData.length - 1
    },
    getGoodData () {
      const _this = this
      // 请求数据
      this.$axios({
        'method': 'GET',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/home/list`,
        'params': {
          'dealType': 1,
          'pageSize': 12
        }
      })
        .then(response => {
          const data = response.data.data
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              _this.goodData = data
              _this.getGoodPropertiesData()
            }
          } else {
            // alert(response.data.msg)
          }
        })
        .catch(error => {
          // alert(error)
          if (error) {}
        })
    },
    calcCarouselHeight (num = 2) {
      // let item = window.document.querySelectorAll('.properties-group .property-item')
      const item = this.$refs['carousel-items']
      // console.log(item)
      if (item instanceof Array && item.length > 0) {
        let _heights = []
        Object.values(item).map(cardItem => {
          _heights.push(cardItem.clientHeight)
        })
        // console.log(_heights)
        const maxHeight = Math.max.apply(null, _heights)
        // console.log('最大值:' + maxHeight)
        this.carouselHeight = `${maxHeight * num + num * 18}px`
      } else {
        window.setTimeout(() => {
          this.calcCarouselHeight(num)
        }, 100)
      }
      // if (item instanceof NodeList && item.length > 0) {
      //   let _heights = []
      //   Object.values(item).map(cardItem => {
      //     _heights.push(cardItem.getBoundingClientRect().height)
      //   })
      //   console.log(_heights)
      //   const maxHeight = Math.max.apply(null, _heights)
      //   // console.log('最大值:' + maxHeight)
      //   this.carouselHeight = `${maxHeight * num + num * 18}px`
      // } else {
      //   window.setTimeout(() => {
      //     this.calcCarouselHeight(num)
      //   }, 100)
      // }
    },
    collectionHouse (status, id, type, _item) {
      if (!getToken()) {
        this.$store.commit('signOut', true)
      } else {
        this.$axios({
          url: `${this.SH_HOUSE_PROD_PATH}thouses/add-collection/house`,
          method: 'POST',
          data: {collection: status, thousesId: id, dealType: type}
        })
          .then(res => {
            if (res.data.success) {
              this.$message.success(res.data.msg)
              _item.checkStatus = 1
            } else {
              this.$message.info(res.data.msg)
            }
          })
          .catch(err => {
            console.log(err)
            // this.$message.error(err)
          })
      }
    },
    autoClientWidth (_width) {
      const __width = _width || document.body.clientWidth
      // console.log(__width)
      if ((__width < 1515 && __width > 1300) || (__width < 1125 && __width > 755)) {
        this.calcCarouselHeight(3)
      } else if (__width < 755) {
        this.calcCarouselHeight(6)
      } else {
        this.calcCarouselHeight(2)
      }
    },
    resizeChange (_params) {
      // console.log('---->' + _params.target.innerWidth)
      const _width = _params.target.innerWidth
      this.autoClientWidth(_width)
    }
  },
  mounted () {
    this.getGoodData()
    this.$nextTick(() => {
      this.autoClientWidth()
      window.addEventListener('resize', this.resizeChange)
    })
  },
  // updated () {
  //   this.autoClientWidth()
  // },
  destroyed () {
    window.removeEventListener('resize', this.resizeChange)
  }
}
</script>
