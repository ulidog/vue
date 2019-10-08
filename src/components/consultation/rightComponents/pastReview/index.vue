<template>
  <section class="pastReviewViews">
    <header class="_titls">
      <h3>Past review</h3>
    </header>
    <footer class="btns">
      <header class="selectTime">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{year}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="showMaxBox" style="max-height: 200px;overflow-y: scroll;">
            <el-dropdown-item v-for="item in yearList" :key="item" :command="item">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </header>
      <footer class="mothods">
        <ul class="mothodsBox">
          <li class="mothods-items" v-for="item in mothods" :key="item">{{item}}</li>
        </ul>
      </footer>
    </footer>
  </section>
</template>
<script>
export default {
  data () {
    return {
      year: 2018
    }
  },
  computed: {
    yearList: function () {
      const date = new Date()
      const year = date.getFullYear()
      let yearList = []
      for (let i = 0; i < 40; i++) {
        yearList.push(year - i)
      }
      // console.log(yearList)
      return yearList
    },
    mothods: function () {
      let mothodList = []
      for (let i = 1; i <= 12; i++) {
        // yearList.push()
        if (i < 10) {
          mothodList.push('0' + i)
        } else {
          mothodList.push(i)
        }
      }
      return mothodList
    }
  },
  methods: {
    handleCommand (command) {
      this.year = command
    }
  }
}
</script>
<style lang="sass" scoped>
  .pastReviewViews
    width: 100%
    display: flex
    flex-direction: column
    background-color: #fff
    ._titls
      height: 75px
      display: flex
      align-items: center
      justify-content: center
      margin: 0 1.875em 0 2.1875em
      border-bottom: 1px solid #ededed
      h3
        font-size: 1.5em
        color: #323232
        font-weight: bold
        height: 100%
        display: flex
        align-items: center
        justify-content: center
    .btns
      margin: 0 1.875em 2.1875em 2.1875em
      .selectTime
        margin-top: 20px
        display: flex
        justify-content: flex-end
        color: #646464
        .el-dropdown-link
          font-size: 1.875em
          color: #646464
        /deep/ .showMaxBox
          max-height: 200px
          overflow-y: hidden
      .mothods
        width: 100%
        .mothodsBox
          display: flex
          flex-wrap: wrap
          width: 100%
          justify-content: space-between
          .mothods-items
            // height: 58px
            // width: 25%
            height: 48px
            width: 20%
            margin: 5px 2.5%
            display: flex
            justify-content: center
            align-items: center
            color: #646464
            transition: box-shadow .4s ease
            &:hover
              box-shadow: 1px 1px 10px 1px #ddd
              cursor: pointer
              transition: box-shadow .4s ease
</style>
