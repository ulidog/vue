<template>
  <section class="body">
    <span @click="print" class="pointer"> <i class="el-icon-printer" ref="printMe"></i> Print</span>
    <section class="content">
      <vue-tranel v-if="type === 1 ? true : false" :params="params" :status="status"></vue-tranel>
      <vue-sft v-if="type === 2 ? true : false" :params="params" :status="status"></vue-sft>
      <vue-rent v-if="type === 3 ? true : false" :params="params" :status="status"></vue-rent>
    </section>
  </section>
</template>
<script>
import tranel from '@/components/offer/tranel.vue'
import sft from '@/components/offer/sft.vue'
import rent from '@/components/offer/rent.vue'

// import sft from '@/components/offer/sft.vue'
export default {
  components: {
    'vue-tranel': tranel,
    'vue-sft': sft,
    'vue-rent': rent
  },
  data () {
    return {
      params: {},
      type: 1,
      id: null,
      output: null,
      status: false
    }
  },
  beforeCreate () {
    // 关闭主组件 （Header）
    this.$emit('childToParentComponent', {
      showHeader: true,
      showFooter: true
    })
  },
  created () {
    try {
      this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
      this.type = this.params.type
      this.id = this.params.id
    } catch (err) {}
  },
  methods: {
    print () {
      this.status = true
    }
  }
}
</script>
<style lang="sass" scoped>
  .body
    position: relative
    background-color: #dadada
    .pointer
      position: fixed
      top: 1.5cm
      z-index: 9
      left: 50%
      margin-left: 8cm
      border: 1px solid #ddd
      cursor: pointer
      padding: 3px 10px
      color: #999
      border-radius: 3px
      background-color: #fff
    .content
      margin: 0 auto
      width: 21cm
      padding: 1cm 0
</style>
