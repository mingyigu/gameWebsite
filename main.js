import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'
import {Routes} from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

console.log('routes',Routes)
const router = new VueRouter({
  routes:Routes,
  mode:"hash",//去掉#
})
Vue.use(VueRouter)
Vue.use(ElementUI)
new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
});


