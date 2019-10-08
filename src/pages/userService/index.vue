<template>
  <section class='wrapper'>
    <p class="pageMark">Home > Upload Service</p>
    <div class="content">
      <upload-service></upload-service>
    </div>
  </section>
</template>
<script>
import uploadService from '@/components/uploadService/uploadservice/index.vue'
export default {
  name: 'user-center-service',
  data () {
    return {
    }
  },
  components: {
    'upload-service': uploadService
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    padding: 6rem 0 4rem;
    background: #f3f4f5;
    .pageMark{
      font-size: 1rem;
      color: #666;
      margin-bottom: 1.75rem;
    }
    .content{
      background: #fff;
    }
  }
  @media screen and (min-width: 1300px) {
    .wrapper {
      padding-left: 18%;
      padding-right: 18%;
    }
  }
</style>
