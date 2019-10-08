<template>
  <section class="helpIndexBg">
    <section class="helpIndexContentComponent">
      <user-guide-component></user-guide-component>
      <section class="bottomComponents">
        <customer-component></customer-component>
        <calculators-component></calculators-component>
      </section>
    </section>
  </section>
</template>
<script>
import userguideIndexContentComponent from './userguide'
import customerIndexContentComponent from './customer'
import calculatorsIndexContentComponent from './calculators'
export default {
  components: {
    'user-guide-component': userguideIndexContentComponent,
    'customer-component': customerIndexContentComponent,
    'calculators-component': calculatorsIndexContentComponent
  },
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
.helpIndexBg
  background-color: #F3F4F5
  .helpIndexContentComponent
    max-width: 1330px
    padding: 60px 0 100px
    margin: 0 auto
    display: flex
    flex-direction: column
    .bottomComponents
      display: flex
      justify-content: space-between
      margin-top: 30px
</style>
