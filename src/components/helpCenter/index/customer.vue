<template>
  <section class="customerIndexContentComponent">
    <section class="content-bg-imgs">
      <h3 class="titles">Customer Support</h3>
      <section class="box-list">
        <ul class="box">
          <li class="list-item">
            <span class="arc"></span>
            <router-link to="/help-center/help-home/appeal/account-support">Account Support</router-link>
          </li>
          <li class="list-item">
            <span class="arc"></span>
            <router-link to="/help-center/help-home/appeal/property-support">Property Support</router-link>
          </li>
          <li class="list-item">
            <span class="arc"></span>
            <router-link to="/sft/contactus">Contact Us</router-link>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
  .customerIndexContentComponent
    flex: 0 0 48%
    background-color: #fff
    padding: 60px 20px 20px 60px
    transition: all .3s ease
    &:hover
      box-shadow: 10px 10px 20px -5px #ddd
      // .titles
      //   color: #1281fc
    .content-bg-imgs
      background-image: url('/static/img/helpCenter/Customerservice_pho.png')
      background-position: bottom right
      background-repeat: no-repeat
      background-size: 35%
      .titles
        font-size: 2.5rem
        font-weight: 400
        transition: all .3s ease
        cursor: default
      .box-list
        padding: 60px 0
        .box
          .list-item
            height: 30px
            line-height: 30px
            .arc
              height: 10px
              width: 10px
              background-color: #646464
              display: inline-block
              border-radius: 50%
              margin-right: 10px
            a
              color: #323232
              transition: all .3s ease
              font-size: 18px
              &:hover
                color: #1281fc
</style>
