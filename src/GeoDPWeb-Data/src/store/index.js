import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import session from "./modules/session";
import report from "./modules/report";
import approval from "./modules/approval/index";
import query from "./modules/query";
import statistic from "./modules/statistic";
import querypage from "./modules/querypage";
import organization from "./modules/organization";
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
    statistic,
    querypage,
    organization
  },
  getters: {
    menuList: state => state.app.menuList,
    sidebar: state => state.app.sidebar,
    user: state => state.session.user,
    area: state => state.session.administrative,
    auth: state => state.session.auth
  }
});
