import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Menu from './components/Menu'
import Decision from './components/Decision'
import Battle from './components/Battle'
import VueRouter from 'vue-router'
import {gameState} from "./gamestate";
// import {gameState} from "./gamestate";

Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false

const routes = [
  { path: '/', component: Menu },
  { path: '/decide', component: Decision },
  { path: '/battle', component: Battle }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
router.beforeEach((to,from,next) => {
  console.log(to,from,next,gameState)

  if (to.path!=='/' &&!gameState.loggedIn ){
    next('/')
  }
  else
    next()

})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
