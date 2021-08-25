// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vue2Filters from 'vue2-filters'
import AsyncComputed from 'vue-async-computed'
import store from './store';
import pricesMixin from './mixins/prices';
import setupFilters from './utils/filters';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoadersBallBeat from 'vue-loaders/dist/loaders/ball-beat';

Vue.config.productionTip = false;

Vue.use(Vue2Filters);
Vue.use(AsyncComputed);
Vue.use(VueLoadersBallBeat);
Vue.mixin(pricesMixin);

setupFilters();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
