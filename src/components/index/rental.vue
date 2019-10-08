<style lang="sass" scoped>
  @media screen and (max-width: 1200px)
    .box
      width: 95%
      .property-item
        max-width: 225px
        margin-bottom: 18px
      .property-item:nth-child(4)
        justify-self: start
  @media screen and (min-width: 1200px)
    .box
      width: 62.5%
      .property-item
        max-width: 350px
      @for $i from 1 through 3
        .property-item:nth-child(#{$i})
          margin-bottom: 18px
  @media screen and (min-width: 1515px)
    .box
      .property-item
        width: calc((100% - 8rem) / 4)
        max-width: 450px
      @for $i from 1 through 4
        .property-item:nth-child(#{$i})
          margin-bottom: 18px
</style>
<style lang="scss" scoped>
.rental-part {
  padding-top: 1.8rem;
  padding-bottom: 1.5rem;
  background-color: #f3f4f5;
}

.box {
  transition: all .5s cubic-bezier(1, 1, 0, 0);
  margin: 0 auto;
  overflow: hidden;
}

.box-brow {
  height: 5rem;
  padding-left: 0.8rem;
  // margin-bottom: 1rem;
  align-items: center;
  overflow: hidden;
}

// .box-brow::before {
//   content: '';
//   display: block;
//   width: 0.25rem;
//   height: 100%;
//   background-color: #1281fc;
//   position: absolute;
//   left: 0;
//   top: 0;
// }

.box-brow > div {
  height: 100%;
  text-align: center;
}

.box-brow > div > h4 {
  color: #444444;
  font-size: 2.2rem;
  line-height: 2.2rem;
  white-space: nowrap;
  margin-bottom: 0.3rem;
}

.box-brow > div > h4 > a{
  color: rgba(60, 61, 65, 1);
  font-size:2rem;
}

.box-brow > div > h4 > a:hover{
  color: rgba(18, 129, 252, 1);
}

.box-brow > div > span {
  color: #999;
  font-size: 0.9rem;
  line-height: 1rem;
  white-space: nowrap;
}

.box-brow button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  color: #999999;
  font-size: 1rem;
}

.properties-carousel {
  display: flex;
  justify-content: space-between;
}

.properties-group {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.property-item {
  // width: -webkit-calc((100% - 4rem) / 3);
  // width: -moz-calc((100% - 4rem) / 3);
  // width: -ms-calc((100% - 4rem) / 3);
  // width: -o-calc((100% - 4rem) / 3);
  // width: calc((100% - 4rem) / 3);
  max-width: 350px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  overflow: hidden;
  transition: box-shadow .5s ease;
  &:hover {
    box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.33);
    transition: box-shadow .5s ease;
  }
}

.property-item:nth-child(1),
.property-item:nth-child(2),
.property-item:nth-child(3),
.property-item:nth-child(4) {
  margin-bottom: 1rem;
}

.property-img {
  width: 100%;
  overflow: hidden;
}

.property-img img {
  display: inline-block;
  width: 100%;
  height: 205px;
  transform-origin: 50% 50%;
  transition: transform 1s ease-out 0s;
}

.property-img img:hover {
  transform: matrix(1.1, 0, 0, 1.1, 0, 0);
}

.property-price {
  padding-left: 3.5%;
  color: #444444;
  line-height: 2.5rem;
}

.price-unit {
  font-size: 1.2rem;
}

.price-num {
  font-size: 1.25rem;
}

.property-structure {
  padding-left: 2%;
  padding-right: 2%;
  display: flex;
  justify-content: space-between;
  // border-bottom: 1px solid #f4f4f4;
}

.property-structure > div {
  display: flex;
  align-items: center;
  color: #999999;
  line-height: 2rem;
}

.property-structure > div > img {
  width: 1em;
  margin-right: 0.15em;
}

.property-structure > div > .num {
  font-size: 0.9em;
  // font-weight: bold;
  color: rgba(68, 68, 68, 1);
}

.property-structure > div > .num > .unit {
  font-size: 0.9em;
}

.property-describe {
  margin: 0.2rem 3.5% 1rem;
  font-size: 0.9rem;
  height: 1rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
}
/deep/ .el-carousel__indicators{
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

/deep/ .el-carousel__indicator {
  width: 19px;
  height: 4px;
  padding: 0;
  border-radius: 2px;
  margin-right: 12px;
  overflow: hidden;
}

/deep/ .el-carousel__indicator button {
  width: 100%;
  height: 100%;
  background-color: #999;
}
.moreBtn {
  text-align: center;
  margin-top:20px;
}
.moreBtn button{
  width:16rem;
  height:2.5rem;
  line-height:2.5rem;
  border:2px solid rgba(102,102,102,1);
  border-radius:1.25rem;
}
.moreBtn button a{
  display:block;
  font-size: 1.2rem;
  line-height: 2.5rem;
}
.moreBtn button:hover{
  background: rgba(18, 129, 252, 1);
  transition: all linear 0.2s;
  border:2px solid rgba(102,102,102,0);
}
.moreBtn button:hover a{
  color: #fff;
}
</style>

<template>
  <div class="rental-part">
    <div class="box">
      <div class="box-brow">
        <div>
          <h4>
            <router-link
              :to="{path: 'map/rent'}"
            >Featured Rentals</router-link>
          </h4>
          <span>Find Homes For Rent</span>
        </div>
      </div>
      <div class="box-body">
        <el-carousel
          trigger="click"
          arrow="never"
          :interval="5000"
          indicator-position="outside"
          :height="carouselHeight"
        >
          <el-carousel-item v-for="(group, index) in goodPropertiesData" :key="index">
            <div class="properties-group">
              <div class="property-item" v-for="(item, cindex) in group" :key="cindex">
                <router-link
                  :to="{ path: '/listing/details/'+item.houseId}"
                >
                  <div class="property-img">
                    <img v-lazy="item.imgUrl" :key="item.houseId">
                  </div>
                  <div class="property-price">
                    <strong class="price-unit">$</strong>
                    <strong class="price-num">{{item.price|priceFormat}}/mo</strong>
                  </div>
                  <div class="property-structure">
                    <div class="bed">
                      <img src="/static/img/listing/icons/bed.png">
                      <span class="num">
                        {{item.bedroom}}
                        <span class="unit" v-if="item.bedroom !== 'studio'"> bds</span>
                      </span>
                    </div>
                    <div class="bath">
                      <img src="/static/img/listing/icons/bath.png">
                      <span class="num">
                        {{item.bathroom | clearSome}}
                        <span class="unit"> ba</span>
                      </span>
                    </div>
                    <div class="sqft">
                      <img src="/static/img/listing/icons/Sqft.png">
                      <span class="num">
                        {{item.livingSqft|priceFormat}}
                        <span class="unit"> sqft</span>
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
      <div class="moreBtn">
        <button>
          <router-link
            :to="{path: 'map/rent'}"
          >More
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
let uniqueKey = 1

export default {
  data () {
    return {
      goodPropertiesData: [],
      carouselHeight: '',
      goodData: [],
      isThrottling: null
    }
  },
  filters: {
    // 过滤掉ba小数点后的0
    clearSome (mmp) {
      mmp = parseFloat(mmp)
      return mmp
    }
  },
  methods: {
    getUniqueKey () {
      return uniqueKey++
    },
    getGoodPropertiesData (num = 4) {
      // console.log(this.goodData)
      const I_LENGTH = Math.ceil(this.goodData.length / num)
      let arr = []
      for (let i = 0; i < I_LENGTH; i++) {
        arr.push([])
        for (let k = 0; k < num; k++) {
          if (i * num + k < this.goodData.length) {
            arr[i].push(this.goodData[i * num + k])
          }
        }
      }
      this.goodPropertiesData = arr
        .map(item => {
          return item.filter(citem => {
            return citem !== undefined
          })
        })
        .filter(item => {
          return item.length !== 0
        })
      this.carouselMaxIndex = this.goodPropertiesData.length - 1
    },
    getGoodData (num = 4, pageSize = 12) {
      const _this = this
      // 节流处理
      if (`${num}${pageSize}` === this.isThrottling) return
      // 请求数据
      this.$axios({
        method: 'GET',
        url: `${this.SH_HOUSE_PROD_PATH}thouses/home/list`,
        params: {
          dealType: 5,
          pageSize: pageSize
        }
      })
        .then(response => {
          const data = response.data.data
          if (response.data.success) {
            if (data instanceof Array && data.length > 0) {
              _this.isThrottling = `${num}${pageSize}`
              _this.goodData = data
              _this.getGoodPropertiesData(num)
            }
          } else {
            // alert(response.data.msg);
          }
        })
        .catch(error => {
          if (error) {}
          // alert(error);
        })
    },
    calcCarouselHeight (num = 1) {
      let items = window.document.querySelectorAll('.properties-group .property-item')
      // const item = this.$refs['carousel-items'][0]
      // console.log(item)
      if (items instanceof NodeList && items.length > 0) {
        let _heights = []
        Object.values(items).map(cardItem => {
          _heights.push(cardItem.getBoundingClientRect().height)
        })
        // console.log(_heights)
        const maxHeight = Math.max.apply(null, _heights)
        // console.log('最大值:' + maxHeight)
        // this.carouselHeight = `${maxHeight * num + num * 18}px`
        this.carouselHeight = `${maxHeight * num + 10}px`
      } else {
        window.setTimeout(() => {
          this.calcCarouselHeight(num)
        }, 100)
      }
    },
    autoClientWidth (_width) {
      const __width = _width || document.body.clientWidth
      // console.log(__width)
      if ((__width < 1515 && __width > 1300) || (__width < 1125 && __width > 755)) {
        this.getGoodData(4, 12)
        this.calcCarouselHeight(1)
      } else if (__width < 755) {
        this.getGoodData(2, 12)
        this.calcCarouselHeight(1)
      } else {
        this.getGoodData(4, 12)
        this.calcCarouselHeight(1)
      }
    },
    resizeChange (_params) {
      // console.log('---->' + _params.target.innerWidth)
      const _width = _params.target.innerWidth
      this.autoClientWidth(_width)
    }
  },
  mounted () {
    // this.getGoodData()
    this.$nextTick(() => {
      this.autoClientWidth()
      window.addEventListener('resize', this.resizeChange)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeChange)
  }
}
</script>
