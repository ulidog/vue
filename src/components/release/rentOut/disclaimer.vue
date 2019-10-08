<template>
    <section class="disclaimer-container">
        <div class="title">
            <h4>Disclaimer</h4>
        </div>
        <div class="content">
            <p>By uploading property information to Ebuyhouse, you indicate that you agree to “The Terms of Use” , “The Privacy Rules” of Ebuyhouse and the following:</p>
            <p>1.Do not upload images or contents that you don’t own the copyright to.</p>
            <p>2.Do not upload content that is illegal, prohibited, or considered offensive.  If we find any violations, you may be permanently             banned from Ebuyhouse and be reported to the appropriate authorities.</p>
            <p>3.This disclaimer may be modified at anytime.</p>
            <el-checkbox medium class="my-checkbox" v-model="isChecked">I have read and agree to the “Disclaimer” at Ebuyhouse.com</el-checkbox>
        </div>

    </section>
</template>

<script>
export default {
  data () {
    return {
      isChecked: false
    }
  },
  'props': {
    'isSubmitNow': {
      'type': Boolean,
      'default': false
    }
  },
  methods: {
    submitForm () {
      if (this.isChecked) {
        this.$emit(
          'collectData',
          {
            'flag': true
          }
        )
      } else {
        this.$emit(
          'collectData',
          {
            'msg': 'Please read our guidelines first and then agree with it',
            'flag': false
          }
        )
      }
    }
  },
  'watch': {
    isSubmitNow: {
      handler (_new, _old) {
        if (_new) {
          this.submitForm()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .disclaimer-container{
    background-color: #fff;
    height: 350px;
    .title{
      width: 100%;
      height: 62px;
      // background-color: #fab133;
      margin-bottom: 31px;
      h4{
        font-size: 24px;
        color:#444;
        text-align: center;
        line-height: 62px;
        border-bottom:1px solid rgba(224,224,224,1);
      }
    }
    .content {
      width: 100%;
      font-size: 16px;
      color:#666;
      padding: 0 30px;
      p{
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 50;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        word-break: break-word;
      }
      .my-checkbox{
        margin-top: 32px;
        font-size: 18px;
        color: #1281fc;
      }
    }
  }
</style>
