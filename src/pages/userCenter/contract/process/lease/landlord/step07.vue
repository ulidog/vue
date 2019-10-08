<template>
  <landlord-wait :tip="`The Move In Checklist has been uploaded successfully, waiting for the tenant's confirmation.`"></landlord-wait>
</template>
<script>
import { mapMutations } from 'vuex'
import wait from '@/components/contract/common/wait'
export default {
  components: {
    'landlord-wait': wait
  },
  data () {
    return {
    }
  },
  mounted () {
    this.updateStatus(3)
  },
  methods: {
    ...mapMutations({
      updateStatus: 'UPDATE_MAJORSTATUS'
    })
  }
}
</script>
