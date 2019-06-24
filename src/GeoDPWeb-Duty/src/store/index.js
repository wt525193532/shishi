import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import session from "./modules/session";
import common from "./modules/common";
import dutyManage from "./modules/dutyManage";
import user from "./modules/user";
import onDuty from "./modules/onDuty";
import organization from "./modules/organization";
import fileMail from "./modules/fileMail";
import SMS from "./modules/SMS";
import dutyReport from "./modules/dutyReport";
import statisticalAnalysis from "./modules/statisticalAnalysis";

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
    dutyManage,
    common,
    onDuty,
    user,
    organization,
    fileMail,
    SMS,
    dutyReport,
    statisticalAnalysis
  },
  getters: {
    menuList: state => state.app.menuList,
    sidebar: state => state.app.sidebar,
    user: state => state.session.user,
    area: state => state.session.administrative
  }
});
