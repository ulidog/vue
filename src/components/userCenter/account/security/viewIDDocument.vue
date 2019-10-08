<style scoped>
.title{
  margin-top: 1em;
  margin-bottom: 1.5em;
  font-size: 22px;
  text-align: center;
  display: flex;
  justify-content: center;
  color: #323232;
}

.content{
  width: 80%;
  margin: 0 auto;
}

.content p{
  font-size: 1.3em;
  line-height: 2em;
  margin-bottom: 1em;
  border: 1px solid #409EFF;
  border-radius: 0.5em;
  text-align: center;
  color: #409EFF;
}

.content img{
  display: block;
  width: 50%;
  margin: 0 auto;
}

.el-button{
  font-size: 1.3em;
  display: block;
}
.card-id-list {
  display: flex;
  justify-content: space-between;
  height: 94px;
  margin: 28px 0;
  align-items: center;
  border-bottom: 1px solid #E1E1E1;
}
.card-id-list:last-child {
  border-bottom: none;
}
.card-id-list>h5{
  color: #323232;
  font-size: 18px;
  flex: 0 0 30%;
}
.card-id-list>span{
  color: #666;
  font-size: 18px;
  flex: 1;
}
/* .card-id-list>img{
  width: 14.125em;
  height: 100%;
} */
/* .title-itro {
  width: 21.25em;
  height: 100%;
}
.title-itro>h5{
  font-size: 1.5em;
  color: #909090;
}
.title-itro>span{
  font-size: 1.5em;
  color: #909090;
  margin-top: 10px;
} */
.btn {
  color: #999;
  display: flex;
  align-items: center;
  border-color: #999;
  padding: 10px 30px;
}
</style>

<template>
  <div>
    <h6 class="title">Identity document</h6>
    <div class="content">
      <!-- <img src="/static/img/userCenter/alien_id_card.png" /> -->
      <!-- <el-button type="primary" @click="changeIDDoc">Change</el-button> -->
      <div class="card-id-list" v-for="item in cardList" :key="item.id">
        <!-- <img v-lazy="item.paperworkUrl" alt=""> -->
        <h5>{{item.paperworkName}}</h5>
        <span>{{item.paperworkCode}}</span>
        <el-button class="btn" @click="delectId(item.id)">delete</el-button>
      </div>
      <div class="card-id-list" v-if="cardList.length === 0">
        <h5>You have not added the Identity documents</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardList: []
    }
  },
  'methods': {
    changeIDDoc () {
      this.$emit('setOperateName', 'bindIDDoc')
    },
    fetchData () {
      const _this = this
      _this.$axios.get(`${this.wxl_path}userPaperwork/findUserPaperworkList`)
        .then(res => {
          if (res.data.success) {
            // console.log(res)
            _this.cardList = res.data.data
          }
        })
    },
    delectId (_id) {
      const _this = this
      _this.$axios.post(`${this.wxl_path}userPaperwork/deleteUserPaperwork`, {userPaperworkId: _id})
        .then(res => {
          if (res.data.success) {
            // console.log(res)
            // _this.cardList = res.data.data
            _this.$message.success(res.data.msg)
            _this.fetchData()
          }
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
