<template>
    <div class="floor-bar">
        <div class="top">
            <img src="/static/img/sft/i1.png" alt="">
        </div>
        <div id="mian">
        <div class="image-text1">
            <img class="rt" src="/static/img/sft/i2.png" alt="">
             <p class="text1">
                Whether you are buying or selling, you are protected by the standard Ebuyhouse contract that stipulates the details of each transaction.
                </p>
            <p class="text2">
                Ebuyhouse provides an array of services that allow for flexible interaction between buyers and sellers. From signing the contract to completing the escrow process. All activities are recorded by the platform, and the entire process is transparent, from start to finish.
            </p>
        </div>
        <div class="image-text2">
          <img class="lf" src="/static/img/sft/i3.png" alt="">
          <p class="text3">
            In addition, Ebuyhouse offers a new transaction method, SFT (Secure Fast Trade), that allows buyers to live in the home for up to three months before buying it. Buyers will pay a five percent deposit, up front, within ten days of signing the contract. If they buy, the deposit will be applied toward the purchase of the home. If not, the deposit (minus any unpaid rent fees) will be refunded at the end of the trial period.  If the deposit is not paid in the ten day window, the contract is rendered invalid.
          </p>
        </div>
       <div class="text4">
            <p>
                The rent during the trial period may include utilities and other fees.
            </p><br>
            <p>
                The trial period allows the buyer to test drive the home, so to speak. This way buyers can ensure there are no major defects or other factors that would prevent them from wanting to buy the property.
            </p><br>
            <p>
                Buyers and sellers can leave reviews on our website. Bad reviews may preclude users from using our platform in the future.
            </p>
        </div>
        <ul class="icon">
             <li>
                <a href="http://facebook.com/ebuyhouseinc" target="_blank">
                    <img src="/static/img/sft/facebook.png" alt="">
                </a>
            </li>
            <li>
                <a href="http://twitter.com/ebuyhouseinc" target="_blank">
                <img src="/static/img/sft/twitter.png" alt="">
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/ebuyhouseinc" target="_blank">
                <img src="/static/img/sft/ins.png" alt="">
                </a>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
export default {
  name: 'Innovation'
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.floor-bar{
    background-color: #f5f5f5;
}
.floor-bar .top{
    background-color:#fff;
}
.floor-bar .top img{
    width: 1174px;
    margin: auto;
    display: block;
}
.top{
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
  min-height: 434px;
}

.image-text1 img {
  width: 600px;
  height: 434px;
}

.image-text2 {
  min-height: 398px;
}

.image-text2 img {
  width: 600px;
  height: 398px;
}

</style>
