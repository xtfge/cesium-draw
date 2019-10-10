/**
 @Author:zhangbo
 @Date:2019-03-13 11:29:13
 @E-mail:zhangb@geovie.com.cn
 @Last Modified by:zhangbo
 @Last Modified time:2019-03-13 11:29:13
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  //开发环境下开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isLogin:false
  },
  mutations: {},
  actions: {}
});
