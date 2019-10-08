<template>
  <div class="part-container">
    <el-radio-group class="group-btns" v-model="type" @change="changeType">
      <el-radio class="group-item" label="sale">Sale</el-radio>
      <el-radio class="group-item" label="rentOut">Rental</el-radio>
      <el-radio class="group-item" label="buy">Purchase Requests</el-radio>
      <el-radio class="group-item" label="rentIn">Rental Requests</el-radio>
    </el-radio-group>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'type': ''
    }
  },
  'methods': {
    changeType (_t) {
      this.type = _t
      this.$router.push({'path': `/userCenter/collection/${_t}`})
    }
  },
  created () {
    this.type = this.$route.fullPath.split('/').pop()
  }
}
</script>

<style lang="scss" scoped>
.part-container{
  padding-top: 2em;
  padding-bottom: 2em;
  background-color: #ffffff;
  margin-left: 20px;
  padding-bottom: 50px;
}

.part-container>.el-radio-group:first-child{
  font-size: 1em;
  display: block;
  // text-align: center;
  user-select: none;
  padding-left: 30px;
}

/deep/ .el-radio-button__inner{
  border-left: 1px solid #dcdfe6;
  border-radius: 4px!important;
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
