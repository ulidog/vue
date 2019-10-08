<template>
  <section class="viewReason">
    <header class="reason_type" v-if="reasonTip !== null">
      <h3>{{reasonTip}}</h3>
    </header>
    <footer class="reason_msg" v-if="isShowTextarea">
      <el-input
        :disabled="dispabledInput"
        class="textarea-size"
        type="textarea"
        placeholder="You can explain the reasons for your refusal here."
        v-model="reasonFrom.reasonMsg">
      </el-input>
    </footer>
    <section class="remarsks" v-if="remarsks !== null">
      <span>{{ remarsks }}</span>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      reasonFrom: {
        reasonType: 0
      }
    }
  },
  props: {
    reasonTip: {
      default: 'The actual amount of payment doesn’t match with the agreed amount of payment',
      type: String
    },
    dispabledInput: {
      default: false,
      type: Boolean
    },
    remarsks: {
      default: null,
      type: String
    },
    inputContent: {
      default: null,
      type: String
    },
    isShowTextarea: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    reasonFrom: {
      handler (val, oldVal) {
        this.$emit('reasonFrom', this.reasonFrom)
      },
      deep: true
    },
    inputContent: {
      handler (val, oldVal) {
        this.reasonFrom.reasonMsg = val
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
</script>
<style lang="sass" scoped>
  .viewReason
    .reason_type
      margin: 47px 4em 130px
      h3
        color: #444
        font-size: 1.4375em
    .reason_msg
      margin: 20px 3.875em 140px
      .textarea-size
        height: 289px
        /deep/ textarea.el-textarea__inner
          height: 100%
          font-size: 19px
          background: rgba(243,244,245,1)
    .remarsks
      margin: 20px 3.875em
      span
        font-size: 19px
        color: #666
</style>
