<template>
  <div>
    <div class="top">
      <img src="/static/img/sft/t1.png" alt>
    </div>
    <div id="mian">
      <div class="image-text1">
        <img class="lf" src="/static/img/sft/t2.png" alt>
        <p class="text1">Not only does the seller avoid paying costly commissions, but the sale process is quicker and simpler. The seller will also benefit from the monthlyrent, which is 0.75% of the asking price.</p>
      </div>
      <div class="image-text2">
        <img class="rt" src="/static/img/sft/t3.png" alt>
        <p class="text2">
          This innovative trading method allows buyers to live in the home for up to three months after making a five percent deposit. If the buyer likes the home, and decides to purchase it, he or she will be reimbursed for one month’s rent. If the buyer decides not to purchase the home, he or she simply pays any due rent, terminates the contract, and returns the home to the seller.
          The buyer will then be refunded the deposit (minus any fees for unpaid rent or damages) within five days.
          Ebuyhouse takes the guesswork out of buying and selling and can save you thousands!
        </p>
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
  name: 'TryBeforeYouBuy'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
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
  line-height: 44px;
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
  min-height: 434px;
}

.image-text1 img {
  width: 600px;
  height: 434px;
}

.image-text2 {
  min-height: 503px;
}

.image-text2 img {
  width: 600px;
  height: 503px;
}
</style>
