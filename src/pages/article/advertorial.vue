<template>
  <section class="AdvertorialPage">
    <header class="header-top">
      <img class="max-size" src="/static/img/article/advertorial/office.jpg" alt="office">
      <div class="min-size">
        <img src="/static/img/article/advertorial/office.jpg" alt="office">
      </div>
    </header>
    <section class="content">
      <h4 class="tx-h4">List your home for sale with Ebuyhouse.com and save 6%.</h4>
      <p class="tx-p">Ebuyhouse allows you to buy, sell, or rent a home online for free . We connect buyers & sellers directly and facilitate the entire selling process. You can make an offer, accept, negotiate & sign contracts all on Ebuyhouse . Our process protects all parties & ensures that each real estate transaction is fair & legal.</p>

      <p class="tx-p">Just log onto Ebuyhouse.com, create an account and list your home. Our system will walk you through the entire process, step by step.</p>

      <p class="tx-p">Our Trusted service providers are nearby & ready to help with any issues that arise during the home selling process.</p>

      <p class="tx-p">Here at Ebuyhouse we want you, the American public to be able to get maximum value for your home & not pay out high commissions & fees for something you could easily do yourself.</p>

      <p class="tx-p">Before you list your home anywhere else, think about this. The average home in America during 2018 sold for $220,000, an Ebuyhouse user would have saved themselves $13,200 . Real Estate is daunting, time consuming & sometimes intimidating, that’s why we have a knowledge base on our site aimed at guiding you through the process .  </p>

      <p class="tx-p">Starting at what photos to list to get the most attention from potential buyers, to connecting with a local lender & finding a mover, Ebuyhouse is your one stop Real Estate Shop.</p>

      <p class="tx-p">Our Innovative S.F.T, Trial Living Transaction method allows sellers to receive rent without brokerage fees, potential buyers can try a property for 90 days without the cost increasing, with no risk & no commission. </p>

      <h3 class="tx-h3">Faster, Safer Real Estate Trading. </h3>
      <p class="tx-p">Learn more, save more with Ebuyhouse.com</p>
    </section>
    <footer class="footer-bottom">
      <img src="/static/img/article/advertorial/logo.png" alt="logo">
    </footer>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
  .AdvertorialPage
    width: 100%
    .header-top
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      position: relative
      img.max-size
        width: 100%
      .min-size
        position: absolute
        width: 415px
        height: 280px
        right: 60px
        border: 3px solid #fff
        bottom: 80px
        overflow: hidden
        display: flex
        align-items: center
        justify-content: center
        img
          height: 280px
    .content
      margin-top: 30px
      padding: 60px 19%
      .tx-h3
        color: #323232
        font-size: 60px
        font-size: 'HelveticaNeue'
        margin-top: 60px
      .tx-h4
        color: #191919
        font-size: 42px
        font-size: 'HelveticaNeue'
        margin-bottom: 30px
      .tx-p
        font-family: 'HelveticaNeue-Light'
        color: #323232
        line-height: 36px
        font-size: 24px
        margin-bottom: 30px
    .footer-bottom
      display: flex
      align-items: center
      justify-content: center
      height: 200px
      margin-bottom: 150px
</style>
