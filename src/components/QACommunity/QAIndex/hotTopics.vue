<style scoped>
.topic{
  width: 49%;
  cursor: pointer;
  position: relative;
}

.topic:nth-child(3)~.topic{
  margin-top: 1.8%;
}

.topic img{
  width: 100%;
  height: 210px;
  border-radius: 8px;
  transition: all linear 0.3s;
}

.topic p{
  width: 90%;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 1em;
  line-height: 1.2em;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.topic img:hover {
  -webkit-box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.7);
  box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.7);
  -webkit-transform: scale(1.01);
  transform: scale(1.01);
}
</style>

<template>
  <div class="part-container">
    <h5>Hot Topics</h5>
    <div :class="['topic', index%2 === 0 ? 'left' : 'right']" v-for="(item, index) in hotList" :key="index">
      <router-link :to="{name: 'QADetails', query: {ebuyhouse: $base64.encode(JSON.stringify({hotId: item.topicId}))}}">
        <img v-lazy="item.imgUrl" :key="item.topicId"/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageConfig: {
        pageNum: 1,
        pageSize: 4
      },
      hotList: []
    }
  },
  watch: {},
  filters: {},
  created () {
    this.fetchHotTopics()
  },
  methods: {
    fetchHotTopics () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}faq-topic/list`, {params: _this.pageConfig})
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data)
            _this.hotList = res.data.data.rows
          }
        })
    }
  },
  mounted () {}
}
</script>
