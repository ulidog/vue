<template>
  <section class="serviceProviderComponent">
    <section class="temp-a">
      <header class="tools-header">
        <h3>Service Provider Agreement</h3>
        <img class="close" src="/static/img/common/account/close.png" alt="close" @click="closeWindowInfo">
      </header>
      <section class="content">
        <p>To clearly define the rights and obligations of our partners, and better protect the interests of the platforms (Ebuyhouse) users, all service providers will be required to enact the following:</p>
        <p>1. Guarantee legitimacy of published services, as well as bearing responsibility for services provided, including, but not limited to, intellectual property rights, quality of service, and legal risk.</p>
        <p>2, Provider needs to supply relevant photos, business description, and services provided. Uploaded content must not violate any applicable laws, regulations or rules.
        <p>3. Submitting services that deceive or mislead platform users is strictly forbidden.</p>
        <p>4. Ebuyhouse has the right to delete unreasonable services that are submitted.</p>
        <p>5. The services issued by providers shall not damage the interests of users, or consumer rights of users. Responsibility shall be given to provider for any damages caused.</p>
        <p>6. Any use of this website that is in violation of state applicable laws may result in termination or suspension.</p>
        <p>7. We respect the intellectual property rights of others. If you believe that this website or any material provided through this website infringes any copyright that you own or control, please notify us immediately</p>
        <p>8. This platform may, at its sole discretion, terminate use, or delete content posted by providers at any time without notice.</p>
        <p>9. If termination or suspension occurs for any reason, provider will be prohibited from registering a new account with provider’s name, pseudonym or borrowed name or any third party, even if you may act on behalf of a third party. In addition to terminating or suspending providers account, Ebuyhouse reserves the right to take appropriate legal action, including, but not limited to, seeking civil, criminal, and injunctive damages.</p>

        <h4>Contact Ebuyhouse</h4>
        <p>To submit any ongoing issues or to learn about Ebuyhouse and its usage, please contact us with the given information below</p>

        <h4>Ebuyhouse</h4>
        <p>5430 W. Sahara Ave</p>
        <p>Las Vegas, Nevada, 89146</p>
        <p>United States</p>

        <h4>Phone</h4>
        <p>Tel: (702) 918-3883</p>

        <h4>Email</h4>
        <p>Customersupport@ebuyhouse.com</p>

        <button @click="openUploadService">Agree</button>
      </section>
      <!-- <img src="/static/img/common/account/checkEmailTip.png" alt="checkEmailTip"> -->
    </section>
  </section>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  // computed: {
  //   ...mapGetters({
  //     windowGlobalInfo: 'windowGlobalInfo'
  //   })
  // },
  methods: {
    ...mapMutations({
      serviceProviderFn: 'UPDATA_SERVICE_PROVIDER_FN'
    }),
    closeWindowInfo () {
      this.serviceProviderFn(false)
    },
    openUploadService () {
      this.$router.push({
        name: 'upload-user-service'
      })
      this.closeWindowInfo()
    }
  }
  // created () {
  // const _this = this
  // setTimeout(() => {
  //   _this.closeWindowInfo()
  // }, 5000)
  // }
}
</script>
<style lang="sass" scoped>
  .serviceProviderComponent
    width: 100%
    min-width: 1280px
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 999
    background-color: rgba(0, 0, 0, 0.8)
    display: flex
    justify-content: center
    align-items: center
    .temp-a
      background-color: #fff
      border-radius: 5px
      position: relative
      max-width: 800px
      max-height: 600px
      display: flex
      flex-direction: column
      .close
        position: absolute
        top: -40px
        right: -40px
        cursor: pointer
      .tools-header
        flex: 0 0 80px
        height: 80px
        display: flex
        align-items: center
        justify-content: center
        h3
          display: flex
          justify-content: center
          color: #1281FC
          font-size: 30px
      .content
        flex: 1
        overflow-y: scroll
        padding: 0 40px
        p
          font-size: 18px
          color: #666666
          line-height: 30px
          margin-bottom: 15px
        h4
          font-size: 20px
          font-weight: 600
          color: #444
        button
          background-color: #1281FC
          font-size: 24px
          color: #fff
          width: 254px
          height: 50px
          border-radius: 5px
          outline: none
          display: flex
          justify-content: center
          align-items: center
          margin: 10px auto 40px
</style>
