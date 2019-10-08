<template>
  <div class='warper'>
      <ul class="container">
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/buyHouse'}"><img src="/static/img/index/serverMan1.png" alt=""></router-link>
            </div>
            <router-link :to="{path: '/buyHouse'}"><h2>SFT Buy</h2></router-link>
            <div class='txt'>
                <ul style="list-style-type: disc;list-style-position:inside;">
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzQxMDA3OTYxNzMxODkxMiJ9">
                        Safe, Fast Trial (SFT) - Try It Before You Buy
                      </a>
                    </li>
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzQxMDMzOTYzNDgwNjc4NCJ9">
                        How Does SFT Work?
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/buyHouse'}" class="btnMain">Search For a Home</router-link>
        </li>
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/rentingHouse'}">
                <img src="/static/img/index/serverMan2.png" alt="">
              </router-link>
            </div>
            <router-link :to="{path: '/rentingHouse'}"><h2>Rent</h2></router-link>
            <div class='txt'>
                <!-- <p class="mainTit">SFT Transaction</p> -->
                <ul style="list-style-type: disc;list-style-position:inside;">
                   <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM2NjQ1ODI0NzU0NDgzMiJ9">
                        Is It Better To Rent Or Buy? 5 Factors You Should Consider
                      </a>
                    </li>
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4NTczMzYzMjA0Mzc3ODA0OCJ9">
                        Safe Secure Real Estate Transactions
                      </a>
                    </li>
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4MjYwMjI3Njc0MDc5MjMyMCJ9">
                         How To Recommend Your Rental Properties?
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/rentingHouse'}" class="btnMain">Search For a Rental</router-link>
        </li>
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/commonHouse'}">
                <img src="/static/img/index/serverMan3.png" alt="">
              </router-link>
            </div>
            <router-link :to="{path: '/commonHouse'}"><h2>Traditional Buy</h2></router-link>
            <div class='txt'>
                <ul style="list-style-type: disc;list-style-position:inside;">
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM3MTgwNTMzMDgzMzQwOCJ9">
                        Can I Buy A Home Without A Realtor?
                      </a>
                    </li>
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1MzQ4NjMzNDgyMDM1MiJ9">
                        Home Buying Tips
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/commonHouse'}" class="btnMain">Search For a Home</router-link>
        </li>
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/requestList/buyRequestSft'}">
                 <img src="/static/img/index/serverMan4.png" alt="">
              </router-link>
            </div>
            <router-link :to="{path: '/requestList/buyRequestSft'}"><h2>SFT Sell</h2></router-link>
            <div class='txt'>
                <ul style="list-style-type: disc;list-style-position:inside;">
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzQxMTU4OTI3MzE1NzYzMiJ9">
                        How Can I Sell My Home Using The SFT Method?
                      </a>
                    </li>
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzQxMjgzNzkzNDIzNTY0OCJ9">
                        Benefits for Sellers When Using ‘Try Before You Buy’
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/requestList/buyRequestSft'}" class="btnMain">Search Requests</router-link>
        </li>
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/requestList/rentRequest'}">
                <img src="/static/img/index/serverMan5.png" alt="">
              </router-link>
            </div>
            <router-link :to="{path: '/requestList/rentRequest'}"><h2>Rental</h2></router-link>
            <div class='txt'>
                <!-- <p class="mainTit">Traditional Transaction</p> -->
                <ul style="list-style-type: disc;list-style-position:inside;">
                  <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4NTczMzYzMjA0Mzc3ODA0OCJ9">
                        Safe Secure Real Estate Transactions
                      </a>
                    </li>
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1NzUyODQwNjU1NjY3MiJ9">
                        Rent Stress Free With Ebuyhouse
                      </a>
                    </li>
                    <li class="usTit" style="list-style-type: disc;list-style-position:inside;">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM4MDczNTQ1NzAzNDI0MCJ9">
                        What Is The Ebuyhouse Wish List?
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/requestList/rentRequest'}" class="btnMain">Search Requests</router-link>
        </li>
        <li class='list'>
            <div style="text-align:center;">
              <router-link :to="{path: '/requestList/buyRequest'}">
                <img src="/static/img/index/serverMan6.png" alt="">
              </router-link>
            </div>
            <router-link :to="{path: '/requestList/buyRequest'}"><h2>Traditional Sell</h2></router-link>
            <div class='txt'>
                <!-- <p class="mainTit">Traditional Transaction</p> -->
                <ul style="list-style-type: disc;list-style-position:inside;">
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM1NDQzMzg0MDY3Njg2NCJ9">
                        For Sale By Owner (FSBO) Checklist
                      </a>
                    </li>
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI4NTczMzQ3MDYyMTc5NDMwNCJ9">
                         Top 5 Reasons To Use Ebuyhouse to Sell Your Home
                      </a>
                    </li>
                    <li style="list-style-type: disc;list-style-position:inside;" class="usTit">
                      <a target="blank" href="https://www.ebuyhouse.com/guide/detail?ebuyhouse=eyJhcnRpY2xlSWQiOiI3MzM3MjYzMDI3OTEyNzA0MCJ9">
                        How To Sell Your Home Without A Realtor And Save Big
                      </a>
                    </li>
                </ul>
            </div>
            <router-link :to="{path: '/requestList/buyRequest'}" class="btnMain">Search Requests</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style scoped>
  @media screen and (max-width: 1200px) {
    .warper .container{
      width: 95%;
      height: auto;
      margin: 0 auto;
      padding-top: 4rem;
      padding-bottom: 2.7rem;
    }
  }
  @media screen and (min-width: 1200px) {
    .warper .container{
      width: 62.5%;
      height: auto;
      margin: 0 auto;
      padding-top: 2rem;
      padding-bottom: 2.7rem;
    }
  }
  .warper .container::after {
    content: '';
    display: table;
    clear: both;
  }
  .warper .container .list {
      text-align: center;
      float: left;
      width: 31.4%;
      height: 26rem;
      margin-right: 2.9%;
      margin-bottom: 1.5rem;
      box-shadow:0px 5px 20px 0px rgba(186,186,186,0.5);
      border-radius:10px;
      padding-top: 10px;
      position: relative;
      transition: all linear 0.3s;
  }

  /* .warper .container .list:nth-child(1) {
      border-top-left-radius: 12rem;
      border-top-right-radius: 12rem;
      border-bottom-right-radius: 12rem;
      border-bottom-left-radius: 12rem;
  }
  .warper .container .list:nth-child(3) {
      border-top-left-radius: 12rem;
      border-top-right-radius: 12rem;
      border-bottom-right-radius: 12rem;
      border-bottom-left-radius: 12rem;
  }
  .warper .container .list:nth-child(4) {
      border-top-left-radius: 12rem;
      border-top-right-radius: 12rem;
      border-bottom-right-radius: 12rem;
      border-bottom-left-radius: 12rem;
  }
  .warper .container .list:nth-child(6) {
      border-top-left-radius: 12rem;
      border-top-right-radius: 12rem;
      border-bottom-right-radius: 12rem;
      border-bottom-left-radius: 12rem;
  } */
  @media screen and (max-width: 750px) {
    .warper .container .list {
      float: none;
      margin: 0 auto 15px!important;
      width: 320px;
      margin-right: 2%;
      box-shadow:0px 5px 20px 0px rgba(186,186,186,0.5);
      border-radius:10px!important;
      padding-top: 10px;
      position: relative;
    }
  }
  .warper .container .list:hover {
      box-shadow:0px 5px 20px 0px rgba(0,0,0,0.6);
      transform: scale(1.02);
  }
  .warper .container .list img {
    width: 10.2rem;
    height: 8.75rem;
    transition: all linear 0.5s;
  }
  .warper .container .list img:hover {
    transform: scale(1.1);
  }
  .warper .container .list:nth-child(3n) {
      margin-right: 0;
  }
  .warper .container .list .txt{
      padding: 0.6rem 1.6rem;
      font-size: 1rem;
      line-height:1.3rem;
      text-align: left;
  }
  .warper .container .list .txt .mainTit{
      font-weight:bold;
      font-size: 1.125rem;
      color:rgba(102, 102, 102, 1);
  }
  /* .warper .container .list:hover .txt .mainTit{
      color:rgba(255, 255, 255, 1);
      transition: all linear 0.1s;
  } */
  .warper .container .list .txt .usTit{
      font-size: 1rem;
      color:rgba(102, 102, 102, 1);
      line-height:1.25rem;
      margin-bottom: 0.6rem;
      transition: all .5s ease;
  }
  /* .warper .container .list .txt .usTit:hover, */
  .warper .container .list .txt .usTit>>>a:hover{
      color:rgba(18, 129, 252, 1);
      font-weight: 800;
      /* transition: all .5s linear; */
  }
  /* .warper .container .list:hover .txt .usTit>a{
      color:rgba(255, 255, 255, 1);
      transition: all linear 0.1s;
  }
  .warper .container .list:hover .txt .usTit{
      color:rgba(255, 255, 255, 1);
      transition: all linear 0.1s;
  }
  .warper .container .list:hover .txt{
      color:#fff;
      transition: all linear 0.1s;
  } */
  .warper .container .list h2{
      padding-left: 1.5rem;
      margin-bottom: 0.6rem;
      font-size: 1.75rem;
      font-weight: bold;
      display: inline-block;
  }
  .warper .container .list h2:hover{
      color: rgba(18, 129, 252, 1);
  }
  /* .warper .container .list:hover h2{
      color:#fff;
      transition: all linear 0.1s;
  } */
  .warper .container .list .btnMain {
      position: absolute;
      bottom:2rem;
      width: 11.8rem;
      height: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      border-radius: 1.4rem;
      border:2px solid rgba(68,68,68,1);
      left: 50%;
      transform: translateX(-50%);
      color:rgba(68, 68, 68, 1);
  }
  .warper .container .list .btnMain:hover {
      background: rgba(18, 129, 252, 1);
      color: rgba(255, 255, 255, 1);
      border:2px solid rgba(68,68,68,0);
  }
</style>
