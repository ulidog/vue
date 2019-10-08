<template>
  <div class="toolbar-container">
    <div class="toolbar">
      <ul>
        <!-- <li class="close"><i></i></li> -->
        <!-- <li class="collect"><i></i></li> -->
        <!-- <li class="qrcode"><i></i></li> -->
        <!-- <li class="message" @click="openMessage"><i></i></li> -->
        <!-- <li class="visitors"><i></i></li> -->
        <!-- <li class="backtop" @click="backtop"><i></i></li> -->
      </ul>
    </div>
    <section class="msg" v-if="isShowIcon">
      <div class="onOpenMessage" @click="openMessage"></div>
      <img class="closeMessage" @click="isShowIcon = !isShowIcon" src="/static/img/common/toolbar/close_blue.png" alt="close">
    </section>
    <section class="rightModule" v-else>
      <section class="viewMessageIcon" @click="openMessage">
        <section class="box">Customer Service</section>
      </section>
    </section>
    <!-- <div class="toolbar-add">
      <ul>
        <li class="step" @click="openStep"><i></i></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
// import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      isShowIcon: true,
      backtopFrameID: 0
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  methods: {
    ...mapMutations({
      openMessages: 'openMessage',
      openSteps: 'openStep'
    }),
    backtop () {
      window.scrollTo(0, 0)
      // window.cancelAnimationFrame(this.backtopFrameID);
      // const scroll = () => {
      //   let axisYTo = 0.8 * window.scrollY;
      //   if (axisYTo < 1) axisYTo = 0;
      //   window.scrollTo(0, axisYTo);
      //   if (axisYTo > 0) this.backtopFrameID = window.requestAnimationFrame(scroll);
      // };
      // scroll();
    },
    openMessage () {
      if (this.token) {
        this.openMessages(true)
      } else {
        this.$store.commit('signOut', true)
        this.$router.push({
          path: '/sft/contactus'
        })
      }
    },
    openStep () {
      this.openSteps()
      this.isOpenSelect()
    },
    isOpenSelect () {
      if (this.$route.path === '/index') {
        this.$emit('showStepComponent', true)
        console.log('up上')
      }
    }
  }
}
</script>

<style scoped>
.toolbar-container{
  position: fixed;
  right: 0;
  top: 60%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 99;
}
.toolbar{
  width: 2.8rem;
  background-color: #ffffff;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  box-shadow: -1px 1px 5px rgba(0,0,0,.1);
  transition: all 0.5s
}
.toolbar:hover{
  box-shadow: -1px 1px 5px rgba(0,0,0,.3)
}
.toolbar-add{
  width: 2.8rem;
}
.toolbar-add ul li{
  margin: 0.8rem 0;
  width: 2.8rem;
  height: 2.8rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100% auto;
  cursor: pointer;
}

.toolbar ul li{
  width: 100%;
  height: 2.8rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% auto;
  cursor: pointer;
}

.toolbar ul li:first-child{
  border-top-left-radius: 0.8rem;
}

.toolbar ul li:last-child{
  border-bottom-left-radius: 0.8rem;
}

.toolbar ul li.close{
  background-image: url(/static/img/common/toolbar/close_gray.png);
}

.toolbar ul li.close:hover{
  background-image: url(/static/img/common/toolbar/close_blue.png);
}

.toolbar ul li.collect{
  background-image: url(/static/img/common/toolbar/collect_gray.png);
}

.toolbar ul li.collect:hover{
  background-image: url(/static/img/common/toolbar/collect_blue.png);
}

.toolbar ul li.qrcode{
  background-image: url(/static/img/common/toolbar/qrcode_gray.png);
}

.toolbar ul li.qrcode:hover{
  background-image: url(/static/img/common/toolbar/qrcode_blue.png);
}

.toolbar ul li.message{
  background-image: url(/static/img/common/toolbar/home_message.png);
}

.toolbar ul li.message:hover{
  background-image: url(/static/img/common/toolbar/home_message.png);
}

.toolbar ul li.visitors{
  background-image: url(/static/img/common/toolbar/visitors_gray.png);
}

.toolbar ul li.visitors:hover{
  background-image: url(/static/img/common/toolbar/visitors_blue.png);
}

.toolbar ul li.backtop{
  background-image: url(/static/img/common/toolbar/backtop_gray.png);
}

.toolbar ul li.backtop:hover{
  background-image: url(/static/img/common/toolbar/backtop_blue.png);
}
.toolbar-add ul li.step{
  background-image: url(/static/img/common/toolbar/guide.png);
}
.toolbar-add ul li.step:hover{
  background-image: url(/static/img/common/toolbar/guide_click.png);
}
.msg {
  position: absolute;
  right: 50px;
  top: 200px;
}
.msg>.onOpenMessage {
  cursor: pointer;
  width: 112px;
  height: 70px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(/static/img/message/home_Customerservice.png);
}
.msg>.onOpenMessage:hover {
  background-image: url(/static/img/message/home_Customerservice_click.png);
}
.closeMessage {
  position: absolute;
  top: -20px;
  right: 0;
  cursor: pointer;
}
/* rightModule
viewMessageIcon
box */
.rightModule {
  position: fixed;
  right: 0;
  top: 50%;
  /* transform: rotate(90deg) translateY(-128%) translateX(-13%) */
}
.viewMessageIcon {
  height: 100%;
  padding: 10px;
  background-color: #1281fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  border-radius: 3px;
  /* transform: translateY(-5%); */
  cursor: pointer;
}
.viewMessageIcon:hover{
  box-shadow: 0 0 35px 2px rgba(0,0,0,.24);
  transform: translateY(0);
}
.viewMessageIcon>.box{
  white-space: nowrap;
  writing-mode: vertical-rl;
}
</style>
