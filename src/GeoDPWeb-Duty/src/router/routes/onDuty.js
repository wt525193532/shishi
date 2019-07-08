const onDuty = [
  {
    path: "onDuty",
    name: "onDuty",
    component: () =>
      import(/* webpackChunkName: "onDuty" */ "@/components/comRouterView"),
    meta: {
      displayName: "值班值守",
      icon: "tianbao",
      permission: "Pages.Duty"
    },
    redirect: { name: "dutyRecordQuery" },
    children: [
      {
        path: "dutyRecordQuery",
        name: "dutyRecordQuery",
        component: () =>
          import(/* webpackChunkName: "dutyRecordQuery" */ "@/view/onDuty/dutyRecordQuery/content"),
        meta: {
          displayName: "值班记录查询",
          icon: "tianbao",
          permission: "Pages.Duty"
        }
      },
      {
        path: "dutyRecord",
        name: "dutyRecord",
        component: () =>
          import(/* webpackChunkName: "dutyRecord" */ "@/view/onDuty/dutyRecord/content"),
        meta: {
          displayName: "值班记录",
          icon: "tianbao",
          permission: "Pages.Duty.Record"
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
          permission: "Pages.Duty.Setting"
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
          permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
          permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
              permission: "Pages.Duty"
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
          permission: "Pages.Duty.Sms"
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
              permission: "Pages.Duty.Sms"
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
              permission: "Pages.Duty.Sms"
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
              permission: "Pages.Duty.Sms"
            }
          }
        ]
      }
    ]
  }
];

export default [...onDuty];
