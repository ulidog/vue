<template>
  <section class="buyAndSellPage">
    <header class="topImg">
      <img src="/static/img/article/buyAndSell/top.png" alt="top">
    </header>
    <section class="ArticleContent">
      <p class="cont-p">List your home for sale with Ebuyhouse.com and save 6%.</p>
      <p class="cont-p">Ebuyhouse allows you to buy, sell, or rent a home online for free.</p>
      <p class="cont-p">We connect buyers & sellers directly and facilitate the entire selling process.</p>
      <p class="cont-p">You can make an offer, accept, negotiate & sign contracts all on Ebuyhouse.com.</p>
      <p class="cont-p">Our process protects all parties & ensures that each real estate transaction is fair & legal.</p>
      <p class="cont-p">Just log onto Ebuyhouse.com, create an account and list your home. Our system will walk you through the entire process, step by step.</p>
      <p class="cont-p">Our Trusted service providers are nearby & ready to help with any issues that arise during the home selling process.</p>
    </section>
    <section class="contentImg">
      <img src="/static/img/article/buyAndSell/pho2.png" alt="middle">
    </section>
    <section class="ArticleContent">
      <p class="cont-p">Here at Ebuyhouse we want you, the American public to be able to get maximum value for your home & not pay out high commissions & fees for something you could easily do yourself.</p>
      <p class="cont-p">Before you list your home anywhere else, think about this. The average home in America during 2018 sold for $220,000, an Ebuyhouse user would have saved themselves $13,200. </p>
      <p class="cont-p">Real Estate is daunting, time consuming & sometimes intimidating, that’s why we have a knowledge base on our site aimed at guiding you through the process.</p>
    </section>
    <section class="contentImg">
      <img src="/static/img/article/buyAndSell/pho3.png" alt="button">
    </section>
    <section class="ArticleContent">
      <p class="cont-p">Starting at what photos to list to get the most attention from potential buyers, to connecting with a local lender & finding a mover, Ebuyhouse is your one stop Real Estate Shop.</p>
      <p class="cont-p">Our Innovative S.F.T, Trial Living Transaction method allows sellers to receive rent without brokerage fees, potential buyers can try a property for 90 days without the cost increasing, with no risk & no commission.</p>
    </section>
    <footer class="footerInfo">
      <div class="content-text">
        <h3>Safer,<br>Faster,<br>Real Estate Transactions</h3>
        <span>Learn more, save more with Ebuyhouse.com</span>
      </div>
    </footer>
    <section class="share">
      <social-sharing
        :title="title"
        :description="description"
        :quote="quote"
        :twitter-user="twitterUser"
        inline-template
        @open="openChange">
        <section>
          <network network="facebook" class="fontHoverMarker">
            <img src="/static/img/article/buyAndSell/facebook.png" alt="facebook.png">
          </network>
          <network network="twitter" class="fontHoverMarker">
            <img src="/static/img/article/buyAndSell/twitter.png" alt="twitter.png">
          </network>
          <!-- <span >
            <img src="/static/img/article/buyAndSell/ins.png" alt="ins.png" @click="openWindows">
          </span> -->
        </section>
      </social-sharing>
        <img src="/static/img/article/buyAndSell/ins.png" @click="openWindows">
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://www.ebuyhouse.com/article/buy-and-sell',
      title: 'Faster, Safer, Real Estate Transactions.',
      description: `List your home for sale with Ebuyhouse.com and save 6%. 
        Ebuyhouse allows you to buy, sell, or rent a home online for free.
        We connect buyers & sellers directly and facilitate the entire selling process.
        You can make an offer, accept, negotiate & sign contracts all on Ebuyhouse.
        Our process protects all parties & ensures that each real estate transaction is fair & legal.
        Just log onto Ebuyhouse.com, create an account and list your home. Our system will walk you through the entire process, step by step.`,
      quote: `List your home for sale with Ebuyhouse.com and save 6%. 
        Ebuyhouse allows you to buy, sell, or rent a home online for free.
        We connect buyers & sellers directly and facilitate the entire selling process.
        You can make an offer, accept, negotiate & sign contracts all on Ebuyhouse.
        Our process protects all parties & ensures that each real estate transaction is fair & legal.
        Just log onto Ebuyhouse.com, create an account and list your home. Our system will walk you through the entire process, step by step.`,
      hashtags: '#Ebuyhouse',
      twitterUser: 'Ebuyhouse'
    }
  },
  methods: {
    openChange (E) {
      console.log(E)
    },
    openWindows () {
      window.open('https://www.instagram.com/ebuyhouseinc/', 'newwindow', 'height=459, width=626, top=95, left=650, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
    }
  }
}
</script>
<style lang="sass" scoped>
  .buyAndSellPage
    padding: 60px 19%
    width: 100%
    .topImg
      margin-top: 30px
      margin-bottom: 45px
      img
        width: 100%
    .ArticleContent
      margin: 30px 0
      .cont-p
        font-size: 24px
        color: #666
        font-weight: 400
        margin-bottom: 30px
    .contentImg
      display: flex
      justify-content: center
      margin: 50px 0
    .footerInfo
      margin-top: 60px
      margin-bottom: 30px
      display: flex
      flex-direction: column
      align-items: center
      .content-text
        h3
          text-align: left
          font-size: 60px
          color: #000
          font-weight: 400
        span
          color: #000
          font-size: 24px
          margin-top: 30px
    .share
      border-top: 2px solid #E2E2E2
      padding: 30px 0
      display: flex
      /deep/ img
        margin: 0 5px
        width: 50px
        height: 50px
        transition: transform .5s ease
        cursor: pointer
        &:hover
          transform: scale(1.2)
          transition: transform .5s ease
</style>
