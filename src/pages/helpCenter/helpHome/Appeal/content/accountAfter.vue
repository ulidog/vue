<template>
  <div class="content-container">
    <div class="headerInfo">
      <article class="bgContent">
        <img src="/static/img/contract/icons/successStatus.png" alt="successStatus.png">
        <span>We will deal with as soon as possible, please pay attention to email.</span>
      </article>
    </div>
    <div class="content-table">
      <table border="0">
        <caption class="tableHeader">Account Support</caption>
        <tbody>
          <tr class="tabContent">
            <td width="20%">Email</td>
            <td width="80%">{{appealForm.contactEmail}}</td>
          </tr>
          <tr class="tabContent">
            <td width="20%">My Account Type</td>
            <td width="80%">{{appealForm.appealAccount}}</td>
          </tr>
          <tr class="tabContent">
            <td width="20%">Message</td>
            <td width="80%">{{appealForm.appealReason}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      appealForm: {}
    }
  },
  created () {
    if (this.$route.params.contactEmail) {
      this.appealForm = this.$route.params
    } else {
      this.$router.push({name: 'account-complaint'})
    }
  }
}
</script>
<style lang="sass" scoped>
  .content-container
    display: flex
    flex-direction: column
    .headerInfo
      .bgContent
        display: inline-block
        margin: 20px 2.5em
        background-color: #F3F4F5
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 230px
        border-radius: 5px
        span
          font-size: 1.5em
          color: #444
          margin-top: 20px
    .content-table
      margin: 50px 0
      .tableHeader
        font-size: 1.875em
        font-weight: bold
        color: #444
        height: 100px
        line-height: 100px
      .tabContent
        height: 60px
        td
          font-size: 1.25em
          color: #444
</style>
