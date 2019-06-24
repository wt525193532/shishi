import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import session from "./modules/session";
import report from "./modules/report";
import approval from "./modules/approval/index";
import query from "./modules/query";
import statistic from "./modules/statistic";

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
    session,
    report,
    approval,
    query,
    statistic
  },
  getters: {
    menuList: state => state.app.menuList,
    sidebar: state => state.app.sidebar,
    user: state => state.session.user,
    area: state => state.session.administrative
  }
});
