import Layout from "@/layout";

export default [
  {
    path: "/organization",
    name: "organization",
    component: Layout,
    redirect: { name: "administrative" },
    meta: {
      displayName: "行政体系设置",
      icon: "tianbao",
      permission: ""
    },
    children: [
      {
        name: "administrative",
        path: "administrative",
        component: () => import("@/view/organization/administrative"),
        meta: {
          displayName: "行政区划",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "workspace",
        path: "workspace",
        component: () => import("@/view/organization/workspace"),
        meta: {
          displayName: "工作单位",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "unit",
        path: "unit",
        component: () => import("@/view/organization/unit"),
        meta: {
          displayName: "工作部门",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "user",
        path: "user",
        component: () => import("@/view/organization/user"),
        meta: {
          displayName: "用户",
          icon: "xzqh",
          permission: ""
        }
      }
    ]
  }
];
