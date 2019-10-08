<style scoped>
.el-checkbox-group{
  margin-left: 3%;
}

.floor-body{
  padding-left: 5%;
  overflow: hidden;
}
</style>

<template>
  <div>
    <div class="part-container" v-for="item in communityDetailsData" :key="item.id">
      <h4>{{item.attrKey}}</h4>
      <div class="part-body">
        <div class="floor-group">
          <div class="floor-body">
            <el-radio v-model="communityDetailsCheckList" v-for="(childItem, index) in item.ebhHouseExtValues" :key="childItem.attrValue + index"  :label="childItem.id">{{childItem.attrValue}}</el-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'communityDetailsData': [],
      'communityDetailsCheckList': []
    }
  },
  'props': {
    'isSubmitNow': {
      'type': Boolean,
      'default': false
    }
  },
  'watch': {
    isSubmitNow (_new, _old) {
      if (!_new) return
      this.$emit(
        'collectData',
        {
          'flag': true,
          'houseExtarStr2': [this.communityDetailsCheckList]
        }
      )
    }
  },
  'methods': {
    getCommunityDetailsData () {
      const _this = this
      this.$axios({
        'method': 'get',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/select/extar`,
        'params': {dealType: 2}
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data
            _this.communityDetailsData = arr.map(item => item).filter(item => {
              return item.attrKey === 'Pet'
            })
          }
        })
        .catch(error => {
          if (error) {}
        })
    }
  },
  mounted () {
    this.getCommunityDetailsData()
  }
}
</script>
