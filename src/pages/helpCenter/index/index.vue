<template>
  <section class="helpCenterPage">
    <help-header-component></help-header-component>
    <help-content-component></help-content-component>
  </section>
</template>
<script>
import helpHeaderComponent from '@/components/helpCenter/header'
import helpIndexContentComponent from '@/components/helpCenter/index'
export default {
  components: {
    'help-header-component': helpHeaderComponent,
    'help-content-component': helpIndexContentComponent
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 3,
      QACommunityLists: [],
      consultationLists: [],
      recommendList: []
    }
  },
  methods: {
    QACommunityList () {
      let _this = this
      _this.$axios
        .get(`${this.ljj_path}faq/list/by-detail`, {params: {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize
        }})
        .then(res => {
          if (res.data.success) {
            this.QACommunityLists = res.data.data.rows
          }
        })
        .catch(err => {
          if (err) {}
        })
    },
    consultationList () {
      this.consultationLists = [
        {
          title: 'Housing Market Demand: Where’s it at?',
          img: 'https://www.ebuyhouse.com/blog/wp-content/uploads/2019/02/sell-your-home.jpg',
          detail: `Ready to sell your home but want to avoid paying tens of thousands of dollars in commissions and fees?
          Selling your home on Ebuyhouse is safe, easy, and best of all free. With Ebuyhouse.com you can sell your home on your own and cut out the need for a high-priced Realtor.
          Want to know more?
          Here are the top 5 reasons to sell your home on Ebuyhouse.com:
          1. Selling a house on Ebuyhouse is completely free.
          At Ebuyhouse, we never charge our users to list, buy, or sell. In fact, we don’t charge our users at all.
          You can list a home for sale or rent, buy a home, or rent a home, all at no charge.
          2. We advertise nationally so buyers from all over the U.S. can see your property.
          Our aggressive marketing and advertising campaigns ensure that your property is visible. We run television ads, social media campaigns, and directed internet searches.
          When you list a home for sale on Ebuyhouse, you can be sure that it will be seen.
          3. Our trusted service providers are available to help with any aspect of your real estate transaction.
          Unlike other sites who sell ad space to any real estate professional willing to pay for it, the professionals and service providers displayed on our site have been vetted by us and selected as our trusted partners.
          So whatever needs arise during your real estate transaction, you have access to the best in the industry, without the headache of a prolonged search. And without the uncertainty of hiring someone unrecommended.
          4. We walk you through the entire process and provide tips to help you get the most money on the sale of your home.
          Ebuyhouse’s easy-to-use platform provides step-by-step instructions and guides you through the process of listing your home. We tell you what pictures buyers want to see, what types of amenities you should list, etc.
          And if you get stuck, you can call our customer service team. We can even help you write a property description that will get your home noticed.
          5. We provide everything needed to sell your home online.
          From advertising to contracts, Ebuyhouse facilitates the entire home-selling process. You can even host a virtual open house. Attract buyers from all over and sell your home quickly and easily on Ebuyhouse.com.`,
          url: 'https://www.ebuyhouse.com/blog/sell-your-home/'
        },
        {
          title: 'Learn More about Ebuyhouse Service Providers',
          img: 'https://www.ebuyhouse.com/blog/wp-content/uploads/2019/02/ebuyhouse-service-providers.jpg',
          detail: `Ebuyhouse is an online real estate platform that connects buyers and sellers and landlords and tenants. Online and free of charge.
          But lots of sites do that.
          One of the things that sets Ebuyhouse apart from the competition is our relationships with trusted service providers.
          Most real estate websites allow real estate professionals and other service providers to advertise on their platform. They may even call those who pay extra “preferred” providers. But the truth is these sites are flooded with industry professionals, and it can be difficult for users to know who they should rely on.
          For example, you log onto one the well-known home listing sites available and find the house of your dreams. You decide you need a real estate agent or a mortgage lender. How do you choose from the dozens of ads you see on this well-known site? Good question.
          Unless you’re comfortable choosing from one of the random professionals who paid for those high-priced spots, you’ll have to do the work of finding these service providers on your own.
          But Ebuyhouse does things differently.
          We only partner with one of each type of service provider per service area.
          What does that mean?
          It means that wherever you are in the U.S. you will only see one real estate broker, one mortgage lender, one appraisal company, one inspection company, etc. listed on our site.
          We work hard to find the best professionals in each area so our users can be confident knowing that they’ll receive high-quality service without the work of hours of research.
          We believe in making things easy and fair for all our users – buyers, sellers, landlords, or tenants.
          Log onto to Ebuyhouse.com today to learn more.`,
          url: 'https://www.ebuyhouse.com/blog/ebuyhouse-service-providers/'
        },
        {
          title: 'What is the Ebuyhouse Wish List?',
          img: 'https://www.ebuyhouse.com/blog/wp-content/uploads/2019/02/ebuyhouse-wish-list.jpg',
          detail: `Ebuyhouse is changing the way real estate transactions are completed.
          And now we’re changing the way people search for real estate too.
          The Ebuyhouse wish list allows those looking to buy or rent a home to post what they want and where they want it.
          So rather than spending hours combing the web for the house or condo or apartment of your dreams, our users can post their desired parameters and let sellers and landlords search for them.
          Of course, those who prefer to do the searching themselves can. Our site is built so that whatever you’re looking for you can find it on Ebuyhouse.com.
          But like many new sites in the digital age, we are working to change the way things are done and give users more flexibility.
          Our wish list does just that.
          Renters and buyers benefit from having a voice. This is the first platform that allows you to tell the seller (or landlord) what you want rather than spending days looking through listings.
          And landlords and sellers benefit by having access to buyers and renters who are ready to commit and know what they want.
          It’s a win-win.
          So if you’re ready to begin your real estate search, check out Ebuyhouse. And if you know what you’re looking for, be sure to post to our wish list page and let our sellers and landlords know what you want.`,
          url: 'https://www.ebuyhouse.com/blog/what-is-ebuyhouse-wish-list/'
        }
      ]
      // 请求数据
      // this.$axios({
      //   'method': 'GET',
      //   'url': `${this.ljj_path}news/list`,
      //   'params': {
      //     'pageSize': 3,
      //     'pageNum': 1,
      //     'userId': this.guid
      //   }
      // })
      //   .then(response => {
      //     const data = response.data.data.rows
      //     if (response.data.success) {
      //       this.propInfoData = data
      //     } else {
      //       // alert(response.data.msg)
      //     }
      //   })
      //   .catch(error => {
      //     if (error) {}
      //     // alert(error)
      //   })
    },
    fetchCategoriesList () {
      this.$axios.get(`${this.ljj_path}guide/recommend/S`, {params: {pageSize: 3}})
        .then(res => {
          if (res.data.success) {
            this.recommendList = res.data.data
          }
        })
    }
  },
  created () {
    this.consultationList()
    this.QACommunityList()
    this.fetchCategoriesList()
  }
}
</script>
<style lang="sass" scoped>
  .helpCenterPage
</style>
