<template>
  <section class="house-info-container" v-loading="HOUSE_LOADING">
    <header class="price-label">
      <h4>${{houseInfo.viewPrice}}</h4>
      <span><img src="/static/img/userCenter/adr.png" alt="">{{houseInfo.street}}</span>
      <ul class="label-box">
        <li class="label-item" v-for="item in houseInfo.labelList" :key="item.createTime">{{item}}</li>
      </ul>
    </header>
    <section class="house-info-details">
      <ul class="label-info">
        <li class="label-house-label-item" v-for="item in houseinfodetails" :key="item.id">
          <span class="info-label">{{item.label}}</span>
          <span class="info-value">{{item.value}}</span>
        </li>
      </ul>
    </section>
    <footer class="information">
      <h3>Additional Information</h3>
      <article>
        {{houseInfo.reason}}
      </article>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      houseInfo: {},
      houseinfodetails: [
        {
          id: 0,
          label: 'Bedrooms',
          value: 0
        },
        {
          id: 1,
          label: 'Bathrooms',
          value: 0
        },
        {
          id: 2,
          label: 'Garages',
          value: 0
        },
        {
          id: 3,
          label: 'Living Sqft',
          value: 0
        },
        {
          id: 4,
          label: 'Housing Type',
          value: null
        },
        {
          id: 5,
          label: 'Release Time',
          value: null
        }
      ],
      HOUSE_LOADING: false
    }
  },
  'filters': {
    timerFormat: (timer) => {
      if (timer === null) return
      // console.log(timer.length > 10 ? timer : (timer + '000'))
      const formatTimer = timer.length > 10 ? timer : (timer + '000')
      const timers = new Date(Number(formatTimer))
      return `${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
    },
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
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      this.getMasHouseInfo()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    getMasHouseInfo () {
      const _this = this
      _this.HOUSE_LOADING = true
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/mine/detail`, {params: {thousesId: this.params.houseid}})
        .then(res => {
          if (res.data.success) {
            _this.houseInfo = res.data.data
            _this.formatData(_this.houseInfo)
          } else {
            _this.HOUSE_LOADING = false
          }
        })
    },
    formatData (_info) {
      this.houseinfodetails[0].value = _info.bedroom
      this.houseinfodetails[1].value = _info.bathroom
      this.houseinfodetails[2].value = _info.garage
      this.houseinfodetails[3].value = _info.viewLivingSqft
      this.houseinfodetails[4].value = _info.houseType
      this.houseinfodetails[5].value = this.$options.filters.timerFormat(_info.createTime)
      this.HOUSE_LOADING = false
    }
  }
}
</script>
<style lang="sass" scoped>
  .house-info-container
    padding: 25px 28px
    background-color: #f8f8f8
    .price-label
      border-bottom: 1px solid #AFAFAF
      display: flex
      flex-direction: column
      padding-bottom: 10px
      >h4
        font-size: 2.25em
        color: #F48A42
        font-weight: bold
      >span
        color: #666
        font-size: 1.25em
        display: flex
        align-items: center
        margin-top: 10px
      >.label-box
        padding: 25px 0
        display: flex
        flex-wrap: wrap
        >.label-item
          height: 30px
          background: #DDF1FE
          display: flex
          align-items: center
          color: #1281FC
          font-size: 14px
          padding: 0 15px
          border-radius: 15px
          margin-right: 10px
          margin-bottom: 10px
    .house-info-details
      border-bottom: 1px solid #AFAFAF
      padding: 40px 0
      .label-info
        display: flex
        flex-wrap: wrap
        .label-house-label-item
          flex: 0 0 50%
          text-indent: 1.5em
          padding: 15px
          position: relative
          &:before
            content: ""
            height: 10px
            width: 10px
            border-radius: 50%
            background-color: #99AAB7
            display: flex
            position: absolute
            margin: 7px
          >.info-label
            color: #99AAB7
            font-size: 1.25em
          >.info-value
            font-size: 1.25em
            color: #444
            margin-left: 30px
    .information
      h3
        font-size: 22px
        color: #323232
        padding: 30px 0
      article
        padding: 0 30px
        color: #646464
        font-size: 1.25em
</style>
