<template>
  <section class="serviceCooperation-container" v-if="imgList.length !== 0">
    <div class="title">
      <h4>Service Cooperation</h4>
      <a href="/service/list" class="serviceCooperation-more">More&gt;</a>
    </div>
    <div class="category">
      <div class="item" v-for="item in imgList" :key="item.categoryId">
        <router-link :to="'/service/list/'">
          <img v-lazy="item.imgUrl" alt="item.title" :key="item.categoryId">
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      imgList: [{
        imgUrl: '/static/img/listing/photo/Real Estate Agent.png',
        title: 'Real Estate Agent',
        categoryId: 1
      },
      {
        imgUrl: '/static/img/listing/photo/Home Inspection.png',
        title: 'Home Inspection',
        categoryId: 2
      },
      {
        imgUrl: '/static/img/listing/photo/Real Estate Appraisal.png',
        title: 'Real Estate Appraisal',
        categoryId: 3
      },
      {
        imgUrl: '/static/img/listing/photo/Escrow Title.png',
        title: 'Escrow Title',
        categoryId: 4
      },
      {
        imgUrl: '/static/img/listing/photo/Mortgage.png',
        title: 'Mortgage',
        categoryId: 5
      },
      {
        imgUrl: '/static/img/listing/photo/Home Improvement Stores.png',
        title: 'Home Improvement Stores',
        categoryId: 6
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .serviceCooperation-container {
    margin-top: 57px;
    .title {
      display: flex;
      justify-content: space-between;
      h4 {
        color: #444444;
        font-size: 24px;
        font-weight: bold;
      }
      .serviceCooperation-more {
        color: #999;
      }
    }
    .category {
      margin-top: 25px;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 33.33%;
        padding-right: 15px;
        box-sizing: border-box;
        &:nth-child(n+4) {
          margin-top: 10px;
        }
        a{
          display: block;
          width: 100%;
          height: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            &:hover {
              box-shadow: 2px 2px 5px gray;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
