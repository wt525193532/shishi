/* eslint-disable no-unused-vars */
import {
  loginByUserName,
  getCurrentUserConfig,
  ChangePassword,
  getUserConfig,
  UpdateProfile
} from "@/api/app";
import util from "@/lib/util";
import Cookies from "js-cookie";

const app = {
  namespaced: true,
  state: {
    menuList: [],
    applyList: [],
    defaultMenuItems: [
      {
        displayName: "首页",
        icon: "icon-geodp-shouye",
        isEnabled: true,
        isVisible: true,
        name: "Home",
        order: 0,
        url: "/home",
        items: [
          {
            displayName: "首页",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Home1",
            order: 0,
            url: "/home",
            items: [
              {
                displayName: "首页",
                icon: "icon-geodp-shouye",
                isEnabled: true,
                isVisible: true,
                name: "Home2",
                order: 0,
                url: "/home"
              }
            ]
          },
          {
            displayName: "首页",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Home2",
            order: 0,
            url: "/home",
            items: []
          }
        ]
      }
    ],
    sidebar: {
      opened: Cookies.get("sidebarOpened")
        ? !!+Cookies.get("sidebarOpened")
        : true,
      withoutAnimation: false
    }
  },
  mutations: {
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList;
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarOpened", 0);
      } else {
        Cookies.set("sidebarOpened", 1);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set("sidebarOpened", 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    SET_APPLY_LIST: (state, menuList) => {
      state.menuList = menuList;
    }
  },
  actions: {
    async UpdateProfile({ commit }, data) {
      let rep = await UpdateProfile(data);
      return rep;
    },
    async ChangePassword({ commit }, data) {
      let rep = await ChangePassword(data);
      return rep;
    },
    //eslint-disable-next-line
    async login ( { commit }, data ) {
      let rep = await loginByUserName(data);
      const tokenExpireDate = data.rememberClient
        ? new Date(
            new Date().getTime() + 1000 * rep.data.result.expireInSeconds
          )
        : undefined;
      const accessToken = rep.data.result.accessToken;
      util.setToken(accessToken, tokenExpireDate);
      return rep;
    },

    // 登出
    //eslint-disable-next-line
    async logout ( { commit } ) {
      return new Promise(resolve => {
        util.setToken("");
        commit("SET_MENU_LIST", []);
        resolve();
      });
    },
    async getCurrentUserConfig({ commit }) {
      let rep = await getCurrentUserConfig();
      commit("SET_APPLY_LIST", rep.data);
      return rep;
    },
    async getUserConfig({ commit }) {
      let rep = await getUserConfig();

      return rep;
    }
  },
  getters: {
    sidebarMenus: state => {
      let menus = [];
      let dr = state.menuList.filter(
        item => item.name.toLowerCase() == "DataReportMenu".toLowerCase()
      );
      if (dr && dr.length == 1)
        menus = dr[0].items.sort((a, b) => (a.order < b.order ? -1 : 1));
      return [...state.defaultMenuItems, ...menus];
    }
  }
};

export default app;
