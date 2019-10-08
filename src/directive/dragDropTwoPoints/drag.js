export default {
  bind (el, binding, vnode) {
    console.log('bind成功')
  },
  inserted (el, binding, vnode) {
    console.log('inserted成功')
  },
  update (el, binding, vnode, oldnode) {
    console.log('update成功')
  },
  componentUpdated (el, binding, vnode, oldnode) {
    console.log('componentUpdated成功')
  },
  unbind (el, binding, vnode) {
    console.log('unbind成功')
  }
}
