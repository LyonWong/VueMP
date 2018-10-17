/**
 * Author: LyonWong
 * Date: 2018-03-24
 */

import cookie from 'js-cookie'

const config = require('../../config')

const app = {
  env: () => { // 操作环境
    if (window.__wxjs_environment === 'miniprogram') {
      return 'wxa' // 小程序
    }
    if (navigator.userAgent.match(/Mobile.*MicroMessenger/)) {
      return 'wxm' // 微信移动端
    }
    return undefined
  },
  os: () => { // 操作系统
    let res = navigator.userAgent.match(/(Windows|Android|iOS|iPhone|iPad)/)
    if (res) {
      if (res[1] === 'iPhone' || res[1] === 'iPad') {
        return 'iOS'
      } else {
        return res[1]
      }
    } else {
      return undefined
    }
  },
  config: config,
  cookie: cookie,
  signIn: () => {
    let callback = window.location.href
    callback = encodeURIComponent(callback)
    window.location.href = '/sign-in?callbackURI=' + callback
  },
  linkToAssets: (path) => { // 引用资源路径
    let prefix = config.assetsPreUrl.indexOf('http') === 0 ? '' : location.origin
    return prefix + config.assetsPreUrl + path
  },
  init: () => {
  }
};

export default app
