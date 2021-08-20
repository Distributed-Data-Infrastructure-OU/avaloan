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

Vue.use(Vue2Filters);
Vue.config.productionTip = false;
Vue.use(AsyncComputed);
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
