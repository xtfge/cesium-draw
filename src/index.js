/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-10 15:55:20
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-02-28 14:24:50
 * @Desc: 
 */
import Vue from 'vue'
import './plugins/element.js'
import drawViewer from './components/cesiumDrawViewer'
import "@/assets/css/iconfont.css"

Vue.config.productionTip = false

drawViewer.install = Vue => {
  Vue.component(drawViewer.name, drawViewer)
}

if (typeof window !== 'undefined' && window.Vue) {
  drawViewer.install(window.Vue)
}
export default drawViewer
