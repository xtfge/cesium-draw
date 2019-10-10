import Vue from 'vue'
import './plugins/element.js'
import App from './App'
import router from './router'
import Bus from '@/js/Bus'
import utils from '@/js/utils'
import Router from 'vue-router'
import $ from 'jquery'
import cesiumDrawHandler from './index'
Vue.use(cesiumDrawHandler)
// Vue.use(cesiumDrawHandler)

Vue.config.productionTip = false
Vue.use(Router)
window.Bus = Bus
window.$=$
Vue.prototype.Bus = Bus
window.errorCatch = utils.errorCatch
window.$=$
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
