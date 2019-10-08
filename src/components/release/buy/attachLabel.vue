<style scoped>
.part-body{
  padding-top: 1em;
  padding-left: 5%;
  padding-right: 5%;
  user-select: none;
  display: flex;
  flex-wrap: wrap;

}

.el-tag{
  font-size: 1em;
  margin-top: 1em;
  margin-right: 1em;
  cursor: pointer;
}

.el-tag.no-selected{
  background-color: #ffffff;
  color: #666666;
  border: 1px solid #dcdfe6;
}

.button-new-tag {
  font-size: 1em;
  margin-top: 1em;
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  font-size: 1em;
  margin-top: 1em;
  margin-right: 1em;
  vertical-align: bottom;
}
</style>

<template>
  <div class="part-container">
    <h4>Amenities</h4>
    <div class="part-body">

      <el-tag class="no-selected" v-for="(label, index) in labelData" :key="'preinstall' + index"
        :disable-transitions="true"
        @click.native="toggleLabel($event, label.id)">
        {{label.name}}
      </el-tag>

      <el-tag
        v-for="(label, index) in customLabel"
        :key="'custom' + index"
        @close="deleteCustomLabel(index)"
        :disable-transitions="true"
        closable>
        {{label}}
      </el-tag>

      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        maxlength="30"
        @keyup.enter.native="addCustomLabel"
        @blur="addCustomLabel">
      </el-input>

      <el-button
        v-if="!inputVisible"
        class="button-new-tag" size="small"
        @click="showInput">
        + New Tag
      </el-button>

    </div>
  </div>
</template>

<script>
let uniqueKey = 1

export default {
  data () {
    return {
      'inputVisible': false,
      'inputValue': '',
      'labelData': [],
      'selectedLabel': [],
      'customLabel': []
    }
  },
  'props': {
    'isSubmitNow': false
  },
  'watch': {
    isSubmitNow () {
      if (this.isSubmitNow) this.submit()
    }
  },
  'methods': {
    getUniqueKey () {
      return uniqueKey++
    },
    // 获取标签数据
    getLabelData () {
      this.$axios.get(`${this.zjc_path}findLabelList`)
        .then(response => {
          const data = response.data
          if (data.success) {
            if (data.data instanceof Array && data.data.length > 0) {
              this.labelData = data.data
            }
          } else {
            // alert(data.msg);
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    toggleLabel (_e, _id) {
      if (this.selectedLabel.includes(_id)) {
        _e.target.classList.add('no-selected')
        this.selectedLabel.splice(this.selectedLabel.findIndex(item => item === _id), 1)
      } else {
        _e.target.classList.remove('no-selected')
        this.selectedLabel.push(_id)
      }
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addCustomLabel () {
      const state = this.inputValue.trim().replace(/((?=[\x21-\x7e]*)[^A-Za-z0-9\s\-_.=!@#$%^&*(){}+\\|>?/[\];"'])/g, '')
      if (state) {
        this.customLabel.push(state)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    deleteCustomLabel (_index) {
      this.customLabel.splice(_index, 1)
    },
    submit () {
      this.$emit(
        'collectData',
        {
          'flag': true,
          'labelExtar': this.selectedLabel.join(','),
          'advantage': this.customLabel.join(',')
        }
      )
    }
  },
  created () {
    this.getLabelData()
  }
}
</script>
