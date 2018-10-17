/**
 * Author: LyonWong
 * Date: 2018-05-16
 */

import axios from 'axios'

let api = {
  options: {
    baseURL: 'http://api.com'
  },
  request: function(method, url, data, options) {
    options = {...this.options, ...options}
    options.method = method
    options.url = url
    options.data = data
    return new Promise((resolve, reject) => {
      axios.request(options).then( (response) => {
        if (response.data.error === '0') {
          resolve(response.data)
        } else {
          reject && reject(response.data)
        }
      }).catch(console.error)
    })
  },
  get: function(path, params, options={}) {
    options.params = params
    return api.request('get', path, null, options)
  },
  post: function(path, data, options={}) {
    return api.request('post', path, data, options)
  }
}

export default api
