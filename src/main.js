/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-09 19:42:40
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 13:50:56
 * @Desc: 
 */
import Vue from 'vue'
import './plugins/element.js'
import App from './App'
import "@/assets/css/iconfont.css";

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
