<style scoped>

</style>

<template>
  <div>
    <vue-basic-info :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-basic-info>
    <vue-features :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-features>
    <vue-building-info :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-building-info>
    <vue-utility-details :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-utility-details>
    <!-- <vue-pet :isSubmitNow="isSubmitNow" @collectData="collectData"></vue-pet> -->
    <vue-describe :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm">
      <h4>
        Property Description
        &ensp;
        <span class="title-tip">Writing a detailed description of what's unique about your home, and what's around the neighborhood can increase the chances of someone renting it out. (1000 Characters Allowed)</span>
      </h4>
    </vue-describe>
    <vue-attach-label :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-attach-label>
    <vue-contact-info :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm">
      <h4>
        Contact Information
        &ensp;
        <span class="title-tip">Potential renters will contact you through your phone number, email or via message board on Ebuyhouse platforms.</span>
      </h4>
    </vue-contact-info>
    <vue-disclaimer :isSubmitNow="isSubmitNow" @collectData="collectData" :editForm="editForm"></vue-disclaimer>
    <!-- 操作指引 -->
    <!-- 无关组件表单数据提交时 请测试是否能发布 -->
    <!-- 如果有添加无关表单提交组件请将当前_this.$children.length长度减去你无关组件数据 或者使用collectData向上传递一个{flag: true}对象 -->
    <vue-step-carousle :stepIndex="stepIndex" :stepModule="stepSale"></vue-step-carousle>
  </div>
</template>

<script>
import stepCarousle from '@/components/step/stepModule/stepRent' // 引入操作步骤指引组件
import VueBasicInfo from '@/components/release/sale/basicInfo.vue'
import VueFeatures from '@/components/release/rentOut/features.vue'
import VueBuildingInfo from '@/components/release/sale/buildingInfo.vue'
import VueUtilityDetails from '@/components/release/sale/utilityDetails.vue'
import VuePet from '@/components/release/rentOut/pet.vue'
import VueDisclaimer from '@/components/release/rentOut/disclaimer.vue'
import VueDescribeHome from '@/components/release/sale/describe.vue'
import VueAttachLabel from '@/components/release/sale/attachLabel.vue'
import VueContactInfo from '@/components/release/sale/contactInfo.vue'
import stepMock from '@/utils/mock' // step JSON
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      'data': {
        'http_path': `${this.SH_HOUSE_PROD_PATH}thouses/insert`,
        // 'http_path': 'http://192.168.0.189:9209/web/thouses/insert',
        'origin': 1,
        'backURL': 1,
        'houseId': null
      },
      'isChecked': false,
      // 开关收集器 控制整个页面的flag开关 跟页面组件向上传值关联 当所有的数据都准备好应该是等于当前开关总数
      'collectDataTimes': 0,
      // 收集数据的总开关
      'isStopCollectData': false,
      // 提交数据的定时器
      'submitTimer': 0,
      'stepIndex': 1, // 步骤初始索引
      // 'editForm': null
      'editForm': null
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    }),
    stepSale () {
      return stepMock.stepSale
    }
  },
  components: {
    'vue-step-carousle': stepCarousle, // 注册操作步骤组件
    'vue-basic-info': VueBasicInfo,
    'vue-features': VueFeatures,
    'vue-building-info': VueBuildingInfo,
    'vue-utility-details': VueUtilityDetails,
    'vue-pet': VuePet,
    'vue-disclaimer': VueDisclaimer,
    'vue-describe': VueDescribeHome,
    'vue-attach-label': VueAttachLabel,
    'vue-contact-info': VueContactInfo
  },
  'provide': {
    'downForm': {'dealType': 5}
  },
  'props': {
    'isSubmitNow': {
      'type': Boolean,
      'default': false
    }
  },
  'watch': {
    isSubmitNow: {
      handler (_new, _old) {
        if (!_new) {
          this.collectDataTimes = 0
          this.isStopCollectData = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  'methods': {
    collectData (_data) {
      // console.log(_data, this.$children)
      const _this = this
      if (_this.isStopCollectData) return
      if (_data.flag) {
        Object.assign(_this.data, _data)
        _this.collectDataTimes++
        // console.log(_this.collectDataTimes, _this.$children.length)
        // 如果有添加无关表单提交组件请将当前_this.$children.length长度减去你无关组件数据 或者使用collectData向上传递一个{flag: true}对象
        if (_this.collectDataTimes >= _this.$children.length - 1) {
          window.clearTimeout(_this.submitTimer)
          _this.submitTimer = window.setTimeout(() => { _this.$emit('submit', _this.data) }, 0)
        }
      } else {
        _this.isStopCollectData = true
        _this.$emit('submit', _data)
      }
    },
    fetchEditHouseInfo (_houseId) {
      const _this = this
      _this.$axios({
        url: `${_this.SH_HOUSE_PROD_PATH}thouses/need/item`,
        method: 'GET',
        params: {
          houseId: _houseId
        }
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          _this.editForm = res.data.data
        }
      })
    }
  },
  created () {
    try {
      if (this.token && this.$route.params.type === 'edit' && !!this.$route.params.houseId) {
        this.fetchEditHouseInfo(this.$route.params.houseId)
        this.data.http_path = `${this.SH_HOUSE_PROD_PATH}thouses/update/house`
        this.data.houseId = this.$route.params.houseId
      }
    } catch (error) {
      console.log('修改传递参数有误！请合正后再试！当前为新发布房源！')
    }
  }
}
</script>
