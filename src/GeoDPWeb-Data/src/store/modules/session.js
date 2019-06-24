import { getUserConfig, getAllCode, getAllEnum } from "@/api/app";
import util from "@/lib/util";

const session = {
  namespaced: true,
  state: {
    application: {},
    tenant: {},
    administrative: {
      adminCode: "",
      displayName: "",
      level: 0
    },
    user: {
      name: "",
      userName: "",
      emailAddress: "",
      id: 0
    },
    auth: { grantedPermissions: {}, allPermissions: {} },
    nav: {}
  },
  // getters: {
  //   cityCode: state => state.administrative.adminCode,
  //   userLevel: state => state.administrative.level,
  //   displayName: state => state.administrative.displayName,
  // },
  mutations: {
    SET_SESSION: (
      state,
      { application, tenant, administrative, user, auth, nav }
    ) => {
      state.application = application;
      state.tenant = tenant;
      state.administrative = administrative;
      state.user = user;
      state.auth = auth;
      state.nav = nav;
    }
  },
  actions: {
    async init({ commit }, i18n) {
      const response = await getUserConfig();
      const session = response.data.result;
      util.abp = util.extend(true, util.abp, session);
      commit("SET_SESSION", session);
      var menus = session.nav.menus.MainMenu.items;
      commit("app/SET_MENU_LIST", menus, { root: true });
      if (session.user) {
        await getAllEnum().then(res => {
          i18n.mergeLocaleMessage("zh", { enums: res.data.result });
        });
        await getAllCode().then(res => {
          i18n.mergeLocaleMessage("zh", { codes: res.data.result });
        });
      }
    }
  }
};

export default session;
