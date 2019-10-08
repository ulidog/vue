import globalStore from '@/utils/indexedDB/global'
import userInfoStore from '@/utils/indexedDB/userInfo'
import googleMapStore from '@/utils/indexedDB/googleMap'
import buyOrRentStore from '@/utils/indexedDB/buyOrRent'
import notifyStore from '@/utils/indexedDB/notify'
import historyStore from '@/utils/indexedDB/history'
let ebuyhouseDB = {
  name: 'ebuyhouse_2019_6_26_V_2.1',
  version: 1,
  db: null,
  gradeneededs: [
    ...globalStore,
    ...userInfoStore,
    ...googleMapStore,
    ...buyOrRentStore,
    ...notifyStore,
    ...historyStore
  ]
}

let indexDB = {
  indexedDB: window.indexedDB || window.webkitindexedDB,
  IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyTRange,
  IDBTransaction: window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
  IDBCursor: window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor,
  init: function (options = {}, callback) {
    this.openDB(Object.assign(ebuyhouseDB, options), callback)
  },
  openDB: function (ebuyhouseDB, callback) {
    // 建立数据库连接（ObjectStore）
    let _this = this
    let version = ebuyhouseDB.version || 1
    let request = _this.indexedDB.open(ebuyhouseDB.name, version)
    request.onerror = function (e) {
      // console.log(e)
    }
    request.onsuccess = function (e) {
      ebuyhouseDB.db = e.target.result
      console.log(`成功建立并打开数据库：${ebuyhouseDB.name} version ${version}`)
      if (typeof (callback) === 'function') {
        callback(e)
      }
    }
    request.onupgradeneeded = function (e) {
      let db = e.target.result
      // let transaction = e.target.transaction
      ebuyhouseDB.gradeneededs.map(gds => {
        let store
        if (!db.objectStoreNames.contains(gds.name)) {
          // 如果没有则创建该对象空间 （即新建表）
          store = db.createObjectStore(gds.name, {
            keyPath: gds.keyPath
          })
          console.log(`成功创建对象存储空间：${gds.name}----${store}`)
        }
      })
      // console.log(transaction)
    }
  },
  createIndex: function (db, storename, ags) {
    let store = db.transaction(storename, 'readonly').objectStore(storename)
    if (ags instanceof Array && ags.length > 0) {
      ags.forEach((item, index) => {
        store.createIndex(item.serchname, item.keyword, {unique: item.unique || false})
      })
    }
  },
  deletedb: function (dbname) {
    // 删除数据库
    let _this = this
    _this.indexedDB.deleteDatabase(dbname)
    console.log(`${dbname}数据库已删除`)
  },
  closeDB: function (db) {
    db.close()
    console.log('数据库已关闭')
  },
  addData: function (db, storename, data) {
    // 添加数据 重复添加会抛出异常
    let _this = this
    let store = db.transaction(storename, 'readwrite').objectStore(storename)
    let request
    if (data instanceof Array && data.length > 0) {
      data.forEach((item, index, ags) => {
        request = store.add(item)
        request.onerror = function (e) {
          // console.log(e)
          // 进行更新操作
          _this.putData(db, storename, item)
        }
        request.onsuccess = function (e) {
          // console.log(e)
        }
      })
    } else {
      request = store.add(data)
      request.onerror = function (e) {
        // console.log(e)
        // 进行更新操作
        _this.putData(db, storename, data)
      }
      request.onsuccess = function (e) {
        // console.log(e)
      }
    }
  },
  putData: function (db, storename, data) {
    // 更新数据操作
    if (data instanceof Array && data.length > 0) {
      data.forEach((item, index, ags) => {
        this.getDataByKey(db, storename, item.id, (res) => {
          // console.log(res)
          let store = db.transaction(storename, 'readwrite').objectStore(storename)
          let request
          request = store.put(item)
          request.onsuccess = (e) => {
            console.log('更新数据成功')
            // console.log(e)
          }
          request.onerror = (e) => {
            console.log('更新数据失败')
            // console.log(e)
          }
        })
      })
    } else if (data instanceof Object) {
      this.getDataByKey(db, storename, data.id, (res) => {
        // console.log(res)
        let store = db.transaction(storename, 'readwrite').objectStore(storename)
        let request
        request = store.put(data)
        request.onsuccess = (e) => {
          console.log('更新数据成功')
          // console.log(e)
        }
        request.onerror = (e) => {
          console.log('更新数据失败')
          // console.log(e)
        }
      })
    }
  },
  getAllData: function (db, storename, callback) {
    // 获取所有数据
    let store = db.transaction(storename, 'readwrite').objectStore(storename)
    let allRecords = store.getAll()
    allRecords.onsuccess = (e) => {
      // console.log(e)
      if (typeof (callback) === 'function') {
        callback(allRecords.result)
      }
    }
    allRecords.onerror = (e) => {}
  },
  getDataByKey: function (db, storename, key, callback) {
    // console.log(db, storename, key)
    // 根据存储空间的键名查找值
    let store = db.transaction(storename, 'readwrite').objectStore(storename)
    let request = store.get(key)
    request.onerror = (e) => {
      // console.log(e)
      console.log('getDataByKey error')
      if (typeof (callback) === 'function') {
        callback()
      }
    }
    request.onsuccess = (e) => {
      // console.log(e)
      let result = e.target.result
      if (typeof (callback) === 'function') {
        callback(result)
      }
    }
  },
  deleteData: function (db, storename, key) {
    console.log(typeof key)
    let store = db.transaction(storename, 'readwrite').objectStore(storename)
    if (key instanceof Array && key.length > 0) {
      key.map((item, index) => {
        store.delete(item)
        console.log(`删除${storename}中key:${key}`)
      })
    } else if (typeof key === 'string') {
      store.delete(key)
      console.log(`删除${storename}中key:${key}`)
    }
  },
  deleteIndData: function (db, storename, key, ind) {
    console.log(typeof key)
    let store = db.transaction(storename, 'readwrite').objectStore(storename)
    if (key instanceof Array && key.length > 0) {
      for (let i = 0; i < key.length; i++) {
        if (i === ind) {
          key.splice(ind, 1)
          this.$indexDB.putData(this.$ebuyhouseDB.db, 'notify', 'notifyMessageArray')
          console.log(`删除${storename}中key:${key}`)
        }
      }
      // key.map((item, index) => {
      //   if (index === ind) {
      //     store.delete(item[ind])
      //   }
      //   console.log(`删除${storename}中key:${key}`)
      // })
    } else if (typeof key === 'string') {
      store.delete(key)
      console.log(`删除${storename}中key:${key}`)
    }
  },
  clearData: function (db, storename) {
    db.transaction(storename, 'readwrite').objectStore(storename).clear()
    console.log(`已删除${storename}全部记录`)
  }
}

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$ebuyhouseDB', { value: ebuyhouseDB })
    Object.defineProperty(Vue.prototype, '$indexDB', { value: indexDB })
  }
}
