import Vue from 'vue'
import './plugins/element.js'
import App from './App'
import "@/assets/css/iconfont.css";
import router from './router'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
