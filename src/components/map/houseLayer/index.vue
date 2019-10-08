<template>
  <div class='houseLayer'>
    <div class="houseDialog">
      <div class="header">
        <span>{{houseNum}} Suites</span>
        <img class="closeBtn" src="/static/img/common/account/cancleMark.png" alt="close" @click="closeLayer">
      </div>
      <div class="dialogBody" v-loading="loading">
        <ul>
          <!-- <li class="list">
            <div class="logo">
              <img src="/static/img/listing/photo/6.png" alt="">
            </div>
            <div class="txt">
              <h2>$50,000</h2>
              <h3>5430 W Sahara Ave Las Vegas, NV191</h3>
              <p>
                <span><img src="/static/img/listing/icons/bed.png"> 3 bd</span>
                <span><img src="/static/img/listing/icons/bath.png"> 2.5 ba</span>
                <span><img src="/static/img/listing/icons/Sqft.png"> 1,027 sqft</span></p>
            </div>
          </li> -->
          <li class="list" v-for="(item, index) in listArr" :key=index @click="toHouseDetail(item.houseId)">
            <div class="logo">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="txt">
              <h2>$ {{item.price | priceFormat}} <span v-if="Number(showHouseLayer.data.saleOrRent) !== 1">/mo</span></h2>
              <h3>{{item.street}}</h3>
              <p>
                <span><img src="/static/img/listing/icons/bed.png"> {{item.bedroom}} bd</span>
                <span><img src="/static/img/listing/icons/bath.png"> {{item.bathroom}} ba</span>
                <span><img src="/static/img/listing/icons/Sqft.png"> {{item.livingSqft | priceFormat}} sqft</span></p>
            </div>
          </li>
        </ul>
        <h3 v-if="recListArr.length > 0" class="recHouse">Recommended Houses Nearby</h3>
        <ul v-if="recListArr.length > 0">
          <li class="list" v-for="(item, index) in recListArr" :key=index @click="toHouseDetail(item.houseId)">
            <div class="logo">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="txt">
              <h2>$ {{item.price | priceFormat}} <span v-if="Number(showHouseLayer.data.saleOrRent) !== 1">/mo</span></h2>
              <h3>{{item.street}}</h3>
              <p>
                <span><img src="/static/img/listing/icons/bed.png"> {{item.bedroom}} bd</span>
                <span><img src="/static/img/listing/icons/bath.png"> {{item.bathroom}} ba</span>
                <span><img src="/static/img/listing/icons/Sqft.png"> {{item.livingSqft | priceFormat}} sqft</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'houseLayer',
  data () {
    return {
      loading: true,
      houseNum: 0,
      listArr: [], // 按地图房源数量展示
      recListArr: [] // 有比地图多出的房源当作推荐
    }
  },
  computed: {
    ...mapGetters({
      showHouseLayer: 'showHouseLayer'
    })
  },
  created () {
    this.getListData()
  },
  methods: {
    getListData () {
      this.$axios.get(`${this.SH_MAP_PROD_PATH}thouses/select/list/latLng`, {params: this.showHouseLayer.data})
        .then(res => {
          if (res.data.success) {
            this.loading = false
            this.houseNum = Number(this.showHouseLayer.countHouse)
            if (res.data.data.length > Number(this.showHouseLayer.countHouse)) {
              this.listArr = res.data.data.slice(0, Number(this.showHouseLayer.countHouse))
              this.recListArr = res.data.data.slice(Number(this.showHouseLayer.countHouse))
            } else {
              this.listArr = res.data.data
              this.recListArr = []
            }
          } else {
            this.$store.commit('SHOW_HOUSE_LAYER', false)
            this.$message('Please try again！')
          }
        })
    },
    closeLayer () {
      this.$store.commit('SHOW_HOUSE_LAYER', false)
    },
    toHouseDetail (houseId) {
      this.$router.push({
        path: '/listing/details/' + houseId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .houseLayer{
    width: 100%;
    min-width: 960px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(68, 68, 68, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .houseDialog{
      width: 42%;
      padding-bottom: 2px;
      min-width: 640px;
      background:rgba(243,244,245,1);
      box-shadow:0px 14px 14px 0px rgba(68,68,68,0.37);
      .recHouse{
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        color: #1281fc;
        font-size: 1.5rem;
        text-align: center;
      }
      .header{
        height: 66px;
        line-height: 66px;
        display: flex;
        padding: 0 16px 0 20px;
        background-color: #ffffff;
        justify-content: space-between;
        align-items: center;
        .closeBtn{
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
      .dialogBody{
        margin: 1.2rem auto;
        padding: 0 1.5rem;
        max-height: 666px;
        min-height: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
        .list{
          height: 190px;
          background-color: #ffffff;
          padding: 0.7rem 0.9rem;
          margin-bottom: 0.8rem;
          transition: all linear 0.15s;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          .logo{
            width: 32%;
            img{
              width: 100%;
              height: 100%;
              overflow: hidden;
              border-radius: 6px;
              transition: all linear 0.2s;
              &:hover{
                transform: scale(1.05)
              }
            }
          }
          .txt{
            width: 64%;
            h2{
              font-size: 2rem;
              color: #a4a4a4;
              font-weight: bold;
              margin: 1rem auto
            }
            h3{
              font-size: 1.25rem;
              color: #a4a4a4;
              font-weight: normal;
              margin-bottom: 1.5rem;
              height: 1.5rem;
              overflow: hidden;
            }
            p{
              span{
                font-size: 1rem;
                color: #444;
                margin-right: 2rem;
                img{
                  width: 0.9rem;
                  height: 0.9rem;
                  vertical-align: text-top;
                }
              }
              span:nth-child(3){
                margin-right: 0;
              }
            }
          }
          &:hover{
            box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 10px 0px;
            transform: scale(1.01);
            .txt{
              h2{
                color: #1281fc;
              }
            }
          }
        }
      }
    }
  }
</style>
