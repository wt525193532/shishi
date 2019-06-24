const systemManage = [
  {
    path: "systemManage",
    name: "systemManage",
    component: () =>
      import(/* webpackChunkName: "systemManage" */ "@/components/comRouterView"),
    meta: {
      displayName: "系统设置",
      icon: "tianbao",
      permission: ""
    },
    children: [
      {
        path: "nav1",
        name: "nav1",
        component: () =>
          import(/* webpackChunkName: "systemManageIndex" */ "@/view/systemManage/nav1/content"),
        meta: {
          displayName: "nav1",
          icon: "tianbao",
          permission: ""
        }
      }
    ]
  }
];

export default [...systemManage];
