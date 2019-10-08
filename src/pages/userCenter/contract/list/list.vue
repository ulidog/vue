<style lang='scss' scoped>
.part-containers {
  background-color: #fff;
  padding-top: 1.9em;
  padding-bottom: 2em;
  background-color: #ffffff;
  margin-left: 20px;
  position: relative;
}
.part-containers > .el-radio-group:first-child {
  font-size: 1em;
  display: block;
  user-select: none;
  margin-bottom: 3em;
}
.part-containers > .el-radio-group:nth-child(2) {
  position: absolute;
  top: 90px;
  left: 0;
}

/deep/ .el-radio-button__inner {
  border-left: 1px solid #dcdfe6;
  border-radius: 4px !important;
}

.el-radio-group {
  padding-left: 40px;
  font-size: 1em;
  display: block;
  width: 100%;
}
/deep/.part-containers .el-radio-button__inner {
  padding: 0px;
  display: flex;
}
/deep/.part-containers .el-radio-group .el-badge {
  margin-right: 20px;
}
.contract-item-tag {
  background-color: #d3e4f7;
  color: #333333;
  padding: 10px 20px;
}
.contract-item-inner {
  padding: 10px 20px;
  display: block;
}
</style>

<template>
  <div class="part-containers">
    <el-radio-group v-model="contractType" @change="changeContractType">

      <el-badge :value="notifyContractObject.sellerCount" :hidden="notifyContractObject.sellerCount === 0" class="item">
        <el-radio-button label="sale">
          <span class="contract-item-tag">Home Owner</span>
          <span class="contract-item-inner">Sell</span>
        </el-radio-button>
      </el-badge>

      <el-badge :value="notifyContractObject.rentCount" :hidden="notifyContractObject.rentCount === 0" class="item">
        <el-radio-button label="rentOut">
          <span class="contract-item-tag">Landlord</span>
          <span class="contract-item-inner">Rent</span>
        </el-radio-button>
      </el-badge>

      <el-badge :value="notifyContractObject.buyerCount" :hidden="notifyContractObject.buyerCount === 0" class="item">
        <el-radio-button label="buy">
          <span class="contract-item-inner">Buyer</span>
        </el-radio-button>
      </el-badge>

      <el-badge :value="notifyContractObject.rentalCount" :hidden="notifyContractObject.rentalCount === 0" class="item">
        <el-radio-button label="rentIn">
          <span class="contract-item-inner">Tenant</span>
        </el-radio-button>
      </el-badge>
    </el-radio-group>

    <el-radio-group
      v-if="'sale' === contractType || 'buy' === contractType"
      v-model="transactionType"
      @change="changeTransactionType">
      <el-badge :value="'buy' === contractType ? notifyContractObject.buyerTraditionCount : notifyContractObject.sellerTraditionCount" :hidden="'buy' === contractType ? (notifyContractObject.buyerTraditionCount !== 0 ? false : true) : (notifyContractObject.sellerTraditionCount !== 0 ? false : true)" class="item">
        <el-radio :label="'tranditional'">Tranditional</el-radio>
      </el-badge>
      <el-badge :value="'buy' === contractType ? notifyContractObject.buyerSftCount : notifyContractObject.sellerSftCount" :hidden="'buy' === contractType ? (notifyContractObject.buyerSftCount !== 0 ? false : true) : (notifyContractObject.sellerSftCount !== 0 ? false : true)" class="item">
        <el-radio :label="'sft'">SFT</el-radio>
      </el-badge>
    </el-radio-group>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      messages: {
        sellerCount: '',
        rentCount: '',
        rentalCount: '',
        buyerCount: ''
      },
      contractType: '',
      transactionType: ''
    }
  },
  computed: {
    ...mapGetters({
      notifyContractObject: 'notifyContractObject'
    })
  },
  methods: {
    changeContractType (_type) {
      this.contractType = _type
      this.$router.push({ path: `/userCenter/contract/list/${_type}` })
    },
    changeTransactionType (_type) {
      this.transactionType = _type
      this.$router.push({
        path: `/userCenter/contract/list/${this.contractType}/${_type}`
      })
    },
    getMessageNum () {
      var _this = this
      this.$axios({
        'method': 'get',
        'url': `${this.YT_PROD_PATH}common/message/countByUid`
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            for (var prop in data.data) {
              _this.messages[prop] = data.data[prop]
            }
          } else {
            // alert(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
        })
    }
  },
  created () {
    const pathArr = this.$route.fullPath.split('/')
    this.contractType = pathArr[4]
    this.transactionType = pathArr[5]
  },
  updated () {
    const pathArr = this.$route.fullPath.split('/')
    this.contractType = pathArr[4]
    this.transactionType = pathArr[5]
  }
}
</script>
