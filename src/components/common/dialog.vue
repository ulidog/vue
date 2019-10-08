<template>
  <section class="dialog-component">
    <section class="content-container">
      <vue-handover-form-component
        title="提交移交表"
        viceTitle="副标题"
        >
      </vue-handover-form-component>
    </section>
  </section>
</template>
<script>
import handoverFormComponent from '@/components/process/handoverForm'
export default {
  components: {
    'vue-handover-form-component': handoverFormComponent
  },
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
  .dialog-component
    display: flex
    position: fixed
    top: 0
    left: 0
    z-index: 999
    width: 100vw
    height: 100vh
    background-color: rgba(0, 0, 0, .5)
    justify-content: center
    align-items: center
    .content-container
      max-width: 1200px
      max-height: 800px
      overflow-y: scroll
      background-color: #fff
      width: 1200px
</style>
