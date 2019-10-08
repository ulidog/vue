<style scoped>
.echarts {
  position: relative;
  width: 800px;
  height: 400px;
}
.echartsVal {
  position: absolute;
  width: 180px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: right;
}
.countPirce {
  text-align: center;
  color: #444444;
  font-size: 36px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
.unit {
  color: #666666;
}
</style>
<template>
  <div class="echarts">
    <IEcharts class="minArc" :option="bar" />
    <div class="echartsVal">
      <p class="countPirce">${{dataMess.optionValue | priceFormat}}</p>
      <p class="unit">/month</p>
    </div>
  </div>
</template>

<script type="text/babel">
import IEcharts from 'vue-echarts-v3/src/full.js'

export default {
  components: {
    IEcharts
  },
  props: {
    dataMess: {
      optionValue: String,
      param: []
    }
  },
  data () {
    return {
      loading: true,
      bar: {
        color: ['#7C9EFF', '#44B2E5', '#64D1E8', '#64aaE8'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'middle'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [...this.dataMess.param]
          }
        ]
      }
    }
  },
  methods: {
  },
  watch: {
    dataMess: {
      handler: function (val, oldval) {
        console.log(val)
      },
      deep: true, // 对象内部的属性监听，也叫深度监听
      immediate: true
    }
  }
}
</script>
