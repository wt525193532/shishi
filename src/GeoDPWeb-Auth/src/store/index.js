import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import session from "./modules/session";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    session
  },
  getters: {
    menuList: state => state.app.menuList,
    sidebar: state => state.app.sidebar,
    user: state => state.session.user,
    area: state => state.session.administrative
  }
});
