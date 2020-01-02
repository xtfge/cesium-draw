/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-09 19:42:40
 * @LastEditors  : zhangbo
 * @LastEditTime : 2019-12-26 19:13:48
 * @Desc: 
 */
import Vue from 'vue'
import './plugins/element.js'
import App from './App'
import router from './router'
import Router from 'vue-router'
import 'jstree'
import 'jstree/dist/themes/default/style.min.css'
import $ from 'jquery'
import "@/assets/css/iconfont.css";
// Vue.use(cesiumDrawHandler)
// Vue.use(cesiumDrawHandler)

Vue.config.productionTip = false
Vue.use(Router)
window.$=$
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
