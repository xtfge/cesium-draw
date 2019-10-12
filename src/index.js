import Vue from 'vue'
import './plugins/element.js'
import Bus from '@/js/Bus'
import $ from 'jquery'
import utils from '@/js/utils'
import drawViewer from '@/components/drawViewer'
// import {Polyline,Polygon,PolylineCollection,PolygonCollection} from "@/js/drawHandler";
// import markerViewer from '@/components/marker'

Vue.config.productionTip = false
window.Bus = Bus
Vue.prototype.Bus = Bus
window.$ = $
window.errorCatch = utils.errorCatch

drawViewer.install = Vue => {
  Vue.component(drawViewer.name, drawViewer)
}

if (typeof window !== 'undefined' && window.Vue) {
  drawViewer.install(window.Vue)
}
export default drawViewer
