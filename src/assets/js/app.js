/**
 * Author: LyonWong
 * Date: 2018-03-24
 */

import cookie from 'js-cookie'

const config = require('../../config')

const app = {
  env: () => {
    if (window.__wxjs_environment === 'miniprogram') {
      return 'wxa'
    }
    if (navigator.userAgent.match(/WindowsWechat/)) {
      return 'wxw'
    }
    if (navigator.userAgent.match(/Mobile.*MicroMessenger/)) {
      return 'wxm'
    }
    return undefined
  },
  os: () => {
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
  linkToAssets: (path) => {
    let prefix = config.assetsPreUrl.indexOf('http') === 0 ? '' : location.origin
    return prefix + config.assetsPreUrl + path
  },
  init: () => {
  }
};

export default app
