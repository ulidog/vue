<template>
  <section v-if="isShow" :class="['tipComponent', inScreen ? 'active' : '', moveRight ? 'moveRight' : '']">
    <section :class="['tipBox', outScreen ? 'active' :'afterIn']">
      <section class="Body">
        <img src="/static/img/index/tip_body.png" alt="body">
      </section>
      <section class="tools">
        <img class="toolsPropeller" src="/static/img/index/tip_propeller.png" alt="propeller">
        <img class="toolsTailFan" src="/static/img/index/tip_TailFan.png" alt="TailFan">
        <img @click="closeTip" class="toolsClose" src="/static/img/index/tip_close.png" alt="TipColse">
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      inScreen: false,
      outScreen: false,
      isShow: true,
      moveRight: false
    }
  },
  methods: {
    closeTip () {
      const _this = this
      this.outScreen = true
      setTimeout(() => {
        _this.isShow = false
      }, 2000)
    },
    handlerScrollTip () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 60) {
        this.moveRight = true
      } else {
        this.moveRight = false
      }
    }
  },
  mounted () {
    const _this = this
    setTimeout(() => {
      _this.inScreen = true
    }, 1000)
    window.addEventListener('scroll', this.handlerScrollTip)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handlerScrollTip)
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (max-width: 1300px)
    .tipComponent
      transform: perspective(800px) scale(.5)
      &.active
        top: 20%
        left: 5%
  @media screen and (min-width: 1300px)
    .tipComponent
      transform: perspective(800px) scale(.8)
      &.active
        top: 20%
        left: 8%
  @media screen and (min-width: 1515px)
    .tipComponent
      transform: perspective(800px) scale(1)
      &.active
        top: 20%
        left: 10%
</style>
<style lang="sass" scoped>
  @keyframes toolsPropeller
    from
      transform: rotate3d(1,1,1,0deg)
    to
      transform: rotate3d(0,0.5,0.2,720deg)
  @keyframes toolsTailFan
    from
      transform: rotateZ(0deg)
    to
      transform: rotateZ(360deg)
  .tipComponent
    position: fixed
    top: -50%
    left: -20%
    z-index: 9
    transition: all 2s
    &.moveRight
      left: 15%
    .tipBox
      position: relative
      transform: perspective(800px)
      transition: all 2s
      &.afterIn
        transform: perspective(800px)
        .tools
          .toolsPropeller
            // transform: rotateY(50deg)
            transition: all 2s
            animation: toolsPropeller 0.5s linear infinite
          .toolsTailFan
            // transform: rotateY(50deg)
            transition: all 2s
            animation: toolsTailFan 0.5s linear infinite
      &.active
        transform: perspective(800px) rotate3d(0.1, 0.5, 0.8, 30deg) translate3d(10px, -600px, 600px)
        .tools
          .toolsPropeller
            // transform: rotateY(50deg)
            transition: all 2s
            animation: toolsPropeller 0.5s linear infinite
          .toolsTailFan
            // transform: rotateY(50deg)
            transition: all 2s
            animation: toolsTailFan 0.5s linear infinite
      .tools
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        .toolsPropeller
          position: absolute
          top: 3px
          left: 75px
          z-index: 1
        .toolsTailFan
          position: absolute
          top: 38px
          left: 15px
        .toolsClose
          position: absolute
          bottom: -65px
          left: 50%
          transform: translateX(-50%)
          cursor: pointer
</style>
