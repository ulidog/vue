<template>
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
</template>

<script>
import nearbyServiceProvider from '@/components/index/nearbyServiceProvider'
export default {
  data () {
    return {
      houseInfo: null,
      showCooper: false
    }
  },
  components: {
    'utils-details-nearby-service-provider': nearbyServiceProvider
  },
  methods: {
    _upMagerState (_bool) {
      this.showCooper = _bool
    }
  }
}
</script>

<style >
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
