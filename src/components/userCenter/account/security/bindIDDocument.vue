<style lang="scss" scoped>
.part-container{
  margin-left: 5%;
  margin-right: 5%;
}

.title{
  margin-top: 1em;
  margin-bottom: 1.5em;
  font-size: 1.2em;
  display: flex;
}

.row{
  margin-bottom: 1.8em;
  font-size: 1.2em;
}

/deep/ .el-input__inner{
  font-size: 1.2em;
}

.upload-tip{
  font-size: 1em;
  margin-top: 1em;
  margin-bottom: 2em;
  color: #999999;
}

.el-button{
  font-size: 1.3em;
}
</style>

<template>
  <div class="part-container">
    <h6 class="title">Bind identity document</h6>
    <div class="row"><el-radio v-model="idType" :label="1">Military ID</el-radio></div>
    <div class="row"><el-radio v-model="idType" :label="2">Passport</el-radio></div>
    <div class="row"><el-radio v-model="idType" :label="3">Driver's License</el-radio></div>
    <div class="row"><el-radio v-model="idType" :label="4">Other</el-radio></div>
    <div class="row"><el-input placeholder="Please enter the name of other document with a valid photo ID." v-model="otherIDName" :disabled="4 !== idType"></el-input></div>
    <div class="row"><el-input placeholder="Please enter the ID number." v-model="idNumber"></el-input></div>
    <!-- <el-upload
      name="multipartFiles"
      ref="uploader"
      :action="imgUploadHref"
      list-type="picture-card"
      :file-list="fileList"
      :auto-upload="true"
      :limit="1"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
    >
      <i class="el-icon-picture"></i>
    </el-upload> -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" />
    </el-dialog>
    <p class="upload-tip">The information you input above is encrypted, and will only be seen by you. This is only used to verify your identity.</p>
    <el-button type="primary" @click="AddCardChange">Submit</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'idType': 1,
      'idNumber': '',
      'otherIDName': '',
      'fileList': [],
      'dialogImageUrl': '',
      'dialogVisible': false,
      'imgUploadHref': this.ZJC_UPLOAD_IMG_PROD_PATH,
      'imgUrl': ''
    }
  },
  'methods': {
    getFile (file) {
      this.fileList.push(file)
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
      return true
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    AddCardChange () {
      const _this = this
      _this.$axios.post(`${this.wxl_path}userPaperwork/insertUserPaperwork`, {paperworkName: _this.otherIDName, paperworkCode: _this.idNumber, paperworkType: _this.idType, paperworkUrl: _this.imgUrl})
        .then(res => {
          if (res.data.success) {
            _this.$message({
              message: res.data.msg,
              type: 'success'
            })
            _this.$emit('setOperateName', 'index')
          }
        })
    },
    handleAvatarSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      this.fileList.push({url: res.data.pcUrl[0]})
      this.imgUrl = res.data.pcUrl[0]
    }
  },
  'watch': {
    fileList () {
      if (this.fileList.length > 0) {
        window.setTimeout(() => {
          this.$refs.uploader.$el.querySelector('.el-upload--picture-card').style.display = 'none'
        }, 0)
      } else {
        window.setTimeout(() => {
          this.$refs.uploader.$el.querySelector('.el-upload--picture-card').style.display = 'inline-block'
        }, 0)
      }
    }
  }
}
</script>
