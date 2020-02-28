/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-09 19:47:35
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 11:24:39
 * @Desc: 
 */
import Router from 'vue-router'

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:  resolve => require(['@/Apps/layout/layout'],resolve)
    }
  ]
})
export default router
