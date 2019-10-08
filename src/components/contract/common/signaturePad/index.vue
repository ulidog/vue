<template>
  <section class="signature-pad" v-loading="loadingSigntrue" element-loading-text="Submitting ...">
    <VueSignaturePad
      class="signature"
      width="100%"
      height="500px"
      :options="{backgroundColor: '#fff'}"
      ref="signaturePad"/>
    <div class="btns">
      <button class="btn-sty save" @click="save">Save</button>
      <button class="btn-sty gray" @click="undo">Undo</button>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      sifnatureUrl: null,
      loadingSigntrue: false
    }
  },
  methods: {
    undo () {
      this.$refs.signaturePad.undoSignature()
    },
    save () {
      this.loadingSigntrue = true
      const {isEmpty, data} = this.$refs.signaturePad.saveSignature()
      if (isEmpty) {
        this.$message.info('Please make sure you have a signature?')
        this.loadingSigntrue = false
        return false
      }
      // console.log(isEmpty, data)
      // console.log(this.$refs.signaturePad.getPropImagesAndCacheImages())
      // console.log(this.convertBase64UrlToBlob(data))
      this.uploaderSignatureImg(this.convertBase64UrlToBlob(data))
    },
    convertBase64UrlToBlob (urlData) {
      var bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], {type: 'image/jpg'})
    },
    uploaderSignatureImg (_file, type) {
      let FormFiles = new FormData()
      if (type) {
        FormFiles.append('filebase64', _file)
      } else {
        FormFiles.append('multipartFiles', _file)
      }
      this.$axios.post(this.ZJC_UPLOAD_IMG_NO_WATERMARK_PATH, FormFiles)
        .then(res => {
          if (res.data) {
            this.sifnatureUrl = res.data.data.imagesUrl[0]
            this.loadingSigntrue = false
            this.$message.success('success')
            this.$emit('signatrue', {url: this.sifnatureUrl})
          } else {
            this.loadingSigntrue = false
            this.$message.error('error')
          }
        }).catch(res => {
          this.$message.error('error')
          this.loadingSigntrue = false
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .signature
    // border: double 1px transparent
    // border-radius: 3px
    // background-image: linear-gradient(white, white), radial-gradient(circle at top left, #4bc5e8, #9f6274)
    // background-origin: border-box
    // background-clip: content-box, border-box
  .btns
    width: 100%
    display: flex
    height: 50px
    align-items: center
    justify-content: center
    .btn-sty
      border-radius: 5px
      padding: 0 30px
      height: 80%
      font-size: 1.25em
      color: #1281FC
      border: 1px solid #1281FC
      margin: 0 10px
      display: flex
      align-items: center
      transition: all ease .3s
    .save
      &:hover
        color: #fff
        background-color: #1281FC
        transition: all ease .3s
    .gray
      border-color: gray
      color: gray
</style>
