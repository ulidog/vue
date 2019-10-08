<style lang="scss" scoped>
.part-container {
  position: relative;
  .positionfilex {
    position: absolute;
    top: -30px;
    padding: 0 3.125em;
    font-size: 16px;
    margin: 0 16px;
    /deep/ .el-radio__label {
      font-size: 1.25em;
      color: #323232;
    }
  }
}
</style>

<template>
  <div class="part-container">
    <el-radio-group v-model="offerType" @change="changeType" class="positionfilex">
      <el-radio :label="'sale'">Sale</el-radio>
      <el-radio :label="'rental'">Rental</el-radio>
    </el-radio-group>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'offerType': ''
    }
  },
  'methods': {
    changeType (_type) {
      this.$router.push({'path': `/userCenter/message/offer/${this.offerType}`})
    }
  },
  mounted () {
    this.offerType = this.$route.fullPath.split('/').pop()
  }
}
</script>
