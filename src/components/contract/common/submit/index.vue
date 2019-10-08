<template>
  <section class="Confirm" v-if="isOldShow">
    <el-button type="primary" :loading="ConfirmLoading" class="btns" @click="_ConfirmChange">{{submitTitle}}</el-button>
  </section>
</template>
<script>
export default {
  data () {
    return {
      params: {},
      isOldShow: true
    }
  },
  props: {
    ConfirmLoading: {
      default: false,
      type: Boolean
    },
    submitTitle: {
      default: 'Submit',
      type: String
    }
  },
  methods: {
    _ConfirmChange () {
      this.$emit('ConfirmChange')
    }
  },
  created () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    if (this.params.oldState) {
      this.isOldShow = false
    }
  }
}
</script>
<style lang="sass" scoped>
  .Confirm
    width: 100%
    margin-top: 4.3125em
    display: flex
    justify-content: center
    .btns
      width: 34.6875em
      height: 3.75em
      /deep/ span
        font-size: 1.5625em
</style>
