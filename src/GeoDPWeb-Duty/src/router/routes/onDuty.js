const onDuty = [
  {
    path: "onDuty",
    name: "onDuty",
    component: () =>
      import(/* webpackChunkName: "onDuty" */ "@/components/comRouterView"),
    meta: {
      displayName: "值班值守",
      icon: "tianbao",
      permission: ""
    },
    redirect: { name: "dutyReport" },
    children: [
      {
        path: "dutyRecord",
        name: "dutyRecord",
        component: () =>
          import(/* webpackChunkName: "dutyRecord" */ "@/view/onDuty/dutyRecord/content"),
        meta: {
          displayName: "值班记录",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        path: "dutySetting",
        name: "dutySetting",
        component: () =>
          import(/* webpackChunkName: "dutySetting" */ "@/view/onDuty/dutySetting/content"),
        meta: {
          displayName: "值班设置",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        path: "dutyReport",
        name: "dutyReport",
        component: () =>
          import(/* webpackChunkName: "dutyReport" */ "@/components/comRouterView"),
        meta: {
          displayName: "灾险情上报",
          icon: "tianbao",
          permission: ""
        },
        redirect: { name: "disasterReport" },
        children: [
          {
            path: "disasterReport",
            name: "disasterReport",
            component: () =>
              import(/* webpackChunkName: "disasterReport" */ "@/view/onDuty/dutyReport/disasterReport/content"),
            meta: {
              displayName: "灾情报送（表一）",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "dangerReport",
            name: "dangerReport",
            component: () =>
              import(/* webpackChunkName: "dangerReport" */ "@/view/onDuty/dutyReport/dangerReport/content"),
            meta: {
              displayName: "险情报送（表二）",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "successHedgeReport",
            name: "successHedgeReport",
            component: () =>
              import(/* webpackChunkName: "successHedgeReport" */ "@/view/onDuty/dutyReport/successHedgeReport/content"),
            meta: {
              displayName: "成功避险报送（表三）",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "preDisasterReport",
            name: "preDisasterReport",
            component: () =>
              import(/* webpackChunkName: "preDisasterReport" */ "@/view/onDuty/dutyReport/preDisasterReport/content"),
            meta: {
              displayName: "防灾概述报送（表四）",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "emergencyWorkReport",
            name: "emergencyWorkReport",
            component: () =>
              import(/* webpackChunkName: "emergencyWorkReport" */ "@/view/onDuty/dutyReport/emergencyWorkReport/content"),
            meta: {
              displayName: "地灾应急工作统计表报送（表五）",
              icon: "tianbao",
              permission: ""
            }
          }
        ]
      },
      {
        path: "fileReceive",
        name: "fileReceive",
        component: () =>
          import(/* webpackChunkName: "fileReceive" */ "@/components/comRouterView"),
        meta: {
          displayName: "文件收发",
          icon: "tianbao",
          permission: ""
        },
        redirect: { name: "sendFile" },
        children: [
          {
            path: "sendFile",
            name: "sendFile",
            component: () =>
              import(/* webpackChunkName: "sendFile" */ "@/view/onDuty/fileReceive/sendFile/content"),
            meta: {
              displayName: "发送文件",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "receiveBox",
            name: "receiveBox",
            component: () =>
              import(/* webpackChunkName: "receiveBox" */ "@/view/onDuty/fileReceive/receiveBox/content"),
            meta: {
              displayName: "收文箱",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "sendBox",
            name: "sendBox",
            component: () =>
              import(/* webpackChunkName: "successHedgeReport" */ "@/view/onDuty/fileReceive/sendBox/content"),
            meta: {
              displayName: "发文箱",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "draftBox",
            name: "draftBox",
            component: () =>
              import(/* webpackChunkName: "draftBox" */ "@/view/onDuty/fileReceive/draftBox/content"),
            meta: {
              displayName: "草稿箱",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "starFile",
            name: "starFile",
            component: () =>
              import(/* webpackChunkName: "starFile" */ "@/view/onDuty/fileReceive/starFile/content"),
            meta: {
              displayName: "标星文件",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "notDealFile",
            name: "notDealFile",
            component: () =>
              import(/* webpackChunkName: "notDealFile" */ "@/view/onDuty/fileReceive/notDealFile/content"),
            meta: {
              displayName: "待办文件",
              icon: "tianbao",
              permission: ""
            }
          }
        ]
      },
      {
        path: "shortMessageManage",
        name: "shortMessageManage",
        component: () =>
          import(/* webpackChunkName: "shortMessageManage" */ "@/components/comRouterView"),
        meta: {
          displayName: "短信管理",
          icon: "tianbao",
          permission: ""
        },
        redirect: { name: "shortMesSend" },
        children: [
          {
            path: "shortMesSend",
            name: "shortMesSend",
            component: () =>
              import(/* webpackChunkName: "shortMesSend" */ "@/view/onDuty/shortMessageManage/shortMesSend/content"),
            meta: {
              displayName: "短信发送",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "shortMesTem",
            name: "shortMesTem",
            component: () =>
              import(/* webpackChunkName: "shortMesTem" */ "@/view/onDuty/shortMessageManage/shortMesTem/content"),
            meta: {
              displayName: "短信模板",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "comLanguage",
            name: "comLanguage",
            component: () =>
              import(/* webpackChunkName: "comLanguage" */ "@/view/onDuty/shortMessageManage/comLanguage/content"),
            meta: {
              displayName: "常用语管理",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "sendRecordManage",
            name: "sendRecordManage",
            component: () =>
              import(/* webpackChunkName: "sendRecordManage" */ "@/view/onDuty/shortMessageManage/sendRecordManage/content"),
            meta: {
              displayName: "发送记录管理",
              icon: "tianbao",
              permission: ""
            }
          },
          {
            path: "rainFallManage",
            name: "rainFallManage",
            component: () =>
              import(/* webpackChunkName: "rainFallManage" */ "@/view/onDuty/shortMessageManage/rainFallManage/content"),
            meta: {
              displayName: "雨量阈值管理",
              icon: "tianbao",
              permission: ""
            }
          }
        ]
      }
    ]
  }
];

export default [...onDuty];
