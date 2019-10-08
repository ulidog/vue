<style lang="sass" scoped>
  @media screen and (max-width: 1300px)
    .el-footer
  @media screen and (min-width: 1300px)
    .el-footer
  @media screen and (min-width: 1515px)
    .el-footer
  @media screen and (max-width: 505px)
    .el-footer
      .share-part
        padding-bottom: 15px
</style>
<style scoped>
.el-footer{
  height: auto !important;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  background-color: #909090;
}

.share-part{
  display: flex;
  min-height: 3rem;
  padding-left: 15%;
  padding-right: 15%;
  background-color: #646464;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.logo-wrap{
  /* float: left; */
  /* width: 15%; */
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.logo-wrap>img{
  height: 100%;
}

.share-btn-box{
  /* float: right; */
  width: 26rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.share-btn-box>div{
  width: 2.25rem;
  height: 2.25rem;
  padding-left: 1.7%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  cursor: pointer;
}
.share-btn-box>div>a{
  display: inline-block;
  width: 100%;
  height: 100%;
}

.btn-twitter{
  background-image: url(/static/img/common/footer/twitter_gray.png);
}

.btn-twitter:hover{
  background-image: url(/static/img/common/footer/twitter_blue.png);
}

.btn-facebook{
  background-image: url(/static/img/common/footer/facebook_gray.png);
}

.btn-facebook:hover{
  background-image: url(/static/img/common/footer/facebook_blue.png);
}

.btn-yelp{
  background-image: url(/static/img/common/footer/yelp_gray.png);
}

.btn-yelp:hover{
  background-image: url(/static/img/common/footer/yelp_blue.png);
}

.btn-camera{
  background-image: url(/static/img/common/footer/camera_gray.png);
}

.btn-camera:hover{
  background-image: url(/static/img/common/footer/camera_blue.png);
}

.main-part{
  display: flex;
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: #909090;
  overflow: hidden;
  flex-wrap: wrap;
}

.company-info-part dt,
.tips-part dt,
.download-part dt{
  color: #ececec;
  font-weight: bold;
  line-height: 2.5rem;
  font-size: 1.2rem;
}

.company-info-part dd,
.tips-part dd,
.download-part dd{
  color: #e2e2e2;
  line-height: 2.5rem;
}

.company-info-part dd{
  display: flex;
  align-items: center;
}

.company-info-part img{
  width: 1.1rem;
  margin-right: 0.5rem;
}

.download-part dd:nth-child(2){
  height: 5rem;
  line-height: 0;
  display: flex;
  align-items: center;
}

.download-part dd:nth-child(2) .placeholder{
  width: 4%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

.download-part dd:nth-child(2) img{
  width: 48%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  cursor: pointer;
}

.download-part dd:nth-child(4) a{
  color: #4e7092;
}

.download-part dd:nth-child(4) a:hover{
  text-decoration: underline;
}

.copyright{
  background-color: #909090;
  border-top: 1px solid #818181;
  line-height: 2em;
  text-align: center;
  color: #646464;
}
.tips-part {
  display: flex;
  flex-direction: column;
  justify-content: initial;
  width: 31%;
}
.tips-part a {
  color: #fff;
}
.tips-part a:hover {
  color: #1281FC;
}
.copyright {
  height: 32px;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
}
.copyright .content {
  position: absolute;
  bottom: 17px;
  background: #909090;
  color: #fff;
  padding: 0 30px;
}
.copyright .content .hrefList{
  color: #fff;
  display: flex;
}
.copyright .content .hrefList li::after {
  content: '|';
  padding: 0 5px;
}
.copyright .content .hrefList li:last-child:after {
  content: '';
}
.copyright .content .hrefList li a {
  color: #fff;
}
.blogSty {
  color: #fff;
  font-family: monospace;
  font-weight: bold;
}
.blogHref>a {
  color: #fff;
  font-family: -webkit-pictograph;
  font-size: 20px;
}
.blogHref>a:hover {
  color: #0097a7;
}
</style>

<template>
  <footer ref="common-footer">
    <div class="share-part">
      <div class="logo-wrap">
        <img src="/static/img/common/footer/bottom_logo.png" />
      </div>
      <div class="share-btn-box">
        <img src="/static/img/common/footer/fllow.png" alt="">
        <div class="btn-twitter">
          <a href="https://twitter.com/ebuyhouseinc/"></a>
        </div>
        <div class="btn-facebook">
          <a href="https://www.facebook.com/ebuyhouseinc/"></a>
        </div>
        <div class="btn-yelp">
          <a href="https://www.yelp.com/biz/ebuyhouse-las-vegas"></a>
        </div>
        <div class="btn-camera">
          <a href="https://www.instagram.com/ebuyhouseinc/"></a>
        </div>
      </div>
    </div>
    <div class="main-part">
      <dl class="company-info-part">
        <dt>Company Information</dt>
        <dd>
          <img src="/static/img/common/footer/bottom_address.png" />
          <span>5430 W. Sahara Ave, Las Vegas, NV, 89146</span>
        </dd>
        <dd>
          <img src="/static/img/common/footer/bottom_phone.png" />
          <a href="tel:7029163883"><span style="color: #fff; text-decoration: underline;">(702) 916 3883</span></a>
        </dd>
        <dd class="link">
          <img src="/static/img/common/footer/bottom_email.png" />
          <!-- <router-link style="color: #fff;" tag="a" target="_blank" to="/sft/contactus"> -->
          <a href="mailto:customersupport@ebuyhouse.com" style="color: #fff;">
            <span>customersupport@ebuyhouse.com</span>
          </a>
          <!-- </router-link> -->
        </dd>
      </dl>
      <!-- <dl class="tips-part">
        <dt>Tips</dt>
        <dd><a href="/privacypolicy" target="view_window">Terms of Use</a></dd>
        <dd><a href="/termsofuse" target="view_window">Privacy Policy</a></dd>
      </dl> -->
      <dl class="tips-part">
        <dt class="blogSty">Visit Our Blog</dt>
        <!-- <dd class="blogHref"><a href="/information" target="view_window">https://www.ebuyhouse.com/information</a></dd> -->
        <dd class="blogHref"><a href="http://www.ebuyhouse.com/blog" target="view_window">http://www.ebuyhouse.com/blog</a></dd>
      </dl>
      <dl class="download-part">
        <dt>Download our App</dt>
        <dd>
          <img src="/static/img/common/footer/googlePlay.png" onclick="window.open('https://play.google.com/store/apps/details?id=com.ebuyhouse.house')" />
          <div class="placeholder"></div>
          <img src="/static/img/common/footer/appStore.png" onclick="window.open('https://itunes.apple.com/app/id1414793581?mt=8')" />
        </dd>
        <!-- <dd>Visit Our Information Blog</dd>
        <dd><a href="http://www.ebuyhouse.com/blog" target="_blank">http://www.ebuyhouse.com/information</a></dd> -->
      </dl>
    </div>
    <div class="copyright">
      <div class="content">
        <span class="copy">© 2019 Ebuyhouse, Inc. All Rights Reserved</span>
        <ul class="hrefList">
          <li><a href="https://www.ebuyhouse.com/blog/disclaimer" target="view_window">Disclaimer</a></li>
          <li><a href="https://www.ebuyhouse.com/blog/terms-of-use/" target="view_window">Terms of Use</a></li>
          <li><a href="https://www.ebuyhouse.com/blog/privacy-policy/" target="view_window">Privacy Policy</a></li>
          <li><a href="https://www.ebuyhouse.com/blog/dmca/" target="view_window" rel="noopener noreferrer">DMCA</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    getElementOffsetTop () {
      const elOffsetTop = this.$refs['common-footer'].offsetTop
      if (elOffsetTop) {
        this.$emit('handleMaxRefOffsetHeight', elOffsetTop)
      }
    }
  },
  updated () {
    this.getElementOffsetTop()
  },
  mounted () {
    this.getElementOffsetTop()
    window.addEventListener('scroll', this.getElementOffsetTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.getElementOffsetTop)
  }
}
</script>
