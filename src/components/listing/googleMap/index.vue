<template>
  <section class="map" v-loading="!marsks.isShow">
    <vue-googlemap :center="center" :zoom="zoom" v-if="marsks.isShow">
      <vue-googlemap-marker
        v-if="marsks.isShow"
        v-for="item in marsks.marsksList"
        :key="item.id"
        :position='item.position'
        :icon='localIcon'
        :events='events'>
      </vue-googlemap-marker>
    </vue-googlemap>
  </section>
</template>
<script>
import Vue from 'vue'
import vueGooglemap from 'vue2-customer-googlemap'
Vue.use(vueGooglemap)
vueGooglemap.initGooglemap({
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
      localIcon: '/static/img/release/local.png'
    }
  },
  props: {
    center: {
      default: () => {},
      type: Object
    },
    zoom: {
      default: () => {},
      type: Number
    },
    marsks: {
      default: () => {
        return {isShow: false}
      },
      type: Object
    }
  },
  watch: {
    center: {
      handler (_new, _old) {
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    },
    marsks: {
      handler (_new, _old) {
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="sass" scoped>
  .map
    height: 100%
</style>
