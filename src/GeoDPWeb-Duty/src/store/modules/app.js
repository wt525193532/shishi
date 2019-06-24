import { loginByUserName } from "@/api/app";
import api from "@/api/app";
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
      //   url: "/home"
      // },
      {
        name: "dutyManage",
        icon: "icon-geodp-shouye",
        displayName: "值班管理",
        url: "/dutyManage",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/dutyManage/dutyPersonManage",
            displayName: "值班人员管理",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/dutyManage/schedueManage",
            displayName: "排班管理",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/dutyManage/handOverManage",
            displayName: "交接班管理",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/dutyManage/shiftManage",
            displayName: "班次管理",
            icon: "icon-geodp-zhibanrenyuan"
          }
        ]
      },
      {
        icon: "icon-geodp-shouye",
        displayName: "值班值守",
        url: "/onDuty",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/onDuty/dutyRecord",
            displayName: "值班记录",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/onDuty/dutySetting",
            displayName: "值班设置",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true, // 控制是否展开
            isVisible: true,
            url: "/onDuty/dutyReport",
            displayName: "灾险情上报",
            icon: "icon-geodp-zhibanrenyuan",
            items: [
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/dutyReport/disasterReport",
                displayName: "灾情报送（表一）",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/dutyReport/dangerReport",
                displayName: "险情报送（表二）",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/dutyReport/successHedgeReport",
                displayName: "成功避险报送（表三）",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/dutyReport/preDisasterReport",
                displayName: "防灾概述报送（表四）",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/dutyReport/emergencyWorkReport",
                displayName: "地灾应急工作统计表报送（表五）",
                icon: "icon-geodp-zhibanrenyuan"
              }
            ]
          },
          {
            isEnabled: true,
            isVisible: true, // 控制是否展开
            url: "/onDuty/fileReceive",
            displayName: "文件收发",
            icon: "icon-geodp-zhibanrenyuan",
            items: [
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/fileReceive/sendFile",
                displayName: "发送文件",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/fileReceive/receiveBox",
                displayName: "收文箱",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/fileReceive/sendBox",
                displayName: "发文箱",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/fileReceive/draftBox",
                displayName: "草稿箱",
                icon: "icon-geodp-zhibanrenyuan"
              }
              // {
              //   url: '/onDuty/fileReceive/starFile',
              //   displayName: '标星文件'
              // },
              // {
              //   url: '/onDuty/fileReceive/notDealFile',
              //   displayName: '待办文件'
              // }
            ]
          },
          {
            isEnabled: true,
            isVisible: true, // 控制是否展开
            url: "/onDuty/shortMessageManage",
            displayName: "短信管理",
            icon: "icon-geodp-zhibanrenyuan",
            items: [
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/shortMessageManage/shortMesSend",
                displayName: "短信发送",
                icon: "icon-geodp-zhibanrenyuan"
              },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/shortMessageManage/shortMesTem",
                displayName: "短信模板",
                icon: "icon-geodp-zhibanrenyuan"
              },
              // {
              //   url: '/onDuty/shortMessageManage/comLanguage',
              //   displayName: '常用语管理'
              // },
              {
                isEnabled: true,
                isVisible: true,
                items: [],
                url: "/onDuty/shortMessageManage/sendRecordManage",
                displayName: "发送记录管理",
                icon: "icon-geodp-zhibanrenyuan"
              }
              // {
              //   url: '/onDuty/shortMessageManage/rainFallManage',
              //   displayName: '雨量阈值管理'
              // }
            ]
          }
        ]
      },
      {
        isEnabled: true,
        isVisible: true,
        icon: "icon-geodp-shouye",
        displayName: "统计分析",
        url: "/statisticalAnalysis",
        items: [
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/disasterRS",
            displayName: "灾情报送统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/emergencyRS",
            displayName: "险情报送统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/successfulHedgeRS",
            displayName: "成功避险报送统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/disasterSummaryRS",
            displayName: "防灾概述报送统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/disasterEmergencyWorkRS",
            displayName: "防灾应急工作统计报表报送统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/postStatistics",
            displayName: "发文统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/receiveStatistics",
            displayName: "收文统计",
            icon: "icon-geodp-zhibanrenyuan"
          },
          {
            isEnabled: true,
            isVisible: true,
            items: [],
            url: "/statisticalAnalysis/SMSStatistics",
            displayName: "短信统计",
            icon: "icon-geodp-zhibanrenyuan"
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
    // eslint-disable-next-line
    async logout ( { commit } ) {
      return new Promise(resolve => {
        util.setToken("");
        commit("SET_MENU_LIST", []);
        resolve();
      });
    },
    // eslint-disable-next-line
    async canTakeOver ( { commit } ) {
      return await api.canTakeOver();
    },
    // eslint-disable-next-line
    async takeOver ( { commit } ) {
      return await api.takeOver();
    }
  },
  getters: {
    sidebarMenus: state => {
      let menus = [];
      let dr = state.menuList.filter(
        item => item.name.toLowerCase() === "dutyMenu".toLowerCase()
      );
      if (dr && dr.length === 1) {
        menus = dr[0].items.sort((a, b) => (a.order < b.order ? -1 : 1));
      }

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
      // return [...state.defaultMenuItems, ...menus];
      return menus;
      // return state.defaultMenuItems;
    }
  }
};

export default app;
