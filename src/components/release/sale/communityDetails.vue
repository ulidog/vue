<style scoped>
.floor-group{
  width: 96%;
  margin-left: 3%;
  margin-bottom: 2em;
}

.floor-group:last-child{
  margin-bottom: 0;
}

.floor-title{
  font-size: 1.2rem;
}

.floor-body{
  padding-left: 5%;
  overflow: hidden;
}

.el-checkbox{
  display: block;
  float: left;
  width: 24.5%;
  margin-top: 1rem;
}

.el-checkbox+.el-checkbox{
  margin-left: 0;
}
</style>

<template>
  <div>
    <div class="part-container" v-for="item in communityDetailsData" :key="item.id">
      <h4>{{item.attrKey}}</h4>
      <div class="part-body">
        <div class="floor-group">
          <div class="floor-body">
            <el-checkbox
              v-for="(childItem, index) in item.ebhHouseExtValues"
              :key="childItem.attrValue + index"
              :label="childItem.id"
              v-model="communityDetailsCheckList"
            >
              {{childItem.attrValue}}
            </el-checkbox>
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
          'houseExtarStr2': this.communityDetailsCheckList
        }
      )
    }
  },
  'methods': {
    getCommunityDetailsData () {
      const _this = this
      this.$axios({
        'method': 'get',
        'url': `${this.SH_HOUSE_PROD_PATH}thouses/select/extar`
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data
            _this.communityDetailsData = arr.map(item => item).filter(item => {
              return item.tier === 1
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
