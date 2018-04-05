import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@utils/axios';
import data from './modules/data';


Vue.use(Vuex);

if (process.env.NODE_ENV !== 'production') {
  axios.post('/login', {
    userName: 'admin',
    pwd: "Wisedu@2017"
  }, {
    baseURL: '/appsummary'
  })
}

const state = {
  loading: false
}


const mutations = {
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    data
  }
})
