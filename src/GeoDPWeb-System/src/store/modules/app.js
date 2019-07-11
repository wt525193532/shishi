import { loginByUserName } from "@/api/app";
import util from "@/lib/util";
import Cookies from "js-cookie";

const app = {
  namespaced: true,
  state: {
    menuList: [],
    defaultMenuItems: [
      // {
      //   displayName: "首页",
      //   icon: "icon-geodp-shouye",
      //   isEnabled: true,
      //   isVisible: true,
      //   name: "Home",
      //   order: 0,
      //   url: "/home",
      //   items: [
      //     {
      //       displayName: "首页",
      //       icon: "icon-geodp-shouye",
      //       isEnabled: true,
      //       isVisible: true,
      //       name: "Home1",
      //       order: 0,
      //       items: [],
      //       url: "/home"
      //     },
      //     {
      //       displayName: "首页",
      //       icon: "icon-geodp-shouye",
      //       isEnabled: true,
      //       isVisible: true,
      //       name: "Home2",
      //       order: 0,
      //       url: "/home",
      //       items: []
      //     }
      //   ]
      // },
      {
        name: "organization",
        icon: "icon-geodp-shouye",
        displayName: "行政体系管理",
        url: "/organization",
        items: [
          // {
          //   isEnabled: true,
          //   isVisible: true,
          //   url: "/organization/administrative",
          //   displayName: "行政区划",
          //   icon: "icon-geodp-zhibanrenyuan",
          //   items: []
          // },
          {
            isEnabled: true,
            isVisible: true,
            url: "/organization/user",
            displayName: "用户",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          },
          {
            isEnabled: true,
            isVisible: true,
            url: "/organization/workspace",
            displayName: "单位部门",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          }
        ]
      },
      {
        name: "permissons",
        icon: "icon-geodp-shouye",
        displayName: "权限管理",
        url: "/permissons",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            url: "/permissons/role",
            displayName: "角色",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          },
          {
            isEnabled: true,
            isVisible: true,
            url: "/permissons/menu",
            displayName: "菜单",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          }
        ]
      },
      {
        name: "approvalSetting",
        icon: "icon-geodp-shouye",
        displayName: "审核管理",
        url: "/approvalSetting",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            url: "/approvalSetting/flow",
            displayName: "审核流程",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          },
          {
            isEnabled: true,
            isVisible: true,
            url: "/approvalSetting/object",
            displayName: "审核对象",
            icon: "icon-geodp-zhibanrenyuan",
            items: []
          }
        ]
      },
      {
        name: "otherSetting",
        icon: "icon-geodp-shouye",
        displayName: "更多",
        url: "/otherSetting",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            url: "/otherSetting/logging",
            displayName: "日志管理",
            icon: "icon-geodp-zhibanrenyuan",
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
        item => item.name.toLowerCase() == "systemMenu".toLowerCase()
      );
      if (dr && dr.length == 1)
        menus = dr[0].items.sort((a, b) => (a.order < b.order ? -1 : 1));
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
          });
        }
      });
      // return [...state.defaultMenuItems, ...menus];
      // return state.defaultMenuItems;
      return menus;
    }
  }
};

export default app;
