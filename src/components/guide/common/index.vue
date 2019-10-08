<template>
  <section class="commonComponent">
    <common-search-component></common-search-component>
    <common-recent-posts-component></common-recent-posts-component>
    <common-categories-component v-if="!searchParams.isSearch"></common-categories-component>
    <common-recommend-component v-if="!searchParams.isSearch"></common-recommend-component>
  </section>
</template>
<script>
import commonSearchComponent from './search'
import recentPostsComponent from './recentposts'
import categoriesComponent from './categories'
import recommendComponent from './recommend'
import { mapGetters } from 'vuex'
export default {
  components: {
    'common-search-component': commonSearchComponent,
    'common-recent-posts-component': recentPostsComponent,
    'common-categories-component': categoriesComponent,
    'common-recommend-component': recommendComponent
  },
  data () {
    return {
      searchParams: {}
    }
  },
  watch: {
    guidePublic: {
      handler (_new, _old) {
        console.log(_new)
        if (Object.keys(_new).length !== 0) {
          this.formData(_new)
        } else {
          console.log('参数未更改,不做查询处理')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    formData (_info) {
      this.searchParams = Object.assign({}, _info)
    }
  },
  computed: {
    ...mapGetters({
      guidePublic: 'guidePublic'
    })
  }
}
</script>
<style lang="sass" scoped>
  .commonComponent
    display: flex
    flex-direction: column
</style>
