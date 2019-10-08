export function getStateLineStore (playType, state) {
  let status
  switch (Number(playType)) {
    // 普通
    case 1:
      switch (Number(state)) {
        case 1:
          status = 0
          break
        case 2:
        case 3:
        case 4:
          status = 1
          break
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          status = 2
          break
        case 22:
        case 192:
          status = 3
          break
        case 23:
        case 24:
        case 25:
        case 26:
        case 195:
        case 196:
        case 197:
        case 198:
        case 199:
          status = 4
          break
        case 27:
        case 28:
          status = 5
          break
        default:
          status = 5
      }
      break
    // SFT
    case 2:
      switch (Number(state)) {
        case 1:
          status = 0
          break
        case 2:
        case 3:
        case 4:
          status = 1
          break
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          status = 2
          break
        case 10:
        case 11:
          status = 3
          break
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
          status = 4
          break
        case 22:
        case 23:
        case 24:
        case 192:
          status = 5
          break
        case 25:
        case 26:
          status = 6
          break
        case 27:
        case 28:
        case 195:
        case 196:
        case 197:
        case 198:
        case 199:
          status = 7
          break
        default:
          status = 7
      }
      break
    default:
      switch (Number(state)) {
        case 1:
          status = 0
          break
        case 2:
        case 3:
        case 4:
          status = 1
          break
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          status = 2
          break
        case 11:
          status = 3
          break
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
          status = 4
          break
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 197:
          status = 4
          break
        default:
          status = 4
      }
  }
  return status
}
export function deepCopy (o) {
  if (o instanceof Array) {
    let n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    let n = {}
    for (let i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}
export function deepClone (obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
export class UploadServers {
  constructor (options) {
    this.xhr = null
    this.startTime = null
    this.startFileSize = 0
    this.formData = null
    // this = options
    Object.keys(options).map(item => {
      this[item] = options[item]
    })
    this.init(options)
  }
  init (options) {
    this.config = {...this.config, ...options}
    this.xhr = new XMLHttpRequest()
    this.formData = new FormData()
    if (this.config.data && Object.prototype.toString.call(this.config.data) === '[object Object]') {
      // 循环添加其他参数
      this.config.data.keys(item => {
        this.formData.append(item, this.config.data[item])
      })
    }
    // console.log(this.config)
    // console.log(this.config.file.toString())
    // console.log(Array.prototype.slice.call(this.config.file).toString())
    if (this.config.file.toString() === '[object FileList]' || this.config.file.toString() === '[object File]' || this.config.file.toString() === '[object Array]' || this.config.file.toString().includes('[object File]')) {
      this.uploadFile(this.config.file, true)
    } else {
      this.uploadFile(this.config.file)
    }
  }
  uploadFile (file, isArray) {
    // this.xhr
    const _this = this
    if (isArray) {
      Object.values(file).forEach(function (item) {
        _this.formData.append(_this.config.uploadFileName, item)
      })
    } else {
      this.formData.append(this.config.uploadFileName, file)
    }
    this.xhr.open('post', this.config.url, true)
    this.xhr.onload = function (e) {
      _this.updataSucess(e)
    }
    this.xhr.onerror = function (e) {
      _this.updataError(e)
    }
    this.xhr.upload.onprogress = function (e) {
      _this.progressChange(e)
    }
    this.xhr.upload.onloadstart = function (e) {
      _this.startUpload(e)
    }
    this.xhr.send(this.formData)
  }
  startUpload (e) {
    // console.log(e)
    this.startTime = new Date().getTime()
    this.startFileSize = 0
  }
  updataSucess (e) {
    // console.log(e)
    // console.log(this)
    // console.log(uploadServers)
    this.config.success(e)
  }
  updataError (e) {
    console.log(e)
    this.config.error(e)
  }
  progressChange (e) {
    // console.log(e)
    if (e.lengthComputable) {
      const newTime = new Date().getTime()
      let pertime = (newTime - this.startTime) / 1000
      // 如果时间为0 则返回避免出现Infinity 兼容IOS进度函数读取过快问题
      if (pertime === 0) pertime = 0.001
      this.startTime = newTime

      const perload = e.loaded - this.startFileSize
      const lave = e.loaded / e.total
      this.startFileSize = e.loaded

      let speed = perload / pertime
      // console.log(perload, pertime)
      // const speeds = speed

      let units = 'b/s'
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'k/s'
      }
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'M/s'
      }
      if (speed / 1024 > 1) {
        speed = speed / 1024
        units = 'G/s'
      }
      // console.log(speed)
      speed = speed.toFixed(1)
      // console.log(speed)
      // const resout = ((e.total - e.loaded) / speeds).toFixed(1)

      this.config.progress(e, speed, lave, e.loaded, units)
    }
  }
}
