// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Index from './index'
import router from './router'
import axios from 'axios'

import app from '@/assets/js/app'
import api from '@/assets/js/api'
import wx from 'weixin-js-sdk'

import adaptor from '@/assets/js/screen-adaptor'

adaptor(750, (screen) => {
  return screen.width < screen.height ? screen.width : '750'
})

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.prototype.axios = axios
Vue.use(router)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

api.options.baseURL = app.config.local.apiBase

Vue.prototype.wx = wx
Vue.prototype.api = api
Vue.prototype.app = app

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: {Index},
  template: '<index/>'
});

app.init()
