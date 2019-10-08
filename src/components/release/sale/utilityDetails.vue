<style scoped>
.floor-group {
  width: 96%;
  margin-left: 3%;
  margin-bottom: 2em;
}

.floor-group:last-child {
  margin-bottom: 0;
}

.floor-title {
  font-size: 1.2rem;
}

.floor-body {
  padding-left: 5%;
  overflow: hidden;
}

.el-checkbox {
  display: block;
  float: left;
  width: 24.5%;
  margin-top: 1rem;
}

.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.part-container>h4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.part-container>h4>i {
  margin-right: 10px;
}
</style>

<template>
  <div class="part-container-page">
    <div class="part-container" v-for="(item, index) in houseExtarList" :key="index">
      <h4 @click="item.switchLabel = !item.switchLabel"><span>{{item.name}}</span> <i :class="[item.switchLabel ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i></h4>
      <div class="part-body" v-show="item.switchLabel">
        <div class="floor-group" v-for="(items, indexs) in item.data" :key="`${index}-${indexs}`">
          <h6 class="floor-title">{{items.name}}</h6>
          <div class="floor-body">
            <el-checkbox
              v-for="(_items, _indexs) in items.data"
              :key="`${index}-${indexs}-${_indexs}-0`"
              :label="_items.value"
              v-model="checkHouseExtarList"
              v-show="items.name !== 'Pet'"
            >{{_items.name}}</el-checkbox>
            <el-radio v-if="items.name == 'Pet'" v-model="communityDetailsRadio" v-for="(_items, _indexs) in items.data" :key="`${index}-${indexs}-${_indexs}-1`" :label="_items.value">{{_items.name}}</el-radio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      houseExtarList: [],
      checkHouseExtarList: [],
      communityDetailsRadio: null
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
  watch: {
    isSubmitNow (_new, _old) {
      if (!_new) return
      this.$emit('collectData', {
        houseExtarStr: [...this.checkHouseExtarList, this.communityDetailsRadio].join(','),
        flag: true
      })
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
    // 回显
    EchoChange (_info) {
      if (_info.houseExtarStr) {
        let extarList = _info.houseExtarStr.split(',')
        if (extarList.includes('13NB')) {
          this.communityDetailsRadio.push('13NB')
          extarList.remove('13NB')
        } else if (extarList.includes('13NA')) {
          this.communityDetailsRadio.push('13NA')
          extarList.remove('13NA')
        }
        // this.filterLabel(this.houseExtarList, extarList)
        this.checkHouseExtarList = extarList
      }
    },
    getHouseFacilitiesData () {
      const _this = this
      this.$axios({
        method: 'get',
        url: `${this.SH_HOUSE_PROD_PATH}thouses/select/extar`
      })
        .then(response => {
          const data = response.data
          if (data.success) {
            const arr = data.data.map(item => {
              item['switchLabel'] = false
              return item
            })
            console.log(arr)
            _this.houseExtarList = arr
          }
        })
        .catch(error => {
          if (error) {}
        })
    },
    filterLabel (list, filterList) {
      let rss = []
      list.map((item, index) => {
        if (item.data) {
          const lp = {
            name: item.name,
            data: this.filterLabel(item.data, filterList).flat()
          }
          if (lp.data.length !== 0) {
            return lp
          }
        } else {
          filterList.map((items, indexs) => {
            if (items === item.value) {
              rss.push(item)
            }
          })
          if (rss.length !== 0 && index === list.length - 1) {
            return rss
          }
        }
      }).filter(fs => fs)
      return rss
    }
  },
  mounted () {
    this.getHouseFacilitiesData()
  }
}
</script>
