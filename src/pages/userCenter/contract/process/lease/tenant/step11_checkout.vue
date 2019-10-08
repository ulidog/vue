<template>
  <tenant-wait :tip="content.tip" :noteMSG="content.noteMSG" :isNoteMsg="content.isNoteMsg" :isWaitImg="content.isWaitImg"></tenant-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import { getStateLineStore } from '@/utils'
import wait from '@/components/contract/common/wait'
export default {
  components: {
    'tenant-wait': wait
  },
  data () {
    return {
      content: {
        tip: `You have applied for Early Rental Termination, waiting for the landlord's confirmation`,
        noteMSG: ` Note: The security deposit may be refunded minus any fees for damages and unpaid rent.`,
        isNoteMsg: true,
        isWaitImg: false
      }
    }
  },
  mounted () {
    this.params = JSON.parse(this.$base64.decode(this.$route.query.ebuyhouse))
    this.updateStatus(getStateLineStore(0, this.params.state))
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    })
  }
}
</script>
