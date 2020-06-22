import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Menu from './components/Menu'
import Decision from './components/Decision'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false

const routes = [
  { path: '/', component: Menu },
  { path: '/decide', component: Decision }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
