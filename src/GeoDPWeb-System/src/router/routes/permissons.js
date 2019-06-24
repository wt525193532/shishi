import Layout from "@/layout";

export default [
  {
    path: "/permissons",
    name: "permissons",
    component: Layout,
    redirect: { name: "role" },
    meta: {
      displayName: "权限设置",
      icon: "tianbao",
      permission: ""
    },
    children: [
      {
        name: "role",
        path: "role",
        component: () => import("@/view/permissons/role"),
        meta: {
          displayName: "角色",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "menu",
        path: "menu",
        component: () => import("@/view/permissons/menu"),
        meta: {
          displayName: "菜单",
          icon: "xzqh",
          permission: ""
        }
      }
    ]
  }
];
