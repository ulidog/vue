<template>
  <section class="signature-file-container">
    <section class="no-file" v-if="!isSignature">
      <img src="/static/img/userCenter/tips.png" alt="tips">
      <article>You have not set your signature files, <br>please set one in personal center at Ebuyhouse through mobile.</article>
    </section>
    <section class="your-signature" v-else>
      <header>
        <img style="width: 100%;" :src="picUrl" alt="my">
      </header>
      <footer>
        <article>If you want to change your signature file, you can set it up in the personal center at Ebuyhouse through mobile.</article>
      </footer>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      isSignature: false,
      picUrl: null
    }
  },
  methods: {
    fetchSignatureFile () {
      const _this = this
      _this.$axios.get(`${this.wxl_path}user/mySignature`)
        .then(res => {
          if (res.data.success) {
            this.isSignature = res.data.data.status === 2
            this.picUrl = res.data.data.signature
          }
        })
    }
  },
  created () {
    this.fetchSignatureFile()
  }
}
</script>
<style lang="sass" scoped>
  .signature-file-container
    margin-left: 20px
    background-color: #fff
    display: flex
    flex-direction: column
    width: 100%
    min-height: 900px
    align-items: center
    justify-content: center
    .no-file
      width: 60%
      display: flex
      justify-content: center
      flex-direction: column
      align-items: center
      img
        width: 82px
        height: 82px
      article
        margin: 50px 0 0 0
        font-size: 1.125em
        color: #444
        line-height: 30px
        text-align: center
    .your-signature
      width: 100%
      min-height: 900px
      padding: 70px 60px
      header
        height: 350px
        overflow: hidden
        width: 100%
        display: flex
        align-items: center
        justify-content: center
        background-color: #F3F4F5
      footer
        article
          padding: 20px
          color: #444
          font-size: 1.5em
          line-height: 30px
</style>
