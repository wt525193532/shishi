import Layout from "@/layout";

export default [
  {
    path: "/permissons",
    name: "permissons",
    component: Layout,
    redirect: { name: "role" },
    meta: {
      displayName: "权限管理",
      icon: "tianbao",
      permission: "Pages.Admin"
    },
    children: [
      {
        name: "role",
        path: "role",
        component: () => import("@/view/permissons/role"),
        meta: {
          displayName: "角色",
          icon: "xzqh",
          permission: "Pages.Admin.Role"
        }
      },
      {
        name: "menu",
        path: "menu",
        component: () => import("@/view/permissons/menu"),
        meta: {
          displayName: "菜单",
          icon: "xzqh",
          permission: "Pages.Admin.Navigation"
        }
      }
    ]
  }
];
