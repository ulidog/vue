<style scoped>
.recommend-part{
  height: 9em;
  padding-top: 1.2em;
  padding-bottom: 1.2em;
  padding-left: 8%;
  padding-right: 8%;
  margin-top: 4em;
  background-color: #f0f6fd;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-part{
  display: flex;
  align-items: center;
}

.left-part img{
  height: 100%;
  margin-right: 2em;
}

.left-part div p:first-child{
  font-size: 1.5em;
  color: #444444;
}

.left-part div p:last-child{
  font-size: 1em;
  color: #646464;
}

button{
  font-size: 1.2em;
  padding: 0.8em 1em;
  background-color: #ffffff;
  border: 1px solid #8bc2e7;
  border-radius: 0.5em;
  color: #3c99d6;
}
.userImg {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
}
</style>

<template>
  <div class="recommend-part">
    <div class="left-part">
      <img class="userImg" :src="detailInfo.userHeadUrl" />
      <div>
        <p>{{detailInfo.contactName}}</p>
        <p>{{detailInfo.addTimeFormatDate || ''}}</p>
      </div>
    </div>
    <button @click="recommend">Recommend</button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  'props': {
    'detailInfo': {}
  },
  'methods': {
    recommend () {
      this.$emit('setHouseListVisibility', true)
    }
  }
}
</script>
