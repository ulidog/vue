<template>
  <div class="step-carousel" v-if="isShowStep">
    <el-carousel class="stepFirst"
      indicator-position="none"
      :height="`${windowHeight}px`"
      :autoplay='false'
      ref="stepCarousel">
      <el-carousel-item v-for="(item, index) in stepModule" :key="index" :initial-index="stepIndex">
        <img v-lazy="item.img" :alt="item.alt" width="100%" height="100%" :key="Math.random() * 10000">
        <utils-step-card @goNextItem="goNextItem" @goCloseItem="goCloseItem" :stepCard="item.stepCard"></utils-step-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import stepCard from '@/components/step/stepCard'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  props: {
    stepIndex: {
      type: Number,
      default: 1
    },
    stepModule: {
      type: Array,
      default () {
        return [
          {
            position: '10 10',
            img: '/static/img/step/step_rent/step1.jpg',
            stepCard: {
              title: 'Step 1',
              detail: 'Send an offer to the landlord'
            }
          }
        ]
      }
    }
  },
  components: {
    'utils-step-card': stepCard
  },
  computed: {
    ...mapGetters({
      isShowStep: 'isShowStep'
    }),
    // 自适应高
    windowHeight () {
      return window.innerHeight
    }
  },
  methods: {
    ...mapMutations({
      closeSteps: 'closeStep'
    }),
    // 下一张
    goNextItem () {
      this.$refs.stepCarousel.next()
    },
    // 关闭
    goCloseItem () {
      this.closeSteps()
    }
  }
}
</script>

<style>
.step-carousel {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  z-index: 10000000000;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}
</style>
