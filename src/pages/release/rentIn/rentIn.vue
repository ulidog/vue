<style scoped>
  .notice {
    margin-bottom: 20px;
  }
</style>

<template>
  <div>
    <el-alert
      class="notice"
      title="Looking to rent, but can’t find what you need? Cancel the days looking through listings! Let prospective landlords find you! Tell us where you are looking and what you are looking for in a home!"
      type="warning"
    ></el-alert>

    <vue-features :isSubmitNow="isSubmitNow" @collectData="collectData"></vue-features>
    <vue-pet :isSubmitNow="isSubmitNow" @collectData="collectData"></vue-pet>
    <vue-describe :isSubmitNow="isSubmitNow" :placeText="placeText" @collectData="collectData">
      <h4>
        Property requirement&ensp;
        <span
          class="title-tip"
        >Describing your needs/wants in detail makes it easier to connect you with appropriate rentals</span>
      </h4>
    </vue-describe>
    <vue-attach-label :isSubmitNow="isSubmitNow" @collectData="collectData"></vue-attach-label>
    <vue-contact-info :isSubmitNow="isSubmitNow" @collectData="collectData">
      <h4>
        Contact Information&ensp;
        <span class="title-tip"></span>
      </h4>
    </vue-contact-info>
  </div>
</template>

<script>
import VueFeatures from '@/components/release/rentIn/features.vue'
import VuePet from '@/components/release/rentIn/pet.vue'
import VueDescribeHome from '@/components/release/sale/describe.vue'
import VueAttachLabel from '@/components/release/buy/attachLabel.vue'
import VueContactInfo from '@/components/release/sale/contactInfo.vue'

export default {
  data () {
    return {
      data: {
        http_path: `${this.zjc_path}insertHouseNeed`,
        // 'http_path': 'http://192.168.0.189:9209/web/thouses/insert',
        origin: 1,
        releaseType: 1,
        backURL: 3
      },
      placeText: 'Tell us what you want in a rental home',
      // 开关收集器 控制整个页面的flag开关 跟页面组件向上传值关联 当所有的数据都准备好应该是等于当前开关总数
      collectDataTimes: 0,
      // 收集数据的总开关
      isStopCollectData: false,
      // 提交数据的定时器
      submitTimer: 0
    }
  },
  components: {
    'vue-features': VueFeatures,
    'vue-pet': VuePet,
    'vue-describe': VueDescribeHome,
    'vue-attach-label': VueAttachLabel,
    'vue-contact-info': VueContactInfo
  },
  props: {
    isSubmitNow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (!_new) {
        this.collectDataTimes = 0
        this.isStopCollectData = false
      }
    }
  },
  methods: {
    collectData (_data) {
      const _this = this
      if (_this.isStopCollectData) return
      if (_data.flag) {
        Object.assign(_this.data, _data)
        if (++_this.collectDataTimes >= _this.$children.length - 1) {
          window.clearTimeout(_this.submitTimer)
          _this.submitTimer = window.setTimeout(() => {
            _this.submit()
          }, 100)
        }
      } else {
        _this.isStopCollectData = true
        _this.$emit('submit', _data)
        _this.isStopCollectData = false
        _this.collectDataTimes = 0
      }
    },
    submit () {
      const data = {
        cityId: this.data.cityID,
        stateId: this.data.stateID,
        priceMin: this.data.minPrice,
        priceMax: this.data.maxPrice,
        bedroom: this.data.bedroomCount,
        bathroom: this.data.bathroomCount,
        garage: this.data.garageCount,
        livingSqlfMax: this.data.livingSqft,
        houseTypeId: this.data.housingType,
        additionalInformation: this.data.remark,
        labelId: this.data.labelExtar,
        label_name: this.data.advantage,
        contactName: this.data.contactName,
        contactPhone: this.data.contactPhone,
        contactEmail: this.data.contactEmail
      }
      this.$emit('submit', Object.assign({}, { flag: true }, this.data, data))
    }
  },
  mounted () {
  }
}
</script>
