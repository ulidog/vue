<template>
    <div class="search-box">
        <!-- <input type="text" v-if="!isMap" autocomplete="off" spellcheck="false"
        v-model="queryWord" :placeholder="placeholder" @keydown.enter="searchs" /> -->
        <el-autocomplete
          v-model="queryWord"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please enter a question!"
          @select="handleSelect"
          @blur="getContent">
        </el-autocomplete>
        <el-button slot="append"  @click="handleSelect"></el-button>
      </div>
</template>
<script>
export default {
  data () {
    return {
      queryWord: '',
      isDisabled: true,
      searchList: [{
        name: 'How to register to log in'
      },
      {
        name: 'How to post homes'
      },
      {
        name: 'How to find homes'
      },
      {
        name: 'How to recommend homes'
      },
      {
        name: 'How to check the homes recommended by landlords'
      }]
    }
  },
  methods: {
    querySearchAsync (queryString, callback) {
      let list = [{}]
      this.searchList.forEach(v => {
        v.value = v.name
      })
      list = this.searchList
      callback(list)
    },
    async handleSelect (item) {
      this.$router.push(`/help-center/help-home/search?search=${this.queryWord}`)
    },
    getContent () {
      if (this.queryWord === '') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped>
.search-box {
  width: 67em;
  height: 3.125em;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  display: flex;
}
.search-box button {
  width: 4%;
  height: 40px;
  float: right;
  border-radius: 0.5rem;
  border: none;
  background-image: url("../../../static/img/helpCenter/search.png");
  background-repeat: no-repeat;
  background-size: 1.5625em 1.5625em;
  background-position: 50% 50%;
}
.el-input{
  outline:none;
}
.el-autocomplete {
  width: 100%;
}
</style>
