<template>
  <el-row class="QAConsultationViews">
    <el-col :span="24">
      <QA-about-header></QA-about-header>
    </el-col>
  </el-row>
</template>
<script>
import AboutHeader from '@/components/QAConsultation/AboutHeader'
export default {
  components: {
    'QA-about-header': AboutHeader
  },
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>

</style>
