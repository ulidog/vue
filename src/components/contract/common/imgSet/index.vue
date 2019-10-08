<template>
  <section class="imgSet">
    <section class="gary-bg file-flex" v-if="!isSuccessStatus">
      <el-upload
        name="multipartFiles"
        auto-upload
        :limit="5"
        :action="uploadUrl"
        :before-upload="beforeUploadChange"
        :file-list="initArray"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="successChange"
        :on-remove="handleRemove"
        :disabled="isSuccessStatus"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <ul v-if="otherFileList.length !== 0" class="otherFileBox">
        <li class="fileItem" v-for="item in otherFileList" :key="item.uid">
          <section class="left-file-name">
            <img src="/static/img/contract/icons/document.png" alt="document.png">
            <span>{{ item.name }}</span>
          </section>
          <footer class="colse">
            <span>{{ item.size }}M</span>
            <img @click="deleteOtherFile(item)" src="/static/img/contract/icons/delete.png" alt="delete.png">
          </footer>
        </li>
      </ul>
    </section>
    <ul class="gary-bg" v-else>
      <li class="success-img-item" v-for="(item, index) in showJsonArray" :key="index">
        <section class="imageBox">
          <img v-lazy="item.url||item.src" :alt="item.name" v-if="item.type === 'img'" :key="Math.random() * 10000">
          <img src="/static/img/contract/icons/document_big.png" alt="document.png" v-else>
          <section class="tools">
            <i class="iconfont icon-Scale-Tool" v-if="item.type === 'img'" @click="viewImg(item)"></i>
            <i class="iconfont icon-download2" @click="toolsOnDownload(item.url)"></i>
          </section>
        </section>
      </li>
    </ul>
    <el-dialog :visible.sync="viewImgFalg">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data () {
    return {
      uploadUrl: this.ZJC_UPLOAD_VIDEO_PROD_PATH, // ZJC_UPLOAD_IMG_PROD_PATH
      initArray: [],
      viewImgFalg: false,
      dialogImageUrl: '',
      showJsonArray: [],
      otherFileList: []
    }
  },
  props: {
    imgList: {
      default: () => this.initArray,
      type: [Array, Object]
    },
    isSuccessStatus: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    imgList: {
      handler (_new, _old) {
        console.log(_new)
        this.initArray = _new
        this.showJsonArray = _new.map(item => {
          const imgReg = /(?:\.jpg|\.gif|\.png|\.jpeg)$/
          if (imgReg.test(item.url)) {
            item.type = 'img'
          } else {
            item.type = 'file'
          }
          return item
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.deleteChange({ uid: file.uid })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.viewImgFalg = true
    },
    beforeUploadChange (file) {
      const maxSizeStatus = (file.size / 1024 / 1024) < 64
      if (!maxSizeStatus) {
        this.$message.warning('Upload files can\'t exceed 64M')
        return false
      }
    },
    toolsOnDownload (urls) {
      window.open(urls, '_blank')
      // let aTag = document.createElement('a')
      // var event = new MouseEvent('click')
      // aTag.download = `Ebuyhouse-${new Date()}`
      // aTag.target = '_blank'
      // aTag.href = urls
      // aTag.dispatchEvent(event)
    },
    viewImg (_info) {
      this.dialogImageUrl = _info.url
      this.viewImgFalg = true
    },
    successChange (res, file, fileList) {
      this.initArray = fileList
      // this.initArray.push(file)
      console.log('start =>>>>>>>>>>>>>>>>')
      console.log(fileList)
      console.log(this.initArray)
      // 过滤非图片操作
      this.initArray = this.initArray.map(item => {
        if (item.type && item.type === 'img') {
          return item
        } else if (
          (item.raw && item.raw.type === 'image/png') ||
          (item.raw && item.raw.type === 'image/jpg') ||
          (item.raw && item.raw.type === 'image/jpeg') ||
          (item.raw && item.raw.type === 'image/bmp')
        ) {
          return item
        } else {
          return null
        }
      }).filter(fs => fs)
      console.log(this.initArray)
      console.log('end =>>>>>>>>>>>>>>>>')
      this.imgChange(fileList)
    },
    imgChange (fileList) {
      // let otherFile = []
      const List = fileList
        .map(res => {
          if (res.response !== '' && res.response) {
            if (
              res.raw.type === 'image/png' ||
              res.raw.type === 'image/jpg' ||
              res.raw.type === 'image/jpeg' ||
              res.raw.type === 'image/bmp'
            ) {
              return {
                url: res.response.data[0],
                name: res.name,
                uid: res.uid
              }
            } else {
              console.log('成功插入一个文件类型')
              this.otherFileList.push({
                type: 'file',
                url: res.response.data[0],
                name: res.name,
                uid: res.uid,
                size: (res.size / 1024 / 1024).toFixed(4)
              })
              console.log(this.otherFileList)
            }
          } else {
            if (res.type && res.type === 'img') {
              return res
            } else {
              return null
            }
          }
        })
        .filter(fs => fs)
      // this.otherFileList = otherFile
      console.log('获取其它文件列表')
      console.log(this.initArray, List, this.otherFileList)
      console.log('end')
      if (List.length !== 0 || this.otherFileList.length !== 0) {
        this.$emit('uploadImgList', [...List, ...this.otherFileList])
      }
    },
    deleteChange (val) {
      console.log(val, this.initArray)
      this.initArray.map(item => {
        if (val.uid === item.uid) {
          this.initArray.splice(this.initArray.indexOf(item), 1)
          this.$emit('uploadImgList', [...this.initArray, ...this.otherFileList])
          this.$forceUpdate()
        }
      })
    },
    deleteOtherFile (_info) {
      this.otherFileList.splice(this.otherFileList.indexOf(_info), 1)
      this.$emit('uploadImgList', [...this.initArray, ...this.otherFileList])
    }
  }
}
</script>
<style lang="sass" scoped>
  .imgSet
    background-color: #F3F4F5
    height: 536px
    .gary-bg
      padding: 26px 1.0625em
      display: flex
      width: 100%
      // justify-content: space-between
      flex-wrap: wrap
      &.file-flex
        flex-direction: column
        .otherFileBox
          display: flex
          flex-direction: column
          margin: 20px 0
          .fileItem
            background-color: #fff
            padding: 10px
            transition: all .3s ease
            display: flex
            justify-content: space-between
            font-size: 16px
            margin-bottom: 10px
            &:hover
              box-shadow: 10px 10px 30px -10px #ddd
            .left-file-name
              display: flex
              align-items: center
              img
                margin-right: 10px
            .colse
              display: flex
              align-items: center
              img
                margin-left: 10px
                cursor: pointer
      .defalut-upload-file,
      .success-img-item
        position: relative
        flex: 0 0 11.625em
        height: 11.625em
        // width: 11.625em
        margin-right: 0.84em
        margin-bottom: 0.84em
        display: flex
        align-items: center
        .imageBox
          width: 100%
          height: 100%
          overflow: hidden
          position: relative
          display: flex
          justify-content: center
          align-items: center
          background-color: #fff
          img
            // max-width: 100%
            width: 100%
          .tools
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            display: -webkit-box
            display: -ms-flexbox
            display: flex
            -webkit-box-align: center
            -ms-flex-align: center
            align-items: center
            -webkit-box-pack: center
            -ms-flex-pack: center
            justify-content: center
            opacity: 0
            cursor: pointer
            transition: all .5s ease
            &:hover
              background-color: rgba(0,0,0,.5)
              transition: all .5s ease
              opacity: 1
              i
                transition: all .5s ease
                color: #fff
                &:hover
                  font-size: 50px
            i
              font-size: 30px
              margin: 0 5px
        .upload
          /deep/ .el-upload
            width: 100%
            height: 100%
            >img
              height: 100%
              width: 100%
        >.icons-delete
          display: none
          position: absolute
          top: 0
          right: 0
          width: 33px
          height: 33px
        &:hover>.icons-delete
          display: flex
          cursor: pointer
</style>
