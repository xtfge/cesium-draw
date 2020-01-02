/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-10 15:55:20
 * @LastEditors  : zhangbo
 * @LastEditTime : 2019-12-26 11:52:35
 * @Desc: 
 */
import Vue from 'vue'
import './plugins/element.js'
import $ from 'jquery'
import utils from '@/js/utils'
import 'jstree'
import 'jstree/dist/themes/default/style.min.css'
import "@/assets/css/iconfont.css";
import drawViewer from './components/cesiumDrawViewer'
Vue.config.productionTip = false
window.$ = $

drawViewer.install = Vue => {
  Vue.component(drawViewer.name, drawViewer)
}

if (typeof window !== 'undefined' && window.Vue) {
  drawViewer.install(window.Vue)
}
export default drawViewer
