const dutyManage = [
  {
    path: "dutyManage",
    name: "dutyManage",
    component: () =>
      import(/* webpackChunkName: "dutyManage" */ "@/components/comRouterView"),
    meta: {
      displayName: "值班管理",
      icon: "tianbao",
      permission: "Pages.Duty.Manage"
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
          permission: "Pages.Duty.Manage"
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
          permission: "Pages.Duty.Manage"
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
          permission: "Pages.Duty.Manage"
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
          permission: "Pages.Duty.Manage"
        }
      }
    ]
  }
];

export default [...dutyManage];
