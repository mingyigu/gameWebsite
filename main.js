import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'
import {Routes} from './routes'

console.log('routes',Routes)
const router = new VueRouter({
  routes:Routes,
  mode:"history",//去掉#
})

Vue.use(VueRouter)
new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
});

