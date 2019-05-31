// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import Bus from '@/js/Bus'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import Cesium from 'cesium/Cesium'
import axios from 'axios'
import utils from '@/js/utils'
import '../static/conf/globalURL'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
window.Bus=Bus
Vue.prototype.Bus = Bus
window.Cesium=Cesium
Vue.prototype.axios=axios
window.axios=axios
window.$=$
window.errorCatch=utils.errorCatch
$.ajax({
  url: 'static/conf/global_config.json',
  type: "GET",
  async: false,
  contentType: "application/json",
  success: function (response) {
    Vue.prototype.GLOBAL = response;
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
