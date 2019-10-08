<template>
  <section class="voicemap">
    <section class="Map">
      <header>
        <h3>Map</h3>
      </header>
      <section class="map-component">
        <google-map :center="mapInfo.mapCenter" :zoom="mapInfo.mapZoom" :marsks="mapInfo.mapMarsks"></google-map>
      </section>
    </section>
  </section>
</template>
<script>
import googleMap from '@/components/listing/googleMap'
export default {
  components: {
    'google-map': googleMap
  },
  data () {
    return {
      params: {
        remark: null
      },
      mapInfo: {
        mapCenter: {
          lat: 0,
          lng: 0
        },
        mapZoom: 16,
        mapMarsks: {
          isShow: false,
          number: 1,
          marsksList: [
            {
              id: 0,
              position: {
                lat: 0,
                lng: 0
              }
            }
          ]
        }
      }
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
      this.formatData(Object.assign({}, val))
      this.params = Object.assign({}, val)
      this.$forceUpdate()
    }
  },
  methods: {
    formatData (_info) {
      this.mapInfo.mapCenter.lat = _info.latitude
      this.mapInfo.mapCenter.lng = _info.longitude
      this.mapInfo.mapMarsks.marsksList[0].position.lat = _info.latitude
      this.mapInfo.mapMarsks.marsksList[0].position.lng = _info.longitude
      this.mapInfo.mapMarsks.isShow = true
    }
  }
}
</script>
<style lang="sass" scoped>
  .voicemap
    .Map
      padding-top: 2.625em
      padding-right: 43px
      header
        height: 2.125em
        font-size: 1.5em
        font-weight: bold
        display: flex
        align-items: center
        h3
          color: #444444
          font-weight: bold
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
            height: 2.4375em
            display: flex
            justify-content: flex-start
            align-items: center
            label
              font-size: 1.125em
              color: #999999
              width: 10.9375em
            .chiild-value
              display: flex
              flex-wrap: wrap
              width: calc( 100% - 10.9375em )
              align-items: center
              .child-items
                flex: 0 0 calc( 100% / 3 )
                height: 2.4375em
                align-items: center
                display: flex
                i
                  width: 1.25em
                  height: 1.25em
                  border-radius: 2px
                  background-color: #99aab7
                span
                  color: #666666
                  font-size: 1.125em
                  margin-left: 1.25em
      .map-component
        height: 27.1875em
</style>
