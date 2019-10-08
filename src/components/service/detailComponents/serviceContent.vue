<template>
  <section class="serviceContentComponent">
    <section class="flex-box">
      <section :class="['l-max-content', hiddenRightRecommentStatus ? 'is-action-right-hidden' : '']">
        <vue-service-desc-component :dowmCallMarge="dowmCallMarge"></vue-service-desc-component>
        <vue-company-profile-component :dowmCallMarge="dowmCallMarge"></vue-company-profile-component>
        <vue-customer-rating-component :dowmCallMarge="dowmCallMarge" @updataMaxOffsetTop="updataMaxOffsetTop"></vue-customer-rating-component>
      </section>
      <section class="r-min-component" v-if="!hiddenRightRecommentStatus">
        <vue-service-recommend-component :updataMaxOffsetTop="maxOffsetTop" @hiddenRightRecomment="hiddenRightRecomment" :dowmCallMarge="dowmCallMarge"></vue-service-recommend-component>
      </section>
    </section>
  </section>
</template>
<script>
import VueServiceDescComponent from '@/components/service/detailComponents/serviceDesc'
import VueCompanyProfileComponent from '@/components/service/detailComponents/companyProfile'
import VueCustomerRatingComponent from '@/components/service/detailComponents/customerRating'
import VueServiceRecommendComponent from '@/components/service/detailComponents/serviceRecommend'
export default {
  components: {
    'vue-service-desc-component': VueServiceDescComponent,
    'vue-company-profile-component': VueCompanyProfileComponent,
    'vue-customer-rating-component': VueCustomerRatingComponent,
    'vue-service-recommend-component': VueServiceRecommendComponent
  },
  data () {
    return {
      hiddenRightRecommentStatus: false,
      maxOffsetTop: null
    }
  },
  props: {
    dowmCallMarge: {
      default: () => {},
      type: Object
    }
  },
  methods: {
    hiddenRightRecomment (_info) {
      this.hiddenRightRecommentStatus = _info
    },
    updataMaxOffsetTop (_info) {
      this.maxOffsetTop = _info
    }
  }
}
</script>
<style lang="sass" scoped>
  @media screen and (min-width: 750px)
    .serviceContentComponent
      .flex-box
        .r-min-component
          width: 31.15%
  @media screen and (min-width: 320px) and (max-width: 750px)
    .serviceContentComponent
      .flex-box
        .r-min-component
          width: 0
          display: none
        .l-max-content
          /deep/>section
            margin-right: 0 !important

</style>

<style lang="sass" scoped>
  .serviceContentComponent
    display: flex
    width: 100%
    .flex-box
      display: flex
      width: 100%
      .l-max-content
        display: flex
        flex-direction: column
        flex: 1
      .is-action-right-hidden
        /deep/>section
          margin-right: 0 !important
      .r-min-component
        transition: all .5s ease
</style>
