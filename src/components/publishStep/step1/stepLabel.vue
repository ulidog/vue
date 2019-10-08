<template>
  <div class="part-container">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item>
          <img src="/static/pubImgs/step1.png" alt="">
          <img src="/static/pubImgs/step2.png" alt="">
          <img src="/static/pubImgs/step3.png" alt="">
          <img src="/static/pubImgs/step4.png" alt="">
          <img src="/static/pubImgs/step5.png" alt="">
          <img src="/static/pubImgs/step6.png" alt="">
          <img src="/static/pubImgs/step7.png" alt="">
          <img src="/static/pubImgs/step8.png" alt="">
          <img src="/static/pubImgs/step9.png" alt="">
          <img src="/static/pubImgs/step10.png" alt="">
          <img src="/static/pubImgs/step11.png" alt="">
          <img src="/static/pubImgs/step12.png" alt="">
          <img src="/static/pubImgs/step13.png" alt="">
          <img src="/static/pubImgs/step14.png" alt="">
          <img src="/static/pubImgs/step15.png" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

export default {
  data () {
    return {}
  },
  components: {
  },
  props: {
  },
  methods: {
  }
}

<style scoped>
  .el-carousel__item img {
    width: 100%;
  }
</style>
