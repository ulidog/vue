<template>
  <section class="leftToolsComponent">
    <section class="toolsList">
      <section class="viewDirection" v-show="isShowDirection" @click="handlerDirection">
        <span>User Guide</span>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    isShowDirection: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    handlerDirection () {
      this.$emit('handlerDirection', false)
    }
  }
}
</script>
<style lang="sass" scoped>
  .leftToolsComponent
    position: fixed
    left: 0
    top: 0
    z-index: 999
    top: 50%
    // transform: rotate(-90deg) translateY(-80%) translateX(-53%)
    .toolsList
      // height: 40px
      .viewDirection
        // height: 100%
        padding: 15px 0
        margin-top: 25px
        width: 40px
        background-color: #1281fc
        display: flex
        align-items: center
        justify-content: center
        color: #fff
        font-size: 15px
        border-radius: 3px
        transform: translateX(-5%)
        cursor: pointer
        span
          writing-mode: vertical-rl
          transform: rotate(180deg)
        &:hover
          box-shadow: 0 0 35px 2px rgba(0,0,0,.24)
          transform: translateX(0)
</style>
