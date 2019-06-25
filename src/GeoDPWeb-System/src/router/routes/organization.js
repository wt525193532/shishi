import Layout from "@/layout";

export default [
  {
    path: "/organization",
    name: "organization",
    component: Layout,
    redirect: { name: "user" },
    meta: {
      displayName: "行政体系管理",
      icon: "tianbao",
      permission: "Pages.Admin.Organization"
    },
    children: [
      // {
      //   name: "administrative",
      //   path: "administrative",
      //   component: () => import("@/view/organization/administrative"),
      //   meta: {
      //     displayName: "行政区划",
      //     icon: "xzqh",
      //     permission: "Pages.Admin.Organization"
      //   }
      // },
      {
        name: "workspace",
        path: "workspace",
        component: () => import("@/view/organization/workspace"),
        meta: {
          displayName: "单位部门",
          icon: "xzqh",
          permission: "Pages.Admin.Organization.Workspace"
        }
      },
      {
        name: "user",
        path: "user",
        component: () => import("@/view/organization/user"),
        meta: {
          displayName: "用户",
          icon: "xzqh",
          permission: "Pages.Admin.User"
        }
      }
    ]
  }
];
