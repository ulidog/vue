<template>
  <div class="step-card" :style="`top: ${stepCardTop}; left: ${stepCardLeft}`">
    <div class="step-card-head">
        <em class="step-card-tag"></em>
        <em class="step-card-close el-icon-close" @click="goCloseItem"></em>
    </div>
    <div class="step-card-body">
        <div class="step-title">{{stepCard.title}}</div>
        <div class="step-detail">{{stepCard.detail}}</div>
        <div class="step-button">
            <el-button type="danger" @click="goNextItem">Next</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    stepCard: {
      type: Object,
      default () {
        return {
          position: '100px 100px',
          title: 'Step 1',
          detail: 'Send an offer to the landlord'
        }
      }
    }
  },
  computed: {
    stepCardTop () {
      var val = this.stepCard.position.split(' ')[0]
      return val.search('px') !== -1 ? val : val + '%'
    },
    stepCardLeft () {
      var val = this.stepCard.position.split(' ')[1]
      return val.search('px') !== -1 ? val : val + '%'
    }
  },
  methods: {
    goNextItem () {
      this.$emit('goNextItem')
    },
    goCloseItem () {
      this.$emit('goCloseItem')
    }
  }
}
</script>

<style>
.overHide {
  overflow: hidden;
}
.step-card {
  position: absolute;
  width: 32%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.3)
}
.step-card-tag {
    position: absolute;
    top: -14px;
    left: -14px;
    width: 60px;
    height: 60px;
    background-image: url('/static/img/step/quetion.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.step-card-close {
    cursor: pointer;
    color: #999;
    transition: all 0.5s;
    font-size: 18px;
    position: absolute;
    right: 35px;
    top: 20px;
}
.step-card-close:hover {
    color: #444;
    font-size: 20px;
}
.step-card-body {
  padding: 90px 35px 35px 40px;
  color: #D91317;
}
.step-card-body {
    font-size: 30px;
    line-height: 48px;
}
.step-button {
    text-align: right;
    margin-top: 30px;
}
.step-button .el-button {
    color: #fff;
    width: 160px;
    background: linear-gradient(left, #F8464A, #D91317)
}

</style>
