<template>
  <section class="map">
    <vue-googlemap :center="centers" :zoom="zoom" @initMap="initMap">
      <vue-googlemap-marker
        draggable
        :position='marKerCenters'
        :icon='localIcon'
        :events='events'
        @markDragend="markDragend">
      </vue-googlemap-marker>
    </vue-googlemap>
  </section>
</template>
<script>
import Vue from 'vue'
import vueGooglemap from 'vue2-customer-googlemap'
Vue.use(vueGooglemap)
vueGooglemap.initGooglemap({
  // key: 'AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs',
  key: 'AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs',
  language: 'en',
  v: '3'
})
export default {
  data () {
    return {
      controls: {},
      events: {
        click (o) {
          console.log(o.latLng.lat())
        }
      },
      localIcon: '/static/img/release/local.png',
      centers: {lat: 0, lng: 0},
      Map: null,
      maxLoading: 2000,
      loadingNum: 0
    }
  },
  props: {
    center: {
      default: () => {
        return {
          lat: 0,
          lng: 0
        }
      },
      type: Object
    },
    zoom: {
      default: () => {},
      type: Number
    }
  },
  watch: {
    center: {
      handler (_new, _old) {
        console.log('进入组件')
        console.log(_new)
        this.marKerCenters = {lat: Number(_new.lat), lng: Number(_new.lng)}
        this.$emit('MarkerCenter', this.marKerCenters)
        this.timerOutMapCenter()
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initMap (map) {
      this.Map = map
    },
    timerOutMapCenter () {
      const _this = this
      // console.log('12')
      if (this.Map) {
        this.Map.setCenter(this.marKerCenters)
      } else {
        if (this.loadingNum < this.maxLoading) {
          this.loadingNum++
          setTimeout(() => {
            _this.timerOutMapCenter()
          }, 500)
        }
      }
    },
    // 拖拽mark
    markDragend (_e, _this, e) {
      // console.log(_e, _this, e)
      this.marKerCenters = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.$emit('MarkerCenter', this.marKerCenters)
    }
  }
}
</script>
<style lang="sass" scoped>
  .map
    height: 100%
</style>
