const capitalize = word => {
  if (!word) return ''
  return word.toString().charAt(0).toUpperCase() + word.slice(1)
}
const timesFormat = (times) => {
  if (times === null) return '00/0/0000'
  const time = (times.toString().length > 10 && times.toString().length < 13) ? times : times + '000'
  const timerInfo = new Date(Number(time))
  return `${timerInfo.getMonth() + 1}/${timerInfo.getDate()}/${timerInfo.getFullYear()}`
}
const priceFormat = (_N) => {
  let AfterProgressing = []
  parseInt(_N).toString().replace(/\D/g, '').split('').filter(items => {
    if (items !== ',') {
      return items
    }
  }).map((item, index, arg) => {
    if ((arg.length - 1 - index) % 3 === 0) {
      AfterProgressing.unshift(item)
      if ((index + 1) !== arg.length) {
        AfterProgressing.unshift(',')
      }
    } else {
      AfterProgressing.unshift(item)
    }
  })
  return AfterProgressing.reverse().join('')
}
const stringToJSON = (_string) => {
  if (!_string) return {}
  try {
    return JSON.parse(_string)
  } catch (retunr) {
    return {}
  }
}
const stringToJSONArray = (_string) => {
  if (!_string) return []
  try {
    return JSON.parse(_string)
  } catch (error) {
    return []
  }
}
const stringToArray = (_string, type = ',') => {
  if (!_string) return []
  return _string.split(type)
}
// 电话格式
const telephoneFormat = (_num) => {
  if (_num) {
    let _val = _num.replace(/[^0-9*]/ig, '')
    if (_val !== '') {
      return '(' + _val.substr(0, 3) + ') ' + _val.substr(3, 3) + '-' + _val.substr(6)
    }
  }
}
// formatHTML
const HtmlToString = (_string) => {
  _string = _string.replace(/<\/?.+?>/g, '')
  _string = _string.replace(/(\n)/g, '')
  _string = _string.replace(/(\t)/g, '')
  _string = _string.replace(/(\r)/g, '')
  _string = _string.replace(/<\/?[^>]*>/g, '')
  _string = _string.replace(/\s/g, ' ')
  _string = _string.replace(/&nbsp;/g, ' ')
  _string = _string.replace(/&rsquo;/g, '’')
  _string = _string.replace(/&lsquo;/g, '‘')
  _string = _string.replace(/&hellip;/g, '…')
  _string = _string.replace(/&ndash;/g, '–')
  _string = _string.replace(/&mdash;/g, '—')
  _string = _string.replace(/&sbquo;/g, '‚')
  _string = _string.replace(/&ldquo;/g, '“')
  _string = _string.replace(/&rdquo;/g, '”')
  _string = _string.replace(/&bdquo;/g, '„')
  _string = _string.replace(/&dagger;/g, '†')
  _string = _string.replace(/&Dagger;/g, '‡')
  _string = _string.replace(/&bull;/g, '•')
  _string = _string.replace(/&permil;/g, '‰')
  _string = _string.replace(/&prime;/g, '′')
  _string = _string.replace(/&Prime;/g, '″')
  _string = _string.replace(/&lsaquo;/g, '‹')
  _string = _string.replace(/&rsaquo;/g, '›')
  _string = _string.replace(/&oline;/g, '‾')
  _string = _string.replace(/&frasl;/g, '⁄')
  return _string
}

const timerFormat = (timer) => {
  // console.log(timer)
  if (!timer) return
  const time = timer.toString().length > 10 ? timer : `${timer}000`
  const timers = new Date(Number(time))
  return `${timers.getHours() < 10 ? '0' + timers.getHours() : timers.getHours()}:${timers.getMinutes() < 10 ? '0' + timers.getMinutes() : timers.getMinutes()}:${timers.getSeconds() < 10 ? '0' + timers.getSeconds() : timers.getSeconds()} ${timers.getMonth() + 1}/${timers.getDate()}/${timers.getFullYear()}`
}

export {capitalize, timesFormat, priceFormat, stringToJSON, stringToJSONArray, stringToArray, telephoneFormat, HtmlToString, timerFormat}
