// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VueLazyload from 'vue-lazyload'
// import $ from 'jquery'
// import VueAxios from 'vue-axios'
import { axiosGet, axiosPost } from '@/store/http'
import Public from './assets/publicJs/public'
Vue.config.productionTip = false
Vue.use(MintUI)
// Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Public)
Vue.use(VueLazyload)
// Vue.use(VueAxios, axios)
Vue.prototype.$ajax = Axios
Vue.prototype.$get = axiosGet
Vue.prototype.$post = axiosPost
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
