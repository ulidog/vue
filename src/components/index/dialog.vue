<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="centerDialogVisible" width="1178px" top="5vh" center>
      <div class="dialog" align="center">
        <span>Welcome to Ebuyhouse</span>
      </div>
      <div class="zhu">
        <dir class="finding">
          <p>Thank you finding us at Ebuyhouse, your dream home could be just a click away.</p>
          <span>Here at Ebuyhouse we have one goal, that is to save you time & money when buying, selling & renting a home in America.</span>
        </dir>
        <div class="bespoke">
          <p>Our bespoke technology allows you to list your home for free in a matter of minutes,
            <br>connect with our exclusive partners from lending, escrow & even finding a plumber.
            <br>All to help you navigate your way through the Real Estate transaction.
          </p>
        </div>
        <div class="bespoke">
          <p>
            We have just launched and need you to tell us how we can improve or if there is
            <br>anything about your property needs that we must consider.Please direct any
            <br>issues & suggestions to our Contact Us form or call
            <span>702 916 3883</span> & one of
            <br>our team will be happy to help you.
          </p>
        </div>
        <div class="updates">
          <p>Regular information, updates & insight can be found here:</p>
        </div>
        <div class="address">
          <a href="http://blog.ebuyhouse.com" target="view_window">www.blog.ebuyhouse.com</a>
          <br>
          <a
            href="https://www.facebook.com/ebuyhouseinc/"
            target="view_window"
          >https://www.facebook.com/ebuyhouseinc</a>
          <br>
          <a href="https://twitter.com/ebuyhouseinc/" target="view_window">Twitter: @ebuyhouseinc</a>
          <br>
        </div>
      </div>
      <div class="houseimg">
        <img src="/static/img/index/picture_house.png" alt>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog-container /deep/.el-dialog__headerbtn .el-dialog__close {
  font-size: 32px;
  color: #444;
}
</style>

<script>
export default {
  data () {
    return {
      centerDialogVisible: true
    }
  }
}
</script>
