// import 'babel-polyfill';
import Vue from 'vue';
import './flexibility';
import './hook';
import router from './router';
import './index.scss';
import store from './store';

router.beforeEach((route, redirect, next) => {
  document.title = route.meta.title || document.title;
  // route.query.schoolCode = 'NBU';
  // route.query.token = 'i2RePbbandA0HU955JLkobLdEgnP05';
  next();
});

export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
