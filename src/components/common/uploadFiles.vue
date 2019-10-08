<template>
  <section class="upload-file-component">
    <section class="show-box-one">
      <ul class="show-box">
        <li class="show-item" v-for="item in successFileList" :key="item.key" :style="{width: width, height: height}">
          <img :src="item.value" alt="" v-if="type === 'img'">
          <video :src="item.value" alt="" v-if="type === 'video'"></video>
          <audio :src="item.value" alt="" v-if="type === 'audio'"></audio>
          <section class="tools">
            <span class="tools-btn sethom" @click="sethomSuccessChange(item)" title="Set the main map" v-if="isSetHome"><i class="iconfont icon-yyzhuye2"></i></span>
            <span class="tools-btn delete" @click="deleteSuccessChange(item)" title="delete"><i class="iconfont icon-delete"></i></span>
            <span class="tools-btn reload" @click="reloadSuccessChange(item)" title="re-upload" v-if="!isSetHome && isReLoad"><i class="iconfont icon-re-upload"></i></span>
            <span class="tools-btn public" @click="reviewSuccessChange(item)" title="review"><i class="iconfont icon-Scale-Tool"></i></span>
            <span class="tools-btn public" @click="downloadSuccessChange(item)" title="download" v-if="isDownload"><i class="iconfont icon-download2"></i></span>
          </section>
          <!-- 标记主图 -->
          <span class="cover-mark" v-if="isSetHome && mainPicObj.uid === item.uid"></span>
          <i class="cover-marker-icon iconfont icon-yyzhuye2"></i>
        </li>
        <li class="show-add-item" @click="selectFileChange" v-show="!processStatus && successFileList.length < maxLimit" :style="{width: width, height: height}">
          <i :class="['iconfont', fileIcon]"></i>
        </li>
        <li class="show-load-item" v-show="processStatus" :style="{width: width, height: height}">
          <el-progress :stroke-width="4" :width="parseInt(width) - 20" type="circle" :percentage="percentage" :color="processColorMethod"></el-progress>
        </li>
        <!-- 查看文件 -->
        <el-dialog :visible.sync="reviewFile" class="dialogSize">
          <img :src="reviewObject.value" alt="" v-if="type === 'img'">
          <video controls :src="reviewObject.value" alt="" v-if="type === 'video'"></video>
          <audio controls :src="reviewObject.value" alt="" v-if="type === 'audio'"></audio>
        </el-dialog>
      </ul>
    </section>
  </section>
</template>

<script>
import { UploadServers } from '@/utils'
export default {
  data () {
    return {
      // 总进度
      percentage: 0,
      // 预上传列表集合
      loadFileList: [],
      // 上传成功列表集合
      successFileList: [],
      // 上传失败列表集合
      errorFileList: [],
      // 当前上传的状态 false => 未上传 true => 正在上传
      processStatus: false,
      // 查看文件
      reviewFile: false,
      // 查看文件的对象
      reviewObject: {
        key: null,
        value: null,
        status: true
      },
      // 上传后成功后的一个文件名称存储 用于去重
      successFileNameList: [],
      // 设置主图对象
      mainPicObj: {}
    }
  },
  props: {
    // ZJC_UPLOAD_IMG_PROD_PATH
    // ZJC_UPLOAD_IMG_NO_WATERMARK_PATH
    // ZJC_UPLOAD_VIDEO_PROD_PATH
    url: {
      default: null,
      type: String
    },
    // img video audio
    type: {
      default: 'img',
      type: String
    },
    width: {
      default: '120px',
      type: String
    },
    height: {
      default: '120px',
      type: String
    },
    // 数量限制
    maxLimit: {
      default: 1,
      type: Number
    },
    minLinmit: {
      default: 0,
      type: Number
    },
    // 默认限制上传为图片
    accept: {
      default: 'image/*',
      type: String
    },
    // 设置获取返回地址的取值 'pcUrl'
    resultString: {
      default: null,
      type: String
    },
    // 其它参数
    data: {
      default: () => {},
      type: Object
    },
    // 是否可指定重新上传
    isReLoad: {
      default: false,
      type: Boolean
    },
    isDownload: {
      default: true,
      type: Boolean
    },
    // 文件上传名称
    fileOption: {
      default: null,
      type: Boolean
    },
    // 文件上传ICON
    fileIcon: {
      default: 'icon-message_photo',
      type: String
    },
    // 上传成功后显示类型
    showType: {
      default: 'tab',
      type: String
    },
    // 上传进度环颜色管理 参考elementUI的环形进度条
    processColor: {
      default: null,
      type: Array
    },
    // 多文件
    multiple: {
      default: true,
      type: Boolean
    },
    // 自动重传 上传失败时会触发 默认关闭
    isAutoErrorUpload: {
      default: false,
      type: Boolean
    },
    // 是否去重 仅通过文件名称判断
    isDeWeighting: {
      default: false,
      type: Boolean
    },
    // 是否设置主图 默认关闭
    isSetHome: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    // 监听上传成功后操作
    successFileList: {
      handler (_new, _old) {
        if (_new.length === 0) {
          this.$emit('resultFileList', [])
          return
        }
        // let cloneRestNewFileList
        if (this.isDeWeighting) {
          // 更新对应的文件名称
          this.successFileNameList = _new.map(item => {
            return item.name
          })
        }
        if (this.isSetHome) {
          // 如果为一张图片 则默认选中第一张
          if (_new.length === 1) {
            this.mainPicObj = _new[0]
          }
          this.$emit('resultFileList', this.mainPicReset(this.mainPicObj, _new))
        } else {
          this.$emit('resultFileList', _new)
        }
      },
      deep: true
    },
    // 监听上传失败后操作
    errorFileList: {
      handler (_new, _old) {
        this.$emit('errorChange', _new)
      },
      deep: true
    }
  },
  methods: {
    // 控制进度颜色管理
    processColorMethod () {
      if (this.processColor instanceof Array) {
        return this.processColor
      } else {
        if (this.percentage < 30) {
          return '#909399'
        } else if (this.percentage < 70) {
          return '#e6a23c'
        } else {
          return '#67c23a'
        }
      }
    },
    // 根据首图排序
    mainPicReset (_softJson, _array) {
      if (_array.indexOf(_softJson) === -1) {
        this.mainPicObj = _array[0]
        return _array
      } else {
        let cloneArray = Object.assign([], _array)
        cloneArray.splice(_array.indexOf(_softJson), 1)
        return [_softJson, ...cloneArray]
      }
    },
    // 选择文件
    selectFileChange () {
      // 创建并开始上传
      this.createFileDomChange()
    },
    // 创建input进行操作
    createFileDomChange () {
      let fileInput = document.createElement('input')
      const _this = this
      fileInput.type = 'file'
      fileInput.multiple = _this.multiple ? 'multiple' : null
      fileInput.accept = _this.accept
      fileInput.onchange = function (e) {
        // 是否存在文件
        if (this.files.length === 0) return
        // 设置上传状态
        _this.processStatus = true
        let callFileList = Array.prototype.slice.call(this.files)
        if (_this.isDeWeighting) {
          callFileList.forEach((item, index) => {
            if (_this.successFileNameList.includes(item.name)) {
              callFileList.splice(index, 1)
              console.log('已删除重复数据')
            }
          })
        }
        if ((this.files.length + _this.successFileList.length) > _this.maxLimit) {
          const splitNum = _this.maxLimit - _this.successFileList.length
          let newFileList = _this.editFileInherit(callFileList.slice(0, splitNum))
          _this.uploadFileChange(newFileList)
        } else {
          _this.uploadFileChange(_this.editFileInherit(callFileList))
        }
      }
      fileInput.click()
    },
    // 改变文件属性
    editFileInherit (fileList = []) {
      return fileList.map(item => {
        return new File([item], item.name, {
          type: item.type,
          lastModified: new Date().getTime() + parseInt(Math.random() * 1000)
        })
      })
    },
    // 上传操作
    uploadFileChange (fileList = []) {
      const _this = this
      let initUploadFileChange = new UploadServers({
        url: _this.url,
        data: _this.data,
        file: fileList || null,
        fileClassName: null,
        uploadFileName: _this.fileOption || 'multipartFiles',
        progress: function (e, speed, lave, loaded, units) {
          // console.log(e, speed, lave, loaded, units)
          _this.percentage = parseInt(lave * 100)
        },
        success: function (e) {
          if (e.target.status === 200 && e.target.response) {
            const parseJson = JSON.parse(e.target.response)
            if (parseJson.success) {
              if (_this.resultString) {
                _this.successFileList = [..._this.successFileList, ...parseJson.data[_this.resultString].map((fileItem, index) => {
                  return {
                    key: new Date().getTime() + parseInt(Math.random() * 1000),
                    value: fileItem,
                    type: _this.type,
                    name: fileList[index].name,
                    uid: fileList[index].lastModified,
                    status: true
                  }
                })]
              } else {
                _this.successFileList = [..._this.successFileList, ...parseJson.data.map((fileItem, index) => {
                  return {
                    key: new Date().getTime() + parseInt(Math.random() * 1000),
                    value: fileItem,
                    type: _this.type,
                    name: fileList[index].name,
                    uid: fileList[index].lastModified,
                    status: true
                  }
                })]
              }
              if (_this.type === 'video') {
                // console.log(fileList)
                let newFileList = []
                Object.values(fileList).map(item => {
                  if (window.URL.createObjectURL) {
                    let videoURL = window.URL.createObjectURL(item)
                    let video = document.createElement('video')
                    let canvas = document.createElement('canvas')
                    video.width = 400
                    video.height = 300
                    video.crossOrigin = 'Anonymous'
                    video.setAttribute('crossOrigin', 'Anonymous')
                    video.setAttribute('src', videoURL)
                    video.setAttribute('crossorigin', '*')
                    canvas.width = 300
                    canvas.height = 300
                    // 等待文件读取成功后进行回传
                    video.addEventListener('canplaythrough', function () {
                      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
                      var base64 = canvas.toDataURL('image/png')
                      // 合并数据（含本地base64码）
                      _this.successFileList = _this.mergeArrayObject(_this.successFileList, [{uid: item.lastModified, base64: base64}], 'uid')
                      // 本地图片上传
                      let newFile = _this.dataURLtoFile(base64, new Date().getTime() + '.png', 'image/png', {lastModified: item.lastModified})
                      newFileList.push(newFile)
                      // 视频首图自动上传并回显
                      _this.videoFirstPictureChange([newFile])
                    })
                  }
                })
              }
            } else {
              if (_this.isAutoErrorUpload) {
                _this.uploadFileChange(fileList)
              } else {
                _this.$message.info('Upload Failed!')
              }
            }
          } else {
            if (_this.isAutoErrorUpload) {
              _this.uploadFileChange(fileList)
            } else {
              Object.values(this.file).forEach(item => {
                let reader = new FileReader()
                reader.readAsDataURL(item)
                reader.onload = function (e) {
                  _this.errorFileList.push({
                    key: new Date().getTime() + parseInt(Math.random() * 1000),
                    value: this.result,
                    status: false
                  })
                }
                reader.onerror = function (e) {
                  console.log('读取文件失败！不再回显。')
                }
              })
              _this.$message.info('Upload Failed!')
              // console.log(_this.errorFileList)
              // this.$emit('errorChange', _this.errorFileList)
            }
          }
          // 设置状态为未上传状态
          _this.processStatus = false
        },
        error: function (e) {
          // 上传失败 应将文件通过File流读取出来进行回显 并展示给用户提示上传失败 请重新上传 或者自动重新上传
          _this.processStatus = false
          _this.$message.info('Upload Failed! The server is abnormal, please try again later!')
        }
      })
      console.log(initUploadFileChange)
    },
    // base64 转File
    dataURLtoFile (dataurl, filename, fileType, opt = {}) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, Object.assign({ type: fileType || mime }, opt))
    },
    // base64 转byte流
    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], {type: 'image/png'})
    },
    // 视频首图固定回传 支持单个或者多个file文件回显
    videoFirstPictureChange (fileList = []) {
      const _this = this
      let initUploadVideoChange = new UploadServers({
        url: _this.ZJC_UPLOAD_IMG_PROD_PATH, // 第二次固定接口
        file: fileList || null,
        fileClassName: null,
        uploadFileName: _this.fileOption || 'multipartFiles',
        progress: function (e, speed, lave, loaded, units) {
          // console.log(e, speed, lave, loaded, units)
          // _this.percentage = parseInt(lave * 100)
        },
        success: function (e) {
          if (e.target.status === 200 && e.target.response) {
            const parseJson = JSON.parse(e.target.response)
            console.log(parseJson)
            if (parseJson.success) {
              // parseJson.data.pcUrl
              let newFileListImg = parseJson.data.pcUrl.map((item, index) => {
                return {
                  name: fileList[index].name,
                  uid: fileList[index].lastModified,
                  videoImg: item
                }
              })
              // parseJson.data
              // 合并数据（含首图）
              _this.successFileList = _this.mergeArrayObject(_this.successFileList, newFileListImg, 'uid')
            } else {
              // 自动重新上传首图
              _this.videoFirstPictureChange(fileList)
            }
          } else {
            // 自动重新上传首图
            _this.videoFirstPictureChange(fileList)
          }
        }
      })
      console.log(initUploadVideoChange)
    },
    // 数组合并方法 后面一个合并到前面一个上
    mergeArrayObject (_arry, _arrys, _key) {
      return _arry.map((item, index) => {
        let newObject = {}
        _arrys.map((citem, indexs) => {
          if (item[_key] === citem[_key]) {
            newObject = citem
          }
        })
        return Object.assign(newObject, item)
      })
    },
    // 操作
    deleteSuccessChange (_info) {
      const listFileName = _info.status ? 'successFileList' : 'errorFileList'
      this[listFileName].splice(this[listFileName].indexOf(_info), 1)
      // this.$emit('resultFileList', this[listFileName])
    },
    reloadSuccessChange (_info) {},
    reviewSuccessChange (_info) {
      this.reviewObject = _info
      this.reviewFile = true
    },
    downloadSuccessChange (_info) {
      // window.open(_info.value, '_target')
      let download = document.createElement('a')
      download.href = _info.value
      download.download = _info.value
      download.target = '_blank'
      download.click()
    },
    sethomSuccessChange (_info) {
      this.mainPicObj = _info
      this.$emit('resultFileList', this.mainPicReset(this.mainPicObj, this.successFileList))
    }
  }
}
</script>

<style lang="sass" scoped>
  .upload-file-component
    display: flex
    .show-box-one
      display: flex
      flex-wrap: wrap
      .show-box
        display: flex
        flex-wrap: wrap
        >li
          width: 120px
          height: 120px
          border: 1px dashed #c0ccda
          border-radius: 5px
          display: flex
          justify-content: center
          align-items: center
          background-color: #fbfdff
          margin-right: 10px
          overflow: hidden
          margin-bottom: 10px
        >li.show-add-item
          cursor: pointer
          transition: all .5s ease
          &:hover
            border-color: #409EFF
            transition: all .5s ease
            >i
              color: #409EFF
              transition: all .5s ease
          >i
            font-size: 30px
            color: #999
        >li.show-item
          position: relative
          >img,>video,>audio
            max-width: 100%
          >.cover-mark
            position: absolute
            bottom: 0
            height: 0
            width: 0
            overflow: hidden
            font-size: 0
            line-height: 0
            border-color: transparent #FF9600
            border-style: dashed solid
            border-width: 40px 0 0 40px
            left: 0
            opacity: 0.8
            z-index: 1
          >i.cover-marker-icon
            position: absolute
            left: 3px
            bottom: 3px
            z-index: 2
            color: #fff
          >.tools
            width: 100%
            height: 100%
            transition: all .5s ease
            display: flex
            justify-content: center
            align-items: center
            position: absolute
            z-index: 9
            .tools-btn
              opacity: 0
              color: #409EFF
              &.delete
                position: absolute
                top: 0
                right: 0
                height: 30px
                width: 25px
                display: flex
                justify-content: center
                align-items: center
                &:hover
                  background-color: #409EFF
                  cursor: pointer
                  color: #fff
              &.reload,
              &.sethom
                position: absolute
                top: 0
                left: 0
                height: 30px
                width: 25px
                display: flex
                justify-content: center
                align-items: center
                &:hover
                  background-color: #409EFF
                  cursor: pointer
                  color: #fff
              &.public
                margin: 0 5px
                transition: all .3s ease
                >i
                  font-size: 20px
                &:hover
                  transform: scale(1.3)
                  cursor: pointer
                  transition: all .3s ease
          >.tools:hover
            background-color: rgba(0,0,0,.3)
            transition: all .5s ease
            .tools-btn
              opacity: 1
              color: #fff
  .dialogSize
    /deep/ .el-dialog__body
      display: flex
      justify-content: center
      max-height: 600px
    img,video,audio
      max-width: 100%

</style>
