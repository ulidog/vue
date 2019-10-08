<template>
  <div class="module-container">
    <div class="request-type-group">
      <!-- <div class="group-title">Listing Type</div> -->
      <el-radio-group class="group-btns" v-model="listingType" @change="changeType">
        <el-radio border class="group-item" label="sell">Sell</el-radio>
        <el-radio border class="group-item" label="rent">Rent</el-radio>
      </el-radio-group>
    </div>
    <div class="request-state-group">
      <!-- <div class="group-title">Listing Status</div> -->
      <el-radio-group v-model="listingState" @change="changeState">
        <el-radio label="available">Available</el-radio>
        <el-radio label="inAudit">Check</el-radio>
        <!-- <el-radio border label="trading">In Progress</el-radio>
        <el-radio label="traded">Completed</el-radio> -->
        <el-radio label="soldOut">Sold</el-radio>
        <el-radio label="refused">Refused</el-radio>
      </el-radio-group>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'listingType': '',
      'listingState': ''
    }
  },
  'methods': {
    changeType (_type) {
      this.$router.push({'path': `/userCenter/listing/${_type}`})
    },
    changeState (_state) {
      this.$router.push({'path': `/userCenter/listing/${this.listingType}/${_state}`})
    }
  },
  created () {
    const routeWordArr = this.$route.fullPath.split('/')
    this.listingState = routeWordArr.pop()
    this.listingType = routeWordArr.pop()
  },
  updated () {
    const routeWordArr = this.$route.fullPath.split('/')
    this.listingState = routeWordArr.pop()
    this.listingType = routeWordArr.pop()
  }
}
</script>

<style lang="scss" scoped>
.module-container{
  padding-top: 2em;
  padding-bottom: 2em;
  background-color: #ffffff;
  margin-left: 20px;
}

.request-type-group,
.request-state-group {
  padding-left: 30px;
  margin-bottom: 0.5em;
  display: flex;
  height: 40px;
  align-items: center;
}

.group-title{
  white-space: nowrap;
  font-size: 1.2em;
  line-height: 40px;
  margin-right: 0.8em;
  color: #323232;
}

/deep/ .el-radio.is-bordered{
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  color: #323232;
}

/deep/ .el-radio.is-bordered+.el-radio.is-bordered{
  margin-left: 0;
}
/deep/ .group-btns .group-item {
  padding: 0;
  border: 0;
}
/deep/ .group-btns .group-item .el-radio__input{
  display: none;
}
/deep/ .group-btns .group-item .el-radio__label {
  border: none;
  font-size: 22px;
  color: #444;
  height: 40px;
  padding: 0 14px;
  display: flex;
  align-items: center;
}
/deep/ .group-btns .group-item.is-checked .el-radio__label {
  background: linear-gradient(to right, #63a9f7, #1381fc);
  border: none;
  height: 40px;
  padding: 0 14px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #fff;
  transition: all .3s ease;
}
</style>
