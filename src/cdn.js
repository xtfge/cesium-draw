import _Vue from 'vue'
import drawViewer from './components/cesiumDrawViewer'
import "@/assets/css/iconfont.css"

drawViewer.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue;
  }
  Vue.component(drawViewer.name, drawViewer)
}

if (typeof window !== 'undefined' && window.Vue) {
  drawViewer.install(window.Vue)
}
export default drawViewer
