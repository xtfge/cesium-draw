/*
 * @Author: zhangbo
 * @E-mail: zhangb@geovis.com.cn
 * @Date: 2019-10-10 15:55:20
 * @LastEditors: zhangbo
 * @LastEditTime: 2020-03-01 13:44:07
 * @Desc: 
 */
import _Vue from 'vue'
import './plugins/element.js'
import drawViewer from './components/cesiumDrawViewer'
import "@/assets/css/iconfont.css"


_Vue.config.productionTip = false

drawViewer.install = Vue => {
  if(!Vue){
    window.Vue=Vue=_Vue;
  }
  Vue.component(drawViewer.name, drawViewer)
}

if (typeof window !== 'undefined' && window.Vue) {
  drawViewer.install(window.Vue)
}
export default drawViewer
