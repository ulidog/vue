<template>
  <!-- 房源参数详情 组件 -->
  <section class="introductionViews">
    <!-- 详细信息 -->
    <section class="Details">
      <section class="FeaturesBuildingInfo">
        <header>
          <h3>Features & Building Info</h3>
        </header>
        <section class="label-value">
          <ul class="label-box">
            <li class="label-intro" v-for="item in FeaturesList" :key="item.id" v-if="item.value !== null && item.value !== '' ">
              <label :for="item.id">{{ item.label }}</label>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </section>
      </section>
      <section class="HouseFacilities" v-if="HouseFacilitiesList.length !== 0">
        <header>
          <h3>House Facilities</h3>
        </header>
        <section class="label-value">
          <ul class="label-box">
            <li class="label-intro" v-for="(item, index) in HouseFacilitiesList" :key="index">
              <label :for="item.id">{{ item.label }}:</label>
              <ul class="chiild-value">
                <li class="child-items" v-for="(childItem, cindex) in item.value" :key="cindex">
                  <!-- <i></i> -->
                  <span>{{childItem.value}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </section>
      <section class="HouseFacilities" v-for="(item, index) in UtilsDetailsList" :key="`${index}`">
        <header>
          <h3>{{item.name}}</h3>
        </header>
        <section class="label-value">
          <ul class="label-box">
            <li class="label-intro" v-for="(items, indexs) in item.data" :key="`${index}-${indexs}`">
              <label :for="`${index}-${indexs}`">{{ items.name }}:</label>
              <ul class="chiild-value">
                <li class="child-items" :id="`${index}-${indexs}-${_indexs}`" v-for="(_items, _indexs) in items.data" :key="`${index}-${indexs}-${_indexs}`">
                  <span>{{_items.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </section>
      <section class="PropertyDescription" v-if="params.houseDesc !== '' && params.houseDesc !== null">
        <section class="article-descpt">
          <h5 class="title-image">Property Descriptions</h5>
          <span class="image-text-dh"></span>
          <article>{{ params.houseDesc }}</article>
        </section>
      </section>
      <utils-details-voice-map :houseInfo="houseInfo"></utils-details-voice-map>
    </section>
  </section>
</template>
<script>
import Vue from 'vue'
import voiceMap from '@/components/listing/voiceMap'
const priceFormat = Vue.filter('priceFormat')
const stringToJSONArray = Vue.filter('stringToJSONArray')
export default {
  components: {
    'utils-details-voice-map': voiceMap
  },
  data () {
    return {
      params: {
        price: 0,
        advantage: null,
        houseDesc: null
      },
      FeaturesList: [
        {
          id: 0,
          label: 'Status：',
          value: 'Available for sale'
        },
        {
          id: 1,
          label: 'Rental Type：',
          value: null
        },
        {
          id: 2,
          label: 'Housing Type：',
          value: 'House'
        },
        {
          id: 3,
          label: 'Rental Type：',
          value: null
        },
        {
          id: 4,
          label: 'Rent Payment：',
          value: null
        },
        {
          id: 5,
          label: 'Deposit：',
          value: null
        },
        {
          id: 6,
          label: 'Price：',
          value: '$ 0'
        },
        {
          id: 7,
          label: 'Price/Sqft：',
          value: null
        },
        {
          id: 8,
          label: 'Living Sqft：',
          value: '0 sqft'
        },
        {
          id: 9,
          label: 'Lot Sqft：',
          value: '0 acres'
        },
        {
          id: 10,
          label: 'Hoa/Master Plan：',
          value: '$ 0 /mo'
        },
        {
          id: 11,
          label: 'Year：',
          value: '2019'
        },
        {
          id: 12,
          label: 'Parcel #：',
          value: '0000000'
        },
        {
          id: 13,
          label: 'MLS#：',
          value: '00000'
        },
        {
          id: 14,
          label: 'Days on Ebuyhouse：',
          value: '0 days'
        },
        {
          id: 15,
          label: 'Interior Decoration Grade：',
          value: null
        },
        {
          id: 16,
          label: 'Garage：',
          value: null
        },
        {
          id: 17,
          label: 'Garage Sqft：',
          value: null
        },
        {
          id: 18,
          label: 'Basement Sqft：',
          value: null
        }
      ],
      HouseFacilitiesList: [],
      UtilsDetailsList: []
    }
  },
  filters: {
    rentPayType (_V) {
      return [_V].map(item => {
        let typeString
        switch (Number(item)) {
          case 1:
            typeString = 'Monthly'
            break
          case 2:
            typeString = 'Quarterly'
            break
          case 3:
            typeString = 'Half year'
            break
          case 4:
            typeString = 'Year'
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
    init () {},
    formatData (_info) {
      // 公共
      if (_info.dealType !== 1) {
        // 改变label
        this.FeaturesList[6].label = `Rent/month:`
        // 改变值
        this.FeaturesList[0].value = 'Available for rent'
        this.FeaturesList[1].value = _info.dealType === 2 ? 'Whole House' : 'Single Room'
        this.FeaturesList[4].value = _info.rentPayment !== null ? [_info.rentPayment].map(item => {
          let typeString
          switch (Number(item)) {
            case 1:
              typeString = 'Monthly'
              break
            case 2:
              typeString = 'Quarterly'
              break
            case 3:
              typeString = 'Half year'
              break
            case 4:
              typeString = 'Year'
              break
          }
          return typeString
        })[0] : null
        this.FeaturesList[5].value = _info.deposit !== null ? `$ ${priceFormat(_info.deposit)}` : null
        this.FeaturesList[15].value = _info.decorateGrade !== null ? _info.decorateGrade : null
      } else {
        this.FeaturesList[7].value = `$ ${priceFormat(_info.priceSqft)} /sqft `
      }
      // 详细信息
      // this.FeaturesList[0].value = _info.
      this.FeaturesList[2].value = _info.houseType
      this.FeaturesList[6].value = `$ ${priceFormat(_info.price)}`
      this.FeaturesList[8].value = `${priceFormat(_info.livingSqft)} sqft`
      this.FeaturesList[9].value = `${_info.userInputUnit}`
      this.FeaturesList[10].value = `$ ${priceFormat(_info.hoaFee)} /mo`
      this.FeaturesList[11].value = _info.yearBuild
      this.FeaturesList[12].value = _info.apn ? _info.apn : null
      this.FeaturesList[13].value = _info.mls ? _info.mls : null
      this.FeaturesList[14].value = _info.daysTime
      this.FeaturesList[16].value = _info.garage
      this.FeaturesList[17].value = priceFormat(_info.garageSqft) ? priceFormat(_info.garageSqft) + ' sqft' : null
      this.FeaturesList[18].value = priceFormat(_info.basementSqft) ? priceFormat(_info.basementSqft) + ' sqft' : null
      // HouseFacilitiesList 固定标签
      this.UtilsDetailsList = stringToJSONArray(_info.houseAmenities)
      // console.log(this.UtilsDetailsList)
      this.$forceUpdate()
    }
  },
  created () {
  }
}
</script>
<style lang="sass" scoped>
  .introductionViews
    flex: 0 0 calc( 100% - 22.8125em )
    .Details
      margin-top: 0.3125em
      .FeaturesBuildingInfo
        padding-top: 6.25em
        header
          height: 50px
          font-size: 1.5em
          font-weight: bold
          display: flex
          align-items: center
          margin-right: 43px
          border-bottom: 1px solid #EEEEEE
          h3
            color: #444444
            font-weight: bold
            padding: 0 28px
            display: flex
            height: 100%
            align-items: center
            background-color: #EEEEEE
            border-radius: 5px 5px 0 0
        .label-value
          margin-top: 1.6875em
          .label-box
            display: flex
            flex-wrap: wrap
            .label-intro
              flex: 0 0 50%
              height: 2.4375em
              display: flex
              justify-content: flex-start
              align-items: center
              &:nth-child(2n+1)
                padding-left: 3em
              label
                font-size: 1.125em
                color: #444
              span
                color: #999
                font-size: 1.125em
                margin-left: 1.5em
      .HouseFacilities,.untilesDetails,.Pet
        padding-top: 2.625em
        header
          height: 50px
          font-size: 1.5em
          font-weight: bold
          display: flex
          align-items: center
          margin-right: 43px
          border-bottom: 1px solid #EEEEEE
          h3
            color: #444444
            font-weight: bold
            padding: 0 28px
            display: flex
            height: 100%
            align-items: center
            background-color: #EEEEEE
            border-radius: 5px 5px 0 0
        .label-value
          margin-top: 1.6875em
          width: 100%
          .label-box
            display: flex
            flex-wrap: wrap
            width: 100%
            .cd-child-items
              // flex: 0 0 calc( 100% / 3 )
              height: 2.4375em
              align-items: center
              display: flex
              margin-right: 1.25em
              i
                width: 1.25em
                height: 1.25em
                border-radius: 2px
                background-color: #99aab7
              span
                color: #666666
                font-size: 1.125em
                margin-left: 1.25em
            .label-intro
              flex: 0 0 100%
              min-height: 2.4375em
              display: flex
              justify-content: flex-start
              // align-items: center
              padding-left: 3em
              label
                font-size: 1.125em
                color: #444
                width: 10.9375em
                padding-top: .5em
              .chiild-value
                display: flex
                flex-wrap: wrap
                width: calc( 100% - 10.9375em )
                align-items: center
                .child-items
                  // flex: 0 0 calc( 100% / 3 )
                  min-width: calc( 100% / 3 )
                  height: 2.4375em
                  align-items: center
                  display: flex
                  i
                    width: 1.25em
                    height: 1.25em
                    border-radius: 2px
                    background-color: #99aab7
                  span
                    color: #999
                    font-size: 1.125em
                    margin-left: 1.25em
      .PropertyDescription
        min-height: 280px
        margin-top: 60px
        display: flex
        justify-content: center
        .article-descpt,.map-component
          flex: 1
          margin-top: 1.6875em
          margin-right: 43px
          display: flex
          align-items: center
          background: rgba(247,247,247,1)
          border-radius: 10px
          position: relative
          padding: 60px 20px 20px
          .title-image
            height: 70px
            background-image: url('/static/img/listing/icons/house_title_bg.png')
            background-repeat: no-repeat
            background-position: top
            font-size: 25px
            color: #2C63B6
            padding: 0 20px
            font-weight: bold
            display: flex
            align-items: center
            padding-bottom: 10px
            position: absolute
            top: -23px
            left: 50px
          .image-text-dh
            height: 28px
            width: 28px
            background-image: url('/static/img/listing/icons/house_text_bg.png')
            background-repeat: no-repeat
            position: absolute
            top: 20px
            right: 50px
          article
            font-size: 1.25em
            color: #444
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 50
            /*! autoprefixer: off */
            -webkit-box-orient: vertical
            /* autoprefixer: on */
            word-break: break-word
            line-height: 34px
            text-indent: 2em
</style>
