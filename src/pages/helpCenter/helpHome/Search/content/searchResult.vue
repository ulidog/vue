<template>
  <div class="search-result">
    <div class="result">
      <div class="title">
      <h4 v-if="isResult">Here are the results for you:</h4>
      <h4 v-else>The content you searched was not found!</h4>
      </div>
      <div class="content" v-if="isResult">
        <div class="item">
          <h5 @click="goDetails">{{searchContent}}</h5>
          <p>You can create a listing in the "rent" section of your profile. It can take up to six hours for the listings to appear in the search results after they are released.</p>
        </div>
      </div>
      <div class="none" v-if="!isResult">
        <img src="/static/img/helpCenter/box.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isResult: false,
      searchContent: '',
      searchList: [{
        name: 'How to register to log in'
      },
      {
        name: 'How to post homes'
      },
      {
        name: 'How to find homes'
      },
      {
        name: 'How to recommend homes'
      },
      {
        name: 'How to check the homes recommended by landlords'
      }]
    }
  },
  created () {
    if (window.location.search.split('=')[1]) {
      this.isResult = true
      this.searchContent = window.location.search.split('=')[1].replace(/%20/g, ' ')
    } else {
      this.isResult = false
    }
  },
  methods: {
    goDetails () {
      let path = '/help-center/help-home/novice-navigation/'
      switch (this.searchContent) {
        case 'How to register to log in':
          this.$router.push(`${path}howRegister`)
          break
        case 'How to post homes':
          this.$router.push(`${path}howHouse`)
          break
        case 'How to find homes':
          this.$router.push(`${path}howSeek`)
          break
        case 'How to recommend homes':
          this.$router.push(`${path}howRecommend`)
          break
        case 'How to check the homes recommended by landlords':
          this.$router.push(`${path}howCheck`)
          break
        default:
          this.isResult = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-result{
    width: 1180px;
    margin: 0 auto;
    margin-bottom: 100px;
    .title{
      font-size: 30px;
      color:#444;
    }
    .content{
      margin-top: 53px;
      .item{
        width: 667px;
        >h5{
        font-size: 24px;
        color:#444;
        &:hover {
          cursor: pointer;
        }
        }
        >p{
          margin-top: 22px;
          font-size: 18px;
          color:#999;
          line-height: 24px;
          width: 667px;
        }
      }
    }
    .none{
      width: 100%;
      margin-top: 110px;
      img{
        // height: 700px;
        // width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
