<style lang="scss" scoped>
.part-container{
  padding: 0 2em 3em;
  background-color: #ffffff;
  overflow: hidden;
}

.red-star{
  color: red;
}

h6{
  font-size: 1.3em;
  margin-top: 2em;
  margin-bottom: 1.2em;
}

textarea{
  font-size: 1.3em;
  width: 100%;
  padding: 1em;
  border: 2px solid #f8c6a1;
  resize: none;
  outline: none;
}

/deep/ .el-radio__label{
  font-size: 1.2em;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item{
  position: relative;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{
  height: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.btn-submit{
  font-size: 1.3em;
  padding: 0.4em 1.2em;
  display: block;
  border-radius: 0.2em;
  margin: 2em auto 0;
  background-color: #1281fc;
  color: #ffffff;
}
</style>

<template>
  <div class="part-container">

    <h6><span class="red-star">*</span>Type your question here. If possible, please try to help answer others' questions.</h6>
    <textarea rows="7" spellcheck="false" autocomplete="off" maxlength="300" placeholder="0-300 characters" v-model="content"></textarea>
    <h6>Category</h6>
    <el-radio-group v-model="category">
      <el-radio :label="item.faqCategoryId" v-for="item in questionTypeList" :key="item.faqCategoryId" class="radio-label-item">{{item.type}}</el-radio>
    </el-radio-group>

    <h6>Add pictures</h6>
    <el-upload
      ref="uploader"
      name="multipartFiles"
      :action="uploadUrl"
      :limit="3"
      :multiple="true"
      accept=".jpg, .jpeg, .png"
      list-type="picture-card"
      :file-list="imgList"
      :auto-upload="true"
      :before-upload="beforeUploadChange"
      :on-success="successChange"
      :before-remove="deleteChange">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <button class="btn-submit" @click="quickQuestionChange">Submit</button>

  </div>
</template>

<script>
import { getToken } from '@/utils/session'
export default {
  data () {
    return {
      'uploadUrl': this.ZJC_UPLOAD_IMG_PROD_PATH,
      'category': null,
      'imgList': [],
      'dialogVisible': false,
      'dialogImageUrl': '',
      'questionTypeList': [],
      'content': null
    }
  },
  'methods': {
    getImg (file, fileList) {
      this.imgList.push(file)
    },
    onPictureCardPreview (file) {
      this.dialogImageUrl = file.pcUrl[0]
      this.dialogVisible = true
    },
    beforeUploadChange (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp') {
        this.uploadUrl = this.ZJC_UPLOAD_IMG_PROD_PATH
      } else {
        return false
      }
    },
    successChange (res, file, fileList) {
      this.imgList.push({
        url: res.data.pcUrl[0],
        src: res.data.pcUrl[0],
        name: file.name,
        id: file.uid
      })
    },
    deleteChange (val) {
      this.imgList.splice(this.imgList.indexOf(val), 1)
    },
    fetchQuestionTypeList () {
      const _this = this
      _this.$axios.get(`${this.ljj_path}faq-category/find/stair`, {params: _this.pageConfig})
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            _this.questionTypeList = res.data.data.rows
            _this.category = res.data.data.rows[0].faqCategoryId
          }
        })
    },
    quickQuestionChange () {
      const _this = this
      if (!getToken()) {
        this.$message.info('Please login to be a member before asking questions')
        this.$store.commit('signOut', true)
      } else {
        _this.$axios({
          url: `${this.ljj_path}faq/insert`,
          method: 'POST',
          data: {detail: _this.content, fkCategoryId: _this.category, tFaqImgList: _this.imgList.map(item => item.src).join(',')}
        }).then(res => {
          if (res.data.success) {
            // console.log(res.data.data)
            _this.$message.success(res.data.msg)
            _this.content = null
          }
        })
      }
    }
  },
  'watch': {
    imgList () {
      if (this.imgList.length < 3) {
        window.setTimeout(() => {
          this.$refs.uploader.$el.querySelector('.el-upload--picture-card').style.display = 'inline-block'
        }, 0)
      } else {
        window.setTimeout(() => {
          this.$refs.uploader.$el.querySelector('.el-upload--picture-card').style.display = 'none'
        }, 0)
      }
    }
  },
  created () {
    this.$emit('upData', {isShowTab: false})
  },
  mounted () {
    this.fetchQuestionTypeList()
  },
  destroyed () {
    this.$emit('upData', {isShowTab: true})
  }
}
</script>
