<template>
  <section class="refuse">
    <header class="refuse_type">
      <el-radio-group v-model="refuseFrom.refuseType" class="radioSty" @change="selectRefuseChange">
        <el-radio :label="item.value" v-for="item in refuseTypeList" :key="item.value" class="radiotype">{{item.label}}</el-radio>
      </el-radio-group>
    </header>
    <footer class="refuse_msg">
      <el-input
        class="textarea-size"
        type="textarea"
        placeholder="You can explain the reasons for your refusal here."
        v-model="refuseFrom.refuseMsg">
      </el-input>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      refuseFrom: {
        refuseType: 0,
        refuseMsg: null
      }
    }
  },
  props: {
    refuseTypeList: {
      default: () => [],
      type: [Array, Object]
    }
  },
  watch: {
    refuseFrom: {
      handler (val, oldVal) {
        this.$emit('refuseFrom', this.refuseFrom)
      },
      deep: true
    }
  },
  methods: {
    selectRefuseChange (_val) {
      // console.log(_val)
      this.deepSerch(_val)
    },
    deepSerch (_val) {
      console.log(_val)
      const _this = this
      this.refuseTypeList.map(item => {
        if (item.value === _val) {
          _this.refuseFrom.refuseMsg = item.label
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .refuse
    .refuse_type
      .radioSty
        display: flex
        flex-direction: column
        .radiotype
          margin: 20px 3.875em
          display: flex
          align-items: center
          /deep/ .el-radio__input
            .el-radio__inner
              width: 24px
              height: 24px
              &:after
                width: 10px
                height: 10px
          /deep/ .el-radio__label
            font-size: 1.4735em
            padding-left: 20px
    .refuse_msg
      margin: 20px 3.875em 140px
      .textarea-size
        height: 289px
        /deep/ textarea.el-textarea__inner
          height: 100%
          font-size: 19px
          background: rgba(243,244,245,1)
</style>
