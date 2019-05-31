import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:  resolve => require(['@/components/layout/layout'],resolve)
    }
  ]
})
export default router
