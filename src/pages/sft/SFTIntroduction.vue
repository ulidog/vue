<template>
  <div class="floor-bar">
    <div class="top">
      <img src="/static/img/sft/01.png" alt>
    </div>
    <div id="mian">
      <div class="image-text1">
        <img class="rt" src="/static/img/sft/2.png" alt>
        <p class="text1">In the early days of motor vehicles, there was no such thing as a traffic signal. Motorists travelled theworld’s roadways just as previous generations had traveled by horse. The problem with this quickly becameapparent. Cars are faster than horses. Thus the traffic signal was invented, reducing accidents and allowingmotorists to be more sure of their moves.</p>
        <p class="text2">The SFT method of real estate trading is like the humble traffic signal that forever changed transportation inthe world. Our platform makes renting a house a safer, more assured process. By utilizing SFT, perspectivehomebuyers can save money and be more confident in their decision to buy. Additionally, buyers and sellers nolonger need to rely on the costly, overrated services of an agent, affording them huge savings by eliminatingcommissions and fees.</p>
      </div>

      <div class="image-text2">
        <img class="lf" src="/static/img/sft/3.png" alt>
        <p class="text3">SFT is simple. Buyers and sellers follow are guided through the process of creating an account, uploadingproperty information and signing theelectronic contract. Everything from listing the property and showingthe house to negotiating the price and signing the contract is all taken care ofthrough the easy-to-usewebsite and mobile app.</p>
      </div>
      <div class="image-text3">
        <img class="rt" src="/static/img/sft/4.png" alt>
        <p class="text4">The two- or three-month trial period, enables sellers to collect rent and buyers to find their absolute dreamhome. If a buyer decides not to purchase, he or she needs only to pay the rent. The deposit money will berefunded, and the buyer can begin the search for another property.</p>
      </div>

      <ul class="icon">
        <li>
          <a href="http://facebook.com/ebuyhouseinc" target="_blank">
            <img src="/static/img/sft/facebook.png" alt>
          </a>
        </li>
        <li>
          <a href="http://twitter.com/ebuyhouseinc" target="_blank">
            <img src="/static/img/sft/twitter.png" alt>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/ebuyhouseinc" target="_blank">
            <img src="/static/img/sft/ins.png" alt>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SFTIntroduction'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.floor-bar {
  background-color: #f5f5f5;
}
.floor-bar .top {
  background-color: #fff;
}
.floor-bar .top img {
  width: 1174px;
  margin: auto;
  display: block;
}
.top {
  padding-top: 60px;
}
.top img {
  width: 100%;
  vertical-align: top;
}
li {
  list-style: none;
}
.icon {
  display: flex;
  margin-top: 20px;
}
#mian {
  width: 1178px;
  margin: 0 auto;
  padding-bottom: 50px;
  overflow: hidden;
}
.text1,
.text2,
.text3,
.text4,
.text5,
.text6 {
  margin-top: 46px;
  color: #666;
  font-size: 20px;
  line-height: 38px;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
}
.lf {
  float: left;
}
.rt {
  float: right;
}

img.lf ~ .text1,
img.lf ~ .text2,
img.lf ~ .text3,
img.lf ~ .text4,
img.lf ~ .text5,
img.lf ~ .text6 {
  padding-left: 46px;
}

img.rt ~ .text1,
img.rt ~ .text2,
img.rt ~ .text3,
img.rt ~ .text4,
img.rt ~ .text5,
img.rt ~ .text6 {
  padding-right: 46px;
}

.image-text1,
.image-text2,
.image-text3,
.image-text4 {
  width: 100%;
  margin-top: 100px;
}

.image-text1 {
  min-height: 460px;
}

.image-text1 img {
  width: 458px;
  height: 460px;
}

.image-text2 {
  min-height: 343px;
}

.image-text2 img {
  width: 480px;
  height: 343px;
}

.image-text3 {
  min-height: 301px;
}

.image-text3 img {
  width: 480px;
  height: 301px;
}
</style>
