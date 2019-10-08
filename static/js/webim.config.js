/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */
var WebIM = {}
window.WebIM = {}
WebIM.config = {
  /*
   * XMPP server
   */
  xmppURL: 'im-api.easemob.com',
  /*
   * Backend REST API URL
   */
  apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  /*
   * Application AppKey
   */
  appkey: '1137181009253489#ebuyhouse',

  /*
   * Whether to use wss
   * @parameter {Boolean} true or false
   */
  https: false,
  /*
   * isMultiLoginSessions
   * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
   * false: A visitor can sign in to only one webpage and receive messages at the webpage.
   */
  isMultiLoginSessions: false,
  /*
   * set presence after login
   */
  isAutoLogin: true,
  /**
   * Whether to use window.doQuery()
   * @parameter {Boolean} true or false
   */
  isWindowSDK: false,
  /**
   * isSandBox=true:  xmppURL: 'im-api-sandbox.easemob.com',  apiURL: '//a1-sdb.easemob.com',
   * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
   * @parameter {Boolean} true or false
   */
  isSandBox: false,
  /**
   * Whether to console.log in strophe.log()
   * @parameter {Boolean} true or false
   */
  isDebug: true,
  /**
   * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
   * won't auto connect if autoReconnectNumMax=0.
   */
  autoReconnectNumMax: 2,
  /**
   * the interval seconds between each auto reconnectting.
   * works only if autoReconnectMaxNum >= 2.
   */
  autoReconnectInterval: 2,
  /**
   * webrtc supports WebKit and https only
   */
  isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https:$/.test(window.location.protocol),
  /**
   * after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive.
   */
  heartBeatWait: 4500,
  /**
   * while http access,use ip directly,instead of ServerName,avoiding DNS problem.
   */
  isHttpDNS: false,

  /**
   * Will show the status of messages in single chat
   * msgStatus: true  show
   * msgStatus: true  hide
   */
  msgStatus: true,

  /**
   * When a message arrived, the receiver send an ack message to the
   * sender, in order to tell the sender the message has delivered.
   * See call back function onReceivedMessage
   */
  delivery: true,

  /**
   * When a message read, the receiver send an ack message to the
   * sender, in order to tell the sender the message has been read.
   * See call back function onReadMessage
   */
  read: false,

  /**
   * Will encrypt text message and emoji message
   * {type:'none'}   no encrypt
   * {type:'base64'} encrypt with base64
   * {type:'aes',mode: 'ebc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(ebc)
   * {type:'aes',mode: 'cbc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(cbc)
   */
  encrypt: {
    type: 'none'
  }
}

WebIM.parseEmoji = function (msg) {
  if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
    return msg
  } else {
    var emoji = WebIM.Emoji
    var regs = null
    var msgList = []
    var objList = []
    for (var face in emoji.map) {
      if (emoji.map.hasOwnProperty(face)) {
        while (msg.indexOf(face) > -1) {
          msg = msg.replace(face, '^' + emoji.map[face] + '^')
        }
      }
    }
    var ary = msg.split('^')
    regs = /^e.*g$/
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] !== '') {
        msgList.push(ary[i])
      }
    }
    for (var k = 0; k < msgList.length; k++) {
      var obj = {}
      if (regs.test(msgList[k])) {
        obj['data'] = msgList[k]
        obj['type'] = 'emoji'
        objList.push(obj)
      } else {
        obj['data'] = msgList[k]
        obj['type'] = 'txt'
        objList.push(obj)
      }
    }
    console.log('[Leo]parseEmoji', objList)
    return objList
  }
}

WebIM.time = function () {
  var date = new Date()
  var Hours = date.getHours()
  var Minutes = date.getMinutes()
  var Seconds = date.getSeconds()
  var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (Hours < 10 ? '0' + Hours : Hours) + ':' + (Minutes < 10 ? '0' + Minutes : Minutes) + ':' + (Seconds < 10 ? '0' + Seconds : Seconds)
  return time
}
