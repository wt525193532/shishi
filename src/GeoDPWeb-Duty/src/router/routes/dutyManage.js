const dutyManage = [
  {
    path: "dutyManage",
    name: "dutyManage",
    component: () =>
      import(/* webpackChunkName: "dutyManage" */ "@/components/comRouterView"),
    meta: {
      displayName: "值班管理",
      icon: "tianbao",
      permission: ""
    },
    redirect: { name: "dutyPersonManage" },
    children: [
      {
        path: "dutyPersonManage",
        name: "dutyPersonManage",
        component: () =>
          import(/* webpackChunkName: "dutyPersonManage" */ "@/view/dutyManage/dutyPersonManage/content"),
        meta: {
          displayName: "值班人员管理",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        path: "schedueManage",
        name: "schedueManage",
        component: () =>
          import(/* webpackChunkName: "schedueManage" */ "@/view/dutyManage/schedueManage/content"),
        meta: {
          displayName: "排班管理",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        path: "handOverManage",
        name: "handOverManage",
        component: () =>
          import(/* webpackChunkName: "handOverManage" */ "@/view/dutyManage/handOverManage/content"),
        meta: {
          displayName: "交接班管理",
          icon: "tianbao",
          permission: ""
        }
      },
      {
        path: "shiftManage",
        name: "shiftManage",
        component: () =>
          import(/* webpackChunkName: "shiftManage" */ "@/view/dutyManage/shiftManage/content"),
        meta: {
          displayName: "班次管理",
          icon: "tianbao",
          permission: ""
        }
      }
    ]
  }
];

export default [...dutyManage];
