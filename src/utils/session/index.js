// 获取token 方法
export function getToken () {
  const t = window.localStorage.getItem('t')
  if (t) {
    const et = window.localStorage.getItem('et')
    if (et) {
      if (Date.now() >= et) {
        return false
      } else {
        return t
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
// 设置交易状态方法
