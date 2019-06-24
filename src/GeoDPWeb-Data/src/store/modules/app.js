import { loginByUserName } from "@/api/app";
import util from "@/lib/util";
import Cookies from "js-cookie";

const app = {
  namespaced: true,
  state: {
    loading: false,
    menuList: [],
    defaultMenuItems: [
      // {
      //   displayName: "首页",
      //   icon: "icon-geodp-shouye",
      //   isEnabled: true,
      //   isVisible: true,
      //   name: "Home",
      //   order: 0,
      //   url: "/home"
      // },
      // {
      //   displayName: "填报",
      //   icon: "icon-geodp-shouye",
      //   isEnabled: true,
      //   isVisible: true,
      //   name: "Aeport",
      //   order: 0,
      //   url: "/report"
      // },
      // {
      //   displayName: "审核",
      //   icon: "icon-geodp-shenpi",
      //   isEnabled: true,
      //   isVisible: true,
      //   name: "Approval",
      //   order: 0,
      //   url: "/approval"
      // },
      {
        displayName: "查询",
        icon: "icon-geodp-shouye",
        isEnabled: true,
        isVisible: true,
        name: "query",
        order: 0,
        url: "/query",
        children: [
          {
            displayName: "地质灾害隐患点查询",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.basicInfo",
            order: 0,
            url: "/query/basicInfo"
          },
          {
            displayName: "防灾预案表查询",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.preventPlan",
            order: 0,
            url: "/query/preventPlan"
          },
          {
            displayName: "防灾工作明白卡",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.workCard",
            order: 0,
            url: "/query/workCard"
          },
          {
            displayName: "避险明白卡",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.riskCard",
            order: 0,
            url: "/query/riskCard"
          },
          {
            displayName: "专业监测点数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.professionalMnt",
            order: 0,
            url: "/query/professionalMnt"
          },
          {
            displayName: "简易监测点数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.simpleMnt",
            order: 0,
            url: "/query/simpleMnt"
          },
          {
            displayName: "治理工程数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.engineer",
            order: 0,
            url: "/query/engineer"
          },
          {
            displayName: "应急排危数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.eliminateDanger",
            order: 0,
            url: "/query/eliminateDanger"
          },
          {
            displayName: "搬迁避让数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.relocation",
            order: 0,
            url: "/query/relocation"
          },
          {
            displayName: "培训演练",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.training",
            order: 0,
            url: "/query/training"
          },
          {
            displayName: "地质遗迹数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.heritageProtection",
            order: 0,
            url: "/query/heritageProtection"
          },
          {
            displayName: "矿山治理工程进展数据采集",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "Query.governDataCollect",
            order: 0,
            url: "/query/governDataCollect"
          }
        ]
      },
      // {
      //   displayName: "统计",
      //   icon: "icon-geodp-shouye",
      //   isEnabled: true,
      //   isVisible: true,
      //   name: "statistic.index",
      //   order: 0,
      //   url: "/statistic"
      // }
      {
        displayName: "设置",
        icon: "icon-geodp-shouye",
        isEnabled: true,
        isVisible: true,
        name: "setting.index",
        order: 0,
        url: "/setting",
        items: [
          {
            displayName: "审核流程",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "setting.setFlow",
            order: 0,
            url: "/setting/setFlow"
          },
          {
            displayName: "菜单配置",
            icon: "icon-geodp-shouye",
            isEnabled: true,
            isVisible: true,
            name: "setting.setMenu",
            order: 0,
            url: "/setting/setMenu"
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
    loading: (state, loading) => {
      state.loading = loading;
    },
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
    }
  },
  actions: {
    async login(contxt, { username, password, rememberMe }) {
      let rep = await loginByUserName(username, password, rememberMe);
      const tokenExpireDate = rememberMe
        ? new Date(
            new Date().getTime() + 1000 * rep.data.result.expireInSeconds
          )
        : undefined;
      const accessToken = rep.data.result.accessToken;
      util.setToken(accessToken, tokenExpireDate);
      return rep.data;
    },
    // 登出
    //eslint-disable-next-line
    async logout ( { commit } ) {
      return new Promise(resolve => {
        util.setToken("");
        commit("SET_MENU_LIST", []);
        resolve();
      });
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
      // return [...menus, ...state.defaultMenuItems];
      menus.forEach(menu => {
        if (menu.items.length > 0) {
          menu.items.forEach((subMenu, i, subMenus) => {
            for (let j = 0; j < subMenus.length - 1 - i; j++) {
              if (subMenus[j + 1].order < subMenus[j].order) {
                let temp = subMenus[j + 1];
                subMenus[j + 1] = subMenus[j];
                subMenus[j] = temp;
              }
            }
            if (subMenu.items.length > 0) {
              subMenu.items.forEach((item, x, ssubMenus) => {
                for (let y = 0; y < ssubMenus.length - 1 - x; y++) {
                  if (ssubMenus[y + 1].order < ssubMenus[y].order) {
                    let temp = ssubMenus[y + 1];
                    ssubMenus[y + 1] = ssubMenus[y];
                    ssubMenus[y] = temp;
                  }
                }
              });
            }
          });
        }
      });
      return menus;
    }
  }
};

export default app;
