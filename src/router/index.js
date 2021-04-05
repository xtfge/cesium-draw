import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router);
const router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: resolve => require(['@/Apps/layout.vue'], resolve)
  }]
})
export default router
