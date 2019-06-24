import Layout from "@/layout";

export default [
  {
    path: "/approvalSetting",
    name: "approvalSetting",
    component: Layout,
    redirect: { name: "flow" },
    meta: {
      displayName: "审核设置",
      icon: "tianbao",
      permission: ""
    },
    children: [
      {
        name: "flow",
        path: "flow",
        component: () => import("@/view/approvalSetting/flow"),
        meta: {
          displayName: "审核流程",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "node",
        path: "node",
        component: () => import("@/view/approvalSetting/node"),
        meta: {
          displayName: "审核节点",
          icon: "xzqh",
          permission: ""
        }
      },
      {
        name: "object",
        path: "object",
        component: () => import("@/view/approvalSetting/object"),
        meta: {
          displayName: "审核对象",
          icon: "xzqh",
          permission: ""
        }
      }
    ]
  }
];
