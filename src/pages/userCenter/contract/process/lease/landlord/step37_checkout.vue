<template>
  <el-row class="step24_checkout">
    <el-col :span="24">
      <landlord-success-tip :tip="content.tip"></landlord-success-tip>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'
import successTip from '@/components/contract/common/successTip'
export default {
  components: {
    'landlord-success-tip': successTip
  },
  data () {
    return {
      content: {
        tip: `You have confirmed  reposs the leased property when the contrat expire, waiting for the tenant to vacate the home. `
      }
    }
  },
  mounted () {
    this.updateStatus(5)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    })
  }
}
</script>
<style lang="sass" scoped>
  .step24_checkout
    background-color: #fff
</style>
