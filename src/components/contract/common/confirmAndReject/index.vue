<template>
  <section class="btn-submit" v-if="isOldShow">
    <section class="Confirm">
      <el-button :type="confirmType" :loading="ConfirmLoading" class="btns" @click="_ConfirmChange" :disabled="isDisabled[0]">{{confirmTitle}}</el-button>
      <el-button :type="rejectType" class="btns" @click="_RejectChange" :disabled="isDisabled[1]" plain>{{rejectTitle}}</el-button>
    </section>
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
    confirmTitle: {
      default: 'Confirm',
      type: String
    },
    rejectTitle: {
      default: 'Reject',
      type: String
    },
    confirmType: {
      default: 'primary',
      type: String
    },
    rejectType: {
      default: 'primary',
      type: String
    },
    isDisabled: {
      default: () => [false, false],
      type: [Array, Object]
    }
  },
  methods: {
    _ConfirmChange () {
      this.$emit('confirmChange', true)
    },
    _RejectChange () {
      this.$emit('rejectChange', true)
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
  .btn-submit
    padding: 0 30px 30px 30px
    .Confirm
      width: 100%
      margin-top: 4.3125em
      display: flex
      justify-content: space-between
      .btns
        width: 25.8125em
        height: 3.75em
        /deep/ span
          font-size: 1.5625em
</style>
