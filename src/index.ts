// import 'babel-polyfill';
import Vue from 'vue';
import './flexibility';
import './hook';
import router from './router';
import './index.scss';
import store from './store';

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
