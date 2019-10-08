<style scoped>
.part-container{
  width: 90%;
  margin: 2em auto 0;
  overflow: hidden;
}

.uploader{
  width: 0;
  height: 0;
  visibility: hidden;
}

.btn-group{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2em;
}

.btn-upload-photo,
.btn-autodyne-photo{
  font-size: 1.2em;
  padding: 0.4em 0.8em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid #666666;
  border-radius: 6px;
  margin-right: 2em;
  color: #666666;
}

.btn-upload-photo:hover,
.btn-autodyne-photo:hover{
  color: #1281fc;
  border-color: #1281fc;
}

.btn-upload-photo img,
.btn-autodyne-photo img{
  width: 1.2em;
  margin-right: 0.5em;
}

.btn-save-avatar{
  font-size: 1.2em;
}

.operate-area{
  float: left;
  width: calc(100% - 150px);
  height: 220px;
  position: relative;
  overflow: hidden;
  user-select: none;
}

.bg-img{
  display: block;
  width: 100%;
  pointer-events: none;
}

.gray-layer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.clip-frame{
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
}

.clip-img{
  position: absolute;
  pointer-events: none;
}

.preview-avatar{
  width: 100px;
  height: 300px;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.small-avatar,
.big-avatar{
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
}

.small-avatar{
  width: 40px;
  height: 40px;
}

.big-avatar{
  width: 100px;
  height: 100px;
}

.small-avatar img,
.big-avatar img{
  position: absolute;
  left: 0;
  top: 0;
}

.preview-avatar>p{
  color: #999999;
}
.changeCalc{
  position: absolute;
  bottom: 16px;
  right: 0;
}
</style>

<template>
  <div class="part-container">
    <input class="uploader" ref="uploader" type="file" accept="image/jpg, image/jpeg, image/png" @change="getImg($event)" />
    <div class="btn-group">
      <button class="btn-upload-photo" @click="triggerUploader">
        <img src="/static/img/userCenter/upload_img.png"/>
        Upload photo
      </button>
      <!-- <button class="btn-autodyne-photo">
        <img src="/static/img/userCenter/camera.png" />
        Autodyne photo
      </button> -->
    </div>

    <div
      ref="operateArea"
      class="operate-area"
      @mousedown="mousedown($event)"
      @mousemove="mousemove($event)"
      @mouseleave="mouseleave"
      @mouseup="mouseup"
    >
      <img class="bg-img" :src="uploadImgSrc" />
      <div class="gray-layer"></div>
      <div v-if = "uploadImgSrc" class="changeCalc">
        <el-slider @change="init" v-model="numPicSize" vertical height="120px"></el-slider>
      </div>
      <!-- <el-input-number class="changeCalc" v-if = "uploadImgSrc" size="mini" v-model="numPicSize" @change="handleChangePic" :min="1" :max="10" label="change pic size"></el-input-number> -->
      <div ref="clipFrame" class="clip-frame">
        <img ref="clipImg" class="clip-img" :src="uploadImgSrc" />
      </div>
    </div>

    <div class="preview-avatar">
      <div class="small-avatar">
        <img ref="smallAvatar" :src="uploadImgSrc" />
      </div>
      <p>40 x 40px</p>
      <div class="big-avatar">
        <img ref="bigAvatar" :src="uploadImgSrc" />
      </div>
      <p>100 x 100px</p>
      <el-button :disabled="!uploadImgSrc || inSubmitting" class="btn-save-avatar" type="primary" @click="saveAvatar">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'numPicSize': 80, // 初始为5
      'inSubmitting': false,
      'uploadImgSrc': '',
      'uploadImg': new Image(),
      'operateAreaWidth': 0,
      'operateAreaHeight': 0,
      'clipFrameWidth': 0,
      'clipFrameHeight': 0,
      'clipFrameLeft': 0,
      'clipFrameTop': 0,
      'clipImgWidth': 0,
      // 'clipImgHeight': 0,
      'clipImgLeft': 0,
      'clipImgTop': 0,
      'mouseIsHolding': false,
      'distanceLeft': 0,
      'distanceTop': 0
    }
  },
  'methods': {
    handleChangePic (val) {
      console.log(val)
    },
    triggerUploader () {
      this.$refs.uploader.click()
    },
    getImg (_e) {
      const target = _e.target
      if (target.value && target.files.length > 0) {
        this.uploadImgSrc = URL.createObjectURL(target.files[0])
        this.uploadImg.onload = () => { this.init() }
        this.uploadImg.src = this.uploadImgSrc
        target.value = ''
      }
    },
    init () {
      // 上传图片的宽
      this.operateAreaWidth = this.$refs.operateArea.getBoundingClientRect().width
      // 上传图片的高
      this.operateAreaHeight = Math.floor(this.uploadImg.height * (this.operateAreaWidth / this.uploadImg.width))
      // 如果宽大于高
      if (this.operateAreaWidth > this.operateAreaHeight) {
        // 截图width
        this.clipFrameWidth = (this.operateAreaHeight * (this.numPicSize / 100) / this.operateAreaWidth).toFixed(2)
        this.clipFrameHeight = this.numPicSize / 100
      } else {
        this.clipFrameWidth = this.numPicSize / 100
        this.clipFrameHeight = (this.operateAreaWidth * (this.numPicSize / 100) / this.operateAreaHeight).toFixed(2)
      }
      this.clipFrameLeft = (1 - this.clipFrameWidth) / 2
      this.clipFrameTop = (1 - this.clipFrameHeight) / 2
      this.clipImgWidth = 1 / this.clipFrameWidth
      // this.clipImgHeight = 1 / this.clipFrameHeight
      this.clipImgLeft = -(1 / this.clipFrameWidth * this.clipFrameLeft)
      this.clipImgTop = -(1 / this.clipFrameHeight * this.clipFrameTop)
    },
    mousedown (_e) {
      const bcr = this.$refs.operateArea.getBoundingClientRect()
      const mousedownLeft = (_e.layerX || _e.offsetX) / bcr.width
      const mousedownTop = (_e.layerY || _e.offsetY) / bcr.height
      if (!this.mousedownInClipFrame(mousedownLeft, mousedownTop)) return
      this.mouseIsHolding = true
      this.distanceLeft = mousedownLeft - this.clipFrameLeft
      this.distanceTop = mousedownTop - this.clipFrameTop
    },
    mousemove (_e) {
      if (this.mouseIsHolding) {
        const bcr = this.$refs.operateArea.getBoundingClientRect()
        let left = _e.layerX / bcr.width - this.distanceLeft
        let top = _e.layerY / bcr.height - this.distanceTop
        if (left < 0) {
          left = 0
        } else if (left > 1 - this.clipFrameWidth) {
          left = 1 - this.clipFrameWidth
        }
        if (top < 0) {
          top = 0
        } else if (top > 1 - this.clipFrameHeight) {
          top = 1 - this.clipFrameHeight
        }
        this.clipFrameLeft = left
        this.clipFrameTop = top
        this.clipImgLeft = -(1 / this.clipFrameWidth * this.clipFrameLeft)
        this.clipImgTop = -(1 / this.clipFrameHeight * this.clipFrameTop)
      }
    },
    mouseup () {
      this.mouseIsHolding = false
    },
    mouseleave () {
      this.mouseIsHolding = false
    },
    mousedownInClipFrame (_left, _top) {
      if (_left < this.clipFrameLeft) return false
      if (_left > this.clipFrameWidth + this.clipFrameLeft) return false
      if (_top < this.clipFrameTop) return false
      if (_top > this.clipFrameHeight + this.clipFrameTop) return false
      return true
    },
    saveAvatar () {
      this.inSubmitting = true
      const canvas = window.document.createElement('canvas')
      const bcr = this.$refs.clipFrame.getBoundingClientRect()
      canvas.width = bcr.width
      canvas.height = bcr.height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        this.uploadImg,
        this.uploadImg.width * this.clipFrameLeft,
        this.uploadImg.height * this.clipFrameTop,
        this.uploadImg.width * this.clipFrameWidth,
        this.uploadImg.height * this.clipFrameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      )
      const base64 = canvas.toDataURL('image/jpeg', 0.1).split(',')[1]
      this.submitAvatar(base64)
    },
    submitAvatar (_base64) {
      const fd = new FormData()
      fd.append('filebase64', _base64)
      this.$axios({
        'method': 'POST',
        'url': `${this.ZJC_UPLOAD_IMG_NO_WATERMARK_PATH}`,
        'headers': {'Content-Type': 'multipart/form-data'},
        'data': fd
      })
        .then(response => {
          const data = response.data
          // console.log(data)
          if (data.success) {
            // 修改头像
            this.$axios({
              'method': 'POST',
              'url': `${this.wxl_path}user/updateUserInfo`,
              'data': {
                'headUrl': data.data.imagesUrl[0]
              }
            })
              .then(response => {
                if (response.data.success) {
                  // alert("successfully！")
                  this.$emit('setOperateName', 'viewBaseInfo')
                  this.uploadImgSrc = ''
                } else {
                  // alert(response.data.msg)
                }
              })
              .catch(error => {
                if (error) {}
              })
          } else {
            // alert(data.msg)
          }
          this.inSubmitting = false
        })
        .catch(error => {
          if (error) {}
          this.uploadImgSrc = ''
          this.inSubmitting = false
        })
    }
  },
  'watch': {
    operateAreaHeight () {
      this.$refs.operateArea.style.height = `auto`
    },
    clipFrameWidth () {
      this.$refs.clipFrame.style.width = `${this.clipFrameWidth * 100}%`
    },
    clipFrameHeight () {
      this.$refs.clipFrame.style.height = `${this.clipFrameHeight * 100}%`
    },
    clipFrameLeft () {
      this.$refs.clipFrame.style.left = `${this.clipFrameLeft * 100}%`
    },
    clipFrameTop () {
      this.$refs.clipFrame.style.top = `${this.clipFrameTop * 100}%`
    },
    clipImgWidth () {
      this.$refs.clipImg.style.width = `${this.clipImgWidth * 100}%`
      this.$refs.smallAvatar.style.width = `${this.clipImgWidth * 100}%`
      this.$refs.bigAvatar.style.width = `${this.clipImgWidth * 100}%`
    },
    clipImgLeft () {
      this.$refs.clipImg.style.left = `${this.clipImgLeft * 100}%`
      this.$refs.smallAvatar.style.left = `${this.clipImgLeft * 100}%`
      this.$refs.bigAvatar.style.left = `${this.clipImgLeft * 100}%`
    },
    clipImgTop () {
      this.$refs.clipImg.style.top = `${this.clipImgTop * 100}%`
      this.$refs.smallAvatar.style.top = `${this.clipImgTop * 100}%`
      this.$refs.bigAvatar.style.top = `${this.clipImgTop * 100}%`
    }
  }
}
</script>
