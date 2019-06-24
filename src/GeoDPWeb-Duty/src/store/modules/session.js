import { getUserConfig } from "@/api/app";
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
    async init({ commit }) {
      const response = await getUserConfig();
      const session = response.data.result;
      console.log(session, "sisssss");

      util.abp = util.extend(true, util.abp, session);
      commit("SET_SESSION", session);
      var menus = session.nav.menus.MainMenu.items;
      commit("app/SET_MENU_LIST", menus, { root: true });
    }
  }
};

export default session;
