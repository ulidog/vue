<style scoped>
/* .box { */
  /* width: 62.5% !important; */
/* } */
@keyframes bounce-down {
  /* 25% {transform: translateY(-10px);}
  40%{transform: translateY(0);}
  75% {transform: translateY(-10px);}
  90% {transform: translateY(-2px);}
  100% {transform: translateY(-10px);} */
  /* from {background: red;}
  to {background: yellow;} */
  /* 15% {background: red;}
  25%{background: orangered;}
  35% {background: orange;}
  45% {background: greenyellow;}
  55% {background: green;}
  65% {background: blue;}
  90% {background: blueviolet;} */
}
.dialog span {
  font-size: 48px;
  color: #333333;
  text-align: center;
}
.finding p {
  font-size: 24px;
  color: #333333;
  line-height: 100px;
}
.finding span {
  font-size: 18px;
}
.bespoke {
  font-size: 18px;
}
.bespoke p {
  line-height: 33px;
  margin-top: 29px;
}
.technology {
  line-height: 20px;
}
.updates {
  font-size: 24px;
  color: #333333;
  line-height: 5;
}
.address {
  font-size: 18px;
  margin-left: 160px;
  line-height: 3;
  margin-bottom: 25px;
}
.address a {
  color: #1281fc;
  text-decoration: underline;
}
.zhu {
  margin-left: 64px;
}
.houseimg {
  position: absolute;
  left: 749px;
  top: 326px;
}
.bespoke span {
  color: #1281fc;
  font-size: 20px;
}
.warp {
    background-color: #f3f4f5;
}
@media screen and (max-width: 1200px) {
  .marks {
    width: 95%;
    margin: 0 auto;
    padding: 21px 0;
  }
}
.marks:after{
  content: "";
  display: table;
  clear: both;
}
@media screen and (min-width: 1200px) {
  .marks {
    width: 62.5%;
    margin: 0 auto;
    height: 180px;
    padding: 24px 0;
  }
}
.marks .list{
    float: left;
    width: 32%;
    height: 100%;
    margin-right: 2%;
    border-radius:10px;
    border:1px solid rgba(222,222,222,1);
    padding: 2rem 0 0 1rem;
    overflow: hidden;
    position: relative;
}
@media screen and (max-width: 1200px) {
  .marks .list{
    float: none;
    margin: 0 auto 15px!important;
    width: 60%;
    padding: 0.9rem 0 0.9rem 1.5rem;
  }
}
@media screen and (max-width: 750px) {
  .marks .list{
    width: 96%;
  }
}
.marks .list:nth-child(3){
    margin-right: 0;
}
.marks .list .txt{
    position: absolute;
    left: 105px;
    top: 36px;
}
@media screen and (max-width: 1200px) {
   .marks .list .txt{
      position: absolute;
      left: 105px;
      top: 16px;
  }
}
.marks .list .txt .mainTit{
    font-size: 1.5rem;
    line-height: 2.2rem;
    font-weight:bold;
    color: rgba(60, 61, 65, 1);
}
.marks .list .txt .usTit{
    font-size: 0.9rem;
    line-height: 1.9rem;
    color: rgba(101, 107, 111, 1);
}
.marks .list .txt .usTit a:hover {
  font-weight: bold;
}
.container::after {
  content: "";
  display: table;
  clear: both;
}
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
  animation: bounce-down 2s infinite alternate;
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
.copper {
    padding: 30px 0 32px 0;
    background-color: #f3f4f5;
}

@media screen and (max-width: 1200px) {
  .copper .copperList {
    width: 95%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1200px) {
  .copper .copperList {
    width: 62.5%;
    margin: 0 auto;
  }
}
.copper .copperList .title h2{
    text-align: center;
    font-size: 2rem;
    color: rgba(60, 61, 65, 1);
}
.copper .copperList .title h2:hover{
    text-align: center;
    color: rgba(18, 129, 252, 1);
}
.copper .copperList .title {
    margin-bottom: 30px;
}
@media screen and (max-width: 1200px) {
  .copper .copperList .title p{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    color: rgba(101, 107, 111, 1);
  }
}
@media screen and (min-width: 1200px) {
  .copper .copperList .title p{
    width: 60%;
    margin: 0 auto;
    text-align: center;
    font-size: 0.9rem;
    color: #999;
  }
}
.copper .copperList .listBox::after {
    content: "";
    display: table;
    clear: both;
}
.copper .copperList .listBox .list {
    float: left;
    width: 23%;
    margin-right: 2.6%;
    height: 22.75rem;
    background:rgba(255,255,255,1);
}
.copper .copperList .listBox .list:hover {
    box-shadow:0px 5px 20px 0px rgba(0,0,0,0.6);
    transform: scale(1.05);
    transition: all linear 0.3s;
}
@media screen and (max-width: 750px) {
  .copper .copperList .listBox .list {
    float: left;
    width: 47%;
    margin-right: 2.6%;
    margin-bottom: 15px;
    background:rgba(255,255,255,1);
}
}
.copper .copperList .listBox .list:nth-child(4) {
    margin-right: 0;
}
.copper .copperList .listBox .list img {
    width: 100%;
    height: 17.5rem;
}
.copper .copperList .listBox .list p {
    text-align: center;
    font-size: 1.25rem;
    color: rgba(68, 68, 68, 1);
    margin-top: 1.5rem;
}
.copper .copperList .listBox .list:hover p {
    color: rgba(18, 129, 252, 1);
}
.moreBtn {
  text-align: center;
  margin-top:30px;
}
.moreBtn button{
  width:16rem;
  height:2.5rem;
  line-height:2.5rem;
  border:2px solid rgba(102,102,102,1);
  border-radius:1.25rem;
}
.moreBtn button a{
  display:block;
  line-height:1.4rem;
  font-size: 1.2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.moreBtn button:hover{
  background: rgba(18, 129, 252, 1);
  transition: all linear 0.2s;
  border:2px solid rgba(102,102,102,0);
}
.moreBtn button:hover a{
  color: #fff;
}
</style>

<template>
  <div>
    <!-- 轮播 -->
    <vue-carousel></vue-carousel>
    <!-- 三标签 -->
    <!-- <div class='warp'>
      <div class="marks">
        <li class='list'>
          <router-link :to="{path: '/sft/Innovation'}">
            <img src="/static/img/index/sft_icon.png" alt="">
            <div class='txt'>
              <p class="mainTit">SFT Service</p>
              <p class="usTit">Safe Fast Trial</p>
            </div>
          </router-link>
        </li>
        <li class='list'>
          <router-link :to="{path: '/sft/TryBeforeYouBuy'}">
            <img src="/static/img/index/safety_icon.png" alt="">
            <div class='txt'>
              <p class="mainTit">Safety</p>
              <p class="usTit">Making An Offer and Signing Contracts</p>
            </div>
          </router-link>
        </li>
        <li class='list'>
          <router-link :to="{path: '/sft/SaveThousands'}">
            <img src="/static/img/index/save_icon.png" alt="">
            <div class='txt'>
              <p class="mainTit">Save Thousands</p>
              <p class="usTit">Buy, Sell and Rent for 6% Less</p>
            </div>
          </router-link>
        </li>
      </div>
    </div> -->
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
    <vue-rental></vue-rental>
    <vue-good-properties></vue-good-properties>
    <!-- 合作商 -->
    <div class="copper" v-show="showCooper">
        <div class='copperList'>
            <div class="title">
                 <router-link to="/service/list"><h2>Service Providers</h2></router-link>
                <p>You can save time and money by avoiding the hassle of searching for professionals near you. Ebuyhouse partners with trusted service providers in every market.</p>
            </div>
            <utils-details-nearby-service-provider @upMagerState='_upMagerState' :houseInfo="houseInfo"></utils-details-nearby-service-provider>
            <!-- <ul class="listBox">
                <li class="list">
                  <router-link :to="{path: '/service/list/', query: {fkBusinessIdsList: 'AM'}}" style="display:block;width:100%;height:100%;">
                    <img src="/static/img/index/serverMan11.png">
                    <p>Property Inspection</p>
                  </router-link>
                </li>
                <li class="list">
                  <router-link :to="{path: '/service/list/', query: {fkBusinessIdsList: 'AJ'}}" style="display:block;width:100%;height:100%;">
                    <img src="/static/img/index/serverMan22.png">
                    <p>Termite Inspection</p>
                  </router-link>
                </li>
                <li class="list">
                  <router-link :to="{path: '/service/list/', query: {fkBusinessIdsList: 'DA'}}" style="display:block;width:100%;height:100%;">
                    <img src="/static/img/index/serverMan33.png">
                    <p>House Inspection</p>
                  </router-link>
                </li>
                <li class="list">
                  <router-link :to="{path: '/service/list/', query: {fkBusinessIdsList: 'BJ'}}" style="display:block;width:100%;height:100%;">
                    <img src="/static/img/index/serverMan44.png">
                    <p>Appraisals</p>
                  </router-link>
                </li>
            </ul> -->
            <div class="moreBtn">
                <button>
                  <!-- :to="{name: 'map&buying', query: {ebuyhouse: $base64.encode(JSON.stringify({type: true}))}}" -->
                  <router-link to="/service/list">More</router-link>
                </button>
            </div>
        </div>
    </div>
    <vue-toolbar></vue-toolbar>
    <el-dialog :visible.sync="centerDialogVisible" width="1178px" top="5vh" center>
      <div class="dialog" align="center">
        <span>Welcome to Ebuyhouse</span>
      </div>
      <div class="zhu">
        <dir class="finding">
          <p>Thank you finding us at Ebuyhouse, your dream home could be just a click away.</p>
          <span>Here at Ebuyhouse we have one goal, that is to save you time & money when buying, selling & renting a home in America.</span>
        </dir>
        <div class="bespoke">
          <p>Our bespoke technology allows you to list your home for free in a matter of minutes,
            <br>connect with our exclusive partners from lending, escrow & even finding a plumber.
            <br>All to help you navigate your way through the Real Estate transaction.
          </p>
        </div>
        <div class="bespoke">
          <p>We have just launched and need you to tell us how we can improve or if there is
            <br>anything about your property needs that we must consider.Please direct any
            <br>issues & suggestions to our Contact Us form or call
            <span>702 916 3883</span> & one of
            <br>our team will be happy to help you.
          </p>
        </div>
        <div class="updates">
          <p>Regular information, updates & insight can be found here:</p>
        </div>
        <div class="address">
          <a href="http://blog.ebuyhouse.com" target="view_window">www.blog.ebuyhouse.com</a>
          <br>
          <a
            href="https://www.facebook.com/ebuyhouseinc/"
            target="view_window"
          >https://www.facebook.com/ebuyhouseinc</a>
          <br>
          <a href="https://twitter.com/ebuyhouseinc/" target="view_window">Twitter: @ebuyhouseinc</a>
          <br>
        </div>
      </div>
      <div class="houseimg">
        <img src="/static/img/index/picture_house.png" alt>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
    <vue-tip v-if="isShowTip"></vue-tip>
  </div>
</template>

<script>
// 2019-4-26 qc负责本期首页的改动 以下内容请不要改动 ，如需改动请先告知本人协商修改原因！！！！！谢谢
import VueCarousel from '@/components/index/carousel.vue' // 轮播组件
import VueGoodProperties from '@/components/index/goodProperties.vue'
import VueRental from '@/components/index/rental.vue'
import VueToolbar from '@/components/common/toolbar.vue'
import nearbyServiceProvider from '@/components/index/nearbyServiceProvider'
import VueTip from '@/components/index/tip.vue'
// 2019-4-26 qc负责本期首页的改动 以上内容请不要改动 ，如需改动请先告知本人协商修改原因！！！！！谢谢
export default {
  name: 'index',
  components: {
    'vue-carousel': VueCarousel,
    'vue-good-properties': VueGoodProperties,
    'vue-rental': VueRental,
    'vue-toolbar': VueToolbar,
    'utils-details-nearby-service-provider': nearbyServiceProvider,
    'vue-tip': VueTip
  },
  data () {
    return {
      isShowTip: false,
      centerDialogVisible: false,
      houseInfo: null,
      showCooper: false
    }
  },
  methods: {
    _upMagerState (_bool) {
      this.showCooper = _bool
    },
    init () {
      this.fetchHouseInfo()
    },
    fetchHouseInfo () {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/item`, {params: {houseId: _this.params.houseId}})
        .then(res => {
          if (res.data.success) {
            _this.houseInfo = res.data.data
            console.log(_this.houseInfo.cityId)
            this.cityId = _this.houseInfo.cityId
            setTimeout(() => {
              _this.loading = false
            }, 1000)
          }
          // console.log(res)
          setTimeout(() => {
            _this.loading = false
          }, 1000)
        })
        .catch(err => {
          setTimeout(() => {
            _this.loading = false
          }, 1000)
          console.log(err)
        })
    }
  },
  mounted () {}
}
</script>
