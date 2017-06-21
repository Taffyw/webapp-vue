// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import LazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import Scroll from 'base/scroll/Scroll.vue'
import loading from 'base/loading/Loading.vue'
Vue.component('Scroll', Scroll)
Vue.component('loading', loading)
fastclick.attach(document.body)

Vue.use(LazyLoad, {
  loading: require('./assets/def.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
