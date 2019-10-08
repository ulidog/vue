<template>
  <section class="check-email-container">
    <header>
      <img src="/static/img/other/logo.png" alt="logo">
    </header>
    <section>
      <img src="/static/img/other/success.png" alt="logo">
    </section>
    <footer>
      <article>Congratulations! You have successfully registered with Ebuyhouse. Start your journey by clicking here<span style="color: #1281fc;" @click="openSign">here</span></article>
      <!-- <span @click="openSign">here</span> -->
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      params: {}
    }
  },
  beforeCreate () {
    // 关闭主组件 （footer）
    this.$emit('childToParentComponent', { showFooter: true, showHeader: true })
  },
  created () {
    try {
      this.params = this.$route.query
    } catch (err) {
      console.log(err)
      this.$router.push({
        path: '/index'
      })
    }
  },
  methods: {
    openSign () {
      this.$router.push({
        path: '/index'
      })
      this.$store.commit('signOut', true)
    }
  },
  mounted () {
    if (this.params.emailStatus === 2) {
      this.$message.success('Congratulations, you have successfully registered the account.')
    }
  },
  destroyed () {
    // 打开主组件 （footer）
    this.$emit('childToParentComponent', { showFooter: false, showHeader: false })
  }
}
</script>
<style lang="sass" scoped>
  .check-email-container
    display: flex
    flex-direction: column
    width: 800px
    margin: 2cm auto
    header
      border-bottom: 1px solid #f3f4f5
      padding-bottom: 20px
    section
      min-height: 500px
      display: flex
      justify-content: center
      align-items: center
    footer
      article
        font-size: 20px
        font-weight: 400
        color: #444
      span
        margin-top: 20px
        display: inline-block
        font-size: 18px
        color: #666
        cursor: pointer
        &:hover
          color: #1281fc
</style>
