<style lang="scss" scoped>
.section-box{
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 3%;
  padding-right: 3%;
  border-bottom: 2px solid #f3f4f5;
}

.section-box>h5{
  margin-bottom: 1rem;
  font-size: 1rem;
}

.section-box>h5 .require-symbol{
  color: #ff0000;
  font-size: 1rem;
}

.section-box>h5 .opration-tip{
  font-size: 0.8rem;
  color: #999999;
}

.input-group{
  // width: 80%;
  display: flex;
  justify-content: space-between;
}

/deep/ .input-group input{
  font-size: 1rem;
}

.input-street{
  width: 40%;
}

.input-city{
  width: 30%;
}

.input-state{
  width: 15%;
}

.input-zip{
  width: 14%;
}

.map{
  // width: 80%;
  height: 30em;
  margin-top: 0.5em;
}

/deep/ .avatar-uploader .el-upload {
  min-width: 148px;
  min-height: 148px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.el-progress--circle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

/deep/ .el-upload-list--picture-card .el-upload-list__item{
  position: relative;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item img{
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.check-address-tip,
.check-img-tip{
  font-size: 1.1em;
  width: 80%;
  line-height: 1.2em;
  background-color: #fef0f0;
  color: #f56c6c;
}
/deep/ .deleteVideo{
  position: absolute;
  top: 0;
  z-index: 99;
  right: 0;
  padding: 10px;
}
/deep/ .deleteVideo:hover {
  background: #409EFF;
  color: #fff;
  cursor: pointer;
}
</style>
<style lang="scss">
  // .el-autocomplete-suggestion.el-popper.select-box-city {
  //   width: 240px !important;
  // }
</style>

<template>
  <div class="part-container">

    <h4>Please provide your property's info</h4>

    <!-- adress -->
    <div class="section-box address-box">
      <h5>
        Address
        <span class="require-symbol">*</span>
      </h5>
      <div class="input-group">
        <el-input
          class="input-street"
          v-model="street"
          placeholder="Street address"
          spellcheck="false"
          autocomplete="off"
          @blur="streetOnBlur"
        >
        </el-input>
        <el-autocomplete
          popper-class="select-box-city"
          class="input-city"
          spellcheck="false"
          autocomplete="off"
          v-model="cityName"
          :fetch-suggestions="querySearchCity"
          placeholder="City"
          :trigger-on-focus="false"
          @select="selectCity">
          <template slot-scope="{ item }">
            <div class="label">{{ item.label }}</div>
          </template>
        </el-autocomplete>
        <el-select class="input-state" v-model="stateName" @change="selectState" placeholder="State" disabled>
          <el-option
            v-for="item in stateList"
            :key="item.stateID"
            :label="item.stateName"
            :value="item.stateID"
          >
          </el-option>
        </el-select>
        <el-input class="input-zip" v-model="zip" placeholder="Zip code" maxlength="10" minlength="5" spellcheck="false" autocomplete="off" @change="clearNoNumber"></el-input>
      </div>
      <div class="check-address-tip">{{checkAddressTip}}</div>
      <div class="map">
        <vue-google-map :center="center" @MarkerCenter="MarkerCenter"></vue-google-map>
      </div>
    </div>

    <!-- img -->
    <div class="section-box img-box">
      <h5>
        Add picture
        <span class="require-symbol">*</span>
        &ensp;
        <span class="opration-tip">Number of pictures: 2 - 50</span>
      </h5>

      <!-- <el-upload
        list-type="picture-card"
        name="multipartFiles"
        :action="uploadImgUrl"
        :before-upload="imgBeforeUpload"
        :on-success="uploadImgSuccess"
        :on-change="uploadImgChange"
        :on-exceed="imgExceed"
        :on-error="uploadImgErrorChange"
        :on-preview="imgCardPreview"
        :before-remove="imgBeforeRemove"
        :file-list="imgFileList"
        multiple>
        <i class="el-icon-plus"></i>
      </el-upload> -->
      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog> -->
      <vue-upload-file
        type="img"
        accept="image/*"
        resultString="pcUrl"
        :isDownload="false"
        :isDeWeighting="true"
        :isSetHome="true"
        :maxLimit="50"
        :url="ZJC_UPLOAD_IMG_PROD_PATH"
        @resultFileList="_resultFileList">
      </vue-upload-file>

      <div class="check-img-tip">{{checkImgTip}}</div>
    </div>

    <!-- new Img -->
    <!-- <div class="section-box img-box">
      <vue-upload-file :url="ZJC_UPLOAD_IMG_PROD_PATH" type="img" @resultFileList="_resultFileList" resultString accept="image/*"></vue-upload-file>
    </div> -->

    <!-- video -->
    <div class="section-box video-box">
      <h5>
        Add video&ensp;
        <span class="opration-tip">Limit video duration to 5 minutes, and support video format: swf, mp4, flv, avi, mpg, wmv, 3gp, mov, asf, asx, vob, rm, rmvb</span>
      </h5>
      <vue-upload-file
        type="video"
        accept="video/*"
        fileIcon="icon-VIDEO"
        :isDownload="false"
        :maxLimit="1"
        :url="ZJC_UPLOAD_VIDEO_PROD_PATH"
        @resultFileList="_resultVideoFileList">
      </vue-upload-file>
      <!-- <el-upload
        class="avatar-uploader"
        name="multipartFiles"
        :action="uploadVideoUrl"
        :show-file-list="false"
        :before-upload="beforeUploadVideo"
        :on-progress="uploadVideoProcess"
        :on-success="uploadVideoSuccess">
        <video v-if="videoUrl && !videoFlag" :src="videoUrl" controls="controls" style="display:block;cursor:pointer;width: 400px;height: 300px;" ref="video" id="video">您的浏览器不支持视频播放</video>
        <i v-else-if="!videoUrl && !videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent"></el-progress>
        <i v-if="videoUrl && !videoFlag" class="deleteVideo el-icon-delete" @click="deleteVideoChange"></i>
      </el-upload> -->
    </div>
    <!-- Tip -->
    <el-dialog
      title="Tip"
      :visible.sync="dialogAddressCityVisible"
      width="30%"
      :before-close="handleAddressCityClose">
      <span>The currently selected city is different from the address that actually confirms the location. Is it switched to the entered city?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddressCityVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogAddressCityVisibleConfirmChange">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 根据街道
// https://maps.googleapis.com/maps/api/geocode/json?address=街道,城市, 州,邮编&key=AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs
import { mapGetters } from 'vuex'
import GoogleMap from './googleMap'
import UploadFilesComponent from '@/components/common/uploadFiles'
export default {
  name: 'VueBasicInfo',
  components: {
    'vue-google-map': GoogleMap,
    'vue-upload-file': UploadFilesComponent
  },
  data () {
    return {
      'uploadVideoUrl': this.ZJC_UPLOAD_VIDEO_PROD_PATH,
      'uploadImgUrl': this.ZJC_UPLOAD_IMG_PROD_PATH,
      // 'uploadImgUrl': 'http://192.168.0.124:9006/ebuyhouse-upload/api/uploadImages',
      'centralizedData': {},
      'cityList': [],
      'stateList': [],
      'street': '',
      'cityName': '',
      'cityID': 0,
      'stateName': '',
      'stateID': '',
      'zip': '',
      'center': {
        'lat': 0,
        'lng': 0
      },
      'checkAddressTip': '',
      'videoUploadPercent': 0,
      'videoFlag': false,
      'videoUrl': '',
      'firstVideoUrl': '',
      'maxImgSize': 1024 * 1024,
      'checkImgTip': '',
      'imgUrlList': [],
      'dialogImageUrl': '',
      'dialogVisible': false,
      'checkFormResult': {
        'flag': true,
        'msg': ''
      },
      'ComponentInit': this,
      'Map': null,
      'fromInfo': this.downForm,
      'isLoading': true,
      'upCenter': {
        'lat': 0,
        'lng': 0
      },
      'imgFileList': [],
      // 输入不匹配提示
      'dialogAddressCityVisible': false,
      'cloneOldCityAddress': null
    }
  },
  props: {
    'isSubmitNow': {
      'type': Boolean,
      'default': false
    },
    'editForm': {
      'type': Object,
      'default': null
    }
  },
  inject: ['downForm'],
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom'
    })
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (_new) {
        this.checkForm()
        if (this.checkFormResult.flag) {
          // todo 集中数据字段
          this.cloneFrom()
          this.$emit('collectData', this.centralizedData)
        } else {
          this.$emit('collectData', this.checkFormResult)
          this.checkFormResult.flag = true
          this.checkFormResult.msg = ''
        }
      }
    },
    searchFrom: {
      handler (_new, _old) {
        if (_new.latitude && _new.longitude) {
          console.log('开始设置中心点3')
          console.log(_new)
          this.center = {
            lat: Number(_new.latitude),
            lng: Number(_new.longitude)
          }
        }
      },
      deep: true,
      immediate: true
    },
    editForm: {
      handler (_new, _old) {
        // console.log('--------------------------------->')
        // console.log(_new)
        if (Object.keys(_new).length !== 0) {
          this.EchoChange(_new)
        }
      },
      deep: true
      // immediate: true
    },
    cityName: {
      handler (_new, _old) {
        // 添加监听事件 若为空则清空
        if (!_new) {
          this.cityID = null
          this.stateID = null
          this.stateList = []
          this.stateName = null
        }
      }
    }
  },
  methods: {
    // Tip
    handleAddressCityClose (done) {
      this.$confirm('Confirm Cancellation?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dialogAddressCityVisibleConfirmChange () {
      const addressArray = this.cloneOldCityAddress.split(', ')
      const cloneCityName = addressArray[addressArray.length - 3]
      this.$axios.get(
        `${this.SH_MAP_PROD_PATH}region/list/Str`,
        {
          params: {
            'keyword': cloneCityName,
            'pageNum': 1,
            'pageSize': 100
          }
        }
      )
        .then(res => {
          const data = res.data
          if (data.success) {
            if (data.data instanceof Array && data.data.length > 0) {
              const cloneCityArr = data.data.map(item => {
                return {
                  'label': `${item.cityAscii},${item.stateId}`,
                  'value': `${item.cityAscii}`,
                  'cityID': item.id,
                  'stateName': item.stateName,
                  'stateID': item.stateId,
                  'lat': item.lat,
                  'lng': item.lng
                }
              })
              this.selectCity(cloneCityArr[0])
              this.dialogAddressCityVisible = false
            }
          }
        })
    },
    // 回显数据
    EchoChange (_info) {
      this.cityID = _info.cityId
      this.stateID = _info.stateId
      this.stateName = _info.stateId
      this.zip = _info.zip
      this.center.lat = _info.latitude
      this.center.lng = _info.longitude
      this.imgUrlList = _info.imgUrl.split(',')
      this.firstVideoUrl = _info.videoUrl ? _info.videoUrl.split(',')[0] : null
      this.videoUrl = _info.videoUrl ? _info.videoUrl.split(',')[1] : null
      this.street = _info.street.split(',')[0]
      this.cityName = _info.street.split(',')[1]
      this.querySearchCity(this.cityName, () => {})
      this.imgFileList = this.imgUrlList.map(item => {
        return {
          url: item,
          uid: parseInt(Math.random() * 100000)
        }
      })
      if (this.videoUrl) {
        this.videoFlag = true
      }
    },
    streetOnBlur () {
      this.street = this.street.trim()
      if (this.street) {
        this.getDetailPosition()
        // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
      }
    },
    checkStreet (_street) {
      const _this = this
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/valite/street`, {params: {street: _street, dealType: this.fromInfo.dealType}})
        .then(res => {
          if (res.data.success) {
            if (!res.data.data.firstTime) {
              _this.checkAddressTip = res.data.data.msg
              _this.checkFormResult.flag = false
              _this.checkFormResult.msg = res.data.data.msg
            } else {
              _this.checkAddressTip = res.data.data.msg
              _this.checkFormResult.flag = true
              _this.checkFormResult.msg = res.data.data.msg
            }
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    fetchLocalAdressChange () {
      const _this = this
      this.$axios.get(this.LJJ_FETCH_LOCAL_ADRESS)
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            const ObjectCenter = JSON.parse(res.data.data)
            _this.center = {lat: Number(ObjectCenter.latitude), lng: Number(ObjectCenter.longitude)}
          } else {
            _this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    clearNoNumber (e) {
      this.zip = e.toString().replace(/\D/g, '').substring(0, 10)
      // console.log(e)
      // e.preventDefault()
      // console.log(e)
      // if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {}
    },
    querySearchCity (_keyword, _cb) {
      this.cityList = []
      this.stateList = []
      this.$axios.get(
        `${this.SH_MAP_PROD_PATH}region/list/Str`,
        {
          params: {
            'keyword': _keyword,
            'pageNum': 1,
            'pageSize': 100
          }
        }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            if (data.data instanceof Array && data.data.length > 0) {
              this.cityList = data.data.map(
                item => {
                  return {
                    'label': `${item.cityAscii},${item.stateId}`,
                    'value': `${item.cityAscii}`,
                    'cityID': item.id,
                    'stateName': item.stateName,
                    'stateID': item.stateId,
                    'lat': item.lat,
                    'lng': item.lng
                  }
                }
              )
              this.cityList.forEach(
                item => {
                  if (this.cityList[0].value === item.value) {
                    this.stateList.push({'stateName': item.stateName, 'stateID': item.stateID})
                  }
                }
              )
              this.cityID = this.cityList[0].cityID
              this.stateName = this.cityList[0].stateName
              this.stateID = this.cityList[0].stateID
              // this.center = {'lat': this.cityList[0].lat, 'lng': this.cityList[0].lng}
              // this.getDetailPosition()
              // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
              _cb(this.cityList)
            } else {
              this.cityID = 0
              this.stateID = 0
              _cb([])
            }
          } else {
            _cb([])
            this.$message.error(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
          _cb([])
        })
    },
    selectCity (_cityInfo) {
      this.cityName = _cityInfo.value
      this.cityID = _cityInfo.cityID
      this.stateList = [{'stateID': _cityInfo.stateID, 'stateName': _cityInfo.stateName}]
      this.stateName = this.stateList[0].stateName
      this.stateID = this.stateList[0].stateID
      // this.center = {'lat': _cityInfo.lat, 'lng': _cityInfo.lng}
      this.getDetailPosition()
      // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
    },
    querySearchState () {
      this.stateList = []
    },
    selectState (_stateID) {
      this.stateID = _stateID
      this.cityList.find(item => item.stateID === _stateID)
      // this.center = {'lat': city.lat, 'lng': city.lng}
      // this.getDetailPosition()
      // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
    },
    getDetailPosition () {
      this.street = this.street.trim()
      // this.cityName = this.cityName.trim()
      // if (!this.street) return
      this.$axios({
        'method': 'get',
        // 'url': this.SH_FETCH_AMAP_GEO,
        'url': 'https://testapi.ebuyhouse.com/ebuyhouse-position/maps/geocode/geo',
        // 'url': `https://maps.googleapis.com/maps/api/geocode/json`, // ${this.zip}
        // 'url': 'https://restapi.amap.com/v3/geocode/geo',
        // 'url': this.SH_FETCH_AMAP_GEO,
        'data': {'needToken': false},
        'params': {
          'address': `${this.street || ''}, ${this.cityName || ''}, ${this.stateID || ''} ${this.zip || ''}`
          // 'city': this.cityName
        }
      })
        .then(response => {
          const results = response.data.results
          if (results.length !== 0) {
            this.center = results[0].geometry.location
            this.cloneOldCityAddress = results[0].formatted_address
            this.checkCity()
          }
          // const results = response.data.data
          // console.log(response.data.location)
          // if (response.data.success) {
          // console.log(results[0].geometry.location)
          // this.center = {lng: Number(results[0].geometry.location.lng), lat: Number(results[0].geometry.location.lat)}
          // console.log(this.center)
          // }
        })
    },
    checkCity () {
      if (this.cloneOldCityAddress && this.cityID) {
        const addressArray = this.cloneOldCityAddress.split(', ')
        const cloneCityName = addressArray[addressArray.length - 3]
        this.$axios.get(
          `${this.SH_MAP_PROD_PATH}region/list/Str`,
          {
            params: {
              'keyword': cloneCityName,
              'pageNum': 1,
              'pageSize': 100
            }
          }
        )
          .then(res => {
            const data = res.data
            if (data.success) {
              if (data.data instanceof Array && data.data.length > 0) {
                this.$axios.get(`${this.SH_MAP_PROD_PATH}region/city`, {params: {id: this.cityID}})
                  .then(res => {
                    if (!this.cloneOldCityAddress.includes(res.data.data[0].cityAscii)) {
                      this.dialogAddressCityVisible = true
                    }
                  })
                  // .catch(err => {})
              }
            }
          })
      }
    },
    beforeUploadVideo (file) {
      if (!['video/mp4', 'video/ogg', 'video/webm', 'video/swf', 'video/gif',
        'video/mp4', 'video/flv', 'video/avi', 'video/mpg', 'video/wmv', 'video/rm',
        'video/3gp', 'video/mov', 'video/asf', 'video/vob', 'video/wmv9', 'video/rmvb'].includes(file.type)) {
        this.$message.error('Please upload  videos in a correct format.')
        return false
      }
      if (file.size > 1024 * 1024 * 100) {
        this.$message.error('The size of video cannot exceed 100MB!')
        return false
      }
    },
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = Number(file.percentage.toFixed(0))
    },
    uploadVideoSuccess (res, file) {
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.success) {
        this.videoUrl = res.data[0]
      } else {
        this.$message.error('Video failed to upload, pleas try again!')
      }
    },
    getCaptrueImage () {
      const _this = this
      this.$refs.video.addEventListener('canplaythrough', function () {
        var video = document.createElement('video')
        var canvas = document.createElement('canvas')
        video.width = 400
        video.height = 300
        video.crossOrigin = 'Anonymous'
        video.setAttribute('crossOrigin', 'Anonymous')
        video.setAttribute('src', _this.$refs.video.currentSrc)
        video.setAttribute('crossorigin', '*')
        canvas.width = _this.$refs.video.videoWidth
        canvas.height = _this.$refs.video.videoHeight
        video.addEventListener('canplaythrough', function () {
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
          var base64 = canvas.toDataURL('image/png')
          _this.uploaderFirstImg(_this.convertBase64UrlToBlob(base64), false)
          // console.log(_this.convertBase64UrlToBlob(base64))
        })
      })
    },
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
    uploaderFirstImg (_file, type) {
      let FormFiles = new FormData()
      if (type) {
        FormFiles.append('filebase64', _file)
      } else {
        FormFiles.append('multipartFiles', _file)
      }
      this.$axios.post(this.uploadImgUrl, FormFiles)
        .then(res => {
          if (res.data) {
            this.firstVideoUrl = res.data.data.pcUrl[0]
          }
        })
    },
    deleteVideoChange (e) {
      e.stopPropagation()
      e.preventDefault()
      this.videoFlag = false
      this.videoUrl = ''
      this.firstVideoUrl = ''
    },
    imgBeforeUpload (_file, _fileList) {
      if (_file.size > 1024 * 1024 * 10) {
        this.$message.error('The size of a single image cannot exceed 10MB.')
        return false
      }
    },
    uploadImgSuccess (_response, _file, _fileList) {
      // this.imgFileList
      // console.log('上传成功后回调------------------------------------->')
      // console.log(_response, _file, _fileList)
      // _fileList.map(item => {
      //   // console.log(item)
      //   if (item.response) {
      //     this.imgFileList =
      //   }
      // }).filter(fs => fs)
      // console.log(this.imgFileList)
      // if (_response) {
      //   this.imgFileList.push({
      //     uid: _file.uid,
      //     url: _response.data.pcUrl[0],
      //     src: _response.data.pcUrl[0]
      //   })
      //   this.imgUrlList.push(_response.data.pcUrl[0])
      // }
      // console.log(this.imgFileList)
      // this.imgUrlList = this.imgFileList.map(item => {
      //   return item.response.data.pcUrl[0]
      // })
      // this.imgUrlList.push(_response.data.pcUrl[0])
      // console.log(_file)
      if (_file.status === 'success') {
        // console.log(_file)
        if (_file.response) {
          this.imgUrlList.push(_file.response.data.pcUrl[0])
          this.imgFileList.push({name: _file.name, url: _file.response.data.pcUrl[0], src: _file.response.data.pcUrl[0]})
        }
      }
    },
    uploadImgErrorChange (err, file, fileList) {
      console.log(err, file, fileList)
    },
    uploadImgChange (file, fileList) {
      // console.log(file, fileList)
      // let imgUrlList = []
      // let imgFileList = []
      // fileList.map(item => {
      //   console.log(item)
      //   if (item.response) {
      //     imgUrlList.push(item.response.data.pcUrl[0])
      //     imgFileList.push({name: file.name, url: item.response.data.pcUrl[0], src: item.response.data.pcUrl[0]})
      //   }
      // })
      // this.imgUrlList = imgUrlList
      // this.imgFileList = imgFileList
      // if (file.status === 'success') {
      //   if (file.response) {
      //     this.imgUrlList.push(file.response.data.pcUrl[0])
      //     this.imgFileList.push({name: file.name, url: file.response.data.pcUrl[0], src: file.response.data.pcUrl[0]})
      //   }
      // }
    },
    imgExceed (_files, _fileList) {
      this.$message.error('The maximum number of pictures you can upload is 50!')
    },
    imgBeforeRemove (_file, _fileList) {
      // console.log(_file, _fileList)
      this.imgUrlList.splice(_fileList.indexOf(_file), 1)
      this.imgFileList.splice(this.imgFileList.indexOf(_file), 1)
      // console.log(this.imgUrlList)
      // console.log(this.imgFileList)
    },
    imgCardPreview (_file) {
      this.dialogImageUrl = _file.url
      this.dialogVisible = true
    },
    checkForm () {
      this.street = this.street.trim()
      this.zip = this.zip.trim()
      if (!this.street) {
        this.setCheckFormResult(this.checkAddressTip = 'Please complete address.')
      } else if (!this.cityID) {
        this.setCheckFormResult(this.checkAddressTip = 'Please choose city from the list of city.')
      } else if (!this.stateID) {
        this.setCheckFormResult(this.checkAddressTip = 'Please select State.')
      } else if (!this.zip) {
        if (this.zip.toString().length < 5 || this.zip.toString().length > 10) {
          this.setCheckFormResult(this.checkAddressTip = 'Please enter the correct postal code, length 5-10.')
        } else {
          this.setCheckFormResult(this.checkAddressTip = 'Please complete Zip Code.')
        }
      } else {
        this.checkAddressTip = ''
      }
      if (!this.imgUrlList.length) {
        this.setCheckFormResult(this.checkImgTip = 'Please upload 2 img at least.')
      } else if (this.imgUrlList.length > 50) {
        this.setCheckFormResult(this.checkImgTip = 'Please upload 50 img at most.')
      } else {
        this.checkImgTip = ''
      }
    },
    setCheckFormResult (_msg) {
      if (this.checkFormResult.flag) {
        this.checkFormResult.flag = false
        this.checkFormResult.msg = _msg
      }
    },
    cloneFrom () {
      const _this = this
      _this.centralizedData = {
        street: `${_this.street}, ${_this.cityName}, ${_this.stateID} ${_this.zip}`,
        cityId: _this.cityID,
        stateId: _this.stateID,
        zip: _this.zip,
        latitude: _this.upCenter.lat,
        longitude: _this.upCenter.lng,
        imgUrl: _this.imgUrlList.join(','),
        videoUrl: _this.videoUrl !== '' ? `${_this.firstVideoUrl},${_this.videoUrl}` : '',
        flag: true
      }
    },
    MarkerCenter (center) {
      this.upCenter = center
    },
    // 图片
    _resultFileList (_list) {
      console.log(_list)
      // 更新图片数据
      this.imgUrlList = _list.map(item => {
        return item.value
      })
    },
    // 视频
    _resultVideoFileList (_list) {
      console.log(_list)
      // 更新视频数据
      this.videoUrl = _list[0].value
      this.firstVideoUrl = _list[0].videoImg
    }
  },
  updated () {
    if (this.$refs.video) {
      this.getCaptrueImage()
    }
  },
  mounted () {
    this.fetchLocalAdressChange()
  },
  beforeDestroy () {
    if (this.$refs.video) {
      this.$refs.video.remove()
    }
  }
}
</script>
