import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../view/Home')), 'index/home')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      alias: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'VueMp-Home'
      }
    }
  ]
})
