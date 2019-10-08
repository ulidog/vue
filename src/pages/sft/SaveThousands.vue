<template>
  <div>
    <div class="top">
      <img src="/static/img/sft/s1.png" alt>
    </div>
    <div id="mian">
      <div class="paragraph text1">
        <p>Ebuyhouse makes renting simple and convenient.</p>
        <br>
        <p>Ebuyhouse’s property rental system guarantees a fair rental agreement and transparent rules that protect landlords and renters.</p>
      </div>
      <div class="image-text2">
        <img src="/static/img/sft/p9.png" alt>
        <p class="text2">These issues plague today’s real estate market, but with the birth of Ebuyhouse property rental system, such issues are a thing of the past. Our platform guarantees fair rental agreement and transparent rules that protect buyers and sellers.</p>
      </div>
      <div class="paragraph text3">
        <p>Ebuyhouse’s property rental system provides the following services for landlords and tenants:</p>
        <br>
        <p>1. A standard rental agreement with detailed procedures protecting the rights of both lessors and lessees.</p>
        <br>
        <p>2. All financial transactions, payment history, and repair history are recorded and saved on the platform.</p>
        <br>
        <p>3. Our review system ensures that bad landlords and bad tenants cannot use our system in the future.</p>
        <br>
        <p>4. Rental information for every property is tracked by the platform. Users can compare prices, amenities, and reviews. Everything is fair and transparent.</p>
        <br>
        <p>5. Ebuyhouse doesn’t charge referral fees, which lowers the price. From touring houses to signing contracts, every transaction can be completed online – at no cost.</p>
        <br>
        <p>6. Ebuyhouse’s customer support team is ready to resolve disputes between tenant and landlord at any time.</p>
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
  name: 'SaveThousands'
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.top img {
  width: 100%;
  vertical-align: top;
}
li {
  list-style: none;
}
#mian {
  width: 1142px;
  margin: 0 auto 178px;
  overflow: hidden;
}
#mian img {
  border-radius: 10px;
}
.top .cont {
  position: absolute;
  top: 50%;
  left: 185px;
  width: 100%;
  transform: translateY(-50%);
}
.top .title {
  width: 383px;
  height: 36px;
  position: absolute;
  top: -22%;
  left: 15%;
  text-align: center;
  line-height: 36px;
}
.top .title span {
  font-size: 48px;
}
.text1,
.text2,
.text3,
.text4,
.text5,
.text6 {
  color: #666;
  font-size: 22px;
  line-height: 30px;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
}
.text1,
.text3 {
  width: 1142px;
  margin-top: 80px;
}
.image-text1 {
  height: 499px;
  width: 100%;
}
.image-text1 .text2 {
  width: 540px;
  float: left;
}
.image-text1 .text2 span:first-child {
  display: block;
  margin-bottom: 40px;
}
.image-text1 img {
  width: 551px;
  height: 499px;
  float: right;
}
.image-text2 {
  margin-top: 60px;
  height: 451px;
  position: relative;
  margin-bottom: 77px;
}
.image-text2 img {
  width: 629px;
  height: 451px;
  float: left;
}
.image-text2 .text2 {
  padding: 140px 0 50px 50px;
  display: block;
  margin-bottom: 75px;
}
.image-text3 {
  height: 300px;
}
.image-text3 .text4 {
  padding-top: 11px;
  margin-right: 777px;
  display: block;
}
.image-text3 img {
  float: right;
  width: 708px;
  height: 444px;
}
.text4 {
  margin-bottom: 75px;
}
.icon {
  display: flex;
  margin-top: 100px;
  margin-bottom: 16px;
}
</style>
