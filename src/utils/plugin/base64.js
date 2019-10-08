import { Base64 } from 'js-base64'
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$base64', { value: Base64 })
  }
}
