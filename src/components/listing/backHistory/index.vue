<template>
  <section class="backHistory" @click.stop="goBackHistoryRoute">
    <i class="el-icon-back"></i>
    <span>{{historyParams.title}}</span>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    historyParams: {
      title: {
        default: null,
        type: String
      },
      isBack: {
        default: true,
        type: Boolean
      },
      link: {
        default: null,
        type: String
      }
    }
  },
  methods: {
    goBackHistoryRoute () {
      if (this.historyParams.isBack) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.historyParams.link)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .backHistory
    cursor: pointer
    display: inline-block
    span
      color: #666
      font-size: 1em
      margin: 40px 0
</style>
