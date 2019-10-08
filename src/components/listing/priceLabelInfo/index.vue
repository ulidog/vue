<template>
  <section class="priceInfoComponents">
    <section class="location-label-info">
      <section class="loction-info">
        <img src="/static/img/listing/icons/address.png" alt="address"/>
        <span>{{ params.street }}</span>
      </section>
      <ul class="listing-type-vice">
        <li class="type-item" v-for="item in moduleType" :key="item.id">
          <section class="num-type">
            <img v-lazy="item.src" :alt="item.alt" :key="item.id">
            <span>{{ item.num === 'studio' ? '' : item.num }}</span>
          </section>
          <span class="type-name" v-if = "item.num !== 'studio'">{{ item.alt }}</span>
          <span class="type-name" v-if = "item.num === 'studio'">Studio</span>
        </li>
      </ul>
      <ul class="listing-type-vice-btns">
        <li class="btns-prams" v-for="(item, index) in stringToArray(params.advantage)" :key="index">
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>
    <section class="price-house-type">
      <section class="price-address">
        <h3>$ {{params.price|priceFormat}}<span class="month" v-if="params.dealType !== 1">/mo</span></h3>
      </section>
      <section class="column-title">
         <!-- <span>{{ params.dealType !== 1 ? 'For Rent' : 'For Sale' }}</span> -->
         <span v-if="params.transactionStatus === 1 & params.dealType === 1"><i></i>For Sale</span>
         <span v-if="params.transactionStatus === 1 & params.dealType !== 1"><i></i>For Rent</span>
         <span  title-i1 v-if="params.transactionStatus === 2"><i class="title-i2"></i>Trading...</span>
         <span class="title-i3" v-if="params.transactionStatus === 3"><i class="title-i1"></i>Sold</span>
      </section>
    </section>
  </section>
</template>
<script>
import Vue from 'vue'
const stringToArray = Vue.filter('stringToArray')
const priceFormat = Vue.filter('priceFormat')
export default {
  data () {
    return {
      params: {
        price: 0,
        labelList: []
      },
      moduleType: [
        {
          id: 0,
          alt: 'Beds',
          src: '/static/img/listing/icons/bed.png',
          num: 0
        },
        {
          id: 1,
          alt: 'Baths',
          src: '/static/img/listing/icons/bath.png',
          num: 0
        },
        {
          id: 2,
          alt: 'Sqft',
          src: '/static/img/listing/icons/Sqft.png',
          num: 0
        }
      ]
    }
  },
  filters: {
    rentPayType (_V) {
      return [_V].map(item => {
        let typeString
        switch (Number(item)) {
          case 1:
            typeString = '/mo'
            break
          case 2:
            typeString = '/qt'
            break
          case 3:
            typeString = '/hy'
            break
          case 4:
            typeString = '/y'
            break
        }
        return typeString
      })[0]
    }
  },
  props: {
    houseInfo: {
      default: () => {},
      type: Object
    }
  },
  watch: {
    houseInfo (val, oldVal) {
      this.formatData(val)
      this.params = val
    }
  },
  methods: {
    formatData (_info) {
      // 简略信息
      this.moduleType[0].num = _info.bedroom
      this.moduleType[1].num = _info.bathroom
      this.moduleType[2].num = priceFormat(_info.livingSqft)
      // console.log(this)
    },
    stringToArray (_info) {
      return stringToArray(_info)
    }
  }
}
</script>
<style lang="sass" scoped>
  .priceInfoComponents
    display: flex
    flex-direaction: row
    width: 100%
    .location-label-info
      flex: 0 0 calc( 100% - 22.8125em)
      .loction-info
        >img
          vertical-align: middle
        >span
          font-size: 1.875em
          vertical-align: middle
      .listing-type-vice
        display: flex
        margin-top: 1.8em
        flex-wrap: wrap
        .type-item
          display: flex
          margin-right: 1em
          font-size: 1.875em
          align-items: center
          .num-type
            display: flex
            align-items: center
            >span
              margin: 0 .2em
      .listing-type-vice-btns
        display: flex
        margin-top: 1.8em
        flex-wrap: wrap
        .btns-prams
          background-color: #D2E4FF
          color: #2C63B6
          font-size: 1.125em
          padding: 10px 30px
          border-radius: 20px
          cursor: pointer
          display: flex
          align-items: center
          margin-right: 10px
          margin-bottom: 10px
    .price-house-type
      flex: 0 0 22.8125em
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .price-address
        h3
          font-size: 2.5em
          color: #F48A42
          font-weight: bold
      .column-title
        margin-top: 20px
        >span
          font-size: 1.875em
          height: 50px
          padding: 0 35px
          color: #444
          display: inline-block
          line-height: 50px
          cursor: default
          transition: all .3s ease
          position: relative
          >i
            width: 10px
            height: 10px
            background-color: #2C63B6
            display: block
            position: absolute
            top: 50%
            margin-top: -5px
            left: 10px
            border-radius: 5px
          .title-i1
            background-color: #ff4146
          .title-i2
            background-color: #9ce290
        .title-i3
            color: #ff4146
</style>
