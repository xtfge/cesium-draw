import Router from 'vue-router'

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:  resolve => require(['@/examples/layout/layout'],resolve)
    }
  ]
})
export default router
