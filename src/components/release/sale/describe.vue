<style scoped>
textarea{
  width: 90%;
  height: 11em;
  padding: 1em;
  margin-left: 5%;
  resize: none;
  font-size: 1.1em;
}
</style>

<template>
  <div class="part-container">
    <slot></slot>
    <div class="part-body">
      <textarea spellcheck="false" maxlength="10000" :placeholder="placeText" v-model="describe"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      describe: ''
    }
  },
  props: {
    isSubmitNow: false,
    placeText: {
      type: String,
      default: 'Enter description here'
    },
    editForm: {
      type: Object,
      default: null
    }
  },
  watch: {
    isSubmitNow () {
      if (this.isSubmitNow) this.submit()
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
    EchoChange (_info) {
      this.describe = _info.houseDesc
    },
    submit () {
      this.$emit('collectData', {'flag': true, 'houseDesc': this.describe})
    }
  }
}
</script>
