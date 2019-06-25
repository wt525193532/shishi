import Layout from "@/layout";

export default [
  {
    path: "/approvalSetting",
    name: "approvalSetting",
    component: Layout,
    redirect: { name: "flow" },
    meta: {
      displayName: "审核管理",
      icon: "tianbao",
      permission: "Pages.Admin.Approval"
    },
    children: [
      {
        name: "flow",
        path: "flow",
        component: () => import("@/view/approvalSetting/flow"),
        meta: {
          displayName: "审核流程",
          icon: "xzqh",
          permission: "Pages.Admin.Approval"
        }
      },
      {
        name: "object",
        path: "object",
        component: () => import("@/view/approvalSetting/object"),
        meta: {
          displayName: "审核对象",
          icon: "xzqh",
          permission: "Pages.Admin.Approval"
        }
      }
    ]
  }
];
