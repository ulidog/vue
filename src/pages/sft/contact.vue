<style scoped>
.about-us {
  width: 100%;
  margin-top: 60px;
}
.header-img,
.header-img img {
  width: 100%;
}
.content-us {
  display: flex;
  padding: 160px 140px 200px;
  position: relative;
}
.Profile,
.testinout {
  flex: 0 0 50%;
}

.map {
  width: 100%;
  height: 630px !important;
}
/* .Profile {
  display: block;
  background: #fff;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  line-height: 26px;
  color: #333;
  margin-left: 336px;
  margin-right: 319px;
} */
.Profile>p {
  display: inline-block;
  font-weight: 100;
  font-size: 1.25em;
  color: #333333;
  line-height: 30px;
  text-indent: 2em;
  margin-bottom: 1em;
}
.mapaddress {
  /* background: url(../image/graymap.png) -4px no-repeat; */
  border-top: 1px dashed #ccc;
}
.testinout {
  text-align: center;
}
.testinout .title {
  font-size: 36px;
  color: #444;
  width: 75%;
  text-align: left;
  margin: 0 auto 20px;
}
.testinout input {
  display: inline-block;
  width: 75%;
  height: 45px;
  font-size: 18px;
  border: 1px solid #ABD2FA;
  text-align: left;
  color: #333;
  text-indent: 1em;
  border-radius: 3px;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.form-group>label {
  width: 75%;
  text-align: left;
  position: absolute;
  bottom: -20px;
  color: red;
  display: none;
}
.form-group.error>input,
.form-group.error>>>textarea {
  color: red;
  border-color: red;
}
.form-group.error>label {
  display: inline-block;
}
.testinout>>>textarea {
  padding: 10px;
  display: inline-block;
  width: 75%;
  height: 160px;
  border: 1px solid #dfdfdf;
  font-size: 18px;
  resize: none;
}
.buttom-sub {
  height: 50px;
  width: 30%;
  background: #4EA1FF;
  margin: 20px auto;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 0.5s ease;
  cursor: pointer;
}
.buttom-sub:hover {
  box-shadow: 10px 10px 10px -5px #ddd;
}
.buttom-sub>a{
  color: #fff;
}
.homeowner-bord {
  padding-top: 15px;
  position: absolute;
  bottom: 20px;
  width: 40%;
}
.homeowner-bord p {
  padding-top: 15px;
  font-size: 20px;
}
.homeowner-bord a {
  display: inline-block;
  width: 150px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #499ded;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
}
</style>

<template>
  <div class="about-us">
    <header class="header-img">
      <img src="/static/img/sft/contact_banner.png" alt="contact_banner.png">
    </header>
    <section class="content-us">
      <div class="Profile">
        <p>Ebuyhouse is the world’s first platform to connect homebuyers, sellers and renters directly, free of charge and without the use of real estate agents. The innovative platform integrates nearly every aspect of real estate transactions, streamlining the process and saving you money.</p>
        <p>Users can take advantage of the Ebuyhouse SFT Transaction method, which allows perspective homebuyers the option of living in a home on a trial basis before completing the transaction. This revolutionary method of buying and selling real estate has forever changed the industry. </p>
        <p>Also, by eliminating real estate agents from the equation, we've also eliminated the hidden fees and costly commissions. At Ebuyhouse, we believe that buying, selling and renting real estate property should be as simple and secure as any other e-commerce transaction.</p>
        <p>Ebuyhouse launched in 2018 and is headquarted in Las Vegas, Nevada</p>
        <section class="homeowner-bord">
          <p class="mapaddress"></p>
          <p>
            <label>5430 W. Sahara Ave, Las Vegas, NV, 89146</label>
          </p>
          <p style="margin-bottom: 30px;">
            <label>(702) 916 3883</label>
          </p>
          <p class="mapaddress"></p>
        </section>
      </div>
      <section class="testinout">
        <ul>
          <li class="title">
            <h4>Leave a message</h4>
          </li>
          <li :class="['form-group', ruleChange.username ? 'success' : 'error']">
            <input
              type="text"
              id="contact"
              name="contact"
              required
              placeholder="Name"
              class="form-control"
              aria-required="true"
              v-model="form.userName"
            >
            <label>{{ruleChange.usernamemsg}}</label>
          </li>
          <li :class="['form-group', ruleChange.email ? 'success' : 'error']">
            <input
              type="text"
              name="email"
              required
              placeholder="Email"
              class="form-control"
              aria-required="true"
              v-model="form.email"
            >
            <label>{{ruleChange.emailmsg}}</label>
          </li>
          <li class="form-group">
            <input
              type="text"
              name="Phone"
              required
              placeholder="Phone"
              class="form-control"
              aria-required="true"
              v-model="form.phoneNumber"
            >
            <label></label>
          </li>
          <li :class="['form-group', ruleChange.content ? 'success' : 'error']">
            <el-input
              type="textarea"
              required
              id="message"
              name="message"
              class="form-control"
              aria-required="true"
              v-model="form.content"
              placeholder="What would you like to send?"
            ></el-input>
            <label>{{ruleChange.contentmsg}}</label>
          </li>
          <li class="buttom-sub" @click="submitForm">
            <a href="javascript:;">Send</a>
          </li>
        </ul>
      </section>
    </section>

    <google-map
      class="map"
      :center="mapInfo.mapCenter"
      :zoom="mapInfo.mapZoom"
      :marsks="mapInfo.mapMarsks"
    ></google-map>
  </div>
</template>

<script>
import googleMap from '@/components/listing/googleMap'
export default {
  components: {
    'google-map': googleMap
  },
  data () {
    return {
      mapInfo: {
        mapCenter: {
          lat: 36.1458834,
          lng: -115.2148483
        },
        mapZoom: 16,
        mapMarsks: {
          isShow: true,
          number: 1,
          marsksList: [
            {
              id: 0,
              position: {
                lat: 36.1458835,
                lng: -115.2148485
              }
            }
          ]
        }
      },
      form: {},
      ruleChange: {
        username: true,
        email: true,
        content: true,
        usernamemsg: null,
        emailmsg: null,
        contentmsg: null
      }
    }
  },
  methods: {
    submitForm () {
      const _this = this
      if (!_this.checkSubmitFrom()) return
      let cloneForm = Object.assign({}, _this.form)
      cloneForm.phoneNumber = cloneForm.phoneNumber ? cloneForm.phoneNumber.toString().replace(/((?![0-9]).)+/g, '') : null
      _this
        .$axios({
          url: `${this.ljj_path}content-us/insertion`,
          method: 'POST',
          params: cloneForm
        })
        .then(res => {
          // console.log(res)
          if (res.data.success) {
            _this.$message.success(res.data.msg)
            _this.form = {}
          } else {
            _this.$message.error(res.data.msg)
          }
        })
    },
    checkSubmitFrom () {
      console.log(this.form.username)
      if (!this.form.userName) {
        this.ruleChange.username = false
        this.ruleChange.usernamemsg = 'Please enter a contact name'
        return false
      } else {
        this.ruleChange.username = true
      }
      if (!this.form.email) {
        this.ruleChange.email = false
        this.ruleChange.emailmsg = 'Please enter the contact email address'
        return false
      } else {
        if (new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(this.form.email)) {
          this.ruleChange.email = true
        } else {
          this.ruleChange.email = false
          this.ruleChange.emailmsg = 'Please input the correct email address'
          return false
        }
      }
      if (!this.form.content) {
        this.ruleChange.content = false
        this.ruleChange.contentmsg = ''
        return false
      } else {
        this.ruleChange.content = true
      }
      return true
    }
  },
  mounted () {}
}
</script>
