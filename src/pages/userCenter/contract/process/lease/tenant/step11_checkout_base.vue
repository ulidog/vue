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
        tip: `Waiting for the landlord to check the integrity of the house.`,
        noteMSG: null,
        isNoteMsg: false,
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
