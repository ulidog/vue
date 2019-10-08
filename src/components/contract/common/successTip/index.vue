<template>
  <el-row class="waitViews">
    <el-col :span="24" class="content">
      <header class="tip">
        <p>{{tip}}</p>
      </header>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    tip: {
      default: null,
      type: String
    }
  }
}
</script>
<style lang="sass" scoped>
  .waitViews
    .content
      background-color: #fff
      padding: 10px 3.875em 43px
      height: 730px
      min-height: 730px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .tip
        p
          font-size: 1.4375em
          color: #444
</style>
