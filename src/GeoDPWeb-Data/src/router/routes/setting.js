import Layout from "@/layout";

export default [
  {
    name: "setting",
    path: "/setting",
    component: Layout,
    redirect: "/setting/setFlow",
    children: [
      {
        name: "setting.setFlow",
        path: "setFlow",
        component: () => import("@/view/setting/setFlow"),
        meta: {
          displayName: "流程设置",
          icon: "tongji",
          permission: "Pages.Admin"
        }
      },
      {
        name: "setting.setMenu",
        path: "setMenu",
        component: () => import("@/view/setting/setMenu"),
        meta: {
          displayName: "菜单设置",
          icon: "tongji",
          permission: "Pages.Admin"
        }
      }
    ]
  }
];
