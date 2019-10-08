<template>
  <div class="content-container">
    <div class="header-title">
      <h4>Property Support</h4>
    </div>
    <div class="content-form">
      <el-form :model="appealForm" ref="appealForm" label-width="200px" :rules="rules">
        <el-form-item label="Listing Type" prop="dealType">
          <el-radio-group v-model="appealForm.dealType">
            <el-radio :label="1">For sale</el-radio>
            <el-radio :label="2">For rent</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="email" label="Email">
          <el-input v-model="appealForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Listing Address" prop="address">
          <el-input v-model="appealForm.address" placeholder="Address"></el-input>
        </el-form-item>

        <el-form-item label="Parcel #" prop="apn">
          <el-input v-model="appealForm.apn" placeholder="apn"></el-input>
        </el-form-item>

        <el-form-item label="Message" prop="detail">
          <el-input
            type="textarea"
            v-model="appealForm.detail"
            placeholder="What would you like help with?"
            :rows="10"
          ></el-input>
        </el-form-item>

        <el-form-item label="Proof of Ownership (Upload picture of deed) *Optional*">
          <el-upload
            name="multipartFiles"
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="appealForm.imgUrl" alt>
          </el-dialog>
        </el-form-item>

        <el-form-item class="send-form">
          <el-button class="btns-submit" type="primary" @click="submitForm('appealForm')">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      appealForm: {
        dealType: 1
      },
      rules: {
        dealType: [
          { required: true, message: 'Please select a house type', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input the email address', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change']
          }
        ],
        address: [
          { required: true, message: 'Please fill in the address of the house', trigger: 'blur' }
        ],
        apn: [{ required: true, message: 'Please fill in APN', trigger: 'blur' }],
        detail: [{ required: true, message: 'Please enter the reason', trigger: 'blur' }]
      },
      uploadUrl: this.ZJC_UPLOAD_IMG_PROD_PATH,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters({
      searchFrom: 'searchFrom',
      GlobalUserInfo: 'GlobalUserInfo',
      token: 'token'
    })
  },
  methods: {
    handleRemove (file, fileList) {
      this.appealForm.imgUrl = ''
    },
    handleAvatarSuccess (res, file, fileList) {
      this.appealForm.imgUrl = res.data.pcUrl[0]
    },
    submitForm (formName) {
      let _this = this
      if (!this.token) {
        this.$store.commit('signOut', true)
        return
      }
      _this.appealForm.fkCityId = this.searchFrom.cityId
      _this.appealForm.fkCustomerId = this.GlobalUserInfo.id
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$axios
            .post(`${this.SH_HOUSE_PROD_PATH}thouses/complain`, _this.appealForm)
            .then(res => {
              if (res.data.success) {
                _this.$message({
                  message: 'success',
                  type: 'success'
                })
                _this.$router.push({
                  name: 'house-after',
                  params: {
                    ..._this.appealForm
                  }
                })
              }
            })
            .catch(err => {
              this.$message({
                message: err.msg,
                type: 'error'
              })
            })
        } else {
          this.$message({
            message: 'Complete the required fields! !',
            type: 'error'
          })
          return false
        }
      })
    },
    pageJump (_path) {
      this.$router.push({ path: _path })
    }
  }
}
</script>
<style lang="sass" scoped>
  .content-container
    display: flex
    flex-direction: column
    width: 860px
    .header-title
      padding: 10px 0 50px
      h4
        font-size: 1.875em
        color: #333
        font-weight: bold
    .content-form
      .el-form
        /deep/ .el-form-item
          .el-form-item__label
            text-align: left
            color: #444
            font-size: 1.25em
            font-weight: 400
        .send-form
          margin: 50px 0
          display: flex
          align-items: center
          justify-content: center
          .btns-submit
            height: 2em
            width: 16em
            font-size: 1.5em
</style>
