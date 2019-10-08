<template>
  <section class="handover-form-component">
    <header class="handover-form-header">
      <h3>{{title}}</h3>
      <span>{{viceTitle}}</span>
    </header>
    <section class="handover-form-content">
      <ul class="handover-form-contant-bable">
        <li class="handover-form-content-bable-item" v-for="(item, index) in renderArray" :key="item.id">
          <!-- sing -->
          <label :for="index" v-if="item.type === 'sing'">{{item.label}}</label>
          <input v-model="item.value" type="text" :id="index" v-if="item.type === 'sing'" @change="requireNumberChange(item)" @keyup="requireNumberChange(item)">
          <!-- multi -->
          <label :for="index" v-if="item.type === 'multi'">{{item.label}}</label>
          <input v-model="item.address" type="text" :id="index" v-if="item.type === 'multi'" placeholder="Address">
          <input v-model="item.phone" type="text" v-if="item.type === 'multi'" placeholder="Phone number" @change="checkPhoneChange(item)" @keyup="checkPhoneChange(item)">
          <input v-model="item.company" type="text" v-if="item.type === 'multi'" placeholder="Company name">
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
export default {
  data () {
    return {
      renderArray: {
        refrigerator: {
          id: 0,
          label: '*Refrigerator',
          isRequire: true,
          value: 0,
          type: 'sing'
        },
        airConditioner: {
          id: 1,
          label: '*Air Conditioner',
          isRequire: true,
          value: 0,
          type: 'sing'
        },
        securityLockKey: {
          id: 2,
          label: '*Security(Lock/Key)',
          isRequire: true,
          value: 0,
          type: 'sing'
        },
        elecrticity: {
          id: 3,
          label: 'Elecrticity',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        water: {
          id: 4,
          label: 'Water',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        cleaning: {
          id: 5,
          label: 'Cleaning',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        poolMaintenance: {
          id: 6,
          label: 'Pool Maintenance',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        gardening: {
          id: 7,
          label: 'Gardening',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        taxPayment: {
          id: 8,
          label: 'Property Tax Payment',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        trash: {
          id: 9,
          label: 'Trash',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        },
        maintenance: {
          id: 10,
          label: 'Maintenance',
          address: null,
          phone: null,
          company: null,
          type: 'multi'
        }
      }
    }
  },
  props: {
    // 标题
    title: {
      default: null,
      type: String
    },
    // 副标题
    viceTitle: {
      default: null,
      type: String
    },
    // 控制是否可读写
    onReady: {
      type: Boolean,
      default: false
    },
    // 控制是否回传数据
    isSubmitNow: {
      type: Boolean,
      default: false
    },
    // 读取数组
    formArray: {
      default: () => [],
      type: Array[Object]
    }
  },
  watch: {
    isSubmitNow (_new, _old) {
      if (_new && !this.onReady) {
        this.collectionData()
      }
    }
  },
  methods: {
    collectionData () {
      let isCheckOK = true
      this.renderArray.keys().filter(item => {
        return this.renderArray[item].isRequire
      }).map(item => {
        if (!this.renderArray[item].value) {
          isCheckOK = false
        }
      })
      if (isCheckOK) {
        this.$emit('collectionData', {
          flag: true,
          handoverInfo: this.renderArray
        })
      } else {
        this.$emit('collectionData', {
          flag: false
        })
        this.$message.info('Please submit the handover form correctly before submitting.')
      }
    },
    // 必填项校验
    requireNumberChange (item) {
      if (item.isRequire) {
        item.value = Number(item.value.toString().replace(/\D/g, '') || 0) || 0
      }
    },
    // 电话格式化
    checkPhoneChange (item) {
      if (item.phone) {
        // console.log(this.form.phone.toString().replace(/((?![0-9]).)+/g, ''))
        const oldstrLength = item.phone.toString().length
        const str = item.phone.toString().replace(/((?![0-9]).)+/g, '')
        // str.substring(0, 3)
        // str.substring(3, 6)
        // str.substring(6)
        if (oldstrLength <= 5 && str.length <= 3) {
          item.phone = str
        } else if (oldstrLength < 4 && oldstrLength > 3) {
          item.phone = `(${str.substring(0, 3)})`
        } else if (oldstrLength < 10) {
          item.phone = `(${str.substring(0, 3)}) ${str.substring(3, 6)}`
        } else {
          item.phone = `(${str.substring(0, 3)}) ${str.substring(3, 6)}-${str.substring(6, 11)}`
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .handover-form-component
    background-color: #fff
    width: 100%
    height: 100%
    flex: 1
    .handover-form-header
      display: flex
      flex-direction: column
      align-items: center
      padding: 30px 0
      >h3
        font-size: 24px
        color: #444
      >span
        color: #999
        font-size: 14px
    .handover-form-content
      .handover-form-contant-bable
        .handover-form-content-bable-item
</style>
