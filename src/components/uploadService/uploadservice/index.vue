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
  height: 40px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  padding: 0 15px;
  vertical-align: bottom;
}
.input-zip:focus{
  border: 1px solid #1281fc;
  outline: none;
}
.input-zip::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #ccc;
}
.input-zip::-moz-placeholder { /* Firefox 19+ */
  color: #ccc;
}
.input-zip:-ms-input-placeholder { /* IE 10+ */
  color: #ccc;
}
.input-zip:-moz-placeholder { /* Firefox 18- */
  color: #ccc;
}

.map{
  // width: 80%;
  height: 19em;
  margin-top: 0.3em;
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
  .marginLeft20{
    margin-left: 20.5%;
  }
  .firstTit{
    padding: 2.5rem 3% !important;
    h2{
      font-size: 1.5rem;
      color: #444;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    h4{
      font-size: 0.9rem;
      color: #999;
      font-weight: normal;
    }
  }
  .logoBox{
    padding: 0 4%;
    margin-bottom: 2.5rem;
    .labMark{
      font-size: 1.2rem;
      color: #444;
      display: inline-block;
      width: 20%;
    }
    .logoPic{
      display: inline-block;
      width: 70%;
      .tip{
        font-size: 1rem;
        color:#999;
        margin-bottom: 1.2rem;
      }
      .input-street{
        width: 38.5%!important;
      }
    }
  }
  .bottomMap{
    margin-bottom: 0!important;
  }
  .verticalTop{
    vertical-align: top;
  }
  .borderBottom{
    border-bottom: 1.6rem solid #f3f4f5 !important;
  }
  .part-container{
    padding-bottom: 3rem;
  }
  .submitBtn{
    text-align: center;
    margin-top: 6rem;
    /deep/ .el-button{
      width: 25rem;
      font-size: 1.6rem;
      transition: all linear 0.3s;
      &:hover{
        width: 28rem;
      }
    }
  }
</style>

<template>
  <div class="part-container">
    <div class="section-box firstTit">
      <h2>Upload Service</h2>
      <h4>Please provide your property's info</h4>
    </div>
    <!-- 上传LOGO -->
    <div class="section-box img-box borderBottom">
      <div class="logoBox">
        <span class='labMark verticalTop'>* LOGO</span>
        <!-- <el-upload
          class='logoPic'
          :limit = '1'
          list-type="picture-card"
          name="multipartFiles"
          :action="uploadImgUrl"
          :before-upload="imgBeforeUpload"
          :on-success="uploadLogoSuccess"
          :on-change="uploadImgChange"
          :on-exceed="imgLogoExceed"
          :on-error="uploadImgErrorChange"
          :on-preview="imgCardPreview"
          :before-remove="imgBeforeRemove"
          :file-list="imgLogoFileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <vue-upload-file
          class='marginLeft20'
          type="img"
          accept="image/*"
          resultString="pcUrl"
          :maxLimit="1"
          :url="ZJC_UPLOAD_IMG_PROD_PATH"
          @resultFileList="_resultLogoFileList">
        </vue-upload-file>
      </div>
      <div class="check-img-tip">{{checkImgTip}}</div>
      <!-- 上传LOGO -->
      <!-- Business Category -->
      <div class="logoBox">
        <span class='labMark'>* Business Category</span>
        <el-select class='logoPic' @change="selectBigCat"  v-model="bigCategory" clearable placeholder="Choose categories">
          <el-option
            label="All Category"
            value=null>
          </el-option>
          <el-option
            v-for="(item, index) in categoriesArray"
            :key="index"
            :label="item.type"
            :value="item.typeId">
          </el-option>
        </el-select>
      </div>
      <!-- Business Category -->
      <!-- Name of Business -->
      <div class="logoBox">
        <span class='labMark'>* Name of Business</span>
        <el-input
          class='logoPic'
          placeholder="Please enter name of company"
          v-model="businessName"
          clearable>
        </el-input>
      </div>
      <!-- Name of Business -->
      <!-- Website URL -->
      <div class="logoBox">
        <span class='labMark'>Website URL</span>
        <el-input
          class='logoPic'
          placeholder="Please enter the company website"
          v-model="webUrl"
          clearable>
        </el-input>
      </div>
      <!-- Website URL -->
      <!-- businessName -->
      <div class="logoBox bottomMap">
        <span class='labMark'>* Business Address</span>
        <div class='logoPic'>
          <el-input
            class="input-street"
            v-model="street"
            placeholder="Address"
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
          <input class="input-zip" v-model="zip" placeholder="Zip code" maxlength="5">
         </div>
      </div>
      <!-- businessName -->
      <!-- map -->
      <div class="logoBox">
        <span class='labMark'></span>
        <div class='logoPic map'>
          <vue-google-map :center="center" @MarkerCenter="MarkerCenter"></vue-google-map>
        </div>
      </div>
      <!-- map -->
      <!-- Phone Number -->
      <div class="logoBox">
        <span class='labMark'>* Phone Number</span>
        <el-input
          class='logoPic'
          placeholder="Please enter business phone number"
          v-model="formatPhone"
          maxlength="15"
          clearable>
        </el-input>
      </div>
      <!-- Phone Number -->
      <!-- Contact Email -->
      <div class="logoBox">
        <span class='labMark'>* Contact Email</span>
        <el-input
          class='logoPic'
          placeholder="Please enter email"
          v-model="emailNum"
          clearable>
        </el-input>
      </div>
      <!-- About Your Business  -->
      <div class="logoBox">
        <span class='labMark verticalTop'>About Your Business </span>
        <el-input
          class='logoPic'
          type="textarea"
          :autosize="{ minRows: 8, maxRows: 12}"
          placeholder="Tell us, and everyone else about your business"
          resize="none"
          v-model="businessIntro">
        </el-input>
      </div>
      <!-- About Your Business -->
    </div>
    <!-- 第二部分 -->
    <div class="section-box firstTit">
      <h2>Business Services</h2>
    </div>
    <!-- 上传图片 -->
    <div class="section-box img-box logoBox">
      <span class='labMark verticalTop'>* Upload picture</span>
      <div class='logoPic'>
        <p class='tip'>Number of pictures: 1-9</p>
        <!-- <el-upload
          :limit = '9'
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
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
        <vue-upload-file
          type="img"
          accept="image/*"
          resultString="pcUrl"
          :isDeWeighting="true"
          :isSetHome="true"
          :maxLimit="9"
          :url="ZJC_UPLOAD_IMG_PROD_PATH"
          @resultFileList="_resultFileList">
        </vue-upload-file>
        <div class="check-img-tip">{{checkImgTip}}</div>
      </div>
    </div>
    <!-- 上传video -->
    <div class="section-box video-box logoBox">
      <span class='labMark verticalTop'>Upload Video</span>
      <div class="logoPic">
        <p class='tip'>Limit video duration to 5 minutes, and support video format: rar, swf, gif, jpeg, bmp, mp4, flv,
          avi, mpg, wmv, 3gp, mov, asf, asx, vob, wmv9, rm, rmvb
        </p>
        <!-- <el-upload
          class="avatar-uploader"
          name="multipartFiles"
          :action="uploadVideoUrl"
          :show-file-list="false"
          :before-upload="beforeUploadVideo"
          :on-progress="uploadVideoProcess"
          :on-error="uploadVideoFail"
          :on-success="uploadVideoSuccess">
          <video v-if="videoUrl && !videoFlag" :src="videoUrl" controls="controls" style="display:block;cursor:pointer;width: 400px;height: 300px;" ref="video" id="video">您的浏览器不支持视频播放</video>
          <i v-else-if="!videoUrl && !videoFlag"  style="font-size: 3.5rem;color:#999;vertical-align:middle;" class="el-icon-video-camera-solid avatar-uploader-icon"></i>
          <el-progress v-if="videoFlag" type="circle" :percentage="videoUploadPercent"></el-progress>
          <i v-if="videoUrl && !videoFlag" class="deleteVideo el-icon-delete" @click="deleteVideoChange"></i>
        </el-upload> -->
        <vue-upload-file
          type="video"
          accept="video/*"
          fileIcon="icon-VIDEO"
          :maxLimit="1"
          :url="ZJC_UPLOAD_VIDEO_PROD_PATH"
          @resultFileList="_resultVideoFileList">
        </vue-upload-file>
      </div>
    </div>
    <!-- Category of Service -->
    <div class="logoBox">
      <span class='labMark'>* Category of Service</span>
      <el-select class='logoPic'  v-model="minService" multiple collapse-tags placeholder="You may choose multiple">
        <el-option
          v-for="(item, index) in checkTagsArray"
          :key="index"
          :label="item.name"
          :value="item.businessId">
        </el-option>
      </el-select>
    </div>
    <!-- Category of Service -->
    <!-- About Your Business  -->
    <div class="logoBox">
      <span class='labMark verticalTop'>About Your Business </span>
      <el-input
        class='logoPic'
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 12}"
        placeholder="Enter a description of the services you offer"
        resize="none"
        v-model="businessContent">
      </el-input>
    </div>
    <!-- About Your Business -->
    <p class="submitBtn"><el-button type="primary" @click.native="pubSubmit">Submit</el-button></p>
  </div>
</template>

<script>
// 根据街道
// https://maps.googleapis.com/maps/api/geocode/json?address=街道,城市, 州,邮编&key=AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs
import { mapGetters } from 'vuex'
import GoogleMap from '@/components/release/sale/googleMap'
import UploadFilesComponent from '@/components/common/uploadFiles'
export default {
  name: 'VueBasicInfo',
  components: {
    'vue-google-map': GoogleMap,
    'vue-upload-file': UploadFilesComponent
  },
  data () {
    return {
      categoriesArray: [], // 父类商业分类
      checkTagsArray: [], // 子类标签
      value1: [],
      minService: [],
      bigCategory: '',
      businessName: '', // 公司名称
      phoneNum: '', // 电话
      emailNum: '', // 邮箱
      webUrl: '', // 网址
      businessIntro: '', // 公司简介
      businessContent: '', // 业务类型
      options: [
        {value: 'web', label: 'it1'},
        {value: 'java', label: 'it2'},
        {value: 'ui', label: 'it3'}
      ],
      uploadVideoUrl: this.ZJC_UPLOAD_VIDEO_PROD_PATH,
      uploadImgUrl: this.ZJC_UPLOAD_IMG_PROD_PATH,
      // 'uploadImgUrl': 'http://192.168.0.124:9006/ebuyhouse-upload/api/uploadImages',
      centralizedData: {},
      cityList: [],
      stateList: [],
      street: '',
      cityName: '',
      cityID: 0,
      stateName: '',
      stateID: '',
      zip: '',
      center: {
        'lat': 0,
        'lng': 0
      },
      checkAddressTip: '',
      videoUploadPercent: 0,
      videoFlag: false,
      videoUrl: '',
      firstVideoUrl: '',
      maxImgSize: 1024 * 1024,
      checkImgTip: '',
      imgLogoUrlList: [],
      imgUrlList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      checkFormResult: {
        flag: true,
        msg: ''
      },
      ComponentInit: this,
      Map: null,
      fromInfo: this.downForm,
      isLoading: true,
      upCenter: {
        lat: 0,
        lng: 0
      },
      imgFileList: [], // 上传1-9张图片
      imgLogoFileList: [] // 上传1张图像
    }
  },
  props: {
    isSubmitNow: {
      type: Boolean,
      default: false
    },
    editForm: {
      type: Object,
      default: null
    }
  },
  // 'inject': ['downForm'],
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom'
    }),
    // 电话键入显示格式
    formatPhone: {
      get: function () {
        if (!this.phoneNum) return ''
        const oldstrLength = this.phoneNum.toString().length
        const str = this.phoneNum.toString().replace(/((?![0-9]).)+/g, '')
        if (oldstrLength <= 5 && str.length <= 3) {
          return str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          return `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          return `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      },
      set: function (_val) {
        this.phoneNum = _val
      }
    }
  },
  created () {
    // 通过获取路由信息，判断是否应该回显数据(从服务商列表的编辑跳转过来)
    console.log(this.$route.params.editBackData)
    // 有数据回显数据
    let _info = this.$route.params.editBackData
    if (_info) {
      this.businessName = _info.company // 公司名称
      this.street = _info.address // 公司地址
      this.upCenter.lat = _info.latitude // 东经
      this.upCenter.lng = _info.longitude // 北纬
      this.cityID = _info.cityId // 城市ID
      this.stateID = _info.stateId // 州ID
      this.imgLogoUrlList = [_info.logo] // 图 像
      this.phoneNum = _info.phone // 电话
      this.emailNum = _info.email // 邮箱
      this.webUrl = _info.websiteUrl // 网址
      // this.businessIntro = _info.websiteUrl // 公司简介
      // this.zip = _info. // 邮编
      this.imgUrlList = _info.imgUrl[0] // 上传图片
      this.bigCategory = _info.types[0].mcategory // 大服务类型
      this.minService = _info.types[0].type // 细分服务类型
      // this.businessContent = _info. // 业务类型
      // this.videoUrl = _info. // 视频
      /**********************************************************/
      // this.cityID = _info.cityId
      // this.stateID = _info.stateId
      // this.stateName = _info.stateId
      // this.zip = _info.zip
      // this.center.lat = _info.latitude
      // this.center.lng = _info.longitude
      // this.imgUrlList = _info.imgUrl.split(',')
      // this.firstVideoUrl = _info.videoUrl ? _info.videoUrl.split(',')[0] : null
      // this.videoUrl = _info.videoUrl ? _info.videoUrl.split(',')[1] : null
      // this.street = _info.street.split(',')[0]
      // this.cityName = _info.street.split(',')[1]
      // this.querySearchCity(this.cityName, () => {})
      // this.imgFileList = this.imgUrlList.map(item => {
      //   return {
      //     url: item,
      //     uid: parseInt(Math.random() * 100000)
      //   }
      // })
      // if (this.videoUrl) {
      //   this.videoFlag = true
      // }
    }
  },
  watch: {
    zip (_new, _old) {
      if (!_new) {
        this.zip = ''
        return false
      }
      this.zip = _new.match(/\d/ig) ? _new.match(/\d/ig).join('') : ''
    },
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
    }
  },
  methods: {
    // 上传服务商logo
    _resultLogoFileList (_list) {
      console.log(_list)
      // 更新图片数据
      this.imgLogoUrlList = _list.map(item => {
        return item.value
      })
    },
    // 上传服务商图片
    _resultFileList (_list) {
      console.log(_list)
      // 更新图片数据
      this.imgUrlList = _list.map(item => {
        return item.value
      })
    },
    selectBigCat (_val) {
      // 父类更改需要调整子类参数
      this.remoteChildTagsChange(_val)
      // 父类改变清空子类
      this.minService = []
    },
    // 获取父类商业分类Business Category
    remoteBusinessType (_keyWord = null) {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business/type`, {params: {pageSize: 1000, pageNum: 1, typeName: _keyWord}})
        .then(res => {
          if (res.data.success) {
            this.categoriesArray = res.data.data.rows
          }
        })
    },
    // 获取子类商业分类标签
    remoteChildTagsChange (_parentId = null) {
      this.$axios.get(`${this.LJJ_SERVER_PROD_PATH}service-company/business`, {params: Object.assign({}, {pageSize: 1000, fkTypeId: _parentId})})
        .then(res => {
          if (res.data.success) {
            this.checkTagsArray = res.data.data.rows
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
      _this.$axios.get(`${this.SH_HOUSE_PROD_PATH}thouses/valite/street`, {params: {street: _street, dealType: ''}})
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
    querySearchCity (_keyword, _cb) {
      const _this = this
      _this.cityList = []
      _this.stateList = []
      _this.$axios.get(
        `${_this.SH_MAP_PROD_PATH}region/list/Str`,
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
            if (Array.isArray(data.data) && data.data.length > 0) {
              _this.cityList = data.data.map(
                item => {
                  return {
                    label: `${item.cityAscii},${item.stateId}`,
                    value: `${item.cityAscii}`,
                    cityID: item.id,
                    stateName: item.stateName,
                    stateID: item.stateId,
                    lat: item.lat,
                    lng: item.lng
                  }
                }
              )
              _this.cityList.forEach(
                item => {
                  if (_this.cityList[0].value === item.value) {
                    _this.stateList.push({stateName: item.stateName, stateID: item.stateID})
                  }
                }
              )
              _this.cityID = _this.cityList[0].cityID
              _this.stateName = _this.cityList[0].stateName
              _this.stateID = _this.cityList[0].stateID
              _cb(_this.cityList)
              // this.center = {'lat': this.cityList[0].lat, 'lng': this.cityList[0].lng};
              // _this.getDetailPosition()
              // _this.checkStreet(`${_this.street},${_this.cityName}, ${_this.stateID} ${_this.zip}`)
            } else {
              _this.cityID = 0
              _this.stateID = 0
              _cb([])
            }
          } else {
            _cb([])
            _this.$message.error(data.msg)
          }
        })
        .catch(error => {
          if (error) {}
          _cb([])
        })
    },
    selectCity (_cityInfo) {
      this.getDetailPosition()
      this.cityName = _cityInfo.value
      this.cityID = _cityInfo.cityID
      this.stateList = [{'stateID': _cityInfo.stateID, 'stateName': _cityInfo.stateName}]
      this.stateName = this.stateList[0].stateName
      this.stateID = this.stateList[0].stateID
      // this.center = {'lat': _cityInfo.lat, 'lng': _cityInfo.lng};
      // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
    },
    querySearchState () {
      this.stateList = []
    },
    selectState (_stateID) {
      this.stateID = _stateID
      this.cityList.find(item => item.stateID === _stateID)
      // this.center = {'lat': city.lat, 'lng': city.lng};
      this.getDetailPosition()
      // this.checkStreet(`${this.street},${this.cityName}, ${this.stateID} ${this.zip}`)
    },
    // 高德地图定位
    getDetailPosition () {
      this.street = this.street.trim()
      // this.cityName = this.cityName.trim();
      if (!this.street) return
      this.$axios({
        'method': 'get',
        'url': this.SH_FETCH_AMAP_GEO,
        // 'url': `https://maps.googleapis.com/maps/api/geocode/json`, // ${this.zip}
        // 'url': 'https://restapi.amap.com/v3/geocode/geo',
        // 'url': this.SH_FETCH_AMAP_GEO,
        'data': {'needToken': false},
        'params': {
          'address': `${this.street}, ${this.cityName}, ${this.stateID} ${this.zip}`
          // 'city': this.cityName
        }
      })
        .then(response => {
          const results = response.data.results
          if (results.length !== 0) {
            this.center = results[0].geometry.location
          }
        })
    },
    // 谷歌地图定位
    // getDetailPosition () {
    //   this.street = this.street.trim()
    //   // this.cityName = this.cityName.trim();
    //   this.$axios({
    //     method: 'get',
    //     url: `https://maps.googleapis.com/maps/api/geocode/json`,
    //     data: {'needToken': false},
    //     params: {
    //       address: `${this.street},${this.cityName},${this.stateID},${this.zip}`,
    //       key: 'AIzaSyDGw0Y8By-Xw0HLkoB8gkKB_TrdtpJJFOs'
    //     }
    //   })
    //     .then(response => {
    //       const results = response.data.results
    //       if (results instanceof Array && results.length > 0) {
    //         // console.log(results[0].geometry.location)
    //         this.center = results[0].geometry.location
    //       }
    //     })
    // },
    // 视频
    _resultVideoFileList (_list) {
      console.log(_list)
      // 更新视频数据
      this.videoUrl = _list[0].value
      this.firstVideoUrl = _list[0].videoImg
    },
    // 视频上传前
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
    // 视频上传中
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = Number(file.percentage.toFixed(0))
    },
    // 上传视频成功
    uploadVideoSuccess (res, file) {
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.success) {
        this.videoUrl = res.data[0]
      } else {
        this.$message.error('Video failed to upload, pleas try again!')
      }
    },
    // 上传视频失败
    uploadVideoFail () {
      this.videoFlag = false
      this.videoUploadPercent = 0
      this.$message.error('Video failed to upload, pleas try again!')
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
    // 上传logo
    uploadLogoSuccess (_response, _file, _fileList) {
      if (_file.status === 'success') {
        // console.log(_file)
        if (_file.response) {
          this.imgLogoUrlList.push(_file.response.data.pcUrl[0])
          // this.imgFileList.push({name: _file.name, url: _file.response.data.pcUrl[0], src: _file.response.data.pcUrl[0]})
        }
      }
    },
    // 上传图片
    uploadImgSuccess (_response, _file, _fileList) {
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
    imgLogoExceed (_files, _fileList) {
      this.$message('The maximum number of Logo you can upload is one!')
    },
    imgExceed (_files, _fileList) {
      this.$message('The maximum number of pictures you can upload is 9!')
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
        this.setCheckFormResult(this.checkImgTip = 'Please upload 1 img at least.')
      } else if (this.imgUrlList.length > 9) {
        this.setCheckFormResult(this.checkImgTip = 'Please upload 9 img at most.')
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
    // 上传服务商提交参数
    cloneFrom () {
      // const _this = this
      // _this.centralizedData = {
      //   street: `${_this.street}, ${_this.cityName}, ${_this.stateID} ${_this.zip}`,
      //   cityId: _this.cityID,
      //   stateId: _this.stateID,
      //   zip: _this.zip,
      //   latitude: _this.upCenter.lat,
      //   longitude: _this.upCenter.lng,
      //   imgUrl: _this.imgUrlList.join(','),
      //   videoUrl: _this.videoUrl !== '' ? `${_this.firstVideoUrl},${_this.videoUrl}` : '',
      //   flag: true
      // }
      // _this.centralizedData = {
      //   company: _this.businessName, // 公司名称
      //   address: `${_this.street}, ${_this.cityName}, ${_this.stateID} ${_this.zip}`, // 公司地址
      //   latitude: _this.upCenter.lat, // 东经
      //   longitude: _this.upCenter.lng, // 北纬
      //   cityId: _this.cityID, // 城市ID
      //   stateId: _this.stateID, // 州ID
      //   logo: _this.imgLogoFileList.join(','), // 图像
      //   phone: _this.phoneNum, // 电话
      //   email: _this.emailNum, // 邮箱
      //   websiteUrl: _this.webUrl, // 网址
      //   content: _this.businessIntro, // 公司简介
      //   companyCode: _this.zip, // 邮编
      //   imgUrl: _this.imgUrlList.join(','), // 上传图片
      //   category: _this.minService.join(','), // 细分服务类型
      //   businessContent: _this.businessContent, // 业务类型
      //   videoUrl: _this.videoUrl !== '' ? `${_this.firstVideoUrl},${_this.videoUrl}` : '', // 视频
      //   videoImg: '', // 视频首图
      //   flag: true
      // }
    },
    // 提交发布服务商
    pubSubmit () {
      let _this = this
      let _info = {
        company: _this.businessName, // 公司名称
        address: `${_this.street}, ${_this.cityName}, ${_this.stateID} ${_this.zip}`, // 公司地址
        latitude: _this.upCenter.lat, // 东经
        longitude: _this.upCenter.lng, // 北纬
        cityId: _this.cityID, // 城市ID
        stateId: _this.stateID, // 州ID
        logo: _this.imgLogoUrlList.join(','), // 图像
        phone: _this.phoneNum.replace(/((?![0-9]).)+/g, ''), // 电话
        email: _this.emailNum, // 邮箱
        websiteUrl: _this.webUrl, // 网址
        content: _this.businessIntro, // 公司简介
        companyCode: _this.zip, // 邮编
        imgUrl: _this.imgUrlList.join(','), // 上传图片
        category: _this.minService.join(','), // 细分服务类型
        businessContent: _this.businessContent, // 业务类型
        videoUrl: _this.videoUrl !== '' ? `${_this.videoUrl}` : '', // 视频
        videoImg: _this.firstVideoUrl !== '' ? `${_this.firstVideoUrl}` : '', // 视频首图
        flag: true
      }
      if (_this.imgLogoUrlList.length === 0) {
        _this.$message({message: 'Logo can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.businessName) {
        _this.$message({message: 'BusinessName can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.street) {
        _this.$message({message: 'street can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.cityID) {
        _this.$message({message: 'city can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.stateID) {
        _this.$message({message: 'state can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.zip) {
        _this.$message({message: 'zip code can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.phoneNum) {
        _this.$message({message: 'phone can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!_this.emailNum) {
        _this.$message({message: 'email can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (!/^[A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(_this.emailNum)) {
        _this.$message({message: 'Incorrect mailbox format', type: 'error', showClose: true, duration: 2000})
        return
      }
      if (_this.minService.length === 0) {
        _this.$message({message: 'category can not be blank', type: 'error', showClose: true, duration: 2000})
        return
      }
      this.$axios.post(`${this.LJJ_SERVER_PROD_PATH}service-company/insert/company`, _info)
        .then(res => {
          if (res.data.success) {
            _this.$message({message: res.data.msg, type: 'success', duration: 2000})
            setTimeout(function () {
              _this.$router.push({path: '/userCenter/service/' + 'check'})
            }, 1000)
          } else {
            console.log('发布服务商失败!')
          }
        })
    },
    MarkerCenter (center) {
      this.upCenter = center
    }
  },
  updated () {
    if (this.$refs.video) {
      this.getCaptrueImage()
    }
  },
  mounted () {
    this.fetchLocalAdressChange()
    this.remoteBusinessType() // 初始化父类商业分类
    this.remoteChildTagsChange() // 初始化子类商业分类
  },
  beforeDestroy () {
    if (this.$refs.video) {
      this.$refs.video.remove()
    }
  }
}
</script>
