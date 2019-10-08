<template>
  <section class="rightComponentsViews">
    <section class="popularInformationComponent">
      <right-popular-information></right-popular-information>
    </section>
    <section class="InformationCategoryComponent">
      <right-information-category></right-information-category>
    </section>
    <section class="visitorsRecordComponent">
      <!-- <right-visitors-record></right-visitors-record> -->
    </section>
    <section class="utilsPannelComponent" v-for="item in utilsConfig" :key="item.id" v-if="token">
      <right-utils-pannel-cord :title="item.title" :requstUrl="item.requstUrl"></right-utils-pannel-cord>
    </section>
    <section class="pastReviewComponent">
      <!-- <right-past-review></right-past-review> -->
    </section>
    <section class="moreServiceComponent">
      <!-- <right-more-service></right-more-service> -->
    </section>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import popularInformation from '@/components/consultation/rightComponents/popularInformation'
import informationCategory from '@/components/consultation/rightComponents/informationCategory'
import visitorsRecord from '@/components/consultation/rightComponents/visitorsRecord'
import utilsPannelCord from '@/components/consultation/rightComponents/utilsPannel'
// import pastReview from '@/components/consultation/rightComponents/pastReview'
// import moreService from '@/components/consultation/rightComponents/moreService'
export default {
  components: {
    'right-popular-information': popularInformation,
    'right-information-category': informationCategory,
    'right-visitors-record': visitorsRecord,
    'right-utils-pannel-cord': utilsPannelCord
    // 'right-past-review': pastReview,
    // 'right-more-service': moreService
  },
  data () {
    return {
      utilsConfig: [
        {
          id: 0,
          title: `<i class="iconfont icon-information_like"></i><span>Likes</span>`,
          requstUrl: `${this.ljj_path}news/zan-list/mine`
        },
        {
          id: 1,
          title: `<i class="iconfont icon-information_history"></i><span>Read</span>`,
          requstUrl: `${this.ljj_path}news/view-list/mine`
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  }
}
</script>
<style lang="sass" scoped>
  .rightComponentsViews
    display: flex
    flex-direction: column
    width: 100%
    .popularInformationComponent,.visitorsRecordComponent
      width: 100%
    .InformationCategoryComponent,.pastReviewComponent,.moreServiceComponent,.utilsPannelComponent
      margin-top: 20px
      width: 100%
</style>
