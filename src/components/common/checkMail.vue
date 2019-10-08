<template>
  <section class="checkMail">
    <section class="temp-a">
      <img class="close" src="/static/img/common/account/close.png" alt="close" @click="closeWindowInfo">
      <img src="/static/img/common/account/checkEmailTip.png" alt="checkEmailTip">
    </section>
  </section>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      windowGlobalInfo: 'windowGlobalInfo'
    })
  },
  methods: {
    ...mapMutations({
      checkEmailDialogState: 'checkEmailDialogState'
    }),
    closeWindowInfo () {
      this.checkEmailDialogState(false)
    }
  },
  created () {
    const _this = this
    setTimeout(() => {
      _this.closeWindowInfo()
    }, 5000)
  }
}
</script>
<style lang="sass" scoped>
  .checkMail
    width: 100%
    min-width: 1280px
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 999
    background-color: rgba(0, 0, 0, 0.8)
    display: flex
    justify-content: center
    align-items: center
    .temp-a
      background-color: transparent
      border-radius: 5px
      position: relative
      .close
        position: absolute
        top: -40px
        right: -40px
        cursor: pointer

</style>
